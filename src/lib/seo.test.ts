import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StructuredData } from "@/components/structured-data";
import { pageMetadata, siteUrl } from "@/lib/seo";

describe("search metadata", () => {
  test("child pages keep their canonical and social previews on the same URL", () => {
    const metadata = pageMetadata({
      title: "About",
      description: "Meet the founders.",
      path: "/about",
    });

    expect(metadata.alternates?.canonical).toBe(siteUrl("/about"));
    expect(metadata.openGraph?.url).toBe(siteUrl("/about"));
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({ url: siteUrl("/opengraph-image") }),
    ]);
    expect(metadata.twitter?.images).toEqual([
      expect.objectContaining({ url: siteUrl("/twitter-image") }),
    ]);
  });

  test("utility pages remain noindex for generic crawlers and Googlebot", () => {
    const metadata = pageMetadata({
      title: "Link in bio",
      description: "Arbour links.",
      path: "/bio",
      noIndex: true,
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    });
  });
});

test("structured data cannot terminate its script tag", () => {
  const data = {
    "@context": "https://schema.org",
    name: "</script><script>alert('injected')</script>",
  };
  const html = renderToStaticMarkup(createElement(StructuredData, { data }));
  const json = html.slice(html.indexOf(">") + 1, html.lastIndexOf("</script>"));

  expect(json).not.toContain("<");
  expect(JSON.parse(json)).toEqual(data);
  expect(html.match(/<script/g)).toHaveLength(1);
});
