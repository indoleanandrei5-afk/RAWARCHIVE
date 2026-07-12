"use client";

import ImageGallery from "@/components/ImageGallery";
import { motion } from "framer-motion";

const featuredImages = [
  { src: "/images/image1.jpg", alt: "Featured photo 1" },
  { src: "/images/image2.jpg", alt: "Featured photo 2" },
  { src: "/images/image3.jpg", alt: "Featured photo 3" },
  { src: "/images/image4.jpg", alt: "Featured photo 4" },
  { src: "/images/image5.jpg", alt: "Featured photo 5" },
  { src: "/images/image7.jpg", alt: "Featured photo 7" },
];

export default function FeaturedWork() {
  return (
    <section className="bg-black px-5 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-14 text-center sm:mb-16"
        >
          <p className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.28em] text-gray-300 sm:text-sm sm:tracking-[0.4em]">Selected Work</p>

          <h2 className="mt-5 text-4xl font-semibold md:text-6xl">A quiet edit suite.</h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-200 sm:text-lg">
            Portrait and landscape images refined with consistent tone, crisp contrast, and subtle mood.
          </p>
        </motion.div>

        <ImageGallery images={featuredImages} />
      </div>
    </section>
  );
}
