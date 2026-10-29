import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContentProvider } from "@/context/ContentContext";
import { siteConfig } from "@/content/company";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.siteTitle} — Official Corporate Portal`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  keywords: [
    "TTB",
    "T & T Brothers",
    "Construction Management",
    "Oil and Gas Commissioning",
    "Filling Station Construction",
    "Civil Electrical Mechanical Maintenance",
    "Facility Management",
    "Pakistan",
  ],
  authors: [{ name: "T & T Brothers (TTB)" }],
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    locale: "en_PK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-black dark:text-black-20 selection:bg-brand-purple selection:text-white">
        <ContentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
