import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ProjectsTable } from "@/components/sections/ProjectsTable";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { projectsIntroduction } from "@/content/projects";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects Portfolio | T & T Brothers (TTB)",
  description:
    "Explore 36+ verified completed infrastructure projects delivered by TTB for Shell Pakistan, Total Parco, PSO, TPPL, and APL from 2018 to 2026.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">{projectsIntroduction.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              {projectsIntroduction.title}
            </h1>
            <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {projectsIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Official Verification Notice */}
      <section className="bg-brand-purple/10 border-b border-brand-purple/20 py-4 animate-fade-in">
        <Container>
          <div className="flex items-start sm:items-center gap-3 text-xs text-black dark:text-black-20">
            <ShieldCheck className="w-4 h-4 text-brand-purple shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
            <p>
              <strong>Official Profile Record:</strong> {projectsIntroduction.disclosureNotice}
            </p>
          </div>
        </Container>
      </section>

      {/* 3. Projects Table */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              title="Major Projects Detail"
              subtitle="Complete directory of verified contracts delivered by T & T Brothers (TTB) for Shell Pakistan, Total Parco, PSO, TPPL, and APL."
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={150}>
            <ProjectsTable />
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-16 bg-white dark:bg-black overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up" className="max-w-3xl mx-auto text-center space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
              Planning a Similar Construction or Forecourt Project?
            </h3>
            <p className="text-sm sm:text-base text-black-70 dark:text-black-20 leading-relaxed">
              Connect with TTB&apos;s engineering directors to discuss specifications, equipment assembly, and realistic project pricing.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us/"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
              >
                Inquire With Engineering Desk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
