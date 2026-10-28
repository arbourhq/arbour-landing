"use client";

import { useEffect, useRef, useState } from "react";
import { STAGES } from "@/content/stages";

/**
 * The record's progress, lifted from the header of a booking in the console:
 * five mono stage names joined by hairlines, a dot in front of each. A stage
 * the reader has passed fills Sprout and so does the hairline after it; the
 * stage under the reader sits in a Bottle chip, as the current stage does on
 * a booking. One record, moving through its stages as the page scrolls.
 *
 * It docks at the foot of the window, floating chrome with the lifted shadow,
 * so the nav stays the only bar at the top. It lifts in as stage 01 arrives
 * and glides away once the last stage is mostly read; while it is away it is
 * inert, so it is never tabbed into unseen. A stage is current once its top
 * passes 40% of the window, or the nav's foot when a link lands on it.
 */

/** The bar's height. A recording brought into view on a phone clears it. */
export const STRIP_PX = 48;

function cssPx(name: string, fallback: number) {
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );
  return Number.isNaN(value) ? fallback : value;
}

function jump(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(`stage-${id}`);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#stage-${id}`);
}

export function StageStrip() {
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let current = -2;
    let wasShown: boolean | null = null;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const nav = cssPx("--nav-h", 56);
      const gap = cssPx("--nav-gap", 12);
      const line = Math.max(nav + gap * 2 + 24, vh * 0.4);

      let next = -1;
      for (let i = 0; i < STAGES.length; i++) {
        const stage = document.getElementById(`stage-${STAGES[i].id}`);
        if (stage && stage.getBoundingClientRect().top <= line) next = i;
      }
      if (next !== current) {
        current = next;
        setActive(next);
      }

      // In while the board fills the window: from stage 01's heading coming
      // up past the dock to the last stage's foot clearing the middle.
      const board = box.current?.parentElement?.getBoundingClientRect();
      const isShown = board
        ? board.top < vh * 0.7 && board.bottom > vh * 0.45
        : false;
      if (isShown !== wasShown) {
        wasShown = isShown;
        setShown(isShown);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={box}
      data-arby-avoid
      data-shown={shown}
      inert={!shown}
      className="stage-dock pointer-events-none fixed inset-x-0 z-40"
      style={{ bottom: "max(var(--nav-gap), env(safe-area-inset-bottom))" }}
    >
      <nav
        aria-label="Stages"
        className="sheet-frame pointer-events-auto sm:px-5 lg:px-8"
      >
        <ol
          className="m-0 flex list-none items-center rounded-md border border-line bg-page px-2 shadow-lifted sm:px-3"
          style={{ height: STRIP_PX }}
        >
          {STAGES.map((stage, i) => {
            const current = i === active;
            const passed = i < active;
            // On a phone only the current stage carries its name; before
            // stage 01 is current, the first one does so the dock still reads.
            const named = current || (active === -1 && i === 0);
            return (
              <li
                key={stage.id}
                className={`flex min-w-0 items-center ${i < STAGES.length - 1 ? "flex-1 max-lg:flex-auto" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <a
                  href={`#stage-${stage.id}`}
                  onClick={(event) => jump(event, stage.id)}
                  aria-current={current ? "step" : undefined}
                  className={`flex shrink-0 items-center gap-2 rounded-sm px-2 py-1.5 transition-colors duration-[var(--duration-base)] max-lg:min-h-11 max-lg:min-w-11 ${
                    current
                      ? "bg-bottle text-on-dark"
                      : passed
                        ? "text-ink hover:bg-panel"
                        : "text-ink-muted hover:bg-panel hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full ${
                      current || passed
                        ? "animate-bloom bg-sprout"
                        : "border-[1.5px] border-ink-faint"
                    }`}
                  />
                  <span
                    className={`mono-eyebrow whitespace-nowrap ${named ? "" : "sr-only lg:not-sr-only"}`}
                  >
                    <span className="lg:hidden">{stage.short}</span>
                    <span className="hidden lg:inline">{stage.name}</span>
                  </span>
                  <span className="sr-only">
                    {passed ? ", passed" : current ? ", you are here" : ""}
                  </span>
                </a>
                {i < STAGES.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="relative h-px min-w-0 flex-1 overflow-hidden bg-line sm:mx-3 sm:min-w-3"
                  >
                    <span
                      className="absolute inset-0 origin-left bg-sprout transition-transform duration-[320ms] ease-glide motion-reduce:transition-none"
                      style={{ transform: `scaleX(${i < active ? 1 : 0})` }}
                    />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
