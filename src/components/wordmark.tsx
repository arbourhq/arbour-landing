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

// oxlint-disable jsx-a11y/prefer-tag-over-role -- half the mark is live text,
// so it cannot be an <img>.

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

export function Wordmark({ className }: { className?: string }) {
  return (
    // The A is drawn, not typed, so the mark needs its own accessible name.
    <span
      role="img"
      aria-label="Arbour"
      className={`inline-flex items-baseline font-display font-extrabold leading-none tracking-[0.04em] ${className ?? ""}`}
    >
      <ArbourA className="mr-[0.04em] h-[0.66em] w-auto self-baseline" />
      <span aria-hidden="true">RBOUR</span>
    </span>
  );
}
