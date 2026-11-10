"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import type { NewsItem } from "@/types";

const NEWS_PER_PAGE = 12;

function getPublishedTime(item: NewsItem) {
  const publishedTime = new Date(item.publishedAt).getTime();
  return Number.isNaN(publishedTime) ? 0 : publishedTime;
}

function formatPublishedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function NewsPage() {
  const { content, isHydrated } = useContent();
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const sortedNews = [...content.news].sort(
    (a, b) =>
      getPublishedTime(b) - getPublishedTime(a) ||
      (b.createdAt || "").localeCompare(a.createdAt || "")
  );
  const pageCount = Math.max(1, Math.ceil(sortedNews.length / NEWS_PER_PAGE));
  const activePage = Math.min(currentPage, pageCount);
  const visibleNews = sortedNews.slice(
    (activePage - 1) * NEWS_PER_PAGE,
    activePage * NEWS_PER_PAGE
  );
  const firstVisiblePage = Math.max(1, Math.min(activePage - 3, pageCount - 6));
  const pageNumbers = Array.from(
    { length: Math.min(pageCount, 7) },
    (_, index) => firstVisiblePage + index
  );
  const carouselItems = content.newsCarouselIds
    .map((id) => content.news.find((item) => item.id === id))
    .filter((item): item is NewsItem => item !== undefined);
  const activeCarouselIndex =
    carouselItems.length > 0 ? carouselIndex % carouselItems.length : 0;
  const activeCarouselItem = carouselItems[activeCarouselIndex];
  const heroImages = content.newsHero.images;
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const activeHeroImage = heroImages.length
    ? heroImages[heroImageIndex % heroImages.length]
    : "";

  useEffect(() => {
    if (carouselItems.length < 2) return;
    const intervalId = window.setInterval(() => {
      setCarouselIndex((index) => (index + 1) % carouselItems.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [carouselItems.length]);

  useEffect(() => {
    if (heroImages.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setHeroImageIndex((index) => (index + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [heroImages.length]);

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeCarousel = (direction: -1 | 1) => {
    setCarouselIndex(
      (index) => (index + direction + carouselItems.length) % carouselItems.length
    );
  };

  const changeHeroImage = (direction: -1 | 1) => {
    setHeroImageIndex(
      (index) => (index + direction + heroImages.length) % heroImages.length
    );
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[420px] overflow-hidden bg-neutral-950 text-white sm:min-h-[520px]">
        {activeHeroImage && (
          <Image
            key={activeHeroImage}
            src={activeHeroImage}
            alt=""
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-end px-5 pb-12 pt-28 sm:min-h-[520px] sm:px-8 sm:pb-16 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              <Newspaper className="h-4 w-4" />
              TTB News &amp; Stories
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {content.newsHero.title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {content.newsHero.description}
            </p>
          </div>
        </div>
        {heroImages.length > 1 && (
          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 sm:bottom-8 sm:right-8">
            <button
              type="button"
              onClick={() => changeHeroImage(-1)}
              aria-label="Previous hero image"
              className="inline-flex size-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="min-w-12 text-center text-xs font-medium text-white drop-shadow">
              {((heroImageIndex % heroImages.length) + 1)} / {heroImages.length}
            </span>
            <button
              type="button"
              onClick={() => changeHeroImage(1)}
              aria-label="Next hero image"
              className="inline-flex size-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </section>

      {activeCarouselItem && (
        <section
          aria-label="Featured news carousel"
          className="bg-black/[0.03] py-10 dark:bg-white/[0.03] sm:py-14"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple">
                  Featured stories
                </p>
                <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                  {activeCarouselIndex + 1} of {carouselItems.length}
                </p>
              </div>
              {carouselItems.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => changeCarousel(-1)}
                    aria-label="Previous featured story"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-brand-purple hover:text-brand-purple dark:border-white/20 dark:text-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeCarousel(1)}
                    aria-label="Next featured story"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-brand-purple hover:text-brand-purple dark:border-white/20 dark:text-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              )}
            </div>

            <article className="grid overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-black-70/20 md:grid-cols-2">
              <div className="relative aspect-[16/9] bg-black/5 dark:bg-white/5 md:aspect-auto md:min-h-80">
                {activeCarouselItem.imagePath && (
                  <Image
                    key={activeCarouselItem.imagePath}
                    src={activeCarouselItem.imagePath}
                    alt={activeCarouselItem.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-black/55 dark:text-white/55">
                  <span className="rounded bg-brand-purple px-2.5 py-1 text-white">
                    {activeCarouselItem.category}
                  </span>
                  <time dateTime={activeCarouselItem.publishedAt}>
                    {formatPublishedDate(activeCarouselItem.publishedAt)}
                  </time>
                </div>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl">
                  {activeCarouselItem.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/65 dark:text-white/65">
                  {activeCarouselItem.summary}
                </p>
                {carouselItems.length > 1 && (
                  <div className="mt-6 flex items-center gap-2" aria-label="Choose featured story">
                    {carouselItems.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Show featured story ${index + 1}`}
                        aria-current={index === activeCarouselIndex}
                        onClick={() => setCarouselIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeCarouselIndex
                            ? "w-8 bg-brand-purple"
                            : "w-2.5 bg-black/20 dark:bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="bg-white py-14 dark:bg-black sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-8 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white">
                {content.newsIntro.title}
              </h2>
              <p className="text-sm leading-7 text-black/65 dark:text-white/65">
                {content.newsIntro.description}
              </p>
            </div>
            {sortedNews.length > 0 && (
              <p className="shrink-0 text-xs font-medium text-black/50 dark:text-white/50">
                {sortedNews.length} {sortedNews.length === 1 ? "story" : "stories"}
              </p>
            )}
          </div>

          {!isHydrated && sortedNews.length === 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="animate-pulse space-y-4">
                  <div className="aspect-[4/3] rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-4 w-1/3 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-6 rounded bg-black/10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          ) : visibleNews.length > 0 ? (
            <>
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {visibleNews.map((item) => (
                  <article key={item.id} className="group min-w-0">
                    <div className="image-zoom-box relative mb-4 aspect-[4/3] overflow-hidden bg-black/5 dark:bg-white/5">
                      {item.imagePath ? (
                        <Image
                          src={item.imagePath}
                          alt={item.title}
                          fill
                          unoptimized
                          className="zoom-target object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-black/30 dark:text-white/30">
                          <Newspaper className="h-10 w-10" />
                        </div>
                      )}
                      <span className="absolute left-0 top-4 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm dark:bg-black dark:text-white">
                        {item.category}
                      </span>
                    </div>
                    <time
                      dateTime={item.publishedAt}
                      className="text-[11px] font-semibold uppercase tracking-wider text-black/55 dark:text-white/55"
                    >
                      {formatPublishedDate(item.publishedAt)}
                    </time>
                    <h3 className="mt-2 text-xl font-bold leading-snug text-black transition-colors group-hover:text-brand-purple dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-black/65 dark:text-white/65">
                      {item.summary}
                    </p>
                  </article>
                ))}
              </div>

              {pageCount > 1 && (
                <nav
                  aria-label="News pages"
                  className="mt-14 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => changePage(activePage - 1)}
                    disabled={activePage === 1}
                    aria-label="Previous page"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black transition-colors hover:border-brand-purple hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/25 dark:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => changePage(page)}
                      aria-current={activePage === page ? "page" : undefined}
                      className={`h-10 min-w-10 rounded-full px-3 text-sm font-medium transition-colors ${
                        activePage === page
                          ? "bg-brand-purple text-white"
                          : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => changePage(activePage + 1)}
                    disabled={activePage === pageCount}
                    aria-label="Next page"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black transition-colors hover:border-brand-purple hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/25 dark:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/20 px-6 py-16 text-center dark:border-white/20">
              <Newspaper className="mx-auto h-9 w-9 text-brand-purple" />
              <h3 className="mt-4 text-lg font-bold text-black dark:text-white">
                News is coming soon
              </h3>
              <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                Check back soon for updates and stories from T &amp; T Brothers.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
