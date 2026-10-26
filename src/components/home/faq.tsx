"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/content/faq";
import { Row } from "@/components/ui/row";
import { Split } from "@/components/motion/split";

/**
 * Two cells of the sheet: the heading holds the left column (and stays in
 * view beside a long answer on a desktop), the questions are hairline rows
 * in the right. Each row is a disclosure: a 600-weight question with the
 * console's chevron, the answer opening under it at reading width.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Row id="faq" labelledBy="faq-title">
      <div className="grid lg:grid-cols-12">
        <div
          data-reveal
          className="px-5 pt-16 pb-8 sm:px-8 sm:pt-24 lg:col-span-4 lg:px-12 lg:pb-24"
        >
          <h2
            id="faq-title"
            className="headline m-0 max-w-[12ch] text-headline text-ink lg:sticky lg:top-[calc(var(--nav-h)+var(--nav-gap)*2+2rem)]"
          >
            <Split text="Reasonable questions" />
          </h2>
        </div>

        <div className="cell-rule-t lg:col-span-8 lg:border-t-0 lg:border-l lg:border-rule lg:pt-12 lg:pb-16">
          <ul
            data-arby-perch="faq"
            className="m-0 list-none p-0 lg:border-y lg:border-rule"
          >
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li key={faq.q} className={i > 0 ? "border-t border-rule" : ""}>
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="group flex w-full items-center gap-5 px-5 py-5 text-left transition-colors duration-[var(--duration-base)] hover:bg-panel sm:px-8 lg:px-10"
                    >
                      <span className="flex-1 text-lead font-semibold text-ink">
                        {faq.q}
                      </span>
                      <ChevronDown
                        aria-hidden
                        className={`size-4 shrink-0 text-ink-muted transition-transform duration-[var(--duration-pop)] ease-overshoot group-hover:text-ink ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${i}`}
                    data-arby-avoid
                    hidden={!isOpen}
                    className="animate-swap px-5 pb-7 sm:px-8 lg:px-10"
                  >
                    <p className="m-0 max-w-[62ch] text-body text-ink-secondary">
                      {faq.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Row>
  );
}
