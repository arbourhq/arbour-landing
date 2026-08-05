"use client";

import { useEffect, useRef } from "react";

/**
 * 2.5D brand squares: the signature Acid and Cream squares given depth as
 * flat-shaded CSS cubes. Orthographic (no perspective), one flat colour per
 * face, hard edges, no gradients. The cluster tilts a few degrees toward the
 * cursor; individual cubes idle on the existing overshoot keyframes.
 */

const BASE_X = -26;
const BASE_Y = -38;

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

function Cube({ size, x, up, z, top, animation, delay, origin }: CubeProps) {
  const h = size / 2;
  const hairline = "inset 0 0 0 1px rgba(198,255,61,.2)";
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
          style={{ transform: `translateZ(${h}px)`, boxShadow: hairline }}
        />
        <div
          className="absolute inset-0 bg-bottle-ink"
          style={{
            transform: `rotateY(90deg) translateZ(${h}px)`,
            boxShadow: hairline,
          }}
        />
      </div>
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
      className="pointer-events-none absolute top-32 right-0 hidden origin-top-right scale-75 animate-zoom lg:block xl:top-0 xl:scale-100"
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
  );
}
