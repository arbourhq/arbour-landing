"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useCategory } from "@/components/category-context";
import { Scramble } from "@/components/motion/scramble";
import { Split } from "@/components/motion/split";
import { TrialLink } from "@/components/trial-link";
import { Row } from "@/components/ui/row";
import { CATEGORIES, type Category } from "@/content/categories";
import { APP } from "@/content/site";

/**
 * Every vendor, and no lock-in, with Australian-first alongside. The tags
 * are the same picker as the select in the headline, so choosing one here
 * reskins the pipeline and the automation rule above without a second
 * control to learn: "Pick yours and the page follows" stays true.
 *
 * Tags are the console's tag: a 6px corner, an input-strength border and a
 * 7px colour leaf. The pressed one fills Bottle, as an active tab does.
 * Pressing one opens what that category starts with right under the tags
 * (its pipeline in its own words, and a rule that runs itself), so a click
 * answers where the reader is looking instead of somewhere up the page.
 * The claims under that are three ruled cells, not three cards.
 */

/**
 * Leaves cycle through the families that carry no meaning of their own here.
 * Coral is danger and Ochre is warning in the console, so neither decorates.
 */
const LEAVES = ["bg-bottle", "bg-sprout", "bg-cornflower", "bg-lilac"];

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

/** "A couple books you" + "Send over a confirmation" as one sentence. */
function rule({ when, then }: Category["automation"]) {
  return `${when}, ${then.charAt(0).toLowerCase()}${then.slice(1)}.`;
}

export function Vendors() {
  const { category, index, setIndex } = useCategory();
  const max = Math.max(...category.stageCounts);
  const last = category.stages.length - 1;

  return (
    <Row id="vendors" labelledBy="vendors-title">
      <div
        data-reveal
        className="grid gap-x-12 gap-y-5 px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:grid-cols-12 lg:px-12"
      >
        <h2
          id="vendors-title"
          className="headline m-0 max-w-[18ch] text-headline text-ink lg:col-span-7"
        >
          <Split text="Built for the whole wedding, not photographers first." />
        </h2>
        <p
          className="reveal-rise m-0 max-w-[52ch] self-end text-lead text-ink-secondary lg:col-span-5"
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          The florist, the celebrant, the caterer, the band and the venue each
          get their own pipeline, their own fields and their own enquiry form,
          inside the same product. Pick yours and the page follows.
        </p>
      </div>

      <fieldset className="develop cell-rule-t m-0 border-x-0 border-b-0 px-5 py-6 sm:px-8 lg:px-12">
        <legend className="sr-only">Vendor category</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c, i) => {
            const on = i === index;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={on}
                aria-controls="vendor-setup"
                onClick={() => setIndex(i)}
                className={`inline-flex h-10 items-center gap-2 rounded-md border px-3.5 text-ui font-semibold transition-[background-color,border-color,color,transform] [transition-duration:var(--duration-base),var(--duration-base),var(--duration-base),var(--duration-pop)] [transition-timing-function:ease-out,ease-out,ease-out,var(--curve-overshoot)] hover:-translate-y-[3px] active:translate-y-0 ${
                  on
                    ? "border-transparent bg-bottle text-on-dark inset-shadow-depth-button"
                    : "border-input bg-page text-ink hover:border-input-hover hover:bg-panel"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-[7px] shrink-0 rounded-xs ${on ? "animate-bloom bg-sprout" : LEAVES[i % LEAVES.length]}`}
                />
                {c.name}
                {on ? (
                  <Check
                    aria-hidden
                    className="-mr-0.5 size-3.5 animate-pop-in"
                  />
                ) : null}
              </button>
            );
          })}
          <span className="mono-label inline-flex h-10 items-center rounded-md border border-dashed border-input px-3.5 text-ink-muted">
            More at sign-up
          </span>
        </div>
      </fieldset>

      {/* What the picked category starts with. Its cells are keyed on the
          category, so once the row has revealed, every pick replays it: the
          panel wipes up, the stages rise in order, the bars draw out. */}
      <div
        id="vendor-setup"
        data-reveal
        className="cell-rule-t grid lg:grid-cols-12"
      >
        <div
          key={category.name}
          className="reveal-wipe bg-panel p-3 sm:p-6 lg:col-span-7 lg:p-8"
        >
          <div className="rounded-md border border-border-default bg-page">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <p className="headline m-0 text-title text-ink">Pipeline</p>
              <Scramble
                text={category.name}
                className="mono-label rounded-sm bg-bottle-wash px-2 py-1.5 font-semibold text-bottle"
              />
            </div>
            <ol className="m-0 grid list-none border-t border-line p-0 sm:grid-cols-5">
              {category.stages.map((stage, i) => {
                const count = category.stageCounts[i];
                return (
                  <li
                    key={stage}
                    className={`reveal-rise flex items-center gap-4 px-5 py-3 sm:flex-col sm:items-start sm:gap-3 sm:px-4 sm:py-5 ${
                      i > 0
                        ? "border-t border-line sm:border-t-0 sm:border-l"
                        : ""
                    }`}
                    style={
                      {
                        "--reveal-delay": `${120 + i * 70}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="flex w-32 shrink-0 flex-col gap-1 sm:min-h-[2.75rem] sm:w-auto">
                      <span className="mono-label text-ink-muted tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-dense font-semibold text-ink">
                        {stage}
                      </span>
                    </span>
                    <span className="headline order-last ml-auto text-section text-ink tabular-nums sm:order-none sm:ml-0">
                      {count}
                    </span>
                    <span className="block h-1.5 flex-1 overflow-hidden rounded-xs bg-panel-hover sm:w-full sm:flex-none">
                      <span
                        className={`pipe-bar block h-full rounded-xs ${i === last ? "bg-sprout" : "bg-bottle"}`}
                        style={
                          {
                            width: `${Math.max(6, (count / max) * 100)}%`,
                            "--i": i,
                          } as React.CSSProperties
                        }
                      />
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mono-label m-0 border-t border-line px-5 py-2.5 text-ink-muted">
              Illustrative · rename any stage
            </p>
          </div>
        </div>

        <div
          key={`${category.name}-rule`}
          className="flex flex-col gap-6 px-5 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:border-l lg:border-rule lg:px-10"
        >
          <div
            className="reveal-rise"
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            <p className="mono-eyebrow m-0 text-ink-muted">
              Automation · written for {category.name}
            </p>
            <p className="headline m-0 mt-4 text-section text-ink">
              {rule(category.automation)}
            </p>
            <p className="m-0 mt-3 max-w-[44ch] text-body text-ink-secondary">
              Your pipeline, fields and enquiry form start in your trade&rsquo;s
              words at sign-up, and all of it can be renamed. Rules like this
              one run on their own once they are on.
            </p>
          </div>
          <div
            className="reveal-rise mt-auto"
            style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
          >
            <TrialLink>Start free trial</TrialLink>
          </div>
        </div>
      </div>

      <div
        data-arby-perch="vendors"
        className="cell-rule-t grid lg:grid-cols-3"
      >
        {CLAIMS.map((claim, i) => (
          <div
            key={claim.title}
            className={`develop px-5 py-8 sm:px-8 sm:py-10 lg:px-8 xl:px-10 ${
              i > 0 ? "border-t border-rule lg:border-t-0 lg:border-l" : ""
            }`}
            style={{ "--develop-at": `${i * 1.5}%` } as React.CSSProperties}
          >
            <h3 className="headline m-0 text-section text-ink">
              {claim.title}
            </h3>
            <ul className="m-0 mt-5 list-none p-0">
              {claim.lines.map((line) => (
                <li
                  key={line}
                  className="border-t border-line py-3 text-body text-ink-secondary"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="cell-rule-t m-0 px-5 py-6 text-body text-ink-secondary sm:px-8 lg:px-12">
        Every screen is written up in the{" "}
        <Link
          href={APP.help}
          className="font-semibold text-bottle underline underline-offset-4 hover:text-bottle-ink"
        >
          help centre
        </Link>
        , which needs no login. If it is not in there, ask one of us.
      </p>
    </Row>
  );
}
