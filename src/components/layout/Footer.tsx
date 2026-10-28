import React from "react";
import Link from "next/link";
import { companyData, footerQuickLinks } from "@/content/company";
import { Container } from "../ui/Container";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Introduction */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label={`${companyData.shortName} Home`}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold tracking-wider text-base shadow-sm">
                TTB
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-tight">
                  {companyData.name}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                  Corporate Group
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {companyData.description}
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 font-mono">
                Static Hostinger & Vercel Optimized Build
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm" role="list">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Communications Desk */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Corporate Office & Desk
            </h3>
            <ul className="space-y-3 text-sm text-slate-400" role="list">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span>
                  {companyData.address.street}, {companyData.address.city},{" "}
                  {companyData.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${companyData.email}`}
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  {companyData.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{companyData.phone}</span>
              </li>
            </ul>

            <div className="pt-3">
              <Link
                href="/contact-us/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
              >
                Inquiry Dispatch Form &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Attribution & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {companyData.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy/"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <span>
              Developed by{" "}
              <strong className="text-slate-300 font-medium">
                {companyData.developerCredit}
              </strong>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
