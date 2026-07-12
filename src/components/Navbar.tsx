import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.45em] text-white"
        >
          RAW ARCHIVE
        </Link>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.35em] text-gray-400 md:flex">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <Link href="/portfolio" className="transition hover:text-white">Portfolio</Link>
          <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
          <Link href="/upload" className="transition hover:text-white">Upload</Link>
          <Link href="/contact" className="transition hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
