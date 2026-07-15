"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.72;

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 16]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.015]);

  const heroStagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08,
      },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: REVEAL_DURATION, ease: MOTION_EASE },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4.25rem)] items-center justify-center overflow-hidden bg-black px-4 py-16 text-white sm:min-h-[calc(100svh-5rem)] sm:px-6 sm:py-20">
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/image1.webp"
          alt="Portrait edited by RAW ARCHIVE PHOTOS"
          fill
          loading="eager"
          quality={92}
          sizes="100vw"
          className="object-cover object-[52%_36%] brightness-[0.76] contrast-[1.04] saturate-[0.86]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-b from-black/52 via-black/58 to-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_66%_24%,rgba(221,214,201,0.16),transparent_42%)]" />
      <div
        className="ambient-orb right-[8%] top-[20%] h-44 w-44 bg-[radial-gradient(circle,rgba(221,214,201,0.65),transparent_70%)]"
      />
      <div
        className="ambient-orb left-[10%] top-[46%] h-36 w-36 bg-[radial-gradient(circle,rgba(187,178,162,0.55),transparent_70%)]"
      />

      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl text-center"
      >
        <motion.p variants={heroItem} className="eyebrow mb-7 max-[390px]:text-[10px] sm:mb-8 sm:text-xs sm:tracking-[0.32em]">
          One-person photo editing studio
        </motion.p>

        <motion.h1 variants={heroItem} className="mx-auto max-w-5xl text-[clamp(2.15rem,6vw,5.35rem)] font-medium leading-[0.98] tracking-[-0.025em] text-white">
          Your photos,
          <span className="mt-2 block text-[0.92em] font-light text-white/90 sm:mt-3">on a very good day.</span>
        </motion.h1>

        <motion.p variants={heroItem} className="tone-soft mx-auto mt-7 max-w-2xl text-[15px] leading-7 sm:mt-9 sm:text-lg md:text-xl">
          I sort the colour, light, and little distractions. You still look like you. The photograph still feels like yours.
        </motion.p>

        <motion.p variants={heroItem} className="tone-muted mx-auto mt-4 max-w-3xl text-xs leading-6 tracking-[0.035em] sm:text-sm sm:leading-7">
          No AI. No generated details. Every frame is edited by me, by hand.
        </motion.p>

        <motion.div variants={heroItem} className="tone-faint mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y border-white/10 py-3 text-[10px] uppercase tracking-[0.12em] sm:mt-7 sm:gap-x-4 sm:text-xs sm:tracking-[0.22em]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Skin stays skin</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>Skies stay believable</span>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>No mystery fees</span>
        </motion.div>

        <motion.div
          variants={heroItem}
          className="mx-auto mt-9 w-full max-w-xl sm:mt-11"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <div>
              <Link
                href="/upload"
                onClick={() =>
                  trackEvent("upload_click", {
                    button_location: "hero",
                  })
                }
                className="btn-primary cta-sheen inline-flex min-h-12 w-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-550 ease-out sm:w-auto sm:min-w-52 sm:text-sm"
              >
                Send Photos
              </Link>
            </div>
            <div>
              <Link
                href="/portfolio"
                className="btn-secondary inline-flex min-h-12 w-full px-7 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-550 ease-out sm:w-auto sm:min-w-52 sm:text-sm"
              >
                See the Work
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div variants={heroItem} className="tone-faint mx-auto mt-9 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.24em] sm:mt-11 sm:text-[11px]">
          <span className="h-px w-7 bg-white/18" aria-hidden="true" />
          <span>There&apos;s more below</span>
          <span aria-hidden="true">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
