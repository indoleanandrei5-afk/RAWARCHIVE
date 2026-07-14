"use client";

// @ts-ignore -- local TS server intermittently reports a stale alias-resolution error for this import.
import BeforeAfterSlider from "../../components/BeforeAfterSlider";
import { motion } from "framer-motion";

type ImageItem = {
  num: number;
  src: string;
  width: number;
  height: number;
};

const randomScore = (id: number) => {
  const value = Math.sin(id * 9283.341 + 41.19) * 10000;
  return value - Math.floor(value);
};

const beforeAfterImages: ImageItem[] = [
  { num: 1, src: "/images/image1.webp", width: 721, height: 1088 },
  { num: 2, src: "/images/image2.webp", width: 721, height: 1088 },
  { num: 3, src: "/images/image3.webp", width: 1444, height: 2178 },
  { num: 4, src: "/images/image4.webp", width: 2178, height: 1444 },
  { num: 5, src: "/images/image5.webp", width: 2178, height: 1444 },
  { num: 6, src: "/images/image6.webp", width: 722, height: 1088 },
  { num: 7, src: "/images/image7.webp", width: 2075, height: 3130 },
  { num: 8, src: "/images/image8.webp", width: 722, height: 1088 },
  { num: 9, src: "/images/image9.webp", width: 722, height: 1088 },
  { num: 10, src: "/images/image10.webp", width: 1444, height: 2178 },
  { num: 11, src: "/images/image11.webp", width: 721, height: 1088 },
  { num: 12, src: "/images/image12.webp", width: 2075, height: 3129 },
  { num: 13, src: "/images/image13.webp", width: 1444, height: 2178 },
  { num: 14, src: "/images/image14.webp", width: 2075, height: 3129 },
  { num: 15, src: "/images/image15.webp", width: 3339, height: 5035 },
  { num: 16, src: "/images/image16.webp", width: 3130, height: 2075 },
];

export default function BeforeAfter() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I compare before and after edits interactively?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each gallery card includes an interactive slider so you can inspect every transformation.",
        },
      },
      {
        "@type": "Question",
        name: "What changes are made in these before and after examples?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Edits include tonal balancing, color refinement, contrast control, and detailed manual retouching.",
        },
      },
    ],
  };

  const randomizedImages = [...beforeAfterImages].sort(
    (a, b) => randomScore(a.num) - randomScore(b.num),
  );

  const portraits = randomizedImages.filter((item) => item.height >= item.width);
  const landscapes = randomizedImages.filter((item) => item.width > item.height);
  const sourceForLeft = portraits.length > 0 ? portraits : randomizedImages;

  const sortedTall = [...sourceForLeft].sort(
    (a, b) => a.width / a.height - b.width / b.height,
  );

  const featuredTall = sortedTall[0];
  const preferredLandscapes = landscapes
    .filter((item) => item.num !== featuredTall.num)
    .slice(0, 2);

  const featuredRightItems =
    preferredLandscapes.length === 2
      ? preferredLandscapes
      : randomizedImages
          .filter((item) => item.num !== featuredTall.num)
          .slice(0, 2);

  const featuredIds = new Set<number>([
    featuredTall.num,
    ...featuredRightItems.map((item) => item.num),
  ]);

  const remaining = randomizedImages.filter((item) => !featuredIds.has(item.num));

  return (
    <main className="page-wrap relative min-h-screen overflow-hidden">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <motion.div
        className="ambient-orb right-[8%] top-[14%] h-36 w-36 bg-[radial-gradient(circle,rgba(221,214,201,0.5),transparent_70%)]"
        animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-orb left-[7%] top-[48%] h-32 w-32 bg-[radial-gradient(circle,rgba(187,178,162,0.48),transparent_70%)]"
        animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <section className="relative z-10 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pro-shell rounded-3xl px-6 py-8 text-center sm:px-10 md:py-10"
            whileHover={{ scale: 1.006 }}
          >
            <p className="mb-4 text-[11px] font-medium tracking-[0.35em] text-white/55 uppercase">
              Photography
            </p>
            <h1 className="mb-5 text-5xl font-light leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              Before & After
            </h1>
            <p className="pro-subtitle mx-auto mb-7 max-w-2xl text-base font-light sm:text-lg">
              Real edits, real restraint, real improvement. Drag the divider and see exactly what changed.
            </p>
            <div className="tone-faint mx-auto flex max-w-md items-center justify-center gap-3 text-[11px] tracking-[0.22em] uppercase">
              <span>Natural Tone</span>
              <span className="h-px w-8 bg-white/25" />
              <span>Clean Contrast</span>
              <span className="h-px w-8 bg-white/25" />
              <span>Hand Retouch</span>
            </div>
            <p className="tone-faint mx-auto mt-5 max-w-xl text-[11px] uppercase tracking-[0.2em]">
              Drag slowly, or use the arrow keys if you are in a meticulous mood
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 pb-8 md:pb-10">
        <div className="page-container">
          <div className="hidden items-start gap-4 md:grid md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.004 }}
              className="pro-panel md:col-span-5 rounded-[20px] p-1.5 shadow-[0_20px_50px_-42px_rgba(0,0,0,0.85)]"
            >
              <div className="px-3 pb-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-white/44">Featured Comparison</div>
              <BeforeAfterSlider
                src={featuredTall.src}
                alt={`Photo ${featuredTall.num} - Before After Comparison`}
              />
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:col-span-7">
              {featuredRightItems.map((item, index) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: 0.06 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.004 }}
                  className="pro-panel rounded-[20px] p-1.5 shadow-[0_20px_50px_-42px_rgba(0,0,0,0.85)]"
                >
                  <BeforeAfterSlider
                    src={item.src}
                    alt={`Photo ${item.num} - Before After Comparison`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:hidden">
            {[featuredTall, ...featuredRightItems].map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.004 }}
                className="pro-panel rounded-[20px] p-1.5 shadow-[0_20px_50px_-42px_rgba(0,0,0,0.85)]"
              >
                <BeforeAfterSlider
                  src={item.src}
                  alt={`Photo ${item.num} - Before After Comparison`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-24">
        <div className="page-container">
          <div className="section-shell mb-6 flex items-end justify-between rounded-3xl px-5 py-4">
            <p className="tone-faint text-xs font-medium tracking-[0.24em] uppercase">Full Set</p>
            <p className="tone-faint text-[11px] font-light tracking-[0.18em] uppercase">Drag To Compare</p>
          </div>

          <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [column-fill:balance]">
            {remaining.map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.004 }}
                className="pro-panel mb-5 break-inside-avoid rounded-[20px] p-1.5 shadow-[0_20px_50px_-42px_rgba(0,0,0,0.85)]"
              >
                <BeforeAfterSlider
                  src={item.src}
                  alt={`Photo ${item.num} - Before After Comparison`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 py-20">
        <div className="page-container text-center">
          <p className="tone-muted mx-auto max-w-2xl text-sm font-light leading-relaxed tracking-wide">
            Every frame is adjusted with intention, not guesswork, so the final result feels polished without feeling overcooked.
          </p>
        </div>
      </section>
    </main>
  );
}
