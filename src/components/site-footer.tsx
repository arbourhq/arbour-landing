import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NAV_LINKS, SITE } from "@/content/site";
import { SOCIALS } from "@/content/bio";

/**
 * The footer used to be a single 40px row of 9px mono links. Now it is a real
 * block: what Arbour is, where to go, and how to reach a human, over four
 * columns closed by a hairline bottom bar.
 *
 * Everything here has to be true. No customers, no traction, no legal pages
 * that do not exist as routes, no socials that are not live: Facebook has no
 * href in content/bio.ts, so it renders as a dead label rather than a link.
 */

/** In-page anchors are the product story, the rest is the company. */
const SITE_LINKS = NAV_LINKS.filter((link) => link.href.includes("#"));
const COMPANY_LINKS = NAV_LINKS.filter((link) => !link.href.includes("#"));

/** The survey that decides what gets built. Lives in content/bio.ts. */
const SURVEY_HREF = "https://forms.gle/2haJPf696ejiLHRx8";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="label-mono mb-5 text-acid/60">{children}</p>;
}

const LINK =
  "text-[15px] leading-snug text-cream/70 transition-colors hover:text-acid";

export function SiteFooter() {
  return (
    <footer className="on-dark overflow-hidden bg-bottle pt-16 text-cream">
      <div className="px-6 sm:px-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1.7fr)_repeat(3,minmax(0,1fr))]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="block h-3.5 w-3.5 origin-bottom animate-squash bg-acid" />
                <p className="eyebrow text-acid/70">In build · Waitlist open</p>
              </div>

              <p className="m-0 max-w-[34ch] font-display text-[24px] leading-tight font-extrabold tracking-[-0.03em] text-acid">
                {SITE.tagline}.
              </p>
              <p className="mt-3.5 max-w-[42ch] text-[15px] leading-relaxed text-cream/70">
                Sales CRM and project management in one, built for nothing
                except the wedding industry. One record carries a job from
                &ldquo;are you free?&rdquo; to the final invoice.
              </p>

              <a
                href={SURVEY_HREF}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-transparent px-4 py-3 text-[15px] font-semibold text-acid shadow-[inset_0_0_0_2px_#C6FF3D] transition-transform duration-300 ease-overshoot hover:-translate-y-1 hover:rotate-[-1deg]"
              >
                Tell us how you actually work
                <span aria-hidden="true">&#8599;</span>
              </a>
            </div>

            <div>
              <ColumnHeading>The site</ColumnHeading>
              <ul className="m-0 grid list-none gap-3.5 p-0">
                {SITE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeading>Company</ColumnHeading>
              <ul className="m-0 grid list-none gap-3.5 p-0">
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
                  <Link href="/terms" className={LINK}>
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={LINK}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ColumnHeading>Follow</ColumnHeading>
              <ul className="m-0 grid list-none gap-3.5 p-0">
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
                        <span className="ml-2 text-cream/40">
                          {social.handle}
                        </span>
                      </a>
                    </li>
                  ) : (
                    <li
                      key={social.name}
                      className="text-[15px] leading-snug text-cream/35"
                    >
                      {social.name}
                      <span className="label-mono ml-2 text-cream/30">
                        Not yet
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* The mark lives down here rather than at the top of the first
              column: the column leads with the status chip, and the bar is the
              sign-off and the home link in one row. */}
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream/15 pt-7 pb-11">
            <Link href="/" className="shrink-0 text-acid">
              <Wordmark className="text-lg" />
            </Link>
            <p className="label-mono text-cream/45">
              &copy; {new Date().getFullYear()} Arbour
            </p>
            <p className="label-mono ml-auto text-cream/45">
              Made in Australia for people who work weekends
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
