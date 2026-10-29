import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { valuesIntroduction } from "@/content/values";
import { ArrowRight, HardHat, Award, Users, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Values | T & T Brothers (TTB)",
  description:
    "Explore the values of T & T Brothers (TTB): fairness, honesty, integrity, safety & HSSE, teamwork, quality workmanship, and community commitment.",
};

export default function OurValuesPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">{valuesIntroduction.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              {valuesIntroduction.title}
            </h1>
            <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {valuesIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Values Grid Section */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              title="Foundational Operating Values"
              subtitle="Extracted directly from the verified TTB Company Profile and manifested daily through our dedicated workforce of 60 professionals."
            />
          </AnimateOnScroll>

          <ValuesGrid />
        </Container>
      </section>

      {/* 3. Cultural Pillar Highlights (Safety, Training & Recognition) */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <AnimateOnScroll variant="fade-up">
              <SectionHeader
                badge="Living Our Values"
                title="Workforce Safety, Continuous Training &amp; Staff Recognition"
                subtitle="Our values are not abstract slogans; they are practiced across every construction site, training workshop, and client review."
              />
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimateOnScroll variant="fade-up" delay={100} className="card-lift p-6 rounded-2xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-300">
                  <HardHat className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  HSSE-First Operations
                </h4>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  Working in explosive petroleum zones requires absolute discipline. Every staff member holds full safety certifications, undergoes site briefings, and follows strict permit-to-work protocols.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={200} className="card-lift p-6 rounded-2xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-300">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  Merit &amp; Certificate Recognition
                </h4>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  We take pride in our personnel. Dedicated field workers, foremen, and project engineers are recognized at formal company ceremonies and presented with achievement certificates.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={300} className="card-lift p-6 rounded-2xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-300">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  Team Cohesion &amp; Family Spirit
                </h4>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  From annual group gatherings to technical seminars (such as Johnson Controls partner events), our team works with mutual respect, shared accountability, and pride of workmanship.
                </p>
              </AnimateOnScroll>
            </div>

            {/* Photo Organization Note */}
            <AnimateOnScroll variant="fade-up" delay={400} className="card-lift p-5 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 flex items-start gap-3 text-xs text-black-70 dark:text-black-20 leading-relaxed hover:border-brand-purple/40 transition-colors">
              <Camera className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <div>
                <strong className="block text-black dark:text-white mb-0.5">
                  Values Photography Asset Mapping
                </strong>
                <span>
                  Client-supplied photographs representing staff training sessions, safety activities, certificate presentations, and Johnson Controls event moments are cataloged inside <code className="font-mono text-black dark:text-white">public/images/values/</code> and dynamically associated with each value card.
                </span>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* 4. CTA */}
      <section className="py-16 bg-black-20/10 dark:bg-black text-center overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up" className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">
              Partner with a Contractor Built on Enduring Values
            </h3>
            <p className="text-sm text-black-70 dark:text-black-20">
              Discover how our principles translate into reliable commercial project delivery and 24-hour maintenance services.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/services/"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-black dark:text-white bg-white dark:bg-black border border-black-20 dark:border-black-70 hover:border-brand-purple hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                Contact Us
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
