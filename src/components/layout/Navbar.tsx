"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { mainNavItems, companyData } from "@/content/company";
import { Container } from "../ui/Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "";
    }
    // Normalize trailing slash matching
    const normHref = href.replace(/\/$/, "");
    const normPath = pathname ? pathname.replace(/\/$/, "") : "";
    return normPath === normHref;
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200/80 dark:border-neutral-800 transition-colors">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark / Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a329a3] rounded-md py-1"
            aria-label={`${companyData.shortName} Homepage`}
          >
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-bold tracking-wider text-base shadow-sm group-hover:bg-[#a329a3] transition-colors duration-200 border border-neutral-800">
              TTB
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-black dark:text-white leading-tight">
                {companyData.name}
              </span>
              <span className="text-[11px] font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                Corporate Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "text-[#8c1f8c] dark:text-[#f0b8f0] font-semibold bg-[#faf0fa] dark:bg-[#2d0a2d]"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact-us/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#a329a3] hover:bg-[#8a238a] active:bg-[#731d73] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a329a3]"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#a329a3] cursor-pointer"
              aria-expanded={isOpen}
              aria-label={
                isOpen
                  ? "Close main navigation menu"
                  : "Open main navigation menu"
              }
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-5 py-6 space-y-2">
              {mainNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? "text-[#8c1f8c] dark:text-[#f0b8f0] bg-[#faf0fa] dark:bg-[#2d0a2d] font-semibold"
                        : "text-neutral-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-gray-200 dark:border-neutral-800">
                <Link
                  href="/contact-us/"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-base font-semibold text-white bg-[#a329a3] hover:bg-[#8a238a] transition-colors shadow-sm"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                Designed & Developed for TTB by {companyData.developerCredit}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
