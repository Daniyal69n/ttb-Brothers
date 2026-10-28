import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { companyData } from "@/content/company";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/80 dark:border-slate-800">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Tagline / Badge */}
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" className="py-1 px-3.5 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Corporate Excellence & Governance
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Delivering Strategic Value & Operational Leadership
          </h1>

          {/* Business Introduction */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {companyData.tagline}. {companyData.shortName} provides structured
            governance, disciplined project delivery, and enduring advisory
            solutions for regional and global enterprise partners.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about-us/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              About TTB
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Key Assurance Indicators */}
          <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Institutional Governance
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Strict adherence to ethical oversight & compliance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Disciplined Delivery
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Methodical milestones and quality verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Long-term Stewardship
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sustainable business solutions built to endure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
