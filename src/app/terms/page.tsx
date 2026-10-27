import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

import { TERMS_SECTIONS, TERMS_EFFECTIVE_DATE } from "@/content/terms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "The terms that apply when you use Arbour.",
  path: "/terms",
});

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
