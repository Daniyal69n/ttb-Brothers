import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-gray-50 dark:bg-neutral-950">
      <Container size="sm" className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#faf0fa] dark:bg-[#2d0a2d] border border-[#f0c8f0] dark:border-[#521352] text-[#8c1f8c] dark:text-[#f0b8f0] flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
          Page Not Located
        </h1>

        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
          The requested resource is either unavailable, has been relocated, or
          does not exist within the corporate portal directory.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#a329a3] hover:bg-[#8a238a] active:bg-[#731d73] transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>

          <Link
            href="/contact-us/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-[#a329a3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Corporate Desk
          </Link>
        </div>
      </Container>
    </div>
  );
}
