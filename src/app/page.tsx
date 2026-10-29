import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeFeaturedServices } from "@/components/sections/HomeFeaturedServices";
import { HomeFeaturedValues } from "@/components/sections/HomeFeaturedValues";
import { HomeFeaturedProjects } from "@/components/sections/HomeFeaturedProjects";
import { ClientLogoGrid } from "@/components/sections/ClientLogoGrid";
import { ContactForm } from "@/components/sections/ContactForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { companyData } from "@/content/company";
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Mail,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "T & T Brothers (TTB) — Construction, Maintenance & Engineering Services",
  description:
    "Established in 1988, T & T Brothers (TTB) is a leading Pakistani one-source contractor specializing in commercial construction, oil & gas filling station commissioning, and electro-mechanical maintenance.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Professional Introduction & History */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <AnimateOnScroll variant="fade-right" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                <Calendar className="w-3.5 h-3.5" />
                Established 25 August 1988
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
                Pakistan’s Premier One-Source Engineering &amp; Construction Solution
              </h2>

              <p className="text-base sm:text-lg text-black-70 dark:text-black-20 leading-relaxed">
                {companyData.description}
              </p>

              <p className="text-sm sm:text-base text-black-70 dark:text-black-20 leading-relaxed">
                Founded by <strong>{companyData.proprietor}</strong> over 35 years ago, TTB brings together certified professional engineers, real estate development acumen, and an experienced execution team of approximately <strong>60 full-time staff</strong>. We bridge the gap between initial architectural planning and ongoing multi-site facility management.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <strong className="text-sm text-black dark:text-white block">Turnkey Downstream Retail</strong>
                    <span className="text-xs text-black-60 dark:text-black-40">Complete forecourts, fuel dispensers, and automated car washes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <strong className="text-sm text-black dark:text-white block">Strict HSSE Compliance</strong>
                    <span className="text-xs text-black-60 dark:text-black-40">Zero-compromise safety protocols across hazardous petroleum sites.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <strong className="text-sm text-black dark:text-white block">24-Hour Reactive Support</strong>
                    <span className="text-xs text-black-60 dark:text-black-40">Rapid mechanical and electrical emergency troubleshooting teams.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <strong className="text-sm text-black dark:text-white block">Multi-National Client Trust</strong>
                    <span className="text-xs text-black-60 dark:text-black-40">Long-term contracts with Shell, Total Parco, and PSO.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about-us/"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline underline-offset-4"
                >
                  Read our full company profile &amp; director message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Fact Matrix Card */}
            <AnimateOnScroll variant="fade-left" delay={150} className="lg:col-span-5 bg-black-20/10 dark:bg-black-70/20 rounded-2xl border border-black-20 dark:border-black-70 p-6 sm:p-8 space-y-6 card-lift hover:shadow-xl hover:border-brand-purple/50 transition-all duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-black-20 dark:border-black-70">
                <span className="text-xs font-mono uppercase tracking-wider text-black-50">
                  Company Fact Sheet
                </span>
                <span className="text-xs font-semibold text-brand-purple bg-brand-purple/10 px-2.5 py-0.5 rounded">
                  Official Record
                </span>
              </div>

              <div className="space-y-4 text-sm divide-y divide-black-20/60 dark:divide-black-70/60">
                <div className="pt-3 first:pt-0 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Company Name</span>
                  <span className="font-semibold text-black dark:text-white text-right">
                    T &amp; T Brothers (TTB)
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Established</span>
                  <span className="font-semibold text-black dark:text-white text-right">
                    25 August 1988 (35+ Yrs)
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Membership</span>
                  <span className="font-semibold text-black dark:text-white text-right">
                    ICCI member
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Certification</span>
                  <span className="font-semibold text-black dark:text-white text-right">
                    ISO 45001:2008
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Workforce</span>
                  <span className="font-semibold text-black dark:text-white text-right">
                    ~60 Qualified Personnel
                  </span>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Offices</span>
                  <span className="font-semibold text-black dark:text-white text-right">
                    Peshawar &amp; Islamabad
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact-us/"
                  className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-brand-purple text-white hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
                >
                  Contact Head Office
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* 3. Core Service Portfolios Preview */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              badge="Engineering & Capabilities"
              title="Comprehensive Service Portfolios"
              subtitle="From civil foundation engineering and retail forecourt commissioning to 24-hour reactive electro-mechanical servicing."
            />
          </AnimateOnScroll>

          <HomeFeaturedServices />

          <AnimateOnScroll variant="fade-up" delay={300} className="mt-12 text-center">
            <Link
              href="/services/"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
            >
              Explore All 6 Service Categories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 4. Company Values Preview */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              badge="Operating Philosophy"
              title="Values Grounded in Our History"
              subtitle="Honesty, fairness, strict safety protocols, and deep respect for every individual define how TTB executes every contract."
            />
          </AnimateOnScroll>

          <HomeFeaturedValues />

          <AnimateOnScroll variant="fade-up" delay={300} className="mt-12 text-center">
            <Link
              href="/our-values/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline underline-offset-4"
            >
              Explore our complete values and company culture
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 5. Selected Projects Portfolio Preview */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              badge="Featured Projects"
              title="Representative Completed Infrastructure"
              subtitle="Explore our verified projects delivered for Shell Pakistan, Total Parco Pakistan, and Pakistan State Oil (PSO)."
            />
          </AnimateOnScroll>

          <HomeFeaturedProjects />

          <AnimateOnScroll variant="fade-up" delay={300} className="mt-12 text-center">
            <Link
              href="/projects/"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
            >
              View Complete Portfolio (22 Verified Projects)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 6. Major Clients Highlight */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              badge="Industry Partners"
              title="Trusted by Premier Corporations"
              subtitle="TTB maintains multi-year relationships with Pakistan’s leading downstream petroleum and commercial organizations."
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={150}>
            <ClientLogoGrid />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={250} className="mt-8 text-center">
            <Link
              href="/clients/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline underline-offset-4"
            >
              View detailed client overview &amp; partner assets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* 7. Contact CTA & Inquiry Desk */}
      <section className="py-20 bg-black-20/10 dark:bg-black overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <AnimateOnScroll variant="fade-right" className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                <Mail className="w-3.5 h-3.5" />
                Direct Inquiry Desk
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-black dark:text-white">
                Initiate a Project Discussion with TTB
              </h2>

              <p className="text-base text-black-70 dark:text-black-20 leading-relaxed">
                Connect directly with our Peshawar Head Office or Islamabad Branch to discuss your commercial construction, retail forecourt, or routine maintenance requirements.
              </p>

              <div className="p-6 rounded-xl bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-4 card-lift">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-purple mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white">
                      Registered Offices
                    </h4>
                    <p className="text-xs text-black-70 dark:text-black-20 mt-0.5">
                      Peshawar Head Office (G.T. Road) &amp; Islamabad Branch (I-10/4).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-purple mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white">
                      24-Hour Site Response
                    </h4>
                    <p className="text-xs text-black-70 dark:text-black-20 mt-0.5">
                      Reactive maintenance teams available 24/7 for operational client sites.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-left" delay={150} className="lg:col-span-7">
              <ContactForm />
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </div>
  );
}
