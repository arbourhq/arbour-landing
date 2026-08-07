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
  "The week goes on quoting, chasing and re-keying the same details. That is what you are buying back. Prices are indicative and locked before we open.";

export const TIERS: Tier[] = [
  {
    index: "01",
    name: "Solo",
    who: "One-person outfit, up to 20 weddings a year.",
    price: 89,
    priceNote: "AUD per month",
    features: [
      "Sales pipeline",
      "Date holds",
      "Invoice, contract and form management",
      "Email sync",
    ],
  },
  {
    index: "02",
    name: "Studio",
    who: "Small team, unlimited weddings. Where most land.",
    price: 119,
    priceNote: "AUD per month",
    features: [
      "Everything in Solo",
      "Up to 8 seats",
      "Crew, shifts and permissions",
      "Automations engine",
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
      "A build slot every six months, shipped into your account",
      "Audit logs, migration done by us",
      "Custom reporting",
      "Early access to updates",
    ],
  },
];
