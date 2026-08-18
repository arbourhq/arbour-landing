/**
 * Single place for the facts the site asserts about itself.
 *
 * Arbour has not launched. Nothing in this file, or anywhere else on the site,
 * may claim customers, revenue, usage or testimonials that do not exist.
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usearbour.com",
  tagline: "Wedding Industry OS",
  description:
    "Sales CRM and project management in one, built for nothing except the wedding industry. In build now. Join the waitlist.",

  // One address, one inbox. Both founders read it, so there is no second
  // "email Ben directly" address to keep alive.
  contactEmail: "support@usearbour.com",
} as const;

export const NAV_LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/#building", label: "Building" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
