import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { BioSocials } from "@/components/bio/bio-socials";
import { TrialLink } from "@/components/trial-link";
import { BIO_LINKS } from "@/content/bio";
import { SITE, TRIAL_DAYS } from "@/content/site";

export const metadata: Metadata = {
  title: "Link in bio",
  description: SITE.description,
  // Everything here exists elsewhere on the site. No sense competing with the
  // home page for the same terms, and nobody arrives at this page from search.
  robots: { index: false, follow: true },
};

/**
 * The link in the Instagram bio. Built for a phone and nothing else: on a
 * laptop it is the same narrow column, held in the middle rather than
 * stretched into a layout it was never drawn for, with the sheet's column
 * rules either side of it.
 *
 * No nav and no footer on purpose. Somebody lands here from a profile, taps
 * one thing, and leaves. The links are the console's list: hairline rows,
 * a 600 title over a caption, an arrow that says whether it stays or leaves.
 * No numbers down the side: the links are not a sequence.
 */
export default function BioPage() {
  return (
    <main className="min-h-dvh bg-page">
      <div className="mx-auto flex min-h-dvh w-[min(100%-1.5rem,30rem)] flex-col border-x border-line">
        <header className="flex flex-col items-start gap-8 px-5 pt-12 pb-8">
          <h1 className="m-0">
            <Link href="/" className="block rounded-sm">
              <Wordmark className="text-[clamp(3rem,13vw,4rem)]" />
            </Link>
          </h1>
          <BioSocials />
        </header>

        <nav aria-label="Arbour links" className="border-t border-line">
          <ul className="m-0 list-none p-0">
            {BIO_LINKS.map((link, i) => {
              const rowClass = `group flex min-h-[4.5rem] items-center gap-4 px-5 py-3.5 transition-colors duration-[var(--duration-base)] hover:bg-panel ${
                i > 0 ? "border-t border-line" : ""
              }`;
              const row = (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="headline block text-title text-ink">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-caption text-ink-secondary">
                      {link.sub}
                    </span>
                  </span>
                  {link.external ? (
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-pop)] ease-overshoot group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                    />
                  ) : (
                    <ArrowRight
                      aria-hidden
                      className="size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-pop)] ease-overshoot group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                  )}
                </>
              );
              return (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={rowClass}
                    >
                      {row}
                    </a>
                  ) : (
                    <Link href={link.href} className={rowClass}>
                      {row}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <section
          aria-labelledby="bio-trial-title"
          className="border-t border-line p-3"
        >
          <div className="rounded-md bg-bottle p-6 text-on-dark">
            <h2
              id="bio-trial-title"
              className="headline m-0 text-page-title text-on-dark"
            >
              Try it on a real job.
            </h2>
            <p className="m-0 mt-3 text-body text-on-dark/75">
              {TRIAL_DAYS} days free, no card. Pick Solo or Studio at sign-up
              and the plan applies from day one. Support is the two of us.
            </p>
            <TrialLink variant="sprout" size="lg" className="mt-6 w-full" />
          </div>
        </section>

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line px-5 py-5">
          <Link
            href="/"
            className="mono-label py-2 text-ink-muted hover:text-ink"
          >
            usearbour.com
          </Link>
          <p className="mono-label m-0 text-ink-muted">
            Made for people who work weekends
          </p>
        </footer>
      </div>
    </main>
  );
}
