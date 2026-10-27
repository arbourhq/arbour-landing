import assert from "node:assert/strict";

// Run against a local production server or the deployed site. This checks the
// initial HTTP response, without executing the site's JavaScript.
const target = new URL(process.argv[2] ?? "https://www.usearbour.com");
const canonicalOrigin =
  process.env.SEO_EXPECTED_ORIGIN ?? "https://www.usearbour.com";
const paths = [
  "/",
  "/wedding-crm-australia",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/bio",
];
const pages = new Map();

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
}

function meta(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.find(
    (tag) =>
      attribute(tag, "name") === name || attribute(tag, "property") === name,
  );
}

async function fetchText(path) {
  const response = await fetch(new URL(path, target), {
    signal: AbortSignal.timeout(20_000),
  });
  assert.equal(response.status, 200, `${path} must return 200`);
  assert(
    !/noindex/i.test(response.headers.get("x-robots-tag") ?? ""),
    `${path} has an HTTP noindex header`,
  );
  return response.text();
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(
      /&(?:amp|quot|#x27|lt|gt);/g,
      (entity) =>
        ({
          "&amp;": "&",
          "&quot;": '"',
          "&#x27;": "'",
          "&lt;": "<",
          "&gt;": ">",
        })[entity],
    );
}

for (const path of paths) {
  const html = await fetchText(path);
  const expectedUrl = new URL(path, canonicalOrigin).href;
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title, `${path} needs a title`);
  assert(
    ![...pages.values()].some((page) => page.title === title),
    `${path} repeats another page's title`,
  );
  assert(
    attribute(meta(html, "description") ?? "", "content"),
    `${path} needs a description`,
  );
  const canonicals = (html.match(/<link\b[^>]*>/gi) ?? []).filter(
    (tag) => attribute(tag, "rel") === "canonical",
  );
  assert.equal(canonicals.length, 1, `${path} needs exactly one canonical`);
  assert.equal(
    new URL(attribute(canonicals[0], "href")).href,
    expectedUrl,
    `${path} has the wrong canonical`,
  );
  assert.equal(
    new URL(attribute(meta(html, "og:url") ?? "", "content")).href,
    expectedUrl,
    `${path} has the wrong Open Graph URL`,
  );
  assert.equal(
    (html.match(/<h1\b/g) ?? []).length,
    1,
    `${path} needs exactly one h1`,
  );
  const robots = attribute(meta(html, "robots") ?? "", "content");
  assert(robots, `${path} needs explicit indexing metadata`);
  assert.equal(
    /\bnoindex\b/.test(robots),
    path === "/bio",
    `${path} has the wrong indexing rules`,
  );
  const graphs = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data["@graph"] ?? [data];
  });
  assert(
    graphs.some((node) => node["@type"] === "Organization"),
    `${path} needs organisation data`,
  );
  pages.set(path, { title, html, graphs });
  console.log(`PASS ${path}`);
}

const sitemap = await fetchText("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
assert.deepEqual(
  urls.toSorted(),
  paths
    .filter((path) => path !== "/bio")
    .map((path) => new URL(path, canonicalOrigin).href)
    .toSorted(),
);
const robots = await fetchText("/robots.txt");
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \/\s/);
assert.match(robots, /Disallow: \/api\//);
assert(
  robots.includes(`Sitemap: ${new URL("/sitemap.xml", canonicalOrigin).href}`),
);

const home = pages.get("/");
const app = home.graphs.find((node) => node["@type"] === "SoftwareApplication");
assert(app, "Homepage needs software data");
assert(app.offers.length > 0, "Software data needs published offers");
for (const offer of app.offers) {
  assert.equal(offer.priceCurrency, "AUD");
  assert(
    visibleText(home.html).includes(`$${offer.price}`),
    `${offer.name} price must appear in HTML`,
  );
}
const weddingCrm = pages.get("/wedding-crm-australia");
assert(
  home.html.includes('href="/wedding-crm-australia"'),
  "Homepage must link to the CRM page",
);
assert(
  weddingCrm.graphs.some((node) => node["@type"] === "BreadcrumbList"),
  "CRM page needs breadcrumbs",
);
for (const page of [home, weddingCrm]) {
  const faq = page.graphs.find((node) => node["@type"] === "FAQPage");
  assert(faq?.mainEntity.length > 0, "Product pages need FAQ data");
  // Compare decoded text outside scripts so JSON-LD cannot satisfy its own check.
  const text = visibleText(page.html);
  for (const question of faq.mainEntity) {
    assert(
      text.includes(question.name),
      `FAQ question missing from HTML: ${question.name}`,
    );
    assert(
      text.includes(question.acceptedAnswer.text),
      `FAQ answer missing from HTML: ${question.name}`,
    );
  }
}
for (const path of ["/opengraph-image", "/twitter-image"]) {
  const response = await fetch(new URL(path, target), {
    signal: AbortSignal.timeout(20_000),
  });
  assert.equal(response.status, 200, `${path} must return 200`);
  assert.match(response.headers.get("content-type"), /^image\//);
  await response.arrayBuffer();
}
console.log(
  "PASS sitemap, robots, structured data, visible FAQs/prices and social images",
);
