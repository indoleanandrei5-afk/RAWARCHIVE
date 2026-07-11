export default function FeaturedWork() {
  return (
    <section className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            Featured Work
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Portrait & Landscape
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Hand-edited photography by Raw Archive.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          <div className="overflow-hidden rounded-3xl lg:row-span-2">
            <img
              src="/images/image1.jpg"
              alt="Portrait"
              loading="lazy"
              className="h-[700px] w-full object-cover transition duration-500 hover:scale-105 lg:h-full"
            />
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="/images/image2.jpg"
              alt="Landscape"
              loading="lazy"
              className="h-[300px] w-full object-cover transition duration-500 hover:scale-105 lg:h-[320px]"
            />
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="/images/image3.jpg"
              alt="Photography"
              loading="lazy"
              className="h-[300px] w-full object-cover transition duration-500 hover:scale-105 lg:h-[320px]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
