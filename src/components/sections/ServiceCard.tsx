import React from "react";
import Link from "next/link";
import { ServiceCategory, ServiceItem } from "@/types";
import { DynamicIcon } from "../ui/IconHelper";
import { ArrowRight, Check } from "lucide-react";

interface ServiceCardProps {
  service: ServiceCategory | ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const letter = "letter" in service ? service.letter : undefined;
  const description = "fullDescription" in service ? service.fullDescription : service.description;

  return (
    <div
      id={service.id}
      className="card-lift bg-white dark:bg-black rounded-xl border border-black-20 dark:border-black-70 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-brand-purple/10 hover:border-brand-purple dark:hover:border-brand-purple transition-all duration-300 ease-out group scroll-mt-28"
    >
      <div>
        {/* Header with Letter badge & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-lg bg-black-20/40 dark:bg-black-70/60 border border-black-20 dark:border-black-70 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/15 group-hover:border-brand-purple/40 transition-all duration-300">
            <DynamicIcon name={service.iconName} className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
          </div>

          {letter && (
            <span className="w-8 h-8 rounded-full bg-brand-purple text-white text-xs font-bold flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
              {letter}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-black dark:text-white tracking-tight mb-3 group-hover:text-brand-purple transition-colors duration-200">
          {service.title}
        </h3>

        <p className="text-sm text-black-70 dark:text-black-20 leading-relaxed mb-6">
          {description}
        </p>

        {/* Capabilities list */}
        <div className="space-y-2 pt-4 border-t border-black-20/60 dark:border-black-70 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-black-50">
            Verified Scope & Capabilities
          </p>
          <ul className="space-y-2 text-xs text-black-70 dark:text-black-20">
            {service.capabilities.map((cap, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-brand-purple mt-0.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 mt-auto border-t border-black-20/60 dark:border-black-70 flex items-center justify-between">
        <Link
          href={`/contact-us/?service=${encodeURIComponent(service.id)}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-purple hover:text-white transition-colors"
        >
          Request an Enquiry
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/projects/"
          className="text-xs text-black-50 hover:text-black dark:hover:text-white transition-colors"
        >
          View Projects &rarr;
        </Link>
      </div>
    </div>
  );
}
