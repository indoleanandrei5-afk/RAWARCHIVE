"use client";

import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const featuredImages = [
  { src: "/images/image6.webp", alt: "Featured photo 6" },
  { src: "/images/image8.webp", alt: "Featured photo 8" },
  { src: "/images/image3.webp", alt: "Featured photo 3" },
  { src: "/images/image14.webp", alt: "Featured photo 14" },
  { src: "/images/image13.webp", alt: "Featured photo 13" },
];

export default function FeaturedWork() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.82;

  return (
    <section className="relative bg-black px-4 py-18 text-white sm:px-6 sm:py-24">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/3 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: MOTION_EASE }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className="section-shell mb-10 rounded-3xl px-5 py-8 sm:mb-14 sm:px-8 sm:py-10"
          whileHover={{ y: -2, scale: 1.007 }}
        >
          <div className="grid gap-6 text-left md:grid-cols-[1.25fr_1fr] md:items-end">
            <div>
              <p className="eyebrow max-[390px]:text-[10px] max-[390px]:tracking-[0.16em] sm:text-sm sm:tracking-[0.3em]">Selected Work</p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: REVEAL_DURATION, delay: 0.08, ease: MOTION_EASE }}
                className="mt-4 text-3xl font-medium max-[390px]:text-[1.75rem] md:text-6xl"
              >
                Work with a steady hand.
              </motion.h2>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: REVEAL_DURATION, delay: 0.12, ease: MOTION_EASE }}
                className="text-[15px] leading-relaxed text-gray-200 max-[390px]:text-sm sm:text-lg"
              >
                Portrait and landscape frames refined with clean tone, measured contrast, and just enough mood to feel memorable.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: REVEAL_DURATION, delay: 0.18, ease: MOTION_EASE }}
                className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/48"
              >
                Curated Highlights
              </motion.p>
            </div>
          </div>
        </motion.div>

        <ImageGallery
          images={featuredImages}
          columns="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6"
          itemClassName={(index, total) => {
            const base = "lg:col-span-2";
            if (total === 5 && index === 3) return `${base} lg:col-start-2`;
            if (total === 5 && index === 4) return `${base} lg:col-start-4`;
            return base;
          }}
        />
      </div>
    </section>
  );
}
