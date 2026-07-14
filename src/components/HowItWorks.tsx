"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Upload",
      description: "Share your RAW or JPEG files securely.",
    },
    {
      num: "2",
      title: "We Edit",
      description: "Each image is refined by hand for consistent tone.",
    },
    {
      num: "3",
      title: "Download",
      description: "Receive polished files ready to deliver or share.",
    },
  ];

  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-5 text-4xl font-medium md:text-5xl">A simple workflow.</h2>
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
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lux-card p-8 text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/35 text-3xl text-white/85">
                {step.num}
              </div>
              <h3 className="mt-8 text-2xl font-medium">{step.title}</h3>
              <p className="pro-subtitle mt-4 text-sm sm:text-base">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
