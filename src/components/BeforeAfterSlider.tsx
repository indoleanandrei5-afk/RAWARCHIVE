"use client";

import { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  src: string;
  alt: string;
}

export default function BeforeAfterSlider({
  src,
  alt,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingPositionRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  const flushPosition = () => {
    if (pendingPositionRef.current !== null) {
      setSliderPosition(pendingPositionRef.current);
      pendingPositionRef.current = null;
    }
    frameRef.current = null;
  };

  const schedulePosition = (value: number) => {
    pendingPositionRef.current = value;
    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(flushPosition);
    }
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    schedulePosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "ew-resize";
    }

    return () => {
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - step));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + step));
    }
  };

  const beforeFilter = "brightness(0.89) contrast(0.9) saturate(0.88) sepia(0.08)";

  return (
    <div
      ref={containerRef}
      className="group relative w-full select-none overflow-hidden rounded-[14px] focus-visible:outline-none md:cursor-ew-resize"
      style={{ backgroundColor: "#000", touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setIsDragging(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
    >
      {/* Base layer: uploaded after image (unchanged). */}
      <img
        src={src}
        alt={alt}
        className="block w-full h-auto"
        draggable={false}
      />

      {/* Left side reveals a before-style look from the same image. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isDragging ? "none" : "clip-path 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: beforeFilter,
            transform: "none",
            imageRendering: "auto",
          }}
          draggable={false}
        />
      </div>

      <div
        className="absolute top-0 h-full w-0.5 bg-white/78 transition-all duration-150 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
          transition: isDragging
            ? "none"
            : "left 320ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease",
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`h-10 w-14 rounded-full border border-white/76 bg-black/82 shadow-[0_8px_18px_-12px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.14)] sm:h-9 sm:w-12 flex items-center justify-center transition-all duration-200 ${isDragging ? "scale-105 border-white" : "scale-100 group-hover:scale-[1.03]"}`}>
          <div className="flex items-center gap-1.5">
            <svg className="h-2.5 w-2.5 text-white/88" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            <div className="h-3.5 w-px bg-white/34" />
            <svg className="h-2.5 w-2.5 text-white/88" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 rounded-full border border-white/18 bg-black/40 px-2.5 py-1 opacity-70 group-hover:opacity-95 transition-opacity duration-200 pointer-events-none">
        <p className="text-[10px] font-light tracking-[0.18em] text-white/90 uppercase">Before</p>
      </div>
      <div className="absolute bottom-3 right-3 rounded-full border border-white/18 bg-black/40 px-2.5 py-1 opacity-70 group-hover:opacity-95 transition-opacity duration-200 pointer-events-none text-right">
        <p className="text-[10px] font-light tracking-[0.18em] text-white/90 uppercase">After</p>
      </div>
    </div>
  );
}
