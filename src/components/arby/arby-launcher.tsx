"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HelpPanel } from "./help-panel";
import { standing } from "./poses/standing";
import "./arby-launcher.css";

/**
 * Arby Help's way in: a small Arby standing in a square of floating chrome
 * at the foot of the window, bottom right. The 3D book carries the page's
 * motion now, so the bird keeps still; it lifts on hover like any button
 * and steps aside while the chat it opens is up. The Arby block on the home
 * page opens the same chat (it dispatches `arby-help-open`), and closing the
 * chat hands focus back to whatever opened it.
 */
export function ArbyLauncher() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const openFromPage = () => {
      const focused = document.activeElement;
      returnTo.current = focused instanceof HTMLElement ? focused : null;
      setOpen(true);
    };
    window.addEventListener("arby-help-open", openFromPage);
    return () => window.removeEventListener("arby-help-open", openFromPage);
  }, []);

  useLayoutEffect(() => {
    if (open || !returnTo.current) return;
    returnTo.current.focus({ preventScroll: true });
    returnTo.current = null;
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="arby-launcher"
        aria-label="Open Arby Help"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="arby-help"
        data-open={open}
        onClick={() => {
          returnTo.current = trigger.current;
          setOpen(true);
        }}
      >
        {/* The standing pose, framed on the bird itself. */}
        <svg viewBox="-60 20 920 880" fill="none" aria-hidden="true">
          {standing.render("arby-launcher")}
        </svg>
      </button>
      <HelpPanel open={open} panelRef={panel} onClose={() => setOpen(false)} />
    </>
  );
}
