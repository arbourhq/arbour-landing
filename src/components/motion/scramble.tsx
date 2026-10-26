"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A mono label that decodes into place: the characters run through the
 * label alphabet and settle left to right, the way a departures board or a
 * console readout lands. Plays the first time it comes on screen, and again
 * whenever its text changes after that. Mono only: every glyph is the same
 * width, so the label never moves while it runs.
 *
 * Screen readers get the text once, from a hidden copy, never the noise.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Scramble({
  text,
  delay = 0,
  className,
}: {
  text: string;
  /** Milliseconds before the first run, for a label that follows a headline. */
  delay?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) {
      setShown(text);
      return;
    }

    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = (wait: number) => {
      timer = setTimeout(() => {
        const start = performance.now();
        const duration = Math.min(720, 260 + text.length * 16);
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const settled = Math.floor(p * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            out +=
              i < settled || !/[a-z0-9]/i.test(ch)
                ? ch
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          setShown(out);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, wait);
    };

    let observer: IntersectionObserver | undefined;
    if (seen.current) run(0);
    else if (typeof IntersectionObserver === "undefined") setShown(text);
    else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          seen.current = true;
          run(delay);
        },
        { threshold: 0.6 },
      );
      observer.observe(el);
    }

    return () => {
      observer?.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [text, delay]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {shown}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
