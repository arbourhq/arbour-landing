"use client";

import { useEffect, useRef } from "react";

/**
 * 2.5D brand squares: the signature Acid and Cream squares given depth as
 * flat-shaded CSS cubes. Orthographic (no perspective), one flat colour per
 * face, hard edges, no gradients.
 *
 * Two arrangements of the same geometry, because one does not survive both
 * layouts:
 *
 *   HeroCubes, lg and up. A single cluster on a ground plane, absolute in the
 *   top right corner beside the headline, tilting a few degrees toward the
 *   cursor. It is composed to sit next to a wide block of type.
 *
 *   HeroCubeBand, below lg. The same cubes broken apart and spread across a
 *   full-bleed strip between the buttons and the category picker, in roughly
 *   the place the cluster occupies on a desktop. The cluster was tried down
 *   here at three sizes and three positions and it never worked: a compact
 *   object needs something to sit against, and a phone's hero has nothing to
 *   offer it except a gap. Anchoring it to the headline is out, because the
 *   headline runs two lines at 480px and four at 320px. A band has no such
 *   problem. It spans the full width at any size, and the end cubes are cropped
 *   by the viewport so it reads as continuing past both edges rather than as
 *   five objects centred in a box. No rules around it: the crop and the full
 *   bleed do the framing, and a border made it a panel sitting in the hero
 *   instead of part of it.
 */

const BASE_X = -26;
const BASE_Y = -38;

/** Every cube in both arrangements shares this orientation. */
const TILT = `rotateX(${BASE_X}deg) rotateY(${BASE_Y}deg)`;
const HAIRLINE = "inset 0 0 0 1px rgba(198,255,61,.2)";

type CubeProps = {
  size: number;
  /** lateral position of the cube's centre, px */
  x: number;
  /** elevation of the cube's centre above the ground plane, px */
  up: number;
  /** toward the viewer, px */
  z: number;
  top: string;
  animation?: string;
  delay?: string;
  origin?: string;
};

/**
 * The three visible faces. Only three are drawn because the orientation is
 * fixed: the other three can never face the viewer.
 */
function Faces({
  size,
  top,
  animation,
  delay,
  origin,
}: Pick<CubeProps, "size" | "top" | "animation" | "delay" | "origin">) {
  const h = size / 2;
  return (
    <div
      className={`absolute inset-0 ${animation ?? ""}`}
      style={{
        transformStyle: "preserve-3d",
        animationDelay: delay,
        transformOrigin: origin,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: top,
          transform: `rotateX(90deg) translateZ(${h}px)`,
        }}
      />
      <div
        className="absolute inset-0 bg-bottle-deep"
        style={{ transform: `translateZ(${h}px)`, boxShadow: HAIRLINE }}
      />
      <div
        className="absolute inset-0 bg-bottle-ink"
        style={{
          transform: `rotateY(90deg) translateZ(${h}px)`,
          boxShadow: HAIRLINE,
        }}
      />
    </div>
  );
}

/** A cube placed in the cluster's shared 3D space. The tilt is on the parent. */
function Cube({ size, x, up, z, ...face }: CubeProps) {
  const h = size / 2;
  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: -h,
        top: -h,
        transform: `translate3d(${x}px, ${-up}px, ${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <Faces size={size} {...face} />
    </div>
  );
}

export function HeroCubes() {
  const cluster = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = cluster.current;
        if (!el) return;
        const tx = (e.clientX / window.innerWidth - 0.5) * 10;
        const ty = (e.clientY / window.innerHeight - 0.5) * -8;
        el.style.transform = `rotateX(${BASE_X + ty}deg) rotateY(${BASE_Y + tx}deg)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 hidden animate-zoom lg:top-28 lg:block lg:h-[300px] lg:w-[320px] xl:top-6 xl:h-[375px] xl:w-[400px]"
    >
      {/* The scaler has to be its own node: animate-zoom is fill-mode both, so
          it pins transform to the keyframe's end value and would silently
          overwrite a scale set on the same element.

          Every number above is a clearance, not a preference. The cluster is
          boxed in on three sides and the box is tighter than it looks:

            left, by the headline. The artwork starts about 27% into its own
            box, so the box may reach further left than it appears, but not far.
            At 1024px the headline's first line runs to roughly 730px of a 944px
            column, which is why the cluster starts at top-28: below that line,
            where it only has to clear the shorter second line. At 1280px the
            column is 1180px and the headline has not grown, so there is much
            more room and it can sit higher and larger.

            bottom, by the category picker, which is full width and wraps. That
            lands around 495px down once the lead and the buttons have taken
            their space.

            right, by nothing. This is the only free edge, and it is only free
            because the CTA buttons moved to the left column. Putting anything
            back in the top right corner takes the space this needs.

          Recheck at 1024px and 1280px after any change to the headline copy,
          the headline size, or the lead column width. */}
      <div
        className="absolute origin-top-left scale-100 xl:scale-125"
        style={{ width: 320, height: 300 }}
      >
        <div
          ref={cluster}
          className="absolute"
          style={{
            left: "46%",
            top: "60%",
            transform: `rotateX(${BASE_X}deg) rotateY(${BASE_Y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* ground shadow: a flat plane, never a blur */}
          <div
            className="absolute"
            style={{
              width: 250,
              height: 180,
              left: -125,
              top: -90,
              background: "rgba(5,33,23,.55)",
              transform: "translate3d(30px, 0px, 10px) rotateX(90deg)",
            }}
          />
          <Cube size={92} x={0} up={46} z={0} top="var(--color-acid)" />
          <Cube
            size={56}
            x={-6}
            up={120}
            z={-8}
            top="var(--color-cream)"
            animation="animate-squash"
            delay="0.8s"
            origin="50% 100%"
          />
          <Cube size={68} x={88} up={34} z={18} top="var(--color-acid)" />
          <Cube
            size={36}
            x={96}
            up={116}
            z={18}
            top="var(--color-cream)"
            animation="animate-drift"
          />
          <Cube
            size={24}
            x={-8}
            up={12}
            z={78}
            top="var(--color-acid)"
            animation="animate-pop"
            delay="1.6s"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * The band, below lg. Positions are percentages so it fills any width from
 * 320px to 1023px without a breakpoint, and `up` is the gap between the cube's
 * box and the floor rule, so the blocks sit at scattered heights rather than
 * marching along in a line.
 *
 * The first and last are placed to be cropped by the viewport, which is what
 * stops the strip reading as five objects centred in a box.
 *
 * Only animations that stay inside the strip: drop lifts 42px and would clear
 * the top rule. pop is 18px, drift 14px, and squash, wob and tilt do not
 * travel at all.
 */
const BAND = [
  {
    size: 56,
    x: 4,
    up: 14,
    top: "var(--color-acid)",
    animation: "animate-pop",
    origin: "50% 100%",
    delay: "0s",
  },
  {
    size: 34,
    x: 24,
    up: 32,
    top: "var(--color-cream)",
    animation: "animate-drift",
    delay: "0.9s",
  },
  {
    size: 72,
    x: 45,
    up: 16,
    top: "var(--color-acid)",
    animation: "animate-squash",
    origin: "50% 100%",
    delay: "1.4s",
  },
  {
    size: 40,
    x: 68,
    up: 36,
    top: "var(--color-cream)",
    animation: "animate-wob",
    origin: "50% 100%",
    delay: "0.5s",
  },
  {
    size: 58,
    x: 92,
    up: 16,
    top: "var(--color-acid)",
    animation: "animate-tilt",
    delay: "1.9s",
  },
];

export function HeroCubeBand() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative -mx-6 mb-10 h-[140px] overflow-hidden sm:-mx-10 lg:hidden"
    >
      {BAND.map(({ size, x, up, ...face }) => (
        <div
          key={`${x}-${size}`}
          className="absolute"
          style={{
            left: `${x}%`,
            bottom: up,
            width: size,
            height: size,
            transform: "translateX(-50%)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* The tilt is per cube here. There is no shared ground plane in the
              band, so there is no cluster to hang it on. */}
          <div
            className="absolute inset-0"
            style={{ transform: TILT, transformStyle: "preserve-3d" }}
          >
            <Faces size={size} {...face} />
          </div>
        </div>
      ))}
    </div>
  );
}
