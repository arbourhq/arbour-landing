import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Arbour collects, uses and protects personal information.",
};

const SECTIONS: readonly LegalSection[] = [
  {
    heading: "About this policy",
    paragraphs: [
      "Arbour is operated by Arbour Group Pty Ltd (ABN 81 701 728 234), an Australian company based in Victoria 3141. In this policy, Arbour, we, us and our mean Arbour Group Pty Ltd.",
      "This policy explains how we collect, hold, use and disclose personal information through usearbour.com, the Arbour console, customer portals, public forms and our related services. We handle personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles where they apply.",
      "Third-party services connected to Arbour have their own privacy policies. This policy covers our handling of information, not the independent practices of those services.",
    ],
  },
  {
    heading: "Our role",
    paragraphs: [
      "Businesses use Arbour to manage their customers, leads, bookings, documents, communications and payments. For personal information a business enters or collects through Arbour, that business decides why the information is collected and how it is used. We process that information to provide Arbour and follow the business's lawful instructions.",
      "We are responsible for personal information we collect for our own purposes, such as account, subscription, website, security, analytics and support information.",
      "If you are a customer, contact, contractor or other person whose information was entered by an Arbour business, contact that business first. We will assist it with a valid privacy request where required.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "The personal information we collect depends on how you interact with Arbour and which features a business enables.",
    ],
    items: [
      "Account and profile information, including name, email address, profile image, sign-in identifiers, organisation memberships, roles, permissions and preferences.",
      "Business and subscription information, including business name, contact details, ABN, address, branding, bank-transfer instructions, plan, subscription invoices, payment status and billing history. Stripe handles payment card details, and we do not store full card numbers.",
      "Customer and work information, including contacts, enquiries, bookings, notes, custom fields, files, packages, questionnaires, run sheets, quotes, invoices, instalments, payments, refunds and related activity.",
      "Document and signing information, including contract content, names, email addresses, signatures, signing status and audit information such as timestamps, IP address and browser details.",
      "Communications, including connected mailbox messages, participants, drafts, scheduled sends, signatures, attachments, delivery status and messages sent to support.",
      "Integration information, including provider account identifiers, connection status, encrypted access credentials and data exchanged with services you choose to connect.",
      "Technical and usage information, including IP address, browser, device, session and cookie identifiers, pages and features used, security events, diagnostic data and error reports.",
      "Website enquiries and waitlist information, including name, email address, business category, topic, message and communication preferences.",
    ],
  },
  {
    heading: "Sensitive information and children",
    paragraphs: [
      "Arbour does not require businesses to collect sensitive information. Free-text fields, files, questionnaires, mailbox messages and contracts may nevertheless contain health information or other sensitive information if a business chooses to enter it. A business must only collect and use sensitive information through Arbour when it has a lawful basis and any consent required by law.",
      "Arbour accounts are for people aged 18 or over and the service is not directed to children. Businesses may enter information about children where it is lawful and appropriate for their work. The business remains responsible for obtaining any required permission from a parent or guardian.",
    ],
  },
  {
    heading: "How we collect information",
    paragraphs: [
      "We collect information directly from you when you create an account, use Arbour, join a waitlist, contact us or connect a service. We also receive information from the organisation that invited you, people who submit a public form or customer portal, other users in an organisation, and connected providers such as Clerk, Stripe, Google, Microsoft, Documenso, Xero and QuickBooks.",
      "We collect technical and usage information automatically when you use the console. Authorised Arbour administrators may also create support and security records when investigating an issue or assisting a customer.",
      "You may choose not to provide personal information, but we may then be unable to create an account, process a request or provide the relevant feature.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "We use personal information only where reasonably necessary for our functions and activities, including to:",
    ],
    items: [
      "provide, operate and administer the console, portals, public forms, communications, documents, payments, reporting and integrations;",
      "authenticate users, apply permissions, secure the service, prevent fraud and investigate suspected misuse;",
      "process subscriptions, reconcile payments and keep business, tax and accounting records;",
      "provide support, communicate about the service and resolve disputes;",
      "measure product use, diagnose errors, improve reliability and develop features;",
      "send product news or marketing where permitted, with an option to unsubscribe; and",
      "comply with law, respond to lawful requests and enforce our agreements.",
    ],
  },
  {
    heading: "Mailbox, AI and signing features",
    paragraphs: [
      "If a business connects Gmail or Microsoft Outlook, Arbour accesses mailbox data using the permissions approved during connection. The sync is designed to retain conversations involving contacts in that business's Arbour contact list. Other inspected messages are discarded. Arbour stores relevant message content, participants and inline images so the business can work with the conversation. Disconnecting a mailbox stops future sync and removes Arbour's connection credential, but previously synced business records remain until deleted under the business's retention settings or request.",
      "When an authorised user asks the AI writing assistant for help, Arbour sends the prompt, current draft, chat history, writing preferences and any context the user chooses to include to OpenAI. That context can include contact, enquiry, booking, custom-field and internal-note information. The feature is optional, and an organisation owner can disable it. AI output is stored with the requesting user's chat and must be reviewed before use.",
      "When a business uses electronic signing, Arbour sends the document, signer details and signing instructions to Documenso. Documenso returns signing status and executed documents to Arbour. Signers also provide information directly to Documenso under its privacy policy.",
    ],
  },
  {
    heading: "When we disclose information",
    paragraphs: [
      "We do not sell or rent personal information. We may disclose it only as reasonably necessary to:",
    ],
    items: [
      "other authorised members of the relevant organisation, and customers or recipients using a portal, form, email, document or payment link;",
      "service providers that host, secure, monitor, analyse or deliver Arbour;",
      "providers a business chooses to connect, including mailbox, payment, signing, accounting, webhook and calendar providers;",
      "professional advisers, insurers, auditors or prospective parties to a genuine corporate transaction, subject to appropriate confidentiality protections;",
      "courts, regulators, law enforcement or other people where required or authorised by law; and",
      "a person where reasonably necessary to prevent a serious threat, protect rights or security, investigate fraud or enforce our terms.",
    ],
  },
  {
    heading: "Service providers and locations",
    paragraphs: [
      "Our core application, database and private file storage are hosted by Google Cloud in Sydney, Australia. Some specialist providers process information overseas. The providers used for a particular person depend on the features that person or the relevant business uses.",
    ],
    items: [
      "Clerk provides authentication and account management, primarily in the United States.",
      "Stripe provides subscription billing and connected-customer payment processing through entities and infrastructure in Australia, Ireland, the United States, India and other countries where Stripe operates.",
      "Resend delivers transactional and service email, primarily in the United States.",
      "PostHog provides console product analytics in the United States. Sentry provides error monitoring through infrastructure in the United States or Germany, depending on project configuration.",
      "OpenAI processes AI writing requests in the United States and through subprocessors in other published locations.",
      "Documenso processes signing documents in the European Union and may process account or support information in the United States.",
      "Google and Microsoft process connected mailbox and calendar data in locations determined by the connected account and provider configuration.",
      "Xero and Intuit process accounting exports in Australia, New Zealand, the United States and other locations described in their policies.",
    ],
  },
  {
    heading: "Overseas disclosure",
    paragraphs: [
      "Likely overseas locations include the United States, Ireland, Germany and other European Union countries, the United Kingdom, New Zealand, India and Singapore. A connected provider may use other locations selected by the business or listed in its current subprocessor disclosures.",
      "Before using an overseas provider, we assess its privacy and security practices and use contractual and technical safeguards that are reasonable in the circumstances. Overseas recipients may also be subject to the laws of their country. Where Australian Privacy Principle 8 applies, we take reasonable steps to require appropriate handling and may remain accountable for that recipient's conduct.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "Arbour uses cookies and similar browser storage for sign-in, security, organisation selection, preferences and portal sessions. Some are necessary for the service to work.",
      "The authenticated console uses PostHog to understand product use. We use user and organisation identifiers and low-risk event properties, and configure session replay to mask interface text, attributes and input values. The customer portal does not load PostHog. The public marketing site does not currently use advertising or behavioural analytics cookies.",
      "Sentry receives technical error and request context when something goes wrong. Browser settings can block some storage, but doing so may prevent sign-in or other features from working.",
    ],
  },
  {
    heading: "Security and support access",
    paragraphs: [
      "We use safeguards designed for the nature of the information we hold. These include encryption in transit, restricted production access, role-based permissions, private database networking, encrypted integration credentials, security logging, backups and monitoring. No online service can guarantee absolute security.",
      "Authorised Arbour personnel may access customer information only where needed for support, security, maintenance, legal compliance or service administration. Elevated support access and impersonation are restricted and audited.",
      "If a data breach is likely to result in serious harm, we will notify affected people and the Office of the Australian Information Commissioner as required by the Notifiable Data Breaches scheme.",
    ],
  },
  {
    heading: "Retention and deletion",
    paragraphs: [
      "We retain customer content while an organisation remains active or in read-only status so its authorised users can review and retrieve their records. Disconnecting an integration does not automatically delete records already imported from it.",
      "Short-lived uploads and abandoned drafts are generally removed within 24 hours. Operational records such as notification, webhook, automation and delivery history are generally retained for 30 to 90 days. Production database backups are retained for up to 30 days. We may retain financial and tax records for at least five years, or longer where law requires.",
      "Deleting an organisation or account removes information from active use, subject to processing time. Limited copies may remain in backups, security and append-only audit records, provider systems, or isolated storage until their retention or deletion process completes. We may keep limited account identity and trial-eligibility records where reasonably necessary to prevent fraud, establish legal claims, resolve disputes or meet legal obligations.",
      "When personal information is no longer needed for an authorised purpose, we take reasonable steps to delete or de-identify it. An organisation owner can delete an organisation in the console. Account deletion may require subscriptions to be cancelled and owned organisations to be deleted or transferred first. Contact support for help with deletion or available data exports.",
    ],
  },
  {
    heading: "Access, correction and deletion requests",
    paragraphs: [
      "You may ask us to access or correct personal information we hold about you, or request deletion where available under law. Email support@usearbour.com and describe the information and request. We may verify your identity and authority before acting.",
      "We aim to respond within 30 calendar days. We do not charge for a correction request. We will not charge for making an access request, although the law may allow a reasonable charge for providing access. If we refuse or limit a request, we will explain why in writing and tell you about available complaint options, unless the law permits otherwise.",
      "If the information belongs to an Arbour business's customer records, contact that business first. We will work with it to respond and will not disclose information to someone who cannot establish a right to receive it.",
    ],
  },
  {
    heading: "Marketing communications",
    paragraphs: [
      "We may send product news or launch updates where you asked for them or where law otherwise permits. You can unsubscribe using the link in a marketing email or by contacting support. We may still send service, security, billing and transaction messages that are necessary for an account or requested service.",
    ],
  },
  {
    heading: "Privacy complaints",
    paragraphs: [
      "Send a privacy complaint to support@usearbour.com with enough detail for us to investigate. We will acknowledge it, investigate fairly and aim to provide a written outcome within 30 calendar days. If we need more time, we will explain why and provide an updated timeframe.",
      "If you are not satisfied after giving us a reasonable opportunity to resolve the complaint, you may contact the Office of the Australian Information Commissioner at oaic.gov.au or on 1300 363 992.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "We may update this policy when our practices, providers or legal obligations change. We will publish the new version and effective date here. If a change materially affects how we handle existing personal information, we will take reasonable steps to notify affected account holders.",
      "For privacy questions, requests or a paper copy of this policy, contact Arbour Group Pty Ltd at support@usearbour.com, Victoria 3141, Australia.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      introduction="How Arbour collects, uses, protects and shares personal information."
      effectiveDate="29 August 2026"
      sections={SECTIONS}
    />
  );
}
