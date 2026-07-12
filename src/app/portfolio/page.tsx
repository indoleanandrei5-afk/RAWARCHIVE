import type { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse the complete RAW ARCHIVE PHOTOS portfolio of hand-edited portraits and landscapes.",
  alternates: {
    canonical: "/portfolio",
  },
};

const portfolioImages = Array.from({ length: 16 }, (_, i) => {
  const num = i + 1;
  const ext = num === 14 ? '.png' : '.jpg';
  return {
    src: `/images/image${num}${ext}`,
    alt: `Portfolio photo ${num}`,
  };
});

export default function Portfolio() {
  return (
    <main className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 text-center shadow-[0_28px_90px_-70px_rgba(197,210,227,0.8)] backdrop-blur-sm sm:mb-16 sm:px-8 sm:py-10">
          <p className="text-xs uppercase tracking-[0.24em] text-gray-400 max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.45em]">Portfolio</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-5xl md:text-6xl">Complete Gallery</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-gray-300 sm:text-lg">
            Every uploaded image in one curated presentation, arranged with spacious framing for cleaner viewing.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-gray-500 max-[390px]:tracking-[0.12em] sm:text-sm sm:tracking-[0.35em]">16 images</p>
        </div>

        <ImageGallery images={portfolioImages} columns="grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3" />
      </div>
    </main>
  );
}
