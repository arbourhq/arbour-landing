"use client";

import { useState } from "react";
import { FAQS } from "@/content/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[940px]">
        <h2 className="m-0 mb-9 font-display text-[clamp(30px,5vw,48px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-ink">
          Reasonable questions
        </h2>

        <div className="grid gap-px bg-ink/20">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="bg-cream">
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent px-1 py-6 text-left font-sans text-[17px] font-semibold text-ink sm:text-[19px]"
                  >
                    {faq.q}
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
                    className="max-w-[62ch] px-1 pb-6 text-[16px] leading-relaxed opacity-80"
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
