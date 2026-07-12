import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-sm text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <p className="font-semibold tracking-[0.2em] text-white">RAW ARCHIVE PHOTOS</p>
          <p className="mt-2 text-gray-300">Refined photo finishing for creators seeking cinematic clarity and timeless tone.</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.22em] md:justify-start">
            <Link href="/portfolio" className="text-gray-300 transition hover:text-white">
              Portfolio
            </Link>
            <Link href="/pricing" className="text-gray-300 transition hover:text-white">
              Pricing
            </Link>
            <Link href="/upload" className="text-gray-300 transition hover:text-white">
              Upload
            </Link>
            <a href="https://instagram.com/andrframes" target="_blank" rel="noreferrer me" className="text-gray-300 transition hover:text-white">
              Instagram
            </a>
            <a href="mailto:andreiindo@icloud.com" className="text-gray-300 transition hover:text-white">
              Email
            </a>
          </div>
        </div>
        <p>© 2026 RAW ARCHIVE PHOTOS</p>
      </div>
    </footer>
  );
}
