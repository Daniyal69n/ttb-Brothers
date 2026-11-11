import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ClientLogoGrid,
  ClientLogoMarquee,
} from "@/components/sections/ClientLogoGrid";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";
import { ManagedPageHeader } from "@/components/sections/ManagedPageHeader";
import { ManagedPageCarousel } from "@/components/sections/ManagedPageCarousel";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Clients & Partners | T & T Brothers (TTB)",
  description:
    "Review TTB's verified corporate clients: Total Parco, Shell Pakistan, PSO, Attock Petroleum, EMAAR, Pepsi Cola, S&P Global, and CBRE.",
};

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="relative bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <ManagedPageCarousel page="clients" />
        <ManagedPageHeader page="clients" />
      </section>

      {/* 2. Scrolling Client Logos */}
      <section className="py-8 sm:py-10 bg-white dark:bg-black border-b border-black-20 dark:border-black-70">
        <Container>
          <ClientLogoMarquee />
        </Container>
      </section>

      {/* 3. Client Grid Section */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              title="Corporate Clients &amp; Partner Network"
              subtitle="Explore our verified corporate clients and industry partners across petroleum downstream, commercial infrastructure, and engineering consulting."
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={150}>
            <ClientLogoGrid />
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 4. Partnership Standards Section */}
      <section className="py-20 bg-white dark:bg-black overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <AnimateOnScroll variant="fade-up" className="text-center space-y-3">
              <Badge variant="neutral">Commitment to Integrity</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">
                How TTB Builds Long-Standing Corporate Relationships
              </h2>
              <p className="text-sm sm:text-base text-black-70 dark:text-black-20 max-w-2xl mx-auto">
                Our client relationships span decades because we deliver realistic pricing, uncompromising engineering standards, and complete HSSE compliance.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <AnimateOnScroll variant="fade-up" delay={100} className="card-lift p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-2 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <CheckCircle2 className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform duration-200" />
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  Multi-Site Coordination
                </h4>
                <p className="text-xs text-black-70 dark:text-black-20 leading-relaxed">
                  Proven capability to execute network-wide canopy rectifications, OWS installations, and retail shop fit-outs simultaneously across multiple geographical locations.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={200} className="card-lift p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-2 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <CheckCircle2 className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform duration-200" />
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  World-Class Sourcing
                </h4>
                <p className="text-xs text-black-70 dark:text-black-20 leading-relaxed">
                  Procuring equipment directly from internationally accredited manufacturers for fuel dispensers, technological car wash bays, and hazardous electrical systems.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={300} className="card-lift p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-2 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
                <CheckCircle2 className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform duration-200" />
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                  Dedicated After-Sales Care
                </h4>
                <p className="text-xs text-black-70 dark:text-black-20 leading-relaxed">
                  Post-handover warranty support and 24-hour reactive emergency maintenance to safeguard our clients&apos; revenue and operational continuity.
                </p>
              </AnimateOnScroll>
            </div>

            <AnimateOnScroll variant="fade-up" delay={400} className="pt-6 text-center">
              <Link
                href="/contact-us/"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
              >
                Inquire Regarding Client Engagements
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </div>
  );
}
