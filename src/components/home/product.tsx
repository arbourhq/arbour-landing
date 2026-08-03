"use client";

import { useCategory } from "@/components/category-context";
import { ProductTabs } from "@/components/product/product-tabs";
import { Reveal } from "@/components/reveal";

/**
 * The six panels. The design bundle flooded one of these Sprout, which is an
 * in-product colour, so it is Acid wash here instead: same pale green beat,
 * legal on a marketing surface.
 */
const PANELS = [
  {
    title: "Enquiries",
    body: "Every “are you free in October?” lands in one inbox with a reply already half-written.",
    ground: "bg-bottle text-acid",
    chip: "bg-acid animate-drop origin-bottom",
    bodyClass: "text-cream/80",
  },
  {
    title: "Contracts",
    body: "Send, sign, countersign, done. No printer, no scanner, no “can you photograph it?”",
    ground:
      "bg-acid-wash text-bottle shadow-[inset_0_0_0_1px_rgba(15,42,30,0.2)]",
    chip: "bg-bottle animate-squash origin-bottom",
  },
  {
    title: "Chasing",
    body: "Arbour nudges whoever has gone quiet (couple, planner or supplier) so you are never the villain twice.",
    ground: "bg-coral text-cream",
    chip: "bg-cream animate-wob origin-top",
  },
  {
    title: "Run sheets",
    body: "One timeline, everyone on it, and each person only sees the part that is theirs.",
    ground: "bg-cornflower text-cream",
    chip: "bg-cream animate-unfold origin-left",
  },
  {
    title: "Soft holds",
    body: "Pencilled dates stay pencilled, clearly, in their own colour, until money moves.",
    ground: "bg-lilac text-bottle",
    chip: "bg-bottle animate-tilt",
  },
  {
    title: "The day itself",
    body: "Live mode on your phone. Tick things off with one thumb while holding a lens, a bouquet or a tray of canapés.",
    ground: "bg-acid text-bottle",
    chip: "bg-bottle animate-spin-slow",
  },
];

export function Product() {
  const { category } = useCategory();

  return (
    <section
      id="product"
      className="on-dark bg-bottle px-6 py-20 text-cream sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="mb-5 flex items-center gap-3">
            <span className="block h-5 w-5 origin-bottom animate-squash bg-acid" />
            <span className="eyebrow text-acid">02 · The whole thing</span>
          </div>
          <h2 className="m-0 mb-3.5 max-w-[22ch] font-display text-[clamp(34px,6.5vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-acid">
            Three screens. That is the job.
          </h2>
          <p className="m-0 mb-9 max-w-[56ch] text-[17px] leading-relaxed opacity-80 sm:text-lg">
            Win the work, then deliver it. The same record carries an enquiry
            from “are you free?” to “here is the invoice, thanks for a great
            day.” Have a click.
          </p>
        </Reveal>

        <ProductTabs category={category} />

        <div className="mt-0 grid md:grid-cols-2 lg:grid-cols-3">
          {PANELS.map((panel) => (
            <div
              key={panel.title}
              className={`flex min-h-[230px] flex-col justify-between gap-5 p-8 transition-transform duration-300 ease-overshoot hover:-translate-y-2 ${panel.ground}`}
            >
              <span className={`block h-[30px] w-[30px] ${panel.chip}`} />
              <div>
                <div className="mb-2 font-display text-[26px] font-extrabold tracking-[-0.03em]">
                  {panel.title}
                </div>
                <div
                  className={`text-[15px] leading-relaxed ${panel.bodyClass ?? ""}`}
                >
                  {panel.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
