"use client";

import { useEffect, useRef, useState } from "react";
import { STAGES, type Accent } from "@/content/stages";

/**
 * The board's column headers. Five cells straight under the hero, then
 * sticky under the nav for the length of the five stage floods. The
 * cell under the reader inverts to Bottle with the stage's accent as an
 * inset bottom edge; the others lift on hover.
 *
 * Active is decided on scroll rather than by IntersectionObserver so the
 * hand-off happens exactly as a stage's top passes the rail, not somewhere
 * in the middle of the flood before it. Written to state only when it
 * changes, so scrolling does not re-render the rail every frame. The rail
 * is one height in both places; a rail that changed size as it stuck moved
 * its own top edge and flickered.
 */

/** One height everywhere; the stages clear it with a constant scroll margin. */
export const RAIL_PX = 64;

/** The active cell's inset bottom edge, in the stage's own accent. */
const ACTIVE_EDGE: Record<Accent, string> = {
  cornflower: "shadow-[inset_0_-4px_0_var(--color-cornflower)]",
  lilac: "shadow-[inset_0_-4px_0_var(--color-lilac)]",
  acid: "shadow-[inset_0_-4px_0_var(--color-acid)]",
  coral: "shadow-[inset_0_-4px_0_var(--color-coral)]",
};

function navHeight() {
  const nav = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
  );
  return Number.isNaN(nav) ? 70 : nav;
}

function jump(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(`stage-${id}`);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#stage-${id}`);
}

export function StageRail() {
  const [active, setActive] = useState(-1);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let current = -2;
    const update = () => {
      frame = 0;
      const line = navHeight() + RAIL_PX + 1;
      let next = -1;
      for (let i = 0; i < STAGES.length; i++) {
        const stage = document.getElementById(`stage-${STAGES[i].id}`);
        if (stage && stage.getBoundingClientRect().top <= line) next = i;
      }
      if (next !== current) {
        current = next;
        setActive(next);
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
      ref={bar}
      className="sticky z-40 bg-acid text-bottle shadow-[inset_0_-1px_0_rgba(11,64,48,0.3)]"
      style={{ top: "var(--nav-h, 3.5rem)", height: RAIL_PX }}
    >
      <ol
        aria-label="Stages"
        className="m-0 mx-auto grid h-full max-w-[1180px] list-none grid-cols-5 p-0 sm:px-4"
      >
        {STAGES.map((stage, i) => {
          const on = i === active;
          return (
            <li key={stage.id} className="min-w-0">
              <a
                href={`#stage-${stage.id}`}
                onClick={(event) => jump(event, stage.id)}
                aria-current={on ? "location" : undefined}
                className={`flex h-full items-center gap-2.5 px-2.5 transition-[background-color,color,transform] duration-300 ease-overshoot sm:px-4 ${
                  on
                    ? `bg-bottle text-acid ${ACTIVE_EDGE[stage.accent]}`
                    : "hover:-translate-y-[2px] hover:bg-bottle/10"
                } ${i > 0 ? "shadow-[inset_1px_0_0_rgba(11,64,48,0.25)]" : ""}`}
              >
                <span
                  className={`label-mono hidden shrink-0 sm:inline ${
                    on ? "text-acid/70" : "text-bottle/60"
                  }`}
                >
                  {stage.index}
                </span>
                <span className="truncate text-[12px] leading-none font-semibold sm:text-[15px]">
                  <span className="sm:hidden">{stage.short}</span>
                  <span className="hidden sm:inline">{stage.name}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
