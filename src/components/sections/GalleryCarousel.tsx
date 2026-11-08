"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";

const AUTOPLAY_INTERVAL = 5000;

export function GalleryCarousel() {
  const pathname = usePathname();
  const { content } = useContent();
  const images = content.galleryImages;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (pathname !== "/" || images.length === 0) return null;

  const visibleIndex = activeIndex % images.length;
  const activeImage = images[visibleIndex];
  const changeImage = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <section
      aria-label="Company photo gallery"
      className="border-t border-black-20 bg-white py-12 dark:border-black-70 dark:bg-black sm:py-16"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">
              T &amp; T Brothers
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">
              Our Work in Pictures
            </h2>
          </div>

          <div className="relative aspect-video min-h-56 max-h-[620px] overflow-hidden rounded-2xl bg-neutral-950 shadow-xl">
            <Image
              key={activeImage}
              src={activeImage}
              alt={`T & T Brothers company gallery image ${visibleIndex + 1}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1152px"
              unoptimized
              className="object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Show previous gallery image"
                  onClick={() => changeImage(-1)}
                  className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-white sm:left-5"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  aria-label="Show next gallery image"
                  onClick={() => changeImage(1)}
                  className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-white sm:right-5"
                >
                  <ChevronRight className="size-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/55 px-3 py-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      aria-label={`Show gallery image ${index + 1}`}
                      aria-current={index === visibleIndex}
                      onClick={() => setActiveIndex(index)}
                      className={`size-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                        index === visibleIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <p className="mt-3 text-center text-xs text-black-60 dark:text-black-40" aria-live="polite">
              {visibleIndex + 1} of {images.length}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
