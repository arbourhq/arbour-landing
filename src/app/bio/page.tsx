import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";
import { BioSocials } from "@/components/bio/bio-socials";
import { BioSignup } from "@/components/bio/bio-signup";
import { BIO_LINKS } from "@/content/bio";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Link in bio",
  description: SITE.description,
  // Everything here exists elsewhere on the site. No sense competing with the
  // home page for the same terms, and nobody arrives at this page from search.
  robots: { index: false, follow: true },
};

/** Straight on for a page on this site, away for one that is not. */
function Arrow({ external }: { external?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-overshoot ${
        external
          ? "group-hover:translate-x-1 group-hover:-translate-y-1"
          : "group-hover:translate-x-1"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      {external ? (
        <path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7" />
      ) : (
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      )}
    </svg>
  );
}

/**
 * The link in the Instagram bio. Built for a phone and nothing else: on a
 * laptop it is the same column, capped and centred on the Bottle ground rather
 * than stretched into a layout it was never drawn for.
 *
 * No nav and no footer on purpose. Somebody lands here from a profile, taps one
 * thing, and leaves. Every row is a real page and the block at the bottom is
 * the same waitlist the rest of the site runs on.
 */
export default function BioPage() {
  return (
    <WaitlistProvider>
      <main
        // Tells <body> to take the Bottle ground too, see globals.css.
        data-ground="bottle"
        className="on-dark min-h-dvh bg-bottle px-5 pt-12 pb-10 text-cream"
      >
        <div className="mx-auto flex w-full max-w-[460px] flex-col gap-9">
          {/* The mark carries the whole introduction. Anyone landing here came
              from the profile, so they already know who we are. */}
          <header className="flex flex-col items-center gap-10 pt-4 pb-3">
            <h1 className="m-0">
              <Link href="/" className="block text-acid">
                <Wordmark className="text-[clamp(60px,19vw,84px)]" />
              </Link>
            </h1>

            <BioSocials />
          </header>

          <nav aria-label="Arbour links">
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {BIO_LINKS.map((link, index) => {
                // Alternating tilt on hover, so a stack of four does not read
                // as one block leaning the same way.
                const rowClass = `group flex items-center gap-4 bg-bottle-deep p-4.5 text-cream shadow-[inset_0_0_0_1.5px_rgba(198,255,61,0.28)] transition-transform duration-300 ease-overshoot hover:-translate-y-1 hover:bg-acid hover:text-bottle ${
                  index % 2 === 0
                    ? "hover:rotate-[-1deg]"
                    : "hover:rotate-[1deg]"
                }`;

                const row = (
                  <>
                    <span className="label-mono w-5 shrink-0 text-acid/55 group-hover:text-bottle/55">
                      {link.index}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-tight font-extrabold tracking-[-0.03em]">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-cream/65 group-hover:text-bottle/70">
                        {link.sub}
                      </span>
                    </span>

                    <Arrow external={link.external} />
                  </>
                );

                return (
                  <li key={link.href}>
                    {link.external ? (
                      // Google Forms, so it leaves the site rather than routing.
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

          <BioSignup />

          <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <Link href="/" className="label-mono text-acid/70 hover:text-acid">
              usearbour.com
            </Link>
            <p className="label-mono text-cream/45">
              Made for people who work weekends
            </p>
          </footer>
        </div>
      </main>
    </WaitlistProvider>
  );
}
