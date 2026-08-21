import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms that apply when you use Arbour.",
};

const SECTIONS: readonly LegalSection[] = [
  {
    heading: "About these terms",
    paragraphs: [
      "These terms govern access to and use of Arbour, including our website, console, customer portals and related services. By creating an account or using Arbour, you agree to them.",
      "Arbour is operated from Australia. Business details, governing law and dispute venue will be confirmed during legal review.",
    ],
  },
  {
    heading: "Accounts",
    paragraphs: [
      "You must provide accurate account information, keep your sign-in details secure and tell us promptly if you suspect unauthorised access.",
      "You are responsible for people you invite to your organisation and for the permissions you give them.",
    ],
  },
  {
    heading: "Using Arbour",
    paragraphs: [
      "You may use Arbour for lawful business purposes. You must not misuse the service or interfere with other users.",
    ],
    items: [
      "Do not upload content you do not have the right to use.",
      "Do not probe, disrupt or bypass security controls.",
      "Do not use Arbour to send unlawful, deceptive or unsolicited communications.",
      "Do not resell access unless we have agreed to it in writing.",
    ],
  },
  {
    heading: "Your content",
    paragraphs: [
      "You keep ownership of the content and business data you put into Arbour. You give us the limited rights needed to host, process, back up and display that content so we can provide the service.",
      "You are responsible for your content and for obtaining any notices, permissions or consents needed to collect and use personal information through Arbour.",
    ],
  },
  {
    heading: "Plans and payment",
    paragraphs: [
      "Plan prices, billing periods, taxes, trials, renewal rules and cancellation arrangements will be shown before you buy. Final payment terms will be confirmed during legal review.",
      "If an amount remains unpaid, we may limit access after giving reasonable notice where the law allows it.",
    ],
  },
  {
    heading: "Availability and changes",
    paragraphs: [
      "We work to keep Arbour reliable, but the service may occasionally be unavailable for maintenance, security work or events outside our reasonable control.",
      "We may improve, replace or retire features. If a material change affects paid use, we will give reasonable notice where practical.",
    ],
  },
  {
    heading: "Ending access",
    paragraphs: [
      "You may stop using Arbour and delete your account through the product, subject to any organisation ownership checks. We may suspend or end access for serious or repeated breaches, security risks or legal requirements.",
      "Data export, retention and deletion periods will be finalised before launch and reflected here after legal review.",
    ],
  },
  {
    heading: "Liability and consumer rights",
    paragraphs: [
      "Nothing in these terms excludes rights or guarantees that cannot lawfully be excluded, including rights under the Australian Consumer Law where they apply.",
      "Any exclusions, liability caps, indemnities and service remedies require legal review and will be added before launch.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about these terms can be sent to hello@usearbour.com. Formal notice details will be confirmed before launch.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      introduction="The ground rules for using Arbour. Plain English first, legal review still required."
      sections={SECTIONS}
    />
  );
}
