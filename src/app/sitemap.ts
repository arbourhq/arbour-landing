import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/wedding-crm-australia",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: siteUrl(path) }));
}
