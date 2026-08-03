import { CATEGORY_NAMES } from "@/content/categories";
import { getWaitlistProvider } from "@/lib/waitlist";

// Route handlers are uncached by default in Next 16, which is what we want.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = {
  email?: unknown;
  category?: unknown;
  company?: unknown;
};

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
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
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";

  if (!EMAIL.test(email) || email.length > 254) {
    return bad("That email address does not look right.");
  }

  if (!CATEGORY_NAMES.includes(category)) {
    return bad("Pick what you do on the day first.");
  }

  const provider = getWaitlistProvider();

  // The logging provider exists so local development works without keys. It
  // must never quietly swallow real signups.
  if (provider.name === "logging" && process.env.NODE_ENV === "production") {
    console.error("[waitlist] no provider configured in production");
    return bad("The waitlist is not accepting signups right now.", 503);
  }

  try {
    const result = await provider.add({ email, category });
    if (!result.ok) return bad(result.reason, 502);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[waitlist] signup failed", error);
    return bad("We could not add you just then.", 502);
  }
}
