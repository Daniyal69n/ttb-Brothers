import { ContactConfig } from "@/types";

export const contactConfig: ContactConfig = {
  // Configured via environment variable or static endpoint (e.g. "https://formspree.io/f/YOUR_ID")
  // If left empty (""), the Contact Form gracefully generates a direct mailto action to info@ttb.org.pk with pre-filled fields.
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "",
  formServiceConfigured: Boolean(process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT),
  notificationEmail: "info@ttb.org.pk",
  directorEmail: "touqeer@ttb.org.pk",
  supportPhone: "+92 345 9023368",
  registeredAddress: "Irshad House, near Caltex Depot, G.T. Road, Taru Jabba, Peshawar, Pakistan",
  branchAddress: "Office #807, Street #19, I-10/4, near CDA Stop, Islamabad, Pakistan",
};

export const contactPageContent = {
  badge: "Official Communications & Enquiries",
  title: "Get in Touch with T & T Brothers (TTB)",
  subtitle:
    "Whether you require turnkey commercial construction, filling station technological commissioning, retail fit-outs, or 24-hour maintenance services across Pakistan, our engineering and management desks are ready to assist you.",
  officeHoursNotice:
    "Standard Office Hours: Monday to Saturday, 08:30 – 18:00 PKT. Emergency reactive maintenance support operates 24 hours.",
};
