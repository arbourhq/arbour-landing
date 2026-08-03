/**
 * FIXED. Do not redesign.
 *
 * An open "A" with no crossbar (it reads as a triangular wedding arbour)
 * followed by RBOUR in Bricolage Grotesque 800, all caps, +0.04em tracking.
 * The A sits at 0.66em on the baseline with about 0.04em of right margin.
 *
 * The apex is FLAT, and the viewBox is what makes it flat: it starts at y=372
 * while the apex vertex is at y=383, so the top edge of the viewport cuts the
 * join off 11 units above the vertex. Only the feet are round. Do not raise
 * the top of the viewBox, and do not re-frame this path into a larger box
 * without clipping at y=372, or the A grows a dome it has never had.
 *
 * Valid grounds: Acid with a Bottle mark, Bottle with an Acid mark, Cream with
 * a Bottle mark. Never on a photograph, never outlined, never with a crossbar.
 */

import Image from "next/image";

export function ArbourA({ className }: { className?: string }) {
  return (
    <svg
      viewBox="333 372 528 494"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M394 805 L595 383 L796 805"
        fill="none"
        stroke="currentColor"
        strokeWidth="122"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The full wordmark is the supplied Acid artwork, not live type, so it is
 * always the same drawing at every size. The PNG is trimmed to the cap height,
 * so the mark is set at 0.72em (Bricolage cap height) of whatever font-size the
 * caller passes. Sizing therefore still works the way it always has: give it a
 * text-[nn] class and the mark scales with it.
 *
 * The artwork is Acid, which fixes the colour: it belongs on Bottle. A caller
 * cannot recolour it with a text-* class.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline leading-none ${className ?? ""}`}
    >
      <Image
        src="/arbour-wordmark-acid.png"
        alt="Arbour"
        width={2400}
        height={411}
        priority
        className="h-[0.72em] w-auto"
      />
    </span>
  );
}
