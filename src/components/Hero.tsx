"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.82;

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 36]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.04]);

  const heroStagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.12,
      },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: REVEAL_DURATION, ease: MOTION_EASE },
    },
  };

  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden bg-black pb-14 pt-24 text-white max-[390px]:pb-12 max-[390px]:pt-22 sm:pb-20 sm:pt-30">
      <motion.img
        src="/images/image1.webp"
        alt="Professional portrait photo editing by RAW ARCHIVE PHOTOS"
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-70"
      />
      <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/68 to-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(221,214,201,0.14),transparent_40%)]" />
      <motion.div
        className="ambient-orb right-[8%] top-[20%] h-44 w-44 bg-[radial-gradient(circle,rgba(221,214,201,0.65),transparent_70%)]"
        animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-orb left-[10%] top-[46%] h-36 w-36 bg-[radial-gradient(circle,rgba(187,178,162,0.55),transparent_70%)]"
        animate={{ y: [0, 12, 0], x: [0, -4, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center max-[390px]:px-3 sm:px-6"
      >
        <motion.p variants={heroItem} className="eyebrow mb-6 max-[390px]:px-3 max-[390px]:text-[10px] max-[390px]:tracking-[0.16em] sm:text-xs sm:tracking-[0.36em]">
          Professional photo editing
        </motion.p>

        <motion.h1 variants={heroItem} className="text-3xl font-medium leading-[1.03] tracking-tight text-white max-[390px]:text-[1.78rem] sm:text-5xl md:text-7xl">
          Transform raw photos
          <span className="block text-[0.98em] font-light text-white/92">into clean, elevated visuals.</span>
        </motion.h1>

        <motion.p variants={heroItem} className="tone-soft mx-auto mt-6 max-w-2xl text-[15px] max-[390px]:text-sm sm:mt-8 sm:text-lg md:text-xl">
          Clean, natural edits that still feel like your work on its best day.
        </motion.p>

        <motion.p variants={heroItem} className="tone-muted mx-auto mt-4 max-w-2xl text-sm uppercase tracking-[0.14em] max-[390px]:text-xs max-[390px]:tracking-[0.12em] sm:text-base">
          I do not use AI editing, and I do not support AI-generated retouching workflows. Every image is refined by hand.
        </motion.p>

        <motion.div variants={heroItem} className="tone-faint mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.16em] max-[390px]:gap-x-2 max-[390px]:text-[10px] max-[390px]:tracking-[0.06em] sm:text-sm sm:tracking-[0.28em]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Careful retouching</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Clear communication</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Steady finish</span>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="section-shell mx-auto mt-10 w-full max-w-2xl rounded-3xl p-3 sm:mt-14 sm:p-4"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.008, y: -1 }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
              <Link
                href="/upload"
                onClick={() =>
                  trackEvent("upload_click", {
                    button_location: "hero",
                  })
                }
                className="btn-primary cta-sheen inline-flex w-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-550 ease-out max-[390px]:px-5 max-[390px]:text-[12px] sm:w-auto sm:px-7 sm:tracking-[0.16em]"
              >
                Upload Photos
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 250, damping: 22 }}>
              <Link
                href="/portfolio"
                className="btn-secondary inline-flex w-full px-6 py-3 text-sm uppercase tracking-[0.14em] transition-all duration-550 ease-out max-[390px]:px-5 max-[390px]:text-[12px] sm:w-auto sm:px-7 sm:tracking-[0.16em]"
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          variants={heroItem}
          className="tone-faint mx-auto mt-8 text-[11px] uppercase tracking-[0.24em]"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll To Explore
        </motion.p>
      </motion.div>
    </section>
  );
}
