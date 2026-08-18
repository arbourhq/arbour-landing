"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 0 to 1 once the node is on screen, held at 1 for reduced motion and for
 * anyone without IntersectionObserver.
 *
 * Shared so every count on the page behaves the same way: numbers on this site
 * tally up as they arrive, whether they are the build scope columns or the
 * pipeline stage counts.
 */
export function useTally(duration = 1100) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      setProgress(1);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration]);

  return { ref, progress };
}
