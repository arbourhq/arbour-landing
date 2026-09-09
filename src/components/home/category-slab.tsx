"use client";

// oxlint-disable jsx-a11y/prefer-tag-over-role -- the picker is an Acid slab at
// headline size with a popover list, which a <select> cannot be. It carries
// the ARIA listbox pattern instead: roles, aria-selected, roving focus, arrow
// keys, Escape.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CATEGORIES } from "@/content/categories";
import { useCategory } from "@/components/category-context";

/**
 * The word in the headline is the picker.
 *
 * The vendor category is set inside the h1 as an Acid slab at headline size,
 * flipping through the list on a timer until you touch it. Oversized type as
 * interface: the control and the display are the same object, and the board
 * beside it and the sections below visibly answer to it.
 */

const CYCLE_MS = 2600;

/**
 * How long a touch holds the cycle still. Long enough to read the reskin
 * without the headline changing under you, short enough that a hero left
 * alone goes back to selling the other ten categories.
 */
const PAUSE_MS = 30_000;

/** Page gutter the open list is not allowed to cross. */
const GUTTER = 16;

const isReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The slab's box, applied to the button and to the hidden sizer both, so a
 * width measured off the sizer is exactly the width the slab will take.
 */
const SLAB_BOX =
  "px-[0.2em] font-display [font-size:inherit] font-extrabold leading-[0.95] tracking-[-0.04em]";

export function CategorySlab({ onScreen }: { onScreen: boolean }) {
  const { category, index, setIndex } = useCategory();
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  const [panel, setPanel] = useState<{
    left: number;
    top: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const sizer = useRef<HTMLSpanElement>(null);
  const wrap = useRef<HTMLSpanElement>(null);
  const slab = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const live = useRef(index);
  live.current = index;

  /* Every name measured once, so the slab can animate its width instead of
     snapping. Remeasured whenever a sizer child changes size, which covers
     the webfont landing (Bricolage is a lot wider than the fallback) and the
     vw clamp on the type size changing with the viewport. */
  useEffect(() => {
    const el = sizer.current;
    if (!el) return;
    const measure = () => {
      setWidths(
        Array.from(
          el.children,
          (child) => (child as HTMLElement).getBoundingClientRect().width,
        ),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    for (const child of Array.from(el.children)) observer.observe(child);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || paused || hovered || open || isReduced()) return;
    const id = setInterval(
      () => setIndex((live.current + 1) % CATEGORIES.length),
      CYCLE_MS,
    );
    return () => clearInterval(id);
  }, [onScreen, paused, hovered, open, setIndex]);

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

  /* The list is portalled to the body and positioned in viewport coordinates,
     so nothing later in the document can paint over it and it cannot run off
     the edge of a phone. */
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
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!wrap.current?.contains(target) && !list.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
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

  useEffect(() => {
    if (!open) return;
    const slabEl = slab.current;
    const current = list.current?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    current?.focus({ preventScroll: true });
    return () => slabEl?.focus({ preventScroll: true });
  }, [open]);

  function onListKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const options = Array.from(
      list.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
    );
    const at = options.indexOf(document.activeElement as HTMLElement);
    const step: Record<string, number | undefined> = {
      ArrowDown: at + 1,
      ArrowRight: at + 1,
      ArrowUp: at - 1,
      ArrowLeft: at - 1,
      Home: 0,
      End: options.length - 1,
    };
    const target = step[event.key];
    if (target === undefined) return;
    event.preventDefault();
    options[(target + options.length) % options.length]?.focus();
  }

  const width = widths[index];

  return (
    <span ref={wrap} className="relative inline-block">
      {/* The sizer: never painted, never in the layout, aria-hidden. The 0x0
          overflow-hidden box around it stops eleven names in a row counting
          towards the document's scroll width. */}
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
        ref={slab}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Vendor category: ${category.name}. Pick another.`}
        onClick={() => {
          hold();
          placePanel();
          setOpen((o) => !o);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: width ? Math.round(width) : undefined }}
        className={`${SLAB_BOX} press inline-block min-w-fit cursor-pointer touch-manipulation border-0 bg-acid pt-[0.06em] pb-[0.16em] text-left align-baseline text-bottle transition-[width,transform] duration-300 ease-overshoot hover:-translate-y-[3px] hover:rotate-[-1deg]`}
      >
        <span
          key={category.name}
          className="block animate-flip whitespace-nowrap"
        >
          {category.name}
        </span>
      </button>

      {open &&
        panel &&
        createPortal(
          <div
            ref={list}
            role="listbox"
            aria-label="Vendor category"
            tabIndex={-1}
            onKeyDown={onListKey}
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
                  role="option"
                  aria-selected={i === index}
                  tabIndex={i === index ? 0 : -1}
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
