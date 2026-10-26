"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

/**
 * The overview's "Needs you" block, drawn from the console's own words and
 * badge tones (packages/core/src/overview.ts): a heading per kind of work
 * waiting on a person, with its count beside it. When the block comes into
 * view the counts run down, a row leaves the moment its count reaches zero,
 * and the block ends on the empty state the console shows on that day.
 * Which is the paragraph beside it, demonstrated.
 *
 * Illustrative counts, labelled. Reduced motion skips straight to the clear
 * desk; "Run it again" replays for anyone who wants the before.
 */

type Tone = "danger" | "info" | "warning";

const START: { label: string; tone: Tone; count: number }[] = [
  { label: "Enquiries waiting on a reply", tone: "danger", count: 5 },
  { label: "Contracts out for signature", tone: "info", count: 2 },
  { label: "Run sheets due", tone: "warning", count: 3 },
  { label: "Overdue invoices", tone: "danger", count: 1 },
];

const BADGE: Record<Tone, string> = {
  danger: "bg-coral-wash text-coral-ink",
  info: "bg-cornflower-wash text-cornflower-ink",
  warning: "bg-ochre-wash text-ochre-ink",
};

const STEP_MS = 340;

export function NeedsYou() {
  const [counts, setCounts] = useState(() => START.map((row) => row.count));
  const [run, setRun] = useState(0);
  const box = useRef<HTMLElement>(null);
  const clear = counts.every((count) => count === 0);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(START.map(() => 0));
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = () => {
      setCounts((prev) => {
        // One at a time, top to bottom, the way a morning goes.
        const i = prev.findIndex((count) => count > 0);
        if (i === -1) return prev;
        const next = [...prev];
        next[i] -= 1;
        return next;
      });
      timer = setTimeout(tick, STEP_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(tick, 600);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [run]);

  return (
    <figure
      ref={box}
      className="m-0 rounded-md border border-border-default bg-page"
    >
      <figcaption className="sr-only">
        The console&rsquo;s Needs you block, with illustrative counts
      </figcaption>
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-1">
        <p className="mono-eyebrow m-0 text-ink-muted">Needs you</p>
        <span className="mono-label rounded-sm bg-panel px-2 py-1.5 text-ink-secondary">
          Illustrative
        </span>
      </div>

      <ul className="m-0 list-none px-5 py-0">
        {START.map((row, i) => {
          const gone = counts[i] === 0;
          return (
            <li
              key={row.label}
              aria-hidden={gone}
              className={`grid transition-[grid-template-rows,opacity] duration-[320ms] ease-glide ${
                gone
                  ? "grid-rows-[0fr] opacity-0"
                  : "grid-rows-[1fr] opacity-100"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`flex items-center gap-2 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <span className="headline text-lead text-ink">
                    {row.label}
                  </span>
                  <span
                    key={counts[i]}
                    className={`mono-label animate-flip rounded-sm px-2 py-1 font-semibold tabular-nums ${BADGE[row.tone]}`}
                  >
                    {counts[i]}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className={`grid transition-[grid-template-rows] duration-[320ms] ease-glide ${
          clear ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pt-2 pb-5">
            <div
              className={`flex flex-col items-start gap-2 rounded-md border border-dashed border-line p-6 ${
                clear ? "animate-pop-in" : ""
              }`}
            >
              <p className="headline m-0 text-title text-ink">
                Nothing needs you
              </p>
              <p className="m-0 max-w-[46ch] text-body text-ink-secondary">
                Enjoy it while it lasts. The moment an enquiry lands or an
                invoice runs late, it turns up here first.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCounts(START.map((row) => row.count));
                  setRun((n) => n + 1);
                }}
                className={buttonClass("ghost", "sm", "-ml-2 mt-1")}
              >
                <RotateCcw aria-hidden />
                Run it again
              </button>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
