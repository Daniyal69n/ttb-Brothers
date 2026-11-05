"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

type ManagedPage =
  | "about"
  | "careers"
  | "clients"
  | "contact"
  | "projects"
  | "services"
  | "values";

interface ManagedPageHeaderProps {
  page: ManagedPage;
  className?: string;
  contentClassName?: string;
}

export function ManagedPageHeader({
  page,
  className,
  contentClassName,
}: ManagedPageHeaderProps) {
  const { content } = useContent();
  const pageContent = {
    about: content.aboutUs,
    careers: content.careersIntro,
    clients: content.clientsIntro,
    contact: content.contactIntro,
    projects: content.projectsIntro,
    services: content.servicesIntro,
    values: content.valuesIntro,
  }[page];

  return (
    <Container className={className}>
      <div className={contentClassName ?? "max-w-3xl space-y-4"}>
        <div className="animate-fade-in-down">
          <Badge variant="accent">{pageContent.badge}</Badge>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-up [animation-delay:100ms]">
          {pageContent.title}
        </h1>
        <p className="text-lg text-black-20 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
          {pageContent.subtitle}
        </p>
      </div>
    </Container>
  );
}
