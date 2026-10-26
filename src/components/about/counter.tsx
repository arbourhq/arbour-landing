"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_STATS } from "@/content/about";

/**
 * The three numbers as the console's report legend: a ruled description list,
 * the label left in Ink secondary, the figure right in Bricolage 800 with
 * tabular figures, each row at least 56px so the rules sit level. The figures
 * count up once when the legend comes on screen; anyone without
 * IntersectionObserver, or with reduced motion, sees the final numbers.
 */
export function AboutStats() {
  const ref = useRef<HTMLDListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
          const duration = 1100;
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <dl ref={ref} className="m-0">
      {ABOUT_STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex min-h-14 items-baseline justify-between gap-6 py-4 ${
            i > 0 ? "border-t border-line" : ""
          }`}
        >
          <dt className="text-ui text-ink-secondary">{stat.label}</dt>
          <dd className="headline m-0 text-display text-ink tabular-nums">
            {Math.round(stat.value * progress)}
            {stat.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
