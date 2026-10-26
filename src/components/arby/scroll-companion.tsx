"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArbyBranch } from "./branch";
import { flying } from "./poses/flying";
import { standing } from "./poses/standing";
import { HelpPanel } from "./help-panel";
import {
  birdBounds,
  choosePerch,
  clamp,
  cubic,
  flightVariation,
  overlap,
  perchesOnEdge,
  planFlight,
  type FlightLeg,
  type Perch,
  type Point,
  type Rect,
} from "./flight";
import "./scroll-companion.css";

type Phase = "perched" | "flying" | "landing";

/**
 * What Arby says on landing, by the kind of perch: a nudge that the bird is
 * the way into Arby Help, in the voice of whatever the reader is looking at.
 * The second line is the instruction, set as a mono label.
 */
const LINES: Record<string, [string, string]> = {
  hello: ["G'day. I'm Arby.", "me with any question"],
  capture: ["Want a screen explained?", "me and ask"],
  facts: ["Want the long version?", "me and ask"],
  vendors: ["Not sure it fits your trade?", "me and ask"],
  pricing: ["Doing the plan maths?", "me, I'll help"],
  faq: ["Not on the list?", "me and ask"],
  branch: ["Questions? I'm right here.", "the bird"],
};

/** Landings that may speak per page view, the hello included. */
const MAX_SAYS = 4;
const SAY_MS = 5200;

function visible(rect: DOMRect) {
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom >= 0 &&
    rect.top <= innerHeight
  );
}

function pad(rect: DOMRect): Rect {
  return {
    left: rect.left - 6,
    right: rect.right + 6,
    top: rect.top - 6,
    bottom: rect.bottom + 6,
  };
}

/** One bird for the home page. React mounts the art; the controller moves it. */
export function ScrollCompanion() {
  const actor = useRef<HTMLDivElement>(null);
  const branch = useRef<HTMLDivElement>(null);
  const helpTrigger = useRef<HTMLButtonElement | null>(null);
  const helpPanel = useRef<HTMLDialogElement>(null);
  const sayLead = useRef<HTMLSpanElement>(null);
  const sayCue = useRef<HTMLSpanElement>(null);
  const setHelpPerch = useRef<((open: boolean) => void) | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  function openHelp() {
    const focused = document.activeElement;
    helpTrigger.current = focused instanceof HTMLButtonElement ? focused : null;
    setHelpOpen(true);
  }

  useEffect(() => {
    const main = document.getElementById("main");
    if (!actor.current || !branch.current || !main) return;
    const bird = actor.current;
    const twig = branch.current;

    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let phase: Phase = "perched";
    let frame = 0;
    let stopTimer = 0;
    let layoutTimer = 0;
    let lastFrame = 0;
    let lastScroll = 0;
    let scrollY = window.scrollY;
    let scrollSpeed = 0;
    let position: Point = { x: 0, y: 0 };
    let velocity: Point = { x: 0, y: 0 };
    let destination: Perch | undefined;
    let curve: [Point, Point, Point, Point] | undefined;
    let landingStart = 0;
    let landingDuration = 0;
    let flightLeg: FlightLeg | undefined;
    let legElapsed = 0;
    let gliding = false;
    let relands = 0;
    let variation = flightVariation();
    let facing = -1;
    let bank = 0;
    let size = 120;
    let viewport: Rect = { left: 0, top: 0, right: 0, bottom: 0 };
    let helping = false;
    let says = 0;
    let lastSaid = "";
    let sayTimer = 0;
    const supportsScrollEnd = "onscrollend" in document;
    const verb = matchMedia("(pointer: coarse)").matches ? "Tap" : "Click";

    const enabled = () =>
      (helping || !preference.matches) &&
      !document.hidden &&
      (window.visualViewport?.scale ?? 1) <= 1.05;

    function measureViewport() {
      size = window.innerWidth < 640 ? 80 : 120;
      const visual = window.visualViewport;
      viewport = {
        left: (visual?.offsetLeft ?? 0) + 8,
        right: (visual?.offsetLeft ?? 0) + (visual?.width ?? innerWidth) - 8,
        top:
          Math.max(
            visual?.offsetTop ?? 0,
            document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0,
          ) + 16,
        bottom: (visual?.offsetTop ?? 0) + (visual?.height ?? innerHeight) - 48,
      };
      bird.style.setProperty("--arby-size", `${size}px`);
    }

    function obstacles(): Rect[] {
      const hardObstacles =
        "a,button,input,select,textarea,summary,fieldset,img,[data-arby-avoid]";
      const occupied = Array.from(
        document.querySelectorAll<HTMLElement>(hardObstacles),
      )
        .filter((element) => !element.closest("[data-arby-ui]"))
        .flatMap((element) => {
          const rect = element.getBoundingClientRect();
          return visible(rect) ? [pad(rect)] : [];
        });

      // Block-level boxes include empty columns and space after short lines.
      // Measure painted text instead, once when choosing a perch, never per frame.
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      const range = document.createRange();
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (
          !node.textContent?.trim() ||
          !parent ||
          parent.closest(
            `${hardObstacles},[data-arby-ui],script,style,noscript,svg,[hidden],.sr-only`,
          ) ||
          !visible(parent.getBoundingClientRect())
        )
          continue;
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (visible(rect)) occupied.push(pad(rect));
        }
      }
      return occupied;
    }

    function findPerch(): Perch {
      measureViewport();
      if (helping && helpPanel.current) {
        const rect = helpPanel.current.getBoundingClientRect();
        return {
          id: "help",
          x: rect.right - size * 0.65,
          y: rect.top,
          branch: false,
        };
      }
      const occupied = obstacles();
      const candidates: Perch[] = [];
      document
        .querySelectorAll<HTMLElement>("[data-arby-perch]")
        .forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          if (
            !rect.width ||
            !rect.height ||
            rect.bottom < 0 ||
            rect.top > innerHeight
          )
            return;
          // Reveal transforms can still be settling. Their final point is checked
          // again at touchdown and after layout changes.
          candidates.push(
            ...perchesOnEdge(
              rect,
              size,
              `${element.dataset.arbyPerch || "perch"}:${index}`,
            ),
          );
        });
      const edgeX = viewport.right - size * 0.6;
      for (
        let y = viewport.bottom - size * 0.2;
        y > viewport.top + size;
        y -= size * 1.1
      ) {
        candidates.push({
          id: `branch-${Math.round(y)}`,
          x: edgeX,
          y,
          branch: true,
        });
      }
      const clear = choosePerch(candidates, occupied, viewport, position, size);
      if (clear) return clear;

      // A dense phone viewport may have no empty patch. The small edge branch
      // is still a physical perch; avoid controls first, then minimise overlap.
      const edgeCandidates = candidates.filter((candidate) => candidate.branch);
      const controls = Array.from(
        document.querySelectorAll("a,button,input,select,textarea,summary"),
      ).map((element) => element.getBoundingClientRect());
      const cost = (perch: Perch) => {
        const box = birdBounds(perch, size);
        return (
          occupied.reduce((sum, rect) => sum + overlap(box, rect), 0) +
          controls.reduce((sum, rect) => sum + overlap(box, rect) * 100, 0)
        );
      };
      return (
        edgeCandidates.toSorted((a, b) => cost(a) - cost(b))[0] ?? {
          id: "branch-bottom",
          x: edgeX,
          y: Math.max(viewport.top + size * 0.8, viewport.bottom - size * 0.2),
          branch: true,
        }
      );
    }

    function draw() {
      bird.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      bird.style.setProperty("--arby-facing", String(facing));
      bird.style.setProperty("--arby-bank", `${bank}deg`);
      bird.dataset.phase = phase;
      bird.dataset.gait = gliding && phase === "flying" ? "glide" : "flap";
      bird.dataset.flight = flightLeg?.kind ?? "";
      bird.dataset.perch = destination?.id ?? "";
      bird.style.visibility = enabled() ? "visible" : "hidden";
      const showBranch = enabled() && destination?.branch && phase !== "flying";
      twig.style.visibility = showBranch ? "visible" : "hidden";
      if (showBranch && destination) {
        twig.style.transform = `translate3d(${destination.x - size * 0.42}px, ${destination.y - 5}px, 0)`;
        twig.style.width = `${innerWidth - destination.x + size * 0.42 + 10}px`;
      }
    }

    /**
     * What the reader is looking at: the perch the bird is on, or on the edge
     * branch, the perch-marked block nearest the middle of the window.
     */
    function context() {
      const own = destination?.id.split(/[:-]/)[0];
      if (own && own !== "branch") return own;
      const middle = innerHeight / 2;
      let best = "branch";
      let distance = innerHeight * 0.35;
      document
        .querySelectorAll<HTMLElement>("[data-arby-perch]")
        .forEach((element) => {
          const rect = element.getBoundingClientRect();
          const d =
            rect.top > middle
              ? rect.top - middle
              : rect.bottom < middle
                ? middle - rect.bottom
                : 0;
          if (d < distance) {
            distance = d;
            best = element.dataset.arbyPerch || "branch";
          }
        });
      return best;
    }

    /** Where the bubble sits, measured whenever the bird settles. */
    function placeSay() {
      bird.dataset.side = position.x > innerWidth / 2 ? "right" : "left";
      bird.dataset.place =
        position.y - size * 0.95 - 76 < viewport.top ? "beside" : "above";
    }

    function hush() {
      clearTimeout(sayTimer);
      bird.dataset.say = "false";
    }

    /**
     * A speech bubble on landing, at most MAX_SAYS times a page and never the
     * same kind of perch twice running, so it reads as a nudge, not a nag.
     * Above the head unless the nav is in the way, then beside it, always on
     * the side toward the page.
     */
    function speak(kind?: string) {
      const perch = kind ?? context();
      if (helping || perch === "help" || says >= MAX_SAYS) return;
      if (perch === lastSaid) return;
      const [lead, cue] = LINES[perch] ?? LINES.branch;
      if (sayLead.current) sayLead.current.textContent = lead;
      if (sayCue.current) sayCue.current.textContent = `${verb} ${cue}`;
      says += 1;
      lastSaid = perch;
      placeSay();
      clearTimeout(sayTimer);
      bird.dataset.say = "true";
      sayTimer = window.setTimeout(hush, SAY_MS);
    }

    function park() {
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(stopTimer);
      scrollY = window.scrollY;
      lastFrame = 0;
      relands = 0;
      destination = findPerch();
      position = { x: destination.x, y: destination.y };
      velocity = { x: 0, y: 0 };
      phase = "perched";
      bank = 0;
      facing = position.x > innerWidth / 2 ? -1 : 1;
      placeSay();
      draw();
    }

    function tick(now: number) {
      frame = 0;
      // Never leave a frozen bird mid-air; hide it until it can park again.
      if (!enabled()) {
        refresh();
        return;
      }
      const dt = Math.min(32, lastFrame ? now - lastFrame : 16);
      lastFrame = now;
      const previous = position;

      if (phase === "flying") {
        if (!flightLeg) beginFlightLeg();
        if (!flightLeg) return;
        legElapsed += dt;
        const progress = clamp(legElapsed / flightLeg.duration, 0, 1);
        position = cubic(flightLeg.points, progress);
        gliding =
          flightLeg.kind === "glide" && progress > 0.18 && progress < 0.82;
        scrollSpeed *= Math.exp(-dt / 200);
      } else if (phase === "landing" && curve && destination) {
        const progress = clamp((now - landingStart) / landingDuration, 0, 1);
        position = cubic(curve, progress);
        if (progress === 1) {
          if (!destination.branch) {
            const settled = findPerch();
            const moved =
              Math.hypot(settled.x - position.x, settled.y - position.y) > 3;
            // A perch that keeps shifting gets two chases, then Arby sits where it is.
            if (moved && relands < 2) {
              relands += 1;
              phase = "flying";
              land();
              return;
            }
            if (!moved) {
              destination = settled;
              position = { x: settled.x, y: settled.y };
            }
          }
          phase = "perched";
          bank = 0;
          facing = position.x > innerWidth / 2 ? -1 : 1;
          // A short, finite landing compression. No idle loop while reading.
          bird.dataset.landed = String(now);
          window.setTimeout(() => {
            if (phase === "perched") speak();
          }, 360);
          if (!preference.matches)
            bird
              .querySelector(".arby-rest")
              ?.animate(
                [
                  { transform: "scale(1.05, .93)" },
                  { transform: "scale(.99, 1.02)" },
                  { transform: "scale(1)" },
                ],
                { duration: 280, easing: "ease-out" },
              );
        }
      }

      velocity = {
        x: (position.x - previous.x) / dt,
        y: (position.y - previous.y) / dt,
      };
      if (phase !== "perched") {
        if (Math.abs(velocity.x) > 0.05) facing = velocity.x > 0 ? 1 : -1;
        const targetBank = clamp(velocity.y * 16, -14, 14) * facing;
        bank += (targetBank - bank) * (1 - Math.exp(-dt / 110));
      }
      if (phase === "flying" && flightLeg && legElapsed >= flightLeg.duration) {
        beginFlightLeg();
      }
      draw();
      if (phase !== "perched") frame = requestAnimationFrame(tick);
    }

    function beginFlightLeg() {
      flightLeg = planFlight(
        position,
        velocity,
        viewport,
        size,
        scrollSpeed,
        flightLeg?.kind,
      );
      legElapsed = 0;
      gliding = false;
      // Climbs work harder; glides keep the wings open through their middle.
      const beat =
        flightLeg.kind === "climb"
          ? variation.wingbeat * 0.8
          : variation.wingbeat;
      bird.style.setProperty("--arby-wingbeat", `${beat}ms`);
    }

    function wake() {
      if (!frame && enabled()) frame = requestAnimationFrame(tick);
    }

    function land() {
      if (!enabled() || phase !== "flying") return;
      destination = findPerch();
      const distance = Math.hypot(
        destination.x - position.x,
        destination.y - position.y,
      );
      landingDuration = clamp(280 + distance * 0.65, 300, 780);
      landingStart = performance.now();
      curve = [
        { ...position },
        {
          x: clamp(
            position.x + velocity.x * 150,
            viewport.left + size / 2,
            viewport.right - size / 2,
          ),
          y: clamp(
            position.y + velocity.y * 100 - variation.lift,
            viewport.top + size,
            viewport.bottom,
          ),
        },
        {
          x: clamp(
            destination.x + (variation.approach * size) / 120,
            viewport.left + size * 0.6,
            viewport.right - size * 0.6,
          ),
          y: Math.max(
            viewport.top + size * 0.8,
            destination.y - 46 - variation.lift,
          ),
        },
        { x: destination.x, y: destination.y },
      ];
      phase = "landing";
      wake();
    }

    function onScroll() {
      const now = performance.now();
      const delta = window.scrollY - scrollY;
      scrollY = window.scrollY;
      if (!delta || !enabled() || helping) return;
      scrollSpeed = clamp(delta / Math.max(16, now - lastScroll), -2.5, 2.5);
      lastScroll = now;
      clearTimeout(stopTimer);
      if (phase !== "flying") {
        hush();
        variation = flightVariation();
        beginFlightLeg();
        phase = "flying";
        destination = undefined;
        lastFrame = 0;
        relands = 0;
      }
      wake();
      // Scroll anchoring and other layout nudges scroll without a scrollend,
      // so always keep a fallback landing queued.
      stopTimer = window.setTimeout(land, supportsScrollEnd ? 400 : 180);
    }

    function onScrollEnd() {
      clearTimeout(stopTimer);
      if (helping) return;
      // Some wheel devices emit scrollend between individual notches.
      stopTimer = window.setTimeout(
        land,
        Math.max(0, 120 - (performance.now() - lastScroll)),
      );
    }

    function refresh() {
      document.documentElement.setAttribute("data-arby-ready", "");
      document.documentElement.toggleAttribute(
        "data-arby-companion",
        helping || !preference.matches,
      );
      if (!enabled()) {
        cancelAnimationFrame(frame);
        frame = 0;
        clearTimeout(stopTimer);
        phase = "perched";
        bird.dataset.phase = phase;
        bird.style.visibility = "hidden";
        twig.style.visibility = "hidden";
        return;
      }
      park();
    }

    function onLayout() {
      clearTimeout(layoutTimer);
      // Coalesce FAQ changes, font settling, image loads and browser chrome.
      layoutTimer = window.setTimeout(() => {
        if (!enabled()) {
          refresh();
          return;
        }
        if (phase === "perched") park();
        else if (phase === "landing") {
          phase = "flying";
          land();
        } else {
          measureViewport();
          beginFlightLeg();
        }
      }, 120);
    }

    const resize = new ResizeObserver(onLayout);
    resize.observe(main);
    if (helpPanel.current) resize.observe(helpPanel.current);
    document
      .querySelectorAll("[data-arby-perch]")
      .forEach((element) => resize.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onLayout);
    window.visualViewport?.addEventListener("resize", onLayout);
    document.addEventListener("visibilitychange", refresh);
    preference.addEventListener("change", refresh);
    window.addEventListener("arby-help-open", openHelp);
    setHelpPerch.current = (open) => {
      if (helping === open) return;
      const wasVisible = enabled();
      helping = open;
      bird.dataset.help = String(open);
      hush();
      // Once someone has found the chat, the bird has made its point.
      if (open) says = MAX_SAYS;
      clearTimeout(stopTimer);
      clearTimeout(layoutTimer);
      document.documentElement.toggleAttribute(
        "data-arby-companion",
        helping || !preference.matches,
      );
      if (!enabled()) {
        refresh();
        return;
      }
      // Keep the current position and velocity, including an interrupted flight.
      if (preference.matches || !wasVisible) {
        park();
        return;
      }
      phase = "flying";
      land();
    };
    refresh();
    // The hello, once the page has settled and the bird is on its perch.
    const helloTimer = window.setTimeout(() => {
      if (enabled() && phase === "perched") speak("hello");
    }, 1400);

    return () => {
      clearTimeout(helloTimer);
      clearTimeout(sayTimer);
      cancelAnimationFrame(frame);
      clearTimeout(stopTimer);
      clearTimeout(layoutTimer);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onLayout);
      window.visualViewport?.removeEventListener("resize", onLayout);
      document.removeEventListener("visibilitychange", refresh);
      preference.removeEventListener("change", refresh);
      window.removeEventListener("arby-help-open", openHelp);
      setHelpPerch.current = null;
      document.documentElement.removeAttribute("data-arby-companion");
      document.documentElement.removeAttribute("data-arby-ready");
    };
  }, []);

  useLayoutEffect(() => {
    setHelpPerch.current?.(helpOpen);
    if (!helpOpen && helpTrigger.current) {
      helpTrigger.current.focus({ preventScroll: true });
      helpTrigger.current = null;
    }
  }, [helpOpen]);

  function closeHelp() {
    setHelpOpen(false);
  }

  return (
    <>
      <div ref={branch} className="arby-branch" aria-hidden="true" data-arby-ui>
        <ArbyBranch />
      </div>
      <div
        ref={actor}
        className="arby-companion"
        data-arby-ui
        data-phase="perched"
      >
        <div className="arby-direction" aria-hidden="true">
          <svg className="arby-flight" viewBox="0 0 1000 1000" fill="none">
            {flying.render("companion-flight")}
          </svg>
          <svg className="arby-rest" viewBox="0 0 1000 1000" fill="none">
            {standing.render("companion-rest")}
          </svg>
        </div>
        <button
          type="button"
          className="arby-hitarea"
          aria-label="Open Arby Help"
          aria-haspopup="dialog"
          aria-expanded={helpOpen}
          aria-controls="arby-help"
          onClick={openHelp}
        >
          {/* The speech bubble lives inside the hit area, so hovering it
              keeps it up and clicking it opens the chat. The button's label
              already says what it does, so the bubble is not read out. */}
          <span className="arby-say" aria-hidden="true">
            <span ref={sayLead} className="arby-say-lead">
              {LINES.hello[0]}
            </span>
            <span ref={sayCue} className="arby-say-cue mono-label">
              Click {LINES.hello[1]}
            </span>
          </span>
        </button>
      </div>
      <HelpPanel open={helpOpen} panelRef={helpPanel} onClose={closeHelp} />
    </>
  );
}
