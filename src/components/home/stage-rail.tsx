"use client";

import { useEffect, useRef, useState } from "react";
import { useCategory } from "@/components/category-context";
import { STAGES, type Accent } from "@/content/stages";

/**
 * The board's column headers. Two states, one element.
 *
 * At the foot of the hero it is tall: five cells, each the generic stage
 * name over the chosen category's own name for that stage, the stage's
 * accent square beside it. The hero's stacks of cards stand on these cells,
 * so the headers sit at the fold where a board's headers belong. Scroll on and it sticks
 * under the nav and squashes to the compact rail: the sub-lines fold away,
 * the cell that is under the reader inverts to Bottle with its accent as an
 * inset bottom edge.
 *
 * Active and stuck are decided on scroll rather than by IntersectionObserver
 * so the hand-off happens exactly as a stage's top passes the rail, not
 * somewhere in the middle of the flood before it. Written to state only when
 * they change, so scrolling does not re-render the rail every frame.
 *
 * The squash is visual only. The sticky wrapper keeps the tall height in the
 * layout whatever state the bar is in, because a rail that shrank in layout
 * as it stuck moved its own top edge, which un-stuck it, which grew it back:
 * it flickered between the two states for as long as the page was scrolling.
 * With the wrapper fixed, sticking moves nothing, the bar squashes inside it,
 * and the 44px under the compact bar is transparent and lets clicks through.
 */

/** The active cell's inset bottom edge, in the stage's own accent. */
const ACTIVE_EDGE: Record<Accent, string> = {
  cornflower: "shadow-[inset_0_-4px_0_var(--color-cornflower)]",
  lilac: "shadow-[inset_0_-4px_0_var(--color-lilac)]",
  acid: "shadow-[inset_0_-4px_0_var(--color-acid)]",
  coral: "shadow-[inset_0_-4px_0_var(--color-coral)]",
};

/** The accent square in the tall state. Acid on Acid needs Bottle. */
const SQUARE: Record<Accent, string> = {
  cornflower: "bg-cornflower",
  lilac: "bg-lilac",
  acid: "bg-bottle",
  coral: "bg-coral",
};

/** The tall rail's height, for the hero to subtract from the viewport. */
const TALL_PX = 96;
/** The compact bar. Also the stage sections' scroll margin, as a constant. */
export const COMPACT_PX = 52;

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
  const { category } = useCategory();
  const [active, setActive] = useState(-1);
  const [stuck, setStuck] = useState(false);
  /** Phones drop the sub-line's name, so the tall state needs less height. */
  const [tall, setTall] = useState(TALL_PX);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const sync = () => setTall(query.matches ? TALL_PX : 72);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The hero reads --rail-tall to end exactly at the fold. Stage sections
  // clear the nav through scroll-padding on <html> and the compact bar through
  // a constant scroll-margin, so a jump never has a moving target.
  useEffect(() => {
    document.documentElement.style.setProperty("--rail-tall", `${tall}px`);
  }, [tall]);

  useEffect(() => {
    let frame = 0;
    let currentActive = -2;
    let currentStuck: boolean | null = null;
    const update = () => {
      frame = 0;
      const el = bar.current;
      if (!el) return;
      const nav = navHeight();
      // The wrapper's box never changes size, so this reading cannot feed
      // back into itself.
      const isStuck = el.getBoundingClientRect().top <= nav + 1;
      const line = nav + COMPACT_PX + 1;
      let next = -1;
      for (let i = 0; i < STAGES.length; i++) {
        const stage = document.getElementById(`stage-${STAGES[i].id}`);
        if (stage && stage.getBoundingClientRect().top <= line) next = i;
      }
      if (isStuck !== currentStuck) {
        currentStuck = isStuck;
        setStuck(isStuck);
      }
      if (next !== currentActive) {
        currentActive = next;
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
      className="pointer-events-none sticky z-40"
      style={{ top: "var(--nav-h, 3.5rem)", height: tall }}
    >
      <div className="pointer-events-auto bg-acid text-bottle shadow-[inset_0_-1px_0_rgba(11,64,48,0.3)]">
        <ol
          aria-label="Stages"
          className="m-0 mx-auto grid max-w-[1180px] list-none grid-cols-5 p-0 sm:px-4"
        >
          {STAGES.map((stage, i) => {
            const on = i === active;
            return (
              <li key={stage.id} className="min-w-0">
                <a
                  href={`#stage-${stage.id}`}
                  onClick={(event) => jump(event, stage.id)}
                  aria-current={on ? "location" : undefined}
                  style={{ height: stuck ? COMPACT_PX : tall }}
                  className={`flex flex-col justify-center gap-1.5 px-2.5 py-2.5 transition-[background-color,color,height,transform] duration-300 ease-overshoot sm:px-4 ${
                    on
                      ? `bg-bottle text-acid ${ACTIVE_EDGE[stage.accent]}`
                      : "hover:-translate-y-[2px] hover:bg-bottle/10"
                  } ${i > 0 ? "shadow-[inset_1px_0_0_rgba(11,64,48,0.25)]" : ""}`}
                >
                  <span className="flex items-center gap-2.5">
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
                  </span>

                  {/* The category's own name for the stage. Folds to nothing
                    when the rail sticks; grid rows animate where a height
                    cannot. Illustrative, one vendor's book. */}
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-overshoot ${
                      stuck
                        ? "grid-rows-[0fr] opacity-0"
                        : "grid-rows-[1fr] opacity-100"
                    }`}
                    aria-hidden={stuck}
                  >
                    <span
                      key={category.name}
                      className="flex min-h-0 animate-swap items-center gap-2 overflow-hidden"
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-2 w-2 shrink-0 ${SQUARE[stage.accent]}`}
                      />
                      {/* The name needs the room; on a phone the square alone
                        marks the stage. */}
                      <span className="label-mono hidden truncate text-bottle/70 sm:inline">
                        {category.stages[i]}
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
