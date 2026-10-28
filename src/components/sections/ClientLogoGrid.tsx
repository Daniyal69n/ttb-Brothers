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
            className="group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center text-center justify-center min-h-[140px] hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-3 group-hover:text-blue-600 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {client.name}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {client.industry}
            </p>

            {client.isPlaceholder && (
              <span className="mt-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                Slot Reserved
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Transparent Editorial Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
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
