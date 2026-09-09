import { CaptureFrame, type FrameTone } from "@/components/home/capture-frame";
import { Reveal } from "@/components/reveal";
import { COMPACT_PX } from "@/components/home/stage-rail";
import type { Accent, Ground, Stage as StageContent } from "@/content/stages";

/** The accent square: on Acid ground the Acid accent needs a Bottle square. */
const ACCENT_SQUARE: Record<Accent, string> = {
  cornflower: "bg-cornflower",
  lilac: "bg-lilac",
  acid: "bg-acid",
  coral: "bg-coral",
};

/**
 * One stage of the board: a flood of colour edge to edge, the stage number at
 * headline size beside the heading, the real capture across eight columns and
 * the facts it earns down the other four.
 *
 * The number is not a label. It is the same numeral the rail carries, and it
 * is what tells the reader where on the board they are.
 */

type Tone = {
  section: string;
  frame: FrameTone;
  index: string;
  title: string;
  lead: string;
  rule: string;
  label: string;
  body: string;
  hover: string;
  chip: string;
};

const TONES: Record<Ground, Tone> = {
  cream: {
    section: "bg-cream text-ink",
    frame: "bottle",
    index: "text-bottle",
    title: "text-ink",
    lead: "text-ink/75",
    rule: "border-ink/20",
    label: "text-bottle",
    body: "text-ink/80",
    hover: "hover:bg-acid hover:text-bottle",
    chip: "",
  },
  sunken: {
    section: "bg-cream-sunken text-ink",
    frame: "bottle",
    index: "text-bottle",
    title: "text-ink",
    lead: "text-ink/75",
    rule: "border-ink/20",
    label: "text-bottle",
    body: "text-ink/80",
    hover: "hover:bg-acid hover:text-bottle",
    chip: "",
  },
  bottle: {
    section: "on-dark bg-bottle text-cream",
    frame: "acid",
    index: "text-acid",
    title: "text-acid",
    lead: "text-cream/80",
    rule: "border-cream/20",
    label: "text-acid",
    body: "text-cream/80",
    hover: "hover:bg-acid hover:text-bottle",
    chip: "",
  },
  acid: {
    section: "bg-acid text-bottle",
    frame: "bottle",
    index: "text-bottle",
    title: "text-bottle",
    lead: "text-bottle/80",
    rule: "border-bottle/30",
    label: "text-bottle",
    body: "text-bottle/80",
    hover: "hover:bg-bottle hover:text-acid",
    chip: "",
  },
};

/** One per stage, in order. The square is the only ambient motion. */
const CHIPS = [
  "animate-drop origin-bottom",
  "animate-tilt",
  "animate-squash origin-bottom",
  "animate-wob origin-top",
  "animate-pop origin-bottom-left",
];

export function Stage({ stage }: { stage: StageContent }) {
  const t = TONES[stage.ground];
  const chip = CHIPS[Number(stage.index) - 1] ?? "";

  return (
    <section
      id={`stage-${stage.id}`}
      aria-labelledby={`stage-${stage.id}-title`}
      className={`${t.section} px-6 pt-10 pb-14 sm:px-10 sm:pt-12 sm:pb-20`}
      style={{ scrollMarginTop: COMPACT_PX }}
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="mb-10 grid gap-x-8 gap-y-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start lg:mb-12">
            <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-5">
              <span
                aria-hidden="true"
                className={`font-display text-[clamp(56px,9vw,120px)] leading-[0.8] font-extrabold tracking-[-0.05em] tabular-nums ${t.index}`}
              >
                {stage.index}
              </span>
              <span
                aria-hidden="true"
                className={`block h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${stage.ground === "acid" ? "bg-bottle" : ACCENT_SQUARE[stage.accent]} ${chip}`}
              />
            </div>
            <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <h2
                id={`stage-${stage.id}-title`}
                className={`m-0 max-w-[16ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-balance ${t.title}`}
              >
                <span className="sr-only">
                  Stage {stage.index}, {stage.name}.{" "}
                </span>
                {stage.title}
              </h2>
              <p
                className={`m-0 max-w-[52ch] text-[17px] leading-relaxed lg:pt-2 ${t.lead}`}
              >
                {stage.lead}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal
            delay={0.04}
            className={`lg:col-span-8 ${stage.flip ? "lg:order-2" : ""}`}
          >
            <CaptureFrame
              capture={stage.capture}
              tone={t.frame}
              sizes="(max-width: 1024px) 100vw, 780px"
              caption={`Real screen, seed data · ${stage.name}`}
              mark={
                stage.ground === "acid"
                  ? "bg-bottle"
                  : ACCENT_SQUARE[stage.accent]
              }
            />
            {stage.detail ? (
              <div className="mt-8 grid items-start gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
                <p
                  className={`m-0 max-w-[30ch] text-[15px] leading-relaxed sm:pt-1 ${t.body}`}
                >
                  {stage.detail.note}
                </p>
                <CaptureFrame
                  capture={stage.detail}
                  tone={t.frame}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 480px"
                />
              </div>
            ) : null}
          </Reveal>

          <Reveal
            delay={0.08}
            className={`lg:col-span-4 ${stage.flip ? "lg:order-1" : ""}`}
          >
            {/* The ledger bleeds past its column so the hover flood has room
                either side of the row. */}
            <ul className={`m-0 -mx-3 list-none border-b p-0 ${t.rule}`}>
              {stage.facts.map((fact) => (
                <li
                  key={fact.label}
                  className={`group border-t px-3 py-5 transition-[background-color,transform] duration-300 ease-overshoot hover:translate-x-1 ${t.rule} ${t.hover}`}
                >
                  <p
                    className={`label-mono mb-2 group-hover:text-current ${t.label}`}
                  >
                    {fact.label}
                  </p>
                  <p
                    className={`m-0 text-[15px] leading-relaxed group-hover:text-current ${t.body}`}
                  >
                    {fact.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
