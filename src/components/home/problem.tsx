import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";

/**
 * No product claims here at all: this is the vendor's Tuesday night, described
 * back to them. It survives the pre-launch rewrite untouched.
 */
const CARDS = [
  {
    figure: "17",
    figureClass: "text-coral animate-wob origin-bottom-left",
    title: "Tabs open right now",
    body: "Three of them are the same spreadsheet. One is a venue PDF from 2023. You will not close any of them.",
  },
  {
    figure: "11:47pm",
    figureClass: "text-cornflower animate-blink",
    title: "“Did they ever sign the contract?”",
    body: "They did. Eleven days ago. But the only proof is a text thread you cannot find in the dark.",
  },
  {
    figure: "90%",
    figureClass: "animate-pop origin-bottom-left",
    title: "Sure that deposit landed",
    body: "Ninety percent is a wonderful number for a weather forecast and a terrible one for money.",
  },
];

export function Problem() {
  return (
    <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          index="01"
          label="Sound familiar"
          title="You did not get into this for spreadsheets."
          className="mb-12"
        />

        {/* h-full on both the Reveal and the card, not just one of them. The
            grid stretches the Reveal to the tallest row, and without it on the
            card as well the ink hairline behind the grid shows through as a
            solid block under the shorter columns. */}
        <div className="grid gap-px bg-ink/20 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.04} className="h-full">
              <div className="flex h-full min-h-[250px] flex-col justify-between gap-4 bg-cream p-7 transition-[transform,background-color] duration-300 ease-overshoot hover:-translate-y-1.5 hover:bg-acid-wash">
                <div
                  className={`font-display text-[44px] leading-none font-extrabold ${card.figureClass}`}
                >
                  {card.figure}
                </div>
                <div>
                  <div className="mb-2 text-[20px] leading-snug font-semibold">
                    {card.title}
                  </div>
                  <div className="text-[15px] leading-relaxed opacity-70">
                    {card.body}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
