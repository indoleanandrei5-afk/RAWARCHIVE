"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type PricingSectionProps = {
  variant?: "default" | "home";
};

export default function PricingSection({ variant = "default" }: PricingSectionProps) {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.72;
  const isHome = variant === "home";

  return (
    <section className={`bg-transparent px-4 text-white sm:px-6 ${isHome ? "py-24 sm:py-32" : "py-16 sm:py-22"}`}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className={
            isHome
              ? "mb-12 border-y border-white/10 py-8 text-left sm:mb-16 sm:py-10"
              : "section-shell mb-12 rounded-3xl px-5 py-8 text-center sm:mb-14 sm:px-8 sm:py-10"
          }
          whileHover={isHome ? undefined : { y: -1, scale: 1.002 }}
        >
          <p className="eyebrow max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.3em]">Pricing</p>
          <h2 className="mt-4 text-3xl font-medium sm:text-4xl md:text-5xl">One dollar a photo. Less when you bring friends.</h2>
          <p className={`pro-subtitle mt-5 max-w-2xl text-base sm:text-lg ${isHome ? "" : "mx-auto"}`}>
            Start with one. At 10, 20, and 30 photos, the price drops automatically. The calculator does the boring part.
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
                staggerChildren: 0.08,
                delayChildren: 0.06,
              },
            },
          }}
          className="grid gap-4 md:grid-cols-3"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
            whileHover={{ y: -1, scale: 1.001 }}
            className="pro-panel p-6 text-left transition-all duration-550 ease-out hover:border-white/24 hover:bg-white/8 sm:p-8"
          >
            <p className="tone-faint text-sm uppercase tracking-[0.24em] sm:tracking-[0.35em]">10 Photos</p>
            <p className="tone-faint mt-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em]">Small set, tidy rescue</p>
            <p className="mt-6 text-4xl font-semibold sm:text-5xl">$7</p>
            <p className="tone-soft mt-3">Total package price</p>
            <div className="tone-soft mt-8 space-y-3">
              <p>Color behaving itself</p>
              <p>Retouch without plastic skin</p>
              <p>Full-resolution files</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
            whileHover={{ y: -1, scale: 1.001 }}
            className={`section-shell relative p-6 text-left transition-all duration-550 ease-out hover:border-white/34 hover:bg-white/11 sm:p-8 ${
              isHome ? "md:-translate-y-3 md:scale-[1.025] md:border-white/26 md:shadow-[0_28px_80px_-52px_rgba(203,198,188,0.5)]" : ""
            }`}
          >
            <span className="absolute right-5 top-5 rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/75">
              Sweet Spot
            </span>
            <p className="tone-faint text-sm uppercase tracking-[0.24em] sm:tracking-[0.35em]">20 Photos</p>
            <p className="tone-faint mt-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em]">Enough photos to tell the story</p>
            <p className="mt-6 text-4xl font-semibold text-white sm:text-5xl">$14</p>
            <p className="tone-soft mt-3">Total package price</p>
            <div className="tone-soft mt-8 space-y-3">
              <p>One look across the full set</p>
              <p>Consistent, believable color</p>
              <p>Ready to send</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
            whileHover={{ y: -1, scale: 1.001 }}
            className="pro-panel p-6 text-left transition-all duration-550 ease-out hover:border-white/24 hover:bg-white/8 sm:p-8"
          >
            <p className="tone-faint text-sm uppercase tracking-[0.24em] sm:tracking-[0.35em]">30 Photos</p>
            <p className="tone-faint mt-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em]">The whole camera roll. Almost.</p>
            <p className="mt-6 text-4xl font-semibold sm:text-5xl">$21</p>
            <p className="tone-soft mt-3">Total package price</p>
            <div className="tone-soft mt-8 space-y-3">
              <p>One finish across the gallery</p>
              <p>More detailed cleanup</p>
              <p>Priority in the queue</p>
            </div>
          </motion.div>
        </motion.div>

        <div className={`${isHome ? "mx-auto mt-14 w-full max-w-xl" : "pro-shell mx-auto mt-12 w-full max-w-2xl p-3 sm:p-4"}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/upload"
                className="btn-primary cta-sheen inline-flex w-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-550 ease-out max-[390px]:text-[12px] sm:w-auto sm:px-7 sm:tracking-[0.15em]"
              >
                Upload Photos
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/portfolio"
                className="btn-secondary inline-flex w-full px-6 py-3 text-sm uppercase tracking-[0.12em] transition-all duration-550 ease-out max-[390px]:text-[12px] sm:w-auto sm:px-7 sm:tracking-[0.15em]"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
