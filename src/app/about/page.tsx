import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrialLink } from "@/components/trial-link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ArbyWave } from "@/components/arby/arby-wave";
import { Lenses } from "@/components/about/lenses";
import { Scramble } from "@/components/motion/scramble";
import { Split } from "@/components/motion/split";
import { AboutStats } from "@/components/about/counter";
import { buttonClass } from "@/components/ui/button";
import { Leaf } from "@/components/ui/leaf";
import { MiniBook } from "@/components/book/mini-book";
import { Row } from "@/components/ui/row";
import { FOUNDERS, RULES, TIMELINE } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About our Australian wedding CRM",
  description:
    "Meet Ben and Alex, the wedding videographer and software engineer building Arbour in Australia. The founders answer support themselves.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <main id="main">
        {/* The same sheet as the home page: a first row under the nav, then
            ruled rows down to the Bottle close. */}
        <Row
          first
          labelledBy="about-title"
          className="pt-[calc(var(--nav-h)+var(--nav-gap))]"
        >
          {/* The headline hard left, Arby waving hello off to the right,
              standing on the cell rule. */}
          <div className="reveal-now flex items-end justify-between gap-6 px-5 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
            <h1
              id="about-title"
              className="headline m-0 max-w-[14ch] pb-12 text-hero text-ink sm:pb-14 lg:pb-16"
            >
              <Split text="The ultimate collab." />
            </h1>
            {/* The canvas leaves 28% of itself under the feet; the negative
                margin stands the bird on the rule. */}
            <ArbyWave className="pointer-events-none relative z-10 -mb-[45px] hidden size-40 sm:block md:-mb-[58px] md:size-52 lg:mr-8 lg:-mb-[81px] lg:size-72" />
          </div>
          <div className="reveal-now cell-rule-t grid lg:grid-cols-12">
            <div
              className="reveal-rise px-5 py-8 sm:px-8 sm:py-10 lg:col-span-6 lg:px-12 lg:py-12"
              style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            >
              <p className="m-0 max-w-[40ch] text-lead text-ink-secondary sm:text-[1.1875rem] sm:leading-[1.5]">
                What do you get when you cross a wedding videographer with a
                software engineer? This.
              </p>
            </div>
            <div
              className="reveal-rise cell-rule-t px-5 py-4 sm:px-8 lg:col-span-6 lg:border-t-0 lg:border-l lg:border-rule lg:px-12 lg:py-6"
              style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
            >
              <AboutStats />
            </div>
          </div>
        </Row>

        <Row labelledBy="brains-title">
          <Lenses />
        </Row>

        <Row labelledBy="history-title">
          <div
            data-reveal
            className="grid gap-x-12 gap-y-4 px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:grid-cols-12 lg:items-end lg:px-12"
          >
            <h2
              id="history-title"
              className="headline m-0 text-headline text-ink lg:col-span-7"
            >
              <Split text="How we got here." />
            </h2>
            <div className="lg:col-span-5">
              <MiniBook
                pressing="Ben & Alex"
                className="mb-4 max-w-[26rem] lg:-mt-10"
              />
              <p
                className="reveal-rise m-0 max-w-[44ch] text-lead text-ink-secondary"
                style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              >
                Seventeen months, a couple of industry projects together, then
                the real one.
              </p>
            </div>
          </div>
          {/* The dates as leaves of the book, in order, the one we are at
              now marked in its running head and each with its folio. They
              develop in as the row scrolls up and lift when pointed at. */}
          <div className="cell-rule-t bg-panel px-3 pt-8 pb-10 sm:px-6 lg:px-10 lg:pt-12 lg:pb-12">
            <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {TIMELINE.map((entry, i) => {
                const isLast = i === TIMELINE.length - 1;
                return (
                  <Leaf
                    key={entry.year}
                    as="li"
                    lift
                    label={entry.year}
                    note={isLast ? "Now" : undefined}
                    folio={String(i + 1).padStart(2, "0")}
                    bodyClassName="px-5 pt-5 pb-6 text-body text-ink-secondary"
                    className="develop"
                    style={
                      { "--develop-at": `${i * 1.5}%` } as React.CSSProperties
                    }
                  >
                    {entry.body}
                  </Leaf>
                );
              })}
            </ol>
          </div>
        </Row>

        <Row labelledBy="rules-title">
          <div
            data-reveal
            className="px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:px-12"
          >
            <h2
              id="rules-title"
              className="headline m-0 max-w-[22ch] text-headline text-ink"
            >
              <Split text="Six rules, written on a napkin, still true." />
            </h2>
          </div>
          <dl className="cell-rule-t m-0">
            {RULES.map((rule, i) => (
              <div
                key={rule.title}
                data-reveal
                className={`reveal-rise group grid gap-x-12 gap-y-2 px-5 py-6 transition-colors duration-[var(--duration-base)] hover:bg-panel sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-7 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
                style={
                  {
                    "--reveal-delay": `${(i % 2) * 70}ms`,
                  } as React.CSSProperties
                }
              >
                <dt className="flex items-baseline gap-4 lg:col-span-5">
                  <span className="mono-label shrink-0 text-ink-muted tabular-nums transition-colors duration-[var(--duration-base)] group-hover:text-bottle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="headline text-title text-ink transition-transform duration-[var(--duration-pop)] ease-overshoot group-hover:translate-x-[3px]">
                    {rule.title}
                  </span>
                </dt>
                <dd className="m-0 max-w-[60ch] text-body text-ink-secondary lg:col-span-7">
                  {rule.body}
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row labelledBy="founders-title">
          <div
            data-reveal
            className="px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:px-12"
          >
            <h2
              id="founders-title"
              className="headline m-0 max-w-[20ch] text-headline text-ink"
            >
              <Split text="Who you are actually emailing" />
            </h2>
          </div>
          <div className="cell-rule-t grid lg:grid-cols-2">
            {FOUNDERS.map((person, i) => {
              return (
                <article
                  key={person.name}
                  data-reveal
                  className={`flex flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12 ${
                    i > 0
                      ? "border-t border-rule lg:border-t-0 lg:border-l"
                      : ""
                  }`}
                  style={
                    { "--reveal-delay": `${i * 140}ms` } as React.CSSProperties
                  }
                >
                  {/* The portrait wipes up into its frame and settles. */}
                  <div className="reveal-wipe relative aspect-square w-full overflow-hidden rounded-md bg-bottle">
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={person.photoAlt}
                        fill
                        sizes="(max-width: 1024px) calc(100vw - 48px), 540px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="reveal-rise">
                    <h3 className="headline m-0 mt-8 text-page-title text-ink">
                      {person.name}
                    </h3>
                    <Scramble
                      text={person.role}
                      delay={300 + i * 140}
                      className="mono-label m-0 mt-2 block text-ink-muted"
                    />
                    <p className="m-0 mt-5 max-w-[52ch] text-lead text-ink-secondary">
                      {person.bio}
                    </p>
                    <p className="mono-label m-0 mt-6 border-t border-line pt-4 text-ink-muted">
                      {person.footnote}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cell-rule-t flex flex-wrap items-center gap-x-10 gap-y-6 bg-bottle-wash px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
            <p className="m-0 max-w-[62ch] flex-1 text-lead text-ink">
              Want a word with us? Tell us your deepest desires about custom
              wedding software, the field nobody else will add, the automation
              you have been faking with a spreadsheet. It lands with Ben or
              Alex, because there is nobody else here. Yet.
            </p>
            <Link href="/contact" className={buttonClass("primary", "lg")}>
              Hit the button
            </Link>
          </div>
        </Row>

        <Row band="bottle" labelledBy="about-close-title">
          <div
            data-reveal
            className="px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20 lg:px-12"
          >
            <h2
              id="about-close-title"
              className="headline m-0 max-w-[16ch] text-[clamp(2.5rem,1rem+5.4vw,5.5rem)] leading-[0.9] text-on-dark"
            >
              <Split text="Come and run your season on it." />
            </h2>
            <div
              className="reveal-rise mt-10 flex flex-wrap items-center gap-x-3 gap-y-4"
              style={{ "--reveal-delay": "380ms" } as React.CSSProperties}
            >
              <TrialLink variant="sprout" size="lg" />
              <Link
                href="/#stage-enquiry"
                className={buttonClass("onDark", "lg")}
              >
                See the product
              </Link>
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:ml-4">
                <Link
                  href="/contact"
                  className="py-2.5 text-body font-semibold text-on-dark underline underline-offset-4 hover:text-sprout"
                >
                  Or write to one of us
                </Link>
                <span className="mono-label text-on-dark/70">
                  We do reply, usually on a Sunday
                </span>
              </span>
            </div>
          </div>
        </Row>
      </main>

      <SiteFooter />
    </>
  );
}
