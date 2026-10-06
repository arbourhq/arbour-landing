"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution";

/**
 * Records first-touch campaign attribution on whichever page someone lands on.
 * Independent of the Meta Pixel: it runs whether or not that is configured.
 */
export function AttributionCapture() {
  useEffect(() => {
    try {
      captureFirstTouch();
    } catch {
      // A sandboxed frame can throw on document.cookie. Attribution is never
      // worth breaking the page over.
    }
  }, []);

  return null;
}
