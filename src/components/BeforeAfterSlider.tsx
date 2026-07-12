"use client";

import { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
    };
  }, [isDragging]);

  const handleTouchStart = () => setIsDragging(true);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden rounded-xl group cursor-grab active:cursor-grabbing"
      style={{ aspectRatio: "3/2" }}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image - Full Background (Original) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* Before Image - Overlay with reveal */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover select-none"
          draggable={false}
        />
      </div>

      {/* Divider Line - Thin and elegant */}
      <div
        className="absolute top-0 h-full w-0.5 bg-white/50 group-hover:bg-white transition-colors duration-200"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
        }}
      />

      {/* Handle - Subtle icon */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="flex flex-col items-center gap-1">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <div className="w-1 h-6 bg-white/40" />
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Labels - Subtle, appear on hover */}
      <div className="absolute bottom-3 left-3 opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none">
        <p className="text-xs font-light tracking-widest text-white uppercase">
          Before
        </p>
      </div>
      <div className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none">
        <p className="text-xs font-light tracking-widest text-white uppercase">
          After
        </p>
      </div>
    </div>
  );
}
