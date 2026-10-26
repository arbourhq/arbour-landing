"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CONTACT_TOPIC_NAMES, CONTACT_TOPICS } from "@/content/contact";
import { buttonClass } from "@/components/ui/button";

/**
 * The console's field skin: a 6px corner, an input-strength border that
 * darkens on hover, and on focus a Bottle border with the 3px ring. Labels
 * are the 9px mono field label in Ink muted.
 *
 * The topic is a row of tags rather than a select, because the choice routes
 * the message and should be one tap; the chosen tag fills Bottle, the same as
 * the vendor tags on the home page.
 */
const FIELD =
  "w-full rounded-md border border-input bg-page px-3.5 text-ui text-ink transition-[border-color,box-shadow] duration-[var(--duration-base)] placeholder:text-ink-faint hover:border-input-hover focus-visible:border-bottle focus-visible:shadow-[0_0_0_3px_rgba(11,64,48,0.3)] focus-visible:outline-none";

const LABEL = "mono-label mb-2 block text-ink-muted";

export function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const [topic, setTopic] = useState<string>(
    initialTopic && CONTACT_TOPIC_NAMES.includes(initialTopic)
      ? initialTopic
      : CONTACT_TOPICS[0],
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name") ?? "",
          email: form.get("email") ?? "",
          message: form.get("message") ?? "",
          topic,
          // Bots fill hidden fields in. People do not.
          company: form.get("company") ?? "",
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "That did not send.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "That did not send.");
    }
  }

  if (status === "sent") {
    return (
      <div className="animate-pop-in flex flex-col items-start gap-4 rounded-md border border-border-default bg-page p-6 sm:p-8">
        {/* An output is a status region, so the change is announced. */}
        <output className="mono-label inline-flex items-center gap-1.5 rounded-sm bg-sprout-wash px-2 py-1.5 font-semibold text-sprout-ink">
          <Check aria-hidden className="size-3" />
          Sent
        </output>
        <h2 className="headline m-0 text-[clamp(1.75rem,1.1rem+2vw,2.5rem)] leading-[0.98] text-ink">
          Sent. Now go and do something else.
        </h2>
        <p className="m-0 max-w-[46ch] text-body text-ink-secondary">
          There is a copy in your inbox. One of us reads this, so the reply
          comes from a person. If it is a Saturday, it will be a slow one.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-7">
      <fieldset className="m-0 border-0 p-0">
        <legend className={LABEL}>What is this about</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((name) => {
            const on = topic === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(name)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 py-2 text-left text-ui font-semibold transition-colors duration-[var(--duration-base)] ${
                  on
                    ? "border-transparent bg-bottle text-on-dark inset-shadow-depth-button"
                    : "border-input bg-page text-ink hover:border-input-hover hover:bg-panel"
                }`}
              >
                {name}
                {on ? (
                  <Check aria-hidden className="-mr-0.5 size-3.5 shrink-0" />
                ) : null}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL}>
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Who is writing"
            className={`${FIELD} h-11`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourstudio.com.au"
            className={`${FIELD} h-11`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={LABEL}>
          The message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          placeholder="What you run, what you are using now, and what you actually want to know."
          className={`${FIELD} min-h-40 resize-y py-3 leading-[1.5]`}
        />
      </div>

      {/* Honeypot. Never shown, never filled in by a person. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      {error ? (
        <p
          role="alert"
          className="m-0 rounded-md border border-coral/40 bg-coral-wash px-3.5 py-3 text-ui text-coral-ink"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending" || undefined}
          className={buttonClass("sprout", "lg")}
        >
          {status === "sending" ? "Sending" : "Send it"}
        </button>
        <span className="mono-label max-w-[30ch] text-ink-muted">
          Goes to two people · no ticket number
        </span>
      </div>
    </form>
  );
}
