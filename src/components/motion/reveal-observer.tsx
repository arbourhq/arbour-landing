"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The one observer behind every `data-reveal` on the site: it marks each
 * trigger `data-shown` the first time it is a little way on screen, then lets
 * it go. Runs again on every route change, so a client-side navigation finds
 * the new page's triggers. Anyone without IntersectionObserver sees
 * everything at once.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-shown])",
    );
    if (typeof IntersectionObserver === "undefined") {
      for (const el of pending) el.dataset.shown = "";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of pending) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
