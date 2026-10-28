import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/types";
import { DynamicIcon } from "../ui/IconHelper";
import { ArrowRight, Check } from "lucide-react";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200/90 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-[#f0c8f0] dark:hover:border-[#521352] transition-all group">
      <div>
        {/* Icon & Title */}
        <div className="w-12 h-12 rounded-lg bg-[#faf0fa] dark:bg-[#2d0a2d] border border-[#f0c8f0] dark:border-[#521352] text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
          <DynamicIcon name={service.iconName} className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-black dark:text-white tracking-tight mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Capabilities list */}
        <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Core Competencies
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
            {service.capabilities.map((cap, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#a329a3] mt-0.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Link
          href={`/contact-us/?service=${encodeURIComponent(service.id)}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8c1f8c] dark:text-[#f0b8f0] hover:text-[#731d73] dark:hover:text-white transition-colors"
        >
          Inquire regarding this capability
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
