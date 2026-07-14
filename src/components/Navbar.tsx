"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
      if (!event.matches) setIsOpen(false);
    };

    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onViewportChange);
      return () => mediaQuery.removeEventListener("change", onViewportChange);
    }

    mediaQuery.addListener(onViewportChange);
    return () => mediaQuery.removeListener(onViewportChange);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/before-after", label: "Before & After" },
    { href: "/pricing", label: "Pricing" },
    { href: "/services", label: "Services" },
    { href: "/upload", label: "Upload" },
    { href: "/contact", label: "About & Contact" },
  ];

  return (
    <header
      className={`${isMobile ? "relative" : "sticky top-0"} z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-white/12 bg-black/78 shadow-[0_14px_36px_-30px_rgba(0,0,0,0.9)]"
          : "border-white/6 bg-black/54"
      }`}
      style={{ overflow: "visible" }}
    >
      <div className={`mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6 ${isScrolled ? "py-3" : "py-4"}`}>
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="shrink-0">
          <Link
            href="/"
            className="whitespace-nowrap break-keep text-[11px] font-medium uppercase tracking-[0.18em] text-white max-[390px]:text-[10px] max-[390px]:tracking-[0.08em] sm:text-sm sm:tracking-[0.28em]"
          >
          <span className="max-[390px]:hidden">RAW ARCHIVE PHOTOS</span>
          <span className="hidden max-[390px]:inline">RAW ARCHIVE</span>
          </Link>
        </motion.div>

        {isMobile ? (
          <motion.button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            whileTap={{ scale: 0.96 }}
            className="btn-secondary ml-auto inline-flex items-center whitespace-nowrap break-keep px-4 py-2 text-xs uppercase tracking-[0.16em] text-gray-200 max-[390px]:px-3 max-[390px]:tracking-[0.12em]"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? "Close" : "Menu"}
          </motion.button>
        ) : (
          <nav className="ml-auto hidden items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2 py-2 text-xs uppercase tracking-[0.2em] text-gray-400 backdrop-blur-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 whitespace-nowrap break-keep transition hover:text-white/95 ${
                  pathname === link.href ? "bg-white/8 text-white" : "text-gray-400 hover:bg-white/5"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-(--accent) transition-opacity ${
                    pathname === link.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            ))}
          </nav>
        )}
      </div>

      {isMobile && (
        <div
          className={`overflow-hidden border-t border-white/8 transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? "max-h-[38rem] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <nav className="px-4 py-4 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm uppercase tracking-[0.16em] text-gray-300 max-[390px]:text-[13px] max-[390px]:tracking-[0.14em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex min-h-12 items-center rounded-2xl border px-4 py-3 whitespace-nowrap break-keep transition hover:border-white/18 hover:bg-white/8 hover:text-white ${
                    pathname === link.href
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-white/4"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
