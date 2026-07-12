import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="bg-[#050505] py-24 px-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-gray-500">Pricing</p>
          <h2 className="text-4xl font-semibold md:text-5xl">Minimal pricing, polished results.</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Simple, elegant photo editing priced for independent photographers and small studios.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-white/10 bg-black/40 p-10 text-left transition hover:border-white/20 hover:bg-white/5">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">1 Photo</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-gray-500">Perfect for one standout image</p>
            <p className="mt-6 text-5xl font-semibold">$1</p>
            <p className="mt-3 text-gray-400">Per edited image</p>
            <div className="mt-8 space-y-3 text-gray-300">
              <p>Clean color grade</p>
              <p>Subtle retouch</p>
              <p>High-res export</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 text-left shadow-[0_30px_80px_-60px_rgba(255,255,255,0.3)] transition hover:border-white/20 hover:bg-white/10">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">10 Photos</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-gray-500">Best value for a cohesive set</p>
            <p className="mt-6 text-5xl font-semibold text-white">$7</p>
            <p className="mt-3 text-gray-400">Total package price</p>
            <div className="mt-8 space-y-3 text-gray-300">
              <p>Cohesive batch finish</p>
              <p>Cinematic tone</p>
              <p>Ready to share</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-black/40 p-10 text-left transition hover:border-white/20 hover:bg-white/5">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">30+ Photos</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-gray-500">Gallery polish at a strong rate</p>
            <p className="mt-6 text-5xl font-semibold">$18</p>
            <p className="mt-3 text-gray-400">Total package price</p>
            <div className="mt-8 space-y-3 text-gray-300">
              <p>Full gallery polish</p>
              <p>Advanced detail work</p>
              <p>Priority delivery</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="inline-flex rounded-full border border-white/10 bg-white/10 px-10 py-4 text-sm uppercase tracking-[0.25em] text-white transition hover:border-white/20 hover:bg-white/15"
          >
            Upload Photos
          </Link>
        </div>
      </div>
    </section>
  );
}
