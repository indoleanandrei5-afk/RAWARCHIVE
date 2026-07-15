"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState({ open: false, pathname });
  const [isScrolled, setIsScrolled] = useState(false);
  const isOpen = menuState.open && menuState.pathname === pathname;
  const closeMenu = () => setMenuState({ open: false, pathname });
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    let frame = 0;
    const syncScrollState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 28;
        setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled));
      });
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncScrollState);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuState({ open: false, pathname });
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuState({ open: false, pathname });
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) document.body.style.paddingRight = `${scrollbarGap}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

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
      className={`sticky top-0 z-50 isolate border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
        isScrolled
          ? "border-white/12 bg-black/96 shadow-[0_16px_42px_-30px_rgba(0,0,0,0.96)]"
          : "border-white/7 bg-black/94"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center gap-4 px-4 sm:px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, ease }} className="shrink-0">
          <Link
            href="/"
            onClick={closeMenu}
            className="whitespace-nowrap break-keep text-[11px] font-medium uppercase tracking-[0.18em] text-white max-[390px]:text-[10px] max-[390px]:tracking-[0.08em] sm:text-sm sm:tracking-[0.28em]"
          >
          <span className="max-[390px]:hidden">RAW ARCHIVE PHOTOS</span>
          <span className="hidden max-[390px]:inline">RAW ARCHIVE</span>
          </Link>
        </motion.div>

        <div className="ml-auto xl:hidden">
          <motion.button
            type="button"
            onClick={() => setMenuState({ open: !isOpen, pathname })}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-11 items-center gap-3 px-1 text-[10px] uppercase tracking-[0.18em] text-white/72 transition-colors hover:text-white"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span>{isOpen ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className={`absolute left-0 top-0.5 h-px w-4 bg-current transition-transform duration-300 ${isOpen ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`absolute bottom-0.5 left-0 h-px w-4 bg-current transition-transform duration-300 ${isOpen ? "-translate-y-1 -rotate-45" : ""}`} />
            </span>
          </motion.button>
        </div>

        <nav className="ml-auto hidden items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-gray-400 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`relative px-2.5 py-3 whitespace-nowrap break-keep transition-colors duration-300 ${
                pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-white/75 transition-[width,opacity] duration-300 ${
                  pathname === link.href ? "w-5 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease }}
            className="absolute inset-x-0 top-full h-[calc(100svh-4.5rem)] border-t border-white/10 bg-[#060605] xl:hidden"
          >
            <nav className="mx-auto h-full max-w-6xl overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <div className="grid text-[13px] uppercase tracking-[0.15em] text-gray-300 sm:grid-cols-2 sm:gap-x-10">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={closeMenu}
                    className={`group flex min-h-14 items-center justify-between border-b px-0 py-4 whitespace-nowrap break-keep transition-colors duration-300 ${
                      pathname === link.href
                        ? "border-white/28 text-white"
                        : "border-white/10 text-gray-400 hover:border-white/22 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[9px] tracking-normal text-white/24">{String(index + 1).padStart(2, "0")}</span>
                      <span>{link.label}</span>
                    </span>
                    <span className={pathname === link.href ? "text-white/70" : "text-white/24 group-hover:text-white/60"} aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
