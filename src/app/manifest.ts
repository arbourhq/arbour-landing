import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

/**
 * Served at /manifest.webmanifest and linked from every page. The icons are
 * the existing file-convention icons in this folder, at their stable paths
 * (the hashed query Next adds to the <link> tags is optional). Bottle for the
 * browser chrome, white for the splash: Cream is retired from the site.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arbour",
    short_name: "Arbour",
    description: SITE.description,
    start_url: "/",
    display: "browser",
    theme_color: "#0B4030",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon1.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
