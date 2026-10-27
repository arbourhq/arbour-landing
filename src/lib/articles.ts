import type { Metadata } from "next";
import {
  ARTICLE_AUTHOR,
  ARTICLE_INDEX,
  ARTICLE_RELATED_SLUGS,
  ARTICLES,
  type Article,
} from "@/content/articles";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { ARTICLE_VISUALS } from "@/content/article-visuals";

export function getArticleVisuals(article: Article) {
  const visuals = ARTICLE_VISUALS[article.slug];
  if (!visuals) throw new Error(`Missing visuals for article: ${article.slug}`);
  return visuals;
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const preferredSlugs = ARTICLE_RELATED_SLUGS[article.slug] ?? [];
  const preferred = preferredSlugs.flatMap((slug) => {
    const related = getArticle(slug);
    return related ? [related] : [];
  });
  const others = ARTICLES.filter(
    (entry) =>
      entry.slug !== article.slug && !preferredSlugs.includes(entry.slug),
  );
  return [
    ...preferred,
    ...others.filter((entry) => entry.category === article.category),
    ...others.filter((entry) => entry.category !== article.category),
  ].slice(0, Math.max(0, limit));
}

export function articleImage(article: Article): string {
  return getArticleVisuals(article).cover.src;
}

export function articleText(article: Article): string {
  const visuals = getArticleVisuals(article);
  const figureText = visuals.figures.flatMap((figure) => {
    const labels = [figure.title, figure.caption];
    if (figure.kind === "steps")
      return [
        ...labels,
        ...figure.items.flatMap((item) => [item.label, item.detail]),
      ];
    if (figure.kind === "table")
      return [...labels, ...figure.columns, ...figure.rows.flat()];
    if (figure.kind === "bars")
      return [
        ...labels,
        ...figure.items.flatMap((item) => [item.label, item.displayValue]),
      ];
    return labels;
  });
  return [
    ...visuals.takeaways,
    ...article.intro,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    ...figureText,
  ]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\d+\]/g, "");
}

export function articleWordCount(article: Article): number {
  return articleText(article).trim().split(/\s+/).length;
}

export function articleReadingMinutes(article: Article): number {
  return Math.max(1, Math.ceil(articleWordCount(article) / 200));
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function articleMetadata(article: Article): Metadata {
  const cover = getArticleVisuals(article).cover;
  const metadata = pageMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
  });
  const image = {
    url: siteUrl(articleImage(article)),
    width: cover.width,
    height: cover.height,
    alt: cover.alt,
  };

  return {
    ...metadata,
    authors: [
      { name: ARTICLE_AUTHOR, url: siteUrl("/articles#editorial-approach") },
    ],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [ARTICLE_AUTHOR],
      section: article.category,
      images: [image],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      images: [image],
    },
  };
}

export function articleStructuredData(article: Article) {
  const url = siteUrl(`/articles/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: article.title,
        description: article.description,
        image: [
          ...new Set([
            articleImage(article),
            ...getArticleVisuals(article).figures.flatMap((figure) =>
              figure.kind === "screenshot" ? [figure.image.src] : [],
            ),
          ]),
        ].map(siteUrl),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          "@type": "Organization",
          name: ARTICLE_AUTHOR,
          url: siteUrl("/articles#editorial-approach"),
        },
        publisher: { "@id": siteUrl("/#organization") },
        isPartOf: { "@id": siteUrl("/articles#collection") },
        articleSection: article.category,
        inLanguage: "en-AU",
        wordCount: articleWordCount(article),
        citation: article.sources.map((source) => ({
          "@type": "CreativeWork",
          name: source.title,
          url: source.url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: siteUrl("/articles"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function articlesStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": siteUrl("/articles#collection"),
        url: siteUrl("/articles"),
        name: ARTICLE_INDEX.title,
        description: ARTICLE_INDEX.description,
        inLanguage: "en-AU",
        isPartOf: { "@id": siteUrl("/#website") },
        publisher: { "@id": siteUrl("/#organization") },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: ARTICLES.length,
          itemListElement: ARTICLES.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article.title,
            url: siteUrl(`/articles/${article.slug}`),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": siteUrl("/articles#breadcrumbs"),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: siteUrl("/articles"),
          },
        ],
      },
    ],
  };
}
