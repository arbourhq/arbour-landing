import { CaptureFrame, type FrameTone } from "@/components/home/capture-frame";
import { Reveal } from "@/components/reveal";
import { RAIL_PX } from "@/components/home/stage-rail";
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
 * headline size beside the heading, one full-width recording and
 * a four-column ledger of facts underneath.
 *
 * The number is not a label. It is the same numeral the rail carries, and it
 * is what tells the reader where on the board they are.
 */

type Tone = {
  section: string;
  frame: FrameTone;
  index: string;
  title: string;
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
    rule: "border-bottle/30",
    label: "text-bottle",
    body: "text-bottle/80",
    hover: "hover:bg-bottle hover:text-acid",
    chip: "",
  },
};

/** Accent motion for each stage header, in order. */
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
      style={{ scrollMarginTop: RAIL_PX }}
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          {/* Number and title share a baseline and a top edge. Bricolage's
              ascenders sit at 0.72em and its digits at 0.673em, so a two-line
              title at 0.9 leading spans 1.62em and the numeral is 2.4x the
              title size to cover exactly that. A one-line title simply sits on
              the numeral's baseline. */}
          <div
            className="mb-10 grid gap-x-8 gap-y-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-baseline-last lg:mb-12"
            style={{ "--stage-title": "clamp(32px,5vw,60px)" } as React.CSSProperties}
          >
            {/* "01." The accent square is the full stop: on the baseline,
                sized off the numeral so it scales with it. */}
            <span
              aria-hidden="true"
              className={`font-display text-[calc(2.4*var(--stage-title))] leading-[0.9] font-extrabold tracking-[-0.05em] whitespace-nowrap tabular-nums ${t.index}`}
            >
              {stage.index}
              <span
                className={`ml-[0.1em] inline-block h-[0.16em] w-[0.16em] align-baseline ${stage.ground === "acid" ? "bg-bottle" : ACCENT_SQUARE[stage.accent]} ${chip}`}
              />
            </span>
            <h2
              id={`stage-${stage.id}-title`}
              className={`m-0 max-w-[24ch] font-display text-(length:--stage-title) leading-[0.9] font-extrabold tracking-[-0.04em] text-balance ${t.title}`}
            >
              <span className="sr-only">
                Stage {stage.index}, {stage.name}.{" "}
              </span>
              {stage.title}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <CaptureFrame
            capture={stage.capture}
            tone={t.frame}
            sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1280px) calc(100vw - 80px), 1180px"
            caption={`Screen recording, seed data · ${stage.name}`}
            mark={
              stage.ground === "acid"
                ? "bg-bottle"
                : ACCENT_SQUARE[stage.accent]
            }
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 sm:mt-10">
          <ul
            className={`m-0 grid list-none border-b p-0 sm:grid-cols-2 lg:grid-cols-4 ${t.rule}`}
          >
            {stage.facts.map((fact) => (
              <li
                key={fact.label}
                className={`group border-t px-4 py-6 transition-colors duration-300 sm:px-5 lg:py-7 ${t.rule} ${t.hover}`}
              >
                <p
                  className={`label-mono mb-3 group-hover:text-current ${t.label}`}
                >
                  {fact.label}
                </p>
                <p
                  className={`m-0 max-w-[52ch] text-[15px] leading-relaxed group-hover:text-current ${t.body}`}
                >
                  {fact.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
