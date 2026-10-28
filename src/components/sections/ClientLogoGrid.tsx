import React from "react";
import { corporateClients } from "@/content/clients";
import { ShieldAlert, Building2 } from "lucide-react";

export function ClientLogoGrid() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {corporateClients.map((client) => (
          <div
            key={client.id}
            className="group relative bg-white dark:bg-neutral-900 border border-gray-200/90 dark:border-neutral-800 rounded-xl p-5 flex flex-col items-center text-center justify-center min-h-[140px] hover:border-[#f0c8f0] dark:hover:border-[#521352] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-3 group-hover:text-[#a329a3] transition-colors">
              <Building2 className="w-5 h-5" />
            </div>

            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {client.name}
            </p>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {client.industry}
            </p>

            {client.isPlaceholder && (
              <span className="mt-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400">
                Slot Reserved
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Transparent Editorial Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-neutral-900/60 border border-gray-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
        <ShieldAlert className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
        <p>
          <strong>Verification Notice:</strong> In strict compliance with bilateral
          agreements and trademark laws, client trademarks and authorized logos are
          published solely upon verified written authorization by TTB executive
          counsel. Contact our desk for authorized enterprise references.
        </p>
      </div>
    </div>
  );
}
