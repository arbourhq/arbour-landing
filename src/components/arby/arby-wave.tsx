import { waving } from "./poses/waving";
import "./arby-wave.css";

/**
 * Arby, waving hello, drawn the way the console kit draws a pose: the
 * master on the kit's 480 canvas, hopping in on the overshoot curve once the
 * headline beside it has landed, then the kit's own idle (three rocks at the
 * shoulder, the strokes pulsing in step, a lean toward the wave).
 *
 * Master colours, on white, decorative: the headline beside it carries the
 * moment, so it is hidden from assistive tech.
 */
export function ArbyWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      data-arby="waving"
      className={`arby-wave shrink-0 select-none ${className ?? ""}`}
    >
      {/* The masters' shared placement: a 1000-unit bird on the 480 canvas. */}
      <g transform="translate(30 20) scale(.42)">{waving.render("about")}</g>
    </svg>
  );
}
