/**
 * A vendor's referral link, `?ref=<code>`, carried from any page on this site
 * to the console's onboarding in a first-party cookie. A copy of the console's
 * logic in the main repo (`packages/core/src/referral-code.ts` and
 * `apps/web/src/lib/referral-capture.ts`). The two must stay compatible: same
 * cookie name, same code rules, same parent domain.
 *
 * Unlike first-touch attribution, the newest link wins: the vendor who sent
 * the last link is the one the person is acting on.
 */

export const REFERRAL_QUERY_PARAM = "ref";
export const REFERRAL_COOKIE_NAME = "arbour_ref";

/** Ninety days. */
export const REFERRAL_COOKIE_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

/** Upper case without I, L, O, 0 and 1, eight characters. */
const CODE_PATTERN = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/;

/** The code a landing URL carries, normalised, or null when it carries none of ours. */
export function referralCodeFromUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const raw = parsed.searchParams.get(REFERRAL_QUERY_PARAM);
  if (raw === null) return null;
  const code = raw.replace(/[\s-]/g, "").toUpperCase();
  return CODE_PATTERN.test(code) ? code : null;
}

/** Parent domain in production so app.usearbour.com can read it too. */
function cookieDomain(hostname: string): string | null {
  return hostname === "usearbour.com" || hostname.endsWith(".usearbour.com")
    ? ".usearbour.com"
    : null;
}

/** Writes the referral cookie from `?ref=`, replacing any earlier one. Invalid codes are ignored. */
export function captureReferralCode(): void {
  const code = referralCodeFromUrl(window.location.href);
  if (!code) return;

  const parts = [
    `${REFERRAL_COOKIE_NAME}=${code}`,
    "Path=/",
    `Max-Age=${REFERRAL_COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  const domain = cookieDomain(window.location.hostname);
  if (domain) parts.push(`Domain=${domain}`);
  if (window.location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}
