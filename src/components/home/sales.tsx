"use client";

import { useCategory } from "@/components/category-context";
import { SectionHead } from "@/components/section-head";
import { useTally } from "@/lib/use-tally";

/**
 * The longest section on the page, and the fourth Cream one, so it sits on
 * Cream sunken instead. Same palette, one more ground, and the cards stay Cream
 * so they read as raised off it.
 *
 * The tiles are butted with no gutter. Colour panels butt, light cards get a
 * hairline gutter, and those are the only two gutter systems on the page: these
 * four used to float on a 14px gap, which was a third one.
 */
const EXTRAS = [
  {
    label: "Quote builder that knows your packages",
    ground: "bg-acid text-bottle",
    chip: "bg-bottle animate-pop origin-bottom-left",
    tilt: "hover:rotate-[-1deg]",
  },
  {
    label: "Lead source reporting that is actually honest",
    ground:
      "bg-acid-wash text-bottle shadow-[inset_0_0_0_1px_rgba(15,42,30,0.2)]",
    chip: "bg-bottle animate-unfold origin-left",
    tilt: "hover:rotate-[1deg]",
  },
  {
    label: "Calendar sync, both directions",
    ground: "bg-cornflower text-cream",
    chip: "bg-cream animate-tilt",
    tilt: "hover:rotate-[-1deg]",
  },
  {
    label: "Enquiry forms for your own site",
    ground: "bg-lilac text-bottle",
    chip: "bg-bottle animate-drop origin-bottom",
    tilt: "hover:rotate-[1deg]",
  },
];

export function Sales() {
  const { category } = useCategory();
  // Same hook the build scope columns use. Every number on this page tallies.
  const { ref, progress } = useTally();

  return (
    <section className="bg-cream-sunken px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          index="05"
          label="The sales side"
          title="The wedding is the fun half. This is the half that pays."
          lead="A proper sales pipeline bolted to a proper project manager, and neither half knows it is meant to be two products. Every enquiry has a stage, every booking has a plan, every stage has a follow-up, and none of it depends on you remembering."
          className="mb-11"
        />

        {/* The ref sits outside the keyed grid: a category change re-mounts the
            cards to replay the swap, and the tally must not restart with it. */}
        <div ref={ref}>
          <p className="label-mono mb-4 opacity-55">
            Your pipeline · {category.name}
          </p>
          {/* Keyed so the row re-mounts on a category change and the swap
              animation replays. The animation sits on the grid, not the cards:
              with fill-mode both on a card it would pin the transform and kill
              the hover lift. */}
          <div
            key={category.name}
            className="mb-14 grid animate-swap grid-cols-2 gap-px bg-ink/20 sm:grid-cols-3 lg:grid-cols-5"
          >
            {category.stages.map((stage, i) => (
              <div
                key={stage}
                className="flex min-h-[175px] flex-col justify-between gap-3.5 bg-cream p-5 transition-[transform,background-color] duration-300 ease-overshoot hover:-translate-y-1.5 hover:bg-acid-wash"
              >
                <div className="label-mono opacity-45">0{i + 1}</div>
                <div>
                  <div className="mb-2 text-[15px] leading-tight font-semibold">
                    {stage}
                  </div>
                  {/* The count is the point of the cell, so it is the biggest
                      thing in it, not a footnote under the label. */}
                  <div className="font-display text-[clamp(40px,5vw,60px)] leading-[0.85] font-extrabold tracking-[-0.04em] tabular-nums">
                    {Math.round(category.stageCounts[i] * progress)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-ink/20 lg:grid-cols-3">
          <div className="flex min-h-[290px] flex-col justify-between gap-4 bg-cream p-7">
            <div className="h-[30px] w-[30px] animate-tilt bg-cornflower" />
            <div className="grid gap-px bg-ink/15">
              <div className="flex items-baseline gap-2.5 bg-cream px-3 py-2.5">
                <span className="label-mono shrink-0 text-cornflower">In</span>
                <span className="text-[13px] leading-snug">
                  “Hi! Are you free on the 14th of Feb next year?”
                </span>
              </div>
              <div className="flex items-baseline gap-2.5 bg-acid-wash px-3 py-2.5">
                <span className="label-mono shrink-0 text-bottle">Out</span>
                <span className="text-[13px] leading-snug">
                  Reply sent from your own address, 40 seconds later.
                </span>
              </div>
            </div>
            <div>
              <div className="mb-2 font-display text-2xl font-extrabold tracking-[-0.03em]">
                Two-way email sync
              </div>
              <div className="text-[15px] leading-relaxed opacity-80">
                Connect Gmail or Outlook and the whole thread lives on the
                enquiry. Reply from Arbour or from your inbox, it lands in the
                same place, from your address, not ours.
              </div>
            </div>
          </div>

          <div className="on-dark press-dark flex min-h-[290px] flex-col justify-between gap-4 bg-bottle p-7 text-cream">
            <div className="h-[30px] w-[30px] animate-pop bg-acid" />
            <div
              key={category.name}
              className="grid animate-swap gap-px bg-cream/20"
            >
              <div className="flex items-baseline gap-2.5 bg-bottle px-3 py-2.5">
                <span className="label-mono shrink-0 text-acid">If</span>
                <span className="text-[13px] leading-snug">
                  {category.automation.when}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5 bg-bottle px-3 py-2.5">
                <span className="label-mono shrink-0 text-acid/70">Then</span>
                <span className="text-[13px] leading-snug">
                  {category.automation.then}
                </span>
              </div>
            </div>
            <div>
              <div className="mb-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-acid">
                Automations
              </div>
              <div className="text-[15px] leading-relaxed opacity-85">
                Build the follow-up once and it runs for every enquiry, forever.
                Arbour ships with a set per category. Fully customisable.
              </div>
            </div>
          </div>

          <div className="flex min-h-[290px] flex-col justify-between gap-4 bg-cream p-7">
            <div className="h-[30px] w-[30px] origin-bottom animate-squash bg-lilac" />
            <div className="grid gap-px bg-ink/15">
              {[
                ["Contract · signed 14 Jan", "Done", true],
                ["Deposit · $2,400", "Paid", true],
                ["Balance · due 31 Jan", "Scheduled", false],
              ].map(([label, state, done]) => (
                <div
                  key={label as string}
                  className={`flex items-center justify-between gap-2.5 px-3 py-2.5 ${
                    done ? "bg-acid-wash" : "bg-cream"
                  }`}
                >
                  <span className="text-[13px]">{label}</span>
                  <span
                    className={`label-mono ${done ? "text-bottle" : "opacity-50"}`}
                  >
                    {state}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div className="mb-2 font-display text-2xl font-extrabold tracking-[-0.03em]">
                Contracts &amp; payments
              </div>
              <div className="text-[15px] leading-relaxed opacity-80">
                Send a quote, it becomes a contract, it becomes an invoice, it
                takes the card. Deposits, instalments and a balance that chases
                itself, all on the same record.
              </div>
            </div>
          </div>
        </div>

        {/* Off on phones. Stacked one per row it is four near-empty 210px
            slabs and a long scroll for four words, so the section keeps its
            place from 640px up and phones go straight to the next one. */}
        <div className="hidden sm:block">
          <p className="label-mono mt-16 mb-4 opacity-55">Also in the box</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map((extra) => (
              <div
                key={extra.label}
                className={`relative flex min-h-[210px] flex-col justify-between gap-6 p-7 transition-transform duration-300 ease-overshoot hover:z-10 hover:-translate-y-2 ${extra.ground} ${extra.tilt}`}
              >
                <span className={`block h-[26px] w-[26px] ${extra.chip}`} />
                <span className="text-[17px] leading-snug font-semibold">
                  {extra.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
