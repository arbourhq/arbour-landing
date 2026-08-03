import { Reveal } from "@/components/reveal";

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
        <Reveal>
          <p className="eyebrow mb-5 opacity-55">01 · Sound familiar</p>
          <h2 className="m-0 mb-12 max-w-[24ch] font-display text-[clamp(34px,6.5vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
            You did not get into this for spreadsheets.
          </h2>
        </Reveal>

        <div className="grid gap-px bg-ink/20 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.05 + i * 0.07}>
              <div className="flex min-h-[250px] flex-col justify-between gap-4 bg-cream p-7 transition-colors hover:bg-acid-wash">
                <div
                  className={`font-display text-[52px] leading-none font-extrabold ${card.figureClass}`}
                >
                  {card.figure}
                </div>
                <div>
                  <div className="mb-2 text-[19px] font-semibold">
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
