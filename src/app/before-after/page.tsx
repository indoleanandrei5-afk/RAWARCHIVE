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
    <main className="relative bg-black text-white min-h-screen">
      {/* Hero Section - Minimal and refined */}
      <section className="relative px-6 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-xs font-light tracking-[0.4em] text-gray-600 uppercase mb-6">
              Photography
            </p>
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-light tracking-tighter mb-8 leading-none">
              Before & After
            </h1>
            <p className="text-base sm:text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Professional color grading and refinement. Drag to compare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery - 2 Column Grid */}
      <section className="px-6 pb-32 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {beforeAfterImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.03 }}
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
      </section>

      {/* Footer - Subtle information */}
      <section className="border-t border-white/5 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-600 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
            Each image is refined with precise control over exposure, color temperature, contrast, and tone to achieve a polished, professional result.
          </p>
        </div>
      </section>
    </main>
  );
}
