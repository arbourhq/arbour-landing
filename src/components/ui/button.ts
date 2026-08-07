/**
 * Buttons are square, carry an inset bottom edge rather than a blurred shadow,
 * and lift on hover with an overshoot curve. Returned as a class string so the
 * same styling works on <button>, <a> and next/link without polymorphic props.
 */

export type ButtonVariant =
  | "acid" // on a Bottle ground
  | "bottle" // on an Acid or Cream ground
  | "outlineAcid" // on a Bottle ground
  | "outlineBottle" // on an Acid or Cream ground
  | "cream"; // on a Cornflower ground

export type ButtonSize = "sm" | "md" | "lg";

/**
 * `ui-button` carries no styling. It is the marker the custom cursor reads to
 * decide that a target is solid enough to invert its colour on, which text
 * links are not. Chip buttons that do not go through here opt in with
 * data-cursor="button" instead.
 */
const BASE =
  "ui-button inline-flex items-center justify-center gap-2 border-0 font-sans font-semibold cursor-pointer select-none " +
  "transition-transform duration-300 ease-overshoot hover:-translate-y-1 active:translate-y-0 " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const VARIANTS: Record<ButtonVariant, string> = {
  acid: "bg-acid text-bottle shadow-[inset_0_-4px_0_rgba(11,64,48,0.5)]",
  bottle: "bg-bottle text-acid shadow-[inset_0_-4px_0_rgba(0,0,0,0.45)]",
  outlineAcid: "bg-transparent text-acid shadow-[inset_0_0_0_2px_#C6FF3D]",
  outlineBottle: "bg-transparent text-bottle shadow-[inset_0_0_0_2px_#0B4030]",
  cream: "bg-cream text-cornflower shadow-[inset_0_-4px_0_rgba(11,64,48,0.35)]",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-[11px] text-sm",
  md: "px-6 py-4 text-[15px]",
  lg: "px-7 py-[17px] text-base sm:text-[17px]",
};

export function buttonClass(
  variant: ButtonVariant = "acid",
  size: ButtonSize = "md",
  extra?: string,
) {
  return [BASE, VARIANTS[variant], SIZES[size], extra]
    .filter(Boolean)
    .join(" ");
}
