import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import {
  careersIntroduction,
  culturePrinciples,
  employeeBenefits,
  currentOpenings,
  generalApplicationInfo,
} from "@/content/careers";
import { DynamicIcon } from "@/components/ui/IconHelper";
import {
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Culture",
  description:
    "Explore career opportunities, professional culture, and talent inquiries at TTB Corporate Group.",
};

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-black text-white py-16 md:py-24 border-b border-neutral-850">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{careersIntroduction.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {careersIntroduction.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              {careersIntroduction.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white dark:bg-neutral-900 border-b border-gray-200/80 dark:border-neutral-800">
        <Container>
          <SectionHeader
            badge="Workplace Ethos"
            title="Our Professional Culture"
            subtitle="We cultivate an environment characterized by intellectual honesty, mutual respect, and disciplined execution."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturePrinciples.map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200/80 dark:border-neutral-700/80 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#faf0fa] dark:bg-[#2d0a2d] text-[#8c1f8c] dark:text-[#f0b8f0] font-bold text-xs flex items-center justify-center">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-950 border-b border-gray-200/80 dark:border-neutral-800">
        <Container>
          <SectionHeader
            badge="Talent Investment"
            title="Professional Benefits & Support"
            subtitle="How we invest in the well-being, skills, and enduring growth of our professionals."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {employeeBenefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#faf0fa] dark:bg-[#2d0a2d] text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center justify-center">
                  <DynamicIcon name={benefit.iconName} className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-black dark:text-white">
                  {benefit.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Current Opportunities & General Talent Inquiries */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <SectionHeader
              badge="Current Openings"
              title="Talent Acquisition & Open Positions"
              subtitle="Review current vacancies or register your credentials for future departmental expansion."
            />

            {/* Check if openings exist */}
            {currentOpenings.length === 0 ? (
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700 space-y-6">
                <div className="flex items-center gap-2">
                  <Badge variant="primary">{generalApplicationInfo.status}</Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-black dark:text-white">
                    General Expression of Interest Pipeline
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {generalApplicationInfo.notice}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {generalApplicationInfo.instructions}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#a329a3] shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 font-medium">
                        Direct HR & Talent Inbox
                      </p>
                      <p className="text-sm font-semibold text-black dark:text-white font-mono">
                        {generalApplicationInfo.submissionEmail}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`mailto:${generalApplicationInfo.submissionEmail}?subject=${encodeURIComponent(
                      "[TTB Careers] General Expression of Interest"
                    )}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#a329a3] hover:bg-[#8a238a] active:bg-[#731d73] transition-colors shadow-sm"
                  >
                    Submit Credentials via Email
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {currentOpenings.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-base font-bold text-black dark:text-white">
                        {job.title}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {job.department} &bull; {job.location} &bull; {job.type}
                      </p>
                    </div>
                    <a
                      href={`mailto:${generalApplicationInfo.submissionEmail}?subject=Application for ${job.title}`}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-[#a329a3] border border-[#f0c8f0] hover:bg-[#faf0fa]"
                    >
                      Apply Now
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
