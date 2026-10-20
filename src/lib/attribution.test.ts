import { describe, expect, test } from "bun:test";
import {
  ATTRIBUTION_COOKIE_NAME,
  attributionFromLandingUrl,
  readAttributionCookie,
} from "./attribution";

const LANDED_AT = new Date("2026-10-19T09:00:00.000Z");

describe("attributionFromLandingUrl", () => {
  test("an organic visit is not a first touch", () => {
    expect(
      attributionFromLandingUrl("https://usearbour.com/", LANDED_AT),
    ).toBeNull();
  });

  test("a bad URL is not a first touch", () => {
    expect(attributionFromLandingUrl("not a url", LANDED_AT)).toBeNull();
  });

  test("rdt_cid alone counts as a campaign touch", () => {
    expect(
      attributionFromLandingUrl(
        "https://usearbour.com/?rdt_cid=abc123",
        LANDED_AT,
      ),
    ).toEqual({
      landingUrl: "https://usearbour.com/?rdt_cid=abc123",
      landedAt: "2026-10-19T09:00:00.000Z",
      rdtCid: "abc123",
    });
  });

  test("fbclid and rdt_cid sit beside the UTM keys in the console's order", () => {
    const attribution = attributionFromLandingUrl(
      "https://usearbour.com/?rdt_cid=r1&fbclid=f1&utm_source=reddit&utm_medium=paid_social",
      LANDED_AT,
    );
    expect(attribution).toEqual({
      landingUrl:
        "https://usearbour.com/?rdt_cid=r1&fbclid=f1&utm_source=reddit&utm_medium=paid_social",
      landedAt: "2026-10-19T09:00:00.000Z",
      utmSource: "reddit",
      utmMedium: "paid_social",
      fbclid: "f1",
      rdtCid: "r1",
    });
    // The cookie is JSON, so key order is part of byte-compatibility.
    expect(Object.keys(attribution ?? {})).toEqual([
      "landingUrl",
      "landedAt",
      "utmSource",
      "utmMedium",
      "fbclid",
      "rdtCid",
    ]);
  });

  test("rdt_cid is trimmed and capped at 500 characters like every other key", () => {
    const long = "x".repeat(600);
    const attribution = attributionFromLandingUrl(
      `https://usearbour.com/?rdt_cid=%20${long}%20`,
      LANDED_AT,
    );
    expect(attribution?.rdtCid).toBe("x".repeat(500));
  });

  test("an empty rdt_cid does not count", () => {
    expect(
      attributionFromLandingUrl("https://usearbour.com/?rdt_cid=", LANDED_AT),
    ).toBeNull();
  });
});

const cookie = (value: unknown) =>
  `other=1; ${ATTRIBUTION_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(value))}`;

describe("readAttributionCookie", () => {
  test("round-trips rdtCid", () => {
    const attribution = attributionFromLandingUrl(
      "https://usearbour.com/pricing?rdt_cid=abc123",
      LANDED_AT,
    );
    expect(readAttributionCookie(cookie(attribution))).toEqual(attribution);
  });

  test("rejects an over-long rdtCid", () => {
    expect(
      readAttributionCookie(
        cookie({
          landingUrl: "https://usearbour.com/",
          landedAt: "2026-10-19T09:00:00.000Z",
          rdtCid: "x".repeat(501),
        }),
      ),
    ).toBeNull();
  });

  test("rejects a non-string rdtCid", () => {
    expect(
      readAttributionCookie(
        cookie({
          landingUrl: "https://usearbour.com/",
          landedAt: "2026-10-19T09:00:00.000Z",
          rdtCid: 42,
        }),
      ),
    ).toBeNull();
  });

  test("is null without the cookie", () => {
    expect(readAttributionCookie("other=1")).toBeNull();
  });
});
