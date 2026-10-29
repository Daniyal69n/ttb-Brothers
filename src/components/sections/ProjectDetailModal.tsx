"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/types";
import { X, Calendar, UserCheck, CheckCircle2, Building2, ArrowRight, ShieldCheck } from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-black rounded-2xl border border-black-20 dark:border-black-70 shadow-2xl overflow-y-auto flex flex-col text-black dark:text-white animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black hover:scale-110 active:scale-95 text-white flex items-center justify-center border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer shadow-md"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Visual Header */}
        <div className="relative h-64 sm:h-80 w-full bg-black-70 overflow-hidden border-b border-black-70 shrink-0">
          {project.imagePath && !imgError ? (
            <div className="relative w-full h-full">
              <Image
                src={project.imagePath}
                alt={`${project.title} - ${project.client}`}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black via-black-70 to-black-60 p-8 flex flex-col justify-between text-white relative">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold bg-brand-purple px-3 py-1 rounded text-white font-mono">
                  {project.category}
                </span>
              </div>
              <div className="space-y-2">
                <Building2 className="w-12 h-12 text-brand-purple" />
                <p className="text-xs text-black-40 font-mono">
                  Verified Contract Record from TTB Corporate Profile
                </p>
              </div>
            </div>
          )}

          {/* Overlay Info */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold bg-brand-purple/95 px-3 py-1 rounded flex items-center gap-1.5 shadow">
                <UserCheck className="w-4 h-4" />
                Client: {project.client}
              </span>
              <span className="text-sm font-mono bg-black/80 px-3 py-1 rounded border border-black-70 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-purple" />
                Completed: {project.year}
              </span>
            </div>
            <span className="text-xs font-semibold bg-black/70 px-3 py-1 rounded text-black-20">
              Contract Status: {project.status}
            </span>
          </div>
        </div>

        {/* Modal Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-purple mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Project Classification: {project.category}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black-60 dark:text-black-40">
              Project Overview & Verification
            </h3>
            <p className="text-sm sm:text-base text-black-70 dark:text-black-20 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Deliverables / Scope */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-black-20 dark:border-black-70">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black-60 dark:text-black-40">
                Verified Scope of Work & Deliverables
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-black-70 dark:text-black-20 bg-black-20/10 dark:bg-black-70/20 p-2.5 rounded-lg border border-black-20 dark:border-black-70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Asset Notice */}
          <div className="p-4 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 text-xs text-black-60 dark:text-black-40 flex items-center justify-between gap-4">
            <span>
              Contract recorded under official T & T Brothers (TTB) Corporate Profile. Asset folder: <code className="font-mono text-black dark:text-white">public{project.imagePath}</code>
            </span>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-black-20 dark:border-black-70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-black-20 dark:border-black-70 text-sm font-medium hover:bg-black-20 dark:hover:bg-black-70 transition-colors"
            >
              Close
            </button>

            <Link
              href={`/contact-us/?subject=${encodeURIComponent(`Inquiry regarding ${project.title}`)}`}
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-brand-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Inquire Regarding Similar Works
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

