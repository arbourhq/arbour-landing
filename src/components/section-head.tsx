import { Reveal } from "@/components/reveal";

/**
 * One head for every numbered section on the home page.
 *
 * The section number used to be a 10px mono eyebrow, which made the numbering
 * metadata rather than interface. Here it is a chapter marker: Bricolage 800 in
 * a solid square block, sitting on a hairline that runs to the edge of the
 * content column. Oversized type as interface, hairlines doing the layout work.
 *
 * `split` puts the lead copy in its own column beside the heading. Alternating
 * stack and split down the page is the only thing stopping seven sections that
 * share a template from reading as one long block.
 */

type Tone = "light" | "dark" | "acid";

type ToneSet = {
  block: string;
  label: string;
  rule: string;
  title: string;
  lead: string;
};

const TONES: Record<Tone, ToneSet> = {
  /** Cream and Cream sunken grounds. */
  light: {
    block: "bg-ink text-cream",
    label: "text-ink/55",
    rule: "bg-ink/20",
    title: "text-ink",
    lead: "text-ink/75",
  },
  /** Bottle grounds. */
  dark: {
    block: "bg-acid text-bottle",
    label: "text-acid/70",
    rule: "bg-acid/25",
    title: "text-acid",
    lead: "text-cream/80",
  },
  /** Acid grounds. */
  acid: {
    block: "bg-bottle text-acid",
    label: "text-bottle/60",
    rule: "bg-bottle/25",
    title: "text-bottle",
    lead: "text-bottle/80",
  },
};

export function SectionHead({
  index,
  label,
  title,
  lead,
  aside,
  tone = "light",
  split = false,
  className,
}: {
  /** Two digits. Sits in the marker block. */
  index: string;
  /** Mono, uppercase, beside the marker. */
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Replaces the lead entirely when a section needs more than a paragraph. */
  aside?: React.ReactNode;
  tone?: Tone;
  split?: boolean;
  className?: string;
}) {
  const t = TONES[tone];

  const heading = (
    <h2
      className={`m-0 max-w-[22ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] ${t.title}`}
    >
      {title}
    </h2>
  );

  const body =
    aside ??
    (lead ? (
      <p className={`m-0 max-w-[56ch] text-[17px] leading-relaxed ${t.lead}`}>
        {lead}
      </p>
    ) : null);

  return (
    <Reveal className={className}>
      {/* The marker sits on the rule, not above it: the rule runs out of the
          block's right edge and carries the label with it. */}
      <div className="mb-9 flex items-stretch gap-4">
        <span
          className={`flex shrink-0 items-center px-4 py-3 font-display text-[clamp(28px,5vw,44px)] leading-none font-extrabold tracking-[-0.04em] tabular-nums ${t.block}`}
        >
          {index}
        </span>
        <span className="flex flex-1 items-center gap-4 overflow-hidden">
          <span className={`eyebrow shrink-0 ${t.label}`}>{label}</span>
          <span aria-hidden="true" className={`h-px flex-1 ${t.rule}`} />
        </span>
      </div>

      {split ? (
        <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {heading}
          {body ? <div className="lg:pt-2">{body}</div> : null}
        </div>
      ) : (
        <>
          {heading}
          {body ? <div className="mt-4">{body}</div> : null}
        </>
      )}
    </Reveal>
  );
}
