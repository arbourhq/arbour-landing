import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import nextConfig from "../../next.config";

/** The one rule that applies to every path. */
async function siteHeaders() {
  const rules = (await nextConfig.headers?.()) ?? [];
  const rule = rules.find((r) => r.source === "/:path*");
  expect(rule).toBeDefined();
  return new Map(rule?.headers.map((h) => [h.key.toLowerCase(), h.value]));
}

function directives(csp: string) {
  return new Map(
    csp.split(";").map((part) => {
      const [name, ...sources] = part.trim().split(/\s+/);
      return [name, sources] as const;
    }),
  );
}

/** The host of the script URL a component injects, read from its source. */
function scriptHost(file: string) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const src = source.match(/SCRIPT_SRC = "([^"]+)"/)?.[1];
  expect(src).toBeDefined();
  return new URL(src ?? "").origin;
}

describe("security headers", () => {
  test("every page refuses framing, sniffing and leaky referrers", async () => {
    const headers = await siteHeaders();
    expect(headers.get("x-frame-options")).toBe("DENY");
    expect(headers.get("x-content-type-options")).toBe("nosniff");
    expect(headers.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(headers.get("permissions-policy")).toContain("camera=()");
    expect(headers.get("strict-transport-security")).toContain("max-age=");
    expect(headers.get("access-control-allow-origin")).not.toBe("*");

    const csp = directives(headers.get("content-security-policy") ?? "");
    expect(csp.get("frame-ancestors")).toEqual(["'none'"]);
    expect(csp.get("object-src")).toEqual(["'none'"]);
    expect(csp.get("default-src")).toEqual(["'self'"]);
  });

  test("script-src allows the pixels the site injects", async () => {
    const headers = await siteHeaders();
    const csp = directives(headers.get("content-security-policy") ?? "");
    const scripts = csp.get("script-src") ?? [];
    expect(scripts).toContain(scriptHost("components/meta-pixel.tsx"));
    expect(scripts).toContain(scriptHost("components/reddit-pixel.tsx"));
  });
});
