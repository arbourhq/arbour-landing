"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { EXTRA_SEAT, TIERS, type Interval } from "@/content/pricing";
import { CONTACT_TOPICS } from "@/content/contact";
import { TRIAL_DAYS } from "@/content/site";
import { trackMetaEvent } from "@/components/meta-pixel";
import { trackRedditEvent } from "@/components/reddit-pixel";
import { TrialLink } from "@/components/trial-link";
import { buttonClass } from "@/components/ui/button";
import { Row } from "@/components/ui/row";
import { Split } from "@/components/motion/split";

/**
 * A sunken Panel row with the three plans as white cells raised out of it,
 * ruled into the sheet rather than floated as cards. The price is the
 * readout, Bricolage 800 at the largest size it reaches outside the
 * statement, because a number that matters is never body copy.
 *
 * The interval switch is the console's segmented control: a Panel track, the
 * chosen segment white with the thumb shadow. Solo and Studio route to
 * sign-up, where the plan is picked and the trial starts; House is arranged
 * by hand, so it routes to a conversation.
 */

const INTERVALS: { key: Interval; label: string }[] = [
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

export function Pricing() {
  const [interval, setInterval] = useState<Interval>("monthly");
  const yearly = interval === "yearly";
  const sectionRef = useRef<HTMLDivElement>(null);

  // ViewContent once per visit, once the plans have climbed a quarter of the
  // way up the screen. A rootMargin rather than a threshold: on a phone the
  // row is taller than four screens and would never reach a quarter visible.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            trackMetaEvent("ViewContent", { content_name: "pricing" });
            trackRedditEvent("ViewContent");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Row id="pricing" labelledBy="pricing-title" band="panel">
      <div
        ref={sectionRef}
        data-reveal
        className="grid gap-x-12 gap-y-6 px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12 lg:grid-cols-12 lg:items-end lg:px-12"
      >
        <h2
          id="pricing-title"
          className="headline m-0 max-w-[16ch] text-headline text-ink lg:col-span-7"
        >
          <Split text="Cheaper than an hour of your time." />
        </h2>
        <div
          className="reveal-rise flex flex-col items-start gap-5 lg:col-span-5"
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          <p className="m-0 max-w-[40ch] text-body text-ink-secondary">
            Australian dollars, GST included. {TRIAL_DAYS} days free on Solo and
            Studio, no card. Pay yearly and get two months free.
          </p>
          <fieldset className="m-0 inline-flex items-center gap-[3px] rounded-md border-0 bg-panel-hover p-1">
            <legend className="sr-only">Billing interval</legend>
            {INTERVALS.map((option) => {
              const on = option.key === interval;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setInterval(option.key)}
                  className={`rounded-sm px-3.5 py-2 text-ui font-semibold transition-colors duration-[var(--duration-base)] ${
                    on
                      ? "bg-page text-ink shadow-thumb"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </fieldset>
        </div>
      </div>

      <div
        data-arby-perch="pricing"
        className="cell-rule-t grid lg:grid-cols-3"
      >
        {TIERS.map((tier, i) => (
          <div
            key={tier.name}
            className={`develop flex flex-col bg-page px-5 py-8 sm:px-8 sm:py-10 lg:px-8 xl:px-10 ${
              i > 0 ? "border-t border-rule lg:border-t-0 lg:border-l" : ""
            }`}
            style={{ "--develop-at": `${i * 1.5}%` } as React.CSSProperties}
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="headline m-0 text-page-title text-ink">
                {tier.name}
              </h3>
              {tier.enterprise ? (
                <span className="mono-label rounded-sm bg-cornflower-wash px-2 py-1.5 font-semibold text-cornflower-ink">
                  Enterprise
                </span>
              ) : null}
            </div>
            <p className="m-0 mt-3 max-w-[34ch] text-body text-ink-secondary lg:min-h-[4.5em]">
              {tier.who}
            </p>

            <div className="mt-8 flex flex-col justify-end lg:min-h-[6.25rem]">
              {tier.price === null ? (
                <span className="headline text-page-title text-ink">
                  By arrangement
                </span>
              ) : (
                <span
                  key={interval}
                  className="headline animate-flip text-readout text-ink tabular-nums"
                >
                  $
                  {yearly
                    ? tier.price.yearly.toLocaleString("en-AU")
                    : tier.price.monthly}
                </span>
              )}
              <span className="mono-label mt-2 text-ink-muted">
                {tier.price === null
                  ? "email us"
                  : yearly
                    ? "AUD a year"
                    : "AUD a month"}
              </span>
            </div>

            <div className="mt-6">
              {tier.enterprise ? (
                <Link
                  href={`/contact?topic=${encodeURIComponent(CONTACT_TOPICS[1])}`}
                  className={buttonClass("secondary", "md", "w-full")}
                >
                  Talk to us
                </Link>
              ) : (
                <TrialLink size="md" className="w-full" />
              )}
            </div>

            <p className="mono-label m-0 mt-6 text-ink-muted">
              {tier.limits.join(" · ")}
            </p>
            <ul className="m-0 mt-3 list-none p-0">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 border-t border-line py-2.5 text-body text-ink"
                >
                  <Check
                    aria-hidden
                    className="mt-[0.2em] size-4 shrink-0 text-sprout-ink"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="cell-rule-t m-0 px-5 py-6 text-body text-ink-secondary sm:px-8 lg:px-12">
        Studio grows past eight people at ${EXTRA_SEAT.monthly} a month per
        seat, or ${EXTRA_SEAT.yearly} a year. Yearly is ten months for the price
        of twelve. One trial per person, ever; the plan you pick at sign-up
        applies from day one, and billing starts when the trial ends.
      </p>
    </Row>
  );
}
