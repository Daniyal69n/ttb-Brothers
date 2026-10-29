import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { companyData, directorMessage } from "@/content/company";
import {
  CheckCircle2,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | T & T Brothers (TTB)",
  description:
    "Learn about T & T Brothers (TTB): established 25 August 1988, our mission, vision, director's message, ~60 professional staff, and one-source solutions across Pakistan.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Page Header */}
      <section className="bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">Corporate Identity &amp; Purpose</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              About T &amp; T Brothers (TTB)
            </h1>
            <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              Established on 25 August 1988, TTB is an established Pakistani one-source solution provider uniting professional engineering, real estate development acumen, and seasoned project execution across commercial construction, downstream oil and gas, and electro-mechanical maintenance.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Company Introduction & History */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                badge="Our Background"
                title="A Legacy of Engineering Precision Since 1988"
                align="left"
                className="mb-4"
              />

              <p className="text-base text-black-70 dark:text-black-20 leading-relaxed">
                Founded as a sole proprietorship by <strong>{companyData.proprietor}</strong> on <strong>25 August 1988</strong>, T & T Brothers (TTB) has grown from a regional engineering enterprise into one of Pakistan’s most reliable contractors for corporate infrastructure, retail petroleum stations, and automated car care installations.
              </p>

              <p className="text-base text-black-70 dark:text-black-20 leading-relaxed">
                As a one-source solution provider, TTB manages every phase of project delivery. We combine registered engineers, real estate developers, and a dedicated multidisciplinary workforce of approximately <strong>60 qualified personnel</strong>. Our team oversees commercial and private construction management, routine structural maintenance, oil and gas outlet commissioning, architecture, interior joinery, and 24-hour reactive electro-mechanical servicing.
              </p>

              <div className="p-5 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-3">
                <h4 className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-brand-purple" />
                  Our Execution Disciplines
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black-70 dark:text-black-20">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Commercial & Private Construction
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Oil & Gas Installation & Commissioning
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Architecture & Interior Design
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Civil, Electrical & Mechanical Maintenance
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> General & Technical Supplies
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" /> Turnkey Facility & Project Management
                  </span>
                </div>
              </div>
            </div>

            {/* Fact Sheet */}
            <div className="lg:col-span-5 bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold text-black dark:text-white border-b border-black-20 dark:border-black-70 pb-3">
                Corporate Fact Sheet
              </h3>

              <div className="space-y-3 text-sm divide-y divide-black-20/60 dark:divide-black-70/60">
                <div className="pt-2.5 first:pt-0 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Company Name</span>
                  <span className="font-semibold text-black dark:text-white">T & T Brothers (TTB)</span>
                </div>

                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Established</span>
                  <span className="font-semibold text-black dark:text-white">25 August 1988</span>
                </div>

                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Legal Structure</span>
                  <span className="font-semibold text-black dark:text-white">Sole Proprietor</span>
                </div>

                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Proprietor</span>
                  <span className="font-semibold text-black dark:text-white">Muhammad Touqeer Irshad</span>
                </div>

                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Workforce</span>
                  <span className="font-semibold text-black dark:text-white">~60 Dedicated Staff</span>
                </div>

                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Registered Office</span>
                  <span className="font-semibold text-black dark:text-white text-right">Peshawar (G.T. Road)</span>
                </div>

                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-black-60 dark:text-black-40">Branch Office</span>
                  <span className="font-semibold text-black dark:text-white text-right">Islamabad (I-10/4)</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/contact-us/"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-brand-purple text-white hover:opacity-90 transition-opacity"
                >
                  Contact Management &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-black-20/10 dark:bg-black border-b border-black-20 dark:border-black-70">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white dark:bg-black rounded-2xl border border-black-20 dark:border-black-70 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple border border-brand-purple/20 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Our Mission
                </h3>
                <blockquote className="text-base sm:text-lg text-black-70 dark:text-black-20 leading-relaxed italic border-l-4 border-brand-purple pl-4">
                  “T & T Brothers aims to provide value-added services through successful customer partnerships, lasting relationships, exceptional performance, and the trust of its clients in work and HSSE.”
                </blockquote>
              </div>
              <p className="text-xs text-black-50">
                Source: Official TTB Corporate Profile Mission Statement
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-black rounded-2xl border border-black-20 dark:border-black-70 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple border border-brand-purple/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Our Vision
                </h3>
                <p className="text-base text-black-70 dark:text-black-20 leading-relaxed">
                  To achieve sustainable growth as Pakistan’s foremost one-source engineering and facility partner by forging enduring client relationships, delivering high-quality construction services, maintaining world-class workplace safety, accelerating technological adoption, and actively developing our employees.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-brand-purple">
                <span className="bg-brand-purple/10 px-2.5 py-1 rounded">Sustainable Growth</span>
                <span className="bg-brand-purple/10 px-2.5 py-1 rounded">Zero-Harm HSSE</span>
                <span className="bg-brand-purple/10 px-2.5 py-1 rounded">Technological Excellence</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Company Benefits (Stated in Profile) */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70">
        <Container>
          <SectionHeader
            badge="Why Clients Partner With TTB"
            title="Core Company Benefits"
            subtitle="Extracted directly from the verified TTB Corporate Profile, these key advantages define our client value proposition."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyData.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 space-y-2 hover:border-brand-purple transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-purple text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-black dark:text-white">
                    {benefit.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-black-70 dark:text-black-20 leading-relaxed pl-9">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. DIRECTOR'S MESSAGE SECTION (with authentic editorial layout) */}
      <section className="py-20 bg-black text-white border-b border-black-70 overflow-hidden">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Director Portrait / Box Container */}
              <AnimateOnScroll variant="scale" className="lg:col-span-5 space-y-4">
                <div className="card-lift relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black-70 border-2 border-brand-purple shadow-2xl hover:shadow-brand-purple/25 flex flex-col justify-end p-6 text-white group transition-all duration-500">
                  <Image
                    src="/images/director/director-touqeer-irshad.jpg"
                    alt={`${directorMessage.directorName} - ${directorMessage.directorTitle}`}
                    fill
                    className="object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                  {/* Subtle dark gradient overlay so bottom text is perfectly legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none" />

                  {/* Bottom Plate */}
                  <div className="relative z-10 bg-black/85 backdrop-blur-md p-4 rounded-xl border border-black-70 space-y-1 group-hover:border-brand-purple/60 transition-colors duration-300">
                    <p className="text-base font-bold text-white group-hover:text-brand-purple transition-colors duration-200">
                      {directorMessage.directorName}
                    </p>
                    <p className="text-xs text-brand-purple font-medium">
                      {directorMessage.directorTitle}
                    </p>
                    <p className="text-[11px] text-black-40 font-mono">
                      Proprietor • Established 25 August 1988
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Message Editorial Column */}
              <AnimateOnScroll variant="fade-left" delay={150} className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Executive Message
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {directorMessage.heading}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-black-20 leading-relaxed font-normal">
                  {directorMessage.paragraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed hover:text-white transition-colors duration-200">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="pt-4 border-t border-black-70 flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-white">
                      {directorMessage.directorName}
                    </p>
                    <p className="text-xs text-brand-purple">
                      {directorMessage.directorTitle} • {companyData.name}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-black-40">
                    Est. 25 August 1988
                  </span>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Dedicated Team & Workforce Section */}
      <section className="py-20 bg-white dark:bg-black border-b border-black-20 dark:border-black-70 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <AnimateOnScroll variant="fade-right" className="lg:col-span-6 space-y-5">
              <SectionHeader
                badge="Our Workforce"
                title="A Dedicated Team of 60 Skilled Professionals"
                align="left"
              />

              <p className="text-base text-black-70 dark:text-black-20 leading-relaxed">
                As stated in the official company profile, TTB employs approximately <strong>60 qualified professionals</strong> spanning project directors, registered civil engineers, mechanical technicians, certified electricians, HSSE inspectors, and experienced field craftspeople.
              </p>

              <p className="text-sm text-black-70 dark:text-black-20 leading-relaxed">
                Our site crews undergo continuous training, maintain equipment from world-leading manufacturers, and participate in certified technical seminars. This depth of talent enables us to deploy multiple site teams simultaneously across Pakistan without diluting quality or supervision.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="card-lift p-4 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 hover:border-brand-purple/40 hover:shadow-md transition-all duration-300">
                  <span className="text-2xl font-bold text-brand-purple">~60</span>
                  <p className="text-xs text-black-60 dark:text-black-40 mt-1">Full-time Engineers, Supervisors &amp; Craftspeople</p>
                </div>
                <div className="card-lift p-4 rounded-xl bg-black-20/10 dark:bg-black-70/20 border border-black-20 dark:border-black-70 hover:border-brand-purple/40 hover:shadow-md transition-all duration-300">
                  <span className="text-2xl font-bold text-brand-purple">100%</span>
                  <p className="text-xs text-black-60 dark:text-black-40 mt-1">HSSE Compliant &amp; PPE-Certified Active Teams</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Team Photographs Gallery */}
            <div className="lg:col-span-6 space-y-5">
              {/* Photo 1: Full Team Group Photo */}
              <AnimateOnScroll variant="fade-left" delay={100}>
                <div className="card-lift relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black-70 border border-black-20 dark:border-black-70 flex flex-col justify-end p-5 text-white group shadow-xl hover:shadow-2xl hover:border-brand-purple transition-all duration-300">
                  <Image
                    src="/images/team/team-group-photo.jpg"
                    alt="TTB Staff and Engineering Team Group Photo"
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="relative z-10 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-black-70 flex items-center justify-between group-hover:border-brand-purple/50 transition-colors duration-300">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-brand-purple transition-colors duration-200">
                        TTB Engineering &amp; Operations Team
                      </h4>
                      <p className="text-xs text-black-20">
                        Annual Gathering of TTB&apos;s ~60 Dedicated Professionals
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-brand-purple bg-brand-purple/10 px-2.5 py-1 rounded border border-brand-purple/20">
                      Staff Squad
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Photo 2: Staff Recognition & Safety Award */}
              <AnimateOnScroll variant="fade-left" delay={200}>
                <div className="card-lift relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black-70 border border-black-20 dark:border-black-70 flex flex-col justify-end p-5 text-white group shadow-xl hover:shadow-2xl hover:border-brand-purple transition-all duration-300">
                  <Image
                    src="/images/team/staff-recognition.jpg"
                    alt="Staff Recognition Ceremony & Johnson Controls Safety Event"
                    fill
                    className="object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="relative z-10 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-black-70 flex items-center justify-between group-hover:border-brand-purple/50 transition-colors duration-300">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-brand-purple transition-colors duration-200">
                        Staff Recognition &amp; Safety Ceremony
                      </h4>
                      <p className="text-xs text-black-20">
                        Johnson Controls Safety Challenge &amp; Merit Award Presentation
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-brand-purple bg-brand-purple/10 px-2.5 py-1 rounded border border-brand-purple/20">
                      HSSE Merit
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Bottom Navigation CTA */}
      <section className="py-16 bg-black-20/10 dark:bg-black text-center">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">
              Explore Our Verified Projects & Capabilities
            </h3>
            <p className="text-sm text-black-70 dark:text-black-20">
              Review our 22 documented infrastructure contracts completed for Shell Pakistan, Total Parco Pakistan, and Pakistan State Oil.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/projects/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-90 transition-opacity"
              >
                View Project Portfolio
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-black dark:text-white bg-white dark:bg-black border border-black-20 dark:border-black-70 hover:border-brand-purple transition-colors"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
