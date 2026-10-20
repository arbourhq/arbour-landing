"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The Reddit Pixel, the Meta Pixel's twin: loaded from bundled code rather
 * than Reddit's inline snippet, on every page. Unset NEXT_PUBLIC_REDDIT_PIXEL_ID
 * (local, previews) and every helper here is a silent no-op, so dev machines
 * never report to the production pixel.
 *
 * No noscript beacon: Reddit's fallback image URL encodes the pixel id in a
 * form we cannot reproduce. No PII goes to the Pixel.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID;
const SCRIPT_SRC = "https://www.redditstatic.com/ads/pixel.js";

export type RedditEventMetadata = Record<string, string | number | boolean>;

interface Rdt {
  (command: "init", pixelId: string): void;
  (command: "track", event: string, metadata?: RedditEventMetadata): void;
  /** Set by pixel.js once it loads; until then calls wait in `callQueue`. */
  sendEvent?: (...args: unknown[]) => void;
  /** pixel.js drains this with apply, so argument arrays stand in for `arguments`. */
  callQueue: unknown[][];
}

declare global {
  interface Window {
    rdt?: Rdt;
  }
}

let initialised = false;

/** Reddit's snippet, minus the inline script: queue calls until pixel.js arrives. */
function ensureStub(): Rdt {
  if (window.rdt) return window.rdt;
  const rdt = ((...args: unknown[]) => {
    if (rdt.sendEvent) rdt.sendEvent.apply(rdt, args);
    else rdt.callQueue.push(args);
  }) as Rdt;
  rdt.callQueue = [];
  window.rdt = rdt;
  return rdt;
}

/** Stub, init and script tag, each exactly once. Null when unconfigured. */
function ensurePixel(): Rdt | null {
  if (!PIXEL_ID) return null;
  const rdt = ensureStub();
  if (!initialised) {
    initialised = true;
    rdt("init", PIXEL_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }
  return rdt;
}

export function trackRedditEvent(
  name: string,
  metadata?: RedditEventMetadata,
): void {
  const rdt = ensurePixel();
  if (!rdt) return;
  if (metadata) rdt("track", name, metadata);
  else rdt("track", name);
}

/**
 * Fires PageVisit on first render and on every client-side route change. Init
 * deliberately does not fire one too, or the first load counts twice.
 */
export function RedditPixel() {
  const pathname = usePathname();

  useEffect(() => {
    ensurePixel()?.("track", "PageVisit");
  }, [pathname]);

  return null;
}
