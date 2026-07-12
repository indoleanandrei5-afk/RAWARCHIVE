"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Image = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  images: Image[];
  columns?: string;
};

export default function ImageGallery({ images, columns = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" }: ImageGalleryProps) {
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
            className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 transition hover:border-white/20"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={92}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/30" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6 py-8">
          <button
            type="button"
            onClick={closeGallery}
            className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-white/30 hover:bg-black/90"
            aria-label="Close gallery"
          >
            ×
          </button>

          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-white/30 hover:bg-black/90"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="relative h-[80vh] w-[90vw] max-w-[1200px]">
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              fill
              sizes="90vw"
              quality={95}
              className="object-contain object-center"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:border-white/30 hover:bg-black/90"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
