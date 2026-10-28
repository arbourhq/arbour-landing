"use client";

// oxlint-disable jsx-a11y/prefer-tag-over-role -- the picker is a select
// trigger at headline size with the console's menu surface under it, which a
// native <select> cannot be. It carries the ARIA listbox pattern instead:
// roles, aria-selected, roving focus, arrow keys, Home, End, Escape.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/content/categories";
import { useCategory } from "@/components/category-context";

/**
 * The word in the headline is a select, drawn the way the console draws one:
 * the field skin (a sunken Panel ground inside a hairline, 6px corners) with
 * a chevron, opening the kit's menu surface. Oversized type as interface: the
 * control and the display are the same object, and the pipeline beside it,
 * the automation rule and the vendor tags answer to it.
 *
 * Left alone it steps through the categories, so a hero nobody touches still
 * sells all eleven. A touch holds it for long enough to read the reskin.
 */

const CYCLE_MS = 2600;
const PAUSE_MS = 30_000;
const GUTTER = 16;

const isReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The word's box, shared by the trigger and its hidden sizer. */
const WORD =
  "whitespace-nowrap font-display font-extrabold [font-size:inherit] leading-[inherit]";

export function CategorySelect({ onScreen }: { onScreen: boolean }) {
  const { category, index, setIndex } = useCategory();
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [widths, setWidths] = useState<number[]>([]);
  const [panel, setPanel] = useState<{
    left: number;
    top: number;
    maxHeight: number;
  } | null>(null);
  const sizer = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const live = useRef(index);
  live.current = index;

  /* Every name measured once so the field can animate its width instead of
     snapping, and remeasured whenever one changes size: the webfont landing
     and the fluid type step both move them. */
  useEffect(() => {
    const el = sizer.current;
    if (!el) return;
    const measure = () =>
      setWidths(
        Array.from(
          el.children,
          (child) => (child as HTMLElement).getBoundingClientRect().width,
        ),
      );
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

  /* The menu is portalled and placed in viewport coordinates, so nothing
     later in the document paints over it and it cannot leave a phone. */
  const place = useCallback(() => {
    const el = trigger.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const width = 264;
    const top = box.bottom + 8;
    setPanel({
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
    place();
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!trigger.current?.contains(target) && !list.current?.contains(target))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = (e: Event) => {
      if (!list.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const triggerEl = trigger.current;
    list.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.focus({ preventScroll: true });
    return () => triggerEl?.focus({ preventScroll: true });
  }, [open]);

  function onListKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const options = Array.from(
      list.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
    );
    const at = options.indexOf(document.activeElement as HTMLElement);
    const step: Record<string, number | undefined> = {
      ArrowDown: at + 1,
      ArrowUp: at - 1,
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
    <span className="relative inline-block align-baseline">
      {/* The sizer: never painted, out of the layout, hidden from assistive
          tech. The 0x0 box keeps eleven names off the scroll width. */}
      <span
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 h-0 w-0 overflow-hidden"
      >
        <span ref={sizer} className="flex">
          {CATEGORIES.map((c) => (
            <span key={c.name} className={WORD}>
              {c.name}
            </span>
          ))}
        </span>
      </span>

      <button
        ref={trigger}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Vendor category: ${category.name}. Pick another.`}
        onClick={() => {
          hold();
          place();
          setOpen((o) => !o);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={`group inline-flex touch-manipulation items-center gap-[0.14em] rounded-md bg-panel pt-[0.06em] pr-[0.16em] pb-[0.16em] pl-[0.14em] align-baseline inset-shadow-depth-panel transition-[background-color,box-shadow] duration-[var(--duration-base)] hover:bg-panel-hover max-lg:min-h-11 ${
          // Open borrows the field's focus treatment, as the console's
          // pickers do: a Bottle edge and the 3px ring.
          open ? "ring-3 ring-bottle/30 inset-ring-1 inset-ring-bottle" : ""
        }`}
      >
        {/* Clipped across only, so the width can animate while a descender
            (the g and p of Photographers) still hangs below the line. */}
        <span
          className="block overflow-x-clip transition-[width] duration-[var(--duration-pop)] ease-overshoot motion-reduce:transition-none"
          style={{ width: width ? Math.ceil(width) : undefined }}
        >
          <span key={category.name} className={`block animate-flip ${WORD}`}>
            {category.name}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          strokeWidth={2.75}
          className={`size-[0.34em] shrink-0 text-ink-muted transition-transform duration-[var(--duration-pop)] ease-overshoot group-hover:text-ink ${
            open ? "rotate-180" : ""
          }`}
        />
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
              maxHeight: panel.maxHeight,
            }}
            className="fixed z-[70] w-66 origin-top-left animate-pop-in overflow-y-auto rounded-md border border-line bg-page p-1 text-ink shadow-lifted"
          >
            <p className="mono-label m-0 px-2 pt-1.5 pb-1 text-ink-muted">
              Vendor category
            </p>
            {CATEGORIES.map((c, i) => {
              const selected = i === index;
              return (
                <button
                  key={c.name}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => {
                    hold();
                    setIndex(i);
                    setOpen(false);
                  }}
                  className="flex min-h-9 w-full touch-manipulation items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left font-sans text-ui text-ink outline-none hover:bg-panel focus-visible:bg-panel max-lg:min-h-11"
                >
                  {c.name}
                  {selected ? (
                    <Check aria-hidden className="size-3.5 text-bottle" />
                  ) : null}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </span>
  );
}
