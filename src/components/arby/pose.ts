import type { ReactNode } from "react";

/** Fixed master artwork vendored from the platform kit. Never recolour. */
export interface ArbyPoseArtwork {
  name: "standing" | "flying" | "waving";
  render: (id: string) => ReactNode;
}
