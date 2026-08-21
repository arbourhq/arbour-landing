"use client";

import { useState } from "react";
import { FAQS } from "@/content/faq";
import { SectionHead } from "@/components/section-head";

/**
 * Numbered 07 and built as the same ledger as Pricing. It used to be the only
 * section on the page with no number, no colour and a narrower column, sitting
 * immediately before the close, which made the last thing before the call to
 * action read like an afterthought.
 *
 * The question and its answer sit on different axes: the question owns the left
 * half of the row and the marker lands on the midline, the answer opens in the
 * right half. Closed rows leave that half empty on purpose.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          index="07"
          label="Before you ask"
          title="Reasonable questions"
          className="mb-12"
        />

        {/* Bleeds past the text column so the hover flood has room either side
            of the row, same as the pricing ledger. */}
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
                    <span className="label-mono shrink-0 pt-1 opacity-45 tabular-nums">
                      {`07.${i + 1}`}
                    </span>
                    <span className="flex-1 text-[17px] leading-snug font-semibold sm:text-[20px]">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-block shrink-0 font-mono text-lg transition-transform duration-300 ease-overshoot ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {isOpen ? (
                  <div
                    id={`faq-answer-${i}`}
                    className="max-w-[56ch] px-3 pb-7 text-[15px] leading-relaxed opacity-80 sm:px-6 lg:pt-7 lg:pr-6 lg:pl-0"
                  >
                    {faq.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
