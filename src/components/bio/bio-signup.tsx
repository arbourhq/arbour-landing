"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { useWaitlist } from "@/components/waitlist/waitlist-context";

/**
 * The email is caught here and handed to the existing waitlist dialog, which
 * still has to ask for a category before it can post: /api/waitlist rejects a
 * signup without one. So this is step zero, not a second signup path. The
 * dialog opens on the category step with the email already in it, and the
 * person picks one thing and sends.
 */
export function BioSignup() {
  const { open } = useWaitlist();
  const [email, setEmail] = useState("");

  return (
    <section className="bg-acid p-6 text-bottle">
      <p className="eyebrow opacity-65">Waitlist · open</p>

      <h2 className="mt-4 font-display text-[32px] leading-[0.95] font-extrabold tracking-[-0.04em]">
        Get on the list.
      </h2>

      <p className="mt-3 text-[15px] leading-relaxed opacity-80">
        One email when there is something to log into, sent in the order people
        joined. No drip sequence, no webinar, no sales call.
      </p>

      <form
        onSubmit={(event) => {
          // The browser has already checked the address by here, so the dialog
          // only has the category left to ask for.
          event.preventDefault();
          open(email);
        }}
        className="mt-6 flex flex-col gap-3"
      >
        <label htmlFor="bio-email" className="sr-only">
          Email address
        </label>
        <input
          id="bio-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourstudio.com.au"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full border-0 bg-cream px-4.5 py-4 font-sans text-[17px] text-ink shadow-[inset_0_0_0_1.5px_#0B4030] placeholder:text-ink/40"
        />
        <button type="submit" className={buttonClass("bottle", "md")}>
          Join the waitlist
        </button>
      </form>
    </section>
  );
}
