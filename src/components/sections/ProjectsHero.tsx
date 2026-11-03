"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const PROJECT_IMAGES = [
  "/images/projects/1.jpeg",
  "/images/projects/2.jpeg",
  "/images/projects/3.jpeg",
  "/images/projects/4.jpeg",
  "/images/projects/5.jpeg",
  "/images/projects/6.jpeg",
  "/images/projects/7.jpeg",
  "/images/projects/8.jpeg",
  "/images/projects/9.jpeg",
  "/images/projects/10.jpeg",
  "/images/projects/fuel-dispensers-canopy-strip.jpg",
  "/images/projects/sana-filling-station-shop.jpg",
  "/images/projects/total-quartz-retail-interior.jpg",
  "/images/projects/total-service-center-shop.jpg",
  "/images/projects/total-wash-bay-detail.jpg",
  "/images/projects/total-wash-project.jpg",
];

const SLIDE_DURATION = 4000; // ms per slide

export function ProjectsHero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const next = useCallback(() => {
    setFading(true);
    setPrev(current);
    setCurrent((c) => (c + 1) % PROJECT_IMAGES.length);
    // Remove old slide after crossfade completes
    setTimeout(() => {
      setPrev(null);
      setFading(false);
    }, 900);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Previous slide (fading out) */}
      {prev !== null && (
        <div
          className="absolute inset-0 transition-opacity duration-900"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <Image
            src={PROJECT_IMAGES[prev]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
            unoptimized
          />
        </div>
      )}

      {/* Current slide (fading in) */}
      <div
        className="absolute inset-0 transition-opacity duration-900"
        style={{ opacity: fading ? 1 : 1 }}
      >
        <Image
          src={PROJECT_IMAGES[current]}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={current === 0}
          unoptimized
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
        {PROJECT_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setPrev(current);
              setCurrent(i);
              setFading(true);
              setTimeout(() => { setPrev(null); setFading(false); }, 900);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

