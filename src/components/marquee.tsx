/**
 * The strip is duplicated because the animation translates by -50%: two
 * identical halves make the loop seamless. The second half is aria-hidden so a
 * screen reader hears each item once.
 *
 * Note: the design bundle tinted the separators Sprout. Sprout is in-product
 * only, so on a marketing surface the separator is drawn from currentColor at
 * low opacity instead, which also means the strip works on any ground the
 * caller gives it. It is a hard square turned on its corner, not a glyph, to
 * match the chips used elsewhere.
 *
 * Stays at 22/26px. It was tried a tier up at 44 to make it read as a hard cut
 * between the hero and the page, and at that size it stops being a strip and
 * starts competing with the headings either side of it. The ground does that
 * job instead.
 */
export function Marquee({
  items,
  className,
  seconds = 26,
}: {
  items: string[];
  className?: string;
  seconds?: number;
}) {
  const strip = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 font-display text-[22px] font-extrabold tracking-[-0.02em] whitespace-nowrap sm:text-[26px]"
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8">
          {item}
          <span
            aria-hidden="true"
            className="block h-2 w-2 shrink-0 rotate-45 bg-current opacity-40 sm:h-2.5 sm:w-2.5"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden py-4 ${className ?? ""}`}>
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${seconds}s` }}
      >
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
