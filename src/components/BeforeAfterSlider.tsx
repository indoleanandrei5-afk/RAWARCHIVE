"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden rounded-lg group"
      style={{ aspectRatio: "2/1" }}
    >
      {/* After Image (Right Side - Full Background) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Before Image (Left Half) */}
      <div className="absolute inset-0 w-1/2 overflow-hidden">
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical Divider Line */}
      <div className="absolute top-0 left-1/2 h-full w-px bg-white/30 group-hover:bg-white/50 transition-colors" />

      {/* Labels with smooth appearance */}
      <div className="absolute bottom-4 left-4 text-xs font-light tracking-widest text-gray-300 uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        Before
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-light tracking-widest text-gray-300 uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        After
      </div>
    </div>
  );
}
