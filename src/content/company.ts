import { CompanyInfo, NavItem } from "@/types";

export const siteConfig = {
  siteName: "TTB",
  siteTitle: "TTB — Corporate Group",
  siteDescription:
    "Official corporate portal of TTB, developed by Motion Studio. Committed to operational excellence, sustainable value creation, and trusted partnerships.",
  siteUrl: "https://ttb-corporate.com", // Replace with permanent Hostinger production domain
  defaultOgImage: "/images/og-image.png",
};

export const companyData: CompanyInfo = {
  name: "TTB Corporate",
  shortName: "TTB",
  tagline: "Building Sustainable Value Through Focused Operational Excellence",
  developerCredit: "Motion Studio",
  description:
    "TTB is a forward-thinking corporate organization dedicated to delivering reliable solutions, sustainable long-term value, and high standards of integrity across its operational ventures.",
  establishedYear: "[Year to be confirmed by TTB]",
  headquarters: "[City, Country to be confirmed by TTB]",
  email: "contact@ttb-corporate.placeholder", // Placeholder email until official business mailbox provided
  phone: "+1 (000) 000-0000 [Pending TTB confirmation]",
  address: {
    street: "[Corporate Address Line 1]",
    city: "[City]",
    state: "[State/Region]",
    country: "[Country]",
    postalCode: "[Postal Code]",
  },
  workingHours: "Monday – Friday: 09:00 – 18:00 (Standard Business Hours)",
};

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Our Values", href: "/our-values/" },
  { label: "Services", href: "/services/" },
  { label: "Projects", href: "/projects/" },
  { label: "Clients", href: "/clients/" },
  { label: "Careers", href: "/careers/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Our Values", href: "/our-values/" },
  { label: "Services & Capabilities", href: "/services/" },
  { label: "Selected Projects", href: "/projects/" },
  { label: "Our Clients", href: "/clients/" },
  { label: "Careers & Culture", href: "/careers/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];
