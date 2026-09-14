"use client";

import { useCategory } from "@/components/category-context";
import { CaptureFrame } from "@/components/home/capture-frame";
import { Reveal } from "@/components/reveal";
import { Reserve } from "@/components/ui/reserve";
import { CATEGORIES } from "@/content/categories";
import { AUTOMATION_CAPTURE } from "@/content/stages";

/**
 * The page's single 150px moment, and the only place on the site that touches
 * the top of the type scale. It is the punchline to the five stages above it:
 * that is what the product does, this is what is left for you.
 *
 * Under it, the two things that make the line true: automations, with the
 * chosen category's example, and Arby.
 */

const AUTOMATION_WHENS = CATEGORIES.map((c) => c.automation.when);
const AUTOMATION_THENS = CATEGORIES.map((c) => c.automation.then);

export function Quiet() {
  const { category } = useCategory();

  return (
    <section className="overflow-hidden bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <h2 className="m-0 font-display text-[clamp(56px,15vw,150px)] leading-[0.86] font-extrabold tracking-[-0.04em] text-bottle">
            Nothing needs you.
          </h2>
          <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-bottle/85">
            Genuinely. The overview counts what is waiting on a person:
            enquiries without a reply, contracts out for signature, overdue
            invoices, run sheets due. When a count is zero the row is not there
            at all, and the rail says so. Go and have a coffee that is not from
            the servo.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-y-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="lg:border-r lg:border-bottle/25 lg:pr-9">
              <CaptureFrame
                capture={AUTOMATION_CAPTURE}
                tone="bottle"
                sizes="(max-width: 1024px) 100vw, 720px"
                caption="Real screen, seed data · Automations"
              />
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="flex flex-col gap-8 lg:pl-9">
              <div>
                <span className="mb-4 block h-[26px] w-[26px] origin-bottom-left animate-pop bg-bottle" />
                <h3 className="m-0 mb-2 font-display text-[24px] font-extrabold tracking-[-0.03em]">
                  Automations
                </h3>
                <p className="m-0 text-[15px] leading-relaxed text-bottle/85">
                  One sentence with three parts: when this happens, only if
                  these match, then do this. Five rules ship with every
                  organisation. Write your own: move a stage, email the client,
                  nudge the team, call a webhook, wait a while.
                </p>
              </div>

              <div
                key={category.name}
                className="on-dark grid animate-swap gap-px bg-acid/25 press-dark"
              >
                <div className="flex items-baseline gap-2.5 bg-bottle px-3.5 py-3">
                  <span className="label-mono shrink-0 text-acid">When</span>
                  <span className="text-[13px] leading-snug text-cream">
                    <Reserve
                      text={category.automation.when}
                      all={AUTOMATION_WHENS}
                    />
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 bg-bottle px-3.5 py-3">
                  <span className="label-mono shrink-0 text-acid/70">Then</span>
                  <span className="text-[13px] leading-snug text-cream">
                    <Reserve
                      text={category.automation.then}
                      all={AUTOMATION_THENS}
                    />
                  </span>
                </div>
                <p className="m-0 bg-bottle px-3.5 py-2.5 text-[11px] leading-snug text-cream/60">
                  A rule written for {category.name}. Illustrative.
                </p>
              </div>

              <div>
                <h3 className="m-0 mb-2 font-display text-[24px] font-extrabold tracking-[-0.03em]">
                  Arby
                </h3>
                <p className="m-0 text-[15px] leading-relaxed text-bottle/85">
                  Ask who is booked in March or which invoices are overdue and
                  get the answer without hunting for the screen. Arby reads only
                  what your role can already see, and it changes nothing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
