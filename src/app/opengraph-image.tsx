import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/content/site";

/**
 * The card a shared link gets. Bottle ground, the Acid wordmark artwork (the
 * same PNG the site renders, so the A keeps its flat top), the tagline in
 * Bricolage 800, and the one true status line. Nothing here claims a customer.
 *
 * Bricolage ships with the route as a WOFF (satori reads ttf, otf and woff,
 * not woff2, and refuses to lay out with no font at all), so the card never
 * depends on a network fetch at build time. It is the same Google Fonts file
 * next/font serves the site; OFL licensed.
 */

export const alt = `Arbour. ${SITE.tagline}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [font, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/bricolage-grotesque-800.woff")),
    readFile(join(process.cwd(), "public/arbour-wordmark-acid.png")),
  ]);
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0B4030",
        color: "#C6FF3D",
        fontFamily: "Bricolage",
        fontWeight: 800,
      }}
    >
      {/* Satori draws a plain img; next/image has no part in a PNG render. */}
      {/* oxlint-disable-next-line next/no-img-element -- see above */}
      <img src={wordmarkSrc} alt="" width={360} height={62} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 132,
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
        }}
      >
        <span>Wedding</span>
        <span>Industry OS.</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 26,
          letterSpacing: "-0.01em",
          color: "#FFFBEF",
        }}
      >
        <span
          style={{
            display: "block",
            width: 22,
            height: 22,
            background: "#C6FF3D",
          }}
        />
        <span>In build. Waitlist open.</span>
        <span style={{ color: "#C6FF3D" }}>usearbour.com</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }],
    },
  );
}
