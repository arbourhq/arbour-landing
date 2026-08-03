import { SITE } from "@/content/site";
import {
  inboxSubject,
  inboxText,
  receiptHtml,
  receiptSubject,
  receiptText,
  type ContactMessage,
} from "./emails";

const API = "https://api.resend.com";

export type ContactSender = {
  name: "resend" | "logging";
  send(message: ContactMessage): Promise<void>;
};

/**
 * Local development has no Resend key, so the message goes to the log instead.
 * The route handler refuses to fall back to this in production, the same way
 * the waitlist route does: a message that quietly vanishes is worse than an
 * error the sender can see.
 */
const loggingSender: ContactSender = {
  name: "logging",
  async send({ name, email, topic, message }) {
    console.info(
      `[contact] ${name} <${email}> · ${topic} (not sent, no provider configured)\n${message}`,
    );
  },
};

let cached: ContactSender | null = null;

export function getContactSender(): ContactSender {
  if (cached) return cached;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WAITLIST_FROM_EMAIL;

  if (!apiKey || !from) {
    cached = loggingSender;
    return cached;
  }

  const to = process.env.CONTACT_TO_EMAIL ?? SITE.contactEmail;

  async function call(body: unknown) {
    const res = await fetch(`${API}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend /emails responded ${res.status}: ${detail}`);
    }
  }

  cached = {
    name: "resend",
    async send(message) {
      // Our copy is the message. If it fails, the send failed, so it throws.
      await call({
        from,
        to: [to],
        reply_to: message.email,
        subject: inboxSubject(message.topic, message.name),
        text: inboxText(message),
      });

      // The receipt is courtesy. A failure here must not tell someone their
      // message did not arrive when it did.
      try {
        await call({
          from,
          to: [message.email],
          subject: receiptSubject(),
          html: receiptHtml(message),
          text: receiptText(message),
        });
      } catch (error) {
        console.error("[contact] receipt failed", error);
      }
    },
  };

  return cached;
}
