"use client";

import { useState } from "react";
import { FAQS } from "@/content/faq";
import { Reveal } from "@/components/reveal";

/**
 * Built as the same ledger as Pricing. The question and its answer sit on
 * different axes: the question owns the left half of the row and the marker
 * lands on the midline, the answer opens in the right half. Closed rows leave
 * that half empty on purpose.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <h2 className="m-0 mb-12 max-w-[22ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
            Reasonable questions
          </h2>
        </Reveal>

        <div className="-mx-3 border-b border-ink/20 sm:-mx-6">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className="grid grid-cols-1 border-t border-ink/20 transition-colors duration-200 hover:bg-acid lg:grid-cols-2"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full cursor-pointer items-baseline gap-5 border-0 bg-transparent px-3 py-7 text-left font-sans text-ink sm:px-6"
                  >
                    <span className="flex-1 text-[17px] leading-snug font-semibold sm:text-[20px]">
                      {faq.q}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      focusable="false"
                      className={`h-4 w-4 shrink-0 self-center transition-transform duration-300 ease-overshoot ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    >
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={`faq-answer-${i}`}
                  hidden={!isOpen}
                  className="max-w-[56ch] px-3 pb-7 text-[15px] leading-relaxed opacity-80 sm:px-6 lg:pt-7 lg:pr-6 lg:pl-0"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
