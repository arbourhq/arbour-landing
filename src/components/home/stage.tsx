"use client";

import { useEffect, useState } from "react";
import { Crosshair } from "lucide-react";
import { CaptureFrame } from "@/components/home/capture-frame";
import { STRIP_PX } from "@/components/home/stage-strip";
import { useBook, useReading } from "@/components/book/story";
import { Split } from "@/components/motion/split";
import type { Stage as StageContent } from "@/content/stages";

/**
 * One stage of the job, one spread of the book.
 *
 * In the book (a desktop with the 3D running) the copy is set on the
 * left-hand page: the numeral is printed on the paper, and the title and
 * the four claims stick over it while the spread holds. The claims step as
 * the reader scrolls through the hold, one opening at a time, the way a
 * finger runs down a page; the screen on the right-hand page is the real
 * one, handed over to HTML at rest, playing its recording.
 *
 * Everywhere else (a phone's band, reduced motion, no WebGL) the stage is
 * a row of the sheet: the numeral and title, all four claims, and the same
 * screen in its frame.
 *
 * Either way a claim the screen can show points at it: hovering it, or
 * focusing or pressing its crosshair, holds the recording on its poster and
 * rings the regions it means in Sprout, zooming in on them. A claim the
 * screen cannot show has no crosshair.
 */

/** A phone: the claims sit under the frame, maybe off screen. */
function bringScreenIntoView(target: HTMLElement | null) {
  if (!target || window.matchMedia("(min-width: 1024px)").matches) return;
  const frame = target
    .closest("section")
    ?.querySelector<HTMLElement>("[data-frame]");
  if (!frame) return;
  const nav = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
  );
  const gap = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-gap"),
  );
  const clear = (nav || 56) + (gap || 12) * 2;
  const foot = window.innerHeight - STRIP_PX - (gap || 12) * 2;
  const box = frame.getBoundingClientRect();
  if (box.top >= clear && box.bottom <= foot) return;
  frame.scrollIntoView({ block: "start" });
}

export function Stage({
  stage,
  index,
}: {
  stage: StageContent;
  index: number;
}) {
  const { mode } = useBook();
  const { stage: resting, claim, point } = useReading();
  const flip = index % 2 === 1;
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = hovered ?? pinned;
  const highlight =
    active === null ? null : (stage.facts[active].regions ?? null);
  // The claim open on the page: the one pointed at, or the one the scroll is on.
  const open = active ?? (resting === index ? claim : 0);

  useEffect(() => {
    if (mode === "3d") point(index, highlight);
  }, [mode, index, highlight, point]);

  return (
    <section
      id={`stage-${stage.id}`}
      aria-labelledby={`stage-${stage.id}-title`}
      data-flip={flip ? "" : undefined}
      className="ruled develop-rule stage-row"
      style={{ "--claims": stage.facts.length } as React.CSSProperties}
    >
      <div className="sheet stage-sheet">
        <div data-turn aria-hidden="true" className="stage-turn" />
        <div className="stage-grid">
          <div data-copy className="stage-copy">
            <div data-reveal className="stage-head">
              <span
                aria-hidden="true"
                className="stage-numeral split-word headline tabular-nums"
              >
                {stage.index}
              </span>
              <h2
                id={`stage-${stage.id}-title`}
                className="stage-title headline m-0"
              >
                <span className="sr-only">
                  Stage {stage.index}, {stage.name}.{" "}
                </span>
                <Split text={stage.title} from={1} />
              </h2>
            </div>
            <ul className="stage-claims m-0 list-none p-0">
              {stage.facts.map((fact, i) => {
                const linked = Boolean(fact.regions?.length);
                return (
                  <li
                    key={fact.label}
                    data-open={open === i ? "true" : "false"}
                    data-pointed={linked && active === i ? "true" : "false"}
                    onPointerEnter={
                      linked
                        ? (event) =>
                            event.pointerType === "mouse" && setHovered(i)
                        : undefined
                    }
                    onPointerLeave={linked ? () => setHovered(null) : undefined}
                    className="stage-claim develop"
                    style={
                      {
                        "--develop-at": `${4 + i * 1.5}%`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="claim-label m-0">{fact.label}</h3>
                      {linked ? (
                        <button
                          type="button"
                          aria-pressed={pinned === i}
                          aria-label={`Show on the screen: ${fact.label}`}
                          title="Show on the screen"
                          onClick={(event) => {
                            const next = pinned === i ? null : i;
                            setPinned(next);
                            if (next !== null)
                              bringScreenIntoView(event.currentTarget);
                          }}
                          onFocus={() => setHovered(i)}
                          onBlur={() => setHovered(null)}
                          className="claim-point"
                        >
                          <Crosshair aria-hidden className="size-4" />
                        </button>
                      ) : null}
                    </div>
                    <div className="claim-body">
                      <p className="m-0">{fact.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-frame className="stage-frame">
            <CaptureFrame
              capture={stage.capture}
              focus={stage.focus}
              highlight={highlight}
              sizes="(max-width: 640px) 300vw, (max-width: 1024px) calc(100vw - 96px), 800px"
              caption={`Real screen, seed data · ${stage.name}`}
              figure={`Fig. ${stage.index}`}
            />
          </div>
        </div>
        {/* In the book the screen is drawn on the page and handed to a
            decorative plate; its description stays here as text. */}
        <p className="book-only sr-only">
          Real screen, seed data: {stage.capture.alt}
        </p>
        <div data-hold aria-hidden="true" className="stage-hold" />
      </div>
    </section>
  );
}
