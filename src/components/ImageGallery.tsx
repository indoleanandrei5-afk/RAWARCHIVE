"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GalleryImage = {
  src: string;
  alt: string;
  category?: string;
  caption?: string;
  width: number;
  height: number;
};

type ImageGalleryProps = {
  images: GalleryImage[];
  columns?: string;
  itemClassName?: (index: number, total: number) => string;
  mediaClassName?: (index: number, total: number) => string;
  itemClassNames?: string[];
  mediaClassNames?: string[];
  showFilters?: boolean;
};

const padNumber = (value: number) => String(value).padStart(2, "0");

export default function ImageGallery({
  images,
  columns = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  itemClassName,
  mediaClassName,
  itemClassNames,
  mediaClassNames,
  showFilters = false,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const ease = [0.22, 1, 0.36, 1] as const;
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((image) => image.category).filter(Boolean) as string[]))],
    [images],
  );
  const visibleImages = useMemo(
    () => activeCategory === "All" ? images : images.filter((image) => image.category === activeCategory),
    [activeCategory, images],
  );
  const isGalleryOpen = selectedIndex !== null;
  const selectedImage = selectedIndex === null ? null : visibleImages[selectedIndex];

  useEffect(() => {
    if (!isGalleryOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => (current === null ? null : (current + 1) % visibleImages.length));
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + visibleImages.length) % visibleImages.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, visibleImages.length]);

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + visibleImages.length) % visibleImages.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) => (current === null ? null : (current + 1) % visibleImages.length));
  };

  return (
    <>
      {showFilters && categories.length > 2 ? (
        <div className="mb-9 overflow-x-auto border-y border-white/10 sm:mb-12">
          <div className="flex min-w-max items-center gap-7 py-4 sm:gap-9">
            {categories.map((category) => {
              const count = category === "All"
                ? images.length
                : images.filter((image) => image.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(null);
                    setActiveCategory(category);
                  }}
                  aria-pressed={activeCategory === category}
                  className={`group/filter relative flex items-baseline gap-2 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 sm:text-xs ${
                    activeCategory === category ? "text-white" : "text-white/42 hover:text-white/78"
                  }`}
                >
                  <span>{category}</span>
                  <span className="font-mono text-[9px] tracking-normal text-white/30">{padNumber(count)}</span>
                  <span
                    className={`absolute -bottom-4 left-0 h-px bg-white transition-[width,opacity] duration-500 ${
                      activeCategory === category ? "w-full opacity-80" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <motion.div
        key={activeCategory}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.035 } },
        }}
        className={columns}
      >
        {visibleImages.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.58, ease } },
            }}
            className={`group block text-left focus-visible:outline-none ${
              itemClassNames?.[index] ?? (itemClassName ? itemClassName(index, visibleImages.length) : "")
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-[3px] bg-[#0c0c0b] ring-1 ring-inset ring-white/[0.08] ${
                mediaClassNames?.[index] ??
                (mediaClassName ? mediaClassName(index, visibleImages.length) : "")
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-[0.94] group-hover:scale-[1.008]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/34 text-sm text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:right-4 sm:top-4">
                ↗
              </span>
            </div>

            {image.category || image.caption ? (
              <div className="mt-3 flex items-start justify-between gap-5 border-t border-white/10 pt-3">
                <div>
                  {image.category ? (
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/56">{image.category}</p>
                  ) : null}
                  {image.caption ? (
                    <p className="mt-1.5 max-w-sm text-sm leading-6 text-white/72">{image.caption}</p>
                  ) : null}
                </div>
                <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-white/28">
                  {padNumber(index + 1)}
                </span>
              </div>
            ) : null}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && selectedIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-[#050504] px-4 pb-20 pt-18 sm:px-16 sm:pb-16 sm:pt-16"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery viewer"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedIndex(null);
            }}
          >
            <div className="absolute inset-x-4 top-0 flex h-16 items-center justify-between border-b border-white/10 sm:inset-x-7">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.18em] text-white/48">
                <span>{selectedImage.category ?? "Archive"}</span>
                <span className="h-3 w-px bg-white/14" />
                <span className="font-mono tracking-[0.12em]">
                  {padNumber(selectedIndex + 1)} / {padNumber(visibleImages.length)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="py-2 text-[10px] uppercase tracking-[0.2em] text-white/58 transition-colors hover:text-white"
                aria-label="Close gallery"
              >
                Close
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={selectedImage.src}
                src={selectedImage.src}
                alt={selectedImage.alt}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.38, ease }}
                className="max-h-[calc(100svh-9rem)] max-w-[calc(100vw-2rem)] object-contain sm:max-w-[calc(100vw-9rem)]"
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={showPrevious}
              className="absolute bottom-5 left-4 flex h-11 items-center gap-2 px-2 text-[10px] uppercase tracking-[0.18em] text-white/48 transition-colors hover:text-white sm:bottom-auto sm:left-7 sm:top-1/2 sm:-translate-y-1/2"
              aria-label="Previous image"
            >
              <span className="text-lg">←</span>
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute bottom-5 right-4 flex h-11 items-center gap-2 px-2 text-[10px] uppercase tracking-[0.18em] text-white/48 transition-colors hover:text-white sm:bottom-auto sm:right-7 sm:top-1/2 sm:-translate-y-1/2"
              aria-label="Next image"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="text-lg">→</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
