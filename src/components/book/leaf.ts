import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  MeshLambertMaterial,
  Mesh,
  type Texture,
} from "three";
import { PAGE } from "./dims";

/**
 * One leaf of the book, turned by the scroll. It is a grid from the spine
 * (u = 0) to the fore-edge (u = 16), head to tail, bent by integrating an
 * angle along its width, so it lifts at the corner, stands, and lands with
 * its edge trailing the way paper does. Both faces share one set of
 * positions: the front prints the right-hand page it leaves, the back the
 * left-hand page it lands as.
 */

const SEG_U = 48;
const SEG_V = 8;
const COLS = SEG_U + 1;
const ROWS = SEG_V + 1;

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * The leaf's angle at a share `w` of the way from the spine, for a turn at
 * `t`: the root lags early and leads late, the edge trails as it lands, and
 * the tail corner (`vn` toward 1) leads, the way a thumb turns a page.
 */
function leafAngle(
  t: number,
  w: number,
  vn: number,
  curl: number,
  skew: number,
) {
  const root = Math.PI * smooth(t);
  const edge = Math.PI * t;
  const bow = curl * Math.sin(Math.PI * t);
  const lean = 1 + skew * vn;
  const angle =
    root +
    (edge - root) * Math.pow(w, 1.3) * lean -
    0.55 * bow * Math.pow(w, 1.15) * lean;
  return Math.min(Math.PI, Math.max(0, angle));
}

/**
 * A point on a turning leaf, `u` units from the spine at depth `z`, in the
 * leaf's own frame, with the front face's normal there. What rides on the
 * page (the ribbon, the arbour) is placed with it.
 */
export function leafSurface(t: number, u: number, z: number) {
  const du = PAGE.w / SEG_U;
  const vn = Math.min(1, Math.max(-1, z / (PAGE.h / 2)));
  let x = 0;
  let y = 0;
  let angle = leafAngle(t, 0.5 / SEG_U, vn, 1, 0.35);
  let travelled = 0;
  for (let i = 0; i < SEG_U && travelled < u; i++) {
    angle = leafAngle(t, (i + 0.5) / SEG_U, vn, 1, 0.35);
    const step = Math.min(du, u - travelled);
    x += Math.cos(angle) * step;
    y += Math.sin(angle) * step;
    travelled += step;
  }
  return { x, y, angle, nx: -Math.sin(angle), ny: Math.cos(angle) };
}

export class Leaf {
  readonly group = new Group();
  readonly front: Mesh<BufferGeometry, MeshLambertMaterial>;
  readonly back: Mesh<BufferGeometry, MeshLambertMaterial>;
  private readonly position: BufferAttribute;
  private readonly frontGeometry: BufferGeometry;

  constructor() {
    const position = new BufferAttribute(new Float32Array(COLS * ROWS * 3), 3);
    const normal = new BufferAttribute(new Float32Array(COLS * ROWS * 3), 3);
    const uvFront = new Float32Array(COLS * ROWS * 2);
    const uvBack = new Float32Array(COLS * ROWS * 2);
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        const k = j * COLS + i;
        uvFront[k * 2] = i / SEG_U;
        uvFront[k * 2 + 1] = 1 - j / SEG_V;
        uvBack[k * 2] = 1 - i / SEG_U;
        uvBack[k * 2 + 1] = 1 - j / SEG_V;
      }
    }
    const index: number[] = [];
    for (let j = 0; j < SEG_V; j++) {
      for (let i = 0; i < SEG_U; i++) {
        const a = j * COLS + i;
        const b = a + 1;
        const c = a + COLS;
        const d = c + 1;
        index.push(a, c, b, b, c, d);
      }
    }
    const front = new BufferGeometry();
    front.setIndex(index);
    front.setAttribute("position", position);
    front.setAttribute("normal", normal);
    front.setAttribute("uv", new BufferAttribute(uvFront, 2));
    const back = new BufferGeometry();
    back.setIndex(index);
    back.setAttribute("position", position);
    back.setAttribute("normal", normal);
    back.setAttribute("uv", new BufferAttribute(uvBack, 2));
    this.position = position;
    this.frontGeometry = front;

    this.front = new Mesh(
      front,
      new MeshLambertMaterial({ color: 0xffffff, shadowSide: DoubleSide }),
    );
    this.back = new Mesh(
      back,
      new MeshLambertMaterial({ color: 0xffffff, side: BackSide }),
    );
    this.front.castShadow = true;
    this.front.receiveShadow = true;
    this.back.receiveShadow = true;
    this.group.add(this.front, this.back);
    this.bend(0);
  }

  setPages(front: Texture | null, back: Texture | null) {
    if (this.front.material.map !== front) {
      this.front.material.map = front;
      this.front.material.needsUpdate = true;
    }
    if (this.back.material.map !== back) {
      this.back.material.map = back;
      this.back.material.needsUpdate = true;
    }
  }

  /**
   * Bend the leaf for a turn at `t`: 0 lying on the right, 1 on the left.
   * `skew` makes the tail corner lead, the way a thumb turns a page.
   */
  bend(t: number, curl = 1, skew = 0.35) {
    const arr = this.position.array as Float32Array;
    const du = PAGE.w / SEG_U;
    for (let j = 0; j < ROWS; j++) {
      const vn = (j / SEG_V) * 2 - 1;
      const z = vn * (PAGE.h / 2);
      let x = 0;
      let y = 0;
      for (let i = 0; i < COLS; i++) {
        const k = (j * COLS + i) * 3;
        arr[k] = x;
        arr[k + 1] = y;
        arr[k + 2] = z;
        const angle = leafAngle(t, (i + 0.5) / SEG_U, vn, curl, skew);
        x += Math.cos(angle) * du;
        y += Math.sin(angle) * du;
      }
    }
    this.position.needsUpdate = true;
    this.frontGeometry.computeVertexNormals();
    this.frontGeometry.computeBoundingSphere();
  }

  dispose() {
    this.frontGeometry.dispose();
    this.back.geometry.dispose();
    this.front.material.dispose();
    this.back.material.dispose();
  }
}
