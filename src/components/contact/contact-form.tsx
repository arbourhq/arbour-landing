"use client";

import { useState } from "react";
import { CONTACT_TOPIC_NAMES, CONTACT_TOPICS } from "@/content/contact";
import { buttonClass } from "@/components/ui/button";

const FIELD =
  "w-full border-0 bg-acid-wash px-4.5 py-4 font-sans text-[17px] text-ink shadow-[inset_0_0_0_1.5px_#0B4030] placeholder:text-ink/40";

const LABEL = "eyebrow mb-2.5 block opacity-55";

/**
 * The topic buttons are square chips rather than a select, because the choice
 * routes the message and it should be one tap. Chosen topic floods Bottle, the
 * same way the pricing rows do.
 */
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
      <div className="flex flex-col gap-5 bg-acid p-8 text-bottle shadow-[inset_0_0_0_2px_#0B4030] sm:p-11">
        <span className="block h-7 w-7 origin-bottom animate-pop bg-bottle" />
        <h2 className="m-0 font-display text-[clamp(30px,5vw,44px)] leading-[0.95] font-extrabold tracking-[-0.04em]">
          Sent. Now go and do something else.
        </h2>
        <p className="m-0 max-w-[46ch] text-[16px] leading-relaxed">
          There is a copy in your inbox. One of us reads this, so the reply
          comes from a person. If it is a Saturday, it will be a slow one.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-7 bg-cream p-8 shadow-[inset_0_0_0_2px_#0B4030] sm:p-11"
    >
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
                data-cursor="button"
                className={`cursor-pointer border-0 px-3.5 py-2.5 font-sans text-sm font-semibold shadow-[inset_0_0_0_1.5px_#0B4030] transition-transform duration-300 ease-overshoot hover:-translate-y-1 hover:rotate-[-1.5deg] ${
                  on ? "bg-bottle text-acid" : "bg-transparent text-bottle"
                }`}
              >
                {name}
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
            className={FIELD}
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
            className={FIELD}
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
          className={`${FIELD} resize-y leading-relaxed`}
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
          className="bg-coral-wash px-4 py-3 text-sm text-ink shadow-[inset_0_0_0_1.5px_#FF4438]"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("bottle", "md")}
        >
          {status === "sending" ? "Sending" : "Send it"}
        </button>
        <span className="label-mono max-w-[30ch] leading-relaxed opacity-55">
          Goes to two people · no ticket number
        </span>
      </div>
    </form>
  );
}
