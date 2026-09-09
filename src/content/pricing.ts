/**
 * The plan catalogue, mirrored from packages/core/src/plans.ts in the main
 * repo. Prices are AUD cents there and AUD dollars here, GST inclusive.
 * Yearly is ten months for the price of twelve. Change the catalogue first,
 * then transcribe.
 */

export type Interval = "monthly" | "yearly";

export type Tier = {
  name: string;
  who: string;
  /** Dollars per interval. Null on House, which is arranged by hand. */
  price: { monthly: number; yearly: number } | null;
  /** What the plan holds, in the order the plan page lists it. */
  limits: string[];
  features: string[];
  /** Cornflower is the enterprise colour. */
  enterprise?: boolean;
};

export const EXTRA_SEAT = { monthly: 19, yearly: 190 } as const;

export const TIERS: Tier[] = [
  {
    name: "Solo",
    who: "One organisation, one person. You, and nobody to invite.",
    price: { monthly: 89, yearly: 890 },
    limits: ["1 organisation", "1 person"],
    features: [
      "Pipeline, contacts and calendar",
      "Quotes, contracts and invoices",
      "Connected mailbox and templates",
      "Enquiry form, portal and run sheets",
      "Automations and API keys",
    ],
  },
  {
    name: "Studio",
    who: "A team. Three organisations, eight people, and seats past that at $19 each.",
    price: { monthly: 129, yearly: 1290 },
    limits: ["3 organisations", "8 people"],
    features: [
      "Everything in Solo",
      "Roles and granular permissions",
      "Outbound webhooks",
      "Extra seats, $19 a month each",
    ],
  },
  {
    name: "House",
    who: "Venues, groups and studios who have outgrown everyone else's software.",
    price: null,
    limits: ["Unlimited organisations", "Unlimited people"],
    enterprise: true,
    features: [
      "Everything in Studio",
      "A build slot every quarter, shipped into your account",
      "Onboarding done for you",
      "Priority support",
    ],
  },
];
