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

export interface HsseStatisticsContent {
  exposureHours: number;
  nmPi: number;
  training: number;
  incidents: number;
  recognitionAndReward: number;
}

export interface CompanyFactSheetContent {
  heading: string;
  badge: string;
  rows: { label: string; value: string }[];
  buttonText: string;
  buttonLink: string;
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

export interface PrivacyPolicyContent {
  badge: string;
  title: string;
  description: string;
  disclaimerTitle: string;
  disclaimerText: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bulletItems: string[];
  }[];
  lastUpdated: string;
}

export interface SiteContent {
  company: CompanyInfo;
  hero: HeroContent;
  hsseStatistics: HsseStatisticsContent;
  companyFactSheet: CompanyFactSheetContent;
  aboutUs: AboutUsContent;
  privacyPolicy: PrivacyPolicyContent;
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
  galleryImages: string[];
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
  hsseStatistics: {
    exposureHours: 0,
    nmPi: 0,
    training: 0,
    incidents: 0,
    recognitionAndReward: 0,
  },
  companyFactSheet: {
    heading: "Company Fact Sheet",
    badge: "Official Record",
    rows: [
      { label: "Company Name", value: "T & T Brothers (TTB)" },
      { label: "Established", value: "1988 (35+ Yrs)" },
      { label: "Membership", value: "ICCI member" },
      { label: "Certification", value: "ISO 45001:2008" },
      { label: "Workforce", value: "~60 Qualified Personnel" },
      { label: "Offices", value: "Peshawar & Islamabad" },
    ],
    buttonText: "Contact Head Office",
    buttonLink: "/contact-us/",
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
  privacyPolicy: {
    badge: "Legal & Compliance",
    title: "Corporate Privacy Policy",
    description:
      "General disclosure regarding corporate data handling, website usage, and information governance principles.",
    disclaimerTitle: "Administrative Disclaimer",
    disclaimerText:
      "This document serves as an editable template outline for TTB corporate website visitors. It does not constitute formal legal counsel and should be reviewed and customized by TTB legal counsel prior to statutory filings.",
    sections: [
      {
        heading: "1. Scope of Policy",
        paragraphs: [
          "This Privacy Policy applies to personal and commercial information collected through the official corporate website of {{companyName}}. By accessing this portal, visitors acknowledge the data handling practices described herein.",
        ],
        bulletItems: [],
      },
      {
        heading: "2. Information Collection & Usage",
        paragraphs: [
          "We collect information voluntarily submitted through our inquiry forms, career application communications, and direct email correspondence. This information typically includes your name, business email address, organizational affiliation, and the substance of your commercial inquiry.",
          "Submitted information is utilized solely to:",
        ],
        bulletItems: [
          "Evaluate and respond to corporate inquiries and project requests.",
          "Process expressions of interest and job applications.",
          "Maintain internal corporate administrative and audit records.",
        ],
      },
      {
        heading: "3. Non-Disclosure & Data Security",
        paragraphs: [
          "TTB enforces stringent internal information security protocols to safeguard business correspondence against unauthorized access, alteration, disclosure, or destruction. We do not sell, rent, or commercially distribute stakeholder information to third-party marketing providers.",
        ],
        bulletItems: [],
      },
      {
        heading: "4. Third-Party Links & Services",
        paragraphs: [
          "Our website may contain links to external enterprise partners or service gateways. TTB is not responsible for the privacy practices or content of external domains. Visitors are encouraged to review the independent policies of any external destination visited.",
        ],
        bulletItems: [],
      },
      {
        heading: "5. Inquiries & Updates",
        paragraphs: [
          "For questions regarding data governance or to request updates to your submitted contact information, please reach our compliance desk at {{companyEmail}}.",
        ],
        bulletItems: [],
      },
    ],
    lastUpdated: "Corporate Revision 1.0",
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
  galleryImages: [
    "/images/projects/total-wash-project.jpg",
    "/images/projects/total-wash-bay-detail.jpg",
    "/images/projects/total-quartz-retail-interior.jpg",
    "/images/projects/sana-filling-station-shop.jpg",
    "/images/projects/total-service-center-shop.jpg",
    "/images/projects/fuel-dispensers-canopy-strip.jpg",
  ],
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
  updateHsseStatistics: (statistics: Partial<HsseStatisticsContent>) => void;
  updateCompanyFactSheet: (
    factSheet: Partial<CompanyFactSheetContent>
  ) => void;
  updateAboutUs: (aboutUs: Partial<AboutUsContent>) => void;
  updatePrivacyPolicy: (privacyPolicy: Partial<PrivacyPolicyContent>) => void;

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

  // Gallery
  addGalleryImage: (imageUrl: string) => void;
  deleteGalleryImage: (index: number) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

function getNonNegativeNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : fallback;
}

function mergeContentWithDefaults(parsed: Partial<SiteContent>): SiteContent {
  const savedPrivacyPolicy = parsed.privacyPolicy;
  const savedPrivacySections = Array.isArray(savedPrivacyPolicy?.sections)
    ? savedPrivacyPolicy.sections
    : defaultContent.privacyPolicy.sections;
  const savedHsseStatistics = parsed.hsseStatistics;

  return {
    ...defaultContent,
    ...parsed,
    company: { ...defaultContent.company, ...(parsed.company || {}) },
    hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
    hsseStatistics: {
      exposureHours: getNonNegativeNumber(
        savedHsseStatistics?.exposureHours,
        defaultContent.hsseStatistics.exposureHours
      ),
      nmPi: getNonNegativeNumber(
        savedHsseStatistics?.nmPi,
        defaultContent.hsseStatistics.nmPi
      ),
      training: getNonNegativeNumber(
        savedHsseStatistics?.training,
        defaultContent.hsseStatistics.training
      ),
      incidents: getNonNegativeNumber(
        savedHsseStatistics?.incidents,
        defaultContent.hsseStatistics.incidents
      ),
      recognitionAndReward: getNonNegativeNumber(
        savedHsseStatistics?.recognitionAndReward,
        defaultContent.hsseStatistics.recognitionAndReward
      ),
    },
    companyFactSheet: {
      ...defaultContent.companyFactSheet,
      ...(parsed.companyFactSheet || {}),
      rows: Array.isArray(parsed.companyFactSheet?.rows)
        ? parsed.companyFactSheet.rows.filter(
            (row): row is { label: string; value: string } =>
              typeof row?.label === "string" && typeof row?.value === "string"
          )
        : defaultContent.companyFactSheet.rows,
    },
    aboutUs: { ...defaultContent.aboutUs, ...(parsed.aboutUs || {}) },
    privacyPolicy: {
      ...defaultContent.privacyPolicy,
      ...(savedPrivacyPolicy && typeof savedPrivacyPolicy === "object"
        ? savedPrivacyPolicy
        : {}),
      sections: savedPrivacySections.map((section, index) => {
        const fallback = defaultContent.privacyPolicy.sections[index];
        return {
          heading:
            typeof section?.heading === "string"
              ? section.heading
              : fallback?.heading ?? `Section ${index + 1}`,
          paragraphs: Array.isArray(section?.paragraphs)
            ? section.paragraphs.filter(
                (paragraph): paragraph is string => typeof paragraph === "string"
              )
            : fallback?.paragraphs ?? [],
          bulletItems: Array.isArray(section?.bulletItems)
            ? section.bulletItems.filter(
                (item): item is string => typeof item === "string"
              )
            : fallback?.bulletItems ?? [],
        };
      }),
    },
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
    galleryImages: Array.isArray(parsed.galleryImages)
      ? parsed.galleryImages.filter(
          (imageUrl): imageUrl is string => typeof imageUrl === "string"
        )
      : defaultContent.galleryImages,
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

  const updateHsseStatistics = (
    partial: Partial<HsseStatisticsContent>
  ) => {
    saveContent({
      ...contentRef.current,
      hsseStatistics: {
        ...contentRef.current.hsseStatistics,
        ...partial,
      },
    });
  };

  const updateCompanyFactSheet = (
    partial: Partial<CompanyFactSheetContent>
  ) => {
    saveContent({
      ...contentRef.current,
      companyFactSheet: {
        ...contentRef.current.companyFactSheet,
        ...partial,
      },
    });
  };

  const updateAboutUs = (partial: Partial<AboutUsContent>) => {
    saveContent({
      ...contentRef.current,
      aboutUs: { ...contentRef.current.aboutUs, ...partial },
    });
  };

  const updatePrivacyPolicy = (partial: Partial<PrivacyPolicyContent>) => {
    saveContent({
      ...contentRef.current,
      privacyPolicy: { ...contentRef.current.privacyPolicy, ...partial },
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

  const addGalleryImage = (imageUrl: string) => {
    saveContent({
      ...contentRef.current,
      galleryImages: [...contentRef.current.galleryImages, imageUrl],
    });
  };

  const deleteGalleryImage = (index: number) => {
    saveContent({
      ...contentRef.current,
      galleryImages: contentRef.current.galleryImages.filter(
        (_, imageIndex) => imageIndex !== index
      ),
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
        updateHsseStatistics,
        updateCompanyFactSheet,
        updateAboutUs,
        updatePrivacyPolicy,
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
        addGalleryImage,
        deleteGalleryImage,
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
