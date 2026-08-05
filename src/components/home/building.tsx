"use client";

import { useEffect, useRef, useState } from "react";
import { BUILD_SCOPE, STATUS_LABELS } from "@/content/build-scope";
import { Reveal } from "@/components/reveal";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";

/**
 * Replaces the design bundle's usage stats ("4,200 weddings run on Arbour") and
 * its customer quote. Arbour has no customers, so it claims scope instead of
 * traction: what is in the first release, what follows, what is refused.
 *
 * The section reads as a ledger and has to behave like one. Each column tallies
 * its own count on the way in, and every line answers to the cursor: the row
 * floods Bottle, the marker turns on its corner, the whole thing shifts across.
 * Motion is decoration here, so a row is not a control and takes no focus.
 *
 * Items render a status chip only once one is set in content/build-scope.ts.
 */

/** One per column, in order. The square is the only ambient motion. */
const CHIPS = [
  "animate-drop origin-bottom",
  "animate-unfold origin-left",
  "animate-squash origin-bottom",
];

/**
 * 0 to 1 once the node is on screen, held at 1 for reduced motion and for
 * anyone without IntersectionObserver.
 */
function useTally(duration = 1100) {
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

export function Building() {
  const { ref, progress } = useTally();

  return (
    <section
      id="building"
      className="bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="eyebrow mb-5 opacity-60">04 · What we are building</p>
          <h2 className="m-0 mb-3.5 max-w-[22ch] font-display text-[clamp(34px,6.5vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-bottle">
            No customers yet. Here is the plan instead.
          </h2>
          <p className="m-0 mb-12 max-w-[58ch] text-[17px] leading-relaxed sm:text-lg">
            Most software sites at this stage show a number they made up. This
            is the actual scope: what opening day includes, what comes straight
            after, and what Arbour is not going to do. Better you find out now
            than in month two.
          </p>
        </Reveal>

        <div ref={ref} className="grid gap-px bg-bottle/25 lg:grid-cols-3">
          {BUILD_SCOPE.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.07}>
              <div className="flex h-full flex-col bg-acid p-7">
                <div className="flex items-center gap-3">
                  <span
                    className={`block h-[18px] w-[18px] shrink-0 bg-bottle ${CHIPS[i]}`}
                  />
                  <p className="label-mono opacity-55">{group.index}</p>
                  <span
                    className="ml-auto font-display text-[34px] leading-none font-extrabold tracking-[-0.04em] tabular-nums"
                    aria-hidden="true"
                  >
                    {Math.round(group.items.length * progress)}
                  </span>
                </div>

                <h3 className="m-0 mt-5 font-display text-[28px] leading-none font-extrabold tracking-[-0.03em] text-bottle">
                  {group.title}
                </h3>
                <p className="mt-3 mb-6 text-[15px] leading-relaxed opacity-80">
                  {group.blurb}
                </p>

                <ul className="m-0 grid list-none gap-0 p-0">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className="group/item -mx-3 border-t border-dashed border-bottle/30 px-3 transition-[transform,background-color,color] duration-300 ease-overshoot hover:translate-x-1 hover:border-transparent hover:bg-bottle hover:text-acid"
                    >
                      <div className="py-3.5">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span
                            aria-hidden="true"
                            className="block h-[9px] w-[9px] shrink-0 bg-bottle transition-transform duration-300 ease-overshoot group-hover/item:scale-125 group-hover/item:rotate-45 group-hover/item:bg-acid"
                          />
                          <span className="text-[16px] font-semibold">
                            {item.label}
                          </span>
                          {item.status ? (
                            <span className="label-mono bg-bottle px-2 py-1 text-[8px] text-acid group-hover/item:bg-acid group-hover/item:text-bottle">
                              {STATUS_LABELS[item.status]}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 pl-[21px] text-[14px] leading-snug opacity-75">
                          {item.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="on-dark mt-px flex flex-wrap items-center gap-6 bg-bottle p-8 text-cream">
          <span className="block h-7 w-7 shrink-0 animate-pop bg-acid" />
          <p className="m-0 max-w-[62ch] text-[17px] leading-relaxed">
            When that first list is genuinely good enough to run a season on,
            the waitlist hears before anyone else, in the order people joined.
          </p>
          <div className="ml-auto">
            <WaitlistButton variant="acid" size="md">
              Join the waitlist
            </WaitlistButton>
          </div>
        </div>
      </div>
    </section>
  );
}
