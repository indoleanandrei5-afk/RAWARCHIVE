"use client";

import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const featuredImages = [
  { src: "/images/portfolio/film-portrait-street.jpeg", alt: "Portrait in warm evening light on a city street", width: 721, height: 1088 },
  { src: "/images/portfolio/film-portrait-motion.jpeg", alt: "Candid flash portrait with deliberate motion", width: 721, height: 1088 },
  { src: "/images/portfolio/film-portrait-dinner.jpeg", alt: "Flash portrait at a dinner table", width: 1444, height: 2178 },
  { src: "/images/image3.webp", alt: "Portrait of two people beside a car", width: 1444, height: 2178 },
  { src: "/images/image7.webp", alt: "Editorial portrait outdoors with restrained color", width: 2075, height: 3130 },
  { src: "/images/portfolio/film-travel-beach.jpeg", alt: "Woman in a sunhat facing the sea", width: 721, height: 1088 },
];

export default function FeaturedWork() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.72;

  return (
    <section className="relative bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/3 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: MOTION_EASE }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className="mb-12 border-y border-white/10 py-8 sm:mb-16 sm:py-10"
        >
          <div className="grid gap-7 text-left md:grid-cols-[1.35fr_1fr] md:items-end md:gap-14">
            <div>
              <p className="eyebrow max-[390px]:text-[10px] max-[390px]:tracking-[0.16em] sm:text-sm sm:tracking-[0.3em]">Selected Work</p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: REVEAL_DURATION, delay: 0.08, ease: MOTION_EASE }}
                className="mt-5 max-w-2xl text-3xl font-medium tracking-[-0.015em] max-[390px]:text-[1.75rem] md:text-6xl"
              >
                A few frames I&apos;m proud of.
              </motion.h2>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: REVEAL_DURATION, delay: 0.12, ease: MOTION_EASE }}
                className="max-w-xl text-[15px] leading-7 text-gray-200 max-[390px]:text-sm sm:text-lg sm:leading-8"
              >
                Some needed a light touch. Some needed rescuing. All of them still look like the photograph they started as.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <ImageGallery
          images={featuredImages}
          columns="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5"
          itemClassName={() => "mb-4 w-full break-inside-avoid lg:mb-5"}
        />
      </div>
    </section>
  );
}
