import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link
          href="/"
          className="text-xl font-semibold uppercase tracking-[0.35em]"
        >
          RAW ARCHIVE
        </Link>

        <nav className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/upload">Upload</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
