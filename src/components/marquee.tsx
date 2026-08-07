/**
 * The strip is duplicated because the animation translates by -50%: two
 * identical halves make the loop seamless. The second half is aria-hidden so a
 * screen reader hears each item once.
 *
 * Note: the design bundle tinted the separators Sprout. Sprout is in-product
 * only, so on a marketing surface it is Cream at low opacity instead. The
 * separator is a hard square, not a glyph, to match the chips used elsewhere.
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
            className="block h-2 w-2 shrink-0 bg-cream/40 sm:h-2.5 sm:w-2.5"
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
