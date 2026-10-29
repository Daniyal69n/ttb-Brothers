"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProjectItem } from "@/types";
import { Building2, Calendar, UserCheck, Eye, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails?: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="card-lift bg-white dark:bg-black rounded-xl border border-black-20 dark:border-black-70 overflow-hidden flex flex-col justify-between hover:border-brand-purple dark:hover:border-brand-purple hover:shadow-2xl hover:shadow-brand-purple/15 transition-all duration-300 ease-out group">
      {/* Featured Project Header / Image Container */}
      <div className="relative h-48 sm:h-52 w-full bg-black-70 overflow-hidden border-b border-black-70">
        {project.imagePath && !imgError ? (
          <div className="relative w-full h-full">
            <Image
              src={project.imagePath}
              alt={`${project.title} - ${project.client}`}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-black via-black-70 to-black-60 p-6 flex flex-col justify-between text-white relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-purple font-semibold">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono bg-black/60 px-2.5 py-1 rounded border border-black-70 text-white">
                <Calendar className="w-3.5 h-3.5 text-brand-purple" />
                {project.year}
              </span>
            </div>

            <div className="space-y-1">
              <Building2 className="w-8 h-8 text-brand-purple/70 mb-1 group-hover:scale-110 group-hover:text-brand-purple transition-all duration-300" />
              <p className="text-xs text-black-40 font-mono">Verified TTB Portfolio Contract</p>
            </div>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded border border-black-70 group-hover:border-brand-purple/50 transition-colors">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <span className="text-xs font-semibold text-white bg-brand-purple/90 backdrop-blur-sm px-2.5 py-1 rounded flex items-center gap-1 shadow-sm group-hover:bg-brand-purple transition-colors">
            <UserCheck className="w-3.5 h-3.5" />
            {project.client}
          </span>
          <span className="text-xs font-mono font-medium text-white bg-black/80 px-2 py-0.5 rounded border border-black-70">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors line-clamp-2 mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 line-clamp-3 leading-relaxed mb-4">
            {project.summary}
          </p>

          {project.deliverables && project.deliverables.length > 0 && (
            <div className="pt-3 border-t border-black-20 dark:border-black-70/60 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-black-50">
                Key Scope Items:
              </p>
              <ul className="space-y-1 text-xs text-black-70 dark:text-black-20">
                {project.deliverables.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-black-20 dark:border-black-70/60 flex items-center justify-between">
          <span className="text-xs font-medium text-black-50">
            Status: <strong className="text-black dark:text-white">{project.status}</strong>
          </span>

          {onOpenDetails ? (
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-black-20/20 dark:bg-black-70/40 hover:bg-brand-purple hover:text-white text-black dark:text-white border border-black-20 dark:border-black-70 transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple"
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
            </button>
          ) : (
            <a
              href="/projects/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-black-20/20 dark:bg-black-70/40 hover:bg-brand-purple hover:text-white text-black dark:text-white border border-black-20 dark:border-black-70 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
