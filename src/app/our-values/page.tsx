import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ValueCard } from "@/components/sections/ValueCard";
import { corporateValues, valuesIntroduction } from "@/content/values";
import { ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Values",
  description:
    "Explore the corporate values of TTB: integrity, operational excellence, sustainable long-term value, and stakeholder stewardship.",
};

export default function OurValuesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{valuesIntroduction.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {valuesIntroduction.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {valuesIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Values Grid Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            title="The Six Guiding Foundations"
            subtitle="Centralized and standardized principles implemented across all organizational units and client engagements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateValues.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </div>
        </Container>
      </section>

      {/* Governance & Code of Conduct Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <Badge variant="neutral">Governance Architecture</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                How We Safeguard Our Principles
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Values are meaningful only when backed by systematic checks and
                practical oversight.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Compliance & Ethics Reviews
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Periodic internal compliance checks ensure that business
                    dealings adhere strictly to bilateral agreements and
                    statutory frameworks.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Conflict of Interest Avoidance
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Rigorous conflict screening protocols are conducted prior to
                    accepting any advisory or project governance mandate.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Confidentiality & Data Protection
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Robust non-disclosure policies ensure client data and
                    proprietary trade information remain secure across all
                    digital and physical channels.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Inquire About Our Governance Standards
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
