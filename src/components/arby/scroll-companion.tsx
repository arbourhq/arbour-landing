"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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

/** Two hard silhouette edges preserve the artwork on light and dark grounds. */
function ArbyOutline({ id }: { id: string }) {
  return (
    <defs>
      <filter
        id={id}
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius="28"
          result="outer"
        />
        <feFlood floodColor="#0F2A1E" />
        <feComposite in2="outer" operator="in" result="ink" />
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius="18"
          result="inner"
        />
        <feFlood floodColor="#FFFBEF" />
        <feComposite in2="inner" operator="in" result="cream" />
        <feMerge>
          <feMergeNode in="ink" />
          <feMergeNode in="cream" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** One bird for the home page. React mounts the art; the controller moves it. */
export function ScrollCompanion() {
  const outlineId = `arby-outline-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const actor = useRef<HTMLDivElement>(null);
  const branch = useRef<HTMLDivElement>(null);
  const helpTrigger = useRef<HTMLButtonElement | null>(null);
  const helpPanel = useRef<HTMLDialogElement>(null);
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
    let variation = flightVariation();
    let facing = -1;
    let bank = 0;
    let size = 120;
    let viewport: Rect = { left: 0, top: 0, right: 0, bottom: 0 };
    let helping = false;
    const supportsScrollEnd = "onscrollend" in document;

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
          candidates.push(...perchesOnEdge(rect, size, String(index)));
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

    function park() {
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(stopTimer);
      scrollY = window.scrollY;
      lastFrame = 0;
      destination = findPerch();
      position = { x: destination.x, y: destination.y };
      velocity = { x: 0, y: 0 };
      phase = "perched";
      bank = 0;
      facing = position.x > innerWidth / 2 ? -1 : 1;
      draw();
    }

    function tick(now: number) {
      frame = 0;
      if (!enabled()) return;
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
            if (
              Math.hypot(settled.x - position.x, settled.y - position.y) > 3
            ) {
              phase = "flying";
              land();
              return;
            }
            destination = settled;
            position = { x: settled.x, y: settled.y };
          }
          phase = "perched";
          bank = 0;
          facing = position.x > innerWidth / 2 ? -1 : 1;
          // A short, finite landing compression. No idle loop while reading.
          bird.dataset.landed = String(now);
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
        variation = flightVariation();
        beginFlightLeg();
        phase = "flying";
        destination = undefined;
        lastFrame = 0;
      }
      wake();
      if (!supportsScrollEnd) stopTimer = window.setTimeout(land, 180);
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

    return () => {
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
      <noscript>
        <style>{`.arby-copy { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
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
            <ArbyOutline id={`${outlineId}-flight`} />
            <g filter={`url(#${outlineId}-flight)`}>
              {flying.render("companion-flight")}
            </g>
          </svg>
          <svg className="arby-rest" viewBox="0 0 1000 1000" fill="none">
            <ArbyOutline id={`${outlineId}-rest`} />
            <g filter={`url(#${outlineId}-rest)`}>
              {standing.render("companion-rest")}
            </g>
          </svg>
        </div>
        <button
          type="button"
          className="arby-hitarea"
          aria-label="Open Arby Help"
          aria-haspopup="dialog"
          aria-expanded={helpOpen}
          aria-controls="arby-help"
          title="Ask Arby"
          onClick={openHelp}
        />
      </div>
      <HelpPanel open={helpOpen} panelRef={helpPanel} onClose={closeHelp} />
    </>
  );
}
