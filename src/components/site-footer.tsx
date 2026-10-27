import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { buttonClass } from "./ui/button";
import {
  APP,
  NAV_LINKS,
  SITE,
  TRIAL_DAYS,
  WEDDING_CRM_LINK,
} from "@/content/site";
import { SOCIALS } from "@/content/bio";

/**
 * The foot of the sheet, on the Bottle band the closing row starts: what
 * Arbour is, where to go, how to reach a person, in ruled cells. The column
 * rules carry on down through it in on-dark ink.
 *
 * Everything here has to be true. No customers, no traction, no legal pages
 * that are not routes, no socials that are not live: Facebook has no href in
 * content/bio.ts, so it renders as a label rather than a link.
 */

const SITE_LINKS = NAV_LINKS.filter((link) => link.href.includes("#"));
const COMPANY_LINKS = NAV_LINKS.filter((link) => !link.href.includes("#"));

const LINK =
  "inline-block py-1 text-body text-on-dark/75 underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-on-dark hover:underline";

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cell-rule-t px-5 py-8 sm:px-8 lg:border-t-0 lg:border-l lg:border-rule">
      <h2 className="mono-label m-0 mb-4 text-on-dark/60">{title}</h2>
      <ul className="m-0 grid list-none gap-1.5 p-0">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="ruled band-bottle">
      <div className="sheet">
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <div className="px-5 py-10 sm:px-8">
            <Link href="/" aria-label="Arbour, home" className="inline-block">
              <Wordmark tone="white" title={null} className="text-section" />
            </Link>
            <p className="headline m-0 mt-8 max-w-[18ch] text-section text-on-dark">
              {SITE.tagline}.
            </p>
            <p className="m-0 mt-3 max-w-[42ch] text-body text-on-dark/75">
              Sales CRM and project management in one, built for nothing except
              the wedding industry. One record carries a job from &ldquo;are you
              free?&rdquo; to the final invoice.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={APP.signUp} className={buttonClass("onDark", "md")}>
                Start free trial
              </a>
              <a href={APP.help} className={buttonClass("onDark", "md")}>
                Help centre
                <ArrowUpRight aria-hidden />
              </a>
            </div>
          </div>

          <Column title="The site">
            <li>
              <Link href="/articles" className={LINK}>
                Articles
              </Link>
            </li>
            <li>
              <Link href={WEDDING_CRM_LINK.href} className={LINK}>
                {WEDDING_CRM_LINK.label}
              </Link>
            </li>
            {SITE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Company">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.contactEmail}`} className={LINK}>
                {SITE.contactEmail}
              </a>
            </li>
            <li>
              <a href={APP.signIn} className={LINK}>
                Log in
              </a>
            </li>
            <li>
              <Link href="/terms" className={LINK}>
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={LINK}>
                Privacy Policy
              </Link>
            </li>
          </Column>

          <Column title="Follow">
            {SOCIALS.map((social) =>
              social.href ? (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={LINK}
                  >
                    {social.name}
                    <span className="ml-2 text-on-dark/60">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ) : (
                <li
                  key={social.name}
                  className="flex items-center gap-2 py-1 text-body text-on-dark/60"
                >
                  {social.name}
                  <span className="mono-label rounded-sm bg-on-dark/10 px-1.5 py-1 text-on-dark/70">
                    Not yet
                  </span>
                </li>
              ),
            )}
          </Column>
        </div>

        <div className="cell-rule-t flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-6 sm:px-8">
          <p className="mono-label m-0 text-on-dark/60">
            &copy; {new Date().getFullYear()} Arbour
          </p>
          <p className="mono-label m-0 flex items-center gap-2 text-on-dark/75">
            <span
              aria-hidden="true"
              className="size-[7px] rounded-xs bg-sprout"
            />
            Open · {TRIAL_DAYS} days free · no card
          </p>
          <p className="mono-label m-0 text-on-dark/60 lg:ml-auto">
            Made in Australia for people who work weekends
          </p>
        </div>
      </div>
    </footer>
  );
}
