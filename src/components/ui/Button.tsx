import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none cursor-pointer group";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-brand-purple text-white hover:opacity-95 shadow-sm hover:shadow-md hover:shadow-brand-purple/20 focus:ring-brand-purple",
    secondary:
      "bg-black text-white hover:bg-black-70 active:bg-black dark:bg-white dark:text-black dark:hover:bg-black-20 shadow-sm hover:shadow-md focus:ring-black-50",
    outline:
      "border border-black-20 dark:border-black-70 text-black dark:text-white bg-white dark:bg-black hover:bg-black-20/40 dark:hover:bg-black-70 hover:border-brand-purple dark:hover:border-brand-purple hover:shadow-sm focus:ring-brand-purple",
    ghost:
      "text-black-70 dark:text-black-20 hover:text-black dark:hover:text-white hover:bg-black-20/20 dark:hover:bg-black-70/30 focus:ring-brand-purple",
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
