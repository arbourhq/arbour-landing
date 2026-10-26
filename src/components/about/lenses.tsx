"use client";

import Image from "next/image";
import { useState } from "react";
import { Scramble } from "@/components/motion/scramble";
import { Split } from "@/components/motion/split";
import { FOUNDERS, LENSES } from "@/content/about";

/**
 * The two answers to "what is a wedding". The switch sits in the heading
 * row, away from the answer it changes: the console's segmented control, a
 * sunken Panel track with a white thumb that slides between the two on the
 * overshoot curve, each segment carrying the face of the person answering.
 * Under a cell rule, the panel is two cells of the sheet: the answer on a
 * Bottle block, signed at its foot, and what it taught Arbour as a ruled
 * list beside it.
 *
 * The answer is keyed on the lens, so once the panel has revealed, a switch
 * replays it: the block wipes up, the headline sets in word by word, the
 * body and the lessons rise after it, and the signature decodes.
 *
 * Arrows move between tabs and only the active tab sits in the Tab order;
 * selection follows focus.
 */
export function Lenses() {
  const [active, setActive] = useState(0);
  const lens = LENSES[active];

  function onKey(event: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const step: Record<string, number | undefined> = {
      ArrowRight: i + 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: LENSES.length - 1,
    };
    const target = step[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + LENSES.length) % LENSES.length;
    setActive(next);
    document.getElementById(`lens-tab-${next}`)?.focus();
  }

  return (
    <>
      <div
        data-reveal
        className="grid gap-x-12 gap-y-6 px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:grid-cols-12 lg:items-end lg:px-12"
      >
        {/* Wide enough to hold the line on one row at the cap; at 22ch it
            cut after "wedding" and stranded "is." on its own. */}
        <h2
          id="brains-title"
          className="headline m-0 max-w-[20ch] text-headline text-ink lg:col-span-7"
        >
          <Split text="Ask each of us what a wedding is." />
        </h2>
        <div
          className="reveal-rise flex flex-col items-start gap-5 lg:col-span-5"
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          <p className="m-0 max-w-[44ch] text-lead text-ink-secondary">
            You get two completely different answers, and Arbour needed both of
            them. Flip it.
          </p>
          <div
            role="tablist"
            aria-label="Two answers"
            className="relative grid w-full max-w-[26rem] grid-cols-2 gap-[3px] rounded-md bg-panel-hover p-1"
          >
            {/* The thumb: one white tile under the chosen segment. */}
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-5.5px)] rounded-sm bg-page shadow-thumb transition-transform duration-[var(--duration-pop)] ease-overshoot motion-reduce:transition-none"
              style={{
                transform: `translateX(calc(${active * 100}% + ${active * 3}px))`,
              }}
            />
            {LENSES.map((item, i) => {
              const on = active === i;
              const face = FOUNDERS[i];
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`lens-tab-${i}`}
                  aria-selected={on}
                  aria-controls="lens-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(event) => onKey(event, i)}
                  className={`relative flex min-h-11 items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-left transition-colors duration-[var(--duration-base)] ${
                    on ? "text-ink" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {face?.photo ? (
                    <Image
                      src={face.photo}
                      alt=""
                      width={56}
                      height={56}
                      className={`size-7 shrink-0 rounded-full bg-bottle object-cover transition-[filter,transform] duration-[var(--duration-pop)] ease-overshoot ${
                        on ? "scale-100" : "scale-90 grayscale"
                      }`}
                    />
                  ) : null}
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-ui font-semibold">
                      {item.tab}
                    </span>
                    <span className="mono-label text-ink-muted">
                      {face?.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        id="lens-panel"
        role="tabpanel"
        aria-labelledby={`lens-tab-${active}`}
        data-reveal
        className="cell-rule-t grid lg:grid-cols-12"
      >
        <div
          key={lens.id}
          className="reveal-wipe flex min-h-[26rem] flex-col gap-5 bg-bottle px-5 py-10 text-on-dark sm:px-8 lg:col-span-7 lg:px-12 lg:py-12"
        >
          <p className="headline m-0 max-w-[18ch] text-[clamp(1.75rem,1.1rem+2vw,2.5rem)] leading-[0.98] text-on-dark">
            <Split text={lens.headline} />
          </p>
          <p
            className="reveal-rise m-0 max-w-[50ch] text-lead text-on-dark/75"
            style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
          >
            {lens.body}
          </p>
          {/* Who said it, and where they were standing: a caption at the
              foot of the answer, never a label above its headline. */}
          <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-on-dark/15 pt-4">
            <Scramble text={lens.sign} className="mono-label m-0 text-sprout" />
            <Scramble
              text={lens.tag}
              delay={160}
              className="mono-label m-0 text-on-dark/60"
            />
          </div>
        </div>

        <div className="px-5 py-10 sm:px-8 lg:col-span-5 lg:border-l lg:border-rule lg:px-10 lg:py-12">
          <p className="mono-eyebrow m-0 mb-3 text-ink-muted">
            What that taught Arbour
          </p>
          <ul key={lens.id} className="m-0 list-none p-0">
            {lens.lessons.map((lesson, i) => (
              <li
                key={lesson}
                className="reveal-rise flex items-baseline gap-4 border-t border-line py-4 text-body text-ink"
                style={
                  {
                    "--reveal-delay": `${200 + i * 80}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="mono-label shrink-0 text-ink-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
