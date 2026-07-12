"use client";

import { useEffect, useState } from "react";
import { getStoredOrders, Order } from "@/lib/orders";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  return (
    <main className="min-h-screen bg-black px-4 py-16 text-white sm:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold sm:text-6xl">Dashboard</h1>
            <p className="mt-3 text-gray-400">Track recent upload orders and payment status.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-400 sm:text-sm sm:tracking-[0.4em]">Orders</p>
            <p className="mt-2 text-3xl font-semibold text-white">{orders.length}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center text-gray-300 sm:rounded-[40px] sm:p-12">
            No orders yet. Completed payments will appear here after checkout.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:rounded-[40px] sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.4em]">Order ID</p>
                    <p className="mt-2 text-lg font-semibold text-white">#{order.id}</p>
                    <p className="mt-2 text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="rounded-3xl px-4 py-2 text-sm font-semibold text-white">
                    <span
                      className={
                        order.status === "success"
                          ? "bg-emerald-500/20 text-emerald-100"
                          : order.status === "pending"
                          ? "bg-sky-500/20 text-sky-100"
                          : "bg-amber-500/20 text-amber-100"
                      }
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-400 sm:text-sm sm:tracking-[0.4em]">Photos</p>
                    <p className="mt-2 text-2xl font-semibold">{order.photoCount}</p>
                  </div>
                  <div className="rounded-3xl bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-400 sm:text-sm sm:tracking-[0.4em]">Total</p>
                    <p className="mt-2 text-2xl font-semibold">${order.total}</p>
                  </div>
                  <div className="rounded-3xl bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-gray-400 sm:text-sm sm:tracking-[0.4em]">Photos</p>
                    <p className="mt-2 text-sm text-gray-200 truncate">{order.photoNames}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
