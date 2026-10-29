"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { mainNavItems, companyData } from "@/content/company";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll position for subtle depth enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Do not render public navbar on admin console pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-transparent border-b border-transparent pt-2.5 sm:pt-3.5 px-3 sm:px-6 pointer-events-none"
          : "bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs px-0 pointer-events-auto"
      }`}
    >
      {/* Morphing Navbar Container: Full-width clean header at top, floating pill when scrolled */}
      <div
        className={`transition-all duration-300 ease-out pointer-events-auto ${
          isScrolled
            ? "w-[94%] max-w-[1180px] mx-auto rounded-2xl sm:rounded-[22px] bg-black/92 backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.85),0_0_20px_rgba(163,41,204,0.12)] py-2 sm:py-2.5 px-3.5 sm:px-6"
            : "w-full max-w-7xl mx-auto rounded-none border-0 shadow-none bg-transparent py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div className="flex items-center justify-between min-h-[50px] sm:min-h-[54px] gap-2 lg:gap-4">
          {/* Brand Wordmark & Official Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded-xl py-0.5 shrink-0"
            aria-label={`${companyData.shortName} Homepage`}
          >
            <div className="relative h-10 w-[63px] sm:h-11 sm:w-[70px] shrink-0">
              <Image
                src="/images/company/ttb-logo.png"
                alt="T&T Brothers (TTB) Logo"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-200"
                sizes="70px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-sm sm:text-base font-bold tracking-tight leading-tight transition-colors duration-300 ${
                  isScrolled ? "text-white" : "text-black"
                }`}
              >
                {companyData.name}
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isScrolled ? "text-white/60" : "text-gray-500"
                }`}
              >
                One-Source Solutions • Est. 1988
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Centered, balanced items) */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {mainNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium rounded-xl transition-all duration-200 ease-out whitespace-nowrap ${
                    active
                      ? "text-white font-semibold bg-brand-purple shadow-sm shadow-brand-purple/30"
                      : isScrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"
                      : "text-neutral-700 hover:text-black hover:bg-gray-100/90 hover:-translate-y-0.5"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA (Refined Purple Action Button) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/about-us/#directors-message"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold text-white bg-brand-purple hover:bg-brand-purple/90 active:scale-[0.98] transition-all duration-200 ease-out shadow-sm hover:shadow-md hover:shadow-brand-purple/25 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              <span>Director&apos;s Message</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={`p-2 rounded-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-purple transition-all cursor-pointer ${
                isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-gray-100"
              }`}
              aria-expanded={isOpen}
              aria-label={
                isOpen
                  ? "Close main navigation menu"
                  : "Open main navigation menu"
              }
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Drawer Menu */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 lg:hidden px-3 sm:px-6 pointer-events-auto transition-all duration-300 ${
            isScrolled ? "top-[72px] sm:top-[80px]" : "top-[64px] sm:top-[70px]"
          }`}
        >
          {/* Subtle Dim Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Menu Card matching the floating bar */}
          <div
            className={`w-full max-w-7xl mx-auto rounded-2xl shadow-2xl p-4 sm:p-5 overflow-y-auto max-h-[calc(100vh-6rem)] animate-fade-in-down space-y-1.5 ${
              isScrolled
                ? "bg-black/95 backdrop-blur-xl border border-white/15"
                : "bg-white backdrop-blur-xl border border-gray-200"
            }`}
          >
            {mainNavItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  style={{ animationDelay: `${idx * 25}ms` }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-white bg-brand-purple font-semibold shadow-sm"
                      : isScrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10 hover:translate-x-1"
                      : "text-neutral-800 hover:text-black hover:bg-gray-100 hover:translate-x-1"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                  )}
                </Link>
              );
            })}

            <div
              className={`pt-3 border-t ${
                isScrolled ? "border-white/10" : "border-gray-200"
              }`}
            >
              <Link
                href="/about-us/#directors-message"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-brand-purple hover:bg-brand-purple/90 active:scale-[0.98] transition-all shadow-md group"
              >
                <span>Director&apos;s Message</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <div
              className={`pt-2 text-center text-[11px] font-mono ${
                isScrolled ? "text-white/40" : "text-gray-500"
              }`}
            >
              {companyData.name} • Established 25 August 1988
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
