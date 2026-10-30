"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ServiceCard } from "./ServiceCard";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export function ServicesGrid() {
  const { content } = useContent();
  const corporateServices = content.services;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {corporateServices.map((service, idx) => (
        <AnimateOnScroll key={service.id} variant="fade-up" delay={idx * 80} className="h-full">
          <ServiceCard service={service} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

