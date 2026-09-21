import { parseMessages, responseText } from "./messages";
import { createRateLimit } from "./rate-limit";

const allowRequest = createRateLimit();

const MAX_BODY_BYTES = 100_000;
const unavailable =
  "Arby Help cannot reply right now. Try again, or contact Ben and Alex below.";

function error(message: string, status: number) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

/** Dependencies are explicit so the provider contract can be tested without a paid call. */
export async function handleHelp(
  request: Request,
  apiKey: string | undefined,
  instructions: string,
  fetchResponse: typeof fetch = fetch,
  allow: (key: string) => boolean = allowRequest,
) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return error("Open Arby Help from the Arbour website.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return error("Send your question as text.", 415);
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES)
    return error("That conversation is too long. Start a new chat.", 413);

  let body: unknown;
  try {
    // Bound actual bytes too, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return error("Add a question first.", 400);
    let bytes = 0;
    let raw = "";
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return error("That conversation is too long. Start a new chat.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    body = JSON.parse(raw + decoder.decode());
  } catch {
    return error("We could not read that question. Please try again.", 400);
  }
  const messages = parseMessages(body);
  if (!messages)
    return error(
      "That conversation could not be read. Start a new chat and try again.",
      400,
    );
  if (!apiKey) return error(unavailable, 503);
  // The host must overwrite forwarded IP headers. The global cap also applies
  // when no client address is available or an address is spoofed.
  const client =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allow(client))
    return error("Arby Help is busy. Give it a minute, then try again.", 429);

  try {
    const response = await fetchResponse(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.any([request.signal, AbortSignal.timeout(30_000)]),
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          reasoning: { effort: "low" },
          instructions,
          input: messages,
          max_output_tokens: 1600,
          store: false,
          text: { verbosity: "low" },
        }),
      },
    );
    if (!response.ok) {
      if (response.status === 429)
        return error(
          "Arby Help is busy. Give it a minute, then try again.",
          429,
        );
      return error(unavailable, 502);
    }
    const text = responseText(await response.json());
    if (!text) return error(unavailable, 502);
    return Response.json(
      { message: text },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return error(unavailable, 502);
  }
}
