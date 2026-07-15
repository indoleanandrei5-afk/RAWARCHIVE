export type AnalyticsPoint = {
  date: string;
  visitors: number;
  views: number;
};

export type AnalyticsBreakdown = {
  label: string;
  value: number;
};

export type AdminAnalyticsResponse = {
  configured: boolean;
  generatedAt: string;
  range: number;
  realtime: {
    activeVisitors: number;
    recentPages: AnalyticsBreakdown[];
  };
  totals: {
    visitors: number;
    views: number;
    sessions: number;
    engagementRate: number;
    averageSessionSeconds: number;
  };
  timeline: AnalyticsPoint[];
  pages: AnalyticsBreakdown[];
  sources: AnalyticsBreakdown[];
  countries: AnalyticsBreakdown[];
  devices: AnalyticsBreakdown[];
  events: AnalyticsBreakdown[];
  message?: string;
};
