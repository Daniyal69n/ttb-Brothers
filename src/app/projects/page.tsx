import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsTable } from "@/components/sections/ProjectsTable";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ManagedPageHeader } from "@/components/sections/ManagedPageHeader";
import { ArrowRight } from "lucide-react";
import { ProjectsHero } from "@/components/sections/ProjectsHero";

export const metadata: Metadata = {
  title: "Projects Portfolio | T & T Brothers (TTB)",
  description:
    "Explore 36+ verified completed infrastructure projects delivered by TTB for Shell Pakistan, Total Parco, PSO, TPPL, and APL from 2018 to 2026.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Header with background carousel */}
      <section className="relative bg-black text-white overflow-hidden" style={{ minHeight: "480px" }}>
        {/* Background slideshow */}
        <ProjectsHero />
        {/* Dark overlay so text is always readable */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Content */}
        <div className="relative z-20 flex items-center" style={{ minHeight: "480px" }}>
          <ManagedPageHeader
            page="projects"
            className="py-24 md:py-32"
            contentClassName="max-w-3xl space-y-4"
          />
        </div>
      </section>

      {/* 2. Projects Table */}
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
