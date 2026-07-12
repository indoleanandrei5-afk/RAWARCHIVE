import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-sm text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-semibold tracking-[0.2em] text-white">RAW ARCHIVE PHOTOS</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">Refined photo finishing for creators seeking cinematic clarity and timeless tone.</p>
          </div>
          <div>
            <p className="font-semibold tracking-[0.2em] text-white">Navigation</p>
            <div className="mt-3 space-y-2">
              <Link href="/portfolio" className="block text-sm text-gray-400 transition hover:text-white">
                Portfolio
              </Link>
              <Link href="/pricing" className="block text-sm text-gray-400 transition hover:text-white">
                Pricing
              </Link>
              <Link href="/upload" className="block text-sm text-gray-400 transition hover:text-white">
                Upload
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold tracking-[0.2em] text-white">Connect</p>
            <div className="mt-3 space-y-2">
              <a href="https://instagram.com/rawarchivephotos" target="_blank" rel="noreferrer me" className="block text-sm text-gray-400 transition hover:text-white">
                Instagram
              </a>
              <a href="https://tiktok.com/@rawarchivephotos" target="_blank" rel="noreferrer" className="block text-sm text-gray-400 transition hover:text-white">
                TikTok
              </a>
              <a href="mailto:indoleanandrei5@gmail.com" className="block text-sm text-gray-400 transition hover:text-white">
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 RAW ARCHIVE PHOTOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
