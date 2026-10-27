import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";
import { articleImage } from "@/lib/articles";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/wedding-crm-australia",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: siteUrl(path) }));

  return [
    ...pages,
    { url: siteUrl("/articles") },
    ...ARTICLES.map((article) => ({
      url: siteUrl(`/articles/${article.slug}`),
      lastModified: article.updatedAt,
      images: [siteUrl(articleImage(article))],
    })),
  ];
}
