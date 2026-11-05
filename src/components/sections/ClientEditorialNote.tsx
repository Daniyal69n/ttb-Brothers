"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";

export function ClientEditorialNote() {
  const { content } = useContent();
  return <>{content.clientsIntro.editorialNote}</>;
}
