import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { companyData } from "@/content/company";
import {
  Compass,
  Eye,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TTB Corporate Group: our mission, strategic vision, operational background, and disciplined approach to enterprise delivery.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">Corporate Identity & Purpose</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              About TTB Corporate Group
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Founded on the principles of disciplined stewardship, transparent
              governance, and operational precision, TTB builds enduring business
              solutions for an evolving global economy.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Introduction & Corporate Background */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                badge="Who We Are"
                title="A Foundation Built on Discipline and Measurable Impact"
                align="left"
                className="mb-6"
              />

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                TTB is an established corporate entity committed to delivering
                structured operational advisory, program governance, and strategic
                execution support to institutional clients and regional partners.
              </p>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our organizational model combines executive foresight with
                hands-on execution capability. We believe sustainable enterprise
                value is forged not through transient trends, but through rigorous
                systems, clear operational benchmarks, and unbending ethical
                commitments.
              </p>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  Corporate History & Archival Notice
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  [Official Corporate History & Founding Archive: To be updated
                  with certified historical records and executive milestones upon
                  formal submission by TTB corporate communications.]
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Corporate Fact Sheet
              </h3>

              <div className="space-y-4 text-sm divide-y divide-slate-200/60 dark:divide-slate-700/60">
                <div className="pt-3 first:pt-0 flex justify-between items-center">
                  <span className="text-slate-500">Legal Entity</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {companyData.name}
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-500">Established</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {companyData.establishedYear}
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-500">Headquarters</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {companyData.headquarters}
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-500">Practice Sectors</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Multi-Industry Advisory
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-slate-500">Primary Partner</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Motion Studio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  To provide institutional leadership, rigorous governance, and
                  operational excellence that empowers our partners, strengthens
                  enterprises, and generates sustainable long-term value for all
                  stakeholders.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Core mandate renewed and monitored annually by TTB leadership.
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  To be recognized as a benchmark of corporate integrity,
                  operational reliability, and transformative value creation
                  across every market and sector in which we operate.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Guided by ethical accountability and measurable performance.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview of The Company's Approach */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            badge="Methodology"
            title="The TTB Operating Approach"
            subtitle="How we structure engagements to ensure consistent quality and risk mitigation."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Diagnostic Audit
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Comprehensive assessment of existing workflows, operational risks,
                and regulatory requirements.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Framework Design
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Development of tailored standard operating procedures, governance
                metrics, and delivery schedules.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Execution Oversight
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Disciplined milestone tracking, risk mitigation, and executive
                dashboard transparency.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Handover & Stewardship
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sustainable transition protocols, stakeholder enablement, and
                post-implementation reviews.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Supporting Visual / Governance Callout */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-950">
        <Container>
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Explore Our Core Corporate Values
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Learn how our six core principles guide our operational choices,
                client relationships, and corporate ethics.
              </p>
            </div>

            <Link
              href="/our-values/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shrink-0"
            >
              View Our Values
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
