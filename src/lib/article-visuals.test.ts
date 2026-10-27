import { describe, expect, test } from "bun:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleFigure } from "@/components/articles/article-figure";
import { ARTICLES } from "@/content/articles";
import { ARTICLE_VISUALS } from "@/content/article-visuals";
import type {
  ArticleFigure as Figure,
  ArticleImage,
} from "@/content/article-visuals/types";
import { articleStructuredData, getArticleVisuals } from "@/lib/articles";
import { siteUrl } from "@/lib/seo";

function webpDimensions(file: Buffer): { width: number; height: number } {
  for (let offset = 12; offset + 8 <= file.length;) {
    const kind = file.subarray(offset, offset + 4).toString();
    const size = file.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (kind === "VP8X") {
      return {
        width: file.readUIntLE(data + 4, 3) + 1,
        height: file.readUIntLE(data + 7, 3) + 1,
      };
    }
    if (kind === "VP8L") {
      const bits = file.readUInt32LE(data + 1);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }
    if (kind === "VP8 ") {
      return {
        width: file.readUInt16LE(data + 6) & 0x3fff,
        height: file.readUInt16LE(data + 8) & 0x3fff,
      };
    }
    offset = data + size + (size % 2);
  }
  throw new Error("WebP has no supported dimension header");
}

function figureText(figure: Figure): string[] {
  const common = [figure.title, figure.caption];
  switch (figure.kind) {
    case "screenshot":
      return [...common, figure.image.alt];
    case "steps":
      return [
        ...common,
        ...figure.items.flatMap((item) => [item.label, item.detail]),
      ];
    case "table":
      return [...common, ...figure.columns, ...figure.rows.flat()];
    case "bars":
      return [
        ...common,
        ...figure.items.flatMap((item) => [item.label, item.displayValue]),
      ];
  }
}

function renderFigure(figure: Figure): string {
  return renderToStaticMarkup(createElement(ArticleFigure, { figure }));
}

describe("article visual content", () => {
  test("every article has its own useful visual plan", () => {
    expect(Object.keys(ARTICLE_VISUALS).toSorted()).toEqual(
      ARTICLES.map((article) => article.slug).toSorted(),
    );
    for (const article of ARTICLES) {
      const visuals = getArticleVisuals(article);
      expect(visuals.takeaways.length).toBeGreaterThanOrEqual(2);
      expect(visuals.takeaways.length).toBeLessThanOrEqual(4);
      expect(new Set(visuals.takeaways).size).toBe(visuals.takeaways.length);
      expect(visuals.figures).toHaveLength(3);
      expect(
        visuals.figures.some((figure) => figure.kind === "screenshot"),
      ).toBe(true);
      expect(
        visuals.figures.some((figure) => figure.kind !== "screenshot"),
      ).toBe(true);
      const sectionIds = article.sections.map((section) => section.id);
      const sourceIds = article.sources.map((source) => source.id);
      for (const figure of visuals.figures) {
        expect(sectionIds).toContain(figure.afterSection);
        expect(figure.title.trim().length).toBeGreaterThan(5);
        expect(figure.caption.trim().length).toBeGreaterThan(15);
        if (figure.kind === "table") {
          expect(figure.columns.length).toBeGreaterThanOrEqual(2);
          expect(figure.rows.length).toBeGreaterThanOrEqual(2);
          expect(
            figure.rows.every((row) => row.length === figure.columns.length),
          ).toBe(true);
        }
        if (figure.kind === "steps") {
          expect(figure.items.length).toBeGreaterThanOrEqual(2);
          expect(
            figure.items.every(
              (item) => item.label.trim() && item.detail.trim(),
            ),
          ).toBe(true);
        }
        if (figure.kind === "bars") {
          expect(sourceIds).toContain(figure.sourceId);
          expect(
            figure.items.every(
              (item) =>
                Number.isFinite(item.value) &&
                item.value >= 0 &&
                item.displayValue.trim(),
            ),
          ).toBe(true);
        }
        if (figure.kind === "screenshot") {
          expect(figure.caption).toMatch(/seed|test workspace|demonstration/i);
          expect(figure.image.kind).toBe("product");
        }
      }
      const visibleText = [
        ...visuals.takeaways,
        ...visuals.figures.flatMap(figureText),
      ].join(" ");
      expect(visibleText).not.toMatch(/[\u2013\u2014\u2018\u2019\u201c\u201d]/);
      for (const citation of visibleText.matchAll(/\[(\d+)\]/g)) {
        expect(sourceIds).toContain(Number(citation[1]));
      }
    }
  });

  test("all images are genuine local assets with accurate dimensions and source records", () => {
    const images = new Map<string, ArticleImage>();
    for (const visuals of Object.values(ARTICLE_VISUALS)) {
      images.set(visuals.cover.src, visuals.cover);
      for (const figure of visuals.figures) {
        if (figure.kind === "screenshot")
          images.set(figure.image.src, figure.image);
      }
    }
    for (const image of images.values()) {
      expect(image.src).toMatch(/^\/(?:product\/|images\/articles-stock\/)/);
      expect(image.alt.trim().length).toBeGreaterThan(15);
      const path = join(process.cwd(), "public", image.src);
      const file = readFileSync(path);
      expect(file.subarray(0, 4).toString()).toBe("RIFF");
      expect(file.subarray(8, 12).toString()).toBe("WEBP");
      expect(webpDimensions(file)).toEqual({
        width: image.width,
        height: image.height,
      });
      const provenance: unknown = JSON.parse(
        readFileSync(`${path}.json`, "utf8"),
      );
      expect(provenance).toMatchObject({
        prompt: expect.stringMatching(
          /real|genuine|capture|playwright|photograph|still frame/i,
        ),
      });
      if (image.kind === "photo") {
        expect(image.credit?.label).toBeTruthy();
        expect(new URL(image.credit?.href ?? "").protocol).toBe("https:");
        expect(provenance).toMatchObject({
          source: expect.stringMatching(/^https:\/\//),
          photographer: expect.any(String),
          license: expect.stringMatching(/^https:\/\//),
        });
      }
    }
    const retiredDirectory = join(process.cwd(), "public/images/articles");
    expect(
      existsSync(retiredDirectory) ? readdirSync(retiredDirectory).length : 0,
    ).toBe(0);
  });

  test("article schema exposes the genuine inline captures as well as its cover", () => {
    for (const article of ARTICLES) {
      const visuals = getArticleVisuals(article);
      const expected = new Set(
        [
          visuals.cover.src,
          ...visuals.figures.flatMap((figure) =>
            figure.kind === "screenshot" ? [figure.image.src] : [],
          ),
        ].map(siteUrl),
      );
      const image = articleStructuredData(article)["@graph"][0].image;
      expect(image).toEqual([...expected]);
    }
  });
});

describe("article figure semantics", () => {
  test("tables expose column headings, values and source links", () => {
    const html = renderFigure({
      kind: "table",
      afterSection: "evidence",
      title: "Compare the evidence",
      caption:
        "Registered marriages count registrations, not reception spend. [1]",
      columns: ["Measure", "Result"],
      rows: [
        ["Registered marriages", "118,804"],
        ["Reporting year", "2025"],
      ],
    });
    expect(html).toContain("<table");
    expect(html).toContain("<thead");
    expect(html).toContain("<tbody");
    expect(html).toContain('scope="col"');
    expect(html).toContain("118,804");
    expect(html).toContain('href="#source-1"');
    expect(html).toContain("<figcaption");
  });

  test("workflows retain their sequence and supporting detail without an image", () => {
    const html = renderFigure({
      kind: "steps",
      afterSection: "workflow",
      title: "Approve before purchasing",
      caption: "A planning sequence for the approved job.",
      items: [
        {
          label: "Approve the design",
          detail: "Record the agreed quantities.",
        },
        {
          label: "Order the stems",
          detail: "Use the approved purchasing list.",
        },
      ],
    });
    expect(html).toContain("<ol");
    expect(html.indexOf("Approve the design")).toBeLessThan(
      html.indexOf("Order the stems"),
    );
    expect(html).toContain("Record the agreed quantities.");
    expect(html).not.toContain("<img");
  });

  test("product figures label seed data and let readers inspect the actual image", () => {
    const image = getArticleVisuals(ARTICLES[0]).figures.find(
      (figure) => figure.kind === "screenshot",
    );
    if (!image)
      throw new Error("No genuine product capture in the lead article");
    const html = renderFigure(image);
    expect(html).toContain(image.image.alt.replaceAll("'", "&#x27;"));
    expect(html).toContain(`href="${image.image.src}"`);
    expect(html).toContain("<figcaption");
    expect(html).toMatch(/seed|test workspace|demonstration/i);
    expect(html).not.toContain("/images/articles/");
  });

  test("bars keep their values readable and name the source", () => {
    const html = renderFigure({
      kind: "bars",
      afterSection: "data",
      title: "Registered marriages",
      caption: "The baseline starts at zero.",
      sourceId: 1,
      items: [
        { label: "2024", value: 120844, displayValue: "120,844" },
        { label: "2025", value: 118804, displayValue: "118,804" },
      ],
    });
    expect(html).toContain("120,844");
    expect(html).toContain("118,804");
    expect(html).toContain('href="#source-1"');
    expect(html).not.toContain("<img");
  });
});
