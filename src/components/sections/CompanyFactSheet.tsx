"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function CompanyFactSheet() {
  const { content } = useContent();
  const factSheet = content.companyFactSheet;

  return (
    <AnimateOnScroll
      variant="fade-left"
      delay={150}
      className="lg:col-span-5 bg-black-20/10 dark:bg-black-70/20 rounded-2xl border border-black-20 dark:border-black-70 p-6 sm:p-8 space-y-6 card-lift hover:shadow-xl hover:border-brand-purple/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between pb-4 border-b border-black-20 dark:border-black-70">
        <span className="text-xs font-mono uppercase tracking-wider text-black-50">
          {factSheet.heading}
        </span>
        <span className="text-xs font-semibold text-brand-purple bg-brand-purple/10 px-2.5 py-0.5 rounded">
          {factSheet.badge}
        </span>
      </div>

      <div className="space-y-4 text-sm divide-y divide-black-20/60 dark:divide-black-70/60">
        {factSheet.rows.map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            className="pt-3 first:pt-0 flex justify-between items-center gap-4"
          >
            <span className="text-black-60 dark:text-black-40">
              {row.label}
            </span>
            <span className="font-semibold text-black dark:text-white text-right">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href={factSheet.buttonLink || "/contact-us/"}
          className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-brand-purple text-white hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 hover:-translate-y-0.5"
        >
          {factSheet.buttonText}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </AnimateOnScroll>
  );
}
