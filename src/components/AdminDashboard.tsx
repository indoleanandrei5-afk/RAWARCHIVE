"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { AdminAsset, AdminOrder, AdminOrdersResponse, AdminOrderStatus } from "@/lib/adminTypes";

type StatusFilter = "all" | AdminOrderStatus;
type Notice = { orderId: string; tone: "success" | "error"; message: string } | null;

const filters: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "received", label: "New" },
  { value: "editing", label: "Editing" },
  { value: "ready", label: "Ready" },
];

const statusLabels: Record<AdminOrderStatus, string> = {
  received: "Received",
  editing: "Editing",
  ready: "Ready",
  canceled: "Canceled",
};

const statusStyles: Record<AdminOrderStatus, string> = {
  received: "border-white/16 bg-white/8 text-white",
  editing: "border-violet-300/20 bg-violet-300/10 text-violet-100",
  ready: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  canceled: "border-amber-300/20 bg-amber-300/10 text-amber-100",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatBytes(value: number) {
  if (!value) return "";
  return value >= 1_000_000 ? `${(value / 1_000_000).toFixed(1)} MB` : `${Math.round(value / 1_000)} KB`;
}

function sharingLabel(value: AdminOrder["socialMediaConsent"]) {
  if (value === "allow") return "Approved for portfolio";
  if (value === "deny") return "Keep private";
  return "Not specified";
}

function AssetGrid({ assets, label }: { assets: AdminAsset[]; label: string }) {
  if (!assets.length) return null;
  return (
    <section className="mt-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">{label}</p>
        <span className="text-xs text-white/42">{assets.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {assets.map((asset, index) => (
          <a
            key={asset.assetId}
            href={asset.secureUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/8 bg-white/4"
          >
            <Image
              src={asset.secureUrl}
              alt={`${label} ${index + 1}`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 180px"
              className="object-contain transition duration-500 group-hover:scale-[1.015]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-7 text-[10px] text-white/72">
              {asset.width && asset.height ? `${asset.width} × ${asset.height}` : asset.format.toUpperCase()} {formatBytes(asset.bytes)}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AdminOrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [busyOrder, setBusyOrder] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [deliveryFor, setDeliveryFor] = useState<string | null>(null);
  const [deliveryText, setDeliveryText] = useState<Record<string, string>>({});
  const [pendingEdited, setPendingEdited] = useState<Record<string, AdminAsset[]>>({});

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/orders", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      const body = (await response.json()) as AdminOrdersResponse & { message?: string };
      if (!response.ok) throw new Error(body.message || "Orders could not be loaded.");
      setData(body);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Orders could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadOrders(), 0);
    return () => window.clearTimeout(timer);
  }, [loadOrders]);

  const visibleOrders = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return (data?.orders ?? []).filter((order) => {
      const searchable = `${order.id} ${order.clientEmail} ${order.photoNames.join(" ")}`.toLowerCase();
      return (filter === "all" || order.status === filter) && (!normalized || searchable.includes(normalized));
    });
  }, [data, filter, query]);

  const setStatus = async (order: AdminOrder, status: AdminOrderStatus) => {
    setBusyOrder(order.id);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: order.sessionId, status }),
      });
      const body = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(body.message || "The status did not save.");
      setData((current) => current ? {
        ...current,
        orders: current.orders.map((item) => item.id === order.id ? { ...item, status } : item),
      } : current);
      setNotice({ orderId: order.id, tone: "success", message: `Marked ${statusLabels[status].toLowerCase()}.` });
    } catch (caught) {
      setNotice({ orderId: order.id, tone: "error", message: caught instanceof Error ? caught.message : "The status did not save." });
    } finally {
      setBusyOrder(null);
    }
  };

  const uploadEdited = async (order: AdminOrder, event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!files.length) return;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) {
      setNotice({ orderId: order.id, tone: "error", message: "Cloud upload is not configured yet." });
      return;
    }

    setBusyOrder(order.id);
    setNotice(null);
    try {
      const uploaded: AdminAsset[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", order.editedFolder);
        formData.append("tags", "raw-archive,edited");
        formData.append("context", `order_id=${order.id}|asset_kind=edited`);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: formData });
        const body = await response.json() as Record<string, unknown> & { error?: { message?: string } };
        if (!response.ok || typeof body.secure_url !== "string" || typeof body.public_id !== "string") {
          throw new Error(body.error?.message || "A finished file could not be uploaded.");
        }
        uploaded.push({
          assetId: typeof body.asset_id === "string" ? body.asset_id : body.public_id,
          publicId: body.public_id,
          secureUrl: body.secure_url,
          width: typeof body.width === "number" ? body.width : 0,
          height: typeof body.height === "number" ? body.height : 0,
          bytes: typeof body.bytes === "number" ? body.bytes : 0,
          format: typeof body.format === "string" ? body.format : "",
          createdAt: new Date().toISOString(),
          folder: order.editedFolder,
        });
      }
      setPendingEdited((current) => ({ ...current, [order.id]: [...(current[order.id] ?? []), ...uploaded] }));
      setDeliveryFor(order.id);
      setNotice({ orderId: order.id, tone: "success", message: `${uploaded.length} finished ${uploaded.length === 1 ? "file" : "files"} uploaded.` });
    } catch (caught) {
      setNotice({ orderId: order.id, tone: "error", message: caught instanceof Error ? caught.message : "Upload failed." });
    } finally {
      setBusyOrder(null);
    }
  };

  const deliver = async (order: AdminOrder, directUrls?: string[]) => {
    const manualUrls = (deliveryText[order.id] ?? "").split("\n").map((url) => url.trim()).filter(Boolean);
    const uploadedUrls = (pendingEdited[order.id] ?? []).map((asset) => asset.secureUrl);
    const editedUrls = Array.from(new Set(directUrls ?? [...uploadedUrls, ...manualUrls]));
    if (!editedUrls.length) {
      setNotice({ orderId: order.id, tone: "error", message: "Add or upload at least one finished file." });
      return;
    }
    setBusyOrder(order.id);
    setNotice(null);
    try {
      const response = await fetch("/api/send-edited-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          sessionId: order.sessionId,
          clientEmail: order.clientEmail,
          editedUrls,
          deliveryRequestId: crypto.randomUUID(),
        }),
      });
      const body = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(body.message || "Delivery failed.");
      setData((current) => current ? {
        ...current,
        orders: current.orders.map((item) => item.id === order.id ? { ...item, status: "ready", deliveryUrls: editedUrls } : item),
      } : current);
      setPendingEdited((current) => ({ ...current, [order.id]: [] }));
      setDeliveryText((current) => ({ ...current, [order.id]: "" }));
      setDeliveryFor(null);
      setNotice({ orderId: order.id, tone: "success", message: `Sent to ${order.clientEmail}. Nicely done.` });
    } catch (caught) {
      setNotice({ orderId: order.id, tone: "error", message: caught instanceof Error ? caught.message : "Delivery failed." });
    } finally {
      setBusyOrder(null);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <main className="page-wrap relative min-h-screen overflow-hidden px-4 py-14 text-white sm:px-8 sm:py-20">
      <div className="page-overlay" />
      <div className="page-container max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Studio desk</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Everything in one place.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/52">Paid orders, original files and finished work. No browser scavenger hunt required.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => void loadOrders()} disabled={loading} className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8 disabled:opacity-40">{loading ? "Refreshing…" : "Refresh"}</button>
            <button type="button" onClick={() => void logout()} className="rounded-full border border-white/14 px-4 py-2 text-sm text-white/52 transition hover:bg-white/8 hover:text-white">Log out</button>
          </div>
        </header>

        {data?.warnings.map((warning) => (
          <p key={warning} className="mt-4 rounded-2xl border border-amber-300/18 bg-amber-300/8 px-4 py-3 text-sm text-amber-100">{warning}</p>
        ))}
        {error ? <div className="mt-6 rounded-3xl border border-red-300/20 bg-red-300/8 p-6 text-red-100">{error}</div> : null}

        <div className="my-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1.5">
            {filters.map((item) => (
              <button key={item.value} type="button" onClick={() => setFilter(item.value)} className={`rounded-full px-4 py-2 text-sm transition ${filter === item.value ? "bg-white text-black" : "text-white/60 hover:bg-white/8 hover:text-white"}`}>{item.label}</button>
            ))}
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, email or filename" className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white/25 sm:ml-auto sm:max-w-sm" />
          <span className="px-3 text-xs text-white/40">{visibleOrders.length} shown</span>
        </div>

        {loading && !data ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center text-white/52">Opening the studio…</div>
        ) : visibleOrders.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center text-white/52">Nothing here yet. Suspiciously tidy.</div>
        ) : (
          <div className="grid items-start gap-5 xl:grid-cols-2">
            {visibleOrders.map((order) => {
              const finalAssets = [...order.editedAssets, ...(pendingEdited[order.id] ?? [])];
              const isBusy = busyOrder === order.id;
              return (
                <article key={order.id} className="rounded-[32px] border border-white/10 bg-[#101010]/88 p-5 shadow-xl sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/36">{formatDate(order.createdAt)}</p>
                      <h2 className="mt-2 truncate text-xl font-semibold tracking-[-0.02em]">#{order.id}</h2>
                      <a href={`mailto:${order.clientEmail}`} className="mt-2 block truncate text-sm text-white/58 hover:text-white">{order.clientEmail || "No email saved"}</a>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1.5 text-xs ${statusStyles[order.status]}`}>{statusLabels[order.status]}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-2xl bg-white/5 p-3"><p className="text-[9px] uppercase tracking-[0.18em] text-white/34">Photos</p><p className="mt-1 text-lg">{order.photoCount}</p></div>
                    <div className="rounded-2xl bg-white/5 p-3"><p className="text-[9px] uppercase tracking-[0.18em] text-white/34">Paid</p><p className="mt-1 text-lg">{order.currency === "USD" ? "$" : `${order.currency} `}{order.total}</p></div>
                    <div className="rounded-2xl bg-white/5 p-3"><p className="text-[9px] uppercase tracking-[0.18em] text-white/34">Use</p><p className="mt-1 text-xs leading-5 text-white/72">{sharingLabel(order.socialMediaConsent)}</p></div>
                  </div>

                  {order.editNotes ? <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.035] p-4"><p className="text-[9px] uppercase tracking-[0.18em] text-white/34">Brief</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/72">{order.editNotes}</p></div> : null}
                  {order.photoNames.length ? <details className="mt-3 rounded-2xl border border-white/8 px-4 py-3 text-sm text-white/52"><summary className="cursor-pointer select-none">Original filenames</summary><p className="mt-3 break-words text-xs leading-5 text-white/40">{order.photoNames.join(", ")}</p></details> : null}

                  <AssetGrid assets={order.originals} label="Originals" />
                  {!order.originals.length ? <p className="mt-5 rounded-2xl border border-dashed border-white/10 p-5 text-center text-xs text-white/36">No cloud originals found for this order.</p> : null}
                  <AssetGrid assets={finalAssets} label="Finished files" />

                  {order.deliveryUrls.length ? (
                    <div className="mt-5 rounded-2xl border border-emerald-300/14 bg-emerald-300/[0.055] p-4">
                      <p className="text-[9px] uppercase tracking-[0.18em] text-emerald-100/48">Last delivery</p>
                      <div className="mt-2 space-y-1.5">{order.deliveryUrls.map((url, index) => <a key={`${url}-${index}`} href={url} target="_blank" rel="noreferrer" className="block truncate text-xs text-emerald-100/72 underline underline-offset-4">File {index + 1}</a>)}</div>
                      <button type="button" disabled={isBusy} onClick={() => void deliver(order, order.deliveryUrls)} className="mt-3 text-xs text-emerald-100 underline underline-offset-4 disabled:opacity-40">Resend delivery</button>
                    </div>
                  ) : null}

                  {deliveryFor === order.id ? (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">Deliver finished work</p>
                      <textarea value={deliveryText[order.id] ?? ""} onChange={(event) => setDeliveryText((current) => ({ ...current, [order.id]: event.target.value }))} rows={3} placeholder="Optional: one external gallery or download link per line" className="mt-3 w-full rounded-2xl border border-white/12 bg-black/30 p-3 text-sm outline-none placeholder:text-white/28 focus:border-white/25" />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" disabled={isBusy} onClick={() => void deliver(order)} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black disabled:opacity-40">{isBusy ? "Sending…" : "Email client & mark ready"}</button>
                        <button type="button" onClick={() => setDeliveryFor(null)} className="rounded-full border border-white/14 px-4 py-2 text-xs text-white/65">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <label className={`cursor-pointer rounded-full border border-white/14 px-4 py-2 text-xs text-white/72 transition hover:bg-white/8 ${!data?.configuration.browserUploads || isBusy ? "pointer-events-none opacity-40" : ""}`}>
                        Upload finished files
                        <input type="file" accept="image/*,.tif,.tiff" multiple className="hidden" onChange={(event) => void uploadEdited(order, event)} />
                      </label>
                      <button type="button" onClick={() => setDeliveryFor(order.id)} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">Deliver by link</button>
                    </div>
                  )}

                  {notice?.orderId === order.id ? <p className={`mt-4 text-sm ${notice.tone === "success" ? "text-emerald-300" : "text-red-300"}`}>{notice.message}</p> : null}

                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/8 pt-4">
                    {(["received", "editing", "ready", "canceled"] as AdminOrderStatus[]).map((status) => (
                      <button key={status} type="button" disabled={isBusy || order.status === status} onClick={() => void setStatus(order, status)} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/52 transition hover:bg-white/7 hover:text-white disabled:cursor-default disabled:opacity-30">{statusLabels[status]}</button>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
