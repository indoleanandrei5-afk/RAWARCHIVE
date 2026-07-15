import Link from "next/link";
import SuccessOrderMarker from "@/components/SuccessOrderMarker";

export default function SuccessPage() {
  return (
    <main className="page-wrap relative overflow-hidden px-6 py-24 text-white">
      <SuccessOrderMarker />
      <div className="page-overlay" />

      <div className="page-container mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-green-500/15">
          <span className="text-4xl">✓</span>
        </div>

        <p className="eyebrow">PAYMENT SUCCESSFUL</p>

        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em]">
          Good. I&apos;ll take it from here.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Payment went through and your photos are with me now. You can close this tab and stop thinking about color temperature for a while.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
          <h2 className="mb-4 text-2xl font-semibold">
            What happens next
          </h2>

          <ul className="space-y-4 text-white/80">
            <li>✓ I check your files and read every note.</li>
            <li>✓ I edit the photographs one by one.</li>
            <li>✓ I review the full set before it leaves.</li>
            <li>✓ You get an email the moment everything is ready.</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-primary px-8 py-3"
          >
            Back home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/20 px-8 py-3 transition hover:bg-white hover:text-black"
          >
            Track the order
          </Link>
        </div>
      </div>
    </main>
  );
}
