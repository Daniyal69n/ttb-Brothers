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
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow group">
      <div>
        {/* Icon & Title */}
        <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
          <DynamicIcon name={service.iconName} className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Capabilities list */}
        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Core Competencies
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {service.capabilities.map((cap, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <Link
          href={`/contact-us/?service=${encodeURIComponent(service.id)}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Inquire regarding this capability
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
