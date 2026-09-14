/**
 * Single place for the facts the site asserts about itself.
 *
 * Arbour is open. The console lives at app.usearbour.com, in a separate repo,
 * and every call to action on this site lands on its sign-up. What the site
 * may still never claim: customers, usage numbers, testimonials. There is a
 * product to point at now, so the copy points at it instead.
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://usearbour.com",
  tagline: "Wedding Industry OS",
  description:
    "Sales CRM and project management in one, built for nothing except the wedding industry. One record from first enquiry to final invoice. 14 days free, no card.",

  // One address, one inbox. Both founders read it, so there is no second
  // "email Ben directly" address to keep alive.
  contactEmail: "support@usearbour.com",
} as const;

/**
 * The product hosts. Sign-up takes name, email and password, then an email
 * code, and the 14-day trial starts without a card. The help centre is public
 * on the app host and needs no session.
 */
export const APP = {
  signUp: "https://app.usearbour.com/sign-up",
  signIn: "https://app.usearbour.com/sign-in",
  help: "https://app.usearbour.com/help",
} as const;

/** From packages/core/src/plans.ts in the main repo. */
export const TRIAL_DAYS = 14;

export const NAV_LINKS = [
  { href: "/#stage-enquiry", label: "Product" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
