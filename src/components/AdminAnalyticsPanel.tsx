"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminAnalyticsResponse, AnalyticsBreakdown } from "@/lib/adminAnalyticsTypes";

const ranges = [7, 30, 90] as const;

function compact(value: number) {
  return new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function duration(seconds: number) {
  const rounded = Math.round(seconds);
  return rounded < 60 ? `${rounded}s` : `${Math.floor(rounded / 60)}m ${rounded % 60}s`;
}

function LineChart({ data }: { data: AdminAnalyticsResponse["timeline"] }) {
  const geometry = useMemo(() => {
    if (!data.length) return { points: "", area: "", max: 0 };
    const max = Math.max(1, ...data.map((point) => point.views));
    const points = data.map((point, index) => {
      const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
      const y = 96 - (point.views / max) * 86;
      return `${x},${y}`;
    }).join(" ");
    return { points, area: `0,100 ${points} 100,100`, max };
  }, [data]);

  return (
    <div className="relative mt-7 h-52 w-full">
      {[0, 1, 2, 3].map((line) => <span key={line} className="absolute inset-x-0 border-t border-white/[0.065]" style={{ top: `${line * 33}%` }} />)}
      {data.length ? (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-label="Page views over time" role="img">
          <defs>
            <linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          <polygon points={geometry.area} fill="url(#analytics-area)" />
          <polyline points={geometry.points} fill="none" stroke="white" strokeWidth="1.15" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : <div className="grid h-full place-items-center text-sm text-white/36">Traffic will draw the line.</div>}
    </div>
  );
}

function Breakdown({ title, subtitle, rows }: { title: string; subtitle: string; rows: AnalyticsBreakdown[] }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <section className="rounded-[28px] border border-white/10 bg-[#101010]/86 p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">{subtitle}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em]">{title}</h3>
      <div className="mt-6 space-y-4">
        {rows.length ? rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
              <span className="truncate text-white/70">{row.label || "Unknown"}</span>
              <span className="shrink-0 tabular-nums text-white/42">{compact(row.value)}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-white/72 transition-[width] duration-700" style={{ width: `${Math.max(2, (row.value / max) * 100)}%` }} /></div>
          </div>
        )) : <p className="py-8 text-center text-sm text-white/34">No signal yet.</p>}
      </div>
    </section>
  );
}

export default function AdminAnalyticsPanel() {
  const router = useRouter();
  const [range, setRange] = useState<(typeof ranges)[number]>(30);
  const [data, setData] = useState<AdminAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/analytics?range=${range}`, { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      const body = await response.json() as AdminAnalyticsResponse & { message?: string };
      if (!response.ok) throw new Error(body.message || "Analytics could not be loaded.");
      setData(body);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Analytics could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [range, router]);

  useEffect(() => {
    const start = window.setTimeout(() => void load(), 0);
    const refresh = window.setInterval(() => void load(true), 30_000);
    return () => { window.clearTimeout(start); window.clearInterval(refresh); };
  }, [load]);

  if (loading && !data) return <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center text-white/52">Reading the room…</div>;

  if (data && !data.configured) {
    return (
      <section className="rounded-[32px] border border-white/10 bg-[#101010]/88 p-7 sm:p-10">
        <p className="eyebrow">One private connection left</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">The dashboard is ready. Google just needs to hand it the numbers.</h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{data.message} Nothing is missing from the interface, and no visitor identity is exposed.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Property ID", "Service account email", "Private key"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><span className="text-[10px] text-white/30">0{index + 1}</span><p className="mt-2 text-sm text-white/72">{item}</p></div>
          ))}
        </div>
      </section>
    );
  }

  if (!data) return <div className="rounded-[32px] border border-red-300/20 bg-red-300/8 p-6 text-red-100">{error}</div>;

  const cards = [
    ["Visitors", compact(data.totals.visitors), "unique active users"],
    ["Page views", compact(data.totals.views), "every page opened"],
    ["Sessions", compact(data.totals.sessions), "visits, not people"],
    ["Engagement", `${Math.round(data.totals.engagementRate * 100)}%`, "sessions that stayed"],
    ["Avg. session", duration(data.totals.averageSessionSeconds), "time well spent"],
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white/48">Updates every 30 seconds · last checked {new Date(data.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          {error ? <p className="mt-1 text-xs text-amber-200">Last refresh missed: {error}</p> : null}
        </div>
        <div className="flex w-fit rounded-full border border-white/10 bg-white/5 p-1">
          {ranges.map((item) => <button key={item} type="button" onClick={() => setRange(item)} className={`rounded-full px-4 py-2 text-xs transition ${range === item ? "bg-white text-black" : "text-white/48 hover:text-white"}`}>{item} days</button>)}
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-[#101010]/90 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/55">Live · last 30 minutes</p><p className="mt-3 text-6xl font-semibold tracking-[-0.06em] tabular-nums sm:text-7xl">{data.realtime.activeVisitors}</p><p className="mt-2 text-sm text-white/42">{data.realtime.activeVisitors === 1 ? "visitor on the site now" : "visitors on the site now"}</p></div>
          <div className="min-w-0 sm:w-72"><p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/32">Where they are</p>{data.realtime.recentPages.length ? data.realtime.recentPages.map((page) => <div key={page.label} className="flex justify-between gap-4 border-t border-white/8 py-2 text-xs"><span className="truncate text-white/58">{page.label}</span><span className="text-white/35">{page.value}</span></div>) : <p className="border-t border-white/8 py-3 text-xs text-white/30">Quiet, for the moment.</p>}</div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map(([label, value, note]) => <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"><p className="text-[9px] uppercase tracking-[0.18em] text-white/32">{label}</p><p className="mt-2 text-2xl font-semibold tracking-[-0.03em] tabular-nums">{value}</p><p className="mt-1 text-[11px] text-white/30">{note}</p></div>)}
      </div>

      <section className="mt-4 rounded-[32px] border border-white/10 bg-[#101010]/86 p-6 sm:p-8">
        <div className="flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.22em] text-white/35">Last {range} days</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Traffic, without the theatre.</h3></div><p className="hidden text-xs text-white/30 sm:block">page views</p></div>
        <LineChart data={data.timeline} />
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Breakdown title="Popular pages" subtitle="Attention" rows={data.pages} />
        <Breakdown title="Traffic sources" subtitle="How they found you" rows={data.sources} />
        <Breakdown title="Countries" subtitle="Where from" rows={data.countries} />
        <Breakdown title="Devices" subtitle="What they used" rows={data.devices} />
        <Breakdown title="Meaningful actions" subtitle="Conversions & intent" rows={data.events} />
      </div>
    </div>
  );
}
