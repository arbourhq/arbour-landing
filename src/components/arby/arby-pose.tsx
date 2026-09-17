import { useId } from "react";
import { ArbyPoseFrame } from "./arby-pose-frame";
import type { ArbyPoseArtwork } from "./pose";

/**
 * Arby, the kookaburra: the console's mascot, on this site at the two moments
 * the page borrows the product's voice (the Arby block under "Nothing needs
 * you" and the sign-off). The artwork, its grouping and its motion are the
 * console's, vendored from arbourhq/arbour (`packages/ui/src/components/arby`)
 * and driven by the `arby-*` rules in globals.css against the `data-part`
 * groups each pose carries. Refresh the poses from that repo; never redraw
 * them here.
 *
 * Master colours, never the site's. The bird's lime is artwork, not a
 * marketing green, and its cream body vanishes on Acid, Bottle and Cream, so
 * it always stands in a Bottle-wash panel rather than on the section itself
 * (docs/brand.md, section 4).
 *
 * Motion is the console's: one pop on the overshoot curve the first time the
 * bird scrolls into view, then a slow idle on its own parts that runs only
 * while it is on screen. Decorative by default; `title` names it as an image
 * where nothing beside it says who this is. `idle={false}` parks the pose on
 * its rest frame after the pop. `delay` holds the pop back so a section's own
 * reveal can land first.
 *
 * This module carries no directive, so it renders wherever it is imported
 * (today, from the client sections that show it); only the frame needs the
 * browser. The artwork is rendered here rather than handed to the frame,
 * because a pose module is an object with a render function and a function
 * cannot cross a server-to-client boundary as a prop.
 */

/**
 * Four steps, a fixed square box on the shared 480 canvas so the feet land at
 * the same point whichever pose is in it and nothing shifts on load.
 */
const SIZES = {
  sm: "size-24",
  md: "size-32",
  lg: "size-48",
  xl: "size-72",
} as const;

export type ArbyPoseSize = keyof typeof SIZES;

export function ArbyPose({
  pose,
  size = "md",
  title,
  idle = true,
  delay,
  className,
}: {
  pose: ArbyPoseArtwork;
  size?: ArbyPoseSize;
  /** The accessible name. Omit it when the copy beside the bird already carries the moment. */
  title?: string;
  /** The idle loops, on by default. Off parks the pose on its rest frame after the entrance. */
  idle?: boolean;
  /** Milliseconds before the entrance, for a section whose own beat comes first. */
  delay?: number;
  className?: string;
}) {
  // Only a clip path needs it, but every pose gets one so a pose can gain a
  // clip without every call site changing. Stripped to what a url(#…) can
  // carry without quoting.
  const id = `arby-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <ArbyPoseFrame
      pose={pose.name}
      idle={idle}
      title={title}
      delay={delay}
      className={`shrink-0 select-none ${SIZES[size]} ${className ?? ""}`}
    >
      {pose.render(id)}
    </ArbyPoseFrame>
  );
}
