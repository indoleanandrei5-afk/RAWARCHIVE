import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="bg-black py-32 px-6 text-white">
      <div className="mx-auto max-w-4xl rounded-[40px] border border-white/10 bg-white/[0.03] p-14 text-center">

        <p className="uppercase tracking-[0.4em] text-sm text-gray-500">
          Pricing
        </p>

        <h2 className="mt-6 text-6xl font-bold">
          €2
        </h2>

        <p className="mt-3 text-xl text-gray-400">
          Per professionally edited photo
        </p>

        <div className="mt-12 space-y-4 text-lg text-gray-300">
          <p>✓ Color correction</p>
          <p>✓ Skin retouching</p>
          <p>✓ Cinematic grading</p>
          <p>✓ Exposure & white balance</p>
          <p>✓ High-resolution export</p>
        </div>

        <Link
          href="/upload"
          className="mt-12 inline-block rounded-full bg-white px-10 py-4 text-black font-medium transition hover:scale-105"
        >
          Upload Photos
        </Link>

      </div>
    </section>
  );
}
