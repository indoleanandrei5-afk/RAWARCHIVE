"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
  const REVEAL_DURATION = 0.82;

  return (
    <footer className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(8,8,8,0.96),rgba(4,4,4,1))] py-14 text-sm tone-muted">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: REVEAL_DURATION, ease: MOTION_EASE }}
      >
        <motion.div
          className="pro-shell grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-[1.35fr_1fr_1fr]"
        >
          <div>
            <p className="font-medium tracking-[0.18em] text-white">RAW ARCHIVE PHOTOS</p>
            <p className="pro-subtitle mt-2 text-sm leading-relaxed">I fix awkward color, unruly highlights, and the little distractions your eye keeps finding at 1 a.m.</p>
          </div>
          <div>
            <p className="font-medium tracking-[0.18em] text-white">Navigation</p>
            <div className="mt-3 grid gap-2.5">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                <Link href="/portfolio" className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-550 ease-out hover:border-white/30 hover:bg-white/9">
                  <span className="flex items-center gap-2.5">
                    <span className="icon-chip h-8 w-8 text-white/85">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                        <rect x="4" y="5" width="16" height="14" rx="2" />
                        <path d="M8 12h8" />
                      </svg>
                    </span>
                    <span className="text-sm">Portfolio</span>
                  </span>
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                <Link href="/before-after" className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-550 ease-out hover:border-white/30 hover:bg-white/9">
                  <span className="flex items-center gap-2.5">
                    <span className="icon-chip h-8 w-8 text-white/85">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                        <rect x="3.5" y="5" width="17" height="14" rx="2" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                    <span className="text-sm">Before & After</span>
                  </span>
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                <Link href="/pricing" className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-550 ease-out hover:border-white/30 hover:bg-white/9">
                  <span className="flex items-center gap-2.5">
                    <span className="icon-chip h-8 w-8 text-white/85">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                        <path d="M5 8h14" />
                        <path d="M5 12h10" />
                        <path d="M5 16h8" />
                      </svg>
                    </span>
                    <span className="text-sm">Pricing</span>
                  </span>
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                <Link href="/upload" className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-550 ease-out hover:border-white/30 hover:bg-white/9">
                  <span className="flex items-center gap-2.5">
                    <span className="icon-chip h-8 w-8 text-white/85">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                        <path d="M12 16V6" />
                        <path d="m8 10 4-4 4 4" />
                        <rect x="5" y="16" width="14" height="3" rx="1.5" />
                      </svg>
                    </span>
                    <span className="text-sm">Upload</span>
                  </span>
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                <Link href="/services" className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-550 ease-out hover:border-white/30 hover:bg-white/9">
                  <span className="flex items-center gap-2.5">
                    <span className="icon-chip h-8 w-8 text-white/85">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                        <path d="M4 7h16" />
                        <path d="M4 12h16" />
                        <path d="M4 17h10" />
                      </svg>
                    </span>
                    <span className="text-sm">Services</span>
                  </span>
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
                <Link href="/contact" className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-550 ease-out hover:border-white/30 hover:bg-white/9">
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/7 text-white/85 transition-all duration-500 ease-out group-hover:border-white/30 group-hover:bg-white/14">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                        <circle cx="12" cy="8" r="3" />
                        <path d="M6 18c1.4-2.7 3.5-4 6-4s4.6 1.3 6 4" />
                      </svg>
                    </span>
                    <span className="text-sm">About & Contact</span>
                  </span>
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </Link>
              </motion.div>
            </div>
          </div>
          <div>
            <p className="font-medium tracking-[0.18em] text-white">Connect</p>
            <div className="mt-3 grid gap-2.5">
              <motion.a
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                href="https://instagram.com/rawarchivephotos"
                target="_blank"
                rel="noopener noreferrer me"
                className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/9"
              >
                <span className="flex items-center gap-2.5">
                  <span className="icon-chip h-8 w-8 text-white/85">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <span className="text-sm">Instagram</span>
                </span>
                <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                href="https://tiktok.com/@rawarchivephotos"
                target="_blank"
                rel="noopener noreferrer"
                className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/9"
              >
                <span className="flex items-center gap-2.5">
                  <span className="icon-chip h-8 w-8 text-white/85">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 fill-none stroke-current"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 4v9.3a3.8 3.8 0 1 1-2.4-3.5" />
                      <path d="M14 6.2c.8 1.6 2.1 2.7 4 3.1" />
                    </svg>
                  </span>
                  <span className="text-sm">TikTok</span>
                </span>
                <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                href="mailto:indoleanandrei5@gmail.com"
                className="pro-panel group flex items-center justify-between px-3.5 py-2.5 text-sm text-white/90 transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/9"
              >
                <span className="flex items-center gap-2.5">
                  <span className="icon-chip h-8 w-8 text-white/85">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.6">
                      <rect x="3.5" y="6" width="17" height="12" rx="2" />
                      <path d="m5 8 7 5 7-5" />
                    </svg>
                  </span>
                  <span className="text-sm">Email</span>
                </span>
                <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
        <div className="tone-faint border-t border-white/10 pt-6 text-center text-xs uppercase tracking-[0.12em]">
          <p>© 2026 RAW ARCHIVE PHOTOS. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
