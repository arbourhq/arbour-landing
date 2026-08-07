"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   The pointer, replaced by the site's own acid square.

   The square sits exactly on the pointer: no trailing, no lag, so clicking is
   as accurate as the native cursor. Movement is expressed in the shape instead.
   Pointer velocity feeds a spring that stretches the square along its travel
   and squashes it across, and that spring is underdamped, so coming to a stop
   wobbles it back into a square rather than snapping.

   A second spring morphs the shape (idle square, fat hover square, caret), and
   the ground under the pointer is sampled so the square flips to Bottle on an
   Acid section instead of vanishing into it.

   Everything is transform-only inside a single rAF loop. No React state is
   touched per frame.
   --------------------------------------------------------------------------- */

/** The inner box's real box size. Every shape below is a scale off this. */
const BASE = 16;

/** px. The square is the same beat as the h-7/h-5 acid chips on the site. */
const SHAPES = {
  idle: { w: 15, h: 15 },
  /** Links and buttons: the square opens up to frame what is under it. */
  action: { w: 34, h: 34 },
  /** Text fields: the same acid caret the about page blinks. */
  text: { w: 3, h: 26 },
} as const;

type ShapeName = keyof typeof SHAPES;

/** Fixed physics substep, so the feel is identical at 60Hz and 120Hz. */
const STEP = 1 / 240;
/** A dropped frame must not fire a hundred catch-up substeps. */
const MAX_FRAME = 0.05;

/**
 * Shape morph spring. Critical damping here would be 2*sqrt(440) = 42, and we
 * run under it on purpose: the brand curve overshoots, so the square does too.
 */
const SHAPE_STIFFNESS = 440;
const SHAPE_DAMPING = 26;

/** Stretch spring. Well under its critical 60, which is where the wobble is. */
const STRETCH_STIFFNESS = 900;
const STRETCH_DAMPING = 30;

/** Seconds of half-life on the measured pointer speed once the hand stops. */
const SPEED_DECAY = 0.04;
/** px/s at which the stretch is maxed out. A hard flick is around 3000. */
const SPEED_FULL = 2200;
/** How far the square is allowed to stretch along its travel. */
const MAX_STRETCH = 0.5;
/** Squash across the travel axis, as a fraction of the stretch. */
const SQUASH_RATIO = 0.5;
/** Held down: the square gets stood on. */
const PRESS_SCALE = 0.68;

const ACTION_SELECTOR =
  'a[href], button, [role="button"], summary, select, label[for], [data-cursor="action"]';
/**
 * Which of those are solid enough to invert the square's colour on. Every
 * clickable thing opens the square up, but a colour flip on a 13px inline link
 * is noise, so this is the buttons only: anything built by buttonClass, plus
 * the chip buttons that carry their own styling and opt in by hand.
 */
const BUTTON_SELECTOR = '.ui-button, [data-cursor="button"]';
const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable=""], [contenteditable="true"]';

/** Acid, #C6FF3D. An Acid square on an Acid section is an invisible square. */
const ACID_RGB = [198, 255, 61] as const;
/**
 * How close a ground has to sit to Acid before the square inverts. Acid wash
 * is 151 away and Sprout (product mocks) is 65, so neither trips it.
 */
const ACID_TOLERANCE = 45;
/** Seconds between ground samples. Cheap enough to catch hover transitions. */
const SAMPLE_EVERY = 0.09;
/** px. A flood is a band, not a hairline divider that happens to be full width. */
const FLOOD_MIN_HEIGHT = 48;

/** Acid on everything else, Bottle on Acid. The two legal wordmark grounds. */
const SKINS = {
  onAcid: { fill: "#0B4030", shadow: "inset 0 -3px 0 rgba(0,0,0,.35)" },
  onRest: { fill: "#C6FF3D", shadow: "inset 0 -3px 0 rgba(11,64,48,.4)" },
} as const;

type SkinName = keyof typeof SKINS;

/** Wrap to (-90, 90]. A stretched square is symmetric under a half turn, so
 *  reversing direction can be drawn without a visible 180 degree spin. */
function wrapAngle(deg: number) {
  let a = deg % 180;
  if (a > 90) a -= 180;
  if (a <= -90) a += 180;
  return a;
}

/**
 * True when the section flood under (x, y) is Acid.
 *
 * Only edge-to-edge bands are read. A colour on this site floods a whole
 * section, so anything narrower than the viewport is a button, a card or a
 * panel, and those must not repaint the cursor as it passes over them: the
 * square would flicker its way down the page. Narrow elements are stepped over
 * rather than stopped at, so the band behind them is what answers.
 */
function overAcidFlood(x: number, y: number) {
  const full = document.documentElement.clientWidth;
  let node = document.elementFromPoint(x, y);
  while (node) {
    const rect = node.getBoundingClientRect();
    if (rect.width >= full - 1 && rect.height >= FLOOD_MIN_HEIGHT) {
      const parsed = getComputedStyle(node).backgroundColor.match(
        /^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/,
      );
      // Anything the browser reports in a format we cannot read (a color-mix,
      // an oklab) is treated as "keep looking", which lands on the next band up.
      if (parsed && Number(parsed[4] ?? 1) > 0.5) {
        const distance = Math.hypot(
          Number(parsed[1]) - ACID_RGB[0],
          Number(parsed[2]) - ACID_RGB[1],
          Number(parsed[3]) - ACID_RGB[2],
        );
        return distance <= ACID_TOLERANCE;
      }
    }
    node = node.parentElement;
  }
  return false;
}

export function Cursor() {
  const frameRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frameRef.current || !boxRef.current) return;
    if (typeof matchMedia === "undefined") return;
    // Read after the guard so both stay non-null inside the nested functions.
    const frame = frameRef.current;
    const box = boxRef.current;

    // A trackpad or mouse only. Touch keeps the platform's own behaviour, and
    // anyone who has asked for less motion keeps their real cursor.
    const fine = matchMedia("(pointer: fine)");
    const still = matchMedia("(prefers-reduced-motion: reduce)");

    let teardown: (() => void) | null = null;

    function start() {
      const root = document.documentElement;
      root.classList.add("cursor-swapped");

      /* A modal <dialog> lives in the top layer, which paints above every
         z-index in the document, so the square went behind the waitlist modal
         while cursor-swapped was still hiding the real pointer: no cursor at
         all. A manual popover is the one other way into the top layer, and
         within it the most recently promoted element wins, so the square has
         to re-enter after any dialog opens to stay on top. Manual, not auto,
         because an auto popover light-dismisses itself. */
      const promotable = typeof frame.showPopover === "function";

      function promote() {
        if (!promotable) return;
        if (frame.matches(":popover-open")) frame.hidePopover();
        frame.showPopover();
      }

      // showModal() sets the open attribute, so watching it catches every
      // dialog on the site without them having to announce themselves.
      const dialogs = new MutationObserver((records) => {
        for (const record of records) {
          if (
            record.target instanceof Element &&
            record.target.matches("dialog[open]")
          ) {
            promote();
            return;
          }
        }
      });

      promote();
      dialogs.observe(document.body, {
        attributeFilter: ["open"],
        attributes: true,
        subtree: true,
      });

      const pointer = { x: 0, y: 0 };
      /** Measured pointer velocity, px/s, decaying toward nothing. */
      const speed = { x: 0, y: 0 };
      const size = { w: SHAPES.idle.w, h: SHAPES.idle.h };
      const sizeVel = { w: 0, h: 0 };
      let stretch = 0;
      let stretchVel = 0;
      let shape: ShapeName = "idle";
      let pressed = false;
      let placed = false;
      let acid = false;
      let onButton = false;
      let skin: SkinName = "onRest";
      let sampleIn = 0;
      let lastMove = 0;
      let raf = 0;
      let last = 0;
      let accumulator = 0;

      /**
       * The square is the opposite of the ground it sits on, and over a button
       * it inverts again. Inverting rather than picking a third colour keeps
       * the square on the two legal wordmark grounds wherever it happens to be.
       */
      function applySkin() {
        const wanted: SkinName =
          (onButton ? !acid : acid) ? "onAcid" : "onRest";
        if (wanted === skin) return;
        skin = wanted;
        box.style.backgroundColor = SKINS[wanted].fill;
        box.style.boxShadow = SKINS[wanted].shadow;
      }

      function sampleGround() {
        acid = overAcidFlood(pointer.x, pointer.y);
        applySkin();
      }

      function integrate(h: number) {
        // Measured speed bleeds off on its own. A moving pointer keeps
        // refreshing it, a stopped one has nothing left within ~120ms.
        const bleed = 0.5 ** (h / SPEED_DECAY);
        speed.x *= bleed;
        speed.y *= bleed;

        // Semi-implicit Euler: velocity first, then value off the new velocity.
        // Stays stable at these stiffnesses where plain Euler drifts.
        const want =
          Math.min(Math.hypot(speed.x, speed.y) / SPEED_FULL, 1) * MAX_STRETCH;
        stretchVel +=
          (STRETCH_STIFFNESS * (want - stretch) -
            STRETCH_DAMPING * stretchVel) *
          h;
        stretch += stretchVel * h;

        const press = pressed ? PRESS_SCALE : 1;
        const wantW = SHAPES[shape].w * press;
        const wantH = SHAPES[shape].h * press;
        sizeVel.w +=
          (SHAPE_STIFFNESS * (wantW - size.w) - SHAPE_DAMPING * sizeVel.w) * h;
        sizeVel.h +=
          (SHAPE_STIFFNESS * (wantH - size.h) - SHAPE_DAMPING * sizeVel.h) * h;
        size.w += sizeVel.w * h;
        size.h += sizeVel.h * h;
      }

      function draw() {
        // The spring can undershoot past zero on the way back. Squares do not
        // invert, so the drawn stretch is clamped even though the spring is not.
        const s = Math.max(stretch, 0);
        // Rotation is weighted by the stretch as well, so the square unwinds to
        // axis-aligned as it settles rather than parking on a diagonal.
        const travel = s / MAX_STRETCH;
        const angle =
          travel > 0.002
            ? wrapAngle((Math.atan2(speed.y, speed.x) * 180) / Math.PI) * travel
            : 0;

        frame.style.transform =
          `translate3d(${pointer.x}px, ${pointer.y}px, 0) rotate(${angle}deg) ` +
          `scale(${1 + s}, ${1 - s * SQUASH_RATIO})`;
        box.style.transform = `translate(-50%, -50%) scale(${size.w / BASE}, ${size.h / BASE})`;
      }

      function tick(now: number) {
        raf = requestAnimationFrame(tick);
        if (!last) last = now;
        const dt = Math.min((now - last) / 1000, MAX_FRAME);
        accumulator += dt;
        last = now;
        while (accumulator >= STEP) {
          integrate(STEP);
          accumulator -= STEP;
        }
        draw();

        // Polled rather than event-driven: this also has to catch scrolling
        // and the hover colour changes that run on a 200ms transition.
        sampleIn -= dt;
        if (placed && sampleIn <= 0) {
          sampleIn = SAMPLE_EVERY;
          sampleGround();
        }
      }

      function resolveShape(target: EventTarget | null): ShapeName {
        if (!(target instanceof Element)) return "idle";
        if (target.closest(TEXT_SELECTOR)) return "text";
        if (target.closest(ACTION_SELECTOR)) return "action";
        return "idle";
      }

      /** Read alongside the shape: size answers to any action, colour to
       *  buttons only. */
      function resolveTarget(target: EventTarget | null) {
        shape = resolveShape(target);
        onButton =
          shape === "action" &&
          target instanceof Element &&
          target.closest(BUTTON_SELECTOR) !== null;
      }

      function onMove(event: PointerEvent) {
        const dt = (event.timeStamp - lastMove) / 1000;
        const dx = event.clientX - pointer.x;
        const dy = event.clientY - pointer.y;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        lastMove = event.timeStamp;

        if (!placed) {
          placed = true;
          resolveTarget(event.target);
          sampleGround();
          frame.style.opacity = "1";
          return;
        }

        // Samples arrive every 4-16ms and are noisy at that spacing, so the
        // measurement is eased in rather than replaced outright.
        if (dt > 0.001 && dt < 0.1) {
          speed.x += (dx / dt - speed.x) * 0.4;
          speed.y += (dy / dt - speed.y) * 0.4;
        }
      }

      function onOver(event: PointerEvent) {
        resolveTarget(event.target);
        // The fill follows the target now, so it cannot wait for the next
        // ground sample 90ms away.
        applySkin();
      }

      function onDown() {
        pressed = true;
      }

      function onUp() {
        pressed = false;
      }

      function onLeave(event: PointerEvent) {
        // relatedTarget is null only when the pointer has actually left the
        // window, not when it crosses between elements inside it.
        if (event.relatedTarget === null) frame.style.opacity = "0";
      }

      function onEnter() {
        if (placed) frame.style.opacity = "1";
      }

      function onBlur() {
        pressed = false;
        frame.style.opacity = "0";
      }

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("pointerout", onLeave, { passive: true });
      document.addEventListener("pointerenter", onEnter, { passive: true });
      addEventListener("blur", onBlur);
      raf = requestAnimationFrame(tick);

      teardown = () => {
        cancelAnimationFrame(raf);
        dialogs.disconnect();
        if (promotable && frame.matches(":popover-open")) frame.hidePopover();
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointerout", onLeave);
        document.removeEventListener("pointerenter", onEnter);
        removeEventListener("blur", onBlur);
        root.classList.remove("cursor-swapped");
        frame.style.opacity = "0";
      };
    }

    function sync() {
      const wanted = fine.matches && !still.matches;
      if (wanted && !teardown) start();
      if (!wanted && teardown) {
        teardown();
        teardown = null;
      }
    }

    sync();
    fine.addEventListener("change", sync);
    still.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  return (
    <div
      ref={frameRef}
      aria-hidden
      popover="manual"
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-150 ease-standard"
      style={{
        willChange: "transform",
        // The UA sheet dresses a popover as a centred bordered box on Canvas.
        // All of it has to come off: this is a bare 16px square that positions
        // itself, and inline is the only place that beats the UA defaults
        // without an !important.
        background: "transparent",
        border: 0,
        bottom: "auto",
        color: "inherit",
        height: "auto",
        left: 0,
        margin: 0,
        overflow: "visible",
        padding: 0,
        right: "auto",
        top: 0,
        width: "auto",
      }}
    >
      <div
        ref={boxRef}
        style={{
          width: BASE,
          height: BASE,
          backgroundColor: SKINS.onRest.fill,
          // The pressed bottom edge, inset only, never a blurred shadow. Both
          // this and the fill flip with the ground, see SKINS.
          boxShadow: SKINS.onRest.shadow,
          // Transform is written every frame and must stay off this list.
          transition:
            "background-color 160ms var(--ease-standard), box-shadow 160ms var(--ease-standard)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
