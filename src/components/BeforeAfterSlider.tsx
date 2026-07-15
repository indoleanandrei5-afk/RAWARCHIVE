"use client";

import { useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
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
    if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(flushPosition);
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    schedulePosition(percentage);
  };

  useEffect(() => {
    if (!isDragging) return;

    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";

    return () => {
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const finishDrag = () => {
    draggingRef.current = false;
    setIsDragging(false);

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    flushPosition();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    setIsDragging(true);
    setHasInteracted(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    handleMove(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) handleMove(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    finishDrag();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setHasInteracted(true);
      setSliderPosition((current) => Math.max(0, current - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setHasInteracted(true);
      setSliderPosition((current) => Math.min(100, current + step));
    }
  };

  const positionTransition = isDragging
    ? "none"
    : "320ms cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={containerRef}
      className="group relative w-full select-none overflow-hidden rounded-[3px] bg-black ring-1 ring-inset ring-white/10 focus-visible:outline-none focus-visible:ring-white/60 md:cursor-ew-resize"
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={finishDrag}
      onLostPointerCapture={finishDrag}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuetext={`${Math.round(sliderPosition)} percent before image visible`}
    >
      <img
        src={afterSrc}
        alt={`${alt} — final edit`}
        className="block h-auto w-full"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isDragging ? "none" : `clip-path ${positionTransition}`,
        }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} — original source`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/52 to-transparent" />

      <div
        className="pointer-events-none absolute top-0 h-full w-px bg-white/88 shadow-[0_0_14px_rgba(0,0,0,0.55)]"
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
          transition: isDragging ? "none" : `left ${positionTransition}`,
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${sliderPosition}%`,
          transition: isDragging ? "none" : `left ${positionTransition}`,
        }}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border bg-black/72 shadow-[0_8px_26px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[transform,border-color] duration-200 ${
            isDragging ? "scale-105 border-white/90" : "border-white/44 group-hover:border-white/70"
          }`}
        >
          <div className="flex items-center gap-1 text-[11px] text-white/86" aria-hidden="true">
            <span>‹</span>
            <span className="h-3 w-px bg-white/28" />
            <span>›</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-white/78 sm:inset-x-5 sm:bottom-4">
        <span>Before</span>
        <span>After</span>
      </div>

      <div
        className={`pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-[9px] uppercase tracking-[0.2em] text-white/55 transition-opacity duration-500 ${
          hasInteracted ? "opacity-0" : "opacity-100"
        }`}
      >
        Drag to compare
      </div>
    </div>
  );
}
