"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ValueCard } from "./ValueCard";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export function ValuesGrid() {
  const { content } = useContent();
  const corporateValues = content.values;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {corporateValues.map((value, idx) => (
        <AnimateOnScroll key={value.id} variant="fade-up" delay={idx * 80} className="h-full">
          <ValueCard value={value} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

