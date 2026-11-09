"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { useCategory } from "@/components/category-context";
import { STAGES, type Region } from "@/content/stages";
import type { Engine } from "./engine";
import type { Layout } from "./director";
import { COPY, NUMERAL } from "./dims";

/**
 * The book, on the page. One wrapper holds the hero, the five stages and
 * the statement; one canvas behind them (a band that sticks under the nav
 * on a phone) draws the book. Scrolling is the only control: each stage's
 * copy sticks on the left-hand page while its spread holds, and the scroll
 * between holds turns the leaf. The sections are measured into knots, and
 * the scroll position between them becomes the story's `s` (director.ts).
 *
 * The 3D is an enhancement. The server renders the flat page, and the
 * client switches to the book only when motion is allowed and a hardware
 * WebGL2 context exists. three.js loads after the page has, so the headline
 * paints first; a lost context drops back to the flat page for the visit.
 */

type Mode = "pending" | "3d" | "flat";

/** What the reader is resting on: which stage, which claim, which one is pointed at. */
type Reading = {
  stage: number | null;
  claim: number;
  pointed: { stage: number; regions: readonly Region[] } | null;
};

class ReadingStore {
  private value: Reading = { stage: null, claim: 0, pointed: null };
  private readonly listeners = new Set<() => void>();
  get = () => this.value;
  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  set(next: Partial<Reading>) {
    const merged = { ...this.value, ...next };
    if (
      merged.stage === this.value.stage &&
      merged.claim === this.value.claim &&
      merged.pointed === this.value.pointed
    ) {
      return;
    }
    this.value = merged;
    for (const fn of this.listeners) fn();
  }
}

type BookContextValue = {
  mode: Mode;
  store: ReadingStore;
};

const BookContext = createContext<BookContextValue | null>(null);

export function useBook() {
  const value = useContext(BookContext);
  return { mode: value?.mode ?? "pending" };
}

/** The reader's place in the book, re-rendering only when it changes. */
export function useReading() {
  const value = useContext(BookContext);
  const store = value?.store;
  const reading = useSyncExternalStore(
    store?.subscribe ?? noopSubscribe,
    store?.get ?? emptyReading,
    emptyReading,
  );
  const point = useCallback(
    (stage: number, regions: readonly Region[] | null) =>
      store?.set({
        pointed: regions && regions.length ? { stage, regions } : null,
      }),
    [store],
  );
  return { ...reading, point };
}

const EMPTY: Reading = { stage: null, claim: 0, pointed: null };
function emptyReading() {
  return EMPTY;
}
function noopSubscribe() {
  return () => {};
}

/** True when this browser should get the 3D book at all. */
export function canRunBook() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(name);
  } catch {
    return false;
  }
}

export function BookStory({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("pending");
  const store = useMemo(() => new ReadingStore(), []);

  useEffect(() => {
    // The head script promised the book from the cheap checks; the hardware
    // check confirms it before anyone has scrolled.
    const promised = document.documentElement.dataset.book === "3d";
    setMode(promised && canRunBook() ? "3d" : "flat");
    const lost = () => setMode("flat");
    window.addEventListener("book-lost", lost);
    return () => window.removeEventListener("book-lost", lost);
  }, []);

  useEffect(() => {
    if (mode !== "pending") document.documentElement.dataset.book = mode;
  }, [mode]);

  const value = useMemo(() => ({ mode, store }), [mode, store]);

  return (
    <BookContext.Provider value={value}>
      <div id="book" data-book-story className="relative">
        {children}
      </div>
    </BookContext.Provider>
  );
}

type Knot = [number, number];

/** Piecewise-linear value for a scroll position. */
function at(y: number, knots: readonly Knot[]) {
  if (!knots.length) return 0;
  if (y <= knots[0][0]) return knots[0][1];
  for (let i = 1; i < knots.length; i++) {
    const [y1, v1] = knots[i];
    const [y0, v0] = knots[i - 1];
    if (y <= y1) return v0 + ((y - y0) / Math.max(1, y1 - y0)) * (v1 - v0);
  }
  return knots[knots.length - 1][1];
}

const phoneQuery = "(max-width: 1023px)";

function cssPx(name: string, fallback: number) {
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );
  return Number.isFinite(value) ? value : fallback;
}

function docTop(el: Element | null) {
  return el ? el.getBoundingClientRect().top + window.scrollY : 0;
}

/** A lost context drops the page back to its flat frames for the visit. */
function onLost(event: Event) {
  event.preventDefault();
  window.dispatchEvent(new Event("book-lost"));
}

/** Run once the page has loaded and the main thread has a moment. */
function afterLoad(run: () => void) {
  let handle = 0;
  let timer = 0;
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (h: number) => void;
  };
  const idle = () => {
    if (w.requestIdleCallback)
      handle = w.requestIdleCallback(run, { timeout: 1200 });
    else timer = window.setTimeout(run, 200);
  };
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
  return () => {
    window.removeEventListener("load", idle);
    w.cancelIdleCallback?.(handle);
    window.clearTimeout(timer);
  };
}

/**
 * The desktop reading frame, a pure function of the window: the right-hand
 * page as large as fits, the left-hand page's inner seven and a half units
 * showing beside it for the copy. Published as CSS variables so each
 * stage's copy column sits exactly on the printed page.
 */
export function readingFrame(width: number, height: number) {
  const navBottom = cssPx("--nav-h", 56) + cssPx("--nav-gap", 12);
  const margin = width >= 1280 ? 40 : 24;
  const avail = height - navBottom - 28;
  const k = Math.min((width - margin * 2) / 23.6, avail / 10.3);
  const x0 = (width - 23.6 * k) / 2;
  const gutter = x0 + 7.6 * k;
  const centreY = navBottom + avail / 2;
  return { k, gutter, centreY, navBottom };
}

export function BookCanvas() {
  const value = useContext(BookContext);
  const mode = value?.mode ?? "pending";
  const store = value?.store;
  const { category } = useCategory();
  const holder = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const categoryRef = useRef(category);
  categoryRef.current = category;
  const [live, setLive] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [phone, setPhone] = useState(false);
  const [whole, setWhole] = useState(false);
  const stoppedRef = useRef(stopped);
  stoppedRef.current = stopped;
  const reading = useSyncExternalStore(
    store?.subscribe ?? noopSubscribe,
    store?.get ?? emptyReading,
    emptyReading,
  );

  useEffect(() => {
    const query = window.matchMedia(phoneQuery);
    const sync = () => setPhone(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The book follows the category picker: a new edition on the cover.
  useEffect(() => {
    engineRef.current?.setCategory(contentFor(category));
  }, [category]);

  useEffect(() => {
    if (mode !== "3d" || !store) return;
    const host = holder.current;
    const el = canvas.current;
    const story = host?.closest<HTMLElement>("[data-book-story]");
    if (!host || !el || !story) return;
    let cancelled = false;
    let teardown: (() => void) | undefined;

    const boot = async () => {
      const { Engine } = await import("./engine");
      if (cancelled) return;
      const small = window.matchMedia(phoneQuery).matches;
      const engine = new Engine(el, {
        phone: small,
        dpr: small ? 2 : 1.75,
        dof: !small,
      });
      try {
        await engine.load({
          posters: STAGES.map((stage) =>
            small
              ? `/book/posters/${stage.capture.src
                  .split("/")
                  .pop()
                  ?.replace(/-poster\.webp$/, "")}-2048.webp`
              : stage.capture.src,
          ),
          ...contentFor(categoryRef.current),
        });
      } catch {
        engine.dispose();
        window.dispatchEvent(new Event("book-lost"));
        return;
      }
      if (cancelled) {
        engine.dispose();
        return;
      }
      engineRef.current = engine;
      // In development the engine is reachable for framing and captures.
      if (process.env.NODE_ENV !== "production") {
        (window as Window & { arbourBook?: unknown }).arbourBook = {
          engine,
          measure: () => measure(),
          knots: () => knots,
          holds: () => holds,
        };
      }

      let knots: Knot[] = [];
      let holds: { from: number; to: number; stage: number }[] = [];
      let band = small;
      let copies: (HTMLElement | null)[] = [];
      let opening = 1;
      let closing = 1;

      const measure = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        band = window.matchMedia(phoneQuery).matches;
        const rect = host.getBoundingClientRect();
        const width = band ? rect.width : vw;
        const height = band ? rect.height : vh;
        const frame = readingFrame(vw, vh);
        const stages = STAGES.map((stage) =>
          document.getElementById(`stage-${stage.id}`),
        );
        const statement = document.getElementById("statement");
        const navLine = frame.navBottom + 24;

        let layout: Layout;
        if (band) {
          // A phone reads one page: the right-hand page across the band,
          // its screen handed to HTML at rest, the controls under it.
          const k = Math.min((width - 16) / 16, (height - 64) / 10.3);
          const gutter = (width - 16 * k) / 2;
          layout = {
            width,
            height,
            band: true,
            hero: {
              x: width * 0.16,
              y: height * 0.03,
              w: width * 1.02,
              h: height * 1.04,
            },
            read: { gutter, centreY: 8 + 5.15 * k, k },
            close: {
              x: width * 0.08,
              y: height * 0.04,
              w: width * 0.84,
              h: height * 0.92,
            },
          };
        } else {
          const h1 = document
            .getElementById("hero-title")
            ?.getBoundingClientRect();
          const copy = document
            .querySelector("[data-hero-copy]")
            ?.getBoundingClientRect();
          // The hero is framed as it sits at the top of the page.
          const top = (h1?.bottom ?? vh * 0.35) + window.scrollY;
          const left = Math.max((copy?.right ?? vw * 0.5) + 24, vw * 0.5);
          layout = {
            width,
            height,
            band: false,
            hero: {
              x: left - 20,
              y: top - 56,
              w: vw * 1.09 - left + 20,
              h: vh * 1.16 - top + 56,
            },
            read: { gutter: frame.gutter, centreY: frame.centreY, k: frame.k },
            close: {
              x: vw * 0.42,
              y: frame.navBottom + vh * 0.2,
              w: vw * 0.54,
              h: vh * 0.72,
            },
          };
          // The copy column on the left-hand page, in the page's own units.
          const k = frame.k;
          story.style.setProperty("--page-k", `${k}`);
          story.style.setProperty(
            "--copy-left",
            `${frame.gutter + COPY.x0 * k}px`,
          );
          story.style.setProperty(
            "--copy-width",
            `${(COPY.x1 - COPY.x0) * k}px`,
          );
          story.style.setProperty(
            "--copy-top",
            `${frame.centreY + COPY.z0 * k}px`,
          );
          story.style.setProperty(
            "--copy-height",
            `${(COPY.z1 - COPY.z0) * k}px`,
          );
          story.style.setProperty(
            "--numeral-top",
            `${frame.centreY + NUMERAL.z * k}px`,
          );
        }
        engine.setLayout(layout);

        // Knots: the hero opens the book; each stage holds while its copy
        // sticks and turns while it leaves; the statement shuts the book.
        const k: Knot[] = [[0, 0]];
        const h: typeof holds = [];
        if (band) {
          const bandTop = host.getBoundingClientRect().top + window.scrollY;
          k.push([Math.max(1, bandTop - vh * 0.35), 0]);
          const line =
            cssPx("--nav-h", 56) + cssPx("--nav-gap", 12) * 2 + height;
          stages.forEach((section, i) => {
            const top = docTop(section) - line - 16;
            const next =
              i < stages.length - 1
                ? docTop(stages[i + 1]) - line - 16
                : docTop(statement) - line;
            const restEnd = top + (next - top) * 0.62;
            k.push([top, i + 1], [restEnd, i + 1]);
            h.push({ from: top, to: restEnd, stage: i });
          });
          k.push([docTop(statement) - line + vh * 0.1, STAGES.length + 1]);
        } else {
          const copyTop = frame.centreY + COPY.z0 * frame.k;
          stages.forEach((section, i) => {
            // The copy sticks once the turn's spacer above it has gone by.
            const turn = section?.querySelector<HTMLElement>("[data-turn]");
            const start = docTop(section) + (turn?.offsetHeight ?? 0) - copyTop;
            const hold = section?.querySelector<HTMLElement>("[data-hold]");
            const length = hold?.offsetHeight ?? vh;
            k.push([start, i + 1], [start + length, i + 1]);
            h.push({ from: start, to: start + length, stage: i });
          });
          k.push([docTop(statement) - navLine + vh * 0.05, STAGES.length + 1]);
          copies = stages.map(
            (section) =>
              section?.querySelector<HTMLElement>("[data-copy]") ?? null,
          );
          opening = Math.max(1, h[0]?.from ?? 1);
          closing = Math.max(
            1,
            docTop(statement) - navLine - (h[h.length - 1]?.to ?? 0),
          );
        }
        if (band) {
          for (const copy of copies) {
            if (copy) {
              copy.style.opacity = "";
              copy.style.pointerEvents = "";
            }
          }
          copies = [];
        }
        for (let i = 1; i < k.length; i++) {
          if (k[i][0] < k[i - 1][0]) k[i][0] = k[i - 1][0];
        }
        knots = k;
        holds = h;
        onScroll();
        engine.snap();
      };

      const onScroll = () => {
        const y = window.scrollY;
        const s = at(y, knots);
        let hold = 0;
        let resting: number | null = null;
        for (const span of holds) {
          if (y >= span.from && y <= span.to) {
            hold = (y - span.from) / Math.max(1, span.to - span.from);
            resting = span.stage;
          }
        }
        engine.setStory(s);
        fadeCopies(y);
        const stage = resting === null ? null : STAGES[resting];
        const claims = stage?.facts.length ?? 4;
        store.set({
          stage: resting,
          claim: Math.min(claims - 1, Math.floor(hold * claims)),
        });
      };

      /**
       * Each stage's copy is printed on its spread: it comes up as the leaf
       * lands and goes as the next one lifts, so two pages of copy are never
       * on the table at once.
       */
      const fadeCopies = (y: number) => {
        copies.forEach((copy, i) => {
          if (!copy) return;
          const span = holds[i];
          if (!span) return;
          const before = i === 0 ? opening : span.from - holds[i - 1].to;
          const after =
            i === holds.length - 1 ? closing : holds[i + 1].from - span.to;
          // It comes up over the last stretch of the turn before its spread.
          const fadeIn = smoothstep(
            (y - (span.from - before * 0.3)) / (before * 0.3),
          );
          const fadeOut = 1 - smoothstep((y - span.to) / (after * 0.28));
          const o = Math.min(fadeIn, fadeOut);
          copy.style.opacity = o.toFixed(3);
          copy.style.pointerEvents = o > 0.6 ? "" : "none";
        });
      };

      // The resting screen hands over to HTML: the same frame, sharp.
      engine.onFrame = (rest) => {
        const node = plate.current;
        if (!node) return;
        const current = store.get().stage;
        const on = rest && current !== null;
        node.dataset.on = on ? "true" : "false";
        if (on && current !== null) {
          const r = engine.plateRect(current);
          if (r) {
            node.style.transform = `translate(${r.x}px, ${r.y}px)`;
            node.style.width = `${r.w}px`;
            node.style.height = `${r.h}px`;
          }
        }
        syncVideo(on);
      };

      const syncVideo = (on: boolean) => {
        const v = video.current;
        if (!v) return;
        const wantPlay =
          on && !stoppedRef.current && !document.hidden && !store.get().pointed;
        if (wantPlay && v.paused) {
          v.play().catch(() => {
            // Low Power Mode refuses autoplay: the poster stays.
          });
        } else if (!wantPlay && !v.paused) {
          v.pause();
        }
      };

      const onPointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        // Only the hero and the close lean toward the pointer.
        const s = at(window.scrollY, knots);
        if (s > 1 && s < STAGES.length + 0.9) return;
        engine.setPointer(
          (event.clientX / window.innerWidth) * 2 - 1,
          (event.clientY / window.innerHeight) * 2 - 1,
        );
      };

      let resizeFrame = 0;
      const onResize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(measure);
      };
      const observer = new ResizeObserver(onResize);
      observer.observe(story);
      observer.observe(host);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("pointermove", onPointer, { passive: true });
      const onVisibility = () => syncVideo(engine.atRest);
      document.addEventListener("visibilitychange", onVisibility);
      el.addEventListener("webglcontextlost", onLost);

      await document.fonts.ready;
      measure();
      engine.play();
      setLive(true);

      teardown = () => {
        observer.disconnect();
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVisibility);
        el.removeEventListener("webglcontextlost", onLost);
        engine.onFrame = null;
        engine.dispose();
        engineRef.current = null;
      };
    };

    const cancelIdle = afterLoad(() => {
      boot();
    });

    return () => {
      cancelled = true;
      cancelIdle();
      teardown?.();
    };
  }, [mode, store]);

  // The plate shows the resting stage's recording; pointing holds its poster.
  const active = reading.stage === null ? null : STAGES[reading.stage];
  const pointed =
    reading.pointed && reading.pointed.stage === reading.stage
      ? reading.pointed.regions
      : null;
  // A phone's page is narrow: it rests on the stage's close-up unless the
  // reader asks for the whole screen, and a pointed claim re-frames it.
  const zoom = pointed
    ? zoomOn(pointed)
    : phone && active && !whole
      ? zoomOn([active.focus], 0)
      : null;
  const size = phone ? 1280 : 1920;

  useEffect(() => {
    const v = video.current;
    if (v && pointed) {
      v.pause();
      v.currentTime = 0;
    }
    // A frame re-syncs the plate and the recording with what changed.
    engineRef.current?.invalidate();
  }, [active, pointed, stopped, whole]);

  if (mode !== "3d") return null;

  return (
    <div ref={holder} className="book-holder">
      <div className="book-frame">
        <canvas
          ref={canvas}
          className="book-canvas"
          aria-hidden="true"
          data-live={live ? "" : undefined}
        />
        <div ref={plate} className="book-plate" data-on="false">
          {active ? (
            <div
              aria-hidden="true"
              className="book-plate-canvas"
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
              <video
                key={active.id}
                ref={video}
                className="book-plate-video"
                poster={active.capture.src}
                src={(active.capture.recording ?? active.capture.src).replace(
                  /\.webp$/,
                  `-${size}.mp4`,
                )}
                muted
                loop
                playsInline
                preload="metadata"
              />
              {pointed?.map((region, i) => (
                <span
                  key={`${region.x}-${region.y}-${i}`}
                  className="book-ring animate-pop-in"
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.w}%`,
                    height: `${region.h}%`,
                  }}
                />
              ))}
            </div>
          ) : null}
          {active && !phone ? (
            <button
              type="button"
              className="book-demo-toggle"
              onClick={() => setStopped((was) => !was)}
              aria-label={`${stopped ? "Play" : "Stop"} the ${active.capture.label ?? "screen"} recording`}
            >
              <span
                aria-hidden="true"
                className="book-demo-dot"
                data-playing={stopped ? "false" : "true"}
              />
              {stopped ? "Play demo" : "Stop demo"}
            </button>
          ) : null}
        </div>
        {active && phone ? (
          <div className="book-band-controls">
            <button
              type="button"
              aria-pressed={whole}
              onClick={() => setWhole((was) => !was)}
              className="book-band-button"
            >
              {whole ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />}
              {whole ? "Close up" : "Whole screen"}
            </button>
            <button
              type="button"
              onClick={() => setStopped((was) => !was)}
              aria-label={`${stopped ? "Play" : "Stop"} the ${active.capture.label ?? "screen"} recording`}
              className="book-band-button"
            >
              <span
                aria-hidden="true"
                className="book-demo-dot"
                data-playing={stopped ? "false" : "true"}
              />
              {stopped ? "Play" : "Stop"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/** The zoom that frames a set of regions, with a margin, inside the plate. */
function zoomOn(regions: readonly Region[], margin = 12) {
  const x0 = Math.min(...regions.map((r) => r.x));
  const y0 = Math.min(...regions.map((r) => r.y));
  const x1 = Math.max(...regions.map((r) => r.x + r.w));
  const y1 = Math.max(...regions.map((r) => r.y + r.h));
  const z = Math.min(
    2.4,
    Math.max(1, Math.min(100 / (x1 - x0 + margin), 100 / (y1 - y0 + margin))),
  );
  const keep = (v: number) => Math.min(0, Math.max(100 - 100 * z, v));
  return {
    z,
    x: keep(50 - ((x0 + x1) / 2) * z),
    y: keep(50 - ((y0 + y1) / 2) * z),
  };
}

/** The pages and the cover for a category: its edition on the cover. */
function contentFor(category: { name: string }) {
  return {
    category: category.name,
    left: STAGES.map((stage) => ({
      index: stage.index,
      name: stage.name,
      runningHead: "Ella & Jack · Sat 3 Oct 2026",
      caption: `Fig. ${stage.index} · ${stage.capture.label} · real screen, seed data`,
    })),
  };
}
