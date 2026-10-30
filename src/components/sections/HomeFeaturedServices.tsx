"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ServiceCard } from "./ServiceCard";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export function HomeFeaturedServices() {
  const { content } = useContent();
  const services = content.services.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {services.map((service, idx) => (
        <AnimateOnScroll key={service.id} variant="fade-up" delay={idx * 120} className="h-full">
          <ServiceCard service={service} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

