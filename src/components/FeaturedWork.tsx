"use client";

import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const featuredImages = [
  { src: "/images/image6.jpg", alt: "Featured photo 6" },
  { src: "/images/image8.jpg", alt: "Featured photo 8" },
  { src: "/images/image3.jpg", alt: "Featured photo 3" },
  { src: "/images/image11.jpg", alt: "Featured photo 11" },
  { src: "/images/image13.jpg", alt: "Featured photo 13" },
];

export default function FeaturedWork() {
  return (
    <section className="relative bg-black px-5 py-24 text-white sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/4 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-14 rounded-4xl border border-white/10 bg-white/5 px-6 py-10 text-center shadow-[0_26px_88px_-70px_rgba(197,210,227,0.85)] backdrop-blur-sm sm:mb-16 sm:px-8"
        >
          <p className="inline-flex rounded-full border border-white/15 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gray-300 sm:text-sm sm:tracking-[0.4em]">Selected Work</p>

          <h2 className="mt-5 text-4xl font-semibold md:text-6xl">A quiet edit suite.</h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-200 sm:text-lg">
            Portrait and landscape images refined with consistent tone, crisp contrast, and subtle mood.
          </p>
        </motion.div>

        <ImageGallery
          images={featuredImages}
          columns="grid gap-6 sm:grid-cols-2 lg:grid-cols-6"
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
