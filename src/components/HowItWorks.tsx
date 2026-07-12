export default function HowItWorks() {
  return (
    <section className="bg-[#050505] py-24 px-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-gray-500">How it works</p>
          <h2 className="mt-5 text-4xl font-semibold md:text-5xl">A simple workflow.</h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 text-3xl text-white/80">
              1
            </div>
            <h3 className="mt-8 text-2xl font-semibold">Upload</h3>
            <p className="mt-4 text-gray-400">Share your RAW or JPEG files securely.</p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 text-3xl text-white/80">
              2
            </div>
            <h3 className="mt-8 text-2xl font-semibold">We edit</h3>
            <p className="mt-4 text-gray-400">Each image is refined by hand for consistent tone.</p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 text-3xl text-white/80">
              3
            </div>
            <h3 className="mt-8 text-2xl font-semibold">Download</h3>
            <p className="mt-4 text-gray-400">Receive polished files ready to deliver or share.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
