import { FAQS } from "./faq";
import { TRIAL_DAYS, WEDDING_CRM_LINK } from "./site";

/** Product claims come from the existing stage copy, FAQ and plan catalogue. */
export const WEDDING_CRM = {
  path: WEDDING_CRM_LINK.href,
  linkLabel: WEDDING_CRM_LINK.label,
  title: "Wedding CRM in Australia: features and pricing",
  description:
    "An Australian wedding CRM for photographers, venues, planners and every vendor. Compare workflows, AUD pricing, migration and support. Try Arbour free.",
  heading: "Wedding CRM, built in Australia.",
  introduction:
    "Arbour is an Australian wedding CRM that keeps sales and delivery on one job record. Enquiries, quotes, contracts, invoices, a client portal and the run sheet, together until the job is paid.",
  trial: `${TRIAL_DAYS} days free. No card.`,
  audienceHeading: "The whole vendor list.",
  audience:
    "Photographers, videographers, celebrants, florists, venues, caterers, bands and DJs, hair and makeup artists, stylists, cake makers and planners. Each business has its own pipeline, packages and custom fields. The software calls the work jobs and the people contacts, so a corporate function or commercial shoot fits too.",
  workflowHeading: "Sales and delivery, on the same record.",
  workflowIntroduction:
    "A wedding CRM needs to keep working after the deposit lands. In Arbour, the enquiry becomes the booking without losing the conversation, the quote or the payment plan. These are real console screens with seed data.",
  australianHeading: "Australian details, already there.",
  australianFacts: [
    {
      title: "AUD and GST",
      body: "Plan prices are in Australian dollars and include GST. Tax invoices carry your ABN and your invoice numbering. Payment plans can put a deposit on acceptance and the balance before the event.",
    },
    {
      title: "Xero and QuickBooks",
      body: "Issued invoices, payments and refunds push to Xero or QuickBooks. The sync is one way, so changes in the accounting system do not change the client's invoice in Arbour.",
    },
    {
      title: "Support from the founders",
      body: "Ben is a wedding videographer who has worked over 250 weddings. Alex is the software engineer who builds Arbour. One of them answers support, Saturdays included.",
    },
  ],
  criteriaHeading: "Choosing the best wedding CRM for your business.",
  criteriaIntroduction:
    "Put a real job through the trial. Send yourself the quote, open the portal on your phone and check what happens after acceptance. These are the questions worth asking before you move the whole book.",
  criteria: [
    {
      question: "Does it cover your work after booking?",
      answer:
        "Check the calendar, crew, questionnaires and run sheets alongside the sales pipeline. Arbour keeps them on the booking, with roles controlling who can see the money.",
      href: "/#stage-day",
      link: "See the calendar and run sheets",
    },
    {
      question: "Can clients use it without another account?",
      answer:
        "Arbour gives each job a private portal link under your logo and colours. Clients can accept quotes, sign contracts and pay invoices without a password. Studio and House support your own portal domain.",
      href: "/#stage-booked",
      link: "See the client portal workflow",
    },
    {
      question: "Can your history come with you?",
      answer:
        "Arbour imports exports from Studio Ninja, Dubsado, Pixieset and Sprout Studio. For other systems, upload a CSV and map its columns. Check the preview counts before the import writes anything.",
      href: "/#faq",
      link: "Read about moving your data",
    },
    {
      question: "Does the price fit your team?",
      answer:
        "Count the people and organisations you need, then check the monthly and yearly totals. Solo is for one person. Studio includes eight people across three organisations. House is arranged with the founders.",
      href: "/#pricing",
      link: "Compare the full plans",
    },
  ],
  pricingHeading: "Wedding CRM pricing, in AUD.",
  pricingIntroduction: `All prices include GST. Solo and Studio include a ${TRIAL_DAYS}-day trial with no card. Yearly billing gives you twelve months for the price of ten.`,
  pricingColumns: ["Plan", "Monthly", "Yearly", "Included"] as const,
  housePrice: "By arrangement",
  faqHeading: "Before you move the book.",
  faqs: [
    {
      q: "What is a wedding CRM?",
      a: "A wedding CRM keeps a vendor's contacts, enquiries and bookings together. Arbour also handles delivery: quotes, contracts, payment plans, the client portal, questionnaires, crew and run sheets stay with the same job.",
    },
    FAQS[1],
    FAQS[4],
    FAQS[0],
  ],
  closingHeading: "Put your next job through it.",
  closing:
    "Start with the season in front of you. The archive can wait. Ben or Alex is there if you get stuck.",
  productLink: "See the full product",
  foundersLink: "Meet Ben and Alex",
} as const;
