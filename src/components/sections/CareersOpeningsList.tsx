"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { Badge } from "../ui/Badge";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export function CareersOpeningsList() {
  const { content } = useContent();
  const jobs = content.careers.jobs;
  const contactEmail = content.company.emailGeneral || "info@ttb.org.pk";

  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mb-10">
      <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-brand-purple" />
        <span>Active Vacancies ({jobs.length})</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card-lift p-6 rounded-xl bg-white dark:bg-black border border-black-20 dark:border-black-70 flex flex-col justify-between hover:border-brand-purple transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-brand-purple uppercase tracking-wider font-mono">
                  {job.department}
                </span>
                <Badge variant="accent" className="text-[10px]">
                  {job.type}
                </Badge>
              </div>

              <h4 className="text-lg font-bold text-black dark:text-white">
                {job.title}
              </h4>

              <div className="flex items-center gap-4 text-xs text-black-60 dark:text-black-40">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-purple" />
                  {job.location}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed pt-2">
                {job.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black-20 dark:border-black-70">
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                  `[Job Application] ${job.title} - ${job.id}`
                )}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:underline"
              >
                Apply for this Position <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
