/**
 * The book's colours, from docs/brand.md. Hex values only: three.js reads a
 * hex as sRGB and converts it into its linear working space, and the
 * renderer writes sRGB back out with no tone mapping, so a flat surface lit
 * to exactly π (see engine.ts) leaves the GPU as the hex it went in as.
 *
 * `CSS` is the same set for the canvas textures, which are drawn in sRGB.
 */

export const HEX = {
  bottle: 0x0b4030,
  bottleDeep: 0x083023,
  bottleInk: 0x052117,
  sprout: 0x9fe870,
  page: 0xffffff,
  panel: 0xf5f6f2,
  panelHover: 0xedeee9,
  line: 0xefefec,
  track: 0xddded8,
  ink: 0x17211b,
  onDark: 0xf4f4f0,
} as const;

export const CSS = {
  bottle: "#0b4030",
  bottleDeep: "#083023",
  bottleInk: "#052117",
  sprout: "#9fe870",
  page: "#ffffff",
  panel: "#f5f6f2",
  panelHover: "#edeee9",
  line: "#efefec",
  track: "#ddded8",
  ink: "#17211b",
  inkSecondary: "#57574f",
  inkMuted: "#61615a",
  onDark: "#f4f4f0",
  border: "rgba(23, 33, 27, 0.12)",
} as const;
