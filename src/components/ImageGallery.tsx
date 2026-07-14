"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Image = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  images: Image[];
  columns?: string;
  itemClassName?: (index: number, total: number) => string;
};

export default function ImageGallery({
  images,
  columns = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  itemClassName,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const ease = [0.22, 1, 0.36, 1] as const;
  const cardSpring = { type: "spring", stiffness: 360, damping: 24, mass: 0.72 } as const;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) => (current === null ? null : (current + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, selectedIndex]);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) => (current === null ? null : (current + 1) % images.length));
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className={columns}
      >
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => openImage(index)}
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.62, ease },
              },
            }}
            whileHover={{ y: -6, scale: 1.012 }}
            whileTap={{ y: -2, scale: 0.982 }}
            transition={cardSpring}
            className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_48px_-42px_rgba(221,214,201,0.55)] transition duration-300 hover:border-white/20 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) ${
              itemClassName ? itemClassName(index, images.length) : ""
            }`}
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/38 via-black/6 to-transparent opacity-70 transition duration-300 group-hover:opacity-88" />
              <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="btn-secondary px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  View larger
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(20,20,20,0.94),rgba(2,2,2,0.98))] px-3 py-6 sm:px-6 sm:py-8"
          >
            <motion.button
              type="button"
              onClick={closeGallery}
              whileTap={{ scale: 0.92 }}
              className="modal-button absolute right-3 top-3 h-10 w-10 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
              aria-label="Close gallery"
            >
              ×
            </motion.button>

            <motion.button
              type="button"
              onClick={showPrevious}
              whileTap={{ scale: 0.92 }}
              className="modal-button absolute bottom-4 left-1/2 h-10 w-10 translate-x-[-120%] sm:bottom-auto sm:left-6 sm:top-1/2 sm:h-12 sm:w-12 sm:translate-x-0 sm:-translate-y-1/2"
              aria-label="Previous image"
            >
              ‹
            </motion.button>

            <motion.div
              key={images[selectedIndex].src}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985, y: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.8 }}
              className="relative max-h-[84vh] max-w-[94vw] sm:max-h-[90vh] sm:max-w-[90vw]"
            >
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-h-[84vh] max-w-[94vw] object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
              />
            </motion.div>

            <motion.button
              type="button"
              onClick={showNext}
              whileTap={{ scale: 0.92 }}
              className="modal-button absolute bottom-4 left-1/2 h-10 w-10 translate-x-[20%] sm:bottom-auto sm:right-6 sm:left-auto sm:top-1/2 sm:h-12 sm:w-12 sm:translate-x-0 sm:-translate-y-1/2"
              aria-label="Next image"
            >
              ›
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
