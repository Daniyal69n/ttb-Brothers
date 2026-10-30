"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ValueItem } from "@/types";
import { DynamicIcon } from "../ui/IconHelper";
import { Camera } from "lucide-react";

interface ValueCardProps {
  value: ValueItem;
}

export function ValueCard({ value }: ValueCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-lift bg-white dark:bg-black rounded-xl border border-black-20 dark:border-black-70 overflow-hidden hover:border-brand-purple dark:hover:border-brand-purple hover:shadow-xl hover:shadow-brand-purple/10 transition-all duration-300 ease-out flex flex-col h-full group">
      <div className="flex-1">
        {/* Visual Header / Photo representation */}
        {value.imagePath && !imgError ? (
          <div className="relative h-44 w-full bg-black-70 overflow-hidden border-b border-black-70">
            <Image
              src={value.imagePath}
              alt={`${value.title} - TTB Company Values`}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white">
              <span className="text-[11px] font-semibold bg-brand-purple/90 px-2.5 py-0.5 rounded shadow group-hover:bg-brand-purple transition-colors">
                TTB Culture
              </span>
              <span className="text-[10px] text-black-20 font-mono">
                {value.imageHint?.slice(0, 32)}...
              </span>
            </div>
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-black via-black-70 to-black-60 p-4 flex flex-col justify-between text-white border-b border-black-70">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-purple font-semibold">
                Core Principle
              </span>
              <Camera className="w-4 h-4 text-black-40 group-hover:text-brand-purple transition-colors duration-300" />
            </div>
            {value.imageHint && (
              <p className="text-[11px] text-black-40 font-mono line-clamp-1">
                Asset hint: {value.imageHint}
              </p>
            )}
          </div>
        )}

        <div className="p-6 sm:p-7">
          <div className="w-12 h-12 rounded-lg bg-black-20/40 dark:bg-black-70/60 border border-black-20 dark:border-black-70 text-brand-purple flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-purple/15 group-hover:border-brand-purple/40 transition-all duration-300">
            <DynamicIcon name={value.iconName} className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 leading-tight group-hover:text-brand-purple transition-colors duration-200">
            {value.title}
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-brand-purple mb-3">
            {value.shortDescription}
          </p>

          <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
            {value.fullDescription}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="pt-3 border-t border-black-20/60 dark:border-black-70/60 flex items-center justify-between text-[11px] text-black-50">
          <span>TTB Standard</span>
          <span className="font-mono text-black-40">Profile Principle</span>
        </div>
      </div>
    </div>
  );
}
