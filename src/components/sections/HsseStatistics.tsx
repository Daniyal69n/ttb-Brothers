"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    setDisplayValue(0);
    let animationFrame = 0;
    let hasStarted = false;

    const animate = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplayValue(value);
        return;
      }

      const startTime = performance.now();
      const duration = 1400;
      const update = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(value * easedProgress);

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(update);
        }
      };

      animationFrame = window.requestAnimationFrame(update);
    };

    if (!("IntersectionObserver" in window)) {
      animate();
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span
      ref={numberRef}
      aria-label={value.toLocaleString("en-US", { maximumFractionDigits: 2 })}
      className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums"
    >
      {displayValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
    </span>
  );
}

export function HsseStatistics() {
  const { content } = useContent();
  const today = new Date();
  const previousMonth = new Intl.DateTimeFormat("en-US", {
    month: "short",
  })
    .format(new Date(today.getFullYear(), today.getMonth() - 1, 1))
    .toUpperCase();

  const statistics = [
    { label: "Exposure Hours", value: content.hsseStatistics.exposureHours },
    { label: "NM/PI", value: content.hsseStatistics.nmPi },
    { label: "Training", value: content.hsseStatistics.training },
    { label: "Incidents", value: content.hsseStatistics.incidents },
    {
      label: "R&R",
      value: content.hsseStatistics.recognitionAndReward,
    },
  ];

  return (
    <section className="bg-black py-14 sm:py-16 border-b border-white/10">
      <Container>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            <span className="text-brand-purple">{previousMonth}</span> HSSE Statistic
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {statistics.map((statistic) => (
            <article
              key={statistic.label}
              className="min-h-36 sm:min-h-40 flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center transition-colors hover:border-brand-purple/60"
            >
              <AnimatedNumber value={statistic.value} />
              <h3 className="text-sm sm:text-base font-medium text-white/70">
                {statistic.label}
              </h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
