import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Arbour collects, uses and protects personal information.",
};

const SECTIONS: readonly LegalSection[] = [
  {
    heading: "Our approach",
    paragraphs: [
      "This policy explains how Arbour handles personal information under Australian privacy law. The identity and contact details of the responsible legal entity will be confirmed during legal review.",
      "Vendors use Arbour to manage their own customers and jobs. In that context, the vendor decides what information is collected and why. Arbour processes it to provide the service.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: ["The information we hold depends on how you use Arbour."],
    items: [
      "Account details such as your name, email address and profile picture.",
      "Business, customer, enquiry, job, payment and communication data entered into Arbour.",
      "Support messages, feedback and records of contact with us.",
      "Device, session, security, usage and diagnostic information.",
      "Billing and transaction records, with payment card details handled by our payment provider.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "We use personal information where needed to run, secure and improve Arbour.",
    ],
    items: [
      "Provide the console, customer portals and connected features.",
      "Authenticate users, prevent misuse and investigate security events.",
      "Process subscriptions and keep financial records.",
      "Respond to support requests and service messages.",
      "Understand product usage and improve reliability.",
      "Meet legal obligations and enforce our terms.",
    ],
  },
  {
    heading: "Sharing and service providers",
    paragraphs: [
      "We share information only where needed to provide Arbour, follow your instructions, protect the service, complete a business transaction or meet a legal requirement.",
      "Our providers may support identity, hosting, email, analytics, monitoring, payments and document signing. The final provider list, locations and overseas disclosure wording will be confirmed during legal review.",
    ],
  },
  {
    heading: "Overseas processing",
    paragraphs: [
      "Some service providers may store or process information outside Australia. We will identify the likely countries and describe the safeguards used before launch.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "Arbour uses cookies and similar storage for sign-in, security, preferences and product analytics. The console uses privacy-conscious analytics settings, including masking interface text and attributes that may contain customer information.",
      "A complete cookie list and any required consent choices will be added after legal review.",
    ],
  },
  {
    heading: "Security and retention",
    paragraphs: [
      "We use technical and organisational safeguards designed to protect information. No system is completely secure, so we also monitor, respond to and learn from incidents.",
      "We keep information only as long as needed for the service, legal obligations, disputes and legitimate business records. Final retention periods and backup deletion timing will be published before launch.",
    ],
  },
  {
    heading: "Access, correction and complaints",
    paragraphs: [
      "You may ask to access or correct personal information we hold about you, or raise a privacy concern. Some customer information is controlled by the vendor you dealt with, so we may direct your request to them.",
      "Request steps, response timeframes and escalation details, including the Office of the Australian Information Commissioner where applicable, will be finalised during legal review.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Privacy questions and requests can be sent to hello@usearbour.com. A dedicated privacy contact and postal address will be confirmed before launch.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      introduction="What Arbour collects, why we need it and where the legal fine print still needs a lawyer."
      sections={SECTIONS}
    />
  );
}
