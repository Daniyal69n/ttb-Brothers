"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import {
  CompanyInfo,
  ProjectItem,
  ClientItem,
  ValueItem,
  ServiceCategory,
  JobOpening,
  ContactConfig,
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
  lastUpdated?: string;
}

const defaultContent: SiteContent = {
  company: companyData,
  hero: {
    badge: "Established 25 August 1988 • Over 35 Years of Engineering Excellence",
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
      "Established on 25 August 1988, TTB is an established Pakistani one-source solution provider uniting professional engineering, real estate development acumen, and seasoned project execution across commercial construction, downstream oil and gas, and electro-mechanical maintenance.",
    legacyTitle: "A Legacy of Engineering Precision Since 1988",
    legacyText:
      "Founded by Muhammad Touqeer Irshad on 25 August 1988, T & T Brothers (TTB) has grown from a regional engineering enterprise into one of Pakistan’s most reliable contractors for corporate infrastructure, retail petroleum stations, and automated car care installations.",
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
};

const STORAGE_KEY = "ttb_corporate_content_v2";

interface ContentContextType {
  content: SiteContent;
  isHydrated: boolean;
  saveContent: (updated: SiteContent) => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;

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
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Partial<SiteContent>;
          return {
            ...defaultContent,
            ...parsed,
            company: { ...defaultContent.company, ...(parsed.company || {}) },
            hero: { ...defaultContent.hero, ...(parsed.hero || {}) },
            aboutUs: { ...defaultContent.aboutUs, ...(parsed.aboutUs || {}) },
            projectsIntro: { ...defaultContent.projectsIntro, ...(parsed.projectsIntro || {}) },
            projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : defaultContent.projects,
            clientsIntro: { ...defaultContent.clientsIntro, ...(parsed.clientsIntro || {}) },
            clients: parsed.clients && parsed.clients.length > 0 ? parsed.clients : defaultContent.clients,
            servicesIntro: { ...defaultContent.servicesIntro, ...(parsed.servicesIntro || {}) },
            services: parsed.services && parsed.services.length > 0 ? parsed.services : defaultContent.services,
            valuesIntro: { ...defaultContent.valuesIntro, ...(parsed.valuesIntro || {}) },
            values: parsed.values && parsed.values.length > 0 ? parsed.values : defaultContent.values,
            careersIntro: { ...defaultContent.careersIntro, ...(parsed.careersIntro || {}) },
            careers: {
              jobs: parsed.careers?.jobs || defaultContent.careers.jobs,
              culture: parsed.careers?.culture || defaultContent.careers.culture,
            },
            contactConfig: { ...defaultContent.contactConfig, ...(parsed.contactConfig || {}) },
            contactIntro: { ...defaultContent.contactIntro, ...(parsed.contactIntro || {}) },
          };
        }
      } catch (e) {
        console.warn("Failed to read TTB content from localStorage:", e);
      }
    }
    return defaultContent;
  });
  const emptySubscribe = () => () => {};
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const saveContent = (updated: SiteContent) => {
    const payload = {
      ...updated,
      lastUpdated: new Date().toISOString(),
    };
    setContent(payload);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to write TTB content to localStorage:", e);
    }
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setContent(defaultContent);
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

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString) as SiteContent;
      if (!parsed || typeof parsed !== "object") return false;
      saveContent({
        ...defaultContent,
        ...parsed,
      });
      return true;
    } catch (e) {
      console.error("Invalid JSON file uploaded:", e);
      return false;
    }
  };

  // Projects modifiers
  const addProject = (project: ProjectItem) => {
    saveContent({
      ...content,
      projects: [project, ...content.projects],
    });
  };

  const updateProject = (id: string, partial: Partial<ProjectItem>) => {
    saveContent({
      ...content,
      projects: content.projects.map((p) =>
        p.id === id ? { ...p, ...partial } : p
      ),
    });
  };

  const deleteProject = (id: string) => {
    saveContent({
      ...content,
      projects: content.projects.filter((p) => p.id !== id),
    });
  };

  const updateProjectsIntro = (intro: Partial<typeof projectsIntroduction>) => {
    saveContent({
      ...content,
      projectsIntro: { ...content.projectsIntro, ...intro },
    });
  };

  // Clients modifiers
  const addClient = (client: ClientItem) => {
    saveContent({
      ...content,
      clients: [...content.clients, client],
    });
  };

  const updateClient = (id: string, partial: Partial<ClientItem>) => {
    saveContent({
      ...content,
      clients: content.clients.map((c) =>
        c.id === id ? { ...c, ...partial } : c
      ),
    });
  };

  const deleteClient = (id: string) => {
    saveContent({
      ...content,
      clients: content.clients.filter((c) => c.id !== id),
    });
  };

  const updateClientsIntro = (intro: Partial<typeof clientsIntroduction>) => {
    saveContent({
      ...content,
      clientsIntro: { ...content.clientsIntro, ...intro },
    });
  };

  // Company & About
  const updateCompany = (partial: Partial<CompanyInfo>) => {
    saveContent({
      ...content,
      company: { ...content.company, ...partial },
    });
  };

  const updateHero = (partial: Partial<HeroContent>) => {
    saveContent({
      ...content,
      hero: { ...content.hero, ...partial },
    });
  };

  const updateAboutUs = (partial: Partial<AboutUsContent>) => {
    saveContent({
      ...content,
      aboutUs: { ...content.aboutUs, ...partial },
    });
  };

  // Services
  const addService = (
    service: ServiceCategory & { summary: string; description: string }
  ) => {
    saveContent({
      ...content,
      services: [...content.services, service],
    });
  };

  const updateService = (
    id: string,
    partial: Partial<ServiceCategory & { summary: string; description: string }>
  ) => {
    saveContent({
      ...content,
      services: content.services.map((s) =>
        s.id === id ? { ...s, ...partial } : s
      ),
    });
  };

  const deleteService = (id: string) => {
    saveContent({
      ...content,
      services: content.services.filter((s) => s.id !== id),
    });
  };

  const updateServicesIntro = (intro: Partial<typeof servicesIntroduction>) => {
    saveContent({
      ...content,
      servicesIntro: { ...content.servicesIntro, ...intro },
    });
  };

  // Values
  const addValue = (value: ValueItem) => {
    saveContent({
      ...content,
      values: [...content.values, value],
    });
  };

  const updateValue = (id: string, partial: Partial<ValueItem>) => {
    saveContent({
      ...content,
      values: content.values.map((v) =>
        v.id === id ? { ...v, ...partial } : v
      ),
    });
  };

  const deleteValue = (id: string) => {
    saveContent({
      ...content,
      values: content.values.filter((v) => v.id !== id),
    });
  };

  const updateValuesIntro = (intro: Partial<typeof valuesIntroduction>) => {
    saveContent({
      ...content,
      valuesIntro: { ...content.valuesIntro, ...intro },
    });
  };

  // Careers
  const addJob = (job: JobOpening) => {
    saveContent({
      ...content,
      careers: {
        ...content.careers,
        jobs: [...content.careers.jobs, job],
      },
    });
  };

  const updateJob = (id: string, partial: Partial<JobOpening>) => {
    saveContent({
      ...content,
      careers: {
        ...content.careers,
        jobs: content.careers.jobs.map((j) =>
          j.id === id ? { ...j, ...partial } : j
        ),
      },
    });
  };

  const deleteJob = (id: string) => {
    saveContent({
      ...content,
      careers: {
        ...content.careers,
        jobs: content.careers.jobs.filter((j) => j.id !== id),
      },
    });
  };

  const updateCareersIntro = (intro: Partial<typeof careersIntroduction>) => {
    saveContent({
      ...content,
      careersIntro: { ...content.careersIntro, ...intro },
    });
  };

  // Contact
  const updateContactConfig = (config: Partial<ContactConfig>) => {
    saveContent({
      ...content,
      contactConfig: { ...content.contactConfig, ...config },
    });
  };

  const updateContactIntro = (intro: Partial<typeof contactPageContent>) => {
    saveContent({
      ...content,
      contactIntro: { ...content.contactIntro, ...intro },
    });
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isHydrated,
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
