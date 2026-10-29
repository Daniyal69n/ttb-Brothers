"use client";

import React, { useState, useMemo } from "react";
import { useContent } from "@/context/ContentContext";
import { ProjectItem } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailModal } from "./ProjectDetailModal";
import {
  Search,
  Filter,
  Calendar,
  FolderGit2,
  Camera,
} from "lucide-react";

export function ProjectsPortfolio() {
  const { content } = useContent();
  const corporateProjects = content.projects;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Extract available categories & years
  const categories = useMemo(() => {
    const cats = Array.from(new Set(corporateProjects.map((p) => p.category)));
    return ["All", ...cats];
  }, [corporateProjects]);

  const years = useMemo(() => {
    const yrs = Array.from(new Set(corporateProjects.map((p) => p.year))).sort((a, b) => Number(b) - Number(a));
    return ["All", ...yrs];
  }, [corporateProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return corporateProjects.filter((project) => {
      const matchCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchYear = selectedYear === "All" || project.year === selectedYear;
      const matchSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchYear && matchSearch;
    });
  }, [corporateProjects, selectedCategory, selectedYear, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-black rounded-2xl border border-black-20 dark:border-black-70 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-black-40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or client..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 text-black dark:text-white placeholder:text-black-40 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200"
            />
          </div>

          {/* Result counter */}
          <div className="text-xs font-mono text-black-50">
            Showing <strong className="text-brand-purple font-bold">{filteredProjects.length}</strong> of {corporateProjects.length} verified projects
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-black-20 dark:border-black-70/60">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-black-60 dark:text-black-40 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-brand-purple" /> Scope:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-brand-purple text-white shadow-sm shadow-brand-purple/30 scale-[1.02]"
                    : "bg-black-20/20 dark:bg-black-70/40 text-black dark:text-black-20 hover:text-white hover:bg-black-70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-black-60 dark:text-black-40 mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-purple" /> Year:
            </span>
            {years.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                  selectedYear === yr
                    ? "bg-brand-purple text-white shadow-sm shadow-brand-purple/30 scale-[1.02]"
                    : "bg-black-20/20 dark:bg-black-70/40 text-black dark:text-black-20 hover:text-white hover:bg-black-70"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-black rounded-2xl border border-black-20 dark:border-black-70 p-8 space-y-3">
          <FolderGit2 className="w-12 h-12 text-black-40 mx-auto" />
          <h3 className="text-lg font-bold text-black dark:text-white">
            No projects matched your filter criteria
          </h3>
          <p className="text-xs text-black-60 dark:text-black-40 max-w-sm mx-auto">
            Try resetting your search query or selecting &quot;All&quot; under categories and years.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedYear("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-lg bg-brand-purple text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Additional Project Photography & Gallery Asset Guide */}
      <div className="bg-black-20/10 dark:bg-black-70/20 rounded-2xl border border-black-20 dark:border-black-70 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-brand-purple" />
          <h3 className="text-base sm:text-lg font-bold text-black dark:text-white">
            Supplied Project Photographs & Gallery Asset Mapping
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
          The verified photographs provided by the client have been organized into <code className="font-mono text-black dark:text-white bg-black-20/40 dark:bg-black px-1.5 py-0.5 rounded">public/images/projects/</code>. Each image is matched to confirmed contract records:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-black-70 dark:text-black-20">
          <div className="p-3 rounded-lg bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-1">
            <strong className="text-black dark:text-white block">Total Wash Auto Wash Facility:</strong>
            <span className="text-black-50">Associated with Metro Cash & Carry Auto Wash (2022).</span>
            <code className="text-[10px] text-brand-purple block truncate">public/images/projects/total-wash-project.jpg</code>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-1">
            <strong className="text-black dark:text-white block">Total / Total Quartz Retail Interior:</strong>
            <span className="text-black-50">Associated with Total 2020 Shop and service center fit-outs.</span>
            <code className="text-[10px] text-brand-purple block truncate">public/images/projects/total-quartz-retail-interior.jpg</code>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-1">
            <strong className="text-black dark:text-white block">Fuel Station Forecourt & Canopy:</strong>
            <span className="text-black-50">Associated with Defense Road Filling Station & Markhoor Station.</span>
            <code className="text-[10px] text-brand-purple block truncate">public/images/projects/defense-road-filling-station.jpg</code>
          </div>
        </div>
      </div>
    </div>
  );
}
