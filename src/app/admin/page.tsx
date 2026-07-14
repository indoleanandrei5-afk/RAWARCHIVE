"use client";

import { useState } from "react";
import { getStoredOrders, updateOrderStatus, Order, OrderStatus } from "@/lib/orders";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-sky-500/20 text-sky-100",
  success: "bg-emerald-500/20 text-emerald-100",
  canceled: "bg-amber-500/20 text-amber-100",
};

function formatSocialMediaConsent(value: Order["socialMediaConsent"]) {
  if (value === "allow") return "Approved for social media use";
  if (value === "deny") return "Not approved (private only)";
  return "Not specified";
}

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [editedPhotosUrl, setEditedPhotosUrl] = useState("");
  const [editedUrlForOrder, setEditedUrlForOrder] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [sendStatus, setSendStatus] = useState<{ orderId: string; message: string; type: "success" | "error" } | null>(null);
  const [sendingDirectLink, setSendingDirectLink] = useState<string | null>(null);

  const setStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    setOrders(getStoredOrders());
  };

  const handleSendEditedPhotos = async (order: Order) => {
    if (!editedPhotosUrl.trim()) {
      setSendStatus({ orderId: order.id, message: "Please enter at least one edited photo URL", type: "error" });
      return;
    }

    if (!order.clientEmail) {
      setSendStatus({ orderId: order.id, message: "Client email not available for this order", type: "error" });
      return;
    }

    setSendingEmail(order.id);
    setSendStatus(null);

    try {
      const editedUrls = editedPhotosUrl
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean);

      const response = await fetch("/api/send-edited-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          clientEmail: order.clientEmail,
          editedUrls,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSendStatus({ orderId: order.id, message: "Email sent successfully!", type: "success" });
      setEditedPhotosUrl("");
      setEditedUrlForOrder(null);

      // Update order with edited URLs
      const updatedOrders = orders.map((o) =>
        o.id === order.id ? { ...o, editedUrls } : o
      );
      setOrders(updatedOrders);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send email";
      setSendStatus({ orderId: order.id, message, type: "error" });
    } finally {
      setSendingEmail(null);
    }
  };

  const handleSendDirectLink = async (order: Order, url: string) => {
    if (!order.clientEmail) {
      setSendStatus({ orderId: order.id, message: "Client email not available", type: "error" });
      return;
    }

    setSendingDirectLink(`${order.id}-${url}`);
    setSendStatus(null);

    try {
      const response = await fetch("/api/send-edited-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          clientEmail: order.clientEmail,
          editedUrls: [url],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }

      setSendStatus({ orderId: order.id, message: "Photo sent to client!", type: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send email";
      setSendStatus({ orderId: order.id, message, type: "error" });
    } finally {
      setSendingDirectLink(null);
    }
  };

  return (
    <main className="page-wrap relative overflow-hidden p-10 text-white">
      <div className="page-overlay" />
      <div className="page-container">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-6xl font-bold">Admin Panel</h1>
            <p className="mt-3 text-gray-400">Manage upload order status and review recent activity.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Orders</p>
            <p className="mt-2 text-3xl font-semibold text-white">{orders.length}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-12 text-center text-gray-300">
            No orders have been created yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[40px] border border-white/10 bg-white/5 p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Order ID</p>
                    <p className="mt-2 text-lg font-semibold text-white">#{order.id}</p>
                    <p className="mt-2 text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className={`rounded-3xl px-4 py-2 text-sm font-semibold text-white ${statusStyles[order.status]}`}>
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Photos</p>
                    <p className="mt-2 text-2xl font-semibold">{order.photoCount}</p>
                  </div>
                  <div className="rounded-3xl bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Total</p>
                    <p className="mt-2 text-2xl font-semibold">${order.total}</p>
                  </div>
                  <div className="rounded-3xl bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Photos</p>
                    <p className="mt-2 text-sm text-gray-200 truncate">{order.photoNames}</p>
                  </div>
                </div>

                {order.clientEmail && (
                  <div className="mt-6 rounded-3xl bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Client Email</p>
                    <p className="mt-2 text-sm text-gray-200">{order.clientEmail}</p>
                  </div>
                )}

                <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Social Media Permission</p>
                  <p className="mt-2 text-sm text-gray-200">{formatSocialMediaConsent(order.socialMediaConsent)}</p>
                </div>

                {order.editNotes && (
                  <div className="mt-6 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-blue-400">Client Notes</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-blue-100">{order.editNotes}</p>
                  </div>
                )}

                {order.uploadedUrls && order.uploadedUrls.length > 0 ? (
                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Uploaded files</p>
                    <div className="mt-3 grid gap-2">
                      {order.uploadedUrls.map((url, index) => (
                        <a
                          key={`${order.id}-upload-${index}`}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate text-sm text-(--accent-strong) underline"
                        >
                          {url}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                {order.editedUrls && order.editedUrls.length > 0 ? (
                  <div className="mt-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Edited files</p>
                    <div className="mt-3 space-y-3">
                      {order.editedUrls.map((url, index) => (
                        <div key={`${order.id}-edited-${index}`} className="flex items-center justify-between gap-3">
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 truncate text-sm text-emerald-300 underline"
                          >
                            {url}
                          </a>
                          <button
                            type="button"
                            disabled={sendingDirectLink === `${order.id}-${url}`}
                            onClick={() => handleSendDirectLink(order, url)}
                            className="whitespace-nowrap rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/30 disabled:opacity-50"
                          >
                            {sendingDirectLink === `${order.id}-${url}` ? "Sending..." : "Send"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {editedUrlForOrder === order.id ? (
                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Send Edited Photos</p>
                    <textarea
                      value={editedPhotosUrl}
                      onChange={(event) => setEditedPhotosUrl(event.target.value)}
                      placeholder="Paste edited photo URLs (one per line)&#10;Example:&#10;https://res.cloudinary.com/..."
                      rows={4}
                      className="mt-3 w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-(--accent)"
                    />
                    {sendStatus?.orderId === order.id && (
                      <p className={`mt-3 text-sm ${sendStatus.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                        {sendStatus.message}
                      </p>
                    )}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        disabled={sendingEmail === order.id}
                        onClick={() => handleSendEditedPhotos(order)}
                        className="flex-1 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30 disabled:opacity-50"
                      >
                        {sendingEmail === order.id ? "Sending..." : "Send Email"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditedUrlForOrder(null);
                          setEditedPhotosUrl("");
                        }}
                        className="flex-1 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditedUrlForOrder(order.id)}
                    className="mt-6 rounded-full bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                  >
                    Send Edited Photos
                  </button>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStatus(order.id, "success")}
                    className="rounded-full bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
                  >
                    Mark Completed
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(order.id, "canceled")}
                    className="rounded-full bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/20"
                  >
                    Mark Canceled
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(order.id, "pending")}
                    className="rounded-full bg-sky-500/10 px-5 py-3 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
                  >
                    Reset to Pending
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
