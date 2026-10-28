import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ValueCard } from "@/components/sections/ValueCard";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { corporateServices } from "@/content/services";
import { corporateProjects } from "@/content/projects";
import { corporateValues } from "@/content/values";
import { companyData } from "@/content/company";
import {
  ArrowRight,
  ShieldCheck,
  Building,
  Target,
  Users2,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home | TTB Corporate Group",
  description:
    "Official corporate portal of TTB. Enterprise advisory, project governance, and operational stewardship.",
};

export default function HomePage() {
  // Select top 3 services for the homepage overview
  const featuredServices = corporateServices.slice(0, 3);
  // Select top 3 projects for the homepage overview
  const featuredProjects = corporateProjects.slice(0, 3);
  // Select top 3 core values
  const featuredValues = corporateValues.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Introduction to TTB Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800">
                <Building className="w-3.5 h-3.5" />
                About TTB
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Committed to Long-Term Corporate Resilience
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {companyData.description}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    <strong>Rigorous Methodologies:</strong> Standardized operating
                    protocols that deliver consistent, verifiable results.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    <strong>Ethical Alignment:</strong> Transparency in stakeholder
                    reporting and bilateral compliance.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    <strong>Adaptive Execution:</strong> Practical strategies
                    structured to perform across dynamic commercial cycles.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about-us/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Read full corporate profile &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-8 sm:p-10 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Operating Benchmarks
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                    Governance Structure
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    Direct Oversight
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Board-level compliance alignment on all programs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                    Quality Standards
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    Strict Verification
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Milestone-driven deliverable sign-offs.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                    Partnership Model
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    Long-Term Value
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Enduring stakeholder collaboration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold block mb-1">
                    Confidentiality
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    NDA Protected
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Complete proprietary data security.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
                All metrics and engagements follow verified corporate audit
                standards.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Overview of Services */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            badge="Services & Capabilities"
            title="Strategic Operational Capabilities"
            subtitle="TTB delivers integrated corporate management, strategic advisory, and operational streamlining across enterprise domains."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              View All 6 Service Portfolios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. Company Strengths or Values */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            badge="Core Philosophy"
            title="Corporate Values Driving Every Decision"
            subtitle="Our standards reflect an uncompromising approach to integrity, discipline, and stakeholder stewardship."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredValues.map((val) => (
              <ValueCard key={val.id} value={val} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/our-values/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Explore our complete governance principles &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. Featured Projects */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            badge="Selected Engagements"
            title="Representative Projects & Case Studies"
            subtitle="A review of strategic initiatives executed across diverse operational disciplines."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              Access Complete Project Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 6. Clients Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            badge="Institutional Network"
            title="Clients & Institutional Partners"
            subtitle="We maintain long-term partnerships across critical commercial sectors."
          />

          <ClientLogoGrid />

          <div className="mt-8 text-center">
            <Link
              href="/clients/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Review client engagement framework &rarr;
            </Link>
          </div>
        </Container>
      </section>

      {/* 7. Careers Call to Action */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-blue-950 text-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-800/60 text-blue-200 border border-blue-700/60">
                <Users2 className="w-3.5 h-3.5" />
                Talent & Leadership
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Interested in Joining the TTB Team?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We welcome high-caliber professionals seeking to contribute to
                rigorous corporate engagements. Discover our culture and submit
                your credentials.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/careers/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors shadow-sm"
              >
                Explore Careers & Culture
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Contact Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <PhoneCall className="w-3.5 h-3.5" />
                Initiate Inquiry
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Start a Conversation with TTB Leadership
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect directly with our corporate operations team to discuss
                service engagements, partnership opportunities, or institutional
                advisory needs.
              </p>

              <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Direct Executive Routing
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Messages are securely received and routed directly to
                      relevant practice leaders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Guaranteed Response Window
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standard business inquiries are acknowledged within one
                      business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
