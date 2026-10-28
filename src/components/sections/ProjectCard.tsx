import React from "react";
import { ProjectItem } from "@/types";
import { Badge } from "../ui/Badge";
import { FolderGit2, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "Completed":
        return <Badge variant="primary">Delivered & Verified</Badge>;
      case "In Progress":
        return <Badge variant="accent">Active Implementation</Badge>;
      case "Confidential / Case Study":
        return <Badge variant="neutral">Confidential Case</Badge>;
    }
  };

  return (
    <article className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200/90 dark:border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-gray-300 dark:hover:border-neutral-700 hover:shadow-md transition-all">
      {/* Neutral Visual Header Placeholder */}
      <div className="h-44 bg-gradient-to-br from-neutral-900 to-black p-6 flex flex-col justify-between relative overflow-hidden text-white border-b border-neutral-800">
        <div className="absolute right-3 top-3 opacity-10">
          <FolderGit2 className="w-28 h-28" />
        </div>
        <div className="flex items-center justify-between z-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#f0b8f0]">
            {project.category}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            {project.year}
          </span>
        </div>
        <div className="z-10">
          <span className="text-xs text-gray-400 block mb-1 font-mono">
            Archival Dossier Ref: #{project.id}
          </span>
          <h4 className="text-base font-semibold text-white line-clamp-2">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="mb-3">{getStatusBadge(project.status)}</div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-neutral-800">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Verified Deliverables:
            </p>
            <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a329a3] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 text-[11px] text-gray-500 italic">
          * Protected under bilateral non-disclosure agreement.
        </div>
      </div>
    </article>
  );
}
