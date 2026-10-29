import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-black-20/10 dark:bg-black">
      <Container size="sm" className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-black-20 dark:bg-black-70 border border-black-40 dark:border-black-70 text-brand-purple dark:text-brand-purple flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
          Page Not Located
        </h1>

        <p className="mt-4 text-base text-black-70 dark:text-black-20 max-w-md mx-auto leading-relaxed">
          The requested resource is either unavailable, has been relocated, or
          does not exist within the corporate portal directory.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand-purple hover:opacity-90 active:opacity-80 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>

          <Link
            href="/contact-us/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-black dark:text-white bg-white dark:bg-black border border-black-20 dark:border-black-70 hover:bg-black-20 dark:hover:bg-black-70 hover:border-brand-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Corporate Desk
          </Link>
        </div>
      </Container>
    </div>
  );
}
