import { describe, expect, test } from "bun:test";
import { referralCodeFromUrl } from "./referral";

describe("referralCodeFromUrl", () => {
  test("reads a referral code from any page", () => {
    expect(referralCodeFromUrl("https://usearbour.com/?ref=ABCD2345")).toBe(
      "ABCD2345",
    );
    expect(
      referralCodeFromUrl(
        "https://usearbour.com/pricing?utm_source=x&ref=WXYZ2345",
      ),
    ).toBe("WXYZ2345");
  });

  test("normalises a typed code the way the console does", () => {
    expect(referralCodeFromUrl("https://usearbour.com/?ref=abcd-2345")).toBe(
      "ABCD2345",
    );
    expect(
      referralCodeFromUrl("https://usearbour.com/?ref=%20abcd%202345"),
    ).toBe("ABCD2345");
  });

  test("ignores anything that is not one of our codes", () => {
    expect(referralCodeFromUrl("https://usearbour.com/")).toBeNull();
    expect(referralCodeFromUrl("https://usearbour.com/?ref=")).toBeNull();
    expect(
      referralCodeFromUrl("https://usearbour.com/?ref=ABCD234"),
    ).toBeNull();
    // I, L, O, 0 and 1 are never in a code.
    expect(
      referralCodeFromUrl("https://usearbour.com/?ref=ABCD2341"),
    ).toBeNull();
    expect(
      referralCodeFromUrl("https://usearbour.com/?ref=producthunt"),
    ).toBeNull();
    expect(referralCodeFromUrl("not a url")).toBeNull();
  });
});
