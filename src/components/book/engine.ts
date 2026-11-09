import {
  type CanvasTexture,
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  NoToneMapping,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  SRGBColorSpace,
  Scene,
  ShadowMaterial,
  type Texture,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { Book } from "./book";
import { PLATE, SPREADS } from "./dims";
import {
  PILE_AT,
  place,
  poses,
  shotAt,
  type Intro,
  type Layout,
  type Poses,
} from "./director";
import { HEX } from "./palette";
import { Pile } from "./pile";
import {
  blankPage,
  clothTile,
  contactTexture,
  coverMaps,
  debossMask,
  edgeTexture,
  leftPage,
  loadFonts,
  loadImage,
  rightPage,
  type CoverMaps,
  type Fonts,
  type LeftPage,
} from "./textures";

/**
 * The renderer and its loop. The canvas is transparent over the page's own
 * white, so the ground is exactly the page; the book's shadow falls on it
 * through a Bottle-tinted shadow catcher.
 *
 * Light is calibrated rather than tone mapped: a page lying flat takes
 * exactly π of light (hemisphere plus the window's share at its angle), so
 * a flat white page renders #FFFFFF and a screen printed on it renders
 * exactly as captured. That is what lets the HTML screen take over at rest
 * without a seam. Anything tilted or in shadow is lit for real.
 *
 * Frames are drawn on demand: scrolling, the intro, a pointer easing or a
 * resize asks for one; a still page draws nothing.
 */

export type EngineOptions = {
  phone: boolean;
  dpr: number;
  /** Depth of field on the shots where no screen is read (desktop story only). */
  dof?: boolean;
};

export type Content = {
  /** Poster frames for the five right-hand pages. */
  posters: string[];
  /** Each stage's left-hand page in the chosen category's words. */
  left: LeftPage[];
  category: string;
};

/**
 * The window is to the right and a little toward the reader: shadows fall
 * left across the page, so a turning leaf sweeps its shadow over the left-
 * hand page and the hero's book throws its shadow where the camera sees it.
 */
const KEY = new Vector3(0.62, 0.76, 0.14).normalize();
const FLAT = KEY.y;
const DIRECT_SHARE = 0.6;

export class Engine {
  readonly renderer: WebGLRenderer;
  readonly camera = new PerspectiveCamera(24, 1, 0.5, 600);
  private readonly scene = new Scene();
  private readonly key: DirectionalLight;
  private readonly options: EngineOptions;
  private book: Book | null = null;
  private pile: Pile | null = null;
  private fonts: Fonts | null = null;
  private cover: CoverMaps | null = null;
  private deboss: CanvasTexture | null = null;
  private warming = 0;
  private content: Content | null = null;
  private layout: Layout | null = null;
  private fixed: Poses | null = null;
  private posters: (CanvasImageSource | null)[] = [];
  private readonly lefts = new Map<number, Texture>();
  private readonly rights = new Map<number, Texture>();
  private readonly thumbs = new Map<string, Texture>();
  private blank: Texture | null = null;
  private target = { s: 0 };
  private shown = { s: 0 };
  private pointer = { x: 0, y: 0 };
  private pointerShown = { x: 0, y: 0 };
  private intro: Intro = { drop: 0, riffle: 0 };
  private introStart = 0;
  private frame = 0;
  private last = 0;
  private disposed = false;
  private restNow = false;
  private readonly fade = {
    centre: { value: new Vector2() },
    half: { value: new Vector2(10, 7) },
  };
  private composer: EffectComposer | null = null;
  private bokeh: BokehPass | null = null;
  /** Called after each frame with whether the camera rests on a screen. */
  onFrame: ((rest: boolean) => void) | null = null;

  constructor(canvas: HTMLCanvasElement, options: EngineOptions) {
    this.options = options;
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NoToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, options.dpr),
    );

    // The window light and the room: π between them on a flat page.
    const hemi = new HemisphereLight(
      0xffffff,
      0xe9ece6,
      Math.PI * (1 - DIRECT_SHARE),
    );
    hemi.position.set(0, 1, 0);
    this.key = new DirectionalLight(0xffffff, (Math.PI * DIRECT_SHARE) / FLAT);
    this.key.position.copy(KEY).multiplyScalar(60);
    this.key.castShadow = true;
    // A fine map over a tight frustum that follows the book: soft, even
    // penumbrae with no stair-stepping on the long edges.
    const size = options.phone ? 2048 : 4096;
    this.key.shadow.mapSize.set(size, size);
    this.key.shadow.radius = options.phone ? 4 : 7;
    this.key.shadow.bias = -0.0004;
    this.key.shadow.normalBias = 0.025;
    const cam = this.key.shadow.camera;
    cam.left = -19;
    cam.right = 19;
    cam.top = 19;
    cam.bottom = -19;
    cam.near = 1;
    cam.far = 140;
    this.scene.add(hemi, this.key, this.key.target);

    const pmrem = new PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;
    this.scene.environmentIntensity = 0.2;
    pmrem.dispose();

    // The shadow catcher: Bottle-tinted shadow on the page, fading out a
    // little way past the book so nothing it throws reaches the nav or the
    // edges of the window.
    const catcher = new ShadowMaterial({
      color: new Color(HEX.bottle),
      opacity: 0.2,
    });
    catcher.onBeforeCompile = (shader) => {
      shader.uniforms.fadeCentre = this.fade.centre;
      shader.uniforms.fadeHalf = this.fade.half;
      shader.vertexShader = shader.vertexShader
        .replace("void main() {", "varying vec3 vCatch;\nvoid main() {")
        .replace(
          "#include <worldpos_vertex>",
          "#include <worldpos_vertex>\n\tvCatch = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;",
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "void main() {",
          "uniform vec2 fadeCentre;\nuniform vec2 fadeHalf;\nvarying vec3 vCatch;\nvoid main() {",
        )
        .replace(
          "gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );",
          `vec2 d = abs( vCatch.xz - fadeCentre ) - fadeHalf;
	float fade = 1.0 - smoothstep( 0.0, 2.6, max( d.x, d.y ) );
	gl_FragColor = vec4( color, opacity * fade * ( 1.0 - getShadowMask() ) );`,
        );
    };
    const ground = new Mesh(new PlaneGeometry(600, 600), catcher);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  /** Depth of field, built the first time a shot asks for it. */
  private ensureComposer() {
    if (this.composer || !this.options.dof || !this.layout) return;
    const target = new WebGLRenderTarget(1, 1, {
      type: UnsignedByteType,
      samples: 4,
    });
    const composer = new EffectComposer(this.renderer, target);
    composer.addPass(new RenderPass(this.scene, this.camera));
    this.bokeh = new BokehPass(this.scene, this.camera, {
      focus: 40,
      aperture: 0,
      maxblur: 0.006,
    });
    composer.addPass(this.bokeh);
    composer.addPass(new OutputPass());
    composer.setPixelRatio(this.renderer.getPixelRatio());
    composer.setSize(this.layout.width, this.layout.height);
    this.composer = composer;
  }

  async load(content: Content) {
    this.content = content;
    const fonts = await loadFonts();
    this.fonts = fonts;
    const posters = await Promise.all(
      content.posters.map((url) => loadImage(url).catch(() => null)),
    );
    if (this.disposed) return;
    this.posters = posters;
    const coverWidth = this.options.phone ? 1024 : 1536;
    this.cover = coverMaps(fonts, coverWidth);
    this.deboss = debossMask(
      fonts,
      content.category,
      this.options.phone ? 1024 : 2048,
    );
    this.blank = blankPage(256);
    const clothNormal = clothTile();
    const edge = edgeTexture();
    const contact = contactTexture();
    this.book = new Book({
      cover: this.cover,
      deboss: this.deboss,
      clothNormal,
      edge,
      contact,
      pages: {
        left: (i) => this.leftTexture(i),
        right: (i) => this.rightTexture(i),
        thumb: (side, i) => this.thumbTexture(side, i),
      },
    });
    this.pile = new Pile(fonts, edge, clothNormal, contact);
    this.pile.root.position.copy(PILE_AT);
    this.scene.add(this.book.root, this.pile.root);
    // Warm the first spread and the shaders before the first frame shows.
    this.leftTexture(0);
    this.rightTexture(0);
    this.renderer.compile(this.scene, this.camera);
  }

  /** Start the arrival: the book drops, settles, and riffles its pages once. */
  play() {
    this.introStart = performance.now();
    this.invalidate();
  }

  /** Riffle the pages again, the book already down (a hover on a small book). */
  riffle() {
    const now = performance.now();
    if (this.introStart && now - this.introStart < 2400) return;
    this.introStart = now - 820;
    this.invalidate();
  }

  setLayout(layout: Layout) {
    this.layout = layout;
    const { renderer } = this;
    renderer.setSize(layout.width, layout.height, false);
    this.camera.aspect = layout.width / layout.height;
    if (this.composer) {
      this.composer.setSize(layout.width, layout.height);
      if (this.bokeh) {
        this.bokeh.materialBokeh.uniforms.aspect.value = this.camera.aspect;
      }
    }
    this.fixed = poses(layout, this.pile?.height ?? 4);
    this.invalidate();
  }

  setStory(s: number) {
    this.target.s = s;
    this.invalidate();
  }

  /** Jump to the scroll's story without easing (a resize, a jump link). */
  snap() {
    this.shown = { ...this.target };
    this.invalidate();
  }

  setPointer(x: number, y: number) {
    this.pointer = { x, y };
    this.invalidate();
  }

  /** A new edition: the category pressed into the cover. */
  setCategory(content: Pick<Content, "left" | "category">) {
    if (!this.content || !this.fonts || !this.book) return;
    if (content.category === this.content.category) return;
    this.content = { ...this.content, ...content };
    this.deboss = debossMask(
      this.fonts,
      content.category,
      this.options.phone ? 1024 : 2048,
      this.deboss ?? undefined,
    );
    this.book.setDeboss(this.deboss);
    this.invalidate();
  }

  /**
   * Print the spreads either side of the reader while the page is idle, so
   * a turn never waits on a page being drawn.
   */
  private warm(spread: number) {
    if (this.warming) return;
    const i = Math.round(spread);
    const todo: (() => Texture | null)[] = [];
    for (const j of [i + 1, i - 1, i + 2]) {
      if (j < 0 || j >= SPREADS) continue;
      if (!this.lefts.has(j)) todo.push(() => this.leftTexture(j));
      if (!this.rights.has(j)) todo.push(() => this.rightTexture(j));
    }
    const next = todo[0];
    if (!next) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    const run = () => {
      this.warming = 0;
      if (this.disposed) return;
      // Print it and upload it now, while nothing is moving.
      const printed = next();
      if (printed) this.renderer.initTexture(printed);
      this.warm(spread);
    };
    this.warming = w.requestIdleCallback
      ? w.requestIdleCallback(run, { timeout: 600 })
      : window.setTimeout(run, 120);
  }

  private leftTexture(i: number): Texture | null {
    const hit = this.lefts.get(i);
    if (hit) return hit;
    if (!this.fonts || !this.content) return this.blank;
    const page = this.content.left[i];
    if (!page) return this.blank;
    const tex = leftPage(this.fonts, page, this.options.phone ? 1024 : 2048);
    tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    this.lefts.set(i, tex);
    return tex;
  }

  private rightTexture(i: number): Texture | null {
    const hit = this.rights.get(i);
    if (hit) return hit;
    const image = this.posters[i];
    if (!image) return this.blank;
    const tex = rightPage(image, this.options.phone ? 1024 : 2048);
    tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    this.rights.set(i, tex);
    return tex;
  }

  /** Small prints for the riffle: glimpsed for a moment, never pruned. */
  private thumbTexture(side: "left" | "right", i: number): Texture | null {
    const key = `${side}${i}`;
    const hit = this.thumbs.get(key);
    if (hit) return hit;
    if (!this.fonts || !this.content) return this.blank;
    let tex: Texture | null = null;
    if (side === "left") {
      const page = this.content.left[i];
      if (page) tex = leftPage(this.fonts, page, 512);
    } else {
      const image = this.posters[i];
      if (image) tex = rightPage(image, 512);
    }
    if (!tex) return this.blank;
    this.thumbs.set(key, tex);
    return tex;
  }

  /** Keep the spreads near the reader printed and let the far ones go. */
  private prune(spread: number) {
    for (const [cache, keep] of [
      [this.lefts, 2],
      [this.rights, 2],
    ] as const) {
      for (const [i, tex] of cache) {
        if (Math.abs(i - spread) > keep) {
          tex.dispose();
          cache.delete(i);
        }
      }
    }
  }

  invalidate() {
    if (this.frame || this.disposed) return;
    this.last = performance.now();
    this.frame = requestAnimationFrame(this.tick);
  }

  private readonly tick = (now: number) => {
    this.frame = 0;
    if (this.disposed || !this.book || !this.layout || !this.fixed) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;

    // The story eases toward the scroll; plateaus snap so a resting
    // screen is exactly square.
    const k = 1 - Math.exp(-dt * 11);
    let moving = false;
    const ds = this.target.s - this.shown.s;
    if (Math.abs(ds) < 0.0008) this.shown.s = this.target.s;
    else {
      this.shown.s += ds * k;
      moving = true;
    }
    for (const key of ["x", "y"] as const) {
      const d = this.pointer[key] - this.pointerShown[key];
      if (Math.abs(d) < 0.001) this.pointerShown[key] = this.pointer[key];
      else {
        this.pointerShown[key] += d * (1 - Math.exp(-dt * 5));
        moving = true;
      }
    }

    let introRunning = false;
    if (this.introStart) {
      const t = (now - this.introStart) / 1000;
      this.intro = {
        drop: Math.min(1, t / 0.85),
        riffle: Math.min(1, Math.max(0, (t - 0.75) / 1.5)),
      };
      introRunning = this.intro.riffle < 1;
    } else {
      this.intro = { drop: 1, riffle: 0 };
    }

    const shot = shotAt(
      this.shown.s,
      this.intro,
      this.layout,
      this.fixed,
      this.pointerShown,
    );
    const { book } = this;
    book.root.position.set(shot.book.x, shot.book.y, shot.book.z);
    book.root.rotation.set(shot.book.tilt, shot.book.yaw, 0);
    book.update(shot.state);
    place(this.camera, shot.pose);

    // The shadow camera and the catcher's fade follow what is on the table:
    // the shut book's footprint turned to its angle, or the open spread.
    const open = shot.state.open * (1 - shot.state.close);
    const c = Math.cos(shot.book.yaw);
    const n = Math.sin(shot.book.yaw);
    const shutX = shot.book.x + 8.1 * c;
    const shutZ = shot.book.z - 8.1 * n;
    const cx = shutX + (shot.book.x - shutX) * open;
    const cz = shutZ + (shot.book.z - shutZ) * open;
    const shutHalfX = Math.abs(c) * 8.7 + Math.abs(n) * 5.8;
    const shutHalfZ = Math.abs(n) * 8.7 + Math.abs(c) * 5.8;
    this.key.target.position.set(cx, 0, cz);
    this.key.position.copy(this.key.target.position).addScaledVector(KEY, 60);
    this.fade.centre.value.set(cx, cz);
    this.fade.half.value.set(
      shutHalfX + (16.8 - shutHalfX) * open,
      shutHalfZ + (5.8 - shutHalfZ) * open,
    );

    this.prune(shot.state.spread);
    if (shot.dof.strength > 0.02 && this.options.dof) {
      this.ensureComposer();
    }
    if (this.composer && this.bokeh && shot.dof.strength > 0.02) {
      // Opaque white is the page itself, so the swap is invisible; the
      // bokeh pass writes an opaque frame.
      this.renderer.setClearColor(0xffffff, 1);
      const u = this.bokeh.materialBokeh.uniforms;
      // The shader's focus is a view depth, not a distance: take the focus
      // point's depth along the camera's axis so the subject is the sharp plane.
      u.focus.value = -shot.dof.focus
        .clone()
        .applyMatrix4(this.camera.matrixWorldInverse).z;
      u.aperture.value = 0.0012 * shot.dof.strength;
      u.maxblur.value = 0.012 * shot.dof.strength;
      u.aspect.value = this.camera.aspect;
      this.composer.render();
    } else {
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.render(this.scene, this.camera);
    }
    if (!moving) this.warm(shot.state.spread);

    this.restNow = shot.rest && !moving;
    this.onFrame?.(this.restNow);
    if (moving || introRunning) this.invalidate();
  };

  /** The resting screen's box on the canvas, in CSS pixels. */
  plateRect(spread: number) {
    if (!this.book || !this.layout) return null;
    const y = Book.rightTop({ spread });
    const corners = [
      new Vector3(PLATE.x0, y, PLATE.z0),
      new Vector3(PLATE.x1, y, PLATE.z1),
    ].map((p) =>
      p.applyMatrix4(this.book!.root.matrixWorld).project(this.camera),
    );
    const [a, b] = corners;
    const W = this.layout.width;
    const H = this.layout.height;
    const x0 = ((Math.min(a.x, b.x) + 1) / 2) * W;
    const x1 = ((Math.max(a.x, b.x) + 1) / 2) * W;
    const y0 = ((1 - Math.max(a.y, b.y)) / 2) * H;
    const y1 = ((1 - Math.min(a.y, b.y)) / 2) * H;
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  get atRest() {
    return this.restNow;
  }

  get spreads() {
    return SPREADS;
  }

  dispose() {
    this.disposed = true;
    if (this.frame) cancelAnimationFrame(this.frame);
    for (const tex of [
      ...this.lefts.values(),
      ...this.rights.values(),
      ...this.thumbs.values(),
    ])
      tex.dispose();
    this.composer?.dispose();
    this.bokeh?.dispose();
    this.scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (mesh.isMesh) {
        mesh.geometry.dispose();
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const m of mats) m.dispose();
      }
    });
    this.renderer.dispose();
  }
}
