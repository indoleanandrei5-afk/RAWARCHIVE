import ImageGallery from "@/components/ImageGallery";

const portfolioImages = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/image${i + 1}.jpg`,
  alt: `Portfolio photo ${i + 1}`,
}));

export default function Portfolio() {
  return (
    <main className="relative overflow-hidden bg-black px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 rounded-4xl border border-white/10 bg-white/5 px-6 py-10 text-center shadow-[0_28px_90px_-70px_rgba(197,210,227,0.8)] backdrop-blur-sm sm:mb-16 sm:px-8">
          <p className="text-xs uppercase tracking-[0.45em] text-gray-400 sm:text-sm">Portfolio</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl md:text-6xl">Complete Gallery</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-gray-300 sm:text-lg">
            Every uploaded image in one curated presentation, arranged with spacious framing for cleaner viewing.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-gray-500 sm:text-sm">12 images</p>
        </div>

        <ImageGallery images={portfolioImages} columns="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" />
      </div>
    </main>
  );
}
