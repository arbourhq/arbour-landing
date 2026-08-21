"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CATEGORIES } from "@/content/categories";
import { useCategory } from "@/components/category-context";
import { HeroMock } from "@/components/product/hero-mock";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";
import { buttonClass } from "@/components/ui/button";

/**
 * The hero. The word is the picker.
 *
 * The vendor category is set inside the headline as an Acid slab at headline
 * size, flipping through the list on a timer until you touch it. Oversized type
 * as interface, not decoration: the control and the display are the same
 * object, and the reskin below is obviously caused by it rather than by a chip
 * row somebody has to notice first.
 *
 * Nothing sits in the top right corner. A cube cluster and a week strip both
 * went in there and both came out: the slab is the moving part, and a second
 * thing to watch only takes attention off it.
 */

const CYCLE_MS = 2600;

/**
 * How long a touch holds the cycle still. Long enough to read the reskin below
 * without the headline changing under you, short enough that a hero left alone
 * goes back to selling the other ten categories. Deliberately not persisted:
 * a refresh is a new visit and it starts cycling again.
 */
const PAUSE_MS = 30_000;

/** Page gutter the open list is not allowed to cross. Matches the section. */
const GUTTER = 16;

const isReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The slab's box, applied to the button and to the hidden sizer both, so a
 * width measured off the sizer is exactly the width the slab will take.
 * font-size inherits from the h1's clamp, so this survives every breakpoint.
 */
const SLAB_BOX =
  "px-[0.2em] font-display [font-size:inherit] font-extrabold leading-[0.95] tracking-[-0.04em]";

/**
 * True while the hero is on screen and the tab is in front.
 *
 * The cycle used to run for the life of the page. Six sections down, a flip
 * still changed the headline and the pipeline, and the page moved under
 * whatever you were reading. Off screen there is nobody to sell the other ten
 * categories to, so it stops.
 */
function useOnScreen(ref: React.RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(false);
  const intersecting = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setOnScreen(intersecting.current && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting.current = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);

  return onScreen;
}

function CategorySlab({ onScreen }: { onScreen: boolean }) {
  const { category, index, setIndex } = useCategory();
  const [open, setOpen] = useState(false);
  /** A deliberate touch holds the cycle for PAUSE_MS. A hover only pauses it. */
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  /** The open list's viewport box, kept inside the gutters on narrow screens. */
  const [panel, setPanel] = useState<{
    left: number;
    top: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const sizer = useRef<HTMLSpanElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const live = useRef(index);
  live.current = index;

  /* Every name measured once, so the slab can animate its width instead of
     snapping. Remeasured after the webfont lands (Bricolage is a lot wider than
     the fallback) and on resize, because the type size is a vw clamp. */
  useEffect(() => {
    const measure = () => {
      const el = sizer.current;
      if (!el) return;
      setWidths(
        Array.from(
          el.children,
          (child) => (child as HTMLElement).getBoundingClientRect().width,
        ),
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!onScreen || paused || hovered || open || isReduced()) return;
    const id = setInterval(
      () => setIndex((live.current + 1) % CATEGORIES.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [onScreen, paused, hovered, open, setIndex]);

  /** Every touch restarts the hold, so the clock runs from the last one. */
  const hold = useCallback(() => {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), PAUSE_MS);
  }, []);

  useEffect(
    () => () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    },
    [],
  );

  /* The list is portalled to the body and positioned in viewport coordinates.
     Left in the heading it painted under the paragraph, the buttons and the
     mock (all of them later in the document), and it could run off the right
     edge of a phone because the slab sits wherever the headline puts it. Fixed
     and out of the tree, it cannot be stacked over or clipped by anything.

     So: sized to the viewport, slid back until both edges clear the gutter, and
     capped in height with the overflow scrolling inside it. */
  const placePanel = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const width = Math.min(480, window.innerWidth - GUTTER * 2);
    const top = box.bottom + 6;
    setPanel({
      width,
      top,
      left: Math.min(
        Math.max(box.left, GUTTER),
        window.innerWidth - GUTTER - width,
      ),
      maxHeight: window.innerHeight - top - GUTTER,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    placePanel();
    /* pointerdown, not mousedown: on iOS a tap on a non-interactive element
       fires pointerdown reliably and mousedown only sometimes. */
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!wrap.current?.contains(target) && !list.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    /* A fixed panel would slide away from its slab, so scrolling the page
       closes it rather than chasing the anchor. Capture, to catch scrolls on
       any pane, but not the list's own overflow. */
    const onScroll = (e: Event) => {
      if (!list.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [open, placePanel]);

  const width = widths[index];

  return (
    <span ref={wrap} className="relative inline-block">
      {/* The sizer. Never painted, never in the layout, and aria-hidden so the
          heading does not read as eleven vendor categories in a row.

          The 0x0 overflow-hidden box around it is load-bearing. Eleven names in
          a row is about 5400px wide, and absolute or not, that still counts
          towards the document's scroll width. Clipping it makes it a scroll
          container of its own, so the overflow stops at this element. The
          children keep their real layout boxes, which is the whole point. */}
      <span
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 h-0 w-0 overflow-hidden"
      >
        <span ref={sizer} className="flex whitespace-nowrap">
          {CATEGORIES.map((c) => (
            <span key={c.name} className={SLAB_BOX}>
              {c.name}
            </span>
          ))}
        </span>
      </span>

      <button
        type="button"
        aria-expanded={open}
        aria-label={`Vendor category: ${category.name}. Pick another.`}
        onClick={() => {
          hold();
          /* Placed before the paint, so the list never shows up in last
             tap's position for a frame. */
          placePanel();
          setOpen((o) => !o);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: width ? Math.round(width) : undefined }}
        className={`${SLAB_BOX} press inline-block cursor-pointer touch-manipulation border-0 bg-acid pt-[0.06em] pb-[0.16em] text-left align-baseline text-bottle transition-[width,transform] duration-300 ease-overshoot hover:-translate-y-[3px] hover:rotate-[-1deg]`}
      >
        <span
          key={category.name}
          className="block animate-flip whitespace-nowrap"
        >
          {category.name}
        </span>
      </button>

      {/* Portalled to the body: see placePanel. Two boxes, not one: the outer
          is the opaque ground, the inner paints the Acid hairline colour that
          the 1px gaps show through. Put the hairline on a single box and it is
          a 25% tint of whatever the list happens to be floating over, which
          reads as gaps cut clean through the panel. Planners takes the full
          width because eleven names in two columns would otherwise leave a
          hole in the corner. */}
      {open &&
        panel &&
        createPortal(
          <div
            ref={list}
            aria-label="Vendor category"
            style={{
              left: panel.left,
              top: panel.top,
              width: panel.width,
              maxHeight: panel.maxHeight,
            }}
            className="fixed z-50 animate-fade overflow-y-auto bg-bottle-ink"
          >
            <div className="grid grid-cols-2 gap-px bg-acid/25 p-px">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  aria-current={i === index}
                  onClick={() => {
                    hold();
                    setIndex(i);
                    setOpen(false);
                  }}
                  className={`label-mono flex min-h-11 cursor-pointer touch-manipulation items-center border-0 px-3 py-3 text-left text-[10px] last:col-span-2 sm:px-3.5 sm:text-[9px] ${
                    i === index
                      ? "bg-acid text-bottle"
                      : "bg-bottle-ink text-acid/75 hover:bg-bottle-deep hover:text-acid"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </span>
  );
}

export function HeroWord() {
  const { category } = useCategory();
  const section = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(section);

  return (
    <section
      ref={section}
      className="on-dark relative bg-bottle px-6 pt-16 sm:px-10"
    >
      <div className="relative mx-auto max-w-[1180px]">
        <p className="eyebrow mb-6 text-acid/70">
          00 · In build · Waitlist open
        </p>

        {/* The floor of the clamp is set by the longest category name: at any
            bigger size "Photographers." runs past the right edge of a 375px
            phone, and the slab cannot wrap mid-word to save it. */}
        <h1 className="m-0 font-display text-[clamp(34px,8.4vw,88px)] leading-[0.95] font-extrabold tracking-[-0.04em] text-acid">
          <span className="block max-w-[14ch] text-balance">
            Saturday&rsquo;s busy. Sunday isn&rsquo;t.
          </span>
          <span className="mt-[0.14em] flex flex-wrap items-baseline gap-x-[0.22em]">
            <span>Built for</span>
            <span className="whitespace-nowrap">
              <CategorySlab onScreen={onScreen} />.
            </span>
          </span>
        </h1>

        <div className="pt-9 pb-12">
          <p className="m-0 max-w-[46ch] text-[17px] leading-relaxed text-acid sm:text-[19px]">
            From &ldquo;Are you free?&rdquo; to the final invoice. One place for
            enquiries, quotes, contracts, deposits, run sheets, and the couple
            who went quiet in March.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <WaitlistButton
              variant="acid"
              size="lg"
              presetCategory={category.name}
              className="hover:rotate-[-1deg]"
            >
              Join the waitlist
            </WaitlistButton>
            <a
              href="#building"
              className={buttonClass(
                "outlineAcid",
                "lg",
                "hover:rotate-[1deg]",
              )}
            >
              See what we&rsquo;re building
            </a>
          </div>
        </div>

        <HeroMock category={category} />
      </div>
    </section>
  );
}
