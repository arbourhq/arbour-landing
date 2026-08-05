"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   The pointer, replaced by the site's own acid square.

   Two independent springs drive it: one for position (it chases the real
   pointer and overshoots on the way in), one for shape (it morphs between the
   idle square, the fat hover square and the caret). Velocity then squashes and
   stretches the square along its direction of travel, so a flick reads as a
   streak and a stop reads as a wobble back into a square.

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

/**
 * Physics, in continuous time so the feel is identical at 60Hz and 120Hz.
 * Critical damping for position would be 2*sqrt(320) = 35.8, and we run under
 * that on purpose: the brand curve overshoots, so the cursor does too.
 */
const POS_STIFFNESS = 320;
const POS_DAMPING = 26;
const SHAPE_STIFFNESS = 440;
const SHAPE_DAMPING = 26;

/** Fixed physics substep. Anything longer and a fast flick tunnels. */
const STEP = 1 / 240;
/** A dropped frame must not fire a hundred catch-up substeps. */
const MAX_FRAME = 0.05;

/** px/s at which the stretch is maxed out. A hard flick is around 3000. */
const SPEED_FULL = 2400;
/** How far the square is allowed to stretch along its travel. */
const MAX_STRETCH = 0.55;
/** Squash across the travel axis, as a fraction of the stretch. */
const SQUASH_RATIO = 0.5;
/** Held down: the square gets stood on. */
const PRESS_SCALE = 0.68;

const ACTION_SELECTOR =
  'a[href], button, [role="button"], summary, select, label[for], [data-cursor="action"]';
const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable=""], [contenteditable="true"]';

/** Acid, #C6FF3D. An Acid square on an Acid section is an invisible square. */
const ACID_RGB = [198, 255, 61] as const;
/**
 * How close a ground has to sit to Acid before the square inverts. Acid wash
 * is 151 away and Sprout (product mocks) is 65, so neither trips it.
 */
const ACID_TOLERANCE = 45;
/** ms between ground samples. Cheap enough to catch hover colour changes. */
const SAMPLE_EVERY = 0.09;

/** Acid on everything else, Bottle on Acid. The two legal wordmark grounds. */
const SKINS = {
  onAcid: {
    fill: "#0B4030",
    shadow:
      "inset 0 0 0 1.5px rgba(255,251,239,.35), inset 0 -3px 0 rgba(0,0,0,.35)",
  },
  onRest: {
    fill: "#C6FF3D",
    shadow:
      "inset 0 0 0 1.5px rgba(11,64,48,.55), inset 0 -3px 0 rgba(11,64,48,.4)",
  },
} as const;

/** Wrap to (-90, 90]. A stretched square is symmetric under a half turn, so
 *  reversing direction can be drawn without a visible 180 degree spin. */
function wrapAngle(deg: number) {
  let a = deg % 180;
  if (a > 90) a -= 180;
  if (a <= -90) a += 180;
  return a;
}

/**
 * True when the painted ground under (x, y) is Acid. Walks up from the topmost
 * element to the first opaque background, because most elements on this site
 * are transparent and inherit the section flood behind them.
 */
function overAcid(x: number, y: number) {
  let node = document.elementFromPoint(x, y);
  while (node) {
    const parsed = getComputedStyle(node).backgroundColor.match(
      /^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/,
    );
    // Anything the browser reports in a format we cannot read (a color-mix, an
    // oklab) is treated as "keep looking", which lands on Acid or on nothing.
    if (parsed && Number(parsed[4] ?? 1) > 0.5) {
      const distance = Math.hypot(
        Number(parsed[1]) - ACID_RGB[0],
        Number(parsed[2]) - ACID_RGB[1],
        Number(parsed[3]) - ACID_RGB[2],
      );
      return distance <= ACID_TOLERANCE;
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

      const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
      const pos = { x: pointer.x, y: pointer.y };
      const vel = { x: 0, y: 0 };
      const size = { w: SHAPES.idle.w, h: SHAPES.idle.h };
      const sizeVel = { w: 0, h: 0 };
      let shape: ShapeName = "idle";
      let pressed = false;
      let placed = false;
      let acid = false;
      let sampleIn = 0;
      let raf = 0;
      let last = 0;
      let accumulator = 0;

      function paint(onAcid: boolean) {
        acid = onAcid;
        const skin = onAcid ? SKINS.onAcid : SKINS.onRest;
        box.style.backgroundColor = skin.fill;
        box.style.boxShadow = skin.shadow;
      }

      /** Sampled off the real pointer, not the trailing square, so the colour
       *  changes as the ground crosses under the hand rather than the spring. */
      function sampleGround() {
        const onAcid = overAcid(pointer.x, pointer.y);
        if (onAcid !== acid) paint(onAcid);
      }

      function integrate(h: number) {
        // Semi-implicit Euler: velocity first, then position off the new
        // velocity. Stays stable at these stiffnesses where plain Euler drifts.
        vel.x +=
          (POS_STIFFNESS * (pointer.x - pos.x) - POS_DAMPING * vel.x) * h;
        vel.y +=
          (POS_STIFFNESS * (pointer.y - pos.y) - POS_DAMPING * vel.y) * h;
        pos.x += vel.x * h;
        pos.y += vel.y * h;

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
        const speed = Math.hypot(vel.x, vel.y);
        const travel = Math.min(speed / SPEED_FULL, 1);
        const stretch = travel * MAX_STRETCH;

        // Rotation is weighted by travel as well, so the square unwinds to
        // axis-aligned as it settles rather than parking on a diagonal.
        const angle =
          stretch > 0.001
            ? wrapAngle((Math.atan2(vel.y, vel.x) * 180) / Math.PI) * travel
            : 0;

        frame.style.transform =
          `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angle}deg) ` +
          `scale(${1 + stretch}, ${1 - stretch * SQUASH_RATIO})`;
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

      function onMove(event: PointerEvent) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        if (!placed) {
          // First sighting: teleport rather than spring in from the middle.
          placed = true;
          pos.x = pointer.x;
          pos.y = pointer.y;
          vel.x = 0;
          vel.y = 0;
          shape = resolveShape(event.target);
          sampleGround();
          frame.style.opacity = "1";
        }
      }

      function onOver(event: PointerEvent) {
        shape = resolveShape(event.target);
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
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-150 ease-standard"
      style={{ willChange: "transform" }}
    >
      <div
        ref={boxRef}
        style={{
          width: BASE,
          height: BASE,
          backgroundColor: SKINS.onRest.fill,
          // Hairline plus the usual pressed bottom edge. Inset only, never a
          // blurred shadow. Both flip with the ground, see SKINS.
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
