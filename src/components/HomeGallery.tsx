"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
];

export default function HomeGallery() {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [lightIndex, setLightIndex] = useState(0);
  const length = IMAGES.length;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % length), 4000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [length]);

  const next = () => setIndex((i) => (i + 1) % length);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  // touch handlers for swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    if (timer.current) window.clearInterval(timer.current);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">More Work</p>
          <h3 className="mt-3 text-4xl font-bold">Selected Frames</h3>
        </div>

        <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="overflow-hidden rounded-3xl">
            <img
              src={IMAGES[index]}
              alt={`Featured ${index + 1}`}
              onClick={() => {
                setLightIndex(index);
                setIsOpen(true);
              }}
              className="h-[520px] w-full object-cover transition duration-700 cursor-zoom-in"
            />
          </div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button
              aria-label="Previous"
              onClick={() => {
                prev();
                if (timer.current) window.clearInterval(timer.current);
              }}
              className="rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
            >
              ‹
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              aria-label="Next"
              onClick={() => {
                next();
                if (timer.current) window.clearInterval(timer.current);
              }}
              className="rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
            >
              ›
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {IMAGES.map((src, i) => (
              <button
                key={src}
                onClick={() => {
                  setIndex(i);
                  if (timer.current) window.clearInterval(timer.current);
                }}
                className={`h-20 w-32 overflow-hidden rounded-xl border-2 transition-all ${
                  i === index ? "border-white" : "border-white/10"
                }`}
              >
                <img src={src} alt={`thumb ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          {/* Lightbox */}
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-2 text-white"
              >
                ✕
              </button>
              <button
                aria-label="Prev"
                onClick={() => setLightIndex((i) => (i - 1 + length) % length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white"
              >
                ‹
              </button>
              <img src={IMAGES[lightIndex]} alt={`Light ${lightIndex + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain" />
              <button
                aria-label="Next"
                onClick={() => setLightIndex((i) => (i + 1) % length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
