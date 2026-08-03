/**
 * The contact form produces two emails: the one that lands in our inbox, and
 * the receipt the sender gets. Same rules as the waitlist emails, no em dashes,
 * no emoji, and no promise of a response time we cannot keep.
 *
 * The receipt comes from Arbour, not from Ben and Alex personally. A person
 * still answers the reply, but the sender is the company.
 */
import { SITE } from "@/content/site";

/**
 * Absolute because email clients have no origin to resolve against. Acid on
 * transparent, so it only ever sits on the Bottle panel.
 */
const WORDMARK = `${SITE.url}/arbour-wordmark-acid.png`;
const WORDMARK_W = 168;
const WORDMARK_H = 29; // source is 2400x411

const CREAM = "#FFFBEF";
const BOTTLE = "#0B4030";
const ACID = "#C6FF3D";
const INK = "#0F2A1E";

const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export function inboxSubject(topic: string, name: string) {
  return `Contact: ${topic} (${name})`;
}

export function inboxText({ name, email, topic, message }: ContactMessage) {
  return [`${name} <${email}>`, topic, "", message].join("\n");
}

export function receiptSubject() {
  return "We have got your message";
}

export function receiptText({ topic, message }: ContactMessage) {
  return [
    "Got it.",
    "",
    `Down as: ${topic}.`,
    "",
    "A person reads every one of these, so the reply is not a queue. If it is a Saturday, expect a slow one, there is a wedding on.",
    "",
    "Your message, for your records:",
    "",
    message,
    "",
    "Arbour",
    "The OS that weddings run on",
  ].join("\n");
}

export function receiptHtml({ topic, message }: ContactMessage) {
  const safeTopic = escapeHtml(topic);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="en-AU">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CREAM};color:${INK};font-family:${SANS};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr><td style="background:${BOTTLE};padding:36px 32px;">
          <img src="${WORDMARK}" width="${WORDMARK_W}" height="${WORDMARK_H}" alt="Arbour"
            style="display:block;border:0;outline:none;text-decoration:none;width:${WORDMARK_W}px;height:${WORDMARK_H}px;color:${ACID};font-size:26px;font-weight:800;letter-spacing:0.04em;">
          <div style="color:${ACID};font-size:36px;font-weight:800;letter-spacing:-0.03em;line-height:1.05;margin-top:28px;">
            Got it.
          </div>
        </td></tr>

        <tr><td style="background:${ACID};padding:18px 32px;">
          <span style="font-family:${MONO};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${BOTTLE};">
            Down as &middot; ${safeTopic}
          </span>
        </td></tr>

        <tr><td style="background:${CREAM};padding:32px;box-shadow:inset 0 0 0 1px rgba(15,42,30,0.2);">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.55;">
            A person reads every one of these, so the reply is not a queue. If it is a Saturday,
            expect a slow one, there is a wedding on.
          </p>
          <p style="margin:0 0 10px;font-family:${MONO};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${INK};opacity:0.55;">
            What you sent
          </p>
          <p style="margin:0;font-size:16px;line-height:1.55;">${safeMessage}</p>
        </td></tr>

        <tr><td style="background:${BOTTLE};padding:24px 32px;">
          <p style="margin:0;color:${CREAM};font-size:15px;line-height:1.5;">Arbour</p>
          <p style="margin:8px 0 0;font-family:${MONO};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${ACID};">
            The OS that weddings run on
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
