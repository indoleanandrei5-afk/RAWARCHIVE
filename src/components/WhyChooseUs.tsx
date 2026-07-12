"use client";

import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#050505] px-4 py-18 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center"
        >
          <p className="inline-flex rounded-full border border-white/15 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-gray-300 max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.4em]">Why RAW ARCHIVE PHOTOS</p>
          <h2 className="mt-5 text-3xl font-semibold sm:text-4xl md:text-5xl">Editing with intention.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="mt-10 grid gap-5 sm:mt-16 sm:gap-8 md:grid-cols-3"
        >
          {[
            {
              number: "01",
              title: "Hand edited",
              description: "Every photo is refined by hand for subtle, natural results.",
            },
            {
              number: "02",
              title: "Fast delivery",
              description: "Swift turnaround without compromising quality or tone.",
            },
            {
              number: "03",
              title: "Transparent pricing",
              description: "Straightforward rates, no subscriptions, no hidden fees.",
            },
          ].map((item) => (
            <motion.div
              key={item.number}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="group rounded-4xl border border-white/15 bg-white/[0.07] p-6 transition hover:border-white/25 hover:bg-white/11 sm:p-10"
            >
              <div className="inline-flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xl font-semibold text-white">
                  {item.number}
                </div>
                <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
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
