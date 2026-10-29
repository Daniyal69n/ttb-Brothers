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
      "bg-black-20 text-black border-black-40 dark:bg-black-70 dark:text-white dark:border-black-70",
    neutral:
      "bg-black-20/20 text-black-70 border-black-20 dark:bg-black-70/30 dark:text-black-20 dark:border-black-60",
    accent:
      "bg-brand-purple text-white border-brand-purple dark:bg-brand-purple dark:text-white dark:border-brand-purple",
    warning:
      "bg-black-20/30 text-black-70 border-black-40 dark:bg-black-70/40 dark:text-black-20 dark:border-black-50",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
