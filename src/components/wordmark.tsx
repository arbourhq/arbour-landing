/**
 * FIXED. Do not redesign.
 *
 * The wordmark (docs/brand.md §4): an open "A" with no crossbar, then RBOUR in
 * Bricolage Grotesque 800 at +0.04em. These are the console kit's outlines
 * (arbour/packages/ui/src/components/wordmark.svg), copied verbatim, so the
 * mark on the site is the same drawing as the mark in the app: never live
 * type, never re-traced, never a fallback face while the webfont loads.
 *
 * The A's apex is flat and only its feet are round; in these outlines the
 * flat is drawn into the path itself, so no viewBox cut is needed here.
 * Its grid is 1000 units to the em with the baseline at y=0, so the lockup
 * is 4.014em by 0.688em and the mark alone 0.7em by 0.66em.
 *
 * Valid grounds on screens: white with a Bottle mark, Bottle with a white
 * mark. Never on a photograph, never outlined.
 */

/** The open A: cap height (660) tall, sitting on the baseline. */
export const MARK_PATH =
  "M7.92 -116.54 L266.77 -660 L433.31 -660 L692.16 -116.54 A81.5 81.5 0 0 1 545 -46.45 L350.04 -455.78 L155.08 -46.45 A81.5 81.5 0 0 1 7.92 -116.54 Z";

/** RBOUR, one path per letter, starting at x=780. */
export const LETTER_PATHS = [
  "M780.1 0V-660H1054.1Q1098.1 -660 1137.6 -652.5Q1177.1 -645 1209.6 -630Q1242.1 -615 1266.1 -592Q1290.1 -569 1303.1 -537.5Q1316.1 -506 1316.1 -466Q1316.1 -435 1305.6 -407.5Q1295.1 -380 1272.6 -358Q1250.1 -336 1214.6 -321.5Q1179.1 -307 1130.1 -301V-293Q1194.1 -290 1229.1 -268Q1264.1 -246 1281.6 -212.5Q1299.1 -179 1308.1 -140L1343.1 0H1164.1L1139.1 -131Q1133.1 -165 1120.6 -186Q1108.1 -207 1085.1 -217Q1062.1 -227 1024.1 -227H942.1V0ZM942.1 -352H1036.1Q1091.1 -352 1120.1 -373Q1149.1 -394 1149.1 -437Q1149.1 -484 1122.1 -507Q1095.1 -530 1040.1 -530H942.1Z",
  "M1435.1 0V-660H1701.1Q1762.1 -660 1809.6 -649Q1857.1 -638 1890.6 -616.5Q1924.1 -595 1941.6 -563Q1959.1 -531 1959.1 -488Q1959.1 -448 1942.6 -416Q1926.1 -384 1889.6 -364.5Q1853.1 -345 1794.1 -340V-331Q1895.1 -326 1940.6 -284Q1986.1 -242 1986.1 -173Q1986.1 -115 1956.1 -77Q1926.1 -39 1868.6 -19.5Q1811.1 0 1726.1 0ZM1597.1 -130H1719.1Q1770.1 -130 1798.1 -148.5Q1826.1 -167 1826.1 -201Q1826.1 -239 1794.6 -257.5Q1763.1 -276 1700.1 -276H1597.1ZM1597.1 -386H1684.1Q1741.1 -386 1771.1 -405Q1801.1 -424 1801.1 -461Q1801.1 -496 1774.1 -513.5Q1747.1 -531 1693.1 -531H1597.1Z",
  "M2371.1 14Q2301.1 14 2245.1 -8Q2189.1 -30 2150.1 -73Q2111.1 -116 2090.6 -180Q2070.1 -244 2070.1 -327Q2070.1 -445 2108.6 -521.5Q2147.1 -598 2216.6 -636Q2286.1 -674 2377.1 -674Q2447.1 -674 2502.6 -652.5Q2558.1 -631 2597.1 -588Q2636.1 -545 2656.6 -480.5Q2677.1 -416 2677.1 -331Q2677.1 -245 2655.6 -180Q2634.1 -115 2593.6 -72Q2553.1 -29 2496.6 -7.5Q2440.1 14 2371.1 14ZM2377.1 -119Q2422.1 -119 2451.6 -141.5Q2481.1 -164 2495.6 -209.5Q2510.1 -255 2510.1 -324Q2510.1 -397 2494.6 -445Q2479.1 -493 2448.6 -517.5Q2418.1 -542 2372.1 -542Q2328.1 -542 2298.1 -518.5Q2268.1 -495 2253.1 -448Q2238.1 -401 2238.1 -331Q2238.1 -278 2246.6 -238Q2255.1 -198 2272.6 -171.5Q2290.1 -145 2316.1 -132Q2342.1 -119 2377.1 -119Z",
  "M3057.1 14Q3000.1 14 2955.1 1Q2910.1 -12 2877.6 -36Q2845.1 -60 2823.6 -93.5Q2802.1 -127 2791.6 -169Q2781.1 -211 2781.1 -260V-660H2943.1V-268Q2943.1 -217 2958.1 -186.5Q2973.1 -156 2998.6 -143Q3024.1 -130 3057.1 -130Q3091.1 -130 3116.6 -143Q3142.1 -156 3157.1 -186Q3172.1 -216 3172.1 -268V-660H3334.1V-260Q3334.1 -130 3264.1 -58Q3194.1 14 3057.1 14Z",
  "M3451.1 0V-660H3725.1Q3769.1 -660 3808.6 -652.5Q3848.1 -645 3880.6 -630Q3913.1 -615 3937.1 -592Q3961.1 -569 3974.1 -537.5Q3987.1 -506 3987.1 -466Q3987.1 -435 3976.6 -407.5Q3966.1 -380 3943.6 -358Q3921.1 -336 3885.6 -321.5Q3850.1 -307 3801.1 -301V-293Q3865.1 -290 3900.1 -268Q3935.1 -246 3952.6 -212.5Q3970.1 -179 3979.1 -140L4014.1 0H3835.1L3810.1 -131Q3804.1 -165 3791.6 -186Q3779.1 -207 3756.1 -217Q3733.1 -227 3695.1 -227H3613.1V0ZM3613.1 -352H3707.1Q3762.1 -352 3791.1 -373Q3820.1 -394 3820.1 -437Q3820.1 -484 3793.1 -507Q3766.1 -530 3711.1 -530H3613.1Z",
];

type Tone = "bottle" | "white" | "current";

const FILL: Record<Tone, string> = {
  bottle: "fill-bottle",
  white: "fill-white",
  current: "fill-current",
};

/**
 * The full lockup. Sized off the font size the caller sets with a text-*
 * class, at 0.688em tall, so it sits beside type like a word. `title` names
 * it for assistive tech; pass `null` when a wrapping link already does.
 */
export function Wordmark({
  tone = "bottle",
  title = "Arbour",
  className,
}: {
  tone?: Tone;
  title?: string | null;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 -674 4014 688"
      className={`h-[0.688em] w-auto shrink-0 ${FILL[tone]} ${className ?? ""}`}
      {...(title ? { role: "img" } : { "aria-hidden": true })}
    >
      {title ? <title>{title}</title> : null}
      <path d={MARK_PATH} />
      {LETTER_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** The open A on its own, for places the lockup will not fit. Decorative. */
export function Mark({
  tone = "current",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 -660 700 660"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${FILL[tone]} ${className ?? ""}`}
    >
      <path d={MARK_PATH} />
    </svg>
  );
}
