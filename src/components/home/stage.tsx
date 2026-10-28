"use client";

import { useRef, useState } from "react";
import { Crosshair } from "lucide-react";
import { CaptureFrame } from "@/components/home/capture-frame";
import { STRIP_PX } from "@/components/home/stage-strip";
import { Row } from "@/components/ui/row";
import { Split } from "@/components/motion/split";
import type { Stage as StageContent } from "@/content/stages";

/**
 * One stage of the record, as one row of the sheet: the stage number beside
 * its title (the number the strip carries, so it is wayfinding, not
 * decoration), then the real recording and its four claims side by side,
 * swapping sides from one stage to the next so five stages do not read as
 * one template five times.
 *
 * Every claim sits beside the screen that proves it, and a claim the screen
 * actually shows can point at it: hovering the claim, or focusing or pressing
 * its crosshair, holds the recording on its poster and rings the regions it
 * means. The claim row takes Sprout wash while it points, the console's
 * selected-row wash. A claim the screen cannot show has no crosshair rather
 * than a ring round something nearby.
 *
 * On a desktop the recording sticks in view beside a column of claims taller
 * than it. On a phone the recording shows its close-up (see CaptureFrame),
 * and the claims stack under it, so pressing a crosshair there brings the
 * recording back to just under the nav whenever any of it has scrolled
 * away, or under the stage dock: a ring nobody can see answers nothing.
 */

/** Rules between the claim cells: stacked, two by two, then one column. */
function claimRules(i: number) {
  return [
    i > 0 ? "border-t border-rule" : "",
    i === 1 ? "sm:border-t-0 sm:border-l lg:border-l-0 lg:border-t" : "",
    i === 3 ? "sm:border-l lg:border-l-0" : "",
  ].join(" ");
}

export function Stage({
  stage,
  index,
}: {
  stage: StageContent;
  /** Position on the page: 0 starts under the strip, odd rows swap sides. */
  index: number;
}) {
  const first = index === 0;
  const flip = index % 2 === 1;
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const screen = useRef<HTMLDivElement>(null);
  const active = hovered ?? pinned;

  /** Below lg the claims sit under the recording, so it may be out of view. */
  function bringScreenIntoView() {
    const el = screen.current;
    if (!el || window.matchMedia("(min-width: 1024px)").matches) return;
    const nav = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
    );
    const gap = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-gap"),
    );
    // Clear of the nav above and the stage dock below.
    const clear = (nav || 56) + (gap || 12) * 2;
    const foot = window.innerHeight - STRIP_PX - (gap || 12) * 2;
    const box = el.getBoundingClientRect();
    if (box.top >= clear && box.bottom <= foot) return;
    el.scrollIntoView({ block: "start" });
  }
  const highlight =
    active === null ? null : (stage.facts[active].regions ?? null);

  return (
    <Row
      id={`stage-${stage.id}`}
      labelledBy={`stage-${stage.id}-title`}
      still={first}
    >
      <div
        data-reveal
        className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 px-5 pt-14 pb-10 sm:gap-x-6 sm:px-8 sm:pt-20 sm:pb-12 lg:grid-cols-12 lg:px-12"
      >
        <span
          aria-hidden="true"
          className="split-word headline text-stage text-bottle tabular-nums lg:col-span-2"
        >
          {stage.index}
        </span>
        <h2
          id={`stage-${stage.id}-title`}
          className="headline m-0 max-w-[22ch] text-stage text-ink lg:col-span-10"
        >
          <span className="sr-only">
            Stage {stage.index}, {stage.name}.{" "}
          </span>
          <Split text={stage.title} from={1} />
        </h2>
      </div>

      <div className="cell-rule-t grid lg:grid-cols-12">
        <div
          className={`develop bg-panel p-3 sm:p-6 lg:col-span-8 lg:p-8 ${flip ? "lg:order-2" : ""}`}
          style={{ "--develop-at": "3%" } as React.CSSProperties}
        >
          <div
            ref={screen}
            // Where a pressed crosshair scrolls it to: under the nav.
            style={{ scrollMarginTop: 12 }}
            data-reveal
            className="reveal-wipe lg:sticky lg:top-[calc(var(--nav-h)+var(--nav-gap)*2+1.5rem)]"
          >
            <CaptureFrame
              capture={stage.capture}
              focus={stage.focus}
              highlight={highlight}
              sizes="(max-width: 640px) 300vw, (max-width: 1024px) calc(100vw - 96px), 800px"
              caption={`Screen recording, seed data · ${stage.name}`}
            />
          </div>
        </div>

        <ul
          data-arby-perch="facts"
          className={`cell-rule-t m-0 list-none p-0 sm:grid sm:grid-cols-2 lg:col-span-4 lg:block lg:border-t-0 lg:border-rule ${
            flip ? "lg:order-1 lg:border-r" : "lg:border-l"
          }`}
        >
          {stage.facts.map((fact, i) => {
            const linked = Boolean(fact.regions?.length);
            const on = linked && active === i;
            return (
              <li
                key={fact.label}
                // A mouse points by hovering; a finger points with the
                // crosshair, so a tap that moves the page cannot re-aim it.
                onPointerEnter={
                  linked
                    ? (event) => event.pointerType === "mouse" && setHovered(i)
                    : undefined
                }
                onPointerLeave={linked ? () => setHovered(null) : undefined}
                className={`develop px-5 py-6 transition-colors duration-[var(--duration-base)] sm:px-8 lg:px-6 xl:px-8 ${claimRules(i)} ${
                  on ? "bg-sprout-wash" : ""
                }`}
                style={
                  { "--develop-at": `${4 + i * 1.5}%` } as React.CSSProperties
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="m-0 text-body font-semibold text-ink">
                    {fact.label}
                  </h3>
                  {linked ? (
                    <button
                      type="button"
                      aria-pressed={pinned === i}
                      aria-label={`Show on the screen: ${fact.label}`}
                      title="Show on the screen"
                      onClick={() => {
                        const next = pinned === i ? null : i;
                        setPinned(next);
                        if (next !== null) bringScreenIntoView();
                      }}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      className="-mt-1 -mr-1.5 inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-ink-muted transition-colors duration-[var(--duration-base)] hover:bg-panel-hover hover:text-ink aria-pressed:bg-bottle aria-pressed:text-on-dark max-lg:-my-2 max-lg:-mr-2 max-lg:size-11"
                    >
                      <Crosshair aria-hidden className="size-4" />
                    </button>
                  ) : null}
                </div>
                <p className="m-0 mt-2 max-w-[52ch] text-body text-ink-secondary">
                  {fact.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Row>
  );
}
