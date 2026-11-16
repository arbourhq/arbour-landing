import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";
// Vercel's comment toolbar is injected into preview deployments only.
const preview = process.env.VERCEL_ENV === "preview";
const VERCEL_LIVE = "https://vercel.live";

/**
 * Every origin a page loads from. Pages are prerendered, so Next's inline
 * bootstrap scripts carry no nonce and script-src needs 'unsafe-inline' (a
 * nonce would make every page dynamic). The host list is what limits it.
 *
 * - Vercel Analytics: same origin (/_vercel/insights) in production; the dev
 *   build loads a debug script from va.vercel-scripts.com instead.
 * - Meta Pixel (components/meta-pixel.tsx): fbevents.js and its config from
 *   connect.facebook.net, events to www.facebook.com/tr. A Conversions API
 *   Gateway must not be attached to the pixel (the server sends conversions
 *   itself), so no gateway origin is allowed here: the console's policy
 *   blocks them too.
 * - Reddit Pixel (components/reddit-pixel.tsx): pixel.js from
 *   www.redditstatic.com, config from pixel-config.reddit.com, events to
 *   alb.reddit.com.
 * - Arby Help and the contact form post to this origin's /api routes.
 * - Fonts are self-hosted by next/font; images and recordings are local, and
 *   a CSS mask is a data: URI.
 */
const metaPixel = ["https://connect.facebook.net", "https://www.facebook.com"];
const redditPixel = [
  "https://www.redditstatic.com",
  "https://pixel-config.reddit.com",
  "https://alb.reddit.com",
];

const csp = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    ...(dev ? ["'unsafe-eval'", "https://va.vercel-scripts.com"] : []),
    "https://connect.facebook.net",
    "https://www.redditstatic.com",
    ...(preview ? [VERCEL_LIVE] : []),
  ],
  "style-src": ["'self'", "'unsafe-inline'", ...(preview ? [VERCEL_LIVE] : [])],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://www.facebook.com",
    "https://alb.reddit.com",
    ...(preview ? [VERCEL_LIVE, "https://vercel.com"] : []),
  ],
  "font-src": ["'self'", ...(preview ? [VERCEL_LIVE] : [])],
  "connect-src": [
    "'self'",
    ...metaPixel,
    ...redditPixel,
    ...(dev ? ["ws:", "https://va.vercel-scripts.com"] : []),
    ...(preview ? [VERCEL_LIVE, "wss://ws-us3.pusher.com"] : []),
  ],
  "media-src": ["'self'"],
  "frame-src": preview ? [VERCEL_LIVE] : ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  ...(dev ? {} : { "upgrade-insecure-requests": [] }),
} satisfies Record<string, string[]>;

const contentSecurityPolicy = Object.entries(csp)
  .map(([directive, sources]) => [directive, ...sources].join(" "))
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(self), bluetooth=(), browsing-topics=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), hid=(), magnetometer=(), microphone=(), payment=(), serial=(), usb=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  // Vercel's CDN adds `Access-Control-Allow-Origin: *` to prerendered pages.
  // Nothing on another origin needs to read this site's responses, so name
  // the canonical host instead. Check with `curl -sI` after a deploy: if `*`
  // is still there, the platform is adding it after this config.
  { key: "Access-Control-Allow-Origin", value: "https://www.usearbour.com" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
