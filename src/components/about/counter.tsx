"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_STATS } from "@/content/about";

/**
 * Counts up once the band is on screen. Anyone without IntersectionObserver, or
 * with reduced motion, sees the final numbers immediately.
 */
export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
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
          const duration = 1400;
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) frame = requestAnimationFrame(step);
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="on-dark bg-bottle px-6 py-20 text-cream sm:px-10 sm:py-22"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-9 lg:grid-cols-4">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-[clamp(40px,7vw,72px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-acid">
              {Math.round(stat.value * progress)}
              {stat.suffix}
            </div>
            <div className="label-mono mt-2.5 text-[10px] opacity-80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
