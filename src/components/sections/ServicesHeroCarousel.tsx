"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Curated true high-resolution (1152px - 1600px) widescreen and landscape photos only
// No low-res thumbnails, eliminating pixelation and extreme cropping
const SERVICES_BACKGROUND_IMAGES = [
  "/images/values/15.jpeg", // 1280x576 (2.22:1 Widescreen)
  "/images/values/21.jpeg", // 1280x590 (2.17:1 Widescreen)
  "/images/values/22.jpeg", // 1280x590 (2.17:1 Widescreen)
  "/images/projects/6.jpeg", // 1152x532 (2.17:1 Widescreen)
  "/images/values/16.jpeg", // 1280x720 (16:9 HD)
  "/images/values/17.jpeg", // 1280x720 (16:9 HD)
  "/images/values/18.jpeg", // 1280x720 (16:9 HD)
  "/images/values/19.jpeg", // 1280x720 (16:9 HD)
  "/images/values/20.jpeg", // 1280x720 (16:9 HD)
  "/images/values/23.jpeg", // 1280x720 (16:9 HD)
  "/images/projects/2.jpeg", // 1280x847
  "/images/projects/3.jpeg", // 1280x847
  "/images/projects/4.jpeg", // 1280x847
  "/images/projects/8.jpeg", // 1280x960
  "/images/projects/1.jpeg", // 1280x958
  "/images/values/13.jpeg", // 1600x1200
  "/images/values/24.jpeg", // 1600x1200
  "/images/values/25.jpeg", // 1600x1200
  "/images/values/26.jpeg", // 1600x1200
  "/images/values/28.jpeg", // 1600x1200
  "/images/values/30.jpeg", // 1600x1200
  "/images/values/32.jpeg", // 1600x1200
];

export function ServicesHeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Smooth periodic transition selecting random next pictures
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        let next = Math.floor(Math.random() * SERVICES_BACKGROUND_IMAGES.length);
        if (next === prev) {
          next = (prev + 1) % SERVICES_BACKGROUND_IMAGES.length;
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {SERVICES_BACKGROUND_IMAGES.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt="TTB Engineering Services & Construction Operations"
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </div>
        );
      })}

      {/* Balanced dark gradient overlay: ensures 100% sharp photo clarity without blur, and clear text legibility */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
    </div>
  );
}
