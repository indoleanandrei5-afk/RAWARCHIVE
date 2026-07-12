export default function WhyChooseUs() {
  return (
    <section className="bg-[#050505] px-5 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500 sm:text-sm sm:tracking-[0.45em]">Why Raw Archive</p>
          <h2 className="mt-5 text-3xl font-semibold sm:text-4xl md:text-5xl">Editing with intention.</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Hand edited",
              description: "Every photo is refined by hand for subtle, natural results.",
            },
            {
              number: "02",
              title: "Fast delivery",
              description: "Swift turnaround without compromising quality or tone.",
            },
            {
              number: "03",
              title: "Transparent pricing",
              description: "Straightforward rates, no subscriptions, no hidden fees.",
            },
          ].map((item) => (
            <div key={item.number} className="group rounded-[32px] border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/10 sm:p-10">
              <div className="inline-flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xl font-semibold text-white">
                  {item.number}
                </div>
                <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
              </div>
              <p className="mt-5 text-gray-400 leading-7 sm:mt-6 sm:leading-8">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
