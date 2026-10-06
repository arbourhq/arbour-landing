/**
 * First-touch campaign attribution, kept in a first-party cookie the console
 * reads at sign-up. A copy of the console's logic in the main repo
 * (`packages/core/src/meta-tracking.ts`), hand-rolled because this site has no
 * zod. The two must stay byte-compatible: same name, same JSON, same rules.
 */

export const ATTRIBUTION_COOKIE_NAME = "arbour_attribution";

/** Ninety days. */
export const ATTRIBUTION_COOKIE_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

export interface SignupAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  landingUrl: string;
  landedAt: string;
}

type CampaignKey = Exclude<keyof SignupAttribution, "landingUrl" | "landedAt">;

const PARAM_KEYS: Record<string, CampaignKey> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
  fbclid: "fbclid",
};

const VALUE_MAX = 500;
const LANDING_URL_MAX = 2000;

/**
 * The attribution a landing URL carries, or null when it names no campaign.
 * An organic visit is not a first touch, or it would steal credit from the ad
 * click that later brings the person back.
 */
export function attributionFromLandingUrl(
  url: string,
  landedAt: Date,
): SignupAttribution | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const attribution: SignupAttribution = {
    landingUrl: url.slice(0, LANDING_URL_MAX),
    landedAt: landedAt.toISOString(),
  };
  let named = false;
  for (const [param, key] of Object.entries(PARAM_KEYS)) {
    const value = parsed.searchParams.get(param)?.trim();
    if (!value) continue;
    attribution[key] = value.slice(0, VALUE_MAX);
    named = true;
  }
  return named ? attribution : null;
}

function isBoundedString(value: unknown, max: number): value is string {
  if (typeof value !== "string") return false;
  const length = value.trim().length;
  return length >= 1 && length <= max;
}

/** UTC ISO 8601 with a trailing Z, as `Date#toISOString` writes it. */
const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?Z$/;

/** The cookie's attribution, or null when it is missing or malformed. */
export function readAttributionCookie(
  cookies: string,
): SignupAttribution | null {
  const prefix = `${ATTRIBUTION_COOKIE_NAME}=`;
  const raw = cookies
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;

  if (!isBoundedString(record.landingUrl, LANDING_URL_MAX)) return null;
  if (
    typeof record.landedAt !== "string" ||
    !ISO_DATETIME.test(record.landedAt) ||
    Number.isNaN(Date.parse(record.landedAt))
  ) {
    return null;
  }
  const attribution: SignupAttribution = {
    landingUrl: record.landingUrl.trim(),
    landedAt: record.landedAt,
  };
  for (const key of Object.values(PARAM_KEYS)) {
    const field = record[key];
    if (field === undefined) continue;
    if (!isBoundedString(field, VALUE_MAX)) return null;
    attribution[key] = field.trim();
  }
  return attribution;
}

/** Parent domain in production so app.usearbour.com can read it too. */
function cookieDomain(hostname: string): string | null {
  return hostname === "usearbour.com" || hostname.endsWith(".usearbour.com")
    ? ".usearbour.com"
    : null;
}

/**
 * Records first touch: only when the URL names a campaign and no valid cookie
 * is already there. Never overwrites.
 */
export function captureFirstTouch(): void {
  if (readAttributionCookie(document.cookie)) return;
  const attribution = attributionFromLandingUrl(
    window.location.href,
    new Date(),
  );
  if (!attribution) return;

  const parts = [
    `${ATTRIBUTION_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(attribution))}`,
    "Path=/",
    `Max-Age=${ATTRIBUTION_COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  const domain = cookieDomain(window.location.hostname);
  if (domain) parts.push(`Domain=${domain}`);
  if (window.location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}
