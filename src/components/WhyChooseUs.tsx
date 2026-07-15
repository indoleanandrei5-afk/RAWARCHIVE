"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.72;

  return (
    <section className="bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className="max-w-2xl text-left"
        >
          <p className="eyebrow max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.3em]">Why send them to me</p>
          <h2 className="mt-5 text-3xl font-medium tracking-[-0.015em] sm:text-4xl md:text-5xl">Because subtle is harder than loud.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.06,
              },
            },
          }}
          className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8"
        >
          {[
            {
              number: "01",
              title: "Skin stays skin",
              description: "I clean distractions, not human texture.",
            },
            {
              number: "02",
              title: "Fast, not frantic",
              description: "Most sets are back in 2–3 business days, without rushed sliders.",
            },
            {
              number: "03",
              title: "The price is the price",
              description: "No subscription, surprise fee, or mysterious add-on.",
            },
          ].map((item) => (
            <motion.div
              key={item.number}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
              whileHover={{ y: -1 }}
              className="group border-t border-white/16 pt-6 transition-all duration-550 ease-out hover:border-white/34 sm:pt-8"
            >
              <div className="inline-flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/4 text-sm font-medium text-white/78">
                  {item.number}
                </div>
                <h3 className="text-xl font-medium sm:text-2xl">{item.title}</h3>
              </div>
              <p className="mt-6 max-w-sm text-[15px] leading-7 text-gray-200 sm:mt-7 sm:leading-8">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className="mt-14 flex flex-col gap-3 border-y border-white/10 py-6 text-sm leading-6 text-gray-300 sm:mt-20 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>One person edits the photographs. One person answers your email.</p>
          <p className="text-white">Conveniently, both are me.</p>
        </motion.div>
      </div>
    </section>
  );
}
