import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/sections/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Corporate privacy policy, data handling principles, and website terms for TTB.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
