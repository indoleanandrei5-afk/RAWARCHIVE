export default function WhyChooseUs() {
  return (
    <section className="bg-[#050505] py-32 px-6 text-white">
      <div className="mx-auto max-w-7xl">

        <p className="uppercase tracking-[0.4em] text-sm text-gray-500 text-center">
          Why Raw Archive
        </p>

        <h2 className="mt-5 text-center text-5xl md:text-6xl font-bold">
          Editing With Intention.
        </h2>

        <div className="mt-24 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 p-10 transition hover:border-white/30 hover:bg-white/5">
            <p className="text-5xl font-light">01</p>

            <h3 className="mt-8 text-2xl font-semibold">
              Hand Edited
            </h3>

            <p className="mt-4 text-gray-400 leading-7">
              Every photo is individually edited by hand. No presets, no AI-only shortcuts.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-10 transition hover:border-white/30 hover:bg-white/5">
            <p className="text-5xl font-light">02</p>

            <h3 className="mt-8 text-2xl font-semibold">
              Fast Delivery
            </h3>

            <p className="mt-4 text-gray-400 leading-7">
              Most orders are completed within 24 hours while maintaining professional quality.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-10 transition hover:border-white/30 hover:bg-white/5">
            <p className="text-5xl font-light">03</p>

            <h3 className="mt-8 text-2xl font-semibold">
              €2 Per Photo
            </h3>

            <p className="mt-4 text-gray-400 leading-7">
              Simple pricing with no subscriptions or hidden fees.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
