"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import { footerQuickLinks } from "@/content/company";
import { Container } from "../ui/Container";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Clock, Settings } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const { content } = useContent();
  const companyData = content.company;
  const corporateServices = content.services;
  const currentYear = new Date().getFullYear();

  // Hide public website footer in admin console
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-black text-black-20 border-t border-black-70 transition-colors">
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-black-70/60">
          {/* Brand & Introduction */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-purple rounded"
              aria-label={`${companyData.shortName} Home`}
            >
              <div className="relative h-14 w-[88px] shrink-0">
                <Image
                  src="/images/company/ttb-logo.png"
                  alt="T&T Brothers (TTB) Logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-200"
                  sizes="88px"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-tight">
                  {companyData.name}
                </span>
                <span className="text-xs text-black-40 font-medium tracking-wide">
                  Est. 25 August 1988 • Sole Proprietor
                </span>
              </div>
            </Link>

            <p className="text-sm text-black-20 leading-relaxed">
              A premier one-source solution provider in Pakistan delivering commercial construction, oil and gas filling station commissioning, electro-mechanical maintenance, and full-spectrum facility management.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-black-40">
                <ShieldCheck className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Workforce: {companyData.workforce}</span>
              </div>
              <div className="flex items-center gap-2 text-black-40">
                <Clock className="w-4 h-4 text-brand-purple shrink-0" />
                <span>24-Hour Reactive Site Maintenance Support</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-black-40 hover:text-white transition-all duration-200 inline-flex items-center gap-1 group hover:translate-x-1"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Portfolio Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {corporateServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/#${service.id}`}
                    className="text-black-40 hover:text-white hover:translate-x-1 transition-all duration-200 block line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Official Offices */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Offices & Contact
            </h3>
            <ul className="space-y-3.5 text-xs text-black-20" role="list">
              {/* Registered Office */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-white font-medium">Head Office (Peshawar):</strong>
                  <span>{companyData.registeredOffice.street}, {companyData.registeredOffice.landmark}, {companyData.registeredOffice.city}</span>
                </div>
              </li>
              {/* Islamabad Branch */}
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-white font-medium">Branch Office (Islamabad):</strong>
                  <span>{companyData.islamabadBranch.street}, {companyData.islamabadBranch.landmark}, {companyData.islamabadBranch.city}</span>
                </div>
              </li>
              {/* Emails */}
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <a
                    href={`mailto:${companyData.emailGeneral}`}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {companyData.emailGeneral}
                  </a>
                  <a
                    href={`mailto:${companyData.emailDirector}`}
                    className="hover:text-white transition-colors text-black-40 hover:underline"
                  >
                    {companyData.emailDirector} (Director)
                  </a>
                </div>
              </li>
              {/* Phones */}
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${companyData.phoneMobile.replace(/[^+\d]/g, "")}`} className="hover:text-white transition-colors">
                    {companyData.phoneMobile} (Mobile)
                  </a>
                  <a href={`tel:${companyData.phoneLandline.replace(/[^+\d]/g, "")}`} className="hover:text-white transition-colors text-black-40">
                    {companyData.phoneLandline} (Landline / Fax)
                  </a>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-purple hover:text-white transition-colors uppercase tracking-wider"
              >
                Direct Inquiry Desk &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black-40">
          <div>
            &copy; {currentYear} {companyData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Proprietor: {companyData.proprietor}</span>
            <Link
              href="/privacy-policy/"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact-us/"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Contact Directory
            </Link>
            <Link
              href="/admin/"
              className="inline-flex items-center gap-1 text-black-40 hover:text-brand-purple transition-colors"
              title="TTB Management Portal"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
