import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactUsDirectory } from "@/components/sections/ContactUsDirectory";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ManagedPageHeader } from "@/components/sections/ManagedPageHeader";

export const metadata: Metadata = {
  title: "Contact Us | T & T Brothers (TTB)",
  description:
    "Official contact directory for T & T Brothers (TTB): Peshawar Head Office, Islamabad Branch, official inboxes, and inquiry form.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Page Header */}
      <section className="bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <ManagedPageHeader page="contact" />
      </section>

      {/* 2. Main Content Area */}
      <section className="py-20 bg-black-20/10 dark:bg-black overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Official Directory & Branch Offices */}
            <AnimateOnScroll variant="fade-right" className="lg:col-span-5">
              <ContactUsDirectory />
            </AnimateOnScroll>

            {/* Right: Contact Form */}
            <AnimateOnScroll variant="fade-left" delay={150} className="lg:col-span-7">
              <ContactForm />
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </div>
  );
}
