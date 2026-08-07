"use client";

import { useCategory } from "@/components/category-context";
import { STAGE_COUNTS } from "@/content/categories";
import { Reveal } from "@/components/reveal";

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

  return (
    <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="eyebrow mb-5 opacity-55">05 · The sales side</p>
          <h2 className="m-0 mb-3.5 max-w-[24ch] font-display text-[clamp(34px,6.5vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
            The wedding is the fun half. This is the half that pays.
          </h2>
          <p className="m-0 mb-10 max-w-[54ch] text-[17px] leading-relaxed opacity-80 sm:text-lg">
            A proper sales pipeline bolted to a proper project manager, and
            neither half knows it is meant to be two products. Every enquiry has
            a stage, every booking has a plan, every stage has a follow-up, and
            none of it depends on you remembering.
          </p>
        </Reveal>

        <p className="label-mono mb-4 opacity-55">
          Your pipeline · {category.name}
        </p>
        <div className="mb-14 grid grid-cols-2 gap-px bg-ink/20 sm:grid-cols-3 lg:grid-cols-5">
          {category.stages.map((stage, i) => (
            <div
              key={stage}
              className="flex min-h-[150px] flex-col justify-between gap-3.5 bg-cream p-5 transition-transform duration-300 ease-overshoot hover:-translate-y-1.5 hover:bg-acid-wash"
            >
              <div className="label-mono opacity-45">0{i + 1}</div>
              <div>
                <div className="mb-2.5 text-[17px] leading-tight font-semibold">
                  {stage}
                </div>
                <div className="font-display text-[30px] leading-none font-extrabold tracking-[-0.03em]">
                  {STAGE_COUNTS[i]}
                </div>
              </div>
            </div>
          ))}
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

          <div className="on-dark flex min-h-[290px] flex-col justify-between gap-4 bg-bottle p-7 text-cream">
            <div className="h-[30px] w-[30px] animate-pop bg-acid" />
            <div className="grid gap-px bg-cream/20">
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
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map((extra) => (
              <div
                key={extra.label}
                className={`flex min-h-[210px] flex-col justify-between gap-6 p-7 transition-transform duration-300 ease-overshoot hover:-translate-y-2 ${extra.ground} ${extra.tilt}`}
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
