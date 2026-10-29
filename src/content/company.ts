import { CompanyInfo, NavItem } from "@/types";

export const siteConfig = {
  siteName: "T & T Brothers (TTB)",
  siteTitle: "T & T Brothers (TTB) — Construction, Maintenance & Engineering Services",
  siteDescription:
    "Established in 1988, T & T Brothers (TTB) is a premier one-source solution provider in Pakistan specializing in commercial construction, oil & gas filling stations, electrical/mechanical maintenance, and facility management.",
  siteUrl: "https://www.ttb.org.pk",
  defaultOgImage: "/images/og-image.png",
};

export const companyData: CompanyInfo = {
  name: "T & T Brothers (TTB)",
  shortName: "TTB",
  businessType: "Engineering & Turnkey Construction Solutions",
  proprietor: "Muhammad Touqeer Irshad",
  membership: "ICCI member",
  certification: "ISO 45001:2008",
  establishedDate: "25 August 1988",
  establishedYear: "1988",
  workforce: "Approx. 60 Qualified Staff",
  tagline: "Integrity | Quality | Commitment",
  description:
    "T & T Brothers (TTB) is a leading Pakistani multi-disciplinary contractor and facility management provider established on 25 August 1988. We deliver complete solutions across commercial construction, oil and gas outlet commissioning, retail car wash facilities, and electro-mechanical maintenance.",
  contactPersons: [],
  registeredOffice: {
    label: "Registered Head Office — Peshawar",
    street: "Irshad House, near Caltex Depot, G.T. Road",
    landmark: "Taru Jabba",
    city: "Peshawar",
    region: "Khyber Pakhtunkhwa",
    country: "Pakistan",
    phone: "",
  },
  islamabadBranch: {
    label: "Islamabad Branch Office",
    street: "Office #807, Street #19, I-10/4",
    landmark: "near CDA Stop",
    city: "Islamabad",
    region: "ICT",
    country: "Pakistan",
    phone: "",
  },
  postalAddress: "Post Box 1330, Peshawar Cantt, Pakistan",
  phoneMobile: "",
  phoneLandline: "",
  phone: "",
  fax: "",
  emailGeneral: "info@ttb.org.pk",
  emailDirector: "info@ttb.org.pk",
  email: "info@ttb.org.pk",
  website: "www.ttb.org.pk",
  workingHours: "Monday – Saturday: 08:30 – 18:00 (24-Hour Reactive Support Available)",
  address: {
    street: "Irshad House, near Caltex Depot, G.T. Road, Taru Jabba",
    city: "Peshawar",
    state: "Khyber Pakhtunkhwa",
    country: "Pakistan",
    postalCode: "Post Box 1330, Peshawar Cantt",
  },
  benefits: [
    {
      title: "HSSE-Trained Staff",
      description: "Comprehensive Health, Safety, Security & Environmental compliance rigorously integrated across every project site.",
    },
    {
      title: "Realistic & Transparent Pricing",
      description: "Direct, competitive commercial terms that respect client budgets while upholding uncompromising construction standards.",
    },
    {
      title: "High Quality Delivery",
      description: "Disciplined engineering oversight, premium materials, and precise execution from foundation to finishing.",
    },
    {
      title: "Equipment from World-Leading Manufacturers",
      description: "Modern technological equipment, dispensers, separators, and tooling sourced from internationally accredited manufacturers.",
    },
    {
      title: "Operational Efficiency",
      description: "Streamlined coordination that minimizes site downtime and ensures rapid, dependable project turnarounds.",
    },
    {
      title: "Individual Approach to Each Customer",
      description: "Bespoke engineering, architectural, and facility management solutions tailored to specific corporate needs.",
    },
    {
      title: "Continuous Personnel Training",
      description: "Regular vocational upskilling, technical certifications, and safety seminars for our ~60 dedicated team members.",
    },
    {
      title: "After-Sales & Handover Service",
      description: "Dependable defect-liability support, warranty coordination, and proactive post-commissioning maintenance.",
    },
    {
      title: "24-Hour Emergency Maintenance",
      description: "Around-the-clock rapid response teams for reactive civil, mechanical, and electrical site emergencies.",
    },
  ],
};

export const directorMessage = {
  heading: "A Message from Our Director",
  directorName: "Muhammad Touqeer Irshad",
  directorTitle: "Proprietor & Managing Director",
  company: "T & T Brothers (TTB)",
  paragraphs: [
    "Since our inception on 25 August 1988, T & T Brothers (TTB) has been driven by a singular conviction: that enduring business success is built upon uncompromising integrity, mutual trust, and total commitment to client satisfaction.",
    "Over more than three decades of operations across Pakistan, we have evolved into a trusted one-source solution provider for commercial construction, petroleum retail outlet commissioning, and facility management. This sustained growth is a direct testament to our approximately 60 committed engineers, project managers, technical specialists, and field operatives.",
    "We take immense pride in our long-standing relationships with market leaders such as Shell Pakistan, Total Parco Pakistan, Pakistan State Oil (PSO), and premier industrial institutions. Every project we undertake—from complete retail forecourts and automated wash facilities to complex electro-mechanical overhauls—is executed with deep respect for HSSE standards, technical rigor, and honest commercial practices.",
    "As Pakistan's infrastructure and corporate landscape continues to advance, TTB stands ready with the equipment, expertise, and dedication required to deliver excellence on every ground. We thank our valued clients for their enduring confidence and welcome prospective partners to build the future with us.",
  ],
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
  { label: "Project Portfolio", href: "/projects/" },
  { label: "Our Clients", href: "/clients/" },
  { label: "Careers & Team", href: "/careers/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];
