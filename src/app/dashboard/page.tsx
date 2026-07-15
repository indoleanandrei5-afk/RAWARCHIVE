"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getStoredOrders,
  orderStatusLabels,
  Order,
  OrderStatus,
} from "@/lib/orders";

const progressSteps = ["Received", "Editing", "Ready"] as const;

const progressByStatus: Partial<Record<OrderStatus, number>> = {
  success: 0,
  editing: 1,
  ready: 2,
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "border-sky-400/20 bg-sky-400/10 text-sky-100",
  success: "border-white/15 bg-white/10 text-white",
  editing: "border-violet-400/25 bg-violet-400/10 text-violet-100",
  ready: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
  canceled: "border-amber-400/20 bg-amber-400/10 text-amber-100",
};

function formatSocialMediaConsent(value: Order["socialMediaConsent"]) {
  if (value === "allow") return "You said I may share the finished work.";
  if (value === "deny") return "Private. It stays between us.";
  return "No preference saved.";
}

function OrderProgress({ status }: { status: OrderStatus }) {
  if (status === "pending" || status === "canceled") return null;

  const activeStep = progressByStatus[status] ?? 0;

  return (
    <div className="mt-7" aria-label={`Order progress: ${orderStatusLabels[status]}`}>
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {progressSteps.map((step, index) => {
          const isReached = index <= activeStep;
          return (
            <div key={step} className="min-w-0">
              <div className="mb-3 flex items-center">
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-semibold transition-colors sm:size-8 ${
                    isReached
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-black/20 text-gray-500"
                  }`}
                >
                  {index + 1}
                </span>
                {index < progressSteps.length - 1 ? (
                  <span
                    className={`h-px flex-1 ${
                      index < activeStep ? "bg-white" : "bg-white/10"
                    }`}
                  />
                ) : null}
              </div>
              <p className={isReached ? "text-sm text-white" : "text-sm text-gray-500"}>
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [orders] = useState<Order[]>(() => getStoredOrders());

  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 text-white sm:px-8 sm:py-20">
      <div className="page-overlay" />
      <div className="page-container max-w-5xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--accent-strong)">
            Order status
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Your photos are in good hands.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            This page remembers orders placed in this browser. The finished files still arrive by
            email—because nobody should have to babysit a tab.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 sm:p-12">
            <p className="text-xl font-medium text-white">Quiet in here.</p>
            <p className="mt-3 max-w-xl leading-7 text-gray-400">
              Either excellent self-control, or you have not sent the photos yet. Completed orders
              from this browser will appear here.
            </p>
            <Link
              href="/upload"
              style={{ color: "#050505" }}
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-(--accent-soft)"
            >
              Send photos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-[32px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Order</p>
                    <p className="mt-2 text-lg font-semibold text-white">#{order.id}</p>
                    <p className="mt-2 text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-full border px-4 py-2 text-sm font-medium ${statusStyles[order.status]}`}
                  >
                    {orderStatusLabels[order.status]}
                  </span>
                </div>

                <OrderProgress status={order.status} />

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/5 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Photos</p>
                    <p className="mt-2 text-xl font-semibold">{order.photoCount}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Total</p>
                    <p className="mt-2 text-xl font-semibold">${order.total}</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Files</p>
                    <p className="mt-2 truncate text-sm text-gray-200">{order.photoNames}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/5 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Privacy</p>
                  <p className="mt-2 text-sm text-gray-300">
                    {formatSocialMediaConsent(order.socialMediaConsent)}
                  </p>
                </div>

                {order.editNotes ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Your note</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-200">
                      {order.editNotes}
                    </p>
                  </div>
                ) : null}

                {order.editedUrls && order.editedUrls.length > 0 ? (
                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                      Finished files
                    </p>
                    <div className="mt-3 grid gap-2">
                      {order.editedUrls.map((url, index) => (
                        <a
                          key={`${order.id}-edited-${index}`}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate text-sm text-emerald-100 underline decoration-emerald-300/40 underline-offset-4"
                        >
                          Download photo {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
