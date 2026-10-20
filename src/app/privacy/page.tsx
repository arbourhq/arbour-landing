import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

import { PRIVACY_SECTIONS, PRIVACY_EFFECTIVE_DATE } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Arbour collects, uses and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      introduction="How Arbour collects, uses, protects and shares personal information."
      effectiveDate={PRIVACY_EFFECTIVE_DATE}
      sections={PRIVACY_SECTIONS}
    />
  );
}
