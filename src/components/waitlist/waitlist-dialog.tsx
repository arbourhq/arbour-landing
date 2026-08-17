"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORY_NAMES } from "@/content/categories";
import { buttonClass } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialCategory: string | null;
  /** Already taken elsewhere, e.g. the field on /bio. Usually empty. */
  initialEmail: string;
  onCategoryChange: (category: string) => void;
};

type Step = "category" | "email";

export function WaitlistDialog({
  isOpen,
  onClose,
  initialCategory,
  initialEmail,
  onCategoryChange,
}: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // A native <dialog> gives focus trapping, Escape and an inert background for
  // free, but it has to be opened imperatively.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      setStep(initialCategory ? "email" : "category");
      setCategory(initialCategory);
      setEmail(initialEmail);
      setStatus("idle");
      setError(null);
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, initialCategory, initialEmail]);

  useEffect(() => {
    if (step === "email") emailRef.current?.focus();
  }, [step]);

  function pickCategory(name: string) {
    setCategory(name);
    onCategoryChange(name);
    setStep("email");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!category) return;

    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          category,
          // Bots fill hidden fields in. People do not.
          company: form.get("company") ?? "",
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "That did not go through.");
      }

      onClose();
      router.push(`/thanks?category=${encodeURIComponent(category)}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "That did not go through.");
    }
  }

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- <dialog> is interactive and closes on Esc already; this only adds click-outside.
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // The backdrop is part of the dialog element, so a click that lands on
        // the element itself rather than the panel is a click outside.
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[640px] max-w-[calc(100vw-2rem)] bg-transparent p-0 text-ink backdrop:animate-fade backdrop:bg-bottle/94 open:animate-zoom"
    >
      <div className="relative flex flex-col gap-6 bg-cream p-8 shadow-[inset_0_0_0_2px_#0B4030] sm:p-11">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 cursor-pointer border-0 bg-transparent p-2 font-mono text-base text-ink transition-transform duration-300 ease-overshoot hover:rotate-90"
        >
          &times;
        </button>

        {step === "category" ? (
          <>
            <p className="label-mono opacity-55">
              Step 1 of 2 · about twenty seconds
            </p>
            <h2 className="font-display text-[clamp(28px,6vw,40px)] leading-[0.95] font-extrabold tracking-[-0.035em]">
              First, what do you actually do on the day?
            </h2>
            <p className="text-[15px] leading-relaxed opacity-75">
              It decides which pipeline, which run sheet and which automations
              are waiting for you when you get in. You can change it later.
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => pickCategory(name)}
                  className="cursor-pointer border-0 bg-transparent px-3.5 py-2.5 font-sans text-sm font-semibold text-bottle shadow-[inset_0_0_0_1.5px_#0B4030] transition-transform duration-300 ease-overshoot hover:-translate-y-1 hover:rotate-[-1.5deg] hover:bg-bottle hover:text-acid"
                >
                  {name}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="label-mono opacity-55">Step 2 of 2 · {category}</p>
            <h2 className="font-display text-[clamp(28px,6vw,40px)] leading-[0.95] font-extrabold tracking-[-0.035em]">
              Right. Where do we find you?
            </h2>
            <p className="text-[15px] leading-relaxed opacity-75">
              One email when there is something to log into, sent in the order
              people joined. No drip sequence, no webinar, no sales call.
            </p>

            <form onSubmit={submit} className="flex flex-col gap-4">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                ref={emailRef}
                id="waitlist-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@yourstudio.com.au"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 bg-acid-wash px-4.5 py-4 font-sans text-[17px] text-ink shadow-[inset_0_0_0_1.5px_#0B4030] placeholder:text-ink/40"
              />

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
                  {error} Try again, or email us and we will add you by hand.
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={buttonClass("acid", "md")}
                >
                  {status === "sending" ? "Adding you" : "Join the waitlist"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("category")}
                  className="cursor-pointer border-0 bg-transparent px-2 py-4 font-sans text-[15px] font-semibold text-bottle underline"
                >
                  Wrong category
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
