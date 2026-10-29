export interface NavItem {
  label: string;
  href: string;
}

export interface OfficeAddress {
  label: string;
  street: string;
  landmark?: string;
  city: string;
  region?: string;
  country: string;
  phone?: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  businessType: string;
  proprietor: string;
  establishedDate: string;
  establishedYear: string;
  workforce: string;
  tagline: string;
  description: string;
  contactPersons: { name: string; title: string }[];
  registeredOffice: OfficeAddress;
  islamabadBranch: OfficeAddress;
  postalAddress: string;
  phoneMobile: string;
  phoneLandline: string;
  phone: string;
  fax: string;
  emailGeneral: string;
  emailDirector: string;
  email: string;
  website: string;
  workingHours: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  benefits: { title: string; description: string }[];
}

export interface ValueItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  imageHint?: string;
  imagePath?: string;
}

export interface ServiceCategory {
  id: string;
  letter: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  capabilities: string[];
  iconName: string;
  imagePath?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  capabilities: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: "Filling Stations & KDR" | "Civil & Construction" | "Electrical & Mechanical" | "Retail Shops & Auto Wash";
  summary: string;
  description: string;
  status: "Completed" | "In Progress";
  deliverables?: string[];
  imagePath?: string;
  galleryImages?: string[];
  featured?: boolean;
}

export interface ClientItem {
  id: string;
  name: string;
  industry: string;
  source: "Profile Client" | "Supplied Partner Logo" | "Major Project Client";
  logoUrl?: string;
  confirmedInProfile: boolean;
  notes?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface ContactConfig {
  formEndpoint: string;
  formServiceConfigured: boolean;
  notificationEmail: string;
  directorEmail: string;
  supportPhone: string;
  registeredAddress: string;
  branchAddress: string;
}
