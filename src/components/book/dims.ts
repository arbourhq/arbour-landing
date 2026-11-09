/**
 * The book's measurements, in world units. A page is 16 by 10, the shape of
 * a console capture (16:10), so a screen tipped in on a right-hand page
 * fills it but for a printed margin. The spine runs along z at x = 0: right
 * pages lie over x 0 to 16, left pages over x -16 to 0, and the head of
 * every page is at z = -5 (the far edge, the top of the screen when the
 * camera looks straight down).
 */

export const PAGE = { w: 16, h: 10 } as const;

/** The boards stand proud of the pages by `square` on three sides. */
export const BOARD = { t: 0.16, square: 0.22 } as const;

/** The whole page block, both halves together. */
export const BLOCK = 1.05;

/** The printed margin round a screen, as a share of the page. */
export const PLATE_MARGIN = 0.03;

/** The screen's box on a right-hand page, in page units from the spine. */
export const PLATE = {
  x0: PAGE.w * PLATE_MARGIN,
  x1: PAGE.w * (1 - PLATE_MARGIN),
  z0: -PAGE.h / 2 + PAGE.h * PLATE_MARGIN,
  z1: PAGE.h / 2 - PAGE.h * PLATE_MARGIN,
} as const;

/** Where the chapter numeral is printed on a left-hand page. */
export const NUMERAL = {
  /** Its left edge, measured from the spine (negative is leftward). */
  x: -7.2,
  /** Its top edge and its cap height. */
  z: -4.35,
  cap: 1.45,
} as const;

/** Where the copy column sits on a left-hand page, from the spine. */
export const COPY = {
  x0: -7.2,
  x1: -0.8,
  z0: -2.5,
  z1: 4.45,
} as const;

/** How much of the block each half holds at the first and last spreads. */
export const LEFT_SHARE = { first: 0.14, last: 0.86 } as const;

/** Five stages, one spread each. */
export const SPREADS = 5;
