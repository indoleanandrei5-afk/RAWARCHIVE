"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <section className="bg-[#050505] px-5 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-14 space-y-6 text-center"
        >
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.28em] text-gray-300 sm:text-sm sm:tracking-[0.4em]">Pricing</p>
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">Minimal pricing, polished results.</h2>
          <p className="mx-auto max-w-2xl text-base text-gray-200 sm:text-lg">
            Simple, elegant photo editing priced for independent photographers and small studios.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-[32px] border border-white/15 bg-black/40 p-10 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">1 Photo</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-gray-500">Perfect for one standout image</p>
            <p className="mt-6 text-5xl font-semibold">$1</p>
            <p className="mt-3 text-gray-200">Per edited image</p>
            <div className="mt-8 space-y-3 text-gray-100">
              <p>Clean color grade</p>
              <p>Subtle retouch</p>
              <p>High-res export</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-[32px] border border-white/15 bg-white/[0.08] p-10 text-left shadow-[0_30px_80px_-60px_rgba(197,210,227,0.5)] transition hover:border-white/25 hover:bg-white/[0.12]"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">10 Photos</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-gray-500">Best value for a cohesive set</p>
            <p className="mt-6 text-5xl font-semibold text-white">$7</p>
            <p className="mt-3 text-gray-200">Total package price</p>
            <div className="mt-8 space-y-3 text-gray-100">
              <p>Cohesive batch finish</p>
              <p>Cinematic tone</p>
              <p>Ready to share</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-[32px] border border-white/15 bg-black/40 p-10 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">30+ Photos</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-gray-500">Gallery polish at a strong rate</p>
            <p className="mt-6 text-5xl font-semibold">$18</p>
            <p className="mt-3 text-gray-200">Total package price</p>
            <div className="mt-8 space-y-3 text-gray-100">
              <p>Full gallery polish</p>
              <p>Advanced detail work</p>
              <p>Priority delivery</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="mx-auto mt-12 w-full max-w-2xl rounded-[28px] border border-white/15 bg-black/35 p-3 shadow-[0_28px_90px_-60px_rgba(197,210,227,0.65)] backdrop-blur-xl sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/upload"
              className="inline-flex w-full justify-center rounded-full border border-white/20 bg-[color:var(--accent-strong)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b111a] transition hover:bg-[color:var(--accent)] sm:w-auto"
            >
              Upload Photos
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/[0.08] px-7 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white/35 hover:bg-white/[0.14] sm:w-auto"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
