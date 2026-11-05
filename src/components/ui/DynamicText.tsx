"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";

type CompanyTextField =
  | "description"
  | "email"
  | "emailGeneral"
  | "establishedDate"
  | "establishedYear"
  | "name"
  | "proprietor"
  | "shortName"
  | "tagline"
  | "workforce";

type AboutTextField =
  | "directorHeading"
  | "directorName"
  | "directorTitle"
  | "legacyText"
  | "legacyTitle";

type DynamicTextProps =
  | { source: "company"; field: CompanyTextField }
  | { source: "aboutUs"; field: AboutTextField };

export function DynamicText({ source, field }: DynamicTextProps) {
  const { content } = useContent();
  const value =
    source === "company"
      ? content.company[field]
      : content.aboutUs[field];

  return <>{value}</>;
}
