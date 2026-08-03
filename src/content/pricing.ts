/**
 * Indicative pricing. Nothing here can be bought yet, so every tier routes to
 * the waitlist rather than a checkout, and there is no monthly/annual toggle:
 * there is no billing to toggle.
 */

export type Tier = {
  index: string;
  name: string;
  who: string;
  /** Null on House, which is scoped per customer. */
  price: number | null;
  priceNote: string;
  features: string[];
  /** Cornflower is the enterprise colour. */
  enterprise?: boolean;
};

export const PRICING_NOTE =
  "Indicative, and locked before we open. The waitlist gets told what it costs before anyone is asked to pay for it.";

export const TIERS: Tier[] = [
  {
    index: "01",
    name: "Solo",
    who: "One-person outfit, up to 20 weddings a year.",
    price: 39,
    priceNote: "per month",
    features: [
      "The book and soft holds",
      "Contracts and deposit tracking",
      "Run sheets, unlimited",
      "Day-of mode",
    ],
  },
  {
    index: "02",
    name: "Studio",
    who: "Small team, unlimited weddings. Where most land.",
    price: 89,
    priceNote: "per month",
    features: [
      "Everything in Solo",
      "Up to 8 seats",
      "Crew, shifts and permissions",
      "Automatic supplier chasing",
    ],
  },
  {
    index: "03",
    name: "House",
    who: "Venues, groups and studios who have outgrown everyone else's software.",
    price: null,
    priceNote: "scoped with you",
    enterprise: true,
    features: [
      "Everything in Studio, unlimited seats",
      "A build slot every quarter, shipped into your account",
      "SSO, audit logs, migration done by us",
      "Your reporting, your accountant, your rules",
    ],
  },
];
