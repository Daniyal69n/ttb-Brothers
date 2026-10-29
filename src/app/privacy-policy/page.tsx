import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { companyData } from "@/content/company";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Corporate privacy policy, data handling principles, and website terms for TTB.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-black text-white py-16 md:py-20 border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">Legal &amp; Compliance</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              Corporate Privacy Policy
            </h1>
            <p className="text-base text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              General disclosure regarding corporate data handling, website
              usage, and information governance principles.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Legal Content */}
      <section className="py-16 bg-white dark:bg-black">
        <Container size="md">
          <div className="prose dark:prose-invert max-w-none space-y-8 text-black-70 dark:text-black-20">
            {/* Legal Notice Disclaimer */}
            <div className="p-4 rounded-xl bg-black-20/10 dark:bg-black-70/10 border border-black-20 dark:border-black-70 text-xs text-black-60 dark:text-black-20 space-y-1">
              <p className="font-semibold text-black dark:text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-brand-purple" />
                Administrative Disclaimer
              </p>
              <p>
                This document serves as an editable template outline for TTB
                corporate website visitors. It does not constitute formal legal
                counsel and should be reviewed and customized by TTB legal counsel
                prior to statutory filings.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                1. Scope of Policy
              </h2>
              <p className="text-sm leading-relaxed">
                This Privacy Policy applies to personal and commercial information
                collected through the official corporate website of{" "}
                <strong>{companyData.name}</strong>. By accessing this portal,
                visitors acknowledge the data handling practices described
                herein.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                2. Information Collection & Usage
              </h2>
              <p className="text-sm leading-relaxed">
                We collect information voluntarily submitted through our inquiry
                forms, career application communications, and direct email
                correspondence. This information typically includes your name,
                business email address, organizational affiliation, and the
                substance of your commercial inquiry.
              </p>
              <p className="text-sm leading-relaxed">
                Submitted information is utilized solely to:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-black-70 dark:text-black-20">
                <li>Evaluate and respond to corporate inquiries and project requests.</li>
                <li>Process expressions of interest and job applications.</li>
                <li>Maintain internal corporate administrative and audit records.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                3. Non-Disclosure & Data Security
              </h2>
              <p className="text-sm leading-relaxed">
                TTB enforces stringent internal information security protocols to
                safeguard business correspondence against unauthorized access,
                alteration, disclosure, or destruction. We do not sell, rent, or
                commercially distribute stakeholder information to third-party
                marketing providers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                4. Third-Party Links & Services
              </h2>
              <p className="text-sm leading-relaxed">
                Our website may contain links to external enterprise partners or
                service gateways. TTB is not responsible for the privacy practices
                or content of external domains. Visitors are encouraged to review
                the independent policies of any external destination visited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                5. Inquiries & Updates
              </h2>
              <p className="text-sm leading-relaxed">
                For questions regarding data governance or to request updates to
                your submitted contact information, please reach our compliance
                desk at:
              </p>
              <p className="text-sm font-semibold text-black dark:text-white font-mono">
                {companyData.email}
              </p>
            </section>

            <div className="pt-6 border-t border-black-20 dark:border-black-70 flex justify-between items-center text-xs text-black-60 dark:text-black-20">
              <span>Last Updated: Corporate Revision 1.0</span>
              <Link
                href="/"
                className="text-brand-purple dark:text-brand-purple hover:text-brand-purple dark:hover:text-white hover:underline font-medium"
              >
                Return to Homepage &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
