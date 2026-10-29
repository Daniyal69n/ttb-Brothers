import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ServicesHeroCarousel } from "@/components/sections/ServicesHeroCarousel";
import { servicesIntroduction } from "@/content/services";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities | T & T Brothers (TTB)",
  description:
    "Explore T & T Brothers (TTB) 6 core service disciplines: Civil Construction, Architecture & Interior Design, Oil & Gas Retail Solutions, Electro-Mechanical Maintenance, Signage/Supplies, and Facility Management.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Header with Background Carousel */}
      <section className="relative bg-black text-white py-20 md:py-28 min-h-[380px] md:min-h-[440px] flex items-center border-b border-black-70 overflow-hidden">
        <ServicesHeroCarousel />

        <Container className="relative z-30 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">{servicesIntroduction.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              {servicesIntroduction.title}
            </h1>
            <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {servicesIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. 6 Core Service Portfolios Grid */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              title="Six Specialized Service Disciplines"
              subtitle="Extracted directly from the verified TTB Company Profile. We provide complete turnkey execution and SLA-backed maintenance across each discipline."
            />
          </AnimateOnScroll>

          <ServicesGrid />
        </Container>
      </section>

      {/* 3. Delivery Framework & Maintenance Commitment */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <AnimateOnScroll variant="fade-up">
              <SectionHeader
                badge="Execution Framework"
                title="How TTB Delivers Projects &amp; SLA Maintenance"
                subtitle="Our proven project management framework guarantees milestone adherence, strict HSSE compliance, and around-the-clock facility uptime."
              />
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimateOnScroll variant="fade-up" delay={100} className="card-lift p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-xs group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                  01
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  Turnkey EPC Delivery
                </h3>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  End-to-end engineering, procurement, and construction for commercial buildings, retail filling stations, and automated wash bays with single-point accountability.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={200} className="card-lift p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-xs group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                  02
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  Scheduled Preventive Maintenance
                </h3>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  Routine scheduled inspections, tank sump cleaning, dispenser calibration, re-lamping, and electrical testing to prevent operational downtime.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={300} className="card-lift p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-xs group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
                  03
                </div>
                <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  24-Hour Reactive Emergency Service
                </h3>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  Rapid deployment response teams available 24/7 for critical electrical faults, hydraulic failures, storm canopy damage, and petroleum pump emergencies.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Direct CTA */}
      <section className="py-16 bg-black text-white border-t border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up" className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                Ready to Request an Engineering Quote or Maintenance Contract?
              </h3>
              <p className="text-sm text-black-20">
                Contact our engineering operations desk at our Peshawar Head Office or Islamabad Branch.
              </p>
            </div>

            <Link
              href="/contact-us/"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/25 hover:-translate-y-0.5 shrink-0"
            >
              Request an Enquiry
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </AnimateOnScroll>
        </Container>
      </section>
    </div>
  );
}
