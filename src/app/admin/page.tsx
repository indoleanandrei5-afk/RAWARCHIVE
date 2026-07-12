"use client";

import { useEffect, useState } from "react";
import { getStoredOrders, updateOrderStatus, Order, OrderStatus } from "@/lib/orders";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-sky-500/20 text-sky-100",
  success: "bg-emerald-500/20 text-emerald-100",
  canceled: "bg-amber-500/20 text-amber-100",
};

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const setStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    setOrders(getStoredOrders());
  };

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-6xl">
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
