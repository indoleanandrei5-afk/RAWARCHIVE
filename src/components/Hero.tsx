"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <img
        src="/images/image7.jpg"
        alt="Hero background"
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/55 to-black/80" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
      >
        <p className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.45em] text-gray-400">
          Professional photo editing
        </p>

        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
          Transform raw photos
          <span className="block text-white">into clean, elevated visuals.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-300">
          Quiet, refined edits with balanced tone, crisp contrast, and intentional mood.
        </p>

        <div className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-sm uppercase tracking-[0.35em] text-gray-500">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span>Speedy edits</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span>Calm aesthetics</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span>Real impact</span>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/upload"
            className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            Upload Photos
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-white/20 hover:bg-white/10"
          >
            View portfolio
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
