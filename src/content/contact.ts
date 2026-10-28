import { ContactConfig } from "@/types";

export const contactConfig: ContactConfig = {
  // Set your static form endpoint here (e.g., "https://formspree.io/f/your-id" or "https://api.web3forms.com/submit")
  // If left as empty string "", the form switches to direct mailto verification mode with a transparent notice.
  formEndpoint: "", 
  formServiceConfigured: false,
  notificationEmail: "contact@ttb-corporate.placeholder", // Official contact email
  supportPhone: "+1 (000) 000-0000 [Pending Confirmation]",
  addressSummary: "TTB Corporate Headquarters, [City, Country pending confirmation]",
};

export const contactPageContent = {
  badge: "Get in Touch",
  title: "Connect with the TTB Corporate Team",
  subtitle:
    "Whether exploring an advisory engagement, project collaboration, or general inquiry, our corporate communications desk is ready to assist.",
  officeHoursNotice:
    "Inquiries received during standard business hours (Mon-Fri 09:00 - 18:00) are acknowledged within one business day.",
};
