"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Upload",
      description: "Pick a bundle, send the files, and tell me what you love—or what is driving you mad.",
    },
    {
      num: "2",
      title: "Hand Editing",
      description: "I work through every frame myself, then look at the full set again because consistency likes a second pass.",
    },
    {
      num: "3",
      title: "Delivery",
      description: "You get high-resolution files ready to post, print, send, or stare at proudly.",
    },
  ];

  return (
    <section className="bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-left"
        >
          <p className="eyebrow">What happens next</p>
          <h2 className="mt-5 text-4xl font-medium tracking-[-0.015em] md:text-5xl">Three steps. Zero mystery.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-white/16 pt-7 text-left"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/4 text-sm text-white/76">
                {step.num}
              </div>
              <h3 className="mt-7 text-2xl font-medium">{step.title}</h3>
              <p className="pro-subtitle mt-4 max-w-sm text-sm sm:text-base">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="tone-faint mt-14 flex flex-wrap gap-x-5 gap-y-3 border-y border-white/10 py-4 text-[10px] uppercase tracking-[0.17em] sm:text-xs">
          <span>Usually back in 2–3 business days</span>
          <span aria-hidden="true">•</span>
          <span>Private unless you say otherwise</span>
          <span aria-hidden="true">•</span>
          <span>Full-resolution files</span>
        </div>
      </div>
    </section>
  );
}
