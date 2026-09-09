/**
 * The /bio page, the one link that sits in the Instagram profile. It is the
 * only page on the site built for a phone and nothing else, so it carries no
 * nav and no footer, just the stack.
 *
 * Same rule as everywhere else: nothing here may claim customers, usage or
 * traction. Every link points at a page that exists.
 */

export type BioLink = {
  index: string;
  label: string;
  sub: string;
  href: string;
  /** Anything off usearbour.com. Opens in a new tab and gets the away arrow. */
  external?: boolean;
};

export const BIO_LINKS: BioLink[] = [
  {
    index: "01",
    label: "Start a free trial",
    sub: "Fourteen days, no card. app.usearbour.com.",
    href: "https://app.usearbour.com/sign-up",
    external: true,
  },
  {
    index: "02",
    label: "The product",
    sub: "One record, first enquiry to final invoice.",
    href: "/",
  },
  {
    index: "03",
    label: "About",
    sub: "A wedding videographer and an engineer.",
    href: "/about",
  },
  {
    index: "04",
    label: "Talk to us",
    sub: "One inbox, both of us read it.",
    href: "/contact",
  },
  {
    index: "05",
    label: "Help centre",
    sub: "Every screen, written up. No login needed.",
    href: "https://app.usearbour.com/help",
    external: true,
  },
];

/**
 * Facebook is not up yet, so it has no href. The tile still gets drawn, empty,
 * rather than the row silently reflowing to two the day it is created.
 */
export const SOCIALS = [
  {
    name: "Instagram",
    handle: "@usearbour",
    href: "https://www.instagram.com/usearbour",
  },
  {
    name: "TikTok",
    handle: "@arbour32",
    href: "https://www.tiktok.com/@arbour32",
  },
  { name: "Facebook", handle: null, href: null },
] as const;
