import React from "react";
import { ValueItem } from "@/types";
import { DynamicIcon } from "../ui/IconHelper";

interface ValueCardProps {
  value: ValueItem;
}

export function ValueCard({ value }: ValueCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 hover:border-blue-200 dark:hover:border-blue-900 transition-colors flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
          <DynamicIcon name={value.iconName} className="w-6 h-6" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          {value.title}
        </h3>

        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
          {value.shortDescription}
        </p>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {value.fullDescription}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>Principle ID</span>
        <span className="font-mono">{value.id}</span>
      </div>
    </div>
  );
}
