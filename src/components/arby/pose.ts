import type { ReactNode } from "react";

/**
 * One of Arby's poses: the console's master artwork regrouped so its parts can
 * move, vendored from arbourhq/arbour (`packages/ui/src/components/arby`).
 * Each lives in `./poses/<name>.tsx` and is imported by the section that shows
 * it, so the page ships only the birds it uses. `render` takes an instance id
 * so a pose that carries a clip path (peeking) never shares a `url(#…)` with
 * another bird on the page.
 */
export type ArbyPoseName =
  | "standing"
  | "waving"
  | "sleeping"
  | "concerned"
  | "flying"
  | "celebrating"
  | "laptop"
  | "magnifying-glass"
  | "peeking"
  | "laughing"
  | "perched"
  | "sunglasses";

export interface ArbyPoseArtwork {
  name: ArbyPoseName;
  render: (id: string) => ReactNode;
}
