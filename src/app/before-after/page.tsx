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
    <main className="relative bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        {/* Hero Section */}
        <section className="px-4 py-32 sm:px-6 md:px-8 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="text-xs sm:text-sm font-light tracking-[0.3em] text-gray-500 uppercase mb-6">
              Visual Transformation
            </p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-light tracking-tighter mb-6 leading-tight">
              Before & After
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
              Professional photo editing that refines raw captures into polished, gallery-ready imagery
            </p>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="px-4 pb-32 sm:px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-20 text-center"
            >
              <p className="text-sm text-gray-500 font-light tracking-wide">
                Drag the slider left and right to compare
              </p>
            </motion.div>

            {/* Single Column Grid */}
            <div className="grid gap-12 md:gap-16">
              {beforeAfterImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.04 }}
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

        {/* Footer Note */}
        <section className="px-4 py-20 sm:px-6 md:px-8 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="text-sm text-gray-500 font-light tracking-wide leading-relaxed">
              Each image undergoes careful editing to enhance tone, contrast, and mood while maintaining natural appearance and fine detail
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
