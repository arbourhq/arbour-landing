"use client";

import { useEffect, useRef, useState } from "react";
import { STAGES, type Accent } from "@/content/stages";
import { TRIAL_DAYS } from "@/content/site";
import { useCategory } from "@/components/category-context";
import { CategorySlab } from "@/components/home/category-slab";
import { TrialLink } from "@/components/trial-link";
import { buttonClass } from "@/components/ui/button";

/**
 * The hero fills the viewport and ends at the board's column headers: the
 * stage rail sits on its foot, tall, and squashes into the sticky rail as the
 * reader scrolls into stage 01 (see stage-rail.tsx).
 *
 * Above the rail, the board itself, drawn in the brand's own squares: five
 * columns on the rail's own grid, each stacked with one card per job in the
 * chosen category's book, in that stage's accent. Pick another category and
 * the stacks re-deal with the overshoot. It is a kanban standing on its
 * headers, and it is labelled illustrative because the book is invented.
 */

/** The most cards a column draws. The count above it is always the truth. */
const CAP = 12;

const CARD: Record<Accent, string> = {
  cornflower: "bg-cornflower",
  lilac: "bg-lilac",
  acid: "bg-acid",
  coral: "bg-coral",
};

/**
 * True while the hero is on screen and the tab is in front, so the category
 * cycle stops the moment nobody can see it.
 */
function useOnScreen(ref: React.RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(false);
  const intersecting = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setOnScreen(intersecting.current && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting.current = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);

  return onScreen;
}

function Board() {
  const { category } = useCategory();

  return (
    <div className="mt-10 sm:px-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p key={category.name} className="label-mono animate-swap text-acid">
          Your board · {category.name}
        </p>
        <p className="label-mono text-cream/55">
          One job per card · illustrative
        </p>
      </div>

      {/* Same five columns as the rail below, so each stack stands on its
          own header. Keyed on the category so a change re-deals the cards. */}
      <ol
        key={category.name}
        aria-label={`Illustrative board for ${category.name}`}
        className="m-0 grid list-none grid-cols-5 items-end gap-x-px p-0"
      >
        {STAGES.map((stage, i) => {
          const count = category.stageCounts[i];
          const cards = Math.min(count, CAP);
          return (
            <li
              key={stage.id}
              className="flex flex-col items-start justify-end gap-1 px-2.5 sm:px-4"
            >
              <span className="mb-1.5 font-display text-[clamp(22px,3vw,32px)] leading-none font-extrabold tracking-[-0.04em] text-acid tabular-nums">
                {count}
                <span className="sr-only"> in {category.stages[i]}</span>
              </span>
              {Array.from({ length: cards }, (_, j) => (
                <span
                  key={j}
                  aria-hidden="true"
                  style={{ animationDelay: `${(cards - j) * 28}ms` }}
                  className={`block h-[9px] w-full max-w-[72px] animate-flip origin-bottom sm:h-[11px] ${CARD[stage.accent]} ${
                    j === 0 ? "" : "opacity-85"
                  }`}
                />
              ))}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(section);

  return (
    <section
      ref={section}
      className="on-dark relative flex flex-col bg-bottle px-6 pt-10 pb-5 sm:px-10 sm:pt-12 lg:min-h-[calc(100svh-var(--nav-h,70px)-var(--rail-tall,96px))]"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col">
        {/* The floor of the clamp is set by the longest category name: any
            bigger and "Photographers." runs past the edge of a 375px phone,
            and the slab cannot wrap mid-word to save it. */}
        <h1 className="m-0 font-display text-[clamp(34px,8.4vw,92px)] leading-[0.92] font-extrabold tracking-[-0.045em] text-acid">
          <span className="block">
            <span className="whitespace-nowrap">Book it. Run it.</span>{" "}
            <span className="whitespace-nowrap">Bank it.</span>
          </span>
          <span className="mt-[0.12em] flex flex-wrap items-baseline gap-x-[0.22em]">
            <span>Built for</span>
            <span className="whitespace-nowrap">
              <CategorySlab onScreen={onScreen} />.
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <p className="m-0 max-w-[40ch] text-[17px] leading-relaxed text-acid sm:text-[19px]">
            The sales CRM and project manager that wedding vendors keep open all
            day. One record carries a job from &ldquo;are you free?&rdquo; to
            the final invoice.
          </p>

          <div className="lg:justify-self-end">
            <div className="flex flex-wrap gap-3.5">
              <TrialLink
                variant="acid"
                size="lg"
                className="hover:rotate-[-1deg]"
              />
              <a
                href="#stage-enquiry"
                className={buttonClass(
                  "outlineAcid",
                  "lg",
                  "hover:rotate-[1deg]",
                )}
              >
                See the board
              </a>
            </div>
            <p className="label-mono mt-4 text-acid/70">
              {TRIAL_DAYS} days free · no card · Australian dollars, GST
              included
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <Board />
        </div>
      </div>
    </section>
  );
}
