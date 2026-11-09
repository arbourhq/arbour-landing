import { PerspectiveCamera, Vector3 } from "three";
import { Book, type BookState } from "./book";
import { BLOCK, BOARD, PAGE, SPREADS } from "./dims";

/**
 * The story as pure functions of the scroll. `s` runs 0 to 6: 0 the closed
 * book in the hero, 1 to 5 the five stages' spreads (a fraction is a leaf
 * mid-turn), 6 the book shut and laid on the season's pile. Scrolling back
 * plays everything backwards exactly: the scroll is the crank, and nothing
 * here keeps state.
 */

export type Rect = { x: number; y: number; w: number; h: number };

export type Layout = {
  /** The canvas, in CSS pixels. */
  width: number;
  height: number;
  /** A phone's band, rather than the desktop's full window. */
  band: boolean;
  /** Where the closed book sits in the hero (it may bleed off the canvas). */
  hero: Rect;
  /** The reading frame: the gutter's x, the page centre's y, pixels per unit. */
  read: { gutter: number; centreY: number; k: number };
  /** Where the pile sits at the close. */
  close: Rect;
};

export type Pose = {
  target: Vector3;
  distance: number;
  /** Angle from straight down, radians. */
  polar: number;
  /** Around the vertical; 0 looks from the tail (the reader's side). */
  azimuth: number;
  fov: number;
};

export type Shot = {
  pose: Pose;
  book: { x: number; y: number; z: number; yaw: number; tilt: number };
  state: BookState;
  /** The camera is square over a spread's screen: hand it to HTML. */
  rest: boolean;
  /**
   * Depth of field: how much, and the point held sharp. Only ever on shots
   * where no screen is being read (the shut book, the pile).
   */
  dof: { strength: number; focus: Vector3 };
};

export type Intro = { drop: number; riffle: number };

const FOV_READ = 24;
const FOV_HERO = 28;
const HERO_YAW = -0.36;
const BW = PAGE.w + BOARD.square;
const BH = PAGE.h + BOARD.square * 2;
export const PILE_AT = new Vector3(30, 0, 3);

export function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}
function remap(v: number, a: number, b: number) {
  return clamp01((v - a) / (b - a));
}
export function smooth(t: number) {
  return t * t * (3 - 2 * t);
}
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** cubic-bezier(.34, 1.8, .45, 1): the brand's overshoot, for things that land. */
export function overshoot(x: number) {
  const x1 = 0.34;
  const y1 = 1.8;
  const x2 = 0.45;
  const y2 = 1;
  const bx = (t: number) =>
    3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
  const by = (t: number) =>
    3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
  let t = clamp01(x);
  for (let i = 0; i < 8; i++) {
    const dx =
      3 * (1 - t) * (1 - t) * x1 +
      6 * (1 - t) * t * (x2 - x1) +
      3 * t * t * (1 - x2);
    const err = bx(t) - x;
    if (Math.abs(err) < 1e-5 || Math.abs(dx) < 1e-6) break;
    t = clamp01(t - err / dx);
  }
  return by(t);
}

export function place(camera: PerspectiveCamera, pose: Pose) {
  const { target, distance, polar, azimuth } = pose;
  camera.fov = pose.fov;
  camera.position.set(
    target.x + distance * Math.sin(polar) * Math.sin(azimuth),
    target.y + distance * Math.cos(polar),
    target.z + distance * Math.sin(polar) * Math.cos(azimuth),
  );
  // Up is the horizontal direction the camera faces: the far edge of the
  // table is always the top of the frame, straight down or leaning in.
  camera.up.set(-Math.sin(azimuth), 0, -Math.cos(azimuth));
  camera.lookAt(target);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}

function blend(a: Pose, b: Pose, t: number): Pose {
  return {
    target: a.target.clone().lerp(b.target, t),
    distance: Math.exp(mix(Math.log(a.distance), Math.log(b.distance), t)),
    polar: mix(a.polar, b.polar, t),
    azimuth: mix(a.azimuth, b.azimuth, t),
    fov: mix(a.fov, b.fov, t),
  };
}

/** The camera square over a spread, the gutter and page centre where the layout puts them. */
export function readPose(layout: Layout, spread: number): Pose {
  const { width, height } = layout;
  const { gutter, centreY, k } = layout.read;
  const plane = Book.rightTop({ spread });
  const fov = FOV_READ;
  const distance = height / k / (2 * Math.tan(((fov / 2) * Math.PI) / 180));
  return {
    target: new Vector3(
      (width / 2 - gutter) / k,
      plane,
      (height / 2 - centreY) / k,
    ),
    distance,
    polar: 0,
    azimuth: 0,
    fov,
  };
}

/**
 * Fit a set of world points into a screen rect from a fixed angle: walk the
 * distance until the points' box fits, then slide the target until its
 * centre lands. A few rounds settle it.
 */
function frame(
  points: Vector3[],
  rect: Rect,
  layout: Layout,
  angle: { polar: number; azimuth: number; fov: number },
): Pose {
  const camera = new PerspectiveCamera(
    angle.fov,
    layout.width / layout.height,
    0.1,
    1000,
  );
  const centre = new Vector3();
  for (const p of points) centre.add(p);
  centre.divideScalar(points.length);
  const pose: Pose = { target: centre, distance: 60, ...angle };
  const v = new Vector3();
  const right = new Vector3();
  const up = new Vector3();
  for (let round = 0; round < 6; round++) {
    place(camera, pose);
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const p of points) {
      v.copy(p).project(camera);
      const x = ((v.x + 1) / 2) * layout.width;
      const y = ((1 - v.y) / 2) * layout.height;
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
    const scale = Math.max((x1 - x0) / rect.w, (y1 - y0) / rect.h);
    pose.distance *= scale;
    const perPixel =
      (2 * pose.distance * Math.tan(((pose.fov / 2) * Math.PI) / 180)) /
      layout.height;
    const dx =
      rect.x +
      rect.w / 2 -
      ((x0 + x1) / 2 - layout.width / 2) / scale -
      layout.width / 2;
    const dy =
      rect.y +
      rect.h / 2 -
      ((y0 + y1) / 2 - layout.height / 2) / scale -
      layout.height / 2;
    right.setFromMatrixColumn(camera.matrixWorld, 0);
    up.setFromMatrixColumn(camera.matrixWorld, 1);
    pose.target = pose.target
      .clone()
      .addScaledVector(right, -dx * perPixel)
      .addScaledVector(up, dy * perPixel);
  }
  return pose;
}

/** The closed book's corners, ribbon tail included, turned to the hero's angle. */
function closedCorners(yaw: number, at: Vector3) {
  const top = BOARD.t * 2 + BLOCK;
  const out: Vector3[] = [];
  for (const x of [-0.6, BW]) {
    for (const y of [0, top]) {
      for (const z of [-BH / 2, BH / 2 + 1.2]) {
        out.push(
          new Vector3(x, y, z)
            .applyAxisAngle(new Vector3(0, 1, 0), yaw)
            .add(at),
        );
      }
    }
  }
  return out;
}

export function heroPose(layout: Layout): Pose {
  return frame(closedCorners(HERO_YAW, new Vector3()), layout.hero, layout, {
    polar: layout.band ? 0.84 : 0.88,
    azimuth: 0.16,
    fov: FOV_HERO,
  });
}

export function closePose(layout: Layout, pileHeight: number): Pose {
  const pts = closedCorners(0.06, new Vector3(PILE_AT.x, 0, PILE_AT.z));
  for (const p of closedCorners(
    0.06,
    new Vector3(PILE_AT.x, pileHeight, PILE_AT.z),
  ))
    pts.push(p);
  return frame(pts, layout.close, layout, {
    polar: 1.06,
    azimuth: -0.82,
    fov: FOV_HERO,
  });
}

export type Poses = { hero: Pose; close: Pose; pileHeight: number };

export function poses(layout: Layout, pileHeight: number): Poses {
  return {
    hero: heroPose(layout),
    close: closePose(layout, pileHeight),
    pileHeight,
  };
}

export function shotAt(
  s: number,
  intro: Intro,
  layout: Layout,
  fixed: Poses,
  pointer: { x: number; y: number },
): Shot {
  const state: BookState = {
    open: 0,
    spread: 0,
    close: 0,
    riffle: 0,
  };
  const book = { x: 0, y: 0, z: 0, yaw: 0, tilt: 0 };
  const dof = { strength: 0, focus: new Vector3() };
  let pose: Pose;
  let rest = false;

  if (s < 1) {
    const o = clamp01(s);
    state.open = smooth(remap(o, 0.16, 0.9));
    state.riffle = o < 0.02 ? intro.riffle : 0;
    pose = blend(fixed.hero, readPose(layout, 0), ease(o));
    book.yaw = mix(HERO_YAW, 0, ease(remap(o, 0.05, 0.85)));
    // The drop on arrival: from above, landing with the brand's overshoot.
    const d = overshoot(intro.drop);
    book.y = (1 - d) * 7;
    book.tilt = (1 - d) * 0.12;
    const hover = 1 - o;
    pose.azimuth += pointer.x * 0.045 * hover;
    pose.polar += pointer.y * 0.03 * hover;
    // The shut book held sharp across its cover, the near and far edges soft.
    dof.strength = 0.85 * (1 - smooth(remap(o, 0.04, 0.32)));
    dof.focus
      .set(7.5, BOARD.t * 2 + BLOCK, 0.8)
      .applyAxisAngle(new Vector3(0, 1, 0), book.yaw)
      .add(new Vector3(book.x, book.y, book.z));
  } else if (s <= 1 + SPREADS - 1) {
    const sp = s - 1;
    const i = Math.floor(sp + 1e-6);
    const t = sp - i;
    state.open = 1;
    state.spread = sp;
    pose = readPose(layout, sp);
    if (t > 0) {
      // A breath as the leaf goes over: pulling back, not leaning, so the
      // leaf standing at the spine stays below the nav however tall it gets.
      pose.distance *= 1 + 0.24 * Math.sin(Math.PI * t);
    }
    rest = t === 0;
  } else {
    const c = clamp01(s - SPREADS);
    state.open = 1;
    state.spread = SPREADS - 1;
    state.close = smooth(remap(c, 0, 0.4));
    const m = remap(c, 0.34, 0.94);
    const landed = overshoot(m);
    book.x = PILE_AT.x * landed;
    book.z = PILE_AT.z * landed;
    book.y =
      fixed.pileHeight * landed + 3.4 * Math.sin(Math.PI * Math.min(1, m));
    book.yaw = 0.06 * landed;
    pose = blend(
      readPose(layout, SPREADS - 1),
      fixed.close,
      ease(remap(c, 0.06, 1)),
    );
    const settled = remap(c, 0.94, 1);
    pose.azimuth += pointer.x * 0.04 * settled;
    pose.polar += pointer.y * 0.025 * settled;
    // The job's book held sharp on top of the pile; the spines below stay legible.
    dof.strength = 0.6 * smooth(remap(c, 0.55, 0.95));
    dof.focus.set(book.x + 8.1, book.y + BOARD.t * 2 + BLOCK, book.z);
  }

  return { pose, book, state, rest, dof };
}
