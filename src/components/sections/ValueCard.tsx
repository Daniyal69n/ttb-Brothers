import React from "react";
import { ValueItem } from "@/types";
import { DynamicIcon } from "../ui/IconHelper";

interface ValueCardProps {
  value: ValueItem;
}

export function ValueCard({ value }: ValueCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200/90 dark:border-neutral-800 p-6 sm:p-8 hover:border-[#f0c8f0] dark:hover:border-[#521352] transition-colors flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-lg bg-[#faf0fa] dark:bg-[#2d0a2d] border border-[#f0c8f0] dark:border-[#521352] text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center justify-center mb-5">
          <DynamicIcon name={value.iconName} className="w-6 h-6" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
          {value.title}
        </h3>

        <p className="text-sm font-medium text-[#8c1f8c] dark:text-[#f0b8f0] mb-3">
          {value.shortDescription}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {value.fullDescription}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between text-xs text-gray-400">
        <span>Principle ID</span>
        <span className="font-mono text-gray-500">{value.id}</span>
      </div>
    </div>
  );
}
