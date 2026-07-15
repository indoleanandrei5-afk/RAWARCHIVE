"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-medium sm:text-4xl"
        >
          Testimonials
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="pro-shell mt-10 p-8"
        >
          <p className="pro-subtitle text-lg">
            “The edits felt effortless, refined, and true to our brand.”
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/55">
            — Maya, Portrait Photographer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
