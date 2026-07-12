"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/upload", label: "Upload" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-white/15 bg-black/82 shadow-[0_14px_45px_-32px_rgba(0,0,0,0.95)]"
          : "border-white/8 bg-black/62 shadow-black/20"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 ${isScrolled ? "py-3" : "py-4"}`}>
        <Link
          href="/"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white max-[390px]:text-[10px] max-[390px]:tracking-[0.08em] sm:text-sm sm:tracking-[0.32em]"
        >
          <span className="max-[390px]:hidden">RAW ARCHIVE PHOTOS</span>
          <span className="hidden max-[390px]:inline">RAW ARCHIVE</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-200 max-[390px]:px-3 max-[390px]:tracking-[0.12em] md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.35em] text-gray-400 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <nav className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm uppercase tracking-[0.2em] text-gray-300 max-[390px]:text-[13px] max-[390px]:tracking-[0.14em]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
