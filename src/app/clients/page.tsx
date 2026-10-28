import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { clientsIntroduction } from "@/content/clients";
import { ShieldAlert, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Clients & Partners",
  description:
    "TTB corporate clients, institutional partners, and verified enterprise relationship framework.",
};

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{clientsIntroduction.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {clientsIntroduction.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {clientsIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Editorial Disclosure Banner */}
      <section className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200/80 dark:border-amber-900/50 py-4">
        <Container>
          <div className="flex items-start sm:items-center gap-3 text-xs text-amber-900 dark:text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <p>{clientsIntroduction.editorialNote}</p>
          </div>
        </Container>
      </section>

      {/* Client Grid Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <Container>
          <SectionHeader
            title="Institutional Partner Framework"
            subtitle="Reserved corporate sector slots structured to reflect our cross-industry service footprint."
          />

          <ClientLogoGrid />
        </Container>
      </section>

      {/* Partnership Standards Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <Badge variant="neutral">Engagement Framework</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                How We Partner with Enterprises
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Our client relationships are anchored in long-term alignment,
                discretion, and measurable strategic value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Executive Discretion
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Every engagement is fortified by strict non-disclosure
                  protocols, ensuring commercial security and privacy at every
                  stage.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Conflict Screening
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  We maintain strict conflict-of-interest checks to protect our
                  clients against competing mandates within the same target
                  sector.
                </p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Inquire Regarding Institutional Partnership
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
