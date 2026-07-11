export default function HowItWorks() {
  return (
    <section className="bg-[#050505] py-32 px-6 text-white">
      <div className="mx-auto max-w-6xl">

        <h2 className="text-center text-5xl font-bold">
          How It Works
        </h2>

        <div className="mt-20 grid gap-10 md:grid-cols-3">

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 text-3xl">
              1
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              Upload
            </h3>

            <p className="mt-4 text-gray-400">
              Upload your RAW or JPEG photos securely.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 text-3xl">
              2
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              We Edit
            </h3>

            <p className="mt-4 text-gray-400">
              Every image is edited carefully to match your style.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 text-3xl">
              3
            </div>

            <h3 className="mt-8 text-2xl font-semibold">
              Download
            </h3>

            <p className="mt-4 text-gray-400">
              Receive your finished images ready for delivery or posting.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
