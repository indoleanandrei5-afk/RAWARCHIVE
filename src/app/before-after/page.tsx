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
    <main className="relative bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 py-32 sm:px-6 md:px-8 md:py-40 lg:py-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs sm:text-sm font-light tracking-[0.35em] text-gray-600 uppercase mb-8">
            Editing Process
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            Before & After
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
            Explore our editing process. Drag the slider to see how professional color grading and refinement transforms raw captures into polished imagery.
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="relative px-4 pb-40 sm:px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16 md:gap-20">
            {beforeAfterImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
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

      {/* Footer Section */}
      <section className="relative px-4 py-24 sm:px-6 md:px-8 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm text-gray-600 font-light tracking-wide leading-relaxed">
            Each image is carefully edited with attention to color temperature, highlights, shadows, and overall tone. The goal is to preserve natural beauty while enhancing clarity and impact.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
