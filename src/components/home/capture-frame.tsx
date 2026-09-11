"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Capture } from "@/content/stages";

/** Real console captures, inside the site's square marketing frame. */
export type FrameTone = "bottle" | "acid";

const FRAME: Record<FrameTone, string> = {
  bottle: "border-bottle",
  acid: "border-acid",
};

export function CaptureFrame({
  capture,
  tone,
  caption,
  mark,
  sizes,
  priority = false,
  className,
}: {
  capture: Capture;
  tone: FrameTone;
  caption?: string;
  /** The stage's accent square before the caption. */
  mark?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const frame = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [failed, setFailed] = useState(false);

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

  const playing = inView && motionAllowed && !stopped && !failed;

  return (
    <figure ref={frame} className={`m-0 ${className ?? ""}`}>
      <div className={`overflow-hidden border-2 bg-app ${FRAME[tone]}`}>
        <Image
          src={playing && capture.recording ? capture.recording : capture.src}
          alt={capture.alt}
          width={capture.width}
          height={capture.height}
          sizes={sizes}
          preload={priority}
          unoptimized={Boolean(capture.recording)}
          onError={() => setFailed(true)}
          className="block h-auto w-full"
        />
      </div>
      {caption || capture.recording ? (
        <figcaption
          className={`label-mono mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 ${capture.recording ? "min-h-8" : ""}`}
        >
          {caption ? (
            <span className="flex items-center gap-2.5 opacity-80">
              {mark ? (
                <span
                  aria-hidden="true"
                  className={`block h-2.5 w-2.5 shrink-0 ${mark}`}
                />
              ) : null}
              {caption}
            </span>
          ) : null}
          {capture.recording && motionAllowed && !failed ? (
            <button
              type="button"
              onClick={() => setStopped((value) => !value)}
              aria-label={`${stopped ? "Play" : "Stop"} ${capture.label} demo`}
              className="ml-auto min-h-8 cursor-pointer border border-current px-3 py-1 text-current uppercase hover:opacity-70"
            >
              {stopped ? "Play demo" : "Stop demo"}
            </button>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
