import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { buttonClass } from "@/components/ui/button";
import { Row } from "@/components/ui/row";
import { APP } from "@/content/site";

/**
 * Every unmatched URL. Same sheet as the legal pages: a page header, then a
 * ruled list of the places people usually meant. The heading is the console's
 * own 404 line, so the two hosts fail the same way.
 *
 * Metadata replaces the root layout's: one title, no canonical or og:url
 * pointing at the home page, and no "index, follow". robots is null rather
 * than noindex because Next already injects <meta name="robots"
 * content="noindex"> on every 404, and a second tag is what the audit caught.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not a page on usearbour.com.",
  alternates: { canonical: null },
  robots: null,
  openGraph: null,
  twitter: null,
};

/** Where people usually meant to go. The help centre is on the app host. */
const PLACES = [
  { href: "/#pricing", label: "Pricing", sub: "Solo, Studio and House." },
  { href: "/articles", label: "Articles", sub: "Guides for wedding vendors." },
  { href: "/contact", label: "Contact", sub: "One inbox, both of us read it." },
  { href: APP.help, label: "Help centre", sub: "Every screen, written up." },
] as const;

const PLACE =
  "flex h-full flex-col gap-2 px-5 py-6 transition-colors duration-[var(--duration-base)] hover:bg-panel sm:px-8 lg:px-12";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Row
          first
          labelledBy="not-found-title"
          className="pt-[calc(var(--nav-h)+var(--nav-gap))]"
        >
          <div className="grid gap-x-12 gap-y-6 px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-14 lg:grid-cols-12 lg:items-end lg:px-12 lg:pt-24 lg:pb-16">
            <div className="flex flex-col items-start gap-5 lg:col-span-7">
              <p className="mono-label m-0 text-ink-muted">404 · Not found</p>
              <h1
                id="not-found-title"
                className="headline m-0 max-w-[14ch] text-hero text-ink"
              >
                That page is not on the run sheet.
              </h1>
            </div>
            <div className="flex flex-col items-start gap-5 lg:col-span-5">
              <p className="m-0 max-w-[46ch] text-lead text-ink-secondary">
                The link is old or the address has a typo. Nothing has been
                lost; the rest of the site is where you left it.
              </p>
              <Link href="/" className={buttonClass("primary", "lg")}>
                Back to the home page
              </Link>
            </div>
          </div>

          <ul className="cell-rule-t m-0 grid list-none divide-y divide-rule p-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {PLACES.map((place) => {
              const inner = (
                <>
                  <span className="headline flex items-center gap-1.5 text-title text-ink">
                    {place.label}
                    {place.href.startsWith("http") ? (
                      <ArrowUpRight aria-hidden className="size-4" />
                    ) : null}
                  </span>
                  <span className="text-body text-ink-secondary">
                    {place.sub}
                  </span>
                </>
              );
              return (
                <li key={place.href}>
                  {place.href.startsWith("http") ? (
                    <a href={place.href} className={PLACE}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={place.href} className={PLACE}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Row>
      </main>
      <SiteFooter />
    </>
  );
}
