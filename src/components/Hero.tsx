"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 36]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.04]);

  return (
    <section className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden bg-black py-14 text-white max-[390px]:py-12 sm:py-24">
      <motion.img
        src="/images/image1.jpg"
        alt="Hero background"
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-linear-to-br from-black/28 via-black/56 to-black/82" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center max-[390px]:px-3 sm:px-6"
      >
        <p className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-gray-300 max-[390px]:px-3 max-[390px]:text-[10px] max-[390px]:tracking-[0.18em] sm:text-xs sm:tracking-[0.45em]">
          Professional photo editing
        </p>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white max-[390px]:text-[1.78rem] sm:text-5xl md:text-7xl">
          Transform raw photos
          <span className="block text-white">into clean, elevated visuals.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[15px] text-gray-200 max-[390px]:text-sm sm:mt-8 sm:text-lg md:text-xl">
          Quiet, refined edits with balanced tone, crisp contrast, and intentional mood.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.18em] text-gray-300 max-[390px]:text-xs max-[390px]:tracking-[0.14em] sm:text-base">
          No AI editing. Every image is refined by hand.
        </p>

        <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-gray-500 max-[390px]:gap-x-2 max-[390px]:text-[10px] max-[390px]:tracking-[0.06em] sm:text-sm sm:tracking-[0.35em]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Speedy edits</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Calm aesthetics</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Real impact</span>
        </div>

        <div className="mx-auto mt-10 w-full max-w-2xl rounded-[28px] border border-white/15 bg-black/38 p-3 shadow-[0_30px_95px_-62px_rgba(197,210,227,0.68)] backdrop-blur-xl sm:mt-14 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/upload"
              className="inline-flex w-full justify-center rounded-full border border-white/20 bg-(--accent-strong) px-6 py-3 text-sm font-semibold uppercase tracking-[0.17em] text-[#0b111a] transition hover:scale-[1.02] hover:bg-(--accent) max-[390px]:px-5 max-[390px]:text-[12px] sm:w-auto sm:px-7 sm:tracking-[0.2em]"
            >
              Upload Photos
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white/7 px-6 py-3 text-sm uppercase tracking-[0.17em] text-white transition hover:border-white/35 hover:bg-white/12 max-[390px]:px-5 max-[390px]:text-[12px] sm:w-auto sm:px-7 sm:tracking-[0.2em]"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
