import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { LETTER_PATHS, MARK_PATH } from "@/components/wordmark";
import { SITE } from "@/content/site";

/**
 * The card a shared link gets, in the site's register: a Bottle card (Bottle
 * with a white mark is a valid ground for the wordmark), the sheet's two
 * column rules and a row rule with its registration marks, the tagline in
 * Bricolage 800, and the one true status line with a Sprout leaf. Nothing
 * here claims a customer.
 *
 * The wordmark is the kit's outlines rendered as an SVG image, so the A keeps
 * its flat top. Bricolage ships with the route as a WOFF (satori reads ttf,
 * otf and woff, not woff2), so the card never depends on a network fetch at
 * build time. It is the Google Fonts file next/font serves; OFL licensed.
 */

export const alt = `Arbour. ${SITE.tagline}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BOTTLE = "#0B4030";
const ON_DARK = "#F4F4F0";
const SPROUT = "#9FE870";
const RULE = "rgba(244, 244, 240, 0.16)";
const MARK = "rgba(244, 244, 240, 0.5)";

const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -674 4014 688"><g fill="#ffffff"><path d="${MARK_PATH}"/>${LETTER_PATHS.map((d) => `<path d="${d}"/>`).join("")}</g></svg>`;

/** A registration mark centred on (x, y). */
function Plus({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 6,
        top: y - 6,
        width: 13,
        height: 13,
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 6,
          top: 0,
          width: 1,
          height: 13,
          background: MARK,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 6,
          width: 13,
          height: 1,
          background: MARK,
        }}
      />
    </div>
  );
}

export default async function Image() {
  const font = await readFile(
    join(process.cwd(), "src/app/fonts/bricolage-grotesque-800.woff"),
  );
  const wordmarkSrc = `data:image/svg+xml;base64,${Buffer.from(wordmarkSvg).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: BOTTLE,
        color: ON_DARK,
        fontFamily: "Bricolage Grotesque",
        fontWeight: 800,
      }}
    >
      {/* The column rules and the foot row's rule. */}
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 0,
          width: 1,
          height: 630,
          background: RULE,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1136,
          top: 0,
          width: 1,
          height: 630,
          background: RULE,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 510,
          width: 1200,
          height: 1,
          background: RULE,
        }}
      />
      <Plus x={64} y={510} />
      <Plus x={1136} y={510} />

      <div
        style={{
          position: "absolute",
          left: 112,
          top: 72,
          right: 112,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Satori draws a plain img; next/image has no part in a PNG render. */}
        {/* oxlint-disable-next-line next/no-img-element -- see above */}
        <img src={wordmarkSrc} alt="" width={330} height={57} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 64,
            fontSize: 124,
            lineHeight: 0.9,
          }}
        >
          <span>Wedding</span>
          <span>Industry CRM.</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 510,
          height: 120,
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 28,
        }}
      >
        <span
          style={{
            display: "block",
            width: 14,
            height: 14,
            borderRadius: 3,
            background: SPROUT,
          }}
        />
        <span>Open. 14 days free, no card.</span>
        <span style={{ marginLeft: "auto", color: SPROUT }}>usearbour.com</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: font,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
