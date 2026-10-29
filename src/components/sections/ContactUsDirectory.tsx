"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import {
  Building2,
  ExternalLink,
  Mail,
  Globe,
  Clock,
} from "lucide-react";

export function ContactUsDirectory() {
  const { content } = useContent();
  const companyData = content.company;
  const contactIntro = content.contactIntro;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-black dark:text-white">
          Official Contact Directory
        </h2>
        <p className="text-sm text-black-70 dark:text-black-20 mt-1 leading-relaxed">
          Reach our executive directors, project managers, and 24-hour maintenance dispatch coordinators.
        </p>
      </div>

      {/* Office 1: Registered Head Office (Peshawar) */}
      <div className="card-lift p-6 rounded-2xl bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-3 shadow-sm hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-200">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-semibold">
              {companyData.registeredOffice.label || "Registered Head Office"}
            </span>
            <h3 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
              Peshawar Office
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
          <strong>{companyData.registeredOffice.street}</strong>
          {companyData.registeredOffice.landmark ? `, ${companyData.registeredOffice.landmark}` : ""}
          {companyData.registeredOffice.city ? `, ${companyData.registeredOffice.city}` : ""}
          {companyData.registeredOffice.region ? `, ${companyData.registeredOffice.region}` : ""}
          {companyData.registeredOffice.country ? `, ${companyData.registeredOffice.country}` : ""}
        </p>

        <div className="pt-2 text-xs text-black-50 space-y-1">
          <p>Postal Address: {companyData.postalAddress}</p>
        </div>

        <div className="pt-2">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Irshad+House+near+Caltex+Depot+G.T.+Road+Taru+Jabba+Peshawar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:underline"
          >
            View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Office 2: Islamabad Branch Office */}
      <div className="card-lift p-6 rounded-2xl bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-3 shadow-sm hover:border-brand-purple hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-purple/20 transition-all duration-200">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-purple font-semibold">
              {companyData.islamabadBranch.label || "Federal Capital Branch"}
            </span>
            <h3 className="text-base font-bold text-black dark:text-white group-hover:text-brand-purple transition-colors duration-200">
              Islamabad Office
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed">
          <strong>{companyData.islamabadBranch.street}</strong>
          {companyData.islamabadBranch.landmark ? `, ${companyData.islamabadBranch.landmark}` : ""}
          {companyData.islamabadBranch.city ? `, ${companyData.islamabadBranch.city}` : ""}
          {companyData.islamabadBranch.country ? `, ${companyData.islamabadBranch.country}` : ""}
        </p>

        <div className="pt-2">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Office+807+Street+19+I-10+4+Islamabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:underline"
          >
            View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Official Communications & Inboxes */}
      <div className="card-lift p-6 rounded-2xl bg-white dark:bg-black border border-black-20 dark:border-black-70 space-y-4 shadow-sm hover:border-brand-purple/50 hover:shadow-xl transition-all duration-300">
        <h4 className="text-sm font-bold text-black dark:text-white border-b border-black-20 dark:border-black-70 pb-2">
          Official Communications &amp; Inboxes
        </h4>

        <div className="space-y-3 text-xs sm:text-sm">
          {/* Emails */}
          <div className="flex items-start gap-3 group">
            <Mail className="w-4 h-4 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-semibold text-black dark:text-white">Official Inboxes:</p>
              <a href={`mailto:${companyData.emailGeneral}`} className="text-brand-purple hover:underline block">
                {companyData.emailGeneral} (General Enquiries &amp; Tenders)
              </a>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-start gap-3 group">
            <Globe className="w-4 h-4 text-brand-purple mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-semibold text-black dark:text-white">Official Web Portal:</p>
              <p className="text-black-70 dark:text-black-20">{companyData.website}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-xs text-black dark:text-black-20 flex items-start gap-3">
        <Clock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
        <p>
          <strong>Operating Notice:</strong> {contactIntro.officeHoursNotice}
        </p>
      </div>
    </div>
  );
}

