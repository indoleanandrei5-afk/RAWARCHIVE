"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.82;

  return (
    <section className="bg-black px-4 py-16 text-white sm:px-6 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
          className="text-center"
        >
          <p className="eyebrow max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.3em]">Why RAW ARCHIVE PHOTOS</p>
          <h2 className="mt-5 text-3xl font-medium sm:text-4xl md:text-5xl">Editing with intention.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.06,
              },
            },
          }}
          className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3"
        >
          {[
            {
              number: "01",
              title: "Carefully retouched",
              description: "Every image is handled with restraint and attention, so it looks polished without losing its pulse.",
            },
            {
              number: "02",
              title: "Fast delivery",
              description: "Fast turnaround, without the rushed look or the usual compromises.",
            },
            {
              number: "03",
              title: "Simple pricing",
              description: "Simple rates, no subscriptions, no hidden surprises waiting at checkout.",
            },
          ].map((item) => (
            <motion.div
              key={item.number}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
              whileHover={{ y: -4, scale: 1.008 }}
              className="lux-card group p-6 transition-all duration-550 ease-out hover:border-white/24 hover:bg-white/8 sm:p-8"
            >
              <div className="inline-flex items-center gap-4">
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/48 text-lg font-medium text-white"
                  whileHover={{ rotate: 3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 215, damping: 22 }}
                >
                  {item.number}
                </motion.div>
                <h3 className="text-xl font-medium sm:text-2xl">{item.title}</h3>
              </div>
              <p className="mt-5 text-[15px] leading-7 text-gray-200 sm:mt-6 sm:leading-8">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
