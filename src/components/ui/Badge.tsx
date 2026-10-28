import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "neutral" | "accent" | "warning";
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    primary:
      "bg-[#faf0fa] text-[#8c1f8c] border-[#f0c8f0] dark:bg-[#2d0a2d] dark:text-[#f0b8f0] dark:border-[#521352]",
    neutral:
      "bg-gray-100 text-gray-700 border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-700",
    accent:
      "bg-neutral-950 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white",
    warning:
      "bg-gray-100 text-gray-800 border-gray-300 dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
