export interface NavItem {
  label: string;
  href: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  developerCredit: string;
  description: string;
  establishedYear: string;
  headquarters: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  workingHours: string;
}

export interface ValueItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
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
  category: string;
  summary: string;
  description: string;
  status: "Completed" | "In Progress" | "Confidential / Case Study";
  year: string;
  deliverables: string[];
  placeholderImage: string;
}

export interface ClientItem {
  id: string;
  name: string;
  industry: string;
  isPlaceholder: boolean;
  statusText: string;
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
  formEndpoint: string; // e.g. Formspree, Web3Forms, or empty string for mailto mode
  notificationEmail: string;
  supportPhone: string;
  addressSummary: string;
  formServiceConfigured: boolean;
}
