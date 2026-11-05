"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  CompanyInfo,
  ProjectItem,
  ClientItem,
  ValueItem,
  ServiceCategory,
  JobOpening,
  ContactConfig,
  TeamMember,
} from "@/types";

import { companyData, directorMessage } from "@/content/company";
import { corporateProjects, projectsIntroduction } from "@/content/projects";
import { corporateClients, clientsIntroduction } from "@/content/clients";
import { corporateServices, servicesIntroduction } from "@/content/services";
import { corporateValues, valuesIntroduction } from "@/content/values";
import {
  careersIntroduction,
  culturePrinciples,
  currentOpenings,
} from "@/content/careers";
import { contactConfig, contactPageContent } from "@/content/contact";
import { coreTeamMembers, teamIntroduction } from "@/content/team";

export interface HeroContent {
  badge: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface AboutUsContent {
  badge: string;
  title: string;
  subtitle: string;
  legacyTitle: string;
  legacyText: string;
  directorHeading: string;
  directorName: string;
  directorTitle: string;
  directorParagraphs: string[];
  stats: {
    years: string;
    projects: string;
    staff: string;
    satisfaction: string;
  };
}

export interface SiteContent {
  company: CompanyInfo;
  hero: HeroContent;
  aboutUs: AboutUsContent;
  projectsIntro: typeof projectsIntroduction;
  projects: ProjectItem[];
  clientsIntro: typeof clientsIntroduction;
  clients: ClientItem[];
  servicesIntro: typeof servicesIntroduction;
  services: (ServiceCategory & { summary: string; description: string })[];
  valuesIntro: typeof valuesIntroduction;
  values: ValueItem[];
  careersIntro: typeof careersIntroduction;
  careers: {
    jobs: JobOpening[];
    culture: { title: string; description: string }[];
  };
  contactConfig: ContactConfig;
  contactIntro: typeof contactPageContent;
  teamIntro: typeof teamIntroduction;
  team: TeamMember[];
  lastUpdated?: string;
}

const defaultContent: SiteContent = {
  company: companyData,
  hero: {
    badge: "Established 1988 • Over 35 Years of Engineering Excellence",
    headline:
      "One-Source Solution for Commercial Construction & Oil & Gas Facilities",
    description:
      "T & T Brothers (TTB) provides end-to-end turnkey construction management, retail filling station commissioning, automated car wash installations, and electro-mechanical maintenance for industry leaders across Pakistan.",
    primaryCtaText: "Explore Our Services",
    primaryCtaLink: "/services/",
    secondaryCtaText: "Corporate Profile",
    secondaryCtaLink: "/about-us/",
  },
  aboutUs: {
    badge: "Corporate Identity & Purpose",
    title: "About T & T Brothers (TTB)",
    subtitle:
      "Established in 1988, TTB is an established Pakistani one-source solution provider uniting professional engineering, real estate development acumen, and seasoned project execution across commercial construction, downstream oil and gas, and electro-mechanical maintenance.",
    legacyTitle: "A Legacy of Engineering Precision Since 1988",
    legacyText:
      "Founded by Muhammad Touqeer Irshad in 1988, T & T Brothers (TTB) has grown from a regional engineering enterprise into one of Pakistan’s most reliable contractors for corporate infrastructure, retail petroleum stations, and automated car care installations.",
    directorHeading: directorMessage.heading,
    directorName: directorMessage.directorName,
    directorTitle: directorMessage.directorTitle,
    directorParagraphs: directorMessage.paragraphs,
    stats: {
      years: "35+",
      projects: "22+",
      staff: "60+",
      satisfaction: "100%",
    },
  },
  projectsIntro: projectsIntroduction,
  projects: corporateProjects,
  clientsIntro: clientsIntroduction,
  clients: corporateClients,
  servicesIntro: servicesIntroduction,
  services: corporateServices,
  valuesIntro: valuesIntroduction,
  values: corporateValues,
  careersIntro: careersIntroduction,
  careers: {
    jobs: currentOpenings,
    culture: culturePrinciples,
  },
  contactConfig: contactConfig,
  contactIntro: contactPageContent,
  teamIntro: teamIntroduction,
  team: coreTeamMembers,
};

interface ContentContextType {
  content: SiteContent;
  isHydrated: boolean;
  persistenceStatus: "loading" | "ready" | "saving" | "saved" | "error";
  persistenceError: string | null;
  saveContent: (updated: SiteContent) => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => Promise<boolean>;

  // Projects
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  updateProjectsIntro: (intro: Partial<typeof projectsIntroduction>) => void;

  // Clients
  addClient: (client: ClientItem) => void;
  updateClient: (id: string, client: Partial<ClientItem>) => void;
  deleteClient: (id: string) => void;
  updateClientsIntro: (intro: Partial<typeof clientsIntroduction>) => void;

  // Company & About
  updateCompany: (company: Partial<CompanyInfo>) => void;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateAboutUs: (aboutUs: Partial<AboutUsContent>) => void;

  // Services
  addService: (
    service: ServiceCategory & { summary: string; description: string }
  ) => void;
  updateService: (
    id: string,
    service: Partial<ServiceCategory & { summary: string; description: string }>
  ) => void;
  deleteService: (id: string) => void;
  updateServicesIntro: (intro: Partial<typeof servicesIntroduction>) => void;

  // Values
  addValue: (value: ValueItem) => void;
  updateValue: (id: string, value: Partial<ValueItem>) => void;
  deleteValue: (id: string) => void;
  updateValuesIntro: (intro: Partial<typeof valuesIntroduction>) => void;

  // Careers
  addJob: (job: JobOpening) => void;
  updateJob: (id: string, job: Partial<JobOpening>) => void;
  deleteJob: (id: string) => void;
  updateCareersIntro: (intro: Partial<typeof careersIntroduction>) => void;

  // Contact
  updateContactConfig: (config: Partial<ContactConfig>) => void;
  updateContactIntro: (intro: Partial<typeof contactPageContent>) => void;

  // Team
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  updateTeamIntro: (intro: Partial<typeof teamIntroduction>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

function mergeContentWithDefaults(parsed: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...parsed,
    company: { ...defaultContent.company, ...(parsed.company || {}) },
    hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
    aboutUs: { ...defaultContent.aboutUs, ...(parsed.aboutUs || {}) },
    projectsIntro: { ...defaultContent.projectsIntro, ...(parsed.projectsIntro || {}) },
    projects: Array.isArray(parsed.projects) ? parsed.projects : defaultContent.projects,
    clientsIntro: { ...defaultContent.clientsIntro, ...(parsed.clientsIntro || {}) },
    clients: Array.isArray(parsed.clients) ? parsed.clients : defaultContent.clients,
    servicesIntro: { ...defaultContent.servicesIntro, ...(parsed.servicesIntro || {}) },
    services: Array.isArray(parsed.services) ? parsed.services : defaultContent.services,
    valuesIntro: { ...defaultContent.valuesIntro, ...(parsed.valuesIntro || {}) },
    values: Array.isArray(parsed.values) ? parsed.values : defaultContent.values,
    careersIntro: { ...defaultContent.careersIntro, ...(parsed.careersIntro || {}) },
    careers: {
      jobs: Array.isArray(parsed.careers?.jobs)
        ? parsed.careers.jobs
        : defaultContent.careers.jobs,
      culture: Array.isArray(parsed.careers?.culture)
        ? parsed.careers.culture
        : defaultContent.careers.culture,
    },
    contactConfig: { ...defaultContent.contactConfig, ...(parsed.contactConfig || {}) },
    contactIntro: { ...defaultContent.contactIntro, ...(parsed.contactIntro || {}) },
    teamIntro: { ...defaultContent.teamIntro, ...(parsed.teamIntro || {}) },
    team: Array.isArray(parsed.team) ? parsed.team : defaultContent.team,
  };
}

function isSiteContent(value: unknown): value is SiteContent {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const parsed = value as Partial<SiteContent>;
  return (
    typeof parsed.company === "object" &&
    parsed.company !== null &&
    typeof parsed.hero === "object" &&
    parsed.hero !== null &&
    Array.isArray(parsed.projects) &&
    Array.isArray(parsed.clients) &&
    Array.isArray(parsed.services) &&
    Array.isArray(parsed.values) &&
    Array.isArray(parsed.team) &&
    typeof parsed.careers === "object" &&
    parsed.careers !== null
  );
}

async function uploadEmbeddedImages(value: unknown): Promise<unknown> {
  if (typeof value === "string" && value.startsWith("data:image/")) {
    const image = await fetch(value).then((response) => response.blob());
    if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
      throw new Error("Imported images must be JPEG, PNG, or WebP.");
    }

    const formData = new FormData();
    formData.set("file", image, "imported-image");
    const response = await fetch("/api/media/", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !result.url) {
      throw new Error(result.error || "An imported image could not be uploaded.");
    }
    return result.url;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => uploadEmbeddedImages(item)));
  }

  if (typeof value === "object" && value !== null) {
    const converted: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      converted[key] = await uploadEmbeddedImages(item);
    }
    return converted;
  }

  return value;
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isHydrated, setIsHydrated] = useState(false);
  const [persistenceStatus, setPersistenceStatus] =
    useState<ContentContextType["persistenceStatus"]>("loading");
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const contentRef = useRef(content);
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve());
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/content/", { cache: "no-store" });
        const result = (await response.json()) as {
          content?: unknown;
          error?: string;
        };
        if (!response.ok) {
          throw new Error(result.error || "Shared content could not be loaded.");
        }

        if (result.content !== null && result.content !== undefined) {
          if (!isSiteContent(result.content)) {
            throw new Error("Shared site content has an invalid format.");
          }
          const nextContent = mergeContentWithDefaults(result.content);
          if (active) {
            contentRef.current = nextContent;
            setContent(nextContent);
          }
        }

        if (active) {
          setPersistenceError(null);
          setPersistenceStatus("ready");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Shared content could not be loaded.";
        console.error("Failed to load shared TTB content:", error);
        if (active) {
          setPersistenceError(message);
          setPersistenceStatus("error");
        }
      } finally {
        if (active) setIsHydrated(true);
      }
    };

    const refreshOnFocus = () => {
      if (!document.hidden) void loadContent();
    };

    channelRef.current = new BroadcastChannel("ttb-content-updated");
    channelRef.current.onmessage = refreshOnFocus;
    window.addEventListener("focus", refreshOnFocus);
    void loadContent();

    return () => {
      active = false;
      window.removeEventListener("focus", refreshOnFocus);
      channelRef.current?.close();
      channelRef.current = null;
    };
  }, []);

  const saveContent = (updated: SiteContent) => {
    const payload = {
      ...updated,
      lastUpdated: new Date().toISOString(),
    };
    contentRef.current = payload;
    setContent(payload);
    setPersistenceStatus("saving");
    setPersistenceError(null);

    saveQueueRef.current = saveQueueRef.current
      .then(async () => {
        const response = await fetch("/api/content/", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(result.error || "Content could not be published.");
        }

        if (contentRef.current === payload) {
          setPersistenceStatus("saved");
          setPersistenceError(null);
          channelRef.current?.postMessage("refresh");
        }
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Content could not be published.";
        console.error("Failed to save shared TTB content:", error);
        setPersistenceStatus("error");
        setPersistenceError(message);
      });
  };

  const resetToDefaults = () => {
    saveContent(defaultContent);
  };

  const exportJson = () => {
    const jsonStr = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ttb-content-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importJson = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed: unknown = JSON.parse(jsonString);
      if (!isSiteContent(parsed)) return false;
      const imported = await uploadEmbeddedImages(parsed);
      if (!isSiteContent(imported)) return false;
      saveContent(mergeContentWithDefaults(imported));
      return true;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "The content backup could not be imported.";
      console.error("Failed to import TTB content:", e);
      setPersistenceError(message);
      return false;
    }
  };

  // Projects modifiers
  const addProject = (project: ProjectItem) => {
    saveContent({
      ...contentRef.current,
      projects: [project, ...contentRef.current.projects],
    });
  };

  const updateProject = (id: string, partial: Partial<ProjectItem>) => {
    saveContent({
      ...contentRef.current,
      projects: contentRef.current.projects.map((p) =>
        p.id === id ? { ...p, ...partial } : p
      ),
    });
  };

  const deleteProject = (id: string) => {
    saveContent({
      ...contentRef.current,
      projects: contentRef.current.projects.filter((p) => p.id !== id),
    });
  };

  const updateProjectsIntro = (intro: Partial<typeof projectsIntroduction>) => {
    saveContent({
      ...contentRef.current,
      projectsIntro: { ...contentRef.current.projectsIntro, ...intro },
    });
  };

  // Clients modifiers
  const addClient = (client: ClientItem) => {
    saveContent({
      ...contentRef.current,
      clients: [...contentRef.current.clients, client],
    });
  };

  const updateClient = (id: string, partial: Partial<ClientItem>) => {
    saveContent({
      ...contentRef.current,
      clients: contentRef.current.clients.map((c) =>
        c.id === id ? { ...c, ...partial } : c
      ),
    });
  };

  const deleteClient = (id: string) => {
    saveContent({
      ...contentRef.current,
      clients: contentRef.current.clients.filter((c) => c.id !== id),
    });
  };

  const updateClientsIntro = (intro: Partial<typeof clientsIntroduction>) => {
    saveContent({
      ...contentRef.current,
      clientsIntro: { ...contentRef.current.clientsIntro, ...intro },
    });
  };

  // Company & About
  const updateCompany = (partial: Partial<CompanyInfo>) => {
    saveContent({
      ...contentRef.current,
      company: { ...contentRef.current.company, ...partial },
    });
  };

  const updateHero = (partial: Partial<HeroContent>) => {
    saveContent({
      ...contentRef.current,
      hero: { ...contentRef.current.hero, ...partial },
    });
  };

  const updateAboutUs = (partial: Partial<AboutUsContent>) => {
    saveContent({
      ...contentRef.current,
      aboutUs: { ...contentRef.current.aboutUs, ...partial },
    });
  };

  // Services
  const addService = (
    service: ServiceCategory & { summary: string; description: string }
  ) => {
    saveContent({
      ...contentRef.current,
      services: [...contentRef.current.services, service],
    });
  };

  const updateService = (
    id: string,
    partial: Partial<ServiceCategory & { summary: string; description: string }>
  ) => {
    saveContent({
      ...contentRef.current,
      services: contentRef.current.services.map((s) =>
        s.id === id ? { ...s, ...partial } : s
      ),
    });
  };

  const deleteService = (id: string) => {
    saveContent({
      ...contentRef.current,
      services: contentRef.current.services.filter((s) => s.id !== id),
    });
  };

  const updateServicesIntro = (intro: Partial<typeof servicesIntroduction>) => {
    saveContent({
      ...contentRef.current,
      servicesIntro: { ...contentRef.current.servicesIntro, ...intro },
    });
  };

  // Values
  const addValue = (value: ValueItem) => {
    saveContent({
      ...contentRef.current,
      values: [...contentRef.current.values, value],
    });
  };

  const updateValue = (id: string, partial: Partial<ValueItem>) => {
    saveContent({
      ...contentRef.current,
      values: contentRef.current.values.map((v) =>
        v.id === id ? { ...v, ...partial } : v
      ),
    });
  };

  const deleteValue = (id: string) => {
    saveContent({
      ...contentRef.current,
      values: contentRef.current.values.filter((v) => v.id !== id),
    });
  };

  const updateValuesIntro = (intro: Partial<typeof valuesIntroduction>) => {
    saveContent({
      ...contentRef.current,
      valuesIntro: { ...contentRef.current.valuesIntro, ...intro },
    });
  };

  // Careers
  const addJob = (job: JobOpening) => {
    saveContent({
      ...contentRef.current,
      careers: {
        ...contentRef.current.careers,
        jobs: [...contentRef.current.careers.jobs, job],
      },
    });
  };

  const updateJob = (id: string, partial: Partial<JobOpening>) => {
    saveContent({
      ...contentRef.current,
      careers: {
        ...contentRef.current.careers,
        jobs: contentRef.current.careers.jobs.map((j) =>
          j.id === id ? { ...j, ...partial } : j
        ),
      },
    });
  };

  const deleteJob = (id: string) => {
    saveContent({
      ...contentRef.current,
      careers: {
        ...contentRef.current.careers,
        jobs: contentRef.current.careers.jobs.filter((j) => j.id !== id),
      },
    });
  };

  const updateCareersIntro = (intro: Partial<typeof careersIntroduction>) => {
    saveContent({
      ...contentRef.current,
      careersIntro: { ...contentRef.current.careersIntro, ...intro },
    });
  };

  // Contact
  const updateContactConfig = (config: Partial<ContactConfig>) => {
    saveContent({
      ...contentRef.current,
      contactConfig: { ...contentRef.current.contactConfig, ...config },
    });
  };

  const updateContactIntro = (intro: Partial<typeof contactPageContent>) => {
    saveContent({
      ...contentRef.current,
      contactIntro: { ...contentRef.current.contactIntro, ...intro },
    });
  };

  const addTeamMember = (member: TeamMember) => {
    saveContent({
      ...contentRef.current,
      team: [...(contentRef.current.team ?? []), member],
    });
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    saveContent({
      ...contentRef.current,
      team: (contentRef.current.team ?? []).map((m) =>
        m.id === id ? { ...m, ...member } : m
      ),
    });
  };

  const deleteTeamMember = (id: string) => {
    saveContent({
      ...contentRef.current,
      team: (contentRef.current.team ?? []).filter((m) => m.id !== id),
    });
  };

  const updateTeamIntro = (intro: Partial<typeof teamIntroduction>) => {
    saveContent({
      ...contentRef.current,
      teamIntro: { ...contentRef.current.teamIntro, ...intro },
    });
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isHydrated,
        persistenceStatus,
        persistenceError,
        saveContent,
        resetToDefaults,
        exportJson,
        importJson,
        addProject,
        updateProject,
        deleteProject,
        updateProjectsIntro,
        addClient,
        updateClient,
        deleteClient,
        updateClientsIntro,
        updateCompany,
        updateHero,
        updateAboutUs,
        addService,
        updateService,
        deleteService,
        updateServicesIntro,
        addValue,
        updateValue,
        deleteValue,
        updateValuesIntro,
        addJob,
        updateJob,
        deleteJob,
        updateCareersIntro,
        updateContactConfig,
        updateContactIntro,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        updateTeamIntro,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
