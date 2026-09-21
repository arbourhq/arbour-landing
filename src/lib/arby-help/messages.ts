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

export function responseText(value: unknown): string | null {
  if (
    !value ||
    typeof value !== "object" ||
    !("status" in value) ||
    value.status !== "completed" ||
    !("output" in value) ||
    !Array.isArray(value.output)
  )
    return null;
  const text = value.output
    .flatMap((item: unknown) => {
      if (
        !item ||
        typeof item !== "object" ||
        !("type" in item) ||
        item.type !== "message" ||
        !("content" in item) ||
        !Array.isArray(item.content)
      )
        return [];
      return item.content.flatMap((part: unknown) => {
        if (!part || typeof part !== "object" || !("type" in part)) return [];
        if (
          part.type === "output_text" &&
          "text" in part &&
          typeof part.text === "string"
        )
          return [part.text];
        if (
          part.type === "refusal" &&
          "refusal" in part &&
          typeof part.refusal === "string"
        )
          return [part.refusal];
        return [];
      });
    })
    .join("\n")
    .trim();
  return text && text.length <= MESSAGE_LIMIT * 4 ? text : null;
}
