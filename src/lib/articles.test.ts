import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sitemap from "@/app/sitemap";
import { ArticleText } from "@/components/articles/article-text";
import { SiteFooter } from "@/components/site-footer";
import {
  ARTICLE_AUTHOR,
  ARTICLE_CATEGORIES,
  ARTICLE_RELATED_SLUGS,
  ARTICLES,
} from "@/content/articles";
import { NAV_LINKS } from "@/content/site";
import {
  articleImage,
  articleMetadata,
  articleReadingMinutes,
  articleStructuredData,
  articleWordCount,
  articlesStructuredData,
  formatArticleDate,
  getArticle,
  getArticleVisuals,
  getRelatedArticles,
} from "@/lib/articles";
import { siteUrl } from "@/lib/seo";

function renderText(text: string): string {
  return renderToStaticMarkup(createElement(ArticleText, { text }));
}

describe("article catalogue", () => {
  test("publishes every authored article once with distinct search copy", () => {
    const files = readdirSync(join(process.cwd(), "src/content/articles"))
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""));

    expect(ARTICLES).toHaveLength(20);
    expect(new Set(ARTICLES.map((article) => article.slug)).size).toBe(20);
    expect(new Set(ARTICLES.map((article) => article.title)).size).toBe(20);
    expect(new Set(ARTICLES.map((article) => article.description)).size).toBe(
      20,
    );
    expect(ARTICLES.map((article) => article.slug).toSorted()).toEqual(
      files.toSorted(),
    );
  });

  for (const article of ARTICLES) {
    test(`${article.slug} has valid editorial fields and working references`, () => {
      expect(article.author).toBe(ARTICLE_AUTHOR);
      expect(article.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(ARTICLE_CATEGORIES.map((category) => category.name)).toContain(
        article.category,
      );
      for (const date of [article.publishedAt, article.updatedAt]) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(new Date(date).toISOString().slice(0, 10)).toBe(date);
      }
      expect(article.updatedAt >= article.publishedAt).toBe(true);
      expect(new Set(article.sections.map((section) => section.id)).size).toBe(
        article.sections.length,
      );
      for (const section of article.sections) {
        expect(section.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      }

      const body = [
        ...article.intro,
        ...article.sections.flatMap((section) => [
          ...section.paragraphs,
          ...(section.bullets ?? []),
        ]),
      ].join(" ");
      const sourceIds = article.sources.map((source) => source.id);
      expect(new Set(sourceIds).size).toBe(sourceIds.length);
      expect(sourceIds.length).toBeGreaterThanOrEqual(3);
      for (const citation of body.matchAll(/\[(\d+)\]/g)) {
        expect(sourceIds).toContain(Number(citation[1]));
      }
      for (const source of article.sources) {
        expect(new URL(source.url).protocol).toBe("https:");
        expect(body).toContain(`[${source.id}]`);
      }
      for (const link of body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        const url = new URL(link[1], siteUrl("/"));
        expect(url.protocol).toBe("https:");
        if (url.origin === new URL(siteUrl("/")).origin) {
          const page = url.pathname.replace(/^\//, "");
          const articleSlug = /^articles\/(.+)$/.exec(page)?.[1];
          expect(
            articleSlug
              ? getArticle(articleSlug) !== undefined
              : existsSync(join(process.cwd(), "src/app", page, "page.tsx")),
          ).toBe(true);
        }
      }
      expect(JSON.stringify(article)).not.toMatch(
        /[\u2013\u2014\u2018\u2019\u201c\u201d]/,
      );
      expect(articleWordCount(article)).toBeGreaterThanOrEqual(650);
      expect(articleReadingMinutes(article)).toBeGreaterThan(0);
    });
  }

  test("unknown slugs cannot silently render another article", () => {
    expect(getArticle("missing-article")).toBeUndefined();
    expect(getArticle("toString")).toBeUndefined();
  });

  test("related reading connects each article to valid next topics and gives every article an inbound link", () => {
    expect(Object.keys(ARTICLE_RELATED_SLUGS).toSorted()).toEqual(
      ARTICLES.map((article) => article.slug).toSorted(),
    );
    const inbound = new Set<string>();
    for (const article of ARTICLES) {
      const slugs = ARTICLE_RELATED_SLUGS[article.slug];
      expect(slugs).toHaveLength(3);
      expect(new Set(slugs).size).toBe(3);
      expect(slugs).not.toContain(article.slug);
      for (const slug of slugs) {
        expect(getArticle(slug)).toBeDefined();
        inbound.add(slug);
      }
      expect(getRelatedArticles(article)).toHaveLength(3);
    }
    expect([...inbound].toSorted()).toEqual(
      ARTICLES.map((article) => article.slug).toSorted(),
    );
  });

  test("related reading helps readers move between product evaluation and practical workflows", () => {
    const comparison = getArticle("arbour-vs-studio-ninja");
    const buyingGuide = getArticle("how-to-choose-wedding-crm");
    if (!comparison || !buyingGuide) throw new Error("Missing buying articles");
    const comparisonLinks = getRelatedArticles(comparison).map(
      (entry) => entry.slug,
    );
    expect(comparisonLinks).toContain("wedding-photography-crm-workflow");
    expect(comparisonLinks).toContain(
      "move-wedding-business-from-spreadsheets",
    );
    expect(
      getRelatedArticles(buyingGuide).every(
        (entry) => entry.category === "Software comparisons",
      ),
    ).toBe(true);
  });

  test("larger related lists preserve editorial choices and fill with distinct category matches", () => {
    const article = ARTICLES[0];
    const preferred = getRelatedArticles(article);
    const extended = getRelatedArticles(article, 5);
    expect(extended).toHaveLength(5);
    expect(extended.slice(0, 3)).toEqual(preferred);
    expect(extended[3].category).toBe(article.category);
    expect(extended.some((entry) => entry.slug === article.slug)).toBe(false);
    expect(new Set(extended.map((entry) => entry.slug)).size).toBe(5);
    expect(getRelatedArticles(article, 0)).toEqual([]);
    expect(getRelatedArticles(article, 50)).toHaveLength(ARTICLES.length - 1);
  });
});

describe("article search metadata", () => {
  const article = ARTICLES[0];
  const url = siteUrl(`/articles/${article.slug}`);

  test("canonical, social previews and author match the rendered article", () => {
    const metadata = articleMetadata(article);
    expect(metadata.alternates?.canonical).toBe(url);
    expect(metadata.openGraph).toMatchObject({
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [ARTICLE_AUTHOR],
      images: [
        {
          url: siteUrl(articleImage(article)),
          alt: getArticleVisuals(article).cover.alt,
          width: getArticleVisuals(article).cover.width,
          height: getArticleVisuals(article).cover.height,
        },
      ],
    });
    expect(metadata.twitter?.images).toEqual([
      expect.objectContaining({ url: siteUrl(articleImage(article)) }),
    ]);
    expect(metadata.authors).toEqual([
      { name: ARTICLE_AUTHOR, url: siteUrl("/articles#editorial-approach") },
    ]);
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  test("structured data describes the article, publisher and breadcrumb path", () => {
    expect(articleStructuredData(article)).toMatchObject({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          url,
          headline: article.title,
          image: expect.arrayContaining([siteUrl(articleImage(article))]),
          author: { name: ARTICLE_AUTHOR },
          publisher: { "@id": siteUrl("/#organization") },
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          wordCount: articleWordCount(article),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { position: 1, item: siteUrl("/") },
            { position: 2, item: siteUrl("/articles") },
            { position: 3, item: url },
          ],
        },
      ],
    });
  });

  test("the collection exposes all article URLs to crawlers", () => {
    const collection = articlesStructuredData()["@graph"][0];
    expect(collection).toMatchObject({
      "@type": "CollectionPage",
      url: siteUrl("/articles"),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: 20,
        itemListElement: ARTICLES.map((entry, index) => ({
          position: index + 1,
          url: siteUrl(`/articles/${entry.slug}`),
        })),
      },
    });
  });

  test("dates use the Australian reading format", () => {
    expect(formatArticleDate("2026-10-28")).toBe("28 October 2026");
  });
});

describe("article integration", () => {
  test("every article uses an approved genuine cover with provenance", () => {
    for (const article of ARTICLES) {
      const imagePath = articleImage(article);
      expect(imagePath).toMatch(/^\/(?:product\/|images\/articles-stock\/)/);
      const file = readFileSync(join(process.cwd(), "public", imagePath));
      expect(file.subarray(0, 4).toString()).toBe("RIFF");
      expect(file.subarray(8, 12).toString()).toBe("WEBP");
      expect(
        existsSync(join(process.cwd(), "public", `${imagePath}.json`)),
      ).toBe(true);
      expect(imagePath).toBe(getArticleVisuals(article).cover.src);
    }
  });

  test("the sitemap includes the index and each article's canonical URL and revision date", () => {
    const entries = sitemap();
    expect(
      entries.filter((entry) => entry.url === siteUrl("/articles")),
    ).toHaveLength(1);
    for (const article of ARTICLES) {
      const matching = entries.filter(
        (entry) => entry.url === siteUrl(`/articles/${article.slug}`),
      );
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject({
        lastModified: article.updatedAt,
        images: [siteUrl(articleImage(article))],
      });
    }
  });

  test("articles remain discoverable through the footer without entering main navigation", () => {
    expect(NAV_LINKS.some((link) => link.href.startsWith("/articles"))).toBe(
      false,
    );
    const footer = renderToStaticMarkup(createElement(SiteFooter));
    expect(footer).toMatch(/<a\b[^>]*href="\/articles"[^>]*>Articles<\/a>/);
  });
});

describe("article text rendering", () => {
  test("citations link to the source list and product links remain usable", () => {
    const html = renderText(
      "The published figure has a source. [2] Compare [plans](/#pricing) and [the publisher](https://www.abs.gov.au/).",
    );
    expect(html).toContain('href="#source-2"');
    expect(html).toContain('aria-label="Source 2"');
    expect(html).toContain('href="/#pricing"');
    expect(html).toMatch(/<a\b[^>]*>plans<\/a>/);
    expect(html).toContain('href="https://www.abs.gov.au/"');
  });

  test("HTML in paragraphs and link labels stays escaped text", () => {
    const html = renderText(
      '<script>alert("x")</script> [<b>About</b>](/about)',
    );
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&lt;b&gt;About&lt;/b&gt;");
    expect(html).toContain('href="/about"');
  });

  test("javascript and protocol-relative destinations never become links", () => {
    const html = renderText(
      "[script](javascript:evil) [network](//example.com) [data](data:text/html,evil)",
    );
    expect(html).not.toContain("<a");
    expect(html).toContain("[script](javascript:evil)");
    expect(html).toContain("[network](//example.com)");
    expect(html).toContain("[data](data:text/html,evil)");
  });

  test("backslashes and control characters cannot disguise a network destination", () => {
    for (const href of [
      "/\\example.com",
      "/\t/example.com",
      "https://example.com/\npath",
    ]) {
      const html = renderText(`[unsafe](${href})`);
      expect(html).not.toContain("<a");
      expect(html).toContain("[unsafe]");
    }
  });
});
