import type { WaitlistProvider, WaitlistResult, WaitlistSignup } from "./types";
import { createResendProvider } from "./resend";

export type { WaitlistProvider, WaitlistResult, WaitlistSignup };

/**
 * Used when Resend is not configured, so the site runs end to end locally
 * without credentials. It never silently stands in for a misconfigured
 * production deploy: the route handler refuses to use it when NODE_ENV is
 * production.
 */
const loggingProvider: WaitlistProvider = {
  name: "logging",
  async add({ email, category }) {
    console.info(`[waitlist] ${email} · ${category} (not persisted, no provider configured)`);
    return { ok: true, alreadyOnList: false };
  },
};

let cached: WaitlistProvider | null = null;

export function getWaitlistProvider(): WaitlistProvider {
  if (cached) return cached;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM_EMAIL;

  if (apiKey && from) {
    cached = createResendProvider({
      apiKey,
      from,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      notifyTo: process.env.WAITLIST_NOTIFY_EMAIL,
    });
  } else {
    cached = loggingProvider;
  }

  return cached;
}
