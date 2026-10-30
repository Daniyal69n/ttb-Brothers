"use client";

import React, { useState, useMemo } from "react";
import { useContent } from "@/context/ContentContext";
import { Search } from "lucide-react";

export function ProjectsTable() {
  const { content } = useContent();
  const projects = content.projects;
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  const years = useMemo(() => {
    const yrs = Array.from(new Set(projects.map((p) => p.year))).sort(
      (a, b) => Number(a) - Number(b)
    );
    return ["All", ...yrs];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects
      .slice()
      .sort((a, b) => Number(a.year) - Number(b.year))
      .filter((p) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q);
        const matchYear = yearFilter === "All" || p.year === yearFilter;
        return matchSearch && matchYear;
      });
  }, [projects, search, yearFilter]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black-40" />
          <input
            type="text"
            placeholder="Search project name or client…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-black-20 dark:border-black-70 bg-white dark:bg-black text-black dark:text-white placeholder-black-40 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple"
          />
        </div>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-lg border border-black-20 dark:border-black-70 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y === "All" ? "All Years" : y}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-black-20 dark:border-black-70 shadow-sm">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-3.5 text-center font-semibold text-xs uppercase tracking-wider w-16 border-r border-black-70">
                Sr #
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wider border-r border-black-70">
                Projects Name
              </th>
              <th className="px-4 py-3.5 text-center font-semibold text-xs uppercase tracking-wider w-36">
                Completion Year
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-20 dark:divide-black-70">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-5 py-10 text-center text-black-50 italic"
                >
                  No projects match your search.
                </td>
              </tr>
            ) : (
              filtered.map((project, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={project.id}
                    className={
                      isEven
                        ? "bg-white dark:bg-black hover:bg-brand-purple/5 transition-colors"
                        : "bg-black-20/30 dark:bg-black-70/30 hover:bg-brand-purple/5 transition-colors"
                    }
                  >
                    <td className="px-4 py-3 text-center font-mono font-semibold text-black dark:text-white border-r border-black-20/60 dark:border-black-70/60">
                      {idx + 1}
                    </td>
                    <td className="px-5 py-3 text-black dark:text-white border-r border-black-20/60 dark:border-black-70/60">
                      <span className="font-medium">{project.title}</span>
                      {project.client && (
                        <span className="ml-2 text-black-50 dark:text-black-30 text-xs">
                          — {project.client}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-black dark:text-white">
                      {project.year}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className="bg-black/5 dark:bg-black-70/40 border-t border-black-20 dark:border-black-70">
              <td
                colSpan={3}
                className="px-5 py-3 text-xs text-black-50 text-right"
              >
                Showing {filtered.length} of {projects.length} projects
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

