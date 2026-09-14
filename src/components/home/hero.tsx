"use client";

import { useEffect, useRef, useState } from "react";
import { TRIAL_DAYS } from "@/content/site";
import { CategorySlab } from "@/components/home/category-slab";
import { TrialLink } from "@/components/trial-link";

/**
 * The hero is three things: the headline, one lead, one button. Natural
 * height, even rhythm, and the stage rail sits straight under it so the page
 * reads headline, ask, board. The category slab is the only thing that moves.
 */

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

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(section);

  return (
    <section
      ref={section}
      className="on-dark bg-bottle px-6 pt-14 pb-16 sm:px-10 sm:pt-20 sm:pb-24"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* The floor of the clamp is set by the longest category name: any
            bigger and "Photographers." runs past the edge of a 375px phone,
            and the slab cannot wrap mid-word to save it. */}
        <h1 className="m-0 flex flex-wrap items-baseline gap-x-[0.24em] font-display text-[clamp(34px,8.4vw,96px)] leading-[0.92] font-extrabold tracking-[-0.045em] text-acid">
          <span className="whitespace-nowrap">Book it. Run it.</span>
          <span className="whitespace-nowrap">Bank it.</span>
          <span className="whitespace-nowrap">Built for</span>
          <span className="whitespace-nowrap">
            <CategorySlab onScreen={onScreen} />.
          </span>
        </h1>

        <p className="m-0 mt-10 max-w-[44ch] text-[17px] leading-relaxed text-cream/85 sm:mt-12 sm:text-[19px]">
          The sales CRM and project manager that wedding vendors keep open all
          day. One record carries a job from &ldquo;are you free?&rdquo; to the
          final invoice.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-10">
          <TrialLink
            variant="acid"
            size="xl"
            className="hover:rotate-[-1deg]"
          />
          <p className="label-mono m-0 text-acid/70">
            {TRIAL_DAYS} days free · no card
          </p>
        </div>
      </div>
    </section>
  );
}
