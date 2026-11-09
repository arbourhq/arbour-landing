"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { STAGES } from "@/content/stages";
import type { Engine } from "./engine";
import { canRunBook } from "./story";

/**
 * The home page's book, small, for a page's one 3D moment: shut, its cover
 * pressed with a word of the page's own, dropping in when it scrolls into
 * view, leaning toward the pointer and riffling its pages under a hover.
 * Decorative. Reduced motion, no hardware WebGL or a failed load get the
 * rendered still of the same book instead.
 */
export function MiniBook({
  pressing,
  className,
}: {
  /** The word pressed into the cover. */
  pressing: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");
  const [live, setLive] = useState(false);

  useEffect(() => {
    setMode(canRunBook() ? "3d" : "flat");
  }, []);

  useEffect(() => {
    if (mode !== "3d") return;
    const el = canvas.current;
    const box = host.current;
    if (!el || !box) return;
    let engine: Engine | null = null;
    let cancelled = false;

    const boot = async () => {
      const { Engine } = await import("./engine");
      if (cancelled) return;
      engine = new Engine(el, { phone: true, dpr: 2 });
      try {
        await engine.load({
          posters: STAGES.map(
            (stage) =>
              `/book/posters/${stage.capture.src
                .split("/")
                .pop()
                ?.replace(/-poster\.webp$/, "")}-2048.webp`,
          ),
          category: pressing,
          left: STAGES.map((stage) => ({
            index: stage.index,
            name: stage.name,
            runningHead: "Ella & Jack · Sat 3 Oct 2026",
            caption: `Fig. ${stage.index} · ${stage.capture.label} · real screen, seed data`,
          })),
        });
      } catch {
        engine.dispose();
        engine = null;
        setMode("flat");
        return;
      }
      if (cancelled) return;
      const size = () => {
        if (!engine) return;
        const r = box.getBoundingClientRect();
        engine.setLayout({
          width: r.width,
          height: r.height,
          band: false,
          hero: {
            x: r.width * 0.07,
            y: r.height * 0.1,
            w: r.width * 0.86,
            h: r.height * 0.78,
          },
          read: { gutter: r.width / 2, centreY: r.height / 2, k: r.width / 34 },
          close: { x: 0, y: 0, w: r.width, h: r.height },
        });
        engine.setStory(0);
        engine.snap();
      };
      size();
      engine.play();
      setLive(true);
      const observer = new ResizeObserver(size);
      observer.observe(box);
      cleanup = () => observer.disconnect();
    };

    let cleanup: (() => void) | null = null;
    // Load when it is nearly on screen, not before.
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen.disconnect();
          boot();
        }
      },
      { rootMargin: "200px" },
    );
    seen.observe(box);

    const onMove = (event: PointerEvent) => {
      if (!engine || event.pointerType !== "mouse") return;
      const r = box.getBoundingClientRect();
      engine.setPointer(
        ((event.clientX - r.left) / r.width) * 2 - 1,
        ((event.clientY - r.top) / r.height) * 2 - 1,
      );
    };
    const onEnter = () => engine?.riffle();
    const onLeave = () => engine?.setPointer(0, 0);
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerenter", onEnter);
    box.addEventListener("pointerleave", onLeave);
    const onLost = (event: Event) => {
      event.preventDefault();
      setMode("flat");
    };
    el.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelled = true;
      seen.disconnect();
      cleanup?.();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerenter", onEnter);
      box.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("webglcontextlost", onLost);
      engine?.dispose();
    };
  }, [mode, pressing]);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={`mini-book ${className ?? ""}`}
    >
      {mode === "3d" ? (
        <canvas
          ref={canvas}
          className="mini-book-canvas"
          data-live={live ? "" : undefined}
        />
      ) : mode === "flat" ? (
        <Image
          src="/book/stills/hero.webp"
          alt=""
          width={1273}
          height={755}
          sizes="(min-width: 1024px) 420px, 80vw"
          className="mini-book-still"
        />
      ) : null}
    </div>
  );
}
