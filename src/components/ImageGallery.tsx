"use client";

import { useEffect, useState } from "react";

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
      <div className={columns}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openImage(index)}
            className={`group overflow-hidden rounded-4xl border border-white/10 bg-white/6 shadow-[0_20px_70px_-55px_rgba(197,210,227,0.8)] transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/9 ${
              itemClassName ? itemClassName(index, images.length) : ""
            }`}
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent opacity-75 transition duration-300 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                  View larger
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-3 py-6 sm:px-6 sm:py-8">
          <button
            type="button"
            onClick={closeGallery}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-white/30 hover:bg-black/90 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute bottom-4 left-1/2 inline-flex h-10 w-10 translate-x-[-120%] items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-white/30 hover:bg-black/90 sm:bottom-auto sm:left-6 sm:top-1/2 sm:h-12 sm:w-12 sm:translate-x-0 sm:-translate-y-1/2"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="relative max-h-[84vh] max-w-[94vw] sm:max-h-[90vh] sm:max-w-[90vw]">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-h-[84vh] max-w-[94vw] object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute bottom-4 left-1/2 inline-flex h-10 w-10 translate-x-[20%] items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-white/30 hover:bg-black/90 sm:bottom-auto sm:right-6 sm:left-auto sm:top-1/2 sm:h-12 sm:w-12 sm:translate-x-0 sm:-translate-y-1/2"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
