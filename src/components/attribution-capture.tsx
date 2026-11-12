"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution";
import { captureReferralCode } from "@/lib/referral";

/**
 * Records first-touch campaign attribution and a vendor's `?ref=` referral
 * code on whichever page someone lands on. Independent of the Meta Pixel: it
 * runs whether or not that is configured.
 */
export function AttributionCapture() {
  useEffect(() => {
    // A sandboxed frame can throw on document.cookie. Neither cookie is ever
    // worth breaking the page over, and one failing never skips the other.
    try {
      captureFirstTouch();
    } catch {}
    try {
      captureReferralCode();
    } catch {}
  }, []);

  return null;
}
