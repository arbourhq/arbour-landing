import { CONTACT_TOPIC_NAMES } from "@/content/contact";
import { getContactSender } from "@/lib/contact";

// Route handlers are uncached by default in Next 16, which is what we want.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 120, message: 4000 };

type Body = {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  company?: unknown;
};

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return bad("We could not read that.");
  }

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot has nothing to learn from the difference.
  if (text(body.company) !== "") return Response.json({ ok: true });

  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const topic = text(body.topic);
  const message = text(body.message);

  if (!name || name.length > LIMITS.name) {
    return bad("We need a name to put on the reply.");
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return bad("That email address does not look right.");
  }
  if (!CONTACT_TOPIC_NAMES.includes(topic)) {
    return bad("Pick what this is about first.");
  }
  if (message.length < 10) {
    return bad("A line or two more and we can actually help.");
  }
  if (message.length > LIMITS.message) {
    return bad("That is longer than we can take. Trim it and send again.");
  }

  const sender = getContactSender();

  if (sender.name === "logging" && process.env.NODE_ENV === "production") {
    console.error("[contact] no provider configured in production");
    return bad("The form is not sending right now. Email us instead.", 503);
  }

  try {
    await sender.send({ name, email, topic, message });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    return bad("That did not send just then.", 502);
  }
}
