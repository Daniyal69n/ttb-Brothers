"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";
import type { SiteContent } from "@/context/ContentContext";
import type { HeroCarouselPage } from "@/content/hero";
import { PageHeroEditor } from "@/components/admin/PageHeroEditor";
import {
  ProjectItem,
  ClientItem,
  ValueItem,
  ServiceCategory,
  JobOpening,
  TeamMember,
  NewsItem,
} from "@/types";
import {
  Unlock,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
  EyeOff,
  Check,
  Search,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Briefcase,
  Layers,
  Award,
  Sparkles,
  ExternalLink,
  X,
  AlertCircle,
  Home,
  Info,
  Clock,
  LogOut,
  FolderGit2,
  Camera,
  Users,
  User,
  Newspaper,
} from "lucide-react";

type AdminTab =
  | "overview"
  | "projects"
  | "clients"
  | "contact"
  | "home"
  | "about"
  | "services"
  | "values"
  | "careers"
  | "news"
  | "team"
  | "privacy"
  | "backup";

function splitNonEmptyLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitParagraphs(value: string) {
  return value
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

const HERO_EDITOR_LABELS: Record<HeroCarouselPage, string> = {
  home: "Home",
  about: "About Us",
  values: "Our Values",
  team: "Core Team",
  clients: "Clients",
  services: "Services",
  projects: "Projects",
  careers: "Careers",
  contact: "Contact Us",
  privacy: "Privacy Policy",
};

function getHeroEditorContent(content: SiteContent, page: HeroCarouselPage) {
  switch (page) {
    case "home":
      return {
        badge: content.hero.badge,
        title: content.hero.headline,
        description: content.hero.description,
      };
    case "about":
      return {
        badge: content.aboutUs.badge,
        title: content.aboutUs.title,
        description: content.aboutUs.subtitle,
      };
    case "values":
      return {
        badge: content.valuesIntro.badge,
        title: content.valuesIntro.title,
        description: content.valuesIntro.subtitle,
      };
    case "team":
      return {
        badge: content.teamIntro.badge,
        title: content.teamIntro.title,
        description: content.teamIntro.subtitle,
      };
    case "clients":
      return {
        badge: content.clientsIntro.badge,
        title: content.clientsIntro.title,
        description: content.clientsIntro.subtitle,
      };
    case "services":
      return {
        badge: content.servicesIntro.badge,
        title: content.servicesIntro.title,
        description: content.servicesIntro.subtitle,
      };
    case "projects":
      return {
        badge: content.projectsIntro.badge,
        title: content.projectsIntro.title,
        description: content.projectsIntro.subtitle,
      };
    case "careers":
      return {
        badge: content.careersIntro.badge,
        title: content.careersIntro.title,
        description: content.careersIntro.subtitle,
      };
    case "contact":
      return {
        badge: content.contactIntro.badge,
        title: content.contactIntro.title,
        description: content.contactIntro.subtitle,
      };
    case "privacy":
      return {
        badge: content.privacyPolicy.badge,
        title: content.privacyPolicy.title,
        description: content.privacyPolicy.description,
      };
  }
}

export default function AdminPage() {
  const {
    content,
    isHydrated,
    persistenceStatus,
    persistenceError,
    resetToDefaults,
    exportJson,
    importJson,
    addProject,
    updateProject,
    deleteProject,
    addClient,
    updateClient,
    deleteClient,
    updateCompany,
    updateHero,
    updateProjectsIntro,
    updateClientsIntro,
    updateServicesIntro,
    updateValuesIntro,
    updateCareersIntro,
    updateTeamIntro,
    updateHsseStatistics,
    updateCompanyFactSheet,
    updateAboutUs,
    addService,
    updateService,
    deleteService,
    addValue,
    updateValue,
    deleteValue,
    addJob,
    updateJob,
    deleteJob,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
    updateNewsIntro,
    updateNewsHero,
    updateNewsCarousel,
    updateContactConfig,
    updateContactIntro,
    updatePrivacyPolicy,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addGalleryImage,
    deleteGalleryImage,
    addValuesGalleryImage,
    deleteValuesGalleryImage,
    addPageHeroImage,
    deletePageHeroImage,
  } = useContent();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & form states
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
  const [isAddingClient, setIsAddingClient] = useState(false);

  const [editingService, setEditingService] = useState<(ServiceCategory & { summary: string; description: string }) | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingValue, setEditingValue] = useState<ValueItem | null>(null);
  const [isAddingValue, setIsAddingValue] = useState(false);

  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);

  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newsImagePreview, setNewsImagePreview] = useState("");
  const [newsHeroImagesDraft, setNewsHeroImagesDraft] = useState<string[] | null>(null);
  const [newsHeroImageUrl, setNewsHeroImageUrl] = useState("");
  const [newsHeroUploadsInProgress, setNewsHeroUploadsInProgress] = useState(0);

  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [teamImagePreview, setTeamImagePreview] = useState<string>("");

  // Search queries for lists
  const [projectSearch, setProjectSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  // Live Image Upload & Preview states
  const [projectImagePreview, setProjectImagePreview] = useState<string>("");
  const [clientLogoPreview, setClientLogoPreview] = useState<string>("");

  // Helper to read and compress image from user device
  const handleImageFile = (
    file: File,
    onSuccess: (dataUrl: string) => void,
    onError?: () => void
  ) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Please select a JPEG, PNG, or WebP image.");
      onError?.();
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      alert("Could not read image file from your device.");
      onError?.();
    };
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new window.Image();
      img.onerror = () => onSuccess(src);
      img.onload = () => {
        const maxDimension = 1200;
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          onSuccess(src);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const optimized = canvas.toDataURL(
          outputType,
          outputType === "image/jpeg" ? 0.85 : undefined
        );
        onSuccess(optimized);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (
    dataUrl: string,
    onUploaded: (url: string) => void,
    onError?: () => void
  ) => {
    try {
      const image = await fetch(dataUrl).then((response) => response.blob());
      const formData = new FormData();
      formData.set("file", image, "upload.jpg");
      const response = await fetch("/api/media/", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error || "Image upload failed.");
      }

      onUploaded(result.url);
      showToast("Image uploaded to shared storage.");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Image upload failed.");
      onError?.();
    }
  };

  const openAddProject = () => {
    setEditingProject(null);
    setProjectImagePreview("/images/projects/total-wash-project.jpg");
    setIsAddingProject(true);
  };

  const openEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectImagePreview(proj.imagePath || "/images/projects/total-wash-project.jpg");
  };

  const openAddClient = () => {
    setEditingClient(null);
    setClientLogoPreview("/images/clients/shell-pakistan-logo.png");
    setIsAddingClient(true);
  };

  const openEditClient = (client: ClientItem) => {
    setEditingClient(client);
    setClientLogoPreview(client.logoUrl || "/images/clients/shell-pakistan-logo.png");
  };

  const openAddNews = () => {
    setEditingNews(null);
    setNewsImagePreview("");
    setIsAddingNews(true);
  };

  const openEditNews = (item: NewsItem) => {
    setIsAddingNews(false);
    setEditingNews(item);
    setNewsImagePreview(item.imagePath);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const saveHeroCopy = (
    page: HeroCarouselPage,
    badge: string,
    title: string,
    description: string
  ) => {
    switch (page) {
      case "home":
        updateHero({ badge, headline: title, description });
        break;
      case "about":
        updateAboutUs({ badge, title, subtitle: description });
        break;
      case "values":
        updateValuesIntro({ badge, title, subtitle: description });
        break;
      case "team":
        updateTeamIntro({ badge, title, subtitle: description });
        break;
      case "clients":
        updateClientsIntro({ badge, title, subtitle: description });
        break;
      case "services":
        updateServicesIntro({ badge, title, subtitle: description });
        break;
      case "projects":
        updateProjectsIntro({ badge, title, subtitle: description });
        break;
      case "careers":
        updateCareersIntro({ badge, title, subtitle: description });
        break;
      case "contact":
        updateContactIntro({ badge, title, subtitle: description });
        break;
      case "privacy":
        updatePrivacyPolicy({ badge, title, description });
        break;
    }
    showToast(`${HERO_EDITOR_LABELS[page]} hero updated.`);
  };

  const addHeroImage = (page: HeroCarouselPage, imageUrl: string) => {
    addPageHeroImage(page, imageUrl);
  };

  const deleteHeroImage = (page: HeroCarouselPage, index: number) => {
    deletePageHeroImage(page, index);
  };

  const renderPageHeroEditor = (
    page: HeroCarouselPage,
    showCopy = true
  ) => {
    const copy = getHeroEditorContent(content, page);
    return (
      <PageHeroEditor
        key={page}
        pageLabel={HERO_EDITOR_LABELS[page]}
        copy={copy}
        images={content.pageHeroImages[page]}
        showCopy={showCopy}
        onSaveCopy={(badge, title, description) =>
          saveHeroCopy(page, badge, title, description)
        }
        onAddImage={(imageUrl) => addHeroImage(page, imageUrl)}
        onDeleteImage={(index) => deleteHeroImage(page, index)}
        onUploadImage={(file, onUploaded, onError) =>
          handleImageFile(
            file,
            (dataUrl) => void uploadImage(dataUrl, onUploaded, onError),
            onError
          )
        }
      />
    );
  };

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session/", { cache: "no-store" })
      .then(async (response) => {
        const result = (await response.json()) as {
          authenticated?: boolean;
          error?: string;
        };
        if (!response.ok) throw new Error(result.error || "Admin session could not be checked.");
        if (active) setIsAuthenticated(result.authenticated === true);
      })
      .catch((error: unknown) => {
        if (active) {
          setAuthError(
            error instanceof Error ? error.message : "Admin session could not be checked."
          );
        }
      })
      .finally(() => {
        if (active) setAuthChecked(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError("");
    try {
      const response = await fetch("/api/admin/session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passcode }),
      });
      const result = (await response.json()) as {
        authenticated?: boolean;
        error?: string;
      };
      if (!response.ok) throw new Error(result.error || "Sign-in failed.");

      setIsAuthenticated(result.authenticated === true);
      setAuthError("");
      setPasscode("");
      setShowPassword(false);
      showToast("Signed in to TTB Management Console");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Sign-in failed.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/session/", { method: "DELETE" });
      if (!response.ok) throw new Error("Could not sign out. Please try again.");
      setIsAuthenticated(false);
      setPasscode("");
      setShowPassword(false);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Could not sign out.");
    }
  };

  if (!isHydrated || !authChecked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-black-40">Loading TTB Content Management System...</p>
        </div>
      </div>
    );
  }

  // 1. Lock Screen / Authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-black via-neutral-950 to-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative h-12 w-20 mx-auto mb-3">
              <Image
                src="/images/company/ttb-logo.png"
                alt="TTB Corporate Logo"
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              TTB Corporate Admin
            </h1>
            <p className="text-xs text-neutral-400">
              Content Management Portal • Edit Pages, Projects, Clients & Directory
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-passcode"
                className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2"
              >
                Access Password
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter administrator passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 pr-11 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {authError}
                </p>
              )}
              <p className="text-[11px] text-neutral-500 mt-2">
                Administrator password is configured in the server environment.
              </p>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-purple hover:bg-brand-purple/90 disabled:opacity-60 disabled:cursor-wait active:scale-[0.98] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-brand-purple/20 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>{isAuthenticating ? "Signing in..." : "Unlock Admin Panel"}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              &larr; Return to Live Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredProjects = content.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.client.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredClients = content.clients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.industry.toLowerCase().includes(clientSearch.toLowerCase())
  );
  const visibleToast = toastMessage ?? persistenceError;
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-100 flex flex-col">
      {/* Toast Notification */}
      {visibleToast && (
        <div className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6 z-50 bg-brand-purple text-white px-5 py-3 rounded-xl shadow-2xl flex items-center justify-center gap-2.5 text-center text-sm font-medium animate-fade-in border border-white/20 sm:max-w-md">
          <Check className="w-4 h-4 text-white shrink-0" />
          <span className="min-w-0">{visibleToast}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-neutral-800 px-3 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="relative h-9 w-14 shrink-0">
            <Image
              src="/images/company/ttb-logo.png"
              alt="TTB Logo"
              fill
              className="object-contain"
              sizes="60px"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap font-bold text-white text-sm sm:text-base">TTB Corporate CMS</span>
              <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                Live Admin
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-neutral-400">
              Universal Page Editor &amp; Data Synchronizer
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-brand-purple" />
            <span className="hidden sm:inline">View Public Site</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </Link>

          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors cursor-pointer"
            title="Download full content JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Backup JSON</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs text-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-black/50 border-b lg:border-b-0 lg:border-r border-neutral-800/80 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1 overflow-y-visible lg:overflow-y-auto lg:shrink-0">
          <div className="hidden lg:block text-[11px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-2">
            Page Editors
          </div>

          {[
            { id: "overview", label: "Dashboard", icon: Home, count: null },
            { id: "projects", label: "Projects Page", icon: FolderGit2, count: content.projects.length },
            { id: "clients", label: "Clients Page", icon: Building2, count: content.clients.length },
            { id: "contact", label: "Contact Us Page", icon: Phone, count: null },
            { id: "home", label: "Home & Hero", icon: Sparkles, count: null },
            { id: "about", label: "About Us & Profile", icon: Info, count: null },
            { id: "services", label: "Services Page", icon: Layers, count: content.services.length },
            { id: "values", label: "Our Values Page", icon: Award, count: content.values.length },
            { id: "careers", label: "Careers & Jobs", icon: Briefcase, count: content.careers.jobs.length },
            { id: "news", label: "News Page", icon: Newspaper, count: content.news.length },
            { id: "team", label: "Core Team", icon: Users, count: content.team?.length ?? 0 },
            { id: "privacy", label: "Privacy Policy", icon: ShieldCheck, count: null },
            { id: "backup", label: "Backup & Sync", icon: RotateCcw, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex min-w-0 items-center justify-between gap-2 px-2 sm:px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer text-left lg:whitespace-nowrap ${
                  active
                    ? "bg-brand-purple text-white font-semibold shadow-md shadow-brand-purple/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="min-w-0 leading-tight">{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      active ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Canvas */}
        <main className="min-w-0 flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW / DASHBOARD */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Website Content Management
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  Edit, add, or update any section across all pages of TTB Corporate. Any changes you make are instantly synchronized.
                </p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab("projects")}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-brand-purple hover:bg-neutral-900 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-neutral-400 group-hover:text-brand-purple mb-2">
                    <span className="text-xs uppercase font-mono">Projects</span>
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {content.projects.length}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Verified contracts</p>
                </div>

                <div
                  onClick={() => setActiveTab("clients")}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-brand-purple hover:bg-neutral-900 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-neutral-400 group-hover:text-brand-purple mb-2">
                    <span className="text-xs uppercase font-mono">Clients</span>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {content.clients.length}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Corporate partners</p>
                </div>

                <div
                  onClick={() => setActiveTab("services")}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-brand-purple hover:bg-neutral-900 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-neutral-400 group-hover:text-brand-purple mb-2">
                    <span className="text-xs uppercase font-mono">Services</span>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {content.services.length}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Core disciplines</p>
                </div>

                <div
                  onClick={() => setActiveTab("careers")}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-brand-purple hover:bg-neutral-900 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-neutral-400 group-hover:text-brand-purple mb-2">
                    <span className="text-xs uppercase font-mono">Jobs</span>
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {content.careers.jobs.length}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">Active job openings</p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-purple" />
                  Quick Page Editors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      openAddProject();
                      setActiveTab("projects");
                    }}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-brand-purple/50 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-brand-purple font-semibold text-sm mb-1">
                      <Plus className="w-4 h-4" /> Add New Project
                    </div>
                    <p className="text-xs text-neutral-400">
                      Add a completed contract with client name, scope bullets, and images.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      openAddClient();
                      setActiveTab("clients");
                    }}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-brand-purple/50 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-brand-purple font-semibold text-sm mb-1">
                      <Plus className="w-4 h-4" /> Add New Client
                    </div>
                    <p className="text-xs text-neutral-400">
                      Add a corporate client, partner logo asset, and industry sector.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("contact")}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-brand-purple/50 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-brand-purple font-semibold text-sm mb-1">
                      <Edit3 className="w-4 h-4" /> Update Contact Info
                    </div>
                    <p className="text-xs text-neutral-400">
                      Update official inboxes, branch offices, and working hours.
                    </p>
                  </button>
                </div>
              </div>

              {/* Status information */}
              <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      persistenceStatus === "error"
                        ? "bg-red-400"
                        : persistenceStatus === "saving" || persistenceStatus === "loading"
                          ? "bg-amber-400 animate-pulse"
                          : "bg-emerald-400"
                    }`}
                  />
                  <span>
                    Shared Supabase storage:{" "}
                    {persistenceStatus === "loading"
                      ? "Connecting..."
                      : persistenceStatus === "saving"
                        ? "Publishing changes..."
                        : persistenceStatus === "saved"
                          ? "Changes published"
                          : persistenceStatus === "error"
                            ? "Unavailable"
                            : "Connected"}
                  </span>
                </div>
                {content.lastUpdated && (
                  <span>Last Modified: {new Date(content.lastUpdated).toLocaleString()}</span>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PROJECTS PAGE EDITOR */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-6 h-6 text-brand-purple" />
                    <span>Projects Portfolio Manager</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage all {content.projects.length} completed infrastructure projects.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openAddProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                  <Link
                    href="/projects/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Page</span>
                  </Link>
                </div>
              </div>

              {renderPageHeroEditor("projects")}

              {/* Search filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search projects by title, client, or category..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              {/* Projects List */}
              <div className="space-y-3">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white tracking-tight truncate">
                          {proj.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-mono">
                          {proj.client}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                          {proj.year}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            Featured on Home
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">{proj.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditProject(proj)}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast(`Deleted project: ${proj.title}`);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12 text-neutral-500 text-xs">
                    No projects match your search query.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CLIENTS PAGE EDITOR */}
          {/* ========================================================= */}
          {activeTab === "clients" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-brand-purple" />
                    <span>Clients &amp; Partners Directory</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage corporate clients and logos displayed on the Clients page and homepage.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingClient(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Client</span>
                  </button>
                  <Link
                    href="/clients/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Page</span>
                  </Link>
                </div>
              </div>

              {renderPageHeroEditor("clients")}

              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search clients by name or industry..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              {/* Clients Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between gap-4 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="w-full h-24 bg-white rounded-xl p-2 flex items-center justify-center relative overflow-hidden border border-neutral-800">
                        {client.logoUrl ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={client.logoUrl}
                              alt={client.name}
                              fill
                              className="object-contain"
                              sizes="120px"
                            />
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-black font-mono">
                            {client.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{client.name}</h4>
                        <p className="text-[11px] text-brand-purple font-medium">{client.industry}</p>
                      </div>

                      {client.notes && (
                        <p className="text-xs text-neutral-400 line-clamp-2">{client.notes}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500">
                        {client.source}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditClient(client)}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Client"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete client "${client.name}"?`)) {
                              deleteClient(client.id);
                              showToast(`Deleted client: ${client.name}`);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                          title="Delete Client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: CONTACT US PAGE EDITOR */}
          {/* ========================================================= */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Mail className="w-6 h-6 text-brand-purple" />
                    <span>Contact Directory &amp; Branch Offices</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Update official inboxes, head office, and Islamabad branch details.
                  </p>
                </div>
                <Link
                  href="/contact-us/"
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Contact Page</span>
                </Link>
              </div>

              {renderPageHeroEditor("contact")}

              {/* Form for Contact Details */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const emailGeneral = (form.elements.namedItem("emailGeneral") as HTMLInputElement).value;
                  const postalAddress = (form.elements.namedItem("postalAddress") as HTMLInputElement).value;
                  const officeHoursNotice = (form.elements.namedItem("officeHoursNotice") as HTMLInputElement).value;
                  const peshawarStreet = (form.elements.namedItem("peshawarStreet") as HTMLInputElement).value;
                  const islamabadStreet = (form.elements.namedItem("islamabadStreet") as HTMLInputElement).value;
                  updateCompany({
                    phoneMobile: "",
                    phone: "",
                    phoneLandline: "",
                    fax: "",
                    emailGeneral,
                    email: emailGeneral,
                    emailDirector: emailGeneral,
                    postalAddress,
                    registeredOffice: {
                      ...content.company.registeredOffice,
                      street: peshawarStreet,
                      phone: "",
                    },
                    islamabadBranch: {
                      ...content.company.islamabadBranch,
                      street: islamabadStreet,
                      phone: "",
                    },
                  });

                  updateContactIntro({ officeHoursNotice });
                  updateContactConfig({
                    notificationEmail: emailGeneral,
                    directorEmail: emailGeneral,
                    supportPhone: "",
                  });

                  showToast("Contact information saved successfully!");
                }}
                className="space-y-6"
              >
                {/* 1. Official Communication Inboxes */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-purple" />
                    Official Inboxes
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        General Inquiry &amp; Tenders Email
                      </label>
                      <input
                        type="email"
                        name="emailGeneral"
                        defaultValue={content.company.emailGeneral}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Physical Offices */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-purple" />
                    Office Addresses
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Registered Head Office (Peshawar)
                      </label>
                      <input
                        type="text"
                        name="peshawarStreet"
                        defaultValue={content.company.registeredOffice.street}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Islamabad Branch Office
                      </label>
                      <input
                        type="text"
                        name="islamabadStreet"
                        defaultValue={content.company.islamabadBranch.street}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Postal Address
                      </label>
                      <input
                        type="text"
                        name="postalAddress"
                        defaultValue={content.company.postalAddress}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Office Hours & Email Delivery */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-purple" />
                    Office Hours &amp; Email Delivery
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Operating Hours &amp; Emergency Notice
                      </label>
                      <input
                        type="text"
                        name="officeHoursNotice"
                        defaultValue={content.contactIntro.officeHoursNotice}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>

                    <p className="text-xs text-neutral-400">
                      Website inquiries are emailed to info@ttb.org.pk through the configured cPanel mailbox.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact Details</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: HOME & HERO EDITOR */}
          {/* ========================================================= */}
          {activeTab === "home" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-brand-purple" />
                    <span>Home Page Hero &amp; Messaging</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Customize the main hero title, introduction paragraph, and CTA buttons on the homepage.
                  </p>
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Homepage</span>
                </Link>
              </div>

              {renderPageHeroEditor("home", false)}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const badge = (form.elements.namedItem("heroBadge") as HTMLInputElement).value;
                  const headline = (form.elements.namedItem("heroHeadline") as HTMLInputElement).value;
                  const description = (form.elements.namedItem("heroDescription") as HTMLTextAreaElement).value;
                  const primaryCtaText = (form.elements.namedItem("primaryCtaText") as HTMLInputElement).value;
                  const primaryCtaLink = (form.elements.namedItem("primaryCtaLink") as HTMLInputElement).value;
                  const secondaryCtaText = (form.elements.namedItem("secondaryCtaText") as HTMLInputElement).value;
                  const secondaryCtaLink = (form.elements.namedItem("secondaryCtaLink") as HTMLInputElement).value;

                  updateHero({
                    badge,
                    headline,
                    description,
                    primaryCtaText,
                    primaryCtaLink,
                    secondaryCtaText,
                    secondaryCtaLink,
                  });

                  showToast("Homepage Hero updated successfully!");
                }}
                className="space-y-5"
              >
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Top Tagline Badge
                    </label>
                    <input
                      type="text"
                      name="heroBadge"
                      defaultValue={content.hero.badge}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Main Hero Headline
                    </label>
                    <input
                      type="text"
                      name="heroHeadline"
                      defaultValue={content.hero.headline}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Hero Introduction Summary
                    </label>
                    <textarea
                      name="heroDescription"
                      rows={3}
                      defaultValue={content.hero.description}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        name="primaryCtaText"
                        defaultValue={content.hero.primaryCtaText}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Primary Button Destination Link
                      </label>
                      <input
                        type="text"
                        name="primaryCtaLink"
                        defaultValue={content.hero.primaryCtaLink}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        name="secondaryCtaText"
                        defaultValue={content.hero.secondaryCtaText}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Secondary Button Destination Link
                      </label>
                      <input
                        type="text"
                        name="secondaryCtaLink"
                        defaultValue={content.hero.secondaryCtaLink}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Homepage Hero</span>
                </button>
              </form>

              <section className="space-y-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Homepage Photo Carousel
                    </h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      Manage the separate photo carousel shown before the footer on the homepage.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-purple px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-purple/90">
                    <Upload className="h-4 w-4" />
                    <span>Upload Photos</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        event.target.value = "";
                        files.forEach((file) => {
                          handleImageFile(file, (dataUrl) => {
                            void uploadImage(dataUrl, addGalleryImage);
                          });
                        });
                      }}
                    />
                  </label>
                </div>

                {content.galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {content.galleryImages.map((imageUrl, index) => (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950"
                      >
                        <div className="relative aspect-video bg-neutral-900">
                          <Image
                            src={imageUrl}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-3 p-3">
                          <span className="text-xs text-neutral-400">
                            Image {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm("Remove this photo from the carousel?")) {
                                deleteGalleryImage(index);
                                showToast("Gallery photo removed.");
                              }
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/60 px-2.5 py-1.5 text-xs text-red-300 transition-colors hover:bg-red-950/50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-neutral-700 px-4 py-8 text-center text-xs text-neutral-400">
                    No homepage carousel photos yet. Upload images to show the carousel before the footer.
                  </p>
                )}
              </section>

              <form
                key={
                  isHydrated
                    ? content.lastUpdated ?? "content-ready"
                    : "content-loading"
                }
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  updateHsseStatistics({
                    exposureHours: (
                      form.elements.namedItem("exposureHours") as HTMLInputElement
                    ).valueAsNumber,
                    nmPi: (
                      form.elements.namedItem("nmPi") as HTMLInputElement
                    ).valueAsNumber,
                    training: (
                      form.elements.namedItem("training") as HTMLInputElement
                    ).valueAsNumber,
                    incidents: (
                      form.elements.namedItem("incidents") as HTMLInputElement
                    ).valueAsNumber,
                    recognitionAndReward: (
                      form.elements.namedItem(
                        "recognitionAndReward"
                      ) as HTMLInputElement
                    ).valueAsNumber,
                  });
                  showToast("HSSE statistics updated successfully!");
                }}
                className="space-y-5"
              >
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Monthly HSSE Statistics
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Update the numbers shown on the homepage. The heading automatically uses the previous month.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      {
                        name: "exposureHours",
                        label: "Exposure Hours",
                        value: content.hsseStatistics.exposureHours,
                      },
                      {
                        name: "nmPi",
                        label: "NM/PI",
                        value: content.hsseStatistics.nmPi,
                      },
                      {
                        name: "training",
                        label: "Training",
                        value: content.hsseStatistics.training,
                      },
                      {
                        name: "incidents",
                        label: "Incidents",
                        value: content.hsseStatistics.incidents,
                      },
                      {
                        name: "recognitionAndReward",
                        label: "R&R",
                        value: content.hsseStatistics.recognitionAndReward,
                      },
                    ].map((statistic) => (
                      <div key={statistic.name}>
                        <label
                          htmlFor={`hsse-${statistic.name}`}
                          className="block text-xs text-neutral-300 font-medium mb-1"
                        >
                          {statistic.label}
                        </label>
                        <input
                          id={`hsse-${statistic.name}`}
                          type="number"
                          name={statistic.name}
                          min="0"
                          step="any"
                          required
                          defaultValue={statistic.value}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save HSSE Statistics</span>
                </button>
              </form>

              <form
                key={
                  isHydrated
                    ? content.lastUpdated ?? "content-ready"
                    : "content-loading"
                }
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const rows = content.companyFactSheet.rows.map((_, index) => ({
                    label: (
                      form.elements.namedItem(
                        `factSheetLabel-${index}`
                      ) as HTMLInputElement
                    ).value,
                    value: (
                      form.elements.namedItem(
                        `factSheetValue-${index}`
                      ) as HTMLInputElement
                    ).value,
                  }));

                  updateCompanyFactSheet({
                    heading: (
                      form.elements.namedItem(
                        "factSheetHeading"
                      ) as HTMLInputElement
                    ).value,
                    badge: (
                      form.elements.namedItem(
                        "factSheetBadge"
                      ) as HTMLInputElement
                    ).value,
                    rows,
                    buttonText: (
                      form.elements.namedItem(
                        "factSheetButtonText"
                      ) as HTMLInputElement
                    ).value,
                    buttonLink: (
                      form.elements.namedItem(
                        "factSheetButtonLink"
                      ) as HTMLInputElement
                    ).value,
                  });
                  showToast("Company Fact Sheet updated successfully!");
                }}
                className="space-y-5"
              >
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Homepage Company Fact Sheet
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Edit the card title, badge, all table labels and values, and its contact button.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="factSheetHeading"
                        className="block text-xs text-neutral-300 font-medium mb-1"
                      >
                        Table Heading
                      </label>
                      <input
                        id="factSheetHeading"
                        type="text"
                        name="factSheetHeading"
                        required
                        defaultValue={content.companyFactSheet.heading}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="factSheetBadge"
                        className="block text-xs text-neutral-300 font-medium mb-1"
                      >
                        Badge Text
                      </label>
                      <input
                        id="factSheetBadge"
                        type="text"
                        name="factSheetBadge"
                        required
                        defaultValue={content.companyFactSheet.badge}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-neutral-300">
                      Fact Sheet Rows
                    </h4>
                    {content.companyFactSheet.rows.map((row, index) => (
                      <div
                        key={`fact-sheet-row-${index}`}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        <div>
                          <label
                            htmlFor={`factSheetLabel-${index}`}
                            className="block text-xs text-neutral-400 mb-1"
                          >
                            Row {index + 1} Label
                          </label>
                          <input
                            id={`factSheetLabel-${index}`}
                            type="text"
                            name={`factSheetLabel-${index}`}
                            required
                            defaultValue={row.label}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`factSheetValue-${index}`}
                            className="block text-xs text-neutral-400 mb-1"
                          >
                            Row {index + 1} Value
                          </label>
                          <input
                            id={`factSheetValue-${index}`}
                            type="text"
                            name={`factSheetValue-${index}`}
                            required
                            defaultValue={row.value}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="factSheetButtonText"
                        className="block text-xs text-neutral-300 font-medium mb-1"
                      >
                        Button Text
                      </label>
                      <input
                        id="factSheetButtonText"
                        type="text"
                        name="factSheetButtonText"
                        required
                        defaultValue={content.companyFactSheet.buttonText}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="factSheetButtonLink"
                        className="block text-xs text-neutral-300 font-medium mb-1"
                      >
                        Button Link
                      </label>
                      <input
                        id="factSheetButtonLink"
                        type="text"
                        name="factSheetButtonLink"
                        required
                        defaultValue={content.companyFactSheet.buttonLink}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Company Fact Sheet</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: ABOUT US & COMPANY PROFILE EDITOR */}
          {/* ========================================================= */}
          {activeTab === "about" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Info className="w-6 h-6 text-brand-purple" />
                    <span>About Us &amp; Corporate Identity</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Edit official enterprise profile, workforce size, proprietor name, and director quote.
                  </p>
                </div>
                <Link
                  href="/about-us/"
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View About Us</span>
                </Link>
              </div>

              {renderPageHeroEditor("about")}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = (form.elements.namedItem("companyName") as HTMLInputElement).value;
                  const proprietor = (form.elements.namedItem("proprietor") as HTMLInputElement).value;
                  const establishedDate = (form.elements.namedItem("establishedDate") as HTMLInputElement).value;
                  const workforce = (form.elements.namedItem("workforce") as HTMLInputElement).value;
                  const tagline = (form.elements.namedItem("tagline") as HTMLInputElement).value;
                  const directorName = (form.elements.namedItem("directorName") as HTMLInputElement).value;
                  const directorTitle = (form.elements.namedItem("directorTitle") as HTMLInputElement).value;

                  updateCompany({
                    name,
                    proprietor,
                    establishedDate,
                    workforce,
                    tagline,
                  });

                  updateAboutUs({
                    directorName,
                    directorTitle,
                  });

                  showToast("Company Profile updated!");
                }}
                className="space-y-5"
              >
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-purple" />
                    Corporate Registration
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        defaultValue={content.company.name}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Proprietor &amp; Managing Director
                      </label>
                      <input
                        type="text"
                        name="proprietor"
                        defaultValue={content.company.proprietor}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Established Date
                      </label>
                      <input
                        type="text"
                        name="establishedDate"
                        defaultValue={content.company.establishedDate}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Workforce Size
                      </label>
                      <input
                        type="text"
                        name="workforce"
                        defaultValue={content.company.workforce}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Corporate Tagline
                      </label>
                      <input
                        type="text"
                        name="tagline"
                        defaultValue={content.company.tagline}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                </div>

                {/* Director message fields */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-purple" />
                    Director Attributions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Director Name
                      </label>
                      <input
                        type="text"
                        name="directorName"
                        defaultValue={content.aboutUs.directorName}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Director Official Title
                      </label>
                      <input
                        type="text"
                        name="directorTitle"
                        defaultValue={content.aboutUs.directorTitle}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Corporate Details</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: SERVICES PAGE EDITOR */}
          {/* ========================================================= */}
          {activeTab === "services" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-brand-purple" />
                    <span>Services &amp; Capabilities</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage service portfolios, letters (A, B, C...), summaries, and capabilities lists.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingService(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                  <Link
                    href="/services/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Services</span>
                  </Link>
                </div>
              </div>

              {renderPageHeroEditor("services")}

              <div className="space-y-4">
                {content.services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-brand-purple text-white text-xs font-bold flex items-center justify-center">
                          {svc.letter || "•"}
                        </span>
                        <h4 className="text-base font-bold text-white tracking-tight">{svc.title}</h4>
                      </div>
                      <p className="text-xs text-neutral-400">{svc.summary}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {svc.capabilities.slice(0, 3).map((cap, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded"
                          >
                            ✓ {cap}
                          </span>
                        ))}
                        {svc.capabilities.length > 3 && (
                          <span className="text-[10px] text-neutral-500 self-center">
                            +{svc.capabilities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingService(svc)}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete service "${svc.title}"?`)) {
                            deleteService(svc.id);
                            showToast(`Deleted service: ${svc.title}`);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: OUR VALUES PAGE EDITOR */}
          {/* ========================================================= */}
          {activeTab === "values" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Award className="w-6 h-6 text-brand-purple" />
                    <span>Our Values &amp; Principles</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage the foundational operating values of T &amp; T Brothers.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingValue(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Value</span>
                  </button>
                  <Link
                    href="/our-values/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Values</span>
                  </Link>
                </div>
              </div>

              {renderPageHeroEditor("values")}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.values.map((val) => (
                  <div
                    key={val.id}
                    className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between gap-4 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white tracking-tight">{val.title}</h4>
                        <span className="text-xs text-brand-purple font-mono">{val.iconName}</span>
                      </div>
                      <p className="text-xs text-neutral-300 font-medium">{val.shortDescription}</p>
                      <p className="text-xs text-neutral-400 line-clamp-3">{val.fullDescription}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingValue(val)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Value"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete value "${val.title}"?`)) {
                            deleteValue(val.id);
                            showToast(`Deleted value: ${val.title}`);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                        title="Delete Value"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <section className="space-y-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Our Values Photo Carousel
                    </h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      Manage images shown before the footer on the Our Values page. These are separate from the homepage carousel.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-purple px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-purple/90">
                    <Upload className="h-4 w-4" />
                    <span>Upload Photos</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        const files = Array.from(event.target.files ?? []);
                        event.target.value = "";
                        files.forEach((file) => {
                          handleImageFile(file, (dataUrl) => {
                            void uploadImage(dataUrl, addValuesGalleryImage);
                          });
                        });
                      }}
                    />
                  </label>
                </div>

                {content.valuesGalleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {content.valuesGalleryImages.map((imageUrl, index) => (
                      <div
                        key={`${imageUrl}-${index}`}
                        className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950"
                      >
                        <div className="relative aspect-video bg-neutral-900">
                          <Image
                            src={imageUrl}
                            alt={`Our Values gallery image ${index + 1}`}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-3 p-3">
                          <span className="text-xs text-neutral-400">
                            Image {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm("Remove this photo from the Our Values carousel?")) {
                                deleteValuesGalleryImage(index);
                                showToast("Our Values carousel photo removed.");
                              }
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/60 px-2.5 py-1.5 text-xs text-red-300 transition-colors hover:bg-red-950/50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-neutral-700 px-4 py-8 text-center text-xs text-neutral-400">
                    No Our Values carousel photos yet. Upload one or more images to display the carousel on the Our Values page.
                  </p>
                )}
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 9: CAREERS & VACANCIES EDITOR */}
          {/* ========================================================= */}
          {activeTab === "careers" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-brand-purple" />
                    <span>Careers &amp; Job Vacancies</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Post active vacancies or update talent inquiry pipeline requirements.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingJob(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Post New Vacancy</span>
                  </button>
                  <Link
                    href="/careers/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Careers</span>
                  </Link>
                </div>
              </div>

              {renderPageHeroEditor("careers")}

              {content.careers.jobs.length === 0 ? (
                <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 text-center space-y-3">
                  <Briefcase className="w-8 h-8 text-neutral-500 mx-auto" />
                  <h4 className="text-sm font-bold text-white">No custom vacancies currently published</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    The careers page currently shows the default General Talent Inquiries registry. Click &quot;Post New Vacancy&quot; above to publish an active job listing!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {content.careers.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-white">{job.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-mono">
                            {job.department}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                            {job.type}
                          </span>
                          <span className="text-[10px] text-neutral-400">📍 {job.location}</span>
                        </div>
                        <p className="text-xs text-neutral-400">{job.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEditingJob(job)}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete vacancy "${job.title}"?`)) {
                              deleteJob(job.id);
                              showToast(`Deleted vacancy: ${job.title}`);
                            }
                          }}
                          className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "news" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-brand-purple" />
                    <span>News &amp; Updates</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Publish news, events, and other stories. Newest posts appear first, with 12 stories per page.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openAddNews}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add News</span>
                  </button>
                  <Link
                    href="/news/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View News</span>
                  </Link>
                </div>
              </div>

              <form
                key={`${content.newsHero.title}-${content.lastUpdated ?? ""}`}
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const badge = String(formData.get("newsHeroBadge") || "").trim();
                  const title = String(formData.get("newsHeroTitle") || "").trim();
                  const description = String(formData.get("newsHeroDescription") || "").trim();
                  updateNewsHero({
                    badge,
                    title,
                    description,
                    images: newsHeroImagesDraft ?? content.newsHero.images,
                  });
                  setNewsHeroImagesDraft(null);
                  setNewsHeroImageUrl("");
                  showToast("News hero and carousel settings saved.");
                }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4"
              >
                <div>
                  <h3 className="text-sm font-bold text-white">News Hero Settings</h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Set the hero text and manage its rotating background images separately from news posts.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-neutral-300">
                    Hero badge
                    <input
                      name="newsHeroBadge"
                      defaultValue={content.newsHero.badge}
                      className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Hero headline
                    <input
                      name="newsHeroTitle"
                      defaultValue={content.newsHero.title}
                      required
                      className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300">
                    Hero description
                    <textarea
                      name="newsHeroDescription"
                      defaultValue={content.newsHero.description}
                      rows={2}
                      required
                      className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
                    />
                  </label>
                  <label className="block text-xs font-medium text-neutral-300 sm:col-span-2">
                    Add image by URL
                    <input
                      type="url"
                      value={newsHeroImageUrl}
                      onChange={(event) => setNewsHeroImageUrl(event.currentTarget.value)}
                      placeholder="https://... (optional)"
                      className="mt-1 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-purple focus:outline-none"
                    />
                    <span className="mt-1 block text-[10px] text-neutral-500">
                      You can also upload several photos at once below.
                    </span>
                  </label>
                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="button"
                      disabled={!newsHeroImageUrl.trim()}
                      onClick={() => {
                        const imageUrl = newsHeroImageUrl.trim();
                        setNewsHeroImagesDraft((images) => [
                          ...(images ?? content.newsHero.images),
                          imageUrl,
                        ]);
                        setNewsHeroImageUrl("");
                      }}
                      className="rounded-xl bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Add image URL
                    </button>
                  </div>
                  <label className="block text-xs font-medium text-neutral-300 sm:col-span-2">
                    Upload hero carousel images
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={(event) => {
                        const files = Array.from(event.currentTarget.files ?? []);
                        event.currentTarget.value = "";
                        if (files.length === 0) return;
                        setNewsHeroUploadsInProgress((count) => count + files.length);
                        files.forEach((file) => {
                          const finishUpload = () =>
                            setNewsHeroUploadsInProgress((count) => Math.max(0, count - 1));
                          handleImageFile(
                            file,
                            (dataUrl) => {
                              void uploadImage(
                                dataUrl,
                                (imageUrl) => {
                                  setNewsHeroImagesDraft((images) => [
                                    ...(images ?? content.newsHero.images),
                                    imageUrl,
                                  ]);
                                  finishUpload();
                                },
                                finishUpload
                              );
                            },
                            finishUpload
                          );
                        });
                      }}
                      className="mt-1 block w-full text-xs text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-neutral-700"
                    />
                    <span className="mt-1 block text-[10px] text-neutral-500">
                      Select multiple JPEG, PNG, or WebP images. They will rotate in the hero slideshow.
                    </span>
                  </label>
                </div>
                {(() => {
                  const heroImages = newsHeroImagesDraft ?? content.newsHero.images;
                  return heroImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {heroImages.map((imageUrl, index) => (
                        <div
                          key={`${imageUrl}-${index}`}
                          className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950"
                        >
                          <div className="relative aspect-video bg-neutral-900">
                            <Image
                              src={imageUrl}
                              alt={`News hero slide ${index + 1}`}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, 33vw"
                            />
                          </div>
                          <div className="flex items-center justify-between gap-2 p-2.5">
                            <span className="text-[10px] text-neutral-400">
                              Slide {index + 1}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove hero slide ${index + 1}`}
                              onClick={() =>
                                setNewsHeroImagesDraft(
                                  heroImages.filter((_, imageIndex) => imageIndex !== index)
                                )
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-red-900/60 px-2 py-1 text-[10px] text-red-300 transition-colors hover:bg-red-950/50"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-xl border border-dashed border-neutral-700 px-4 py-8 text-center text-xs text-neutral-400">
                      No hero images yet. Upload multiple images to create a rotating hero carousel.
                    </p>
                  );
                })()}
                {newsHeroUploadsInProgress > 0 && (
                  <p className="text-xs text-brand-purple">
                    Uploading {newsHeroUploadsInProgress}{" "}
                    {newsHeroUploadsInProgress === 1 ? "image" : "images"}...
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={newsHeroUploadsInProgress > 0}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-purple px-4 py-2 text-xs font-semibold text-white hover:bg-brand-purple/90"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save Hero Carousel
                  </button>
                </div>
              </form>

              <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Featured News Carousel</h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Select which published stories appear in the carousel. Adding news does not change this selection.
                  </p>
                </div>
                {content.news.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-neutral-700 px-4 py-6 text-center text-xs text-neutral-400">
                    Add a news item first, then select it here for the carousel.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {content.news.map((item) => {
                      const selected = content.newsCarouselIds.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-950/70 p-3 hover:border-neutral-700"
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={(event) => {
                              const nextIds = event.currentTarget.checked
                                ? [...content.newsCarouselIds, item.id]
                                : content.newsCarouselIds.filter((id) => id !== item.id);
                              updateNewsCarousel(nextIds);
                              showToast(
                                event.currentTarget.checked
                                  ? `Added "${item.title}" to the carousel.`
                                  : `Removed "${item.title}" from the carousel.`
                              );
                            }}
                            className="mt-0.5 h-4 w-4 accent-brand-purple"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-semibold text-white">{item.title}</span>
                            <span className="mt-1 block text-[10px] text-neutral-500">
                              {item.category} · {item.publishedAt}
                            </span>
                          </span>
                          {selected && (
                            <span className="text-[10px] font-semibold text-brand-purple">In carousel</span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </section>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  updateNewsIntro({
                    title: String(formData.get("newsIntroTitle") || "").trim(),
                    description: String(formData.get("newsIntroDescription") || "").trim(),
                  });
                  showToast("Updated the News page heading and description.");
                }}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4"
              >
                <h3 className="text-sm font-bold text-white">News page heading</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs text-neutral-300 font-medium">
                    Heading
                    <input
                      name="newsIntroTitle"
                      defaultValue={content.newsIntro.title}
                      required
                      className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </label>
                  <label className="block text-xs text-neutral-300 font-medium">
                    Description
                    <textarea
                      name="newsIntroDescription"
                      defaultValue={content.newsIntro.description}
                      rows={2}
                      required
                      className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Heading
                  </button>
                </div>
              </form>

              {content.news.length === 0 ? (
                <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 text-center space-y-3">
                  <Newspaper className="w-8 h-8 text-neutral-500 mx-auto" />
                  <h4 className="text-sm font-bold text-white">No news published yet</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Add a story to publish it on the News page. Choose a label such as News, Event, or Announcement.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...content.news]
                    .sort((a, b) => {
                      const dateDifference =
                        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                      return dateDifference || (b.createdAt || "").localeCompare(a.createdAt || "");
                    })
                    .map((item) => (
                      <article
                        key={item.id}
                        className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center gap-4"
                      >
                        <div className="relative w-full sm:w-28 aspect-[4/3] shrink-0 rounded-lg overflow-hidden bg-neutral-800">
                          {item.imagePath ? (
                            <Image
                              src={item.imagePath}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="112px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-semibold">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {item.publishedAt}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white">{item.title}</h3>
                          <p className="text-xs text-neutral-400 line-clamp-2">{item.summary}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => openEditNews(item)}
                            aria-label={`Edit ${item.title}`}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete news item "${item.title}"?`)) {
                                deleteNewsItem(item.id);
                                showToast(`Deleted news item: ${item.title}`);
                              }
                            }}
                            aria-label={`Delete ${item.title}`}
                            className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </article>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: CORE TEAM */}
          {/* ========================================================= */}
          {activeTab === "team" && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-brand-purple" />
                    <span>Core Team Members</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Add, edit, or remove team members shown on the Core Team page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTeamMember(null);
                    setTeamImagePreview("");
                    setIsAddingTeamMember(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </button>
              </div>

              {renderPageHeroEditor("team")}

              {/* Member grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(content.team ?? [])
                  .slice()
                  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
                  .map((member) => (
                    <div
                      key={member.id}
                      className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col group"
                    >
                      {/* Photo */}
                      <div className="relative w-full aspect-square bg-neutral-800 overflow-hidden">
                        {member.imagePath ? (
                          <Image
                            src={member.imagePath}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <User className="w-12 h-12 text-neutral-600" />
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="p-3 flex flex-col gap-0.5 flex-1">
                        <p className="text-xs font-bold text-white leading-tight">{member.name}</p>
                        <p className="text-[10px] text-neutral-400">{member.designation}</p>
                      </div>
                      {/* Actions */}
                      <div className="px-3 pb-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTeamMember({ ...member });
                            setTeamImagePreview(member.imagePath || "");
                            setIsAddingTeamMember(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-brand-purple/20 hover:text-brand-purple text-neutral-400 text-[10px] font-medium transition-colors"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete "${member.name}"?`)) {
                              deleteTeamMember(member.id);
                              showToast("Team member deleted.");
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 hover:text-red-400 text-neutral-400 text-[10px] font-medium transition-colors"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {(content.team ?? []).length === 0 && (
                <div className="text-center py-16 text-neutral-500 border border-dashed border-neutral-800 rounded-2xl">
                  <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No team members yet. Click &ldquo;Add Member&rdquo; to get started.</p>
                </div>
              )}

              {/* Add / Edit Modal */}
              {isAddingTeamMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                  <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md shadow-2xl">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
                      <h3 className="text-base font-bold text-white">
                        {editingTeamMember ? "Edit Team Member" : "Add Team Member"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingTeamMember(false);
                          setEditingTeamMember(null);
                          setTeamImagePreview("");
                        }}
                        className="text-neutral-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form
                      className="p-6 space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const name = (fd.get("name") as string).trim();
                        const designation = (fd.get("designation") as string).trim();
                        const order = parseInt((fd.get("order") as string) || "99", 10);
                        const imagePath = teamImagePreview || editingTeamMember?.imagePath || "";

                        if (!name || !designation) {
                          alert("Name and Designation are required.");
                          return;
                        }

                        if (editingTeamMember) {
                          updateTeamMember(editingTeamMember.id, {
                            name,
                            designation,
                            imagePath,
                            order,
                          });
                          showToast("Team member updated!");
                        } else {
                          addTeamMember({
                            id: `team-${Date.now()}`,
                            name,
                            designation,
                            imagePath,
                            order,
                          });
                          showToast("Team member added!");
                        }

                        setIsAddingTeamMember(false);
                        setEditingTeamMember(null);
                        setTeamImagePreview("");
                      }}
                    >
                      {/* Photo Upload */}
                      <div>
                        <label className="block text-xs text-neutral-300 font-medium mb-2">
                          Photo
                        </label>
                        <div className="flex items-start gap-4">
                          {/* Preview */}
                          <div className="w-20 h-20 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0 relative">
                            {(teamImagePreview || editingTeamMember?.imagePath) ? (
                              <Image
                                src={teamImagePreview || editingTeamMember?.imagePath || ""}
                                alt="Preview"
                                fill
                                className="object-cover object-top"
                                unoptimized
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <User className="w-8 h-8 text-neutral-600" />
                              </div>
                            )}
                          </div>
                          {/* Upload controls */}
                          <div className="flex-1 space-y-2">
                            <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 cursor-pointer transition-colors border border-neutral-700">
                              <Camera className="w-3.5 h-3.5" />
                              Upload from device
                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(ev) => {
                                  const file = ev.target.files?.[0];
                                  if (file) {
                                    handleImageFile(file, (dataUrl) =>
                                      void uploadImage(dataUrl, setTeamImagePreview)
                                    );
                                  }
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              placeholder="Or paste image URL"
                              defaultValue={editingTeamMember?.imagePath || ""}
                              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-purple"
                              onChange={(e) => {
                                if (e.target.value) setTeamImagePreview(e.target.value);
                              }}
                            />
                            {(teamImagePreview || editingTeamMember?.imagePath) && (
                              <button
                                type="button"
                                onClick={() => {
                                  setTeamImagePreview("");
                                  if (editingTeamMember) {
                                    setEditingTeamMember({ ...editingTeamMember, imagePath: "" });
                                  }
                                }}
                                className="text-[10px] text-red-400 hover:text-red-300"
                              >
                                Remove photo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-xs text-neutral-300 font-medium mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={editingTeamMember?.name || ""}
                          placeholder="e.g. Touqeer Irshad"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                          required
                        />
                      </div>

                      {/* Designation */}
                      <div>
                        <label className="block text-xs text-neutral-300 font-medium mb-1">
                          Designation *
                        </label>
                        <input
                          type="text"
                          name="designation"
                          defaultValue={editingTeamMember?.designation || ""}
                          placeholder="e.g. Director"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                          required
                        />
                      </div>

                      {/* Display Order */}
                      <div>
                        <label className="block text-xs text-neutral-300 font-medium mb-1">
                          Display Order
                        </label>
                        <input
                          type="number"
                          name="order"
                          defaultValue={editingTeamMember?.order ?? (content.team?.length ?? 0) + 1}
                          min={1}
                          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingTeamMember(false);
                            setEditingTeamMember(null);
                            setTeamImagePreview("");
                          }}
                          className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                        >
                          {editingTeamMember ? "Save Changes" : "Add Member"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-brand-purple" />
                    <span>Privacy Policy</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Edit the public-facing policy title, sections, and revision note.
                    Use {"{{companyName}}"} or {"{{companyEmail}}"} in policy text
                    to insert the current company details.
                  </p>
                </div>
                <Link
                  href="/privacy-policy/"
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs transition-colors self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Privacy Policy</span>
                </Link>
              </div>

              {renderPageHeroEditor("privacy", false)}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const value = (name: string) => String(formData.get(name) ?? "");
                  const policy = content.privacyPolicy;

                  updatePrivacyPolicy({
                    badge: value("privacyBadge"),
                    title: value("privacyTitle"),
                    description: value("privacyDescription"),
                    disclaimerTitle: value("privacyDisclaimerTitle"),
                    disclaimerText: value("privacyDisclaimerText"),
                    lastUpdated: value("privacyLastUpdated"),
                    sections: policy.sections.map((section, index) => ({
                      heading: value(`privacyHeading${index}`),
                      paragraphs: splitParagraphs(value(`privacyParagraphs${index}`)),
                      bulletItems: splitNonEmptyLines(value(`privacyBullets${index}`)),
                    })),
                  });
                  showToast("Privacy Policy updated successfully!");
                }}
                className="space-y-5"
              >
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Page Header &amp; Disclaimer
                  </h3>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Header Badge
                    </label>
                    <input
                      name="privacyBadge"
                      defaultValue={content.privacyPolicy.badge}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Page Title
                    </label>
                    <input
                      name="privacyTitle"
                      defaultValue={content.privacyPolicy.title}
                      required
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Introductory Description
                    </label>
                    <textarea
                      name="privacyDescription"
                      rows={2}
                      defaultValue={content.privacyPolicy.description}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Disclaimer Heading
                    </label>
                    <input
                      name="privacyDisclaimerTitle"
                      defaultValue={content.privacyPolicy.disclaimerTitle}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Disclaimer Text
                    </label>
                    <textarea
                      name="privacyDisclaimerText"
                      rows={3}
                      defaultValue={content.privacyPolicy.disclaimerText}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>

                {content.privacyPolicy.sections.map((section, index) => (
                  <div
                    key={`privacy-section-${index}`}
                    className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Policy Section {index + 1}
                    </h3>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Section Heading
                      </label>
                      <input
                        name={`privacyHeading${index}`}
                        defaultValue={section.heading}
                        required
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Paragraphs (separate paragraphs with a blank line)
                      </label>
                      <textarea
                        name={`privacyParagraphs${index}`}
                        rows={5}
                        defaultValue={section.paragraphs.join("\n\n")}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Optional Bullet Points (one per line)
                      </label>
                      <textarea
                        name={`privacyBullets${index}`}
                        rows={3}
                        defaultValue={(section.bulletItems ?? []).join("\n")}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                      />
                    </div>
                  </div>
                ))}

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <label className="block text-xs text-neutral-300 font-medium">
                    Last Updated / Revision Note
                    <input
                      name="privacyLastUpdated"
                      defaultValue={content.privacyPolicy.lastUpdated}
                      className="mt-1 w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Privacy Policy</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 11: BACKUP, EXPORT & FACTORY RESET */}
          {/* ========================================================= */}
          {activeTab === "backup" && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-neutral-800">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <RotateCcw className="w-6 h-6 text-brand-purple" />
                  <span>Backup, Export &amp; Factory Reset</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Keep backups of your customized site content, transfer data between devices, or restore defaults.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <Download className="w-5 h-5" />
                    <h3 className="text-base font-bold text-white">Export Content Backup</h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Downloads a complete JSON snapshot of all projects, clients, contacts, services, and profile texts onto your computer.
                  </p>
                  <button
                    type="button"
                    onClick={exportJson}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <div className="flex items-center gap-2.5 text-brand-purple">
                    <Upload className="w-5 h-5" />
                    <h3 className="text-base font-bold text-white">Import Content Backup</h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Restore a JSON backup and publish its content to every visitor. Embedded images are uploaded to shared storage.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer">
                    <Upload className="w-4 h-4 text-brand-purple" />
                    <span>Select JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const text = ev.target?.result as string;
                            void importJson(text).then((ok) => {
                              if (ok) {
                                showToast("Content backup imported successfully!");
                              } else {
                                alert("Invalid JSON file. Please provide a valid TTB backup JSON.");
                              }
                            });
                          };
                          reader.onerror = () => showToast("Could not read the backup file.");
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4 sm:col-span-2">
                  <div className="flex items-center gap-2.5 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="text-base font-bold text-white">Reset to Original Corporate Defaults</h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Replace the published site content with the original 1988 corporate profile data (22 original projects, 9 verified corporate clients, and initial contact directory).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to reset everything back to the original company profile defaults? Any unsaved edits will be removed."
                        )
                      ) {
                        resetToDefaults();
                        showToast("Reset to factory defaults successfully!");
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-950 hover:bg-red-900 border border-red-700 text-red-100 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Content to Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ========================================================= */}
      {(isAddingProject || editingProject) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-brand-purple" />
                <span>{editingProject ? "Edit Project" : "Add New Project"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingProject(false);
                  setEditingProject(null);
                }}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem("title") as HTMLInputElement).value;
                const client = (form.elements.namedItem("client") as HTMLInputElement).value;
                const year = (form.elements.namedItem("year") as HTMLInputElement).value;
                const category = (form.elements.namedItem("category") as HTMLSelectElement).value as ProjectItem["category"];
                const summary = (form.elements.namedItem("summary") as HTMLInputElement).value;
                const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
                const imagePathInput = (form.elements.namedItem("imagePath") as HTMLInputElement)?.value;
                const finalImagePath = projectImagePreview || imagePathInput || "/images/projects/total-wash-project.jpg";
                const deliverablesText = (form.elements.namedItem("deliverables") as HTMLTextAreaElement).value;
                const featured = (form.elements.namedItem("featured") as HTMLInputElement).checked;

                const deliverables = deliverablesText
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean);

                if (editingProject) {
                  updateProject(editingProject.id, {
                    title,
                    client,
                    year,
                    category,
                    summary,
                    description,
                    imagePath: finalImagePath,
                    deliverables,
                    featured,
                  });
                  showToast(`Updated project: ${title}`);
                } else {
                  const newProj: ProjectItem = {
                    id: `project-${Date.now()}`,
                    title,
                    client,
                    year,
                    category,
                    summary,
                    description,
                    status: "Completed",
                    imagePath: finalImagePath,
                    deliverables,
                    featured,
                  };
                  addProject(newProj);
                  showToast(`Added project: ${title}`);
                }

                setIsAddingProject(false);
                setEditingProject(null);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingProject?.title || ""}
                    placeholder="e.g. Metro Cash & Carry Auto Wash"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="client"
                    defaultValue={editingProject?.client || "Total Parco"}
                    placeholder="e.g. Total Parco, Shell Pakistan, PSO"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Completion Year *
                  </label>
                  <input
                    type="text"
                    name="year"
                    defaultValue={editingProject?.year || "2024"}
                    placeholder="e.g. 2024, 2023, 2022"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProject?.category || "Retail Shops & Auto Wash"}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  >
                    <option value="Retail Shops & Auto Wash">Retail Shops &amp; Auto Wash</option>
                    <option value="Filling Stations & KDR">Filling Stations &amp; KDR</option>
                    <option value="Civil & Construction">Civil &amp; Construction</option>
                    <option value="Electrical & Mechanical">Electrical &amp; Mechanical</option>
                  </select>
                </div>

                {/* Project Image: Upload from Device + Presets + Preview */}
                <div className="sm:col-span-2 space-y-2 bg-neutral-950/80 p-3.5 rounded-xl border border-neutral-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-neutral-200 font-semibold flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-brand-purple" />
                      <span>Project Photograph</span>
                    </label>
                    <span className="text-[11px] text-neutral-400">
                      Upload from phone/PC or select photo
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* Live Preview */}
                    <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700 flex-shrink-0">
                      {projectImagePreview ? (
                        <Image
                          src={projectImagePreview}
                          alt="Project Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 text-[10px]">
                          <Camera className="w-5 h-5 mb-1" />
                          <span>No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-purple hover:bg-brand-purple/90 active:scale-[0.98] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload from Device</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageFile(file, (dataUrl) => {
                                  void uploadImage(dataUrl, setProjectImagePreview);
                                });
                              }
                            }}
                          />
                        </label>

                        <select
                          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-brand-purple"
                          onChange={(e) => {
                            if (e.target.value) {
                              setProjectImagePreview(e.target.value);
                            }
                          }}
                          value={
                            projectImagePreview.startsWith("data:")
                              ? "uploaded"
                              : projectImagePreview
                          }
                        >
                          {projectImagePreview.startsWith("data:") && (
                            <option value="uploaded">Uploaded File from Device (Selected)</option>
                          )}
                          <option value="/images/projects/total-wash-project.jpg">Preset: Total Wash Automated Bay</option>
                          <option value="/images/projects/shell-retail-project.jpg">Preset: Shell Retail Station</option>
                          <option value="/images/projects/pso-commercial-project.jpg">Preset: PSO Commercial Fueling</option>
                          <option value="/images/projects/retail-shop-project.jpg">Preset: Modern Retail Convenience</option>
                          <option value="/images/projects/canopy-structure-project.jpg">Preset: Canopy &amp; Steel Structure</option>
                          <option value="/images/projects/electrical-switchgear-project.jpg">Preset: Electrical Switchgear</option>
                        </select>
                      </div>

                      <input
                        type="text"
                        name="imagePath"
                        value={projectImagePreview}
                        onChange={(e) => setProjectImagePreview(e.target.value)}
                        placeholder="Or enter image URL or path (/images/projects/...)"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-[11px] text-neutral-300 focus:outline-none focus:border-brand-purple font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Short Summary *
                  </label>
                  <input
                    type="text"
                    name="summary"
                    defaultValue={editingProject?.summary || ""}
                    placeholder="One-line summary of facility and works delivered"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Full Project Scope Description *
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingProject?.description || ""}
                    placeholder="Comprehensive civil, mechanical, and electrical turnkey delivery description..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Deliverables / Scope Bullet Points (one per line)
                  </label>
                  <textarea
                    name="deliverables"
                    rows={4}
                    defaultValue={editingProject?.deliverables?.join("\n") || "Turnkey facility construction\nEquipment assembly & commissioning\nSpecialized electrical switchgear\nBrand illumination & canopy fit-out"}
                    placeholder="Scope item 1&#10;Scope item 2&#10;Scope item 3"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-mono"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    defaultChecked={editingProject?.featured || false}
                    className="w-4 h-4 accent-brand-purple rounded"
                  />
                  <label htmlFor="featured" className="text-xs text-neutral-200">
                    Feature on Homepage Projects section
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProject(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT CLIENT */}
      {/* ========================================================= */}
      {(isAddingClient || editingClient) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-purple" />
                <span>{editingClient ? "Edit Client" : "Add New Client"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingClient(false);
                  setEditingClient(null);
                }}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("clientName") as HTMLInputElement).value;
                const industry = (form.elements.namedItem("industry") as HTMLInputElement).value;
                const logoUrlInput = (form.elements.namedItem("logoUrl") as HTMLInputElement).value;
                const finalLogoUrl = clientLogoPreview || logoUrlInput || "/images/clients/shell-pakistan-logo.png";
                const notes = (form.elements.namedItem("notes") as HTMLTextAreaElement).value;

                if (editingClient) {
                  updateClient(editingClient.id, {
                    name,
                    industry,
                    logoUrl: finalLogoUrl,
                    notes,
                  });
                  showToast(`Updated client: ${name}`);
                } else {
                  const newClient: ClientItem = {
                    id: `client-${Date.now()}`,
                    name,
                    industry,
                    source: "Profile Client",
                    confirmedInProfile: true,
                    logoUrl: finalLogoUrl,
                    notes,
                  };
                  addClient(newClient);
                  showToast(`Added client: ${name}`);
                }

                setIsAddingClient(false);
                setEditingClient(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Client / Organization Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  defaultValue={editingClient?.name || ""}
                  placeholder="e.g. Shell Pakistan Limited"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Industry / Sector *
                </label>
                <input
                  type="text"
                  name="industry"
                  defaultValue={editingClient?.industry || "Petroleum Downstream & Energy"}
                  placeholder="e.g. Petroleum Downstream & Energy"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              {/* Client Logo: Upload from Device + Presets + Preview */}
              <div className="space-y-2 bg-neutral-950/80 p-3.5 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-neutral-200 font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-brand-purple" />
                    <span>Client Brand Logo</span>
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    Upload PNG, JPEG, or WebP logo from device
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {/* Live Preview on crisp white badge */}
                  <div className="relative w-full sm:w-28 h-20 rounded-lg overflow-hidden bg-white border border-neutral-700 flex-shrink-0 p-2 flex items-center justify-center">
                    {clientLogoPreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={clientLogoPreview}
                          alt="Logo Preview"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <span className="text-neutral-400 text-[10px]">No Logo</span>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-purple hover:bg-brand-purple/90 active:scale-[0.98] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Logo from Device</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageFile(file, (dataUrl) => {
                                void uploadImage(dataUrl, setClientLogoPreview);
                              });
                            }
                          }}
                        />
                      </label>

                      <select
                        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-brand-purple"
                        onChange={(e) => {
                          if (e.target.value) {
                            setClientLogoPreview(e.target.value);
                          }
                        }}
                        value={
                          clientLogoPreview.startsWith("data:")
                            ? "uploaded"
                            : clientLogoPreview
                        }
                      >
                        {clientLogoPreview.startsWith("data:") && (
                          <option value="uploaded">Uploaded Logo from Device (Selected)</option>
                        )}
                        <option value="/images/clients/shell-pakistan-logo.png">Preset: Shell Pakistan</option>
                        <option value="/images/clients/total-parco-logo.png">Preset: Total Parco</option>
                        <option value="/images/clients/pso-logo.png">Preset: Pakistan State Oil (PSO)</option>
                        <option value="/images/clients/changan-logo.png">Preset: Changan Motors</option>
                        <option value="/images/clients/metro-cash-carry-logo.png">Preset: Metro Cash &amp; Carry</option>
                        <option value="/images/clients/habib-bank-logo.png">Preset: Habib Bank Limited</option>
                        <option value="/images/clients/jazz-pakistan-logo.png">Preset: Jazz Pakistan</option>
                        <option value="/images/clients/descon-logo.png">Preset: Descon Engineering</option>
                        <option value="/images/clients/engro-corp-logo.png">Preset: Engro Corp</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      name="logoUrl"
                      value={clientLogoPreview}
                      onChange={(e) => setClientLogoPreview(e.target.value)}
                      placeholder="Or enter logo URL or path (/images/clients/...)"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-[11px] text-neutral-300 focus:outline-none focus:border-brand-purple font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Contract Notes / Relationship Description
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  defaultValue={editingClient?.notes || ""}
                  placeholder="Turnkey retail construction, CNG station erection, and maintenance programs..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingClient(false);
                    setEditingClient(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ========================================================= */}
      {(isAddingService || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-purple" />
                <span>{editingService ? "Edit Service" : "Add Service"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingService(false);
                  setEditingService(null);
                }}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const letter = (form.elements.namedItem("letter") as HTMLInputElement).value;
                const title = (form.elements.namedItem("title") as HTMLInputElement).value;
                const summary = (form.elements.namedItem("summary") as HTMLInputElement).value;
                const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
                const capabilitiesText = (form.elements.namedItem("capabilities") as HTMLTextAreaElement).value;

                const capabilities = capabilitiesText
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean);

                if (editingService) {
                  updateService(editingService.id, {
                    letter,
                    title,
                    summary,
                    description,
                    fullDescription: description,
                    capabilities,
                  });
                  showToast(`Updated service: ${title}`);
                } else {
                  addService({
                    id: `service-${Date.now()}`,
                    letter,
                    title,
                    summary,
                    description,
                    shortDescription: summary,
                    fullDescription: description,
                    capabilities,
                    iconName: "Building2",
                  });
                  showToast(`Added service: ${title}`);
                }

                setIsAddingService(false);
                setEditingService(null);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Letter
                  </label>
                  <input
                    type="text"
                    name="letter"
                    defaultValue={editingService?.letter || "G"}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple text-center font-bold"
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingService?.title || ""}
                    placeholder="e.g. Renewable Solar & Energy Forecourts"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Short Summary *
                </label>
                <input
                  type="text"
                  name="summary"
                  defaultValue={editingService?.summary || ""}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingService?.description || ""}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Capabilities &amp; Scope Items (one per line)
                </label>
                <textarea
                  name="capabilities"
                  rows={4}
                  defaultValue={editingService?.capabilities.join("\n") || "Preventive Maintenance\nReactive Emergency Repairs\nTechnical Compliance"}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingService(false);
                    setEditingService(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT VALUE */}
      {/* ========================================================= */}
      {(isAddingValue || editingValue) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-purple" />
                <span>{editingValue ? "Edit Value" : "Add Value"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingValue(false);
                  setEditingValue(null);
                }}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem("title") as HTMLInputElement).value;
                const shortDescription = (form.elements.namedItem("shortDescription") as HTMLInputElement).value;
                const fullDescription = (form.elements.namedItem("fullDescription") as HTMLTextAreaElement).value;

                if (editingValue) {
                  updateValue(editingValue.id, {
                    title,
                    shortDescription,
                    fullDescription,
                  });
                  showToast(`Updated value: ${title}`);
                } else {
                  addValue({
                    id: `val-${Date.now()}`,
                    title,
                    shortDescription,
                    fullDescription,
                    iconName: "ShieldCheck",
                  });
                  showToast(`Added value: ${title}`);
                }

                setIsAddingValue(false);
                setEditingValue(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Value Title *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingValue?.title || ""}
                  placeholder="e.g. Health, Safety & HSSE Leadership"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  defaultValue={editingValue?.shortDescription || ""}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Full Detailed Description *
                </label>
                <textarea
                  name="fullDescription"
                  rows={4}
                  defaultValue={editingValue?.fullDescription || ""}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingValue(false);
                    setEditingValue(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                >
                  Save Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT JOB OPENING */}
      {/* ========================================================= */}
      {(isAddingJob || editingJob) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-purple" />
                <span>{editingJob ? "Edit Job Vacancy" : "Post New Vacancy"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingJob(false);
                  setEditingJob(null);
                }}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem("jobTitle") as HTMLInputElement).value;
                const department = (form.elements.namedItem("department") as HTMLInputElement).value;
                const location = (form.elements.namedItem("location") as HTMLInputElement).value;
                const type = (form.elements.namedItem("jobType") as HTMLInputElement).value;
                const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;

                if (editingJob) {
                  updateJob(editingJob.id, {
                    title,
                    department,
                    location,
                    type,
                    description,
                  });
                  showToast(`Updated job vacancy: ${title}`);
                } else {
                  addJob({
                    id: `job-${Date.now()}`,
                    title,
                    department,
                    location,
                    type,
                    description,
                  });
                  showToast(`Published job vacancy: ${title}`);
                }

                setIsAddingJob(false);
                setEditingJob(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  defaultValue={editingJob?.title || ""}
                  placeholder="e.g. Senior Civil Forecourt Engineer"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    defaultValue={editingJob?.department || "Engineering & Maintenance"}
                    placeholder="Engineering / HSSE / Operations"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    name="jobType"
                    defaultValue={editingJob?.type || "Full-Time"}
                    placeholder="Full-Time / Contract"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingJob?.location || "Peshawar / Islamabad / Field Sites"}
                  placeholder="City or Site Location"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Role Description &amp; Candidate Requirements *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={editingJob?.description || ""}
                  placeholder="Responsibilities, required degrees/certifications, and experience..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingJob(false);
                    setEditingJob(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                >
                  Save Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(isAddingNews || editingNews) && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-editor-title"
        >
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 id="news-editor-title" className="text-lg font-bold text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-brand-purple" />
                <span>{editingNews ? "Edit News Item" : "Add News Item"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingNews(false);
                  setEditingNews(null);
                }}
                aria-label="Close news editor"
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              key={editingNews?.id ?? "new-news"}
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const title = String(formData.get("newsTitle") || "").trim();
                const category = String(formData.get("newsCategory") || "").trim();
                const summary = String(formData.get("newsSummary") || "").trim();
                const publishedAt = String(formData.get("newsDate") || "");

                const saveNewsItem = (imagePath: string) => {
                  const item: NewsItem = {
                    id: editingNews?.id ?? `news-${Date.now()}`,
                    title,
                    category,
                    summary,
                    imagePath,
                    publishedAt,
                    createdAt: editingNews?.createdAt || new Date().toISOString(),
                  };

                  if (editingNews) {
                    updateNewsItem(editingNews.id, item);
                    showToast(`Updated news item: ${title}`);
                  } else {
                    addNewsItem(item);
                    showToast(`Published news item: ${title}`);
                  }
                  setIsAddingNews(false);
                  setEditingNews(null);
                };

                if (!newsImagePreview.trim()) {
                  showToast("Add an image URL or upload a news image.");
                  return;
                }
                if (newsImagePreview.startsWith("data:image/")) {
                  uploadImage(newsImagePreview, saveNewsItem);
                  return;
                }
                saveNewsItem(newsImagePreview.trim());
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs text-neutral-300 font-medium">
                  Headline *
                  <input
                    name="newsTitle"
                    defaultValue={editingNews?.title || ""}
                    placeholder="Write the news headline"
                    required
                    className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  />
                </label>
                <label className="block text-xs text-neutral-300 font-medium">
                  Category / Label *
                  <input
                    name="newsCategory"
                    defaultValue={editingNews?.category || "News"}
                    placeholder="News, Event, Announcement..."
                    required
                    className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  />
                </label>
                <label className="block text-xs text-neutral-300 font-medium sm:col-span-2">
                  Publication date *
                  <input
                    name="newsDate"
                    type="date"
                    defaultValue={editingNews?.publishedAt || new Date().toISOString().slice(0, 10)}
                    required
                    className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  />
                </label>
                <label className="block text-xs text-neutral-300 font-medium sm:col-span-2">
                  Short description *
                  <textarea
                    name="newsSummary"
                    defaultValue={editingNews?.summary || ""}
                    rows={3}
                    maxLength={500}
                    placeholder="Write two or three lines about this story."
                    required
                    className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  />
                </label>
                <label className="block text-xs text-neutral-300 font-medium sm:col-span-2">
                  Image URL or uploaded image *
                  <input
                    name="newsImagePath"
                    type="text"
                    value={newsImagePreview}
                    onChange={(event) => setNewsImagePreview(event.currentTarget.value)}
                    placeholder="/images/news/story.jpg or https://..."
                    required
                    className="mt-1 w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-purple"
                  />
                  <span className="mt-1 block text-[10px] text-neutral-500">
                    Upload a JPEG, PNG, or WebP image, or paste an existing image URL.
                  </span>
                </label>
                <label className="block text-xs text-neutral-300 font-medium sm:col-span-2">
                  Upload image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) handleImageFile(file, setNewsImagePreview);
                    }}
                    className="mt-1 block w-full text-xs text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-neutral-700"
                  />
                </label>
              </div>

              {newsImagePreview && (
                <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-neutral-800">
                  <Image
                    src={newsImagePreview}
                    alt="News image preview"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNews(false);
                    setEditingNews(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-semibold shadow-md"
                >
                  {editingNews ? "Save Changes" : "Publish News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
