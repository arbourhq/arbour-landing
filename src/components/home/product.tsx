import { ProductTabs } from "@/components/product/product-tabs";
import { SectionHead } from "@/components/section-head";

/**
 * The six panels. One colour each, butted with no gutter, inside the same
 * 1180px column as every other section.
 *
 * This was briefly three grounds running edge to edge, on the argument that the
 * brand wants colour to flood a section rather than tint cards in it. It read
 * worse: full-bleed put the tiles on a different left edge to the heading above
 * them, and cutting six hues to three lost the thing that makes the block work,
 * which is that each panel is its own colour.
 *
 * The design bundle flooded one of these Sprout, which is an in-product colour,
 * so it is Acid wash here instead: same pale green beat, legal on a marketing
 * surface.
 *
 * No pressed bottom edge and no hairline here. The panels butt against each
 * other, so the letterpress line read as a border ruled across the block
 * rather than depth on a single tile. Colour does the separating.
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
    ground: "bg-acid-wash text-bottle",
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
  return (
    <>
      <section
        id="product"
        className="on-dark bg-bottle px-6 py-20 text-cream sm:px-10 sm:py-24"
      >
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            index="02"
            label="The whole business"
            title={<>Where you&rsquo;ll live.</>}
            lead="Keep an eye on today, win the next booking, then deliver it. The rest stays out of the way."
            tone="dark"
            split
            className="mb-10"
          />

          <ProductTabs />
        </div>
      </section>

      <section className="bg-cream px-6 py-20 text-ink sm:px-10 sm:py-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            index="03"
            label="The rest of it"
            title="Six things you stop doing by hand."
            lead="First enquiry to load out. The parts that eat a Tuesday night are already handled, so the only thing still asking for you is the day itself."
            className="mb-10"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {PANELS.map((panel) => (
              <div
                key={panel.title}
                className={`relative flex min-h-[230px] flex-col justify-between gap-5 p-8 transition-transform duration-300 ease-overshoot hover:z-10 hover:-translate-y-2 ${panel.ground}`}
              >
                <span className={`block h-[30px] w-[30px] ${panel.chip}`} />
                <div>
                  <div className="mb-2 font-display text-[24px] font-extrabold tracking-[-0.03em]">
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
    </>
  );
}
