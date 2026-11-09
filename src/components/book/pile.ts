import {
  BoxGeometry,
  Color,
  Group,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  Mesh,
  PlaneGeometry,
  type Texture,
  Vector2,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { BOARD, PAGE } from "./dims";
import { CSS, HEX } from "./palette";
import { spineLabel, type Fonts } from "./textures";

/**
 * The season, shelved: the vendor's other jobs as closed books in a pile,
 * spines out, the job the page followed landing on top once it is paid.
 * Illustrative: the names are the seed console's, plus two that are not
 * weddings on purpose. Every spine is cloth with one title fitted to it.
 */

const BW = PAGE.w + BOARD.square;
const BH = PAGE.h + BOARD.square * 2;

const VOLUMES = [
  {
    title: "Ruby & Max",
    block: 1.0,
    deep: false,
    yaw: -0.018,
    dx: 0.04,
    dz: 0.1,
  },
  {
    title: "End of year party",
    block: 0.86,
    deep: true,
    yaw: 0.02,
    dx: -0.06,
    dz: -0.06,
  },
  {
    title: "Grace & Leo",
    block: 1.05,
    deep: false,
    yaw: -0.012,
    dx: 0.07,
    dz: 0.04,
  },
  {
    title: "Product shoot",
    block: 0.9,
    deep: true,
    yaw: 0.024,
    dx: -0.04,
    dz: -0.1,
  },
  {
    title: "Isla & Noah",
    block: 1.0,
    deep: false,
    yaw: -0.02,
    dx: 0.05,
    dz: 0.06,
  },
] as const;

export class Pile {
  readonly root = new Group();
  /** The top of the pile, where the followed book lands. */
  readonly height: number;

  constructor(
    fonts: Fonts,
    edge: Texture,
    clothNormal: Texture,
    contact: Texture,
  ) {
    const edgeMaterial = new MeshLambertMaterial({ map: edge });
    let y = 0;
    for (const v of VOLUMES) {
      const thickness = BOARD.t * 2 + v.block;
      const book = new Group();
      const cloth = new MeshPhysicalMaterial({
        color: v.deep ? HEX.bottleDeep : HEX.bottle,
        roughness: 0.86,
        sheen: 0.5,
        sheenColor: new Color(0x4f7f68),
        sheenRoughness: 0.55,
        normalMap: clothNormal,
        normalScale: new Vector2(0.3, 0.3),
        envMapIntensity: 0.6,
      });
      const board = new RoundedBoxGeometry(BW, BOARD.t, BH, 2, 0.05);
      const bottom = new Mesh(board, cloth);
      bottom.position.set(BW / 2, BOARD.t / 2, 0);
      const top = new Mesh(board, cloth);
      top.position.set(BW / 2, thickness - BOARD.t / 2, 0);
      const block = new Mesh(
        new BoxGeometry(PAGE.w, v.block, PAGE.h),
        edgeMaterial,
      );
      block.position.set(PAGE.w / 2 + 0.02, BOARD.t + v.block / 2, 0);
      const spine = new Mesh(
        new RoundedBoxGeometry(0.2, thickness, BH, 2, 0.06),
        cloth,
      );
      spine.position.set(0.02, thickness / 2, 0);

      // The title, foil-stamped on the spine and nowhere else.
      const faceW = BH - 0.6;
      const faceH = thickness - 0.14;
      const label = spineLabel(
        fonts,
        v.title,
        "Paid",
        v.deep ? CSS.bottleDeep : CSS.bottle,
        CSS.onDark,
        faceW / faceH,
      );
      const face = new PlaneGeometry(faceW, faceH);
      face.rotateY(-Math.PI / 2);
      const labelMaterial = cloth.clone();
      labelMaterial.color.set(0xffffff);
      labelMaterial.map = label;
      labelMaterial.normalMap = null;
      const labelMesh = new Mesh(face, labelMaterial);
      labelMesh.receiveShadow = true;
      labelMesh.position.set(-0.084, thickness / 2, 0);
      for (const m of [bottom, top, block, spine]) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
      book.add(bottom, top, block, spine, labelMesh);
      book.position.set(v.dx, y, v.dz);
      book.rotation.y = v.yaw;
      this.root.add(book);
      y += thickness;
    }
    this.height = y;

    // Where the pile meets the page: the same soft footprint as the book's.
    const foot = new Mesh(
      new PlaneGeometry(BW + 2.4, BH + 2.6),
      new MeshBasicMaterial({
        color: HEX.bottleInk,
        alphaMap: contact,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    );
    foot.rotation.x = -Math.PI / 2;
    foot.position.set(BW / 2, 0.002, 0);
    foot.renderOrder = -1;
    this.root.add(foot);
  }
}
