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
  const [isLoaded, setIsLoaded] = useState(false);

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
      className="relative w-full bg-black overflow-hidden rounded-lg group cursor-grab active:cursor-grabbing select-none"
      style={{ aspectRatio: "4/3" }}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image - Full size background (no scaling) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Before Image - Pure clip reveal (no scaling) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          width: `${sliderPosition}%`,
          transition: isDragging ? "none" : "width 0.1s ease-out",
        }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Divider - Clean line */}
      <div
        className="absolute top-0 h-full w-px bg-white/40 group-hover:bg-white/70 transition-colors duration-200"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
        }}
      />

      {/* Handle - Arrows showing direction */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          left: `${sliderPosition}%`,
          pointerEvents: "none",
        }}
      >
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <div className="w-0.5 h-6 bg-white/60" />
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
        <p className="text-xs font-light tracking-widest text-white/80 uppercase">Before</p>
      </div>
      <div className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
        <p className="text-xs font-light tracking-widest text-white/80 uppercase">After</p>
      </div>
    </div>
  );
}
