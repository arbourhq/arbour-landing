"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts a block in as it enters the viewport. Content is visible from
 * the start for anyone without IntersectionObserver, and the transition is
 * neutralised entirely under prefers-reduced-motion by globals.css.
 *
 * 320ms and a 4px lift, not the 700ms and 32px it started at. The brand's
 * motion is 260 to 320ms, "confident and slightly cartoon, never slow or
 * cinematic", and a staggered grid of 700ms reveals took most of a second to
 * settle. Keep any stagger passed in around 0.04s for the same reason.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[320ms] ease-overshoot ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className ?? ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
