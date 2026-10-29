"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";
import { Building2, CheckCircle2 } from "lucide-react";

export function ClientLogoGrid() {
  const { content } = useContent();
  const corporateClients = content.clients;
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* 3x3 Grid for the 9 Clients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {corporateClients.map((client) => {
          const isImgFailed = failedImages[client.id] || !client.logoUrl;

          return (
            <div
              key={client.id}
              className="card-lift group relative bg-white dark:bg-black border border-black-20 dark:border-black-70 rounded-xl p-6 flex flex-col justify-between hover:border-brand-purple dark:hover:border-brand-purple hover:shadow-xl hover:shadow-brand-purple/10 transition-all duration-300 ease-out"
            >
              {/* Logo Display Container on Crisp White Surface */}
              <div className="w-full h-28 mb-4 flex items-center justify-center bg-white rounded-lg p-3 relative overflow-hidden border border-black-20 shadow-xs group-hover:shadow-md group-hover:border-brand-purple/30 transition-all duration-300">
                {!isImgFailed && client.logoUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={client.logoUrl}
                      alt={`${client.name} official logo`}
                      fill
                      className="object-contain p-2 group-hover:scale-106 transition-transform duration-300 ease-out"
                      onError={() => handleImageError(client.id)}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <Building2 className="w-6 h-6 text-brand-purple mb-1.5 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold tracking-tight text-black font-mono uppercase">
                      {client.name.split(" ")[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Client Information */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded transition-colors group-hover:bg-green-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Client & Partner
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-black dark:text-white leading-snug group-hover:text-brand-purple transition-colors duration-200">
                    {client.name}
                  </h3>

                  <p className="text-xs text-black-60 dark:text-black-40 mt-1 font-medium">
                    {client.industry}
                  </p>
                </div>

                {client.notes && (
                  <p className="text-[11px] text-black-70 dark:text-black-20 leading-relaxed pt-3 border-t border-black-20 dark:border-black-70/60 line-clamp-2">
                    {client.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
