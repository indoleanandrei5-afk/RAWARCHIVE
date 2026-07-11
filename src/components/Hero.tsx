"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Background image */}
      <img
        src="/images/image7.jpg"
        alt="Hero background"
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.45),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl px-8 text-center"
      >
        <p className="mb-6 uppercase tracking-[0.5em] text-gray-500">
          Professional Photo Editing
        </p>

        <h1 className="text-6xl font-bold leading-none md:text-8xl">
          Transform
          <br />
          Raw Photos
          <br />
          Into Art.
        </h1>

        <p className="mx-auto mt-10 max-w-2xl text-xl text-gray-400">
          Premium editing for photographers who care about every detail.
        </p>

        <div className="mt-12 flex justify-center gap-5">
          <Link
            href="/upload"
            className="rounded-full bg-white px-8 py-4 text-black transition hover:scale-105"
          >
            Upload Photos
          </Link>

          <Link
            href="/portfolio"
            className="rounded-full border border-gray-700 px-8 py-4 hover:border-white"
          >
            Portfolio
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
