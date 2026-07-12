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
    <main className="relative bg-black px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">
            Before & After
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-400 tracking-wide">
            Drag the slider to reveal the transformation
          </p>
        </motion.div>

        {/* Sliders Grid */}
        <div className="grid gap-8 sm:gap-12 lg:gap-16">
          {beforeAfterImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
            >
              <BeforeAfterSlider
                beforeSrc={item.before}
                afterSrc={item.after}
                beforeAlt={`${item.alt} - Before`}
                afterAlt={`${item.alt} - After`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
