"use client";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { motion } from "framer-motion";

const beforeAfterImages = Array.from({ length: 16 }, (_, i) => {
  const num = i + 1;
  const ext = num === 14 ? ".png" : ".jpg";
  return {
    before: `/images/before/image${num}${ext}`,
    after: `/images/image${num}${ext}`,
    alt: `Photo ${num}`,
  };
});

export default function BeforeAfter() {
  return (
    <main className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 text-center shadow-[0_28px_90px_-70px_rgba(197,210,227,0.8)] backdrop-blur-sm sm:px-8 sm:py-10"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-gray-400 max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.45em]">
            Professional Editing
          </p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-5xl md:text-6xl">
            Before & After
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-gray-300 sm:text-lg">
            Slide to see the transformation. From raw captures to refined, professional edits with consistent tone and crisp contrast.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid gap-8 sm:gap-10 md:gap-12">
          {beforeAfterImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="space-y-2"
            >
              <BeforeAfterSlider
                beforeSrc={item.before}
                afterSrc={item.after}
                beforeAlt={`${item.alt} - Before`}
                afterAlt={`${item.alt} - After`}
              />
              <p className="text-sm text-gray-400 text-center">
                {item.alt}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm">
          <p className="text-sm text-gray-400">
            All images edited with attention to tone, contrast, and mood.{" "}
            <span className="text-white font-medium">Drag the slider</span> to
            compare originals with professional edits.
          </p>
        </div>
      </div>
    </main>
  );
}
