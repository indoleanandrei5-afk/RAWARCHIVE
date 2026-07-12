"use client";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { motion } from "framer-motion";

const beforeAfterImages = Array.from({ length: 16 }, (_, i) => {
  const num = i + 1;
  const ext = num === 14 ? ".png" : ".jpg";
  return {
    before: `/images/before/image${num}${ext}`,
    after: `/images/image${num}${ext}`,
    num,
  };
});

export default function BeforeAfter() {
  return (
    <main className="relative bg-black px-4 py-24 text-white sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter leading-tight mb-6">
            Before & After
          </h1>
          <p className="text-sm sm:text-base text-gray-400 tracking-wide font-light">
            Professional editing that transforms raw captures into polished imagery
          </p>
        </motion.div>

        {/* Grid: 2 columns on large screens, 1 on mobile */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {beforeAfterImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
            >
              <BeforeAfterSlider
                beforeSrc={item.before}
                afterSrc={item.after}
                beforeAlt={`Photo ${item.num} - Before`}
                afterAlt={`Photo ${item.num} - After`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
