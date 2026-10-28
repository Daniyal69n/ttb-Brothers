"use client";

import React, { useState } from "react";
import { contactConfig } from "@/content/contact";
import { companyData } from "@/content/company";
import {
  Send,
  AlertCircle,
  CheckCircle2,
  Mail,
  Info,
  Loader2,
} from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  organization: string;
  inquiryType: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = {
  fullName: "",
  email: "",
  organization: "",
  inquiryType: "Corporate Advisory",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      errs.email = "Business email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Inquiry subject is required.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message details are required.";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Please provide more details (minimum 15 characters).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Check if an external static form service is configured
    if (!contactConfig.formServiceConfigured || !contactConfig.formEndpoint) {
      // Honest fallback mode: open pre-filled mailto client
      const mailtoSubject = encodeURIComponent(
        `[TTB Inquiry - ${formData.inquiryType}] ${formData.subject}`
      );
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.fullName}\n` +
          `Organization: ${formData.organization || "N/A"}\n` +
          `Email: ${formData.email}\n` +
          `Inquiry Type: ${formData.inquiryType}\n\n` +
          `Message:\n${formData.message}`
      );

      // Open mail client
      window.location.href = `mailto:${companyData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setStatus("idle");
      return;
    }

    // If an external endpoint is configured:
    try {
      setStatus("submitting");
      setStatusMessage("");

      const response = await fetch(contactConfig.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          organization: formData.organization,
          inquiryType: formData.inquiryType,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you. Your message has been transmitted to our corporate desk."
        );
        setFormData(initialFormState);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus("error");
        setStatusMessage(
          errorData.message ||
            "Unable to submit inquiry at this time. Please contact us directly via email."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network connection error while reaching form gateway. Please email us directly."
      );
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200/90 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
          Direct Corporate Dispatch
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Complete the dispatch fields below to reach our management and advisory
          desk.
        </p>
      </div>

      {/* Honest Status / Form Service Notice */}
      {!contactConfig.formServiceConfigured && (
        <div className="mb-6 p-4 rounded-lg bg-[#faf0fa] dark:bg-[#2d0a2d] border border-[#f0c8f0] dark:border-[#521352] text-xs text-[#6b146b] dark:text-[#f0b8f0] flex items-start gap-3">
          <Info className="w-5 h-5 text-[#a329a3] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-black dark:text-white">
              Direct Email Routing Active
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              Form dispatch is set to open your verified email client directly to{" "}
              <code className="font-mono bg-[#f0c8f0]/50 dark:bg-[#521352]/60 px-1 py-0.5 rounded text-black dark:text-white">
                {companyData.email}
              </code>
              . To route through an external gateway (such as Formspree or
              Web3Forms), simply configure the endpoint in{" "}
              <code className="font-mono text-black dark:text-white">src/content/contact.ts</code>.
            </p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="mb-6 p-4 rounded-lg bg-[#faf0fa] dark:bg-[#2d0a2d] border border-[#f0c8f0] dark:border-[#521352] text-xs text-[#6b146b] dark:text-[#f0b8f0] flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#a329a3] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-black dark:text-white">
              Inquiry Transmitted
            </p>
            <p className="mt-0.5 text-neutral-700 dark:text-neutral-300">
              {statusMessage}
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-neutral-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#a329a3] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Submission Error</p>
            <p className="mt-0.5">{statusMessage}</p>
            <p className="mt-2 font-mono">
              Alternative direct contact:{" "}
              <a
                href={`mailto:${companyData.email}`}
                className="underline font-semibold text-[#a329a3] hover:text-[#8a238a]"
              >
                {companyData.email}
              </a>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Full Name <span className="text-[#a329a3]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Elizabeth Vance"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-black dark:text-white bg-gray-50/50 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 transition-colors ${
                errors.fullName
                  ? "border-[#a329a3] focus:ring-[#a329a3]"
                  : "border-gray-300 dark:border-neutral-700 focus:ring-[#a329a3]"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Business Email <span className="text-[#a329a3]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@organization.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-black dark:text-white bg-gray-50/50 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-[#a329a3] focus:ring-[#a329a3]"
                  : "border-gray-300 dark:border-neutral-700 focus:ring-[#a329a3]"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Organization / Company */}
          <div>
            <label
              htmlFor="organization"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Organization / Company
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Company or institution name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 text-sm text-black dark:text-white bg-gray-50/50 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#a329a3] transition-colors"
            />
          </div>

          {/* Inquiry Type */}
          <div>
            <label
              htmlFor="inquiryType"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
            >
              Inquiry Domain
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 text-sm text-black dark:text-white bg-gray-50/50 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#a329a3] transition-colors"
            >
              <option value="Corporate Advisory">Corporate Advisory</option>
              <option value="Operations Optimization">
                Operations & Process Optimization
              </option>
              <option value="Enterprise Projects">Enterprise Projects</option>
              <option value="Asset Advisory">Asset & Investment Advisory</option>
              <option value="Partnership Proposal">Partnership Proposal</option>
              <option value="Careers Inquiry">Careers Inquiry</option>
              <option value="General Corporate Desk">
                General Corporate Desk
              </option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Subject Line <span className="text-[#a329a3]">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief summary of inquiry"
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-black dark:text-white bg-gray-50/50 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 transition-colors ${
              errors.subject
                ? "border-[#a329a3] focus:ring-[#a329a3]"
                : "border-gray-300 dark:border-neutral-700 focus:ring-[#a329a3]"
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Detailed Inquiry <span className="text-[#a329a3]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your scope, objectives, or questions..."
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-black dark:text-white bg-gray-50/50 dark:bg-neutral-800/60 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 transition-colors resize-y ${
              errors.message
                ? "border-[#a329a3] focus:ring-[#a329a3]"
                : "border-gray-300 dark:border-neutral-700 focus:ring-[#a329a3]"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#a329a3] hover:bg-[#8a238a] active:bg-[#731d73] disabled:opacity-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a329a3] focus:ring-offset-2 cursor-pointer"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Transmitting Message...
              </>
            ) : contactConfig.formServiceConfigured ? (
              <>
                <Send className="w-4 h-4" />
                Submit Corporate Inquiry
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Dispatch via Verified Email Client
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
