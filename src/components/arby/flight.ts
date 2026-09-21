/** All positions refer to the point between Arby's feet, in viewport pixels. */
export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface Perch extends Point {
  id: string;
  branch: boolean;
}

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function birdBounds(point: Point, size: number): Rect {
  return {
    left: point.x - size * 0.6,
    right: point.x + size * 0.6,
    top: point.y - size * 0.78,
    bottom: point.y - 8,
  };
}

export function overlap(a: Rect, b: Rect) {
  return (
    Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
    Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
  );
}

/** Reject clipped or occupied perches. The branch is strictly a fallback. */
export function choosePerch(
  candidates: Perch[],
  obstacles: Rect[],
  viewport: Rect,
  current: Point,
  size: number,
): Perch | undefined {
  return candidates
    .filter((candidate) => {
      const box = birdBounds(candidate, size);
      return (
        box.left >= viewport.left &&
        box.right <= viewport.right &&
        box.top >= viewport.top &&
        candidate.y + size * 0.15 <= viewport.bottom &&
        !obstacles.some((obstacle) => overlap(box, obstacle) > 0)
      );
    })
    .toSorted((a, b) => {
      if (a.branch !== b.branch) return a.branch ? 1 : -1;
      const score = (perch: Perch) =>
        Math.hypot(perch.x - current.x, perch.y - current.y);
      return score(a) - score(b);
    })[0];
}

/** Wide desktop ledges offer more landing spots than just their two corners. */
export function perchesOnEdge(rect: Rect, size: number, id: string): Perch[] {
  const inset = size * 0.5 + 8;
  const width = rect.right - rect.left - inset * 2;
  if (width < 0) return [];
  const intervals = Math.max(1, Math.ceil(width / size));
  return Array.from({ length: intervals + 1 }, (_, index) => ({
    id: `${id}-${index}`,
    x: rect.left + inset + (width * index) / intervals,
    y: rect.top,
    branch: false,
  }));
}

export function cubic(points: [Point, Point, Point, Point], progress: number) {
  const t = clamp(progress, 0, 1);
  const u = 1 - t;
  const weights = [u ** 3, 3 * u ** 2 * t, 3 * u * t ** 2, t ** 3];
  return points.reduce(
    (point, control, i) => ({
      x: point.x + control.x * weights[i],
      y: point.y + control.y * weights[i],
    }),
    { x: 0, y: 0 },
  );
}

/** Sample once per take-off, never randomise every frame. */
export function flightVariation(random: () => number = Math.random) {
  return {
    lift: 20 + random() * 35,
    wingbeat: 380 + random() * 160,
    approach: (random() < 0.5 ? -1 : 1) * (24 + random() * 48),
  };
}

export type FlightKind = "swoop" | "climb" | "hook" | "glide";
export interface FlightLeg {
  kind: FlightKind;
  duration: number;
  points: [Point, Point, Point, Point];
}

/** Connected curves with fresh intent, rather than a repeating orbit. */
export function planFlight(
  start: Point,
  velocity: Point,
  viewport: Rect,
  size: number,
  scrollDirection: number,
  previous?: FlightKind,
  random: () => number = Math.random,
): FlightLeg {
  const kinds: FlightKind[] = ["swoop", "climb", "hook", "glide"];
  const choices = kinds.filter((kind) => kind !== previous);
  const kind =
    choices[
      Math.min(choices.length - 1, Math.floor(random() * choices.length))
    ];
  const right = viewport.right - size * 0.6;
  const left = Math.min(right, viewport.left + size * 0.6);
  const top = viewport.top + size * 0.8;
  const bottom = Math.max(top, viewport.bottom - size * 0.2);
  const width = right - left;
  const corridor = Math.min(width, size < 100 ? width * 0.55 : 340);
  const height = bottom - top;
  const fit = (point: Point): Point => ({
    x: clamp(point.x, left, right),
    y: clamp(point.y, top, bottom),
  });
  const duration = (kind === "glide" ? 1250 : 850) + random() * 550;
  const end = fit({
    x: right - corridor * (0.12 + random() * 0.88),
    y:
      top +
      height * (0.2 + random() * 0.6) +
      Math.sign(scrollDirection) * height * 0.08,
  });
  const reach = corridor * (0.55 + random() * 0.45);
  const lift = Math.min(height * 0.35, size * (0.8 + random()));
  // Preserve the incoming tangent at joins and when a landing is interrupted.
  // A resting bird pushes up and away from its perch for the first wingbeat.
  const moving = Math.hypot(velocity.x, velocity.y) > 0.02;
  const departure = fit(
    moving
      ? {
          x: start.x + (velocity.x * duration) / 3,
          y: start.y + (velocity.y * duration) / 3,
        }
      : {
          x: start.x + (start.x > (left + right) / 2 ? -1 : 1) * reach * 0.6,
          y: start.y - lift,
        },
  );
  let bend: Point;
  switch (kind) {
    case "swoop":
      bend = {
        x: end.x - reach * 0.45,
        y: Math.max(start.y, end.y) + lift * 1.5,
      };
      break;
    case "climb":
      bend = { x: end.x + reach * 0.5, y: Math.min(start.y, end.y) - lift };
      break;
    case "hook":
      bend = { x: right - corridor, y: end.y - lift * 0.4 };
      // Finish towards the edge after curling inwards.
      end.x = right - corridor * 0.08;
      break;
    case "glide":
      bend = { x: start.x + (end.x - start.x) * 0.7, y: end.y - lift * 0.15 };
      break;
  }
  return { kind, duration, points: [{ ...start }, departure, fit(bend), end] };
}
