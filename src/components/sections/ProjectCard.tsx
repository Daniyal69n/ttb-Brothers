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
    <article className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      {/* Neutral Visual Header Placeholder */}
      <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute right-3 top-3 opacity-10">
          <FolderGit2 className="w-28 h-28" />
        </div>
        <div className="flex items-center justify-between z-10">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-300">
            {project.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {project.year}
          </span>
        </div>
        <div className="z-10">
          <span className="text-xs text-slate-400 block mb-1">
            Archival Dossier Ref: #{project.id}
          </span>
          <h4 className="text-base font-semibold text-slate-100 line-clamp-2">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="mb-3">{getStatusBadge(project.status)}</div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Verified Deliverables:
            </p>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 text-[11px] text-slate-600 dark:text-slate-400 italic">
          * Protected under bilateral non-disclosure agreement.
        </div>
      </div>
    </article>
  );
}
