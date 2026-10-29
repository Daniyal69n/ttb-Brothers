"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ValueCard } from "./ValueCard";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export function HomeFeaturedValues() {
  const { content } = useContent();
  const values = content.values.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {values.map((val, idx) => (
        <AnimateOnScroll key={val.id} variant="fade-up" delay={idx * 120}>
          <ValueCard value={val} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

