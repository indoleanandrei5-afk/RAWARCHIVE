"use client";

import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const featuredImages = [
  { src: "/images/image6.jpg", alt: "Featured photo 6" },
  { src: "/images/image8.jpg", alt: "Featured photo 8" },
  { src: "/images/image3.jpg", alt: "Featured photo 3" },
  { src: "/images/image14.png", alt: "Featured photo 14" },
  { src: "/images/image13.jpg", alt: "Featured photo 13" },
];

export default function FeaturedWork() {
  return (
    <section className="relative bg-black px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/4 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-12 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 text-center shadow-[0_26px_88px_-70px_rgba(197,210,227,0.85)] backdrop-blur-sm sm:mb-16 sm:px-8 sm:py-10"
        >
          <p className="inline-flex rounded-full border border-white/15 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-300 max-[390px]:text-[10px] max-[390px]:tracking-[0.16em] sm:text-sm sm:tracking-[0.4em]">Selected Work</p>

          <h2 className="mt-4 text-3xl font-semibold max-[390px]:text-[1.75rem] md:text-6xl">A quiet edit suite.</h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] text-gray-200 max-[390px]:text-sm sm:text-lg">
            Portrait and landscape images refined with consistent tone, crisp contrast, and subtle mood.
          </p>
        </motion.div>

        <ImageGallery
          images={featuredImages}
          columns="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6"
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
