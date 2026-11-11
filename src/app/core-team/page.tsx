"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ManagedPageCarousel } from "@/components/sections/ManagedPageCarousel";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import Image from "next/image";
import { User } from "lucide-react";

const DEFAULT_INTRO = {
  badge: "Our People",
  title: "Core Team",
  subtitle:
    "Meet the dedicated professionals who lead T & T Brothers (TTB) with over 35 years of engineering excellence across Pakistan.",
};

export default function CoreTeamPage() {
  const { content, isHydrated } = useContent();

  const team = isHydrated ? (content.team ?? []) : [];
  const intro =
    isHydrated && content.teamIntro ? content.teamIntro : DEFAULT_INTRO;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative bg-black text-white py-16 md:py-24 border-b border-black-70 overflow-hidden">
        <ManagedPageCarousel page="team" />
        <Container>
          <div className="relative z-30 max-w-3xl space-y-4">
            <div className="animate-fade-in-down">
              <Badge variant="accent">{intro.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
              {intro.title}
            </h1>
            <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {intro.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white dark:bg-black">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {team
              .slice()
              .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
              .map((member, idx) => (
                <AnimateOnScroll
                  key={member.id}
                  variant="fade-up"
                  delay={idx * 60}
                  className="h-full"
                >
                  <div className="flex flex-col items-center text-center bg-white dark:bg-black rounded-2xl border border-black-20 dark:border-black-70 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-purple dark:hover:border-brand-purple transition-all duration-300 group h-full">
                    {/* Photo */}
                    <div
                      className="relative w-full aspect-square bg-black-20/30 dark:bg-black-70/40 overflow-hidden"
                    >
                      {isHydrated && member.imagePath ? (
                        <Image
                          src={member.imagePath}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black-20/40 to-black-20/10 dark:from-black-70/60 dark:to-black-70/20">
                          <User className="w-16 h-16 text-black-40 dark:text-black-50" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col items-center gap-1 flex-1 justify-center">
                      <h3 className="text-sm sm:text-base font-bold text-black dark:text-white leading-tight group-hover:text-brand-purple transition-colors duration-200">
                        {member.name}
                      </h3>
                      <p className="text-xs text-black-50 dark:text-black-40 font-medium leading-snug">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
          </div>

          {team.length === 0 && (
            <div className="text-center py-20 text-black-50">
              <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No team members added yet. Add them from the Admin Panel.</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
