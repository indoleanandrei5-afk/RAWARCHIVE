"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type Comparison = {
  id: number;
  category: string;
  alt: string;
  width: number;
  height: number;
};

const comparisons: Comparison[] = [
  {
    id: 3,
    category: "Portrait",
    alt: "Portrait of two people beside a car",
    width: 1444,
    height: 2178,
  },
  {
    id: 7,
    category: "Portrait",
    alt: "Low-light portrait comparison",
    width: 2075,
    height: 3130,
  },
  {
    id: 10,
    category: "Portrait",
    alt: "Natural-light portrait comparison",
    width: 1444,
    height: 2178,
  },
  {
    id: 13,
    category: "Editorial",
    alt: "Editorial portrait comparison",
    width: 1444,
    height: 2178,
  },
  {
    id: 4,
    category: "Architecture",
    alt: "Landscape-format architectural comparison",
    width: 2178,
    height: 1444,
  },
  {
    id: 16,
    category: "Editorial",
    alt: "Wide coastal editorial comparison",
    width: 3130,
    height: 2075,
  },
];

const imageProps = (item: Comparison) => ({
  beforeSrc: `/images/before/image${item.id}.webp`,
  afterSrc: `/images/image${item.id}.webp`,
  alt: item.alt,
});

export default function BeforeAfter() {
  return (
    <main className="page-wrap relative min-h-screen overflow-hidden">
      <div className="page-overlay" />

      <section className="relative z-10 px-4 pb-12 pt-16 sm:px-6 sm:pb-18 sm:pt-24">
        <div className="mx-auto max-w-6xl border-b border-white/12 pb-12 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Before &amp; After</p>
            <h1 className="pro-title mx-auto mt-8 max-w-3xl">Same photograph. Better decisions.</h1>
            <p className="pro-subtitle mx-auto mt-6 max-w-xl text-base sm:text-lg">
              Six real edits, shown without tricks. Move the line and look at the small decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4 sm:mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/56">Six frames</p>
            <p className="font-mono text-[10px] tracking-[0.12em] text-white/28">01—06</p>
          </div>

          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:gap-x-8 lg:gap-y-20">
            {comparisons.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.66, delay: (index % 2) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <div className="mb-3 flex items-center justify-between border-t border-white/12 pt-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-white/28">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/58">{item.category}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/32">Drag</span>
                </div>
                <BeforeAfterSlider {...imageProps(item)} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center border-y border-white/10 py-10 text-center sm:py-14">
          <p className="eyebrow">Keep what made you take it</p>
          <h2 className="mt-6 text-3xl font-medium sm:text-5xl">Lose the weird color cast. Keep the photograph.</h2>
          <p className="pro-subtitle mt-5 max-w-2xl text-base sm:text-lg">
            Tell me what is bothering you—or just send the set and let me find it. I edit every frame myself and keep the full gallery speaking the same language.
          </p>
          <Link href="/upload" className="btn-primary cta-sheen mt-8 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em]">
            Send me the stubborn ones
          </Link>
        </div>
      </section>
    </main>
  );
}
