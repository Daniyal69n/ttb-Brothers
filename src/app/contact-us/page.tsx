import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactPageContent } from "@/content/contact";
import { companyData } from "@/content/company";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Direct corporate contact directory, headquarters information, and dispatch form for TTB.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Badge variant="accent">{contactPageContent.badge}</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {contactPageContent.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {contactPageContent.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area: Directory & Form */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Directory & Governance Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Corporate Directory & Channels
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our corporate communications desk coordinates strategic
                  inquiries, client onboarding, media relations, and partnership
                  discussions.
                </p>
              </div>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Corporate Inquiries Email
                    </h3>
                    <a
                      href={`mailto:${companyData.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {companyData.email}
                    </a>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct inbox for official commercial communications.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Telephone Desk
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {companyData.phone}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Available during standard corporate business hours.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Headquarters
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {companyData.address.street}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {companyData.address.city}, {companyData.address.state}{" "}
                      {companyData.address.postalCode},{" "}
                      {companyData.address.country}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Operational Schedule
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {companyData.workingHours}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {contactPageContent.officeHoursNotice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Level Assurance */}
              <div className="p-5 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Confidentiality Commitment
                </div>
                <p>
                  All submitted business proposals, executive contact details, and
                  project documentation are handled under strict corporate
                  confidentiality standards.
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
