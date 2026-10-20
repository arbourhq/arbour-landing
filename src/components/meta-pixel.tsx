"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The Meta Pixel, loaded from bundled code rather than Meta's inline snippet.
 * Unset NEXT_PUBLIC_META_PIXEL_ID (local, previews) and every helper here is a
 * silent no-op, so dev machines never report to the production dataset.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js";

export type MetaEventParams = Record<string, string | number | boolean>;

interface Fbq {
  (command: "init", pixelId: string): void;
  (
    command: "track",
    event: string,
    params?: MetaEventParams,
    options?: { eventID: string },
  ): void;
  /** Set by fbevents.js once it loads; until then calls wait in `queue`. */
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
}

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialised = false;

/** Meta's snippet, minus the inline script: queue calls until fbevents.js arrives. */
function ensureStub(): Fbq {
  if (window.fbq) return window.fbq;
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue.push(args);
  }) as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  // Meta's own global name, which fbevents.js looks for.
  // oxlint-disable-next-line no-underscore-dangle
  if (!window._fbq) window._fbq = fbq;
  return fbq;
}

/** Stub, init and script tag, each exactly once. Null when unconfigured. */
function ensurePixel(): Fbq | null {
  if (!PIXEL_ID) return null;
  const fbq = ensureStub();
  if (!initialised) {
    initialised = true;
    fbq("init", PIXEL_ID);
    const script = document.createElement("script");
    script.async = true;
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }
  return fbq;
}

export function trackMetaEvent(
  name: string,
  params?: MetaEventParams,
  eventId?: string,
): void {
  const fbq = ensurePixel();
  if (!fbq) return;
  if (eventId) fbq("track", name, params ?? {}, { eventID: eventId });
  else fbq("track", name, params ?? {});
}

/**
 * Fires PageView on first render and on every client-side route change. Init
 * deliberately does not fire one too, or the first load counts twice.
 */
export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    ensurePixel()?.("track", "PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;
  return (
    <noscript>
      {/* A tracking beacon, not content: next/image has nothing to optimise. */}
      {/* oxlint-disable-next-line nextjs/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
