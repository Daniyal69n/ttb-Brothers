"use client";

import React, { useEffect, useRef, useState } from "react";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale";

interface AnimateOnScrollProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 400,
  threshold = 0.1,
  className = "",
  as: Component = "div",
  ...props
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Initial and animated transform classes per variant
  const getVariantStyles = () => {
    switch (variant) {
      case "fade-up":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none";
      case "fade-down":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none";
      case "fade-left":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-6 pointer-events-none";
      case "fade-right":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-6 pointer-events-none";
      case "scale":
        return isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none";
      case "fade":
      default:
        return isVisible ? "opacity-100" : "opacity-0 pointer-events-none";
    }
  };

  return (
    <Component
      ref={elementRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all ${getVariantStyles()} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
