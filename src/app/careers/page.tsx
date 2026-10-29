import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import {
  careersIntroduction,
  culturePrinciples,
  employeeBenefits,
  generalApplicationInfo,
} from "@/content/careers";
import { CareersOpeningsList } from "@/components/sections/CareersOpeningsList";
import { DynamicIcon } from "@/components/ui/IconHelper";
import { Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Culture | T & T Brothers (TTB)",
  description:
    "Join T & T Brothers (TTB): an engineering workforce of 60 professionals committed to safety, continuous training, and quality construction across Pakistan.",
};

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Header */}
      <section className="bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">{careersIntroduction.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              {careersIntroduction.title}
            </h1>
            <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {careersIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Workforce Culture Principles */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              badge="Workforce Ethos"
              title="Our Professional Standards &amp; Culture"
              subtitle="Extracted from our corporate profile: our team operates with deep respect for HSSE, continuous vocational training, and pride in workmanship."
            />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturePrinciples.map((item, index) => (
              <AnimateOnScroll
                key={index}
                variant="fade-up"
                delay={index * 120}
                className="card-lift p-6 sm:p-8 rounded-xl bg-black-20/10 dark:bg-black-70/10 border border-black-20 dark:border-black-70 space-y-3 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple text-white font-bold text-xs flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed pl-11">
                  {item.description}
                </p>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Employee Development & Benefits */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <AnimateOnScroll variant="fade-up">
            <SectionHeader
              badge="Growth &amp; Recognition"
              title="Personnel Training &amp; Development"
              subtitle="As emphasized in our profile, continuous training and safety certifications keep our ~60 staff members at the forefront of the industry."
            />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {employeeBenefits.map((benefit, index) => (
              <AnimateOnScroll
                key={index}
                variant="fade-up"
                delay={index * 80}
                className="card-lift p-6 rounded-xl bg-white dark:bg-black border border-black-20 dark:border-black-70 flex flex-col justify-between space-y-4 hover:border-brand-purple hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-200">
                    <DynamicIcon name={benefit.iconName} className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-black-70 dark:text-black-20 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Genuine Talent Inquiry Pipeline */}
      <section className="py-20 bg-white dark:bg-black overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <AnimateOnScroll variant="fade-up">
              <SectionHeader
                badge="Talent Registry"
                title="Join the TTB Technical Team"
                subtitle="We maintain an open talent registry for certified civil engineers, mechanical supervisors, licensed electricians, and HSSE officers."
              />
            </AnimateOnScroll>

            <CareersOpeningsList />

            <AnimateOnScroll variant="fade-up" delay={150} className="card-lift p-8 rounded-2xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-6 hover:border-brand-purple/40 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2">
                <Badge variant="primary">{generalApplicationInfo.status}</Badge>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-black dark:text-white">
                  General Expression of Interest
                </h3>
                <p className="text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  {generalApplicationInfo.notice}
                </p>
                <p className="text-sm text-black-70 dark:text-black-20 leading-relaxed">
                  {generalApplicationInfo.instructions}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white dark:bg-black border border-black-20 dark:border-black-70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-lift">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-brand-purple shrink-0" />
                  <div>
                    <p className="text-xs text-black-60 dark:text-black-40 font-medium">
                      Official Careers Inbox
                    </p>
                    <p className="text-sm font-bold text-black dark:text-white font-mono">
                      {generalApplicationInfo.submissionEmail}
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${generalApplicationInfo.submissionEmail}?subject=${encodeURIComponent(
                    "[TTB Careers] Expression of Interest - Technical & Engineering"
                  )}`}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-brand-purple hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
                >
                  Submit CV via Email Client
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </div>
  );
}
