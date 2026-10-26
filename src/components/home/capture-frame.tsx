"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Pause, Play } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import type { Capture, Region } from "@/content/stages";

/**
 * A real console screen, framed the way the console frames a card: a 6px
 * corner and a hairline at 10% ink. The caption under it says what it is
 * (a real screen, seed data), with a 7px Sprout leaf while a recording plays.
 *
 * Recordings play only while the frame is on screen, the tab is in front and
 * motion is allowed. The poster holds the same box otherwise, covers a load
 * failure, and is all a reduced-motion reader ever sees.
 *
 * `highlight` is the claim being pointed at: the frame holds the poster (the
 * frame the regions were measured on), rings each region in Sprout, the
 * console's selection colour, and glides in on them, up to 2.4 times, so the
 * console's own small print can be read where the claim is. `focus` is the
 * close-up a phone shows instead of the whole 1440px console at a quarter
 * scale; "Whole screen" opens it out. On a phone a highlight re-frames the
 * close-up round its regions at the same shape, rather than zooming, so
 * nothing on the page moves under the thumb that asked.
 *
 * Captures are served at their full 2880px, unoptimised, because the zoom
 * and the phone close-up both need the source's own resolution.
 */

/** The box round a set of regions, in percent of the frame. */
function bounds(regions: readonly Region[]) {
  return {
    x0: Math.min(...regions.map((r) => r.x)),
    y0: Math.min(...regions.map((r) => r.y)),
    x1: Math.max(...regions.map((r) => r.x + r.w)),
    y1: Math.max(...regions.map((r) => r.y + r.h)),
  };
}

/**
 * A close-up of the same shape as `focus`, re-centred on a set of regions
 * with a margin, held inside the frame. Shapes are compared in pixels: the
 * frame is 16:10, so a box w% wide and h% tall is 1.6w:h.
 */
function fitFocus(regions: readonly Region[], focus: Region): Region {
  const { x0, y0, x1, y1 } = bounds(regions);
  const margin = 4;
  const aspect = (1.6 * focus.w) / focus.h;
  let w = Math.max(
    x1 - x0 + margin * 2,
    ((y1 - y0 + margin * 2) * aspect) / 1.6,
  );
  let h = (1.6 * w) / aspect;
  if (w > 100) {
    w = 100;
    h = (1.6 * w) / aspect;
  }
  if (h > 100) {
    h = 100;
    w = (aspect * h) / 1.6;
  }
  return {
    x: within((x0 + x1) / 2 - w / 2, w),
    y: within((y0 + y1) / 2 - h / 2, h),
    w,
    h,
  };
}

/** Hold a box of `size` percent inside the frame, starting near `v`. */
function within(v: number, size: number) {
  return Math.min(100 - size, Math.max(0, v));
}

/** The zoom that frames a set of regions, with a margin, inside the frame. */
function zoomOn(regions: readonly Region[]) {
  const { x0, y0, x1, y1 } = bounds(regions);
  const margin = 12;
  const z = Math.min(
    2.4,
    Math.max(1, Math.min(100 / (x1 - x0 + margin), 100 / (y1 - y0 + margin))),
  );
  // Centre the regions, then hold the canvas inside the frame's edges.
  const keep = (v: number) => Math.min(0, Math.max(100 - 100 * z, v));
  return {
    z,
    x: keep(50 - ((x0 + x1) / 2) * z),
    y: keep(50 - ((y0 + y1) / 2) * z),
  };
}
export function CaptureFrame({
  capture,
  caption,
  sizes,
  priority = false,
  crop,
  focus,
  highlight,
  className,
}: {
  capture: Capture;
  caption?: string;
  sizes: string;
  priority?: boolean;
  /** Show only the top of a tall capture, at this aspect ratio. */
  crop?: string;
  /** The phone close-up, in percent of the frame. */
  focus?: Region;
  /** Regions to ring, in percent of the frame. */
  highlight?: readonly Region[] | null;
  className?: string;
}) {
  const frame = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [failed, setFailed] = useState(false);
  const [whole, setWhole] = useState(false);

  useEffect(() => {
    if (!capture.recording || !frame.current) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () =>
      setMotionAllowed(!preference.matches && !document.hidden);
    updateMotion();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateMotion);

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(frame.current);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateMotion);
    };
  }, [capture.recording]);

  const pointing = Boolean(highlight && highlight.length > 0);
  const zoom = pointing && highlight ? zoomOn(highlight) : null;
  const playing = inView && motionAllowed && !stopped && !failed && !pointing;
  const canPlay = Boolean(capture.recording) && motionAllowed && !failed;
  const cropped = Boolean(focus) && !whole;

  // The close-up as custom properties; globals.css applies them below 640px,
  // keeping the frame's shape from the stage's own close-up.
  const box =
    focus && pointing && highlight ? fitFocus(highlight, focus) : focus;
  const focusStyle =
    focus && box
      ? ({
          "--crop-aspect": `${(1.6 * focus.w).toFixed(2)} / ${focus.h}`,
          "--crop-w": `${(10000 / box.w).toFixed(2)}%`,
          "--crop-x": `${((-100 * box.x) / box.w).toFixed(2)}%`,
          "--crop-y": `${((-100 * box.y) / box.h).toFixed(2)}%`,
        } as React.CSSProperties)
      : undefined;

  return (
    <figure ref={frame} className={`m-0 ${className ?? ""}`}>
      <div
        data-arby-perch="capture"
        data-crop={cropped ? "on" : "off"}
        className="capture-crop relative overflow-hidden rounded-md border border-border-default bg-panel"
        style={{ ...(crop ? { aspectRatio: crop } : {}), ...focusStyle }}
      >
        <div
          className={`capture-canvas origin-top-left transition-transform duration-[320ms] ease-glide motion-reduce:transition-none ${
            crop ? "absolute inset-0" : "relative"
          }`}
          style={
            zoom
              ? ({
                  transform: `translate(${zoom.x}%, ${zoom.y}%) scale(${zoom.z})`,
                  "--ring": `${2 / zoom.z}px`,
                  "--ring-radius": `${4 / zoom.z}px`,
                } as React.CSSProperties)
              : undefined
          }
        >
          <Image
            src={playing && capture.recording ? capture.recording : capture.src}
            alt={capture.alt}
            width={capture.width}
            height={capture.height}
            sizes={sizes}
            preload={priority}
            unoptimized
            onError={() => setFailed(true)}
            className={`block w-full ${crop ? "h-full object-cover object-top" : "h-auto"}`}
          />
          {zoom
            ? highlight?.map((region, i) => (
                <span
                  key={`${region.x}-${region.y}-${i}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute animate-pop-in bg-sprout/15"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.w}%`,
                    height: `${region.h}%`,
                    // Drawn inside the zoom, so the ring and its corner are
                    // divided by it to land at 2px and 4px on screen. The
                    // phone close-up resets both (globals.css).
                    borderRadius: "var(--ring-radius)",
                    boxShadow: "0 0 0 var(--ring) var(--sprout)",
                  }}
                />
              ))
            : null}
        </div>
      </div>
      {caption || capture.recording || focus ? (
        <figcaption className="mt-3 flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {caption ? (
            <span className="mono-label flex items-center gap-2 text-ink-muted">
              <span
                aria-hidden="true"
                className={`size-[7px] shrink-0 rounded-xs transition-colors duration-[var(--duration-base)] ${
                  playing ? "bg-sprout" : "bg-track"
                }`}
              />
              {caption}
            </span>
          ) : null}
          <span className="ml-auto flex items-center gap-2">
            {focus ? (
              <button
                type="button"
                onClick={() => setWhole((value) => !value)}
                aria-pressed={whole}
                className={buttonClass("secondary", "sm", "sm:hidden")}
              >
                {whole ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />}
                {whole ? "Close up" : "Whole screen"}
              </button>
            ) : null}
            {capture.recording && canPlay ? (
              <button
                type="button"
                onClick={() => setStopped((value) => !value)}
                aria-label={`${stopped ? "Play" : "Stop"} the ${capture.label} demo`}
                className={buttonClass("secondary", "sm")}
              >
                {stopped ? <Play aria-hidden /> : <Pause aria-hidden />}
                <span className="max-sm:sr-only">
                  {stopped ? "Play demo" : "Stop demo"}
                </span>
              </button>
            ) : null}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
