import type { WaitlistProvider, WaitlistResult, WaitlistSignup } from "./types";
import {
  confirmationHtml,
  confirmationSubject,
  confirmationText,
  notificationSubject,
  notificationText,
} from "./emails";

const API = "https://api.resend.com";

type ResendEnv = {
  apiKey: string;
  audienceId?: string;
  from: string;
  notifyTo?: string;
};

/**
 * Talks to the Resend REST API directly rather than pulling in the SDK: this
 * is a temporary home for the waitlist before it moves to Pipedrive, and it is
 * two endpoints.
 */
export function createResendProvider(env: ResendEnv): WaitlistProvider {
  async function call(path: string, body: unknown) {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend ${path} responded ${res.status}: ${detail}`);
    }

    return res.json().catch(() => ({}));
  }

  return {
    name: "resend",

    async add({ email, category }: WaitlistSignup): Promise<WaitlistResult> {
      // The contact record is the list. If it fails, the signup failed, so this
      // one is allowed to throw.
      if (env.audienceId) {
        await call(`/audiences/${env.audienceId}/contacts`, {
          email,
          unsubscribed: false,
        });
      }

      // The two emails are courtesy, not the record. A Resend outage on either
      // should not tell someone their signup did not work when it did.
      const courtesy: Promise<unknown>[] = [
        call("/emails", {
          from: env.from,
          to: [email],
          subject: confirmationSubject(),
          html: confirmationHtml(category),
          text: confirmationText(category),
        }),
      ];

      if (env.notifyTo) {
        courtesy.push(
          call("/emails", {
            from: env.from,
            to: [env.notifyTo],
            subject: notificationSubject(category),
            text: notificationText(email, category),
          }),
        );
      }

      const settled = await Promise.allSettled(courtesy);
      for (const outcome of settled) {
        if (outcome.status === "rejected") {
          console.error("[waitlist] resend email failed", outcome.reason);
        }
      }

      return { ok: true, alreadyOnList: false };
    },
  };
}
