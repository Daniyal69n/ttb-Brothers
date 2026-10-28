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
      <section className="bg-black text-white py-16 md:py-24 border-b border-neutral-850">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{clientsIntroduction.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {clientsIntroduction.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {clientsIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Editorial Disclosure Banner */}
      <section className="bg-gray-100 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 py-4">
        <Container>
          <div className="flex items-start sm:items-center gap-3 text-xs text-neutral-800 dark:text-neutral-200">
            <ShieldAlert className="w-4 h-4 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <p>{clientsIntroduction.editorialNote}</p>
          </div>
        </Container>
      </section>

      {/* Client Grid Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-950 border-b border-gray-200/80 dark:border-neutral-800">
        <Container>
          <SectionHeader
            title="Institutional Partner Framework"
            subtitle="Reserved corporate sector slots structured to reflect our cross-industry service footprint."
          />

          <ClientLogoGrid />
        </Container>
      </section>

      {/* Partnership Standards Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <Badge variant="neutral">Engagement Framework</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                How We Partner with Enterprises
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
                Our client relationships are anchored in long-term alignment,
                discretion, and measurable strategic value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 space-y-2">
                <h4 className="text-base font-bold text-black dark:text-white">
                  Executive Discretion
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Every engagement is fortified by strict non-disclosure
                  protocols, ensuring commercial security and privacy at every
                  stage.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/40 space-y-2">
                <h4 className="text-base font-bold text-black dark:text-white">
                  Conflict Screening
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  We maintain strict conflict-of-interest checks to protect our
                  clients against competing mandates within the same target
                  sector.
                </p>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#a329a3] hover:bg-[#8a238a] active:bg-[#731d73] transition-colors shadow-sm"
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
