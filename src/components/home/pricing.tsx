"use client";

import Link from "next/link";
import { useState } from "react";
import { EXTRA_SEAT, TIERS, type Interval } from "@/content/pricing";
import { CONTACT_TOPICS } from "@/content/contact";
import { TRIAL_DAYS } from "@/content/site";
import { Reveal } from "@/components/reveal";
import { TrialLink } from "@/components/trial-link";
import { buttonClass } from "@/components/ui/button";

/**
 * A ledger, not a three-card grid: oversized type as interface, hairlines
 * doing the layout, a whole row flooding on hover. The monthly/yearly switch
 * is a two-cell square control, the same object as the stage rail.
 *
 * Solo and Studio route to sign-up, where the plan is chosen and the trial
 * starts. House is arranged by hand, so it routes to a conversation.
 */

const INTERVALS: { key: Interval; label: string }[] = [
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

export function Pricing() {
  const [interval, setInterval] = useState<Interval>("monthly");
  const yearly = interval === "yearly";

  return (
    <section
      id="pricing"
      className="on-dark bg-bottle px-6 py-20 text-cream sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-balance text-acid">
              Cheaper than an hour of your time.
            </h2>
            <div className="flex flex-col gap-5 lg:items-end">
              <p className="m-0 max-w-[40ch] text-[15px] leading-relaxed text-cream/75 lg:text-right">
                Australian dollars, GST included. {TRIAL_DAYS} days free on Solo
                and Studio, no card. Pay yearly and get two months free.
              </p>
              <fieldset className="m-0 inline-flex self-start border-0 p-0 edge-acid lg:self-end">
                <legend className="sr-only">Billing interval</legend>
                {INTERVALS.map((option) => {
                  const on = option.key === interval;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setInterval(option.key)}
                      className={`cursor-pointer border-0 px-5 py-3 font-sans text-[15px] font-semibold transition-colors duration-200 ${
                        on
                          ? "bg-acid text-bottle"
                          : "bg-transparent text-acid hover:bg-acid/15"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </fieldset>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 -mx-3 border-b border-cream/20 sm:-mx-6">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.04}>
              <div className="group grid grid-cols-1 items-start gap-x-8 gap-y-6 border-t border-cream/20 px-4 py-9 transition-colors duration-200 hover:bg-acid hover:text-bottle sm:px-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="m-0 font-display text-[clamp(32px,5vw,44px)] leading-none font-extrabold tracking-[-0.04em] text-acid group-hover:text-bottle">
                      {tier.name}
                    </h3>
                    {tier.enterprise ? (
                      <span className="label-mono bg-cornflower-deep px-2.5 py-1.5 text-[8px] text-cream">
                        Enterprise
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-cream/75 group-hover:text-bottle/80">
                    {tier.who}
                  </p>
                  <p className="label-mono mt-4 text-acid/70 group-hover:text-bottle/70">
                    {tier.limits.join(" · ")}
                  </p>
                </div>

                <ul className="m-0 grid list-none gap-0 p-0">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-t border-cream/15 py-2.5 text-[15px] leading-snug first:border-t-0 first:pt-0 group-hover:border-bottle/20"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="flex items-baseline gap-2 lg:flex-col lg:items-end lg:gap-1">
                    {tier.price === null ? (
                      <span className="font-display text-[clamp(24px,4vw,32px)] leading-none font-extrabold tracking-[-0.04em] text-acid group-hover:text-bottle">
                        By arrangement
                      </span>
                    ) : (
                      <span
                        key={interval}
                        className="animate-flip font-display text-[clamp(44px,6vw,60px)] leading-none font-extrabold tracking-[-0.04em] text-acid tabular-nums group-hover:text-bottle"
                      >
                        $
                        {yearly
                          ? tier.price.yearly.toLocaleString("en-AU")
                          : tier.price.monthly}
                      </span>
                    )}
                    <span className="label-mono text-cream/60 group-hover:text-bottle/80">
                      {tier.price === null
                        ? "email us"
                        : yearly
                          ? "AUD a year"
                          : "AUD a month"}
                    </span>
                    {/* Zero-height sizer so the priced rows share the width of
                        the widest price column and all three lists line up. */}
                    {tier.price === null ? null : (
                      <span
                        aria-hidden="true"
                        className="-mt-1 hidden h-0 overflow-hidden font-display text-[clamp(24px,4vw,32px)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap lg:block"
                      >
                        By arrangement
                      </span>
                    )}
                  </div>

                  {tier.enterprise ? (
                    <Link
                      href={`/contact?topic=${encodeURIComponent(CONTACT_TOPICS[1])}`}
                      className={buttonClass(
                        "outlineAcid",
                        "sm",
                        "w-full justify-center lg:w-auto group-hover:edge-bottle group-hover:text-bottle",
                      )}
                    >
                      Talk to us
                    </Link>
                  ) : (
                    <TrialLink
                      variant="acid"
                      size="sm"
                      className="w-full justify-center group-hover:bg-bottle group-hover:text-acid lg:w-auto"
                    />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-[72ch] text-[15px] leading-relaxed text-cream/60">
          Studio grows past eight people at ${EXTRA_SEAT.monthly} a month per
          seat, or ${EXTRA_SEAT.yearly} a year. Yearly is ten months for the
          price of twelve. One trial per person, ever; the plan you pick at
          sign-up applies from day one, and billing starts when the trial ends.
        </p>
      </div>
    </section>
  );
}
