import { importPKCS8, SignJWT } from "jose";
import type { AdminAnalyticsResponse, AnalyticsBreakdown } from "@/lib/adminAnalyticsTypes";

type Value = { value?: string };
type ReportRow = { dimensionValues?: Value[]; metricValues?: Value[] };
type Report = { rows?: ReportRow[]; totals?: ReportRow[] };

const DATA_API = "https://analyticsdata.googleapis.com/v1beta";
const TOKEN_API = "https://oauth2.googleapis.com/token";

function credentials() {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID?.replace(/^properties\//, "");
  const clientEmail = process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  return propertyId && clientEmail && privateKey ? { propertyId, clientEmail, privateKey } : null;
}

async function accessToken(clientEmail: string, privateKey: string) {
  const key = await importPKCS8(privateKey, "RS256");
  const assertion = await new SignJWT({ scope: "https://www.googleapis.com/auth/analytics.readonly" })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setAudience(TOKEN_API)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  const response = await fetch(TOKEN_API, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });
  const body = await response.json() as { access_token?: string; error_description?: string };
  if (!response.ok || !body.access_token) throw new Error(body.error_description || "Google Analytics authentication failed.");
  return body.access_token;
}

async function report(propertyId: string, token: string, method: "runReport" | "runRealtimeReport", body: object) {
  const response = await fetch(`${DATA_API}/properties/${propertyId}:${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response.json() as Report & { error?: { message?: string } };
  if (!response.ok) throw new Error(data.error?.message || "Google Analytics could not load this report.");
  return data;
}

const numberAt = (row: ReportRow | undefined, index: number) => Number(row?.metricValues?.[index]?.value || 0);

function breakdown(reportData: Report, dimensionIndex = 0, metricIndex = 0): AnalyticsBreakdown[] {
  return (reportData.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[dimensionIndex]?.value || "Unknown",
    value: numberAt(row, metricIndex),
  }));
}

export async function getAdminAnalytics(range: number): Promise<AdminAnalyticsResponse> {
  const config = credentials();
  const generatedAt = new Date().toISOString();
  if (!config) {
    return {
      configured: false,
      generatedAt,
      range,
      realtime: { activeVisitors: 0, recentPages: [] },
      totals: { visitors: 0, views: 0, sessions: 0, engagementRate: 0, averageSessionSeconds: 0 },
      timeline: [], pages: [], sources: [], countries: [], devices: [], events: [],
      message: "Analytics needs its private Google connection before real traffic can appear here.",
    };
  }

  const token = await accessToken(config.clientEmail, config.privateKey);
  const dateRanges = [{ startDate: `${range - 1}daysAgo`, endDate: "today" }];
  const ordered = { orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }] };

  const [overview, timeline, pages, sources, countries, devices, events, realtime, realtimePages] = await Promise.all([
    report(config.propertyId, token, "runReport", {
      dateRanges,
      metrics: [
        { name: "activeUsers" }, { name: "screenPageViews" }, { name: "sessions" },
        { name: "engagementRate" }, { name: "averageSessionDuration" },
      ],
    }),
    report(config.propertyId, token, "runReport", {
      dateRanges, dimensions: [{ name: "date" }], metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    report(config.propertyId, token, "runReport", {
      dateRanges, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }], limit: 8, ...ordered,
    }),
    report(config.propertyId, token, "runReport", {
      dateRanges, dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }], limit: 8,
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
    report(config.propertyId, token, "runReport", {
      dateRanges, dimensions: [{ name: "country" }], metrics: [{ name: "activeUsers" }], limit: 8,
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
    report(config.propertyId, token, "runReport", {
      dateRanges, dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "activeUsers" }], limit: 8,
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
    report(config.propertyId, token, "runReport", {
      dateRanges, dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], limit: 10,
      dimensionFilter: { notExpression: { filter: { fieldName: "eventName", inListFilter: { values: ["page_view", "session_start", "first_visit", "user_engagement", "scroll"], caseSensitive: true } } } },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    }),
    report(config.propertyId, token, "runRealtimeReport", { metrics: [{ name: "activeUsers" }] }),
    report(config.propertyId, token, "runRealtimeReport", {
      dimensions: [{ name: "unifiedScreenName" }], metrics: [{ name: "activeUsers" }], limit: 6,
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    }),
  ]);

  const totalRow = overview.rows?.[0];
  return {
    configured: true,
    generatedAt,
    range,
    realtime: { activeVisitors: numberAt(realtime.rows?.[0], 0), recentPages: breakdown(realtimePages) },
    totals: {
      visitors: numberAt(totalRow, 0), views: numberAt(totalRow, 1), sessions: numberAt(totalRow, 2),
      engagementRate: numberAt(totalRow, 3), averageSessionSeconds: numberAt(totalRow, 4),
    },
    timeline: (timeline.rows ?? []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || "", visitors: numberAt(row, 0), views: numberAt(row, 1),
    })),
    pages: breakdown(pages), sources: breakdown(sources), countries: breakdown(countries),
    devices: breakdown(devices), events: breakdown(events),
  };
}
