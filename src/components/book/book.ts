import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Group,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  Mesh,
  PlaneGeometry,
  type Texture,
  Vector2,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { BLOCK, BOARD, LEFT_SHARE, PAGE, SPREADS } from "./dims";
import { Leaf, leafSurface } from "./leaf";
import { HEX } from "./palette";
import { DEBOSS, type CoverMaps } from "./textures";

/**
 * The book: two boards in woven Bottle cloth, the page block split into a
 * left and a right stack, one leaf that turns between spreads, and a Sprout
 * satin ribbon lying by the gutter on the right-hand page.
 *
 * The left half (front board, left stack) hangs on a hinge at the spine.
 * Open, it lies flat on the left; closed, it is turned over on top of the
 * right half, cover up. Everything is built in the open pose.
 */

export type BookState = {
  /** 0 closed, cover up; 1 open flat. */
  open: number;
  /** The spread in view, 0 to 4; a fraction is a leaf mid-turn. */
  spread: number;
  /** 0 open; 1 shut again at the end. */
  close: number;
  /** The intro's thumb riffle, 0 to 1 (0 and 1 are at rest). */
  riffle: number;
};

export type Pages = {
  left(index: number): Texture | null;
  right(index: number): Texture | null;
  /** A small print of a page, for the riffle's glimpse. */
  thumb(side: "left" | "right", index: number): Texture | null;
};

const BW = PAGE.w + BOARD.square;
const BH = PAGE.h + BOARD.square * 2;
const BT = BOARD.t;
/** The hinge: halfway up the closed book, so turning the left half over lands it on the right. */
const PIVOT_Y = BT + BLOCK / 2;
const LIFT = 0.004;

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

/** The left stack's share of the block at a spread. */
export function leftThickness(spread: number) {
  const f = clamp01(spread / (SPREADS - 1));
  return BLOCK * (LEFT_SHARE.first + (LEFT_SHARE.last - LEFT_SHARE.first) * f);
}

/**
 * A page's top surface: flat over the printed area, dipping into the
 * gutter inside the margin so the spread has a crease without bending a
 * screen.
 */
function pageTop(side: "left" | "right") {
  const columns = [0, 0.04, 0.1, 0.18, 0.28, 0.4, 0.5, 1, 4, 8, 12, 16];
  const geometry = new BufferGeometry();
  const positions: number[] = [];
  const uvs: number[] = [];
  const index: number[] = [];
  for (const z of [-PAGE.h / 2, PAGE.h / 2]) {
    for (const d of columns) {
      const dip = -0.11 * Math.pow(Math.max(0, 1 - d / 0.46), 2);
      positions.push(side === "right" ? d : -d, dip, z);
      uvs.push(side === "right" ? d / PAGE.w : 1 - d / PAGE.w, z < 0 ? 1 : 0);
    }
  }
  const n = columns.length;
  for (let i = 0; i < n - 1; i++) {
    const a = i;
    const b = i + 1;
    const c = i + n;
    const d = i + n + 1;
    if (side === "right") index.push(a, c, b, b, c, d);
    else index.push(a, b, c, b, d, c);
  }
  geometry.setIndex(index);
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(positions), 3),
  );
  geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
  geometry.computeVertexNormals();
  return geometry;
}

class Stack {
  readonly group = new Group();
  private readonly box: Mesh;
  readonly top: Mesh<BufferGeometry, MeshLambertMaterial>;
  private readonly edge: Texture;

  constructor(side: "left" | "right", edge: Texture) {
    this.edge = edge.clone();
    this.edge.needsUpdate = true;
    const edgeMaterial = new MeshLambertMaterial({ map: this.edge });
    const white = new MeshLambertMaterial({ color: HEX.page });
    // The block's top face never draws: the page surface (with its gutter
    // crease) sits exactly on it.
    const hidden = new MeshBasicMaterial({ visible: false });
    this.box = new Mesh(new BoxGeometry(PAGE.w, 1, PAGE.h), [
      edgeMaterial,
      edgeMaterial,
      hidden,
      white,
      edgeMaterial,
      edgeMaterial,
    ]);
    this.box.position.x = side === "right" ? PAGE.w / 2 : -PAGE.w / 2;
    this.box.castShadow = true;
    this.box.receiveShadow = true;
    this.top = new Mesh(
      pageTop(side),
      new MeshLambertMaterial({ color: HEX.page }),
    );
    this.top.receiveShadow = true;
    this.group.add(this.box, this.top);
  }

  set(base: number, thickness: number) {
    const t = Math.max(0.02, thickness);
    this.box.scale.y = t;
    this.box.position.y = base + t / 2;
    this.top.position.y = base + t;
    this.edge.repeat.set(1, Math.max(1, t * 22));
  }

  setPage(texture: Texture | null) {
    const material = this.top.material;
    if (material.map !== texture) {
      material.map = texture;
      material.needsUpdate = true;
    }
  }
}

/** A point the ribbon passes through, and which way its face looks there. */
type RibbonKnot = { p: Vector3; n: Vector3 };

const UP = new Vector3(0, 1, 0);

class Ribbon {
  readonly mesh: Mesh<BufferGeometry, MeshPhysicalMaterial>;
  private readonly position: BufferAttribute;
  private readonly geometry: BufferGeometry;
  private readonly samples = 128;
  private last = Number.NaN;

  constructor() {
    const n = this.samples + 1;
    this.position = new BufferAttribute(new Float32Array(n * 2 * 3), 3);
    const uv = new Float32Array(n * 2 * 2);
    const index: number[] = [];
    for (let i = 0; i < n; i++) {
      uv[i * 4] = 0;
      uv[i * 4 + 1] = i / this.samples;
      uv[i * 4 + 2] = 1;
      uv[i * 4 + 3] = i / this.samples;
      if (i < this.samples) {
        const a = i * 2;
        index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    this.geometry = new BufferGeometry();
    this.geometry.setIndex(index);
    this.geometry.setAttribute("position", this.position);
    this.geometry.setAttribute("uv", new BufferAttribute(uv, 2));
    this.mesh = new Mesh(
      this.geometry,
      new MeshPhysicalMaterial({
        color: HEX.sprout,
        roughness: 0.3,
        sheen: 1,
        sheenColor: new Color(0xe9ffd6),
        sheenRoughness: 0.35,
        side: DoubleSide,
        envMapIntensity: 0.5,
      }),
    );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

  /**
   * Lay the ribbon through its knots. Its width always lies in the surface
   * it rests on (the page, the turning leaf, the table), so it never cuts
   * through what carries it.
   */
  update(knots: RibbonKnot[]) {
    let signature = 0;
    for (const k of knots) signature += k.p.x * 3.1 + k.p.y * 7.7 + k.p.z * 1.3;
    if (Math.abs(signature - this.last) < 1e-5) return;
    this.last = signature;
    const curve = new CatmullRomCurve3(
      knots.map((k) => k.p),
      false,
      "centripetal",
    );
    const arr = this.position.array as Float32Array;
    const half = 0.11;
    const side = new Vector3();
    const normal = new Vector3();
    const segments = knots.length - 1;
    for (let i = 0; i <= this.samples; i++) {
      const u = i / this.samples;
      const p = curve.getPoint(u);
      const tangent = curve.getTangent(u);
      const f = Math.min(segments - 1e-6, u * segments);
      const a = Math.floor(f);
      normal
        .copy(knots[a].n)
        .lerp(knots[a + 1].n, f - a)
        .normalize();
      side.crossVectors(tangent, normal);
      if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
      side.normalize().multiplyScalar(half);
      const k = i * 6;
      arr[k] = p.x - side.x;
      arr[k + 1] = p.y - side.y;
      arr[k + 2] = p.z - side.z;
      arr[k + 3] = p.x + side.x;
      arr[k + 4] = p.y + side.y;
      arr[k + 5] = p.z + side.z;
    }
    this.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
    this.geometry.computeBoundingSphere();
  }
}

/** Where the ribbon lies along the page, head to tail. */
const RIBBON_Z = [-4.9, -4.45, -2.6, -0.4, 1.6, 3.6, 4.7, 4.96];
/** How far its centre lies from the spine, and how far off the paper under it. */
const RIBBON_U = 0.24;
const RIBBON_OFF = 0.012;

type Turn = { t: number; from: number; to: number };

/**
 * The ribbon across the gutter at depth `z`: its centre, and which way its
 * face looks. At rest it lies flat on the right-hand page by the gutter.
 * When that page turns, the ribbon is lying on it, so the page's root lifts
 * it and tips it up, and it slips a little toward the fold as the page
 * steepens. Once the page stands past upright it can no longer hold the
 * ribbon, which drops back the way it came onto the new right-hand page and
 * lands soft, the way satin does. Its head and tail stay where they are.
 */
function ribbonAt(rightTop: number, turn: Turn | null, z: number) {
  const floor = rightTop + LIFT * 2;
  if (!turn || turn.t <= 0 || turn.t >= 1) {
    return { x: RIBBON_U, y: floor + RIBBON_OFF, nx: 0, ny: 1 };
  }
  const { t, from, to } = turn;
  const hinge = from + (to - from) * smooth(t);
  const root = leafSurface(t, RIBBON_U, z).angle;
  const upright = Math.PI / 2;
  if (root <= upright) {
    // Lifted on the page, slipping toward the fold as it steepens.
    const u =
      RIBBON_U - 0.06 * smooth(clamp01((root - 0.45) / (upright - 0.45)));
    const s = leafSurface(t, u, z);
    return {
      x: s.x + s.nx * RIBBON_OFF,
      y: hinge + s.y + s.ny * RIBBON_OFF,
      nx: s.nx,
      ny: s.ny,
    };
  }
  // Let go: it falls from the standing page, pivoting on its edge in the
  // fold, until it lies on the new right-hand page.
  const fall = smooth(clamp01((root - upright) / 0.9));
  const phi = upright * (1 - fall);
  const u = RIBBON_U - 0.06 * (1 - fall);
  const pivot = hinge + (floor - hinge) * fall;
  // What it is held off turns from the page's back to the paper below.
  const off = upright * fall;
  return {
    x: u * Math.cos(phi) + RIBBON_OFF * Math.cos(off),
    y: pivot + u * Math.sin(phi) + RIBBON_OFF * Math.sin(off),
    nx: -Math.sin(phi),
    ny: Math.cos(phi),
  };
}

/**
 * The ribbon's knots: over the head edge and down into the headband, along
 * the gutter, over the tail edge, and down to whatever is below. `ground` is
 * that surface's height in the book's frame: 0 on the table, below 0 when
 * the book is up on the pile or in the air.
 */
function ribbonKnots(
  rightTop: number,
  turn: Turn | null,
  ground: number,
): RibbonKnot[] {
  const h = PAGE.h / 2;
  // `drop` bends it down past an edge, away from the face it lies on.
  const knot = (z: number, drop = 0): RibbonKnot => {
    const r = ribbonAt(rightTop, turn, Math.max(-h, Math.min(h, z)));
    return {
      p: new Vector3(r.x - r.nx * drop, r.y - r.ny * drop, z),
      n: new Vector3(r.nx, r.ny, 0),
    };
  };
  const edge = knot(h + 0.06, 0.035);
  return [
    knot(-h - 0.14, 0.14),
    knot(-h - 0.03, 0.012),
    ...RIBBON_Z.map((z) => knot(z)),
    edge,
    ...tailKnots(edge, ground),
  ];
}

/** How much ribbon there is past the bend over the tail edge. */
const TAIL = 2.4;
const OUT = new Vector3(0, 0, 1);

/**
 * The ribbon past the tail edge. Satin hangs: from the bend over the edge it
 * falls straight down, clear of the boards and of anything the book is lying
 * on, and if it reaches the surface below it curves onto it and lies there,
 * wandering a little. It is always the same length, so lifting it draws the
 * end in.
 */
function tailKnots(edge: RibbonKnot, ground: number): RibbonKnot[] {
  const h = PAGE.h / 2;
  const x = 0.18 + edge.p.x * 0.5;
  const z = h + 0.36;
  const top = edge.p.y - 0.18;
  const knots: RibbonKnot[] = [
    {
      p: new Vector3(x - 0.02, top, h + 0.34),
      n: edge.n.clone().add(OUT).normalize(),
    },
  ];
  // Straight down, then a quarter turn of radius `r` onto the surface.
  const r = Math.min(0.25, Math.max(0.05, top - ground - 0.02));
  const fall = Math.max(0, top - ground - 0.012 - r);
  const arc = (Math.PI / 2) * r;
  const count = 8;
  for (let k = 1; k <= count; k++) {
    const s = (TAIL * k) / count;
    if (s <= fall) {
      knots.push({ p: new Vector3(x, top - s, z), n: OUT });
    } else if (s <= fall + arc) {
      const a = (s - fall) / r;
      knots.push({
        p: new Vector3(
          x,
          ground + 0.012 + r - r * Math.sin(a),
          z + r - r * Math.cos(a),
        ),
        n: new Vector3(0, Math.sin(a), Math.cos(a)),
      });
    } else {
      const d = s - fall - arc;
      knots.push({
        p: new Vector3(x + 0.3 * Math.sin(d * 1.1), ground + 0.012, z + r + d),
        n: UP,
      });
    }
  }
  return knots;
}

export class Book {
  readonly root = new Group();
  private readonly hinge = new Group();
  private readonly spine = new Group();
  private readonly left: Stack;
  private readonly right: Stack;
  private readonly leaf = new Leaf();
  private readonly riffles: Leaf[] = [];
  private readonly ribbon = new Ribbon();
  private readonly contact: Mesh<PlaneGeometry, MeshBasicMaterial>;
  private readonly pages: Pages;
  readonly coverMaterial: MeshPhysicalMaterial;
  private readonly debossMaterial: MeshPhysicalMaterial;

  constructor(opts: {
    cover: CoverMaps;
    deboss: Texture;
    clothNormal: Texture;
    edge: Texture;
    contact: Texture;
    pages: Pages;
  }) {
    this.pages = opts.pages;
    const cloth = new MeshPhysicalMaterial({
      color: HEX.bottle,
      roughness: 0.86,
      sheen: 0.5,
      sheenColor: new Color(0x4f7f68),
      sheenRoughness: 0.55,
      normalMap: opts.clothNormal,
      normalScale: new Vector2(0.35, 0.35),
      envMapIntensity: 0.6,
    });
    opts.clothNormal.repeat.set(10, 10);
    this.coverMaterial = new MeshPhysicalMaterial({
      color: 0xffffff,
      map: opts.cover.map,
      normalMap: opts.cover.normal,
      roughnessMap: opts.cover.rough,
      roughness: 1,
      sheen: 0.5,
      sheenColor: new Color(0x4f7f68),
      sheenRoughness: 0.55,
      envMapIntensity: 0.6,
    });

    // The right half: the back board and the right stack.
    const back = new Mesh(new RoundedBoxGeometry(BW, BT, BH, 2, 0.05), cloth);
    back.position.set(BW / 2, BT / 2, 0);
    back.castShadow = true;
    back.receiveShadow = true;
    this.right = new Stack("right", opts.edge);
    this.root.add(back, this.right.group);

    // The left half, on its hinge.
    this.hinge.position.set(0, PIVOT_Y, 0);
    const front = new Mesh(new RoundedBoxGeometry(BW, BT, BH, 2, 0.05), cloth);
    front.position.set(-BW / 2, BT / 2 - PIVOT_Y, 0);
    front.castShadow = true;
    front.receiveShadow = true;
    const coverFace = new PlaneGeometry(BW - 0.04, BH - 0.04);
    coverFace.rotateX(-Math.PI / 2);
    coverFace.translate(BW / 2, PIVOT_Y + 0.002, 0);
    // Built shut (cover up, spine on the left), then carried into the open pose.
    coverFace.rotateZ(Math.PI);
    const cover = new Mesh(coverFace, this.coverMaterial);
    cover.receiveShadow = true;

    // The category's pressing: a darker, smoother recess whose edges catch
    // the light, laid over the cloth at the foot of the cover.
    this.debossMaterial = new MeshPhysicalMaterial({
      color: HEX.bottleInk,
      alphaMap: opts.deboss,
      bumpMap: opts.deboss,
      bumpScale: -9,
      transparent: true,
      opacity: 0.55,
      roughness: 0.95,
      sheen: 0.4,
      sheenColor: new Color(0x5f8f78),
      sheenRoughness: 0.6,
      envMapIntensity: 0.6,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
    const dw = DEBOSS.x1 - DEBOSS.x0;
    const dh = DEBOSS.z1 - DEBOSS.z0;
    const debossFace = new PlaneGeometry(dw, dh);
    debossFace.rotateX(-Math.PI / 2);
    debossFace.translate(
      DEBOSS.x0 + dw / 2,
      PIVOT_Y + 0.004,
      -BH / 2 + DEBOSS.z0 + dh / 2,
    );
    debossFace.rotateZ(Math.PI);
    const deboss = new Mesh(debossFace, this.debossMaterial);
    deboss.receiveShadow = true;
    this.left = new Stack("left", opts.edge);
    this.left.group.position.y = -PIVOT_Y;
    this.hinge.add(front, cover, deboss, this.left.group);
    this.root.add(this.hinge);

    // The spine, shut: a half round from the back board to the front.
    const spineGeometry = new BufferGeometry();
    const seg = 20;
    const pos: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= seg; i++) {
      const a = Math.PI / 2 + (Math.PI * i) / seg;
      for (const z of [-BH / 2, BH / 2]) {
        pos.push(Math.cos(a) * PIVOT_Y * 0.55, Math.sin(a) * PIVOT_Y, z);
      }
      if (i < seg) {
        const k = i * 2;
        idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
      }
    }
    spineGeometry.setIndex(idx);
    spineGeometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(pos), 3),
    );
    spineGeometry.computeVertexNormals();
    const spine = new Mesh(spineGeometry, cloth);
    spine.castShadow = true;
    this.spine.position.set(0, PIVOT_Y, 0);
    this.spine.add(spine);
    this.root.add(this.spine);

    // The turning leaf and the riffle's leaves hang at the spine.
    this.root.add(this.leaf.group);
    for (let i = 0; i < 4; i++) {
      const leaf = new Leaf();
      leaf.group.visible = false;
      this.riffles.push(leaf);
      this.root.add(leaf.group);
    }
    this.root.add(this.ribbon.mesh);

    // Where the book meets the page: a soft footprint under it.
    this.contact = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({
        color: HEX.bottleInk,
        alphaMap: opts.contact,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    );
    this.contact.rotation.x = -Math.PI / 2;
    this.contact.position.y = 0.002;
    this.contact.renderOrder = -1;
    this.root.add(this.contact);
  }

  /** The right stack's top surface height, for the screen's plane and the ribbon. */
  static rightTop(state: Pick<BookState, "spread">) {
    return BT + (BLOCK - leftThickness(state.spread));
  }

  update(state: BookState) {
    const L = leftThickness(state.spread);
    const R = BLOCK - L;
    this.left.set(BT, L);
    this.right.set(BT, R);

    // The hinge: shut (-π), open (0), shut again at the end.
    let rho = 0;
    if (state.open < 1) rho = -Math.PI * (1 - smooth(clamp01(state.open)));
    if (state.close > 0) rho = -Math.PI * smooth(clamp01(state.close));
    const riffle = clamp01(state.riffle);
    if (state.open <= 0 && riffle > 0 && riffle < 1) {
      rho += coverLift(riffle);
    }
    this.hinge.rotation.z = rho;
    const shut = Math.max(
      state.open < 1 ? 1 - smooth(clamp01(state.open)) : 0,
      smooth(clamp01(state.close)),
    );
    this.spine.scale.x = Math.max(0.001, shut);
    this.spine.visible = shut > 0.02;

    const i = Math.min(SPREADS - 1, Math.floor(state.spread + 1e-6));
    const t = clamp01(state.spread - i);
    this.left.setPage(this.pages.left(i));
    this.right.setPage(
      this.pages.right(t > 0 ? Math.min(SPREADS - 1, i + 1) : i),
    );

    // The turning leaf.
    const turning = t > 0 && t < 1 && i < SPREADS - 1;
    this.leaf.group.visible = turning;
    if (turning) {
      this.leaf.setPages(this.pages.right(i), this.pages.left(i + 1));
      this.leaf.bend(t);
      const from = BT + R + LIFT * 2;
      const to = BT + L + LIFT * 2;
      this.leaf.group.position.y = from + (to - from) * smooth(t);
    }

    // The riffle: the top leaves lift under the thumb and drop back in turn.
    for (let k = 0; k < this.riffles.length; k++) {
      const leaf = this.riffles[k];
      const lift = riffleLeaf(riffle, k);
      const on = state.open <= 0 && lift > 0.001;
      leaf.group.visible = on;
      if (on) {
        leaf.setPages(
          this.pages.thumb("right", Math.min(SPREADS - 1, k + 1)),
          this.pages.thumb("left", Math.min(SPREADS - 1, k + 1)),
        );
        leaf.bend(lift, 0.6);
        leaf.group.position.y = BT + R + LIFT * (3 + k);
      }
    }

    // The ribbon lies on the right-hand page; turning that page lifts it.
    // Its tail hangs to the table, however high the book is off it.
    const reading = state.open >= 1 && state.close <= 0;
    this.ribbon.update(
      ribbonKnots(
        BT + R,
        reading && turning
          ? { t, from: BT + R + LIFT * 2, to: BT + L + LIFT * 2 }
          : null,
        Math.min(0, -this.root.position.y),
      ),
    );

    // The footprint follows the book open or shut.
    const openness = 1 - shut;
    const x0 = -BW * openness - 0.5 * (1 - openness);
    const x1 = BW + 0.3;
    this.contact.scale.set(x1 - x0 + 2.4, BH + 2.6, 1);
    this.contact.position.x = (x0 + x1) / 2;
  }

  /** A new edition: the category's pressing swapped on the cover. */
  setDeboss(mask: Texture) {
    this.debossMaterial.alphaMap = mask;
    this.debossMaterial.bumpMap = mask;
    this.debossMaterial.needsUpdate = true;
  }
}

/** The cover lifting under the thumb: up to about 40° and back with a bounce. */
function coverLift(r: number) {
  if (r < 0.12) return 0;
  if (r < 0.42) return 0.72 * smooth((r - 0.12) / 0.3);
  const fall = (r - 0.42) / 0.58;
  // Drop, then a small overshoot as it lands, like a board settling.
  return (
    0.72 * Math.max(0, 1 - smooth(Math.min(1, fall * 1.6))) +
    0.035 * Math.sin(Math.min(1, fall) * Math.PI * 3) * (1 - fall)
  );
}

/** Each riffled leaf: lifted with the cover, then dropped back one after another. */
function riffleLeaf(r: number, k: number) {
  const up = smooth(clamp01((r - 0.14 - k * 0.025) / 0.26));
  const down = smooth(clamp01((r - 0.45 - k * 0.07) / 0.22));
  return Math.max(0, up * (1 - down)) * (0.2 - k * 0.035);
}
