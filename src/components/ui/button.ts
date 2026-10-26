/**
 * The console's button, as a class string so the same skin works on
 * <button>, <a> and next/link without polymorphic props. The recipe is the
 * kit's (packages/ui/src/lib/skins.ts): a 6px corner, a 4px letterpress edge
 * under the solid grounds, and an overshoot lift with a bridge under it so a
 * cursor resting on the bottom edge never loses hover mid-lift.
 *
 * Sprout is the one headline action on a screen. Everything else is Bottle
 * or flat. Two Sprout buttons in one view means there is no headline action.
 */

export type ButtonVariant =
  | "primary" // Bottle, the default solid button
  | "sprout" // the one headline action on a screen
  | "secondary" // white with an input-strength border
  | "ghost" // no box, Bottle text
  | "onDark"; // a secondary button standing on a Bottle band

export type ButtonSize = "sm" | "md" | "lg";

// No border colour and no display here beyond the default: a variant sets
// its own border colour, and a caller hides a button with a breakpoint
// variant (max-sm:hidden, md:hidden), never a bare `hidden`, because without
// a class merger two utilities on one property resolve by stylesheet order,
// not by which was written last.
const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-md border font-sans font-semibold whitespace-nowrap select-none " +
  // The overshoot curve is for the lift only; colours ease plainly, or the
  // hover overshoots into a flash before the real colour lands.
  "transition-[background-color,color,border-color,transform] [transition-duration:var(--duration-base),var(--duration-base),var(--duration-base),var(--duration-pop)] [transition-timing-function:ease-out,ease-out,ease-out,var(--curve-overshoot)] motion-reduce:transition-none " +
  "disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const LIFT =
  "inset-shadow-depth-button hover:-translate-y-[3px] active:translate-y-0 " +
  "after:absolute after:inset-x-0 after:top-full after:h-0 after:content-[''] hover:after:h-[6px]";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: `border-transparent bg-bottle text-on-dark ${LIFT}`,
  sprout: `border-transparent bg-sprout text-bottle ${LIFT}`,
  secondary:
    "border-input bg-page text-ink hover:border-input-hover hover:bg-panel",
  ghost: "border-transparent bg-transparent text-bottle hover:bg-panel",
  onDark: "border-on-dark/40 bg-on-dark/10 text-on-dark hover:bg-on-dark/20",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-dense",
  md: "h-10 px-4 text-ui",
  lg: "h-12 px-[22px] text-body",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra?: string,
) {
  return [BASE, VARIANTS[variant], SIZES[size], extra]
    .filter(Boolean)
    .join(" ");
}
