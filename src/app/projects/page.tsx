import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { corporateProjects, projectsIntroduction } from "@/content/projects";
import { ShieldAlert, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Engagements",
  description:
    "Selected representative projects and corporate advisory case studies undertaken by TTB.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{projectsIntroduction.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {projectsIntroduction.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {projectsIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* NDA & Disclosure Banner */}
      <section className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-200/80 dark:border-blue-900/60 py-4">
        <Container>
          <div className="flex items-start sm:items-center gap-3 text-xs text-blue-900 dark:text-blue-200">
            <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
            <p>{projectsIntroduction.disclosureNotice}</p>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            title="Portfolio of Representative Engagements"
            subtitle="Demonstrating cross-functional execution in strategic advisory, operations, and technical governance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Verification Notice & Inquiries */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Request Case Study Verification
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Due to bilateral non-disclosure restrictions, detailed quantitative
              deliverables and direct client references are furnished solely upon
              formal qualification and bilateral approval.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Request Qualified Reference Dossier
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
