import type Anthropic from "@anthropic-ai/sdk";

export type HelpMessage = { role: "user" | "assistant"; content: string };

export const MESSAGE_LIMIT = 2000;
export const HISTORY_LIMIT = 20;

/** Accept conversation text only. Clients cannot supply instructions or tools. */
export function parseMessages(body: unknown): HelpMessage[] | null {
  if (!body || typeof body !== "object" || !("messages" in body)) return null;
  const messages = body.messages;
  if (
    !Array.isArray(messages) ||
    !messages.length ||
    messages.length > HISTORY_LIMIT
  )
    return null;
  const result: HelpMessage[] = [];
  for (const message of messages) {
    if (
      !message ||
      typeof message !== "object" ||
      (message.role !== "user" && message.role !== "assistant") ||
      typeof message.content !== "string" ||
      !message.content.trim() ||
      message.content.length >
        MESSAGE_LIMIT * (message.role === "assistant" ? 4 : 1) ||
      message.role === result.at(-1)?.role
    )
      return null;
    result.push({ role: message.role, content: message.content.trim() });
  }
  return result[0].role === "user" && result.at(-1)?.role === "user"
    ? result
    : null;
}

export function responseText(message: Anthropic.Message): string | null {
  // Refusals, truncation and other stops are not a finished answer.
  if (message.stop_reason !== "end_turn") return null;
  const text = message.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
  return text && text.length <= MESSAGE_LIMIT * 4 ? text : null;
}
