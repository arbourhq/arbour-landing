import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

import { TERMS_SECTIONS, TERMS_EFFECTIVE_DATE } from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms that apply when you use Arbour.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      introduction="The terms for creating an account, running a business and using Arbour."
      effectiveDate={TERMS_EFFECTIVE_DATE}
      sections={TERMS_SECTIONS}
    />
  );
}
