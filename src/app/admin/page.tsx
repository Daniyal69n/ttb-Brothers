"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";
import { ProjectItem, ClientItem, ValueItem, ServiceCategory, JobOpening } from "@/types";
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Download,
  Upload,
  Eye,
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
  | "backup";

export default function AdminPage() {
  const {
    content,
    isHydrated,
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
    updateContactConfig,
    updateContactIntro,
  } = useContent();

  // Authentication State with lazy initialization
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ttb_admin_auth") === "true";
    }
    return false;
  });
  const [passcode, setPasscode] = useState("");
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

  // Search queries for lists
  const [projectSearch, setProjectSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  // Live Image Upload & Preview states
  const [projectImagePreview, setProjectImagePreview] = useState<string>("");
  const [clientLogoPreview, setClientLogoPreview] = useState<string>("");

  // Helper to read and compress image from user device
  const handleImageFile = (
    file: File,
    onSuccess: (dataUrl: string) => void
  ) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, or SVG).");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      alert("Could not read image file from your device.");
    };
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (file.type === "image/svg+xml") {
        onSuccess(src);
        return;
      }
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
        const optimized = canvas.toDataURL("image/jpeg", 0.85);
        onSuccess(optimized);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcodes: admin123, ttb2026, or admin
    if (passcode === "admin123" || passcode === "ttb2026" || passcode === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem("ttb_admin_auth", "true");
      showToast("Signed in to TTB Management Console");
    } else {
      setAuthError("Incorrect password. (Default is: admin123)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ttb_admin_auth");
    setPasscode("");
  };

  if (!isHydrated) {
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
                  type="password"
                  placeholder="Enter administrator passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {authError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {authError}
                </p>
              )}
              <p className="text-[11px] text-neutral-500 mt-2">
                Default Access Code: <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-purple hover:bg-brand-purple/90 active:scale-[0.98] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-brand-purple/20 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
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

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-purple text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-medium animate-fade-in border border-white/20">
          <Check className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-14 shrink-0">
            <Image
              src="/images/company/ttb-logo.png"
              alt="TTB Logo"
              fill
              className="object-contain"
              sizes="60px"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">TTB Corporate CMS</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                Live Admin
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Universal Page Editor &amp; Data Synchronizer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-brand-purple" />
            <span className="hidden sm:inline">View Public Site</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </Link>

          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 transition-colors cursor-pointer"
            title="Download full content JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Backup JSON</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs text-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-black/50 border-r border-neutral-800/80 p-3 sm:p-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
          <div className="hidden md:block text-[11px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-2">
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
            { id: "backup", label: "Backup & Sync", icon: RotateCcw, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap text-left ${
                  active
                    ? "bg-brand-purple text-white font-semibold shadow-md shadow-brand-purple/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
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
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
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
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Storage Engine: Browser LocalStorage (Synchronized &amp; Exportable)</span>
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
                          onClick={() => setEditingClient(client)}
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
                  const formEndpoint = (form.elements.namedItem("formEndpoint") as HTMLInputElement).value;

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
                    formEndpoint,
                    formServiceConfigured: Boolean(formEndpoint),
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

                {/* 3. Office Hours & Form Endpoint */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-purple" />
                    Office Hours &amp; Form Settings
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

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">
                        Online Form Endpoint URL (e.g. Formspree / Webhook / Mailto)
                      </label>
                      <input
                        type="text"
                        name="formEndpoint"
                        placeholder="https://formspree.io/f/YOUR_ENDPOINT (Leave blank for mailto fallback)"
                        defaultValue={content.contactConfig.formEndpoint}
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
                  <span>Save Contact Details</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
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

          {/* ========================================================= */}
          {/* TAB 10: BACKUP, EXPORT & FACTORY RESET */}
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
                    Restore previously downloaded backup JSON to instantly populate your website with that content.
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
                            const ok = importJson(text);
                            if (ok) {
                              showToast("Content backup imported successfully!");
                            } else {
                              alert("Invalid JSON file. Please provide a valid TTB backup JSON.");
                            }
                          };
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
                    Discard all local edits and restore the exact authentic 1988 corporate profile data (22 original projects, 9 verified corporate clients, and initial contact directory).
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
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageFile(file, (dataUrl) => {
                                  setProjectImagePreview(dataUrl);
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
                    Upload PNG/SVG logo from device
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
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageFile(file, (dataUrl) => {
                                setClientLogoPreview(dataUrl);
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
              <div className="grid grid-cols-4 gap-4">
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
                <div className="col-span-3">
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
    </div>
  );
}
