"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/upload", label: "Upload" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link
          href="/"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-sm sm:tracking-[0.32em]"
        >
          RAW ARCHIVE PHOTOS
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200 md:hidden"
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
        <nav className="border-t border-white/10 bg-black/95 px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm uppercase tracking-[0.25em] text-gray-300">
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
