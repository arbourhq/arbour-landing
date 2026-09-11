"use client";

import Link from "next/link";
import { useCategory } from "@/components/category-context";
import { Reveal } from "@/components/reveal";
import { CATEGORIES } from "@/content/categories";
import { APP } from "@/content/site";

/**
 * The second and third of the four claims: every vendor, and no lock-in, with
 * Australian-first alongside. The chips are the same picker as the headline
 * slab, so choosing one here reskins the hero board and the automation
 * example above without a second control to learn.
 *
 * The chips sit in a twelve-cell grid, the same butted cells as the rail.
 * Eleven categories and a twelfth cell that tells the truth: the product's
 * registry carries more types than the site names.
 *
 * The claims under them are one hairline ledger, three rows, not three cards.
 */

const CLAIMS = [
  {
    title: "No hostages",
    lines: [
      "Import from Studio Ninja, Dubsado, Pixieset or Sprout Studio, or map your own CSV.",
      "API keys on every plan. Outbound webhooks on Studio and House.",
      "Xero and QuickBooks Online sync, CSV from every report.",
      "Lock-in is not a business model, it is a hostage situation.",
    ],
  },
  {
    title: "Australian-first",
    lines: [
      "Australian dollars, GST included, ABN on the tax invoice.",
      "Dates the right way round. Weeks start on Monday.",
      "Gmail and Microsoft 365, Stripe, Xero, QuickBooks.",
      "Support answered by one of the two founders, Saturdays included.",
    ],
  },
  {
    title: "Never assumes a wedding",
    lines: [
      "Jobs, not weddings. Contacts, not couples.",
      "A corporate function or a commercial shoot runs through the same board.",
      "Custom fields carry what your category needs, nothing hard-coded.",
      "Pick a category at sign-up and the starter fields, questions and stages are there.",
    ],
  },
];

export function Vendors() {
  const { index, setIndex } = useCategory();

  return (
    <section id="vendors" className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-balance text-ink">
              Built for the whole wedding, not photographers first.
            </h2>
            <p className="m-0 max-w-[52ch] text-[17px] leading-relaxed text-ink/75 lg:pt-2">
              The florist, the celebrant, the caterer, the band and the venue
              each get their own pipeline, their own fields and their own
              enquiry form, inside the same product. Pick yours and the page
              follows.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <fieldset className="m-0 mt-10 grid grid-cols-2 gap-px border-0 bg-ink/20 p-0 sm:grid-cols-3 lg:grid-cols-6">
            <legend className="sr-only">Vendor category</legend>
            {CATEGORIES.map((c, i) => {
              const on = i === index;
              return (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setIndex(i)}
                  className={`min-h-14 cursor-pointer border-0 px-4 py-3 text-left font-sans text-[15px] font-semibold transition-[background-color,color,transform] duration-300 ease-overshoot ${
                    on
                      ? "press-dark bg-bottle text-acid"
                      : "bg-cream text-bottle hover:-translate-y-[2px] hover:bg-acid"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
            <p className="label-mono m-0 flex min-h-14 items-center bg-cream-sunken px-4 py-3 text-ink/65">
              More at sign-up
            </p>
          </fieldset>
        </Reveal>

        <div className="mt-14 -mx-3 border-b border-ink/20 sm:-mx-6">
          {CLAIMS.map((claim, i) => (
            <Reveal key={claim.title} delay={i * 0.04}>
              <div className="grid grid-cols-1 gap-x-12 gap-y-4 border-t border-ink/20 px-3 py-7 transition-colors duration-200 hover:bg-acid sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <h3 className="m-0 font-display text-[24px] leading-none font-extrabold tracking-[-0.03em] text-ink">
                  {claim.title}
                </h3>
                <ul className="m-0 grid list-none gap-0 p-0 sm:grid-cols-2 sm:gap-x-10">
                  {claim.lines.map((line) => (
                    <li
                      key={line}
                      className="border-t border-dashed border-ink/25 py-2.5 text-[15px] leading-snug text-ink/80 first:border-t-0 first:pt-0 sm:nth-[2]:border-t-0 sm:nth-[2]:pt-0"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-[15px] leading-relaxed text-ink/70">
          Every screen is written up in the{" "}
          <Link
            href={APP.help}
            className="font-semibold text-bottle underline underline-offset-4"
          >
            help centre
          </Link>
          , which needs no login. If it is not in there, ask one of us.
        </p>
      </div>
    </section>
  );
}
