"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useContent } from "@/context/ContentContext";
import type { HeroCarouselPage } from "@/content/hero";

interface ManagedPageCarouselProps {
  page: HeroCarouselPage;
}

export function ManagedPageCarousel({ page }: ManagedPageCarouselProps) {
  const { content } = useContent();
  const images = content.pageHeroImages[page];
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndex = images.length ? currentIndex % images.length : 0;

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === activeIndex}
            loading={index === activeIndex ? undefined : "lazy"}
            className="object-cover object-center"
            sizes="100vw"
            unoptimized
          />
        </div>
      ))}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
      {images.length > 1 && (
        <div className="pointer-events-auto absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to hero slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
