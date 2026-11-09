import {
  CanvasTexture,
  LinearMipmapLinearFilter,
  NoColorSpace,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";
import { BOARD, NUMERAL, PAGE, PLATE_MARGIN } from "./dims";
import { CSS } from "./palette";

/**
 * Everything the book prints, drawn on canvases at load: the woven cloth
 * and its debossed cover, the page edges, and the pages themselves (a
 * chapter numeral and running head on the left, a real screen tipped in on
 * the right). Nothing here is a raster asset; the only images drawn in are
 * the console's own poster frames, unchanged.
 */

export type Fonts = { display: string; mono: string };

let fontsReady: Promise<Fonts> | null = null;

/**
 * Bricolage at 800 (the static instance the OG image uses, so the numerals
 * are the display cut, not the variable font's default optical size) and
 * the page's own Martian Mono.
 */
export function loadFonts(): Promise<Fonts> {
  if (fontsReady) return fontsReady;
  fontsReady = (async () => {
    const display = "Arbour Book Display";
    const face = new FontFace(display, "url(/book/bricolage-800.woff)", {
      weight: "800",
    });
    await face.load();
    document.fonts.add(face);
    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-martian")
        .trim() || "ui-monospace, monospace";
    try {
      await document.fonts.load(`400 32px ${mono}`);
    } catch {
      // The fallback monospace is fine for small print.
    }
    return { display: `"${display}"`, mono };
  })();
  return fontsReady;
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("No 2D context");
  return { canvas, ctx };
}

/** A small seeded generator, so the cloth is the same on every visit. */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A plain weave as a height field: warp and weft threads crossing over and
 * under on a checker, each thread a little thicker or thinner than the
 * next, with a fine fibre noise on top.
 */
function weave(width: number, height: number, period: number, seed: number) {
  const rand = random(seed);
  const cols = Math.ceil(width / period) + 1;
  const rows = Math.ceil(height / period) + 1;
  const warp = Float32Array.from({ length: cols }, () => 0.8 + rand() * 0.4);
  const weft = Float32Array.from({ length: rows }, () => 0.8 + rand() * 0.4);
  const profileX = new Float32Array(width);
  const cellX = new Int32Array(width);
  for (let x = 0; x < width; x++) {
    const i = Math.floor(x / period);
    cellX[x] = i;
    profileX[x] = Math.sin(Math.PI * ((x % period) / period)) * warp[i];
  }
  const out = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    const j = Math.floor(y / period);
    const b = Math.sin(Math.PI * ((y % period) / period)) * weft[j];
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const a = profileX[x];
      const over = ((cellX[x] + j) & 1) === 0;
      out[row + x] = (over ? a + 0.32 * b : b + 0.32 * a) + rand() * 0.09;
    }
  }
  return out;
}

/** A tangent-space normal map from a height field (green is up, as three reads it). */
function normalsFrom(
  heightField: Float32Array,
  width: number,
  height: number,
  strength: number,
) {
  const data = new ImageData(width, height);
  const px = data.data;
  for (let y = 0; y < height; y++) {
    const up = (y === 0 ? y : y - 1) * width;
    const down = (y === height - 1 ? y : y + 1) * width;
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const left = x === 0 ? x : x - 1;
      const right = x === width - 1 ? x : x + 1;
      const dx = heightField[row + right] - heightField[row + left];
      const dy = heightField[down + x] - heightField[up + x];
      let nx = -dx * strength;
      let ny = dy * strength;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      const o = (row + x) * 4;
      px[o] = (nx * 0.5 + 0.5) * 255;
      px[o + 1] = (ny * 0.5 + 0.5) * 255;
      px[o + 2] = (nz * 0.5 + 0.5) * 255;
      px[o + 3] = 255;
    }
  }
  return data;
}

/** Read a canvas's red channel as a 0 to 1 mask. */
function maskOf(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2D context");
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const out = new Float32Array(canvas.width * canvas.height);
  for (let i = 0; i < out.length; i++) out[i] = data[i * 4] / 255;
  return out;
}

/** Text with tracking, drawn a glyph at a time so it works in every browser. */
function tracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
  align: "left" | "right" = "left",
) {
  const widths = [...text].map((ch) => ctx.measureText(ch).width);
  const total =
    widths.reduce((sum, w) => sum + w, 0) + spacing * (text.length - 1);
  let cursor = align === "right" ? x - total : x;
  const previous = ctx.textAlign;
  ctx.textAlign = "left";
  [...text].forEach((ch, i) => {
    ctx.fillText(ch, cursor, y);
    cursor += widths[i] + spacing;
  });
  ctx.textAlign = previous;
  return total;
}

/**
 * The wordmark, as brand.md draws it: the open A (one stroked path, round
 * feet, the apex cut flat by its viewBox) then RBOUR at +0.04em, the A
 * 0.66em tall on the baseline with 0.04em after it.
 */
function wordmark(
  ctx: CanvasRenderingContext2D,
  fonts: Fonts,
  x: number,
  baseline: number,
  size: number,
) {
  const aHeight = 0.66 * size;
  const scale = aHeight / 494;
  const aWidth = 528 * scale;
  ctx.save();
  ctx.translate(x, baseline - aHeight);
  ctx.beginPath();
  ctx.rect(0, 0, aWidth, aHeight);
  ctx.clip();
  ctx.scale(scale, scale);
  ctx.translate(-333, -372);
  ctx.lineWidth = 122;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(394, 805);
  ctx.lineTo(595, 383);
  ctx.lineTo(796, 805);
  ctx.stroke();
  ctx.restore();
  ctx.font = `800 ${size}px ${fonts.display}`;
  ctx.textBaseline = "alphabetic";
  tracked(ctx, "RBOUR", x + aWidth + 0.04 * size, baseline, 0.04 * size);
}

export type CoverMaps = {
  map: CanvasTexture;
  normal: CanvasTexture;
  rough: CanvasTexture;
};

/** The front board's size, fore-edge and head and tail squares included. */
export const COVER = {
  w: PAGE.w + BOARD.square,
  h: PAGE.h + BOARD.square * 2,
} as const;

/**
 * The front cover: woven Bottle cloth with the wordmark foil-stamped in On
 * dark at the head. Drawn once; the category's deboss is a separate pressing
 * (debossMask) so a new edition costs a few milliseconds, not a reweave.
 */
export function coverMaps(fonts: Fonts, width: number): CoverMaps {
  const height = Math.round((width * COVER.h) / COVER.w);
  const s = width / COVER.w;
  const margin = 1.05 * s;
  const cloth = weave(width, height, Math.max(3.2, width / 520), 7);

  const foil = makeCanvas(width, height);
  foil.ctx.fillStyle = "#000";
  foil.ctx.fillRect(0, 0, width, height);
  foil.ctx.fillStyle = "#fff";
  foil.ctx.strokeStyle = "#fff";
  const markSize = 0.62 * s;
  wordmark(foil.ctx, fonts, margin, margin + 0.66 * markSize, markSize);
  const soft = makeCanvas(width, height);
  soft.ctx.filter = `blur(${Math.max(1, s * 0.02)}px)`;
  soft.ctx.drawImage(foil.canvas, 0, 0);
  const foilHard = maskOf(foil.canvas);
  const foilSoft = maskOf(soft.canvas);

  const field = new Float32Array(width * height);
  for (let i = 0; i < field.length; i++) {
    field[i] = cloth[i] * (1 - 0.8 * foilHard[i]) - 0.5 * foilSoft[i];
  }
  const normalCanvas = makeCanvas(width, height);
  normalCanvas.ctx.putImageData(normalsFrom(field, width, height, 1.1), 0, 0);

  const colour = makeCanvas(width, height);
  colour.ctx.fillStyle = CSS.bottle;
  colour.ctx.fillRect(0, 0, width, height);
  colour.ctx.drawImage(tint(foil.canvas, [244, 244, 240]), 0, 0);

  // Roughness in green: cloth matte, foil smooth.
  const rough = makeCanvas(width, height);
  rough.ctx.fillStyle = "rgb(0, 222, 0)";
  rough.ctx.fillRect(0, 0, width, height);
  rough.ctx.drawImage(tint(foil.canvas, [0, 70, 0]), 0, 0);

  return {
    map: texture(colour.canvas, true),
    normal: texture(normalCanvas.canvas, false),
    rough: texture(rough.canvas, false),
  };
}

/** Where the category is pressed into the cover, in board units from the spine and head. */
export const DEBOSS = {
  x0: 0.6,
  x1: COVER.w - 0.45,
  z0: COVER.h - 4.1,
  z1: COVER.h - 0.3,
} as const;

/**
 * The category, blind-debossed at the foot of the cover: a soft white-on-
 * black mask the cover's pressing reads as both its depth (a bump map) and
 * its darkening, so the edges catch the window light.
 */
export function debossMask(
  fonts: Fonts,
  category: string,
  width: number,
  previous?: CanvasTexture,
) {
  const w = DEBOSS.x1 - DEBOSS.x0;
  const h = DEBOSS.z1 - DEBOSS.z0;
  const height = Math.round((width * h) / w);
  const s = width / w;
  const { canvas, ctx } = makeCanvas(width, height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  if (category) {
    const inset = 1.05 - DEBOSS.x0;
    ctx.font = `800 100px ${fonts.display}`;
    const at100 = ctx.measureText(category).width;
    const size = Math.min(
      2.6 * s,
      ((width - inset * s - 0.6 * s) / at100) * 100,
    );
    ctx.font = `800 ${size}px ${fonts.display}`;
    ctx.textBaseline = "alphabetic";
    ctx.filter = `blur(${Math.max(1.5, s * 0.03)}px)`;
    ctx.fillStyle = "#fff";
    ctx.fillText(category, inset * s - 0.04 * size, height - (1.05 - 0.3) * s);
  }
  if (previous) {
    swap(previous, canvas);
    return previous;
  }
  return texture(canvas, false);
}

/** A white-on-black mask recoloured: lit pixels become `rgb`, the rest clear. */
function tint(mask: HTMLCanvasElement, rgb: readonly [number, number, number]) {
  const src = mask.getContext("2d");
  if (!src) throw new Error("No 2D context");
  const { data } = src.getImageData(0, 0, mask.width, mask.height);
  const out = makeCanvas(mask.width, mask.height);
  const img = out.ctx.createImageData(mask.width, mask.height);
  for (let i = 0; i < data.length; i += 4) {
    img.data[i] = rgb[0];
    img.data[i + 1] = rgb[1];
    img.data[i + 2] = rgb[2];
    img.data[i + 3] = data[i];
  }
  out.ctx.putImageData(img, 0, 0);
  return out.canvas;
}

/** A repeating tile of plain cloth, for the back board, the spine and the turn-ins. */
export function clothTile() {
  const size = 256;
  const field = weave(size, size, 8, 11);
  const normal = makeCanvas(size, size);
  normal.ctx.putImageData(normalsFrom(field, size, size, 0.9), 0, 0);
  const tex = texture(normal.canvas, false);
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  return tex;
}

/** The page block's edges: leaves stacked, a hairline each. */
export function edgeTexture() {
  const { canvas, ctx } = makeCanvas(64, 256);
  ctx.fillStyle = "#f7f7f3";
  ctx.fillRect(0, 0, 64, 256);
  const rand = random(3);
  for (let y = 0; y < 256; y += 2) {
    ctx.fillStyle = `rgba(23, 33, 27, ${0.07 + rand() * 0.16})`;
    ctx.fillRect(0, y, 64, 1);
  }
  const tex = texture(canvas, true);
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  return tex;
}

/**
 * A soft footprint under the book where it meets the page: the book's own
 * outline, inset a little, blurred out past its edges.
 */
export function contactTexture() {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 256, 256);
  ctx.filter = "blur(7px)";
  ctx.fillStyle = "#fff";
  ctx.fillRect(24, 30, 208, 196);
  return texture(canvas, false);
}

export type LeftPage = {
  index: string;
  /** The stage in the chosen category's own words. */
  name: string;
  runningHead: string;
  caption: string;
};

/**
 * A left-hand page: the running head and the figure caption in mono small
 * print by the gutter, and the stage's numeral in Bricolage 800, Bottle,
 * over the copy column the page's own HTML sets below it.
 */
export function leftPage(fonts: Fonts, page: LeftPage, width: number) {
  const height = Math.round((width * PAGE.h) / PAGE.w);
  const s = width / PAGE.w;
  const { canvas, ctx } = makeCanvas(width, height);
  const X = (x: number) => (x + PAGE.w) * s;
  const Z = (z: number) => (z + PAGE.h / 2) * s;
  ctx.fillStyle = CSS.page;
  ctx.fillRect(0, 0, width, height);

  const numeralSize = (NUMERAL.cap / 0.66) * s;
  ctx.font = `800 ${numeralSize}px ${fonts.display}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = CSS.bottle;
  const baseline = Z(NUMERAL.z + NUMERAL.cap);
  ctx.fillText(page.index, X(NUMERAL.x) - 0.05 * numeralSize, baseline);
  const numeralWidth = ctx.measureText(page.index).width;

  void numeralWidth;
  const mono = (size: number) => {
    ctx.font = `400 ${size * s}px ${fonts.mono}`;
    ctx.fillStyle = CSS.inkMuted;
  };
  // The running head by the gutter: the job.
  mono(0.16);
  tracked(
    ctx,
    page.runningHead.toUpperCase(),
    X(-0.8),
    Z(-4.48),
    0.16 * 0.16 * s,
    "right",
  );
  tracked(
    ctx,
    page.caption.toUpperCase(),
    X(-0.8),
    Z(4.66),
    0.16 * 0.16 * s,
    "right",
  );
  return texture(canvas, true);
}

/** A right-hand page: a real screen tipped in, a printed margin round it. */
export function rightPage(image: CanvasImageSource, width: number) {
  const height = Math.round((width * PAGE.h) / PAGE.w);
  const { canvas, ctx } = makeCanvas(width, height);
  ctx.fillStyle = CSS.page;
  ctx.fillRect(0, 0, width, height);
  const mx = width * PLATE_MARGIN;
  const my = height * PLATE_MARGIN;
  ctx.drawImage(image, mx, my, width - mx * 2, height - my * 2);
  ctx.strokeStyle = CSS.border;
  ctx.lineWidth = Math.max(1, width / 1024);
  ctx.strokeRect(mx, my, width - mx * 2, height - my * 2);
  return texture(canvas, true);
}

/** A plain leaf, front or back, for the riffle and the endpapers. */
export function blankPage(width: number, colour: string = CSS.page) {
  const height = Math.round((width * PAGE.h) / PAGE.w);
  const { canvas, ctx } = makeCanvas(width, height);
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, width, height);
  return texture(canvas, true);
}

/**
 * A spine for the season's pile: Bottle cloth with the job foil-stamped in
 * On dark and its date in mono small print.
 */
export function spineLabel(
  fonts: Fonts,
  title: string,
  date: string,
  cloth: string,
  ink: string,
  aspect: number,
) {
  // The canvas takes the spine's own shape, so nothing stretches.
  const height = 128;
  const width = Math.round(height * aspect);
  const { canvas, ctx } = makeCanvas(width, height);
  ctx.fillStyle = cloth;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = ink;
  ctx.textBaseline = "middle";
  ctx.font = `400 ${height * 0.2}px ${fonts.mono}`;
  ctx.globalAlpha = 0.72;
  const dateWidth = tracked(
    ctx,
    date.toUpperCase(),
    width - height * 0.5,
    height * 0.53,
    height * 0.03,
    "right",
  );
  ctx.globalAlpha = 1;
  const room = width - height * 1.4 - dateWidth;
  ctx.font = `800 100px ${fonts.display}`;
  const at100 = ctx.measureText(title).width;
  const size = Math.min(height * 0.5, (room / at100) * 100);
  ctx.font = `800 ${size}px ${fonts.display}`;
  ctx.fillText(title, height * 0.5, height * 0.55);
  return texture(canvas, true);
}

function texture(canvas: HTMLCanvasElement, colour: boolean) {
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = colour ? SRGBColorSpace : NoColorSpace;
  tex.minFilter = LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 8;
  return tex;
}

function swap(tex: CanvasTexture, canvas: HTMLCanvasElement) {
  tex.image = canvas;
  tex.needsUpdate = true;
}

/** Decode an image off the main thread where the browser can. */
export async function loadImage(url: string): Promise<CanvasImageSource> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  const blob = await response.blob();
  if ("createImageBitmap" in window) return createImageBitmap(blob);
  const img = new Image();
  img.src = URL.createObjectURL(blob);
  await img.decode();
  return img;
}
