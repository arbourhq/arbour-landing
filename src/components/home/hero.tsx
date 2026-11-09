"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SITE, TRIAL_DAYS, WEDDING_CRM_LINK } from "@/content/site";
import { CategorySelect } from "@/components/home/category-select";
import Image from "next/image";
import { TrialLink } from "@/components/trial-link";
import { Row } from "@/components/ui/row";
import { Scramble } from "@/components/motion/scramble";
import { Split } from "@/components/motion/split";

/**
 * The first row of the sheet. The headline runs the full column with the
 * category as a select inside it; under it, the lead and the one Sprout
 * action. In the book the rest of the first screen is the book itself,
 * drawn behind the row: shut, huge, bleeding off the bottom right, the
 * chosen category debossed on its cover. On the flat page a still of the
 * same book sits in that cell.
 *
 * The row plays on load rather than on scroll (`reveal-now`): the headline
 * sets in word by word with the select landing last, then the lead and the
 * action rise, and the book drops in and riffles once it has loaded.
 */

/** True while the hero is on screen and the tab is in front. */
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
  const heading = useRef<HTMLHeadingElement>(null);
  const onScreen = useOnScreen(heading);

  return (
    <Row
      first
      labelledBy="hero-title"
      className="hero-row pt-[calc(var(--nav-h)+var(--nav-gap))]"
    >
      <div className="reveal-now px-5 pt-8 pb-7 sm:px-8 sm:pt-16 sm:pb-12 lg:px-12 lg:pt-14 lg:pb-10">
        {/* Four groups that never break inside, so a line only ever breaks
            between them and the select is never split from its stop. */}
        <h1
          ref={heading}
          id="hero-title"
          className="headline m-0 flex flex-wrap items-baseline gap-x-[0.24em] gap-y-[0.08em] text-hero text-ink max-sm:text-[clamp(1.875rem,9.2vw,3.5rem)]"
        >
          <span className="whitespace-nowrap">
            <Split text="Book it. Run it." />
          </span>
          <span className="whitespace-nowrap">
            <Split text="Bank it." from={4} />
          </span>
          <span className="whitespace-nowrap">
            <Split text="Built for" from={6} />
          </span>
          <span
            className="split-word whitespace-nowrap max-sm:basis-full max-sm:text-[min(1em,8.6vw)]"
            style={{ "--i": 8 } as React.CSSProperties}
          >
            <CategorySelect onScreen={onScreen} />.
          </span>
        </h1>
      </div>

      <div className="reveal-now cell-rule-t grid lg:grid-cols-12">
        <div
          data-hero-copy
          className="reveal-rise flex flex-col gap-5 px-5 py-7 sm:gap-7 sm:px-8 sm:py-10 lg:col-span-7 lg:px-12 lg:py-9"
          style={{ "--reveal-delay": "380ms" } as React.CSSProperties}
        >
          <p className="m-0 max-w-[44ch] text-lead text-ink-secondary sm:text-[1.1875rem] sm:leading-[1.5]">
            {SITE.introduction}
          </p>
          {/* The action, what it costs, and the one way sideways, on one row
              from 640px so the copy leaves the book the room beside it. */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-y-2">
            <TrialLink variant="sprout" size="lg" />
            <Scramble
              text={`${TRIAL_DAYS} days free · no card`}
              delay={700}
              className="mono-label m-0 text-ink-muted"
            />
            <Link
              href={WEDDING_CRM_LINK.href}
              className="text-ui font-semibold text-bottle underline underline-offset-4 hover:text-bottle-deep max-sm:mt-3 max-sm:self-start sm:ml-3"
            >
              {WEDDING_CRM_LINK.label}
            </Link>
          </div>
        </div>
        <div
          className="flat-only reveal-wipe cell-rule-t flex items-center justify-center p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-rule"
          style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
        >
          {/* The book, shut, rendered from the 3D scene. Decorative. */}
          <Image
            src="/book/stills/hero.webp"
            alt=""
            aria-hidden="true"
            width={1273}
            height={755}
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className="block h-auto w-full max-w-[30rem]"
          />
        </div>
      </div>
    </Row>
  );
}
