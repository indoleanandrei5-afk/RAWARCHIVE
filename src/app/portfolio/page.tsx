import ImageGallery from "@/components/ImageGallery";

const portfolioImages = [
  { src: "/images/image1.jpg", alt: "Portfolio photo 1" },
  { src: "/images/image2.jpg", alt: "Portfolio photo 2" },
  { src: "/images/image3.jpg", alt: "Portfolio photo 3" },
  { src: "/images/image4.jpg", alt: "Portfolio photo 4" },
  { src: "/images/image5.jpg", alt: "Portfolio photo 5" },
  { src: "/images/image6.jpg", alt: "Portfolio photo 6" },
  { src: "/images/image7.jpg", alt: "Portfolio photo 7" },
  { src: "/images/image8.jpg", alt: "Portfolio photo 8" },
];

export default function Portfolio() {
  return (
    <main className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-gray-500">Portfolio</p>
          <h1 className="mt-4 text-5xl font-semibold">Recent Work</h1>
          <p className="mx-auto mt-6 text-lg text-gray-400">
            A refined collection of portrait and landscape edits with crisp detail and calm tonal balance.
          </p>
        </div>

        <ImageGallery images={portfolioImages} columns="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" />
      </div>
    </main>
  );
}
