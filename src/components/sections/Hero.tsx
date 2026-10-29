"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, Fuel, Wrench, Calendar } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";

export function Hero() {
  const { content } = useContent();
  const { hero, company } = content;

  return (
    <section className="relative overflow-hidden bg-black text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-black-70">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
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
          <div className="inline-flex items-center gap-2 animate-fade-in-down">
            <Badge variant="primary" className="py-1 px-3.5 text-xs font-semibold shadow-sm hover:scale-105 transition-transform duration-200">
              <Calendar className="w-3.5 h-3.5 text-brand-purple" />
              {hero.badge}
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] animate-fade-in-up [animation-delay:100ms]">
            {hero.headline}
          </h1>

          {/* Business Introduction */}
          <p className="text-lg sm:text-xl text-black-20 leading-relaxed max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
            {hero.description || `${company.name} provides end-to-end turnkey construction management, retail filling station commissioning, automated car wash installations, and electro-mechanical maintenance for industry leaders across Pakistan.`}
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
            <Link
              href={hero.primaryCtaLink || "/services/"}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] shadow-md hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-black"
            >
              {hero.primaryCtaText || "Explore Our Services"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href={hero.secondaryCtaLink || "/projects/"}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold text-white bg-black-70/40 border border-black-70 hover:bg-black-70 hover:border-brand-purple hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-black"
            >
              {hero.secondaryCtaText || "View Our Projects"}
              <ArrowRight className="w-4 h-4 text-brand-purple group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Key Assurance Indicators */}
          <div className="pt-10 border-t border-black-70 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto animate-fade-in-up [animation-delay:400ms]">
            <div className="group p-3 rounded-xl hover:bg-black-70/40 transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-3">
              <Building2 className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-brand-purple transition-colors duration-200">
                  Turnkey Construction
                </p>
                <p className="text-xs text-black-40">
                  Commercial buildings, forecourts &amp; structural engineering.
                </p>
              </div>
            </div>

            <div className="group p-3 rounded-xl hover:bg-black-70/40 transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-3">
              <Fuel className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-brand-purple transition-colors duration-200">
                  Downstream Oil &amp; Gas
                </p>
                <p className="text-xs text-black-40">
                  Filling station assembly, dispensers, OWS &amp; automated systems.
                </p>
              </div>
            </div>

            <div className="group p-3 rounded-xl hover:bg-black-70/40 transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-3">
              <Wrench className="w-5 h-5 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-brand-purple transition-colors duration-200">
                  24-Hour Maintenance
                </p>
                <p className="text-xs text-black-40">
                  Reactive &amp; preventive electro-mechanical site support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
