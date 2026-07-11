const portfolioImages = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
];

export default function Portfolio() {
  return (
    <main className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            Portfolio
          </p>
          <h1 className="mt-4 text-5xl font-bold">Recent Work</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Discover a refined edit suite of portrait and landscape photography, crafted for clients who value cinematic detail and timeless tone.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-3xl bg-neutral-950 shadow-xl shadow-black/20">
              <img
                src={src}
                alt={`Portfolio image ${index + 1}`}
                loading="lazy"
                className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
