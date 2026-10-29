"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { ProjectCard } from "./ProjectCard";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

export function HomeFeaturedProjects() {
  const { content } = useContent();
  const featured = content.projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featured.length > 0 ? featured : content.projects.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayProjects.map((proj, idx) => (
        <AnimateOnScroll key={proj.id} variant="fade-up" delay={idx * 120}>
          <ProjectCard project={proj} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

