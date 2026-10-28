import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { corporateServices, servicesIntroduction } from "@/content/services";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Comprehensive corporate services offered by TTB: advisory, process optimization, enterprise project management, and infrastructure modernization.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{servicesIntroduction.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {servicesIntroduction.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {servicesIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Portfolio Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            title="Operational & Advisory Portfolios"
            subtitle="Explore our specialized practice areas. Each engagement is customized according to client milestones and verified delivery matrices."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* How We Engage Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <SectionHeader
              badge="Engagement Models"
              title="Tailored Service Structures"
              subtitle="We align our engagement model with your governance needs, organizational structure, and timeline constraints."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                  Model 01
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Strategic Advisory Retainer
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ongoing executive counsel, governance reviews, and risk
                  assessments aligned with quarterly planning cycles.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                  Model 02
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Milestone Project Delivery
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Defined scope initiatives with concrete KPIs, structured
                  deliverable stages, and predetermined timeline gates.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                  Model 03
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Embedded Governance
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Integration of senior advisory specialists into project teams
                  to steer complex operational transitions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Direct CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                Discuss an Engagement with Our Team
              </h3>
              <p className="text-sm text-slate-300">
                Contact our practice directors to assess how TTB can support your
                operational priorities.
              </p>
            </div>

            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-sm shrink-0"
            >
              Initiate Contact
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
