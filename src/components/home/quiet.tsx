"use client";

import Image from "next/image";
import { useCategory } from "@/components/category-context";
import { ArbySheet } from "@/components/home/arby-sheet";
import { CaptureFrame } from "@/components/home/capture-frame";
import { NeedsYou } from "@/components/home/needs-you";
import { Reserve } from "@/components/ui/reserve";
import { Row } from "@/components/ui/row";
import { Split } from "@/components/motion/split";
import { PRODUCT } from "@/content/product";
import { CATEGORIES } from "@/content/categories";
import { AUTOMATION_CAPTURE } from "@/content/stages";
import { standing } from "@/components/arby/poses/standing";

/**
 * The page's one statement, and the punchline to the five stages above it:
 * that is what the product does, this is what is left for you. In the book
 * it closes the story: the job's book shuts, paid, and is laid on the pile
 * with the season's others, its ribbon hanging out of the tail.
 */
export function Statement() {
  return (
    <Row id="statement" labelledBy="quiet-title" className="statement-row">
      <div
        data-reveal
        className="px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16 lg:px-12"
      >
        <h2
          id="quiet-title"
          className="headline m-0 text-statement text-ink [text-wrap:initial]"
        >
          <Split text="Nothing needs you." />
        </h2>
        {/* The flat page's ending: the same pile the book is laid on,
            rendered from the book itself. Decorative. */}
        <Image
          src="/book/stills/pile.webp"
          alt=""
          aria-hidden="true"
          width={1416}
          height={1010}
          sizes="(min-width: 1024px) 832px, 100vw"
          className="flat-only mt-8 ml-auto block h-auto w-full max-w-[52rem] sm:mt-10"
        />
      </div>
    </Row>
  );
}

/**
 * Under the statement, in three ruled rows, the three things that make the
 * line true, each beside the screen that proves it: the overview's Needs you
 * block running down to empty, an automation rule (written for the chosen
 * category) beside the real automations screen, and Arby beside the real
 * Arby sheet, shown whole (see ArbySheet).
 *
 * The standing bird in the Arby row opens Arby Help, the same chat as the
 * launcher at the foot of the window (src/components/arby/arby-launcher).
 */

const AUTOMATION_WHENS = CATEGORIES.map((c) => c.automation.when);
const AUTOMATION_THENS = CATEGORIES.map((c) => c.automation.then);

const CELL_TEXT = "px-5 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:px-12 lg:py-12";
const CELL_MEDIA =
  "cell-rule-t bg-panel p-3 sm:p-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:border-rule lg:p-8";

export function Quiet() {
  const { category } = useCategory();

  return (
    <Row still>
      <div className="grid lg:grid-cols-12">
        <div className={`develop ${CELL_TEXT}`}>
          <p className="m-0 max-w-[46ch] text-lead text-ink-secondary">
            {PRODUCT.overview}
          </p>
        </div>
        <div
          className={`develop ${CELL_MEDIA}`}
          style={{ "--develop-at": "3%" } as React.CSSProperties}
        >
          <NeedsYou />
        </div>
      </div>

      <div className="cell-rule-t grid lg:grid-cols-12">
        <div className={`develop flex flex-col gap-6 ${CELL_TEXT}`}>
          <div>
            <h3 className="headline m-0 text-section text-ink">Automations</h3>
            <p className="m-0 mt-3 max-w-[46ch] text-body text-ink-secondary">
              {PRODUCT.automations}
            </p>
          </div>

          <div
            key={category.name}
            className="animate-swap overflow-hidden rounded-md border border-border-default bg-page"
          >
            <div className="flex items-baseline gap-3 px-4 py-3">
              <span className="mono-label w-9 shrink-0 text-ink-muted">
                When
              </span>
              <span className="text-ui text-ink">
                <Reserve
                  text={category.automation.when}
                  all={AUTOMATION_WHENS}
                />
              </span>
            </div>
            <div className="flex items-baseline gap-3 border-t border-line px-4 py-3">
              <span className="mono-label w-9 shrink-0 text-ink-muted">
                Then
              </span>
              <span className="text-ui text-ink">
                <Reserve
                  text={category.automation.then}
                  all={AUTOMATION_THENS}
                />
              </span>
            </div>
            <p className="m-0 border-t border-line bg-panel px-4 py-2.5 text-caption text-ink-muted">
              A rule written for {category.name}. Illustrative.
            </p>
          </div>
        </div>
        <div
          className={`develop ${CELL_MEDIA}`}
          style={{ "--develop-at": "3%" } as React.CSSProperties}
        >
          <CaptureFrame
            capture={AUTOMATION_CAPTURE}
            sizes="(max-width: 1024px) calc(100vw - 48px), 720px"
            caption="Real screen, seed data · Automations"
            figure="Fig. 06"
          />
        </div>
      </div>

      <div className="cell-rule-t grid lg:grid-cols-12">
        <div className={`develop ${CELL_TEXT}`}>
          <button
            type="button"
            aria-label="Open Arby Help"
            aria-haspopup="dialog"
            aria-controls="arby-help"
            onClick={() => window.dispatchEvent(new Event("arby-help-open"))}
            className="arby-static mb-6 flex w-fit items-end rounded-md border border-border-default bg-bottle-wash px-4 pt-1 transition-transform duration-[var(--duration-pop)] ease-overshoot hover:-translate-y-[3px]"
          >
            <svg
              viewBox="0 0 1000 1000"
              fill="none"
              aria-hidden="true"
              className="size-40"
            >
              {standing.render("arby-static")}
            </svg>
          </button>
          <h3 className="headline m-0 text-section text-ink">Arby</h3>
          <p className="m-0 mt-3 max-w-[46ch] text-body text-ink-secondary">
            {PRODUCT.arby}
          </p>
        </div>
        <div
          data-reveal
          className={`flex items-center justify-center ${CELL_MEDIA}`}
        >
          <ArbySheet className="reveal-rise w-full max-w-[24rem]" />
        </div>
      </div>
    </Row>
  );
}
