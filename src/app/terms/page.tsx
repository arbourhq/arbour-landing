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
      "These terms are an agreement between Arbour Group Pty Ltd (ABN 81 701 728 234), based in Victoria 3141, Australia, and the person or organisation that creates, buys or uses an Arbour account. Arbour, we, us and our mean Arbour Group Pty Ltd. Customer and you mean that person or organisation and its authorised users.",
      "These terms govern use of usearbour.com, the Arbour console, customer portals, public forms and related services. By creating an account, accepting an invitation, buying a plan or using the service, you agree to these terms and our Privacy Policy. If you use Arbour for an organisation, you confirm that you have authority to bind it.",
      "A person may use a public form or customer portal without an Arbour account. That person must comply with the acceptable-use and other provisions relevant to the interaction, but is not responsible for the business's subscription or organisation obligations. The business that shared the form or portal remains responsible for its content and transaction with that person.",
      "An order form or written agreement signed by both parties may add to or vary these terms. If there is an inconsistency, the signed agreement applies to the extent of that inconsistency.",
    ],
  },
  {
    heading: "Eligibility and accounts",
    paragraphs: [
      "You must be at least 18 years old to hold an Arbour account and must use the account for business purposes. You must provide accurate information, keep it current, protect your sign-in method and promptly tell us at support@usearbour.com about suspected unauthorised access.",
      "An organisation owner controls membership, roles, billing and deletion. The Customer is responsible for invited users and actions taken through its accounts, except to the extent caused by Arbour's breach of these terms or failure to use reasonable security. Users must not share accounts or attempt to use permissions they have not been given.",
    ],
  },
  {
    heading: "The service",
    paragraphs: [
      "Arbour provides business software for contacts, enquiries, bookings, pipelines, packages, files, questionnaires, calendars, communications, automations, reporting, quotes, invoices, payment plans, contracts, portals and connected services. Features depend on the selected plan, configuration, availability and connected providers.",
      "The Customer remains responsible for its business, professional judgement and relationships with its customers, workers, suppliers and other third parties. Arbour does not act as a party, agent, employer, accountant, lawyer, payment provider or event supplier in those relationships.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "You may use Arbour only for lawful business purposes and in accordance with these terms. You must not, and must not help anyone to:",
    ],
    items: [
      "upload, send or use content without the rights, notices, permissions or consents required by law;",
      "send spam, deceptive messages, unlawful marketing or communications that breach the Spam Act 2003 (Cth) or another applicable law;",
      "harass, discriminate, defame, exploit or harm another person, or collect sensitive information without lawful authority;",
      "introduce malicious code, overload the service, probe vulnerabilities or bypass security, access or usage controls;",
      "access another person's account or data without permission, or use the service for surveillance or unlawful profiling;",
      "reverse engineer or copy the service except where law does not allow that restriction;",
      "resell, sublicense or provide Arbour as a service bureau without our written agreement; or",
      "use Arbour or its output to build or train a competing product or model.",
    ],
  },
  {
    heading: "Customer Content",
    paragraphs: [
      "Customer Content means information, files, communications and other material submitted to or generated through a Customer's account. As between the parties, the Customer retains its rights in Customer Content. The Customer gives us a non-exclusive, worldwide licence to host, copy, transmit, process, display, modify for technical compatibility, back up and otherwise use Customer Content only as needed to provide, secure and support the service, comply with law and perform these terms.",
      "The Customer is responsible for the accuracy, quality, legality and collection of Customer Content. It must give affected people any privacy notice and obtain any consent or other authority required for Arbour and its providers to process that information, including sensitive information, information about children and communications content.",
      "We do not acquire ownership of Customer Content. We may use aggregated or de-identified information that cannot reasonably identify the Customer or an individual to analyse and improve Arbour.",
    ],
  },
  {
    heading: "Privacy, confidentiality and security",
    paragraphs: [
      "Our Privacy Policy explains how we handle personal information and forms part of these terms. Each party must comply with applicable privacy laws for the personal information it controls.",
      "We will use reasonable technical and organisational measures to protect Customer Content. We will treat non-public Customer Content as confidential and use or disclose it only to provide the service, follow the Customer's instructions, exercise our rights under these terms, or meet a legal requirement. This obligation does not apply to information that is public without our breach, independently developed, lawfully received without restriction or already known without a duty of confidence.",
      "The Customer must use reasonable security, remove access when no longer needed and configure roles, portals, forms, API keys, webhooks, calendar links and connected services appropriately. No online system is completely secure, so each party must promptly cooperate on a suspected security incident affecting the service.",
    ],
  },
  {
    heading: "Communications and mailboxes",
    paragraphs: [
      "If the Customer connects Gmail or Microsoft Outlook, it authorises Arbour to access, sync, store and send mailbox data within the permissions approved with that provider. Disconnecting a mailbox stops future sync but does not delete messages already retained as Customer Content.",
      "The Customer is responsible for recipients, content, timing, unsubscribe requirements and legal authority for emails, reminders, scheduled messages and automations. It must review recipients and drafts before sending. Delivery is not guaranteed because recipient systems and third-party providers may reject, filter or delay messages.",
      "Arbour may send service, security, billing and transaction messages necessary to operate an account. Marketing messages from us are governed by our Privacy Policy and applicable law.",
    ],
  },
  {
    heading: "AI writing assistant",
    paragraphs: [
      "The optional AI writing assistant sends the user's instructions, draft, conversation history, writing preferences and relevant Customer Content to OpenAI through its API Platform to generate a response. This can include content originally received through a connected Gmail account. The organisation owner can disable this feature.",
      "OpenAI states that API inputs and outputs are not used to train or improve its models unless the API customer explicitly opts in. Arbour does not opt in or otherwise authorise OpenAI to use Customer Content for model training, and disables OpenAI response storage for each request. OpenAI may retain content in abuse-monitoring logs under its API terms and data controls.",
      "Arbour will not use Google Workspace API user data to train a generalised AI or machine learning model, or transfer that data to a third party that uses it for that purpose. Arbour's use of information received from Google Workspace APIs will comply with the Google User Data Policy, including the Limited Use requirements.",
      "AI output can be incomplete, inaccurate, inappropriate or similar to output given to others. It is a drafting aid, not professional, legal, financial or accounting advice. The user must review and, where needed, correct each output before relying on or sending it. Arbour does not send AI output to a recipient without a user's further action or an automation the Customer configured.",
      "The Customer must not submit information to the AI assistant unless it has authority to disclose it for this purpose, and must not use the assistant for decisions that produce legal or similarly significant effects without appropriate human review.",
    ],
  },
  {
    heading: "Payments and customer transactions",
    paragraphs: [
      "Stripe provides payment processing for invoices a Customer sends through Arbour. The Customer connects and contracts with Stripe, is the merchant of record, and authorises direct charges to its connected Stripe account. Arbour does not receive the Customer's sale proceeds and does not currently add an application fee.",
      "The Customer is solely responsible for its prices, quotes, invoices, taxes, GST treatment, payment terms, refunds, chargebacks, disputes, goods and services. Arbour records payment information reported by Stripe but does not guarantee payment, settlement, recovery or the accuracy of provider data. Stripe's terms and fees apply separately.",
      "Bank-transfer and cash instructions entered in Arbour are supplied by the Customer. The Customer must verify them and use appropriate controls against invoice fraud. Arbour is not responsible for funds sent to incorrect details except to the extent the error was directly caused by our breach of these terms.",
    ],
  },
  {
    heading: "Contracts and electronic signing",
    paragraphs: [
      "Documenso provides electronic signing when enabled. Its terms also apply to signers and Customers using that feature. The Customer is responsible for selecting the correct document, signers, fields, signing order and form of signature, and for deciding whether electronic signing is suitable and enforceable for the document and jurisdiction.",
      "Templates, wording and workflow tools in Arbour are not legal advice. The Customer should obtain independent legal advice about its contracts, consumer obligations, privacy notices and record-keeping requirements. We do not guarantee that a document or signature will be valid, enforceable or fit for a particular purpose.",
    ],
  },
  {
    heading: "Connected services",
    paragraphs: [
      "A Customer may connect services such as Clerk, Stripe, Gmail, Outlook, Documenso, Xero, QuickBooks, calendars and webhooks. The Customer authorises us to exchange information with each selected provider as needed for the connection. Provider terms, policies, availability, limits and fees apply separately.",
      "Third-party services are outside our control. We may change, suspend or remove an integration if its provider changes access, if continued operation creates a security or legal risk, or if maintaining it is no longer reasonably practicable. We will give reasonable notice where practical. We are not responsible for a third-party service, but this does not limit responsibility for our own integration code or conduct.",
    ],
  },
  {
    heading: "Plans, trial and payment",
    paragraphs: [
      "Current plan features, user and organisation limits, billing periods and prices are shown before purchase. Unless stated otherwise, displayed Australian prices include GST. A paid subscription renews automatically each month or year, according to the period selected, until cancelled. The Customer authorises Stripe to charge the payment method on file for the subscription and applicable taxes.",
      "Eligible new users may receive one 14-day trial without a card. If the Customer adds a payment method and selects a plan during the trial, paid access begins automatically when the trial ends unless cancelled first. If no payment method is added, the account becomes read-only when the trial ends. Trial eligibility is limited to one trial per user and may be withdrawn where it is abused.",
      "The Customer can manage billing and cancel through the Stripe billing portal. Cancellation takes effect at the end of the current paid period, and access continues until then. Except where these terms or law require otherwise, amounts already paid are non-refundable and we do not give credits for partial periods or unused access. This does not affect rights under the Australian Consumer Law.",
      "We may change a recurring price by giving at least 30 days' notice. A price increase applies no earlier than the Customer's next renewal after that notice. The Customer may cancel before the increase takes effect.",
    ],
  },
  {
    heading: "Failed payments and read-only access",
    paragraphs: [
      "If a renewal payment fails, we may retry it and give a seven-day grace period. If payment is still overdue, the organisation may become read-only until payment is made or the subscription is cancelled. Read-only status preserves existing records and available viewing, download and export functions, but can block new or changed records and outbound communications. Existing public forms, portals, inbound mailbox sync and customer invoice payments may continue.",
      "We may recover reasonable external costs of collecting an undisputed overdue amount where law permits. The Customer must tell us promptly if it disputes a charge so both parties can try to resolve it.",
    ],
  },
  {
    heading: "Our intellectual property",
    paragraphs: [
      "We and our licensors own Arbour, including its software, design, branding, documentation and all related intellectual property. While an account is authorised, we grant its users a limited, non-exclusive, non-transferable and revocable right to use the service for the Customer's internal business purposes in accordance with these terms.",
      "If you provide feedback, you give us a perpetual, worldwide, royalty-free right to use it without identifying you or disclosing Customer Content. You are not required to provide feedback.",
    ],
  },
  {
    heading: "Availability and changes",
    paragraphs: [
      "We use reasonable care and skill to operate Arbour, but continuous or error-free access is not guaranteed. Maintenance, provider outages, security work and events outside reasonable control may interrupt the service. We will communicate material incidents and planned disruption where reasonable.",
      "We may improve, replace or retire features. We will give reasonable advance notice of a change that materially reduces core paid functionality, unless urgent security, legal or provider circumstances make advance notice impracticable. If a change materially reduces the service the Customer bought and we cannot provide a reasonable alternative, the Customer may cancel and request a pro-rata refund for the unused prepaid period.",
    ],
  },
  {
    heading: "Suspension and termination",
    paragraphs: [
      "We may suspend affected access immediately where reasonably necessary to contain a security threat, prevent material harm, comply with law or address fraudulent or seriously unlawful use. Otherwise, if the Customer materially breaches these terms, we will give reasonable notice and an opportunity to fix the breach before suspension or termination where it can be fixed.",
      "The Customer may cancel its subscription and delete an organisation through the available account controls. Organisation ownership checks, cancellation of an active subscription and transfer or deletion of owned organisations may be required before account deletion.",
      "Before deleting an organisation, the Customer should use available download and export tools for records it must keep. Deletion is intended to be permanent. Our Privacy Policy explains processing time, backups and records we may lawfully retain. Terms that by their nature should continue after termination, including payment, confidentiality, intellectual property, liability, disputes and accrued rights, survive.",
    ],
  },
  {
    heading: "Consumer rights and warranties",
    paragraphs: [
      "Nothing in these terms excludes, restricts or modifies a guarantee, right or remedy that cannot lawfully be excluded, including under the Australian Consumer Law. Where a statutory guarantee applies, Arbour's services come with guarantees that they will be provided with due care and skill, be fit for a disclosed purpose where applicable and be supplied within a reasonable time where no time is set.",
      "To the extent permitted by law, and subject to those non-excludable rights, Arbour is provided on an as-available basis. We do not promise that every feature will meet every business requirement, that third-party data will be accurate, or that use of Arbour alone will satisfy the Customer's legal or professional obligations.",
      "Where it is lawful to limit a remedy for a failure of a non-household service, our liability is limited, at our option, to supplying the affected service again or paying the reasonable cost of having it supplied again.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "To the extent permitted by law, neither party is liable to the other for indirect or consequential loss, or loss of profit, revenue, goodwill or anticipated savings, that was not a reasonably foreseeable result of its breach. This does not exclude direct loss, and each party must take reasonable steps to reduce loss it suffers.",
      "To the extent permitted by law, our total liability arising out of the service or these terms is limited to the greater of AUD 100 and the fees paid or payable for the affected service in the 12 months before the event giving rise to the claim.",
      "The exclusions and cap do not apply to liability that cannot lawfully be limited, fraud, wilful misconduct, death or personal injury caused by negligence, or our breach of confidentiality or applicable privacy law. They also do not reduce the Customer's obligation to pay valid subscription charges.",
    ],
  },
  {
    heading: "Third-party claims",
    paragraphs: [
      "The Customer will indemnify Arbour against a third-party claim and reasonable resulting costs to the extent caused by Customer Content infringing that third party's rights, the Customer's unlawful communications or transactions, or the Customer's intentional misuse of Arbour. This obligation does not apply to the extent the claim was caused by our breach, negligence or modification of Customer Content.",
      "We must promptly notify the Customer of a claim, provide reasonable cooperation at the Customer's cost and allow the Customer to control its defence and settlement. The Customer must not agree to a settlement that admits fault by Arbour, requires Arbour to pay money or imposes a continuing obligation on Arbour without our written consent, which we will not unreasonably withhold.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms to reflect changes to Arbour, law, security or our business. We will publish the new terms and effective date. We will give account owners at least 30 days' notice of a material change that adversely affects existing paid use, unless a shorter period is reasonably required by law or an urgent security risk.",
      "A material change applies from the stated effective date. If the Customer does not accept it, the Customer may cancel before it takes effect. If the change materially reduces rights for a prepaid period and is not required by law or security, the Customer may request a pro-rata refund for the unused period. Continued use after the effective date constitutes acceptance.",
    ],
  },
  {
    heading: "Disputes and governing law",
    paragraphs: [
      "Before starting court proceedings, a party must give written notice describing the dispute and allow the other party at least 20 business days to try to resolve it in good faith. Either party may seek urgent interlocutory relief at any time, and this process does not limit a consumer's right to contact a regulator or use a statutory remedy.",
      "These terms are governed by the laws of Victoria, Australia. Each party submits to the courts of Victoria and courts entitled to hear appeals from them, subject to any law that gives a consumer a right to bring proceedings elsewhere.",
    ],
  },
  {
    heading: "General",
    paragraphs: [
      "Notices to Arbour must be sent to support@usearbour.com. We may send notices to the account owner's email address or through the service. Email notices are taken to be received on the next business day unless the sender receives a delivery failure.",
      "Neither party is liable for delay caused by events beyond its reasonable control, except that this does not excuse payment obligations already due. The Customer may not assign these terms without our consent, which we will not unreasonably withhold. We may assign them as part of a genuine corporate restructure, financing or sale if the assignee assumes our obligations and the assignment does not materially reduce the Customer's rights.",
      "These terms and any signed order form are the entire agreement about Arbour and replace earlier discussions on that subject. If part of them is unenforceable, it is read down or removed only to the extent necessary. A failure to enforce a right is not a waiver. Nothing creates a partnership, employment, fiduciary or agency relationship between the parties.",
      "Questions about these terms can be sent to Arbour Group Pty Ltd at support@usearbour.com, Victoria 3141, Australia.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      introduction="The terms for creating an account, running a business and using Arbour."
      effectiveDate="31 August 2026"
      sections={SECTIONS}
    />
  );
}
