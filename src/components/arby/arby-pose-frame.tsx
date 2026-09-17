"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { ArbyPoseName } from "./pose";

/**
 * The `<svg>` around a pose, and the one piece of Arby that needs a browser:
 * an IntersectionObserver that marks the bird entered the first time it
 * scrolls into view (the entrance pop hangs off `data-entered`, so it plays
 * where someone can see it rather than at page load three screens up) and
 * sets `data-idle` only while it stays in view, so the idle loops in
 * globals.css stop when it scrolls away. Without an observer the bird simply
 * shows, the way Reveal does.
 */
export function ArbyPoseFrame({
  pose,
  idle,
  title,
  delay,
  className,
  children,
}: {
  pose: ArbyPoseName;
  idle: boolean;
  title: string | undefined;
  /** Milliseconds before the entrance, for a section whose own beat comes first. */
  delay: number | undefined;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [entered, setEntered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setEntered(true);
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setEntered(true);
      setInView(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style =
    delay === undefined
      ? undefined
      : ({ "--arby-delay": `${delay}ms` } as CSSProperties);

  return (
    <svg
      ref={ref}
      viewBox="0 0 480 480"
      fill="none"
      data-arby={pose}
      data-entered={entered ? "" : undefined}
      data-idle={idle && inView ? "" : undefined}
      className={className}
      style={style}
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": true })}
    >
      {/* The masters' shared placement: a 1000-unit bird on the 480 canvas. */}
      <g transform="translate(30 20) scale(.42)">{children}</g>
    </svg>
  );
}
