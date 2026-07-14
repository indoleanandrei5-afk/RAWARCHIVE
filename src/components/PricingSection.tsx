"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PricingSection() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.82;

  return (
    <section className="bg-transparent px-4 py-16 text-white sm:px-6 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className="section-shell mb-12 rounded-3xl px-5 py-8 text-center sm:mb-14 sm:px-8 sm:py-10"
          whileHover={{ y: -2, scale: 1.006 }}
        >
          <p className="eyebrow max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.3em]">Pricing</p>
          <h2 className="mt-4 text-3xl font-medium sm:text-4xl md:text-5xl">Simple pricing, good taste included.</h2>
          <p className="pro-subtitle mx-auto mt-5 max-w-2xl text-base sm:text-lg">
            $1 per photo to start, with automatic bundle discounts every 10 images. Clear numbers, no hidden acrobatics.
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
                staggerChildren: 0.13,
                delayChildren: 0.06,
              },
            },
          }}
          className="grid gap-4 md:grid-cols-3"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
            whileHover={{ y: -5, scale: 1.008 }}
            className="pro-panel p-6 text-left transition-all duration-550 ease-out hover:border-white/24 hover:bg-white/8 sm:p-8"
          >
            <p className="tone-faint text-sm uppercase tracking-[0.24em] sm:tracking-[0.35em]">1 Photo</p>
            <p className="tone-faint mt-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em]">For one image worth getting right</p>
            <p className="mt-6 text-4xl font-semibold sm:text-5xl">$1</p>
            <p className="tone-soft mt-3">Per edited image</p>
            <div className="tone-soft mt-8 space-y-3">
              <p>Clean color grade</p>
              <p>Subtle retouch</p>
              <p>High-res export</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
            whileHover={{ y: -5, scale: 1.008 }}
            className="section-shell relative p-6 text-left transition-all duration-550 ease-out hover:border-white/24 hover:bg-white/11 sm:p-8"
          >
            <span className="absolute right-5 top-5 rounded-full border border-white/16 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/75">
              Most Popular
            </span>
            <p className="tone-faint text-sm uppercase tracking-[0.24em] sm:tracking-[0.35em]">10 Photos</p>
            <p className="tone-faint mt-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em]">Best place to start a proper set</p>
            <p className="mt-6 text-4xl font-semibold text-white sm:text-5xl">$7</p>
            <p className="tone-soft mt-3">Total package price</p>
            <div className="tone-soft mt-8 space-y-3">
              <p>Cohesive batch finish</p>
              <p>Cinematic tone</p>
              <p>Ready to share</p>
            </div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
            whileHover={{ y: -5, scale: 1.008 }}
            className="pro-panel p-6 text-left transition-all duration-550 ease-out hover:border-white/24 hover:bg-white/8 sm:p-8"
          >
            <p className="tone-faint text-sm uppercase tracking-[0.24em] sm:tracking-[0.35em]">30 Photos</p>
            <p className="tone-faint mt-3 text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em]">For larger galleries that need cohesion</p>
            <p className="mt-6 text-4xl font-semibold sm:text-5xl">$21</p>
            <p className="tone-soft mt-3">Total package price</p>
            <div className="tone-soft mt-8 space-y-3">
              <p>Full gallery polish</p>
              <p>Advanced detail work</p>
              <p>Priority delivery</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="pro-shell mx-auto mt-12 w-full max-w-2xl p-3 sm:p-4">
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
