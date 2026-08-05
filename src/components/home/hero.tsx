"use client";

import { HERO_CATEGORIES } from "@/content/categories";
import { useCategory } from "@/components/category-context";
import { HeroMock } from "@/components/product/hero-mock";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";
import { buttonClass } from "@/components/ui/button";

export function Hero() {
  const { category, index, setIndex } = useCategory();

  return (
    <section className="on-dark relative bg-bottle px-6 pt-16 sm:px-10">
      <div className="mx-auto max-w-[1180px]">
        {/* 0.95, not the usual 0.85: the tail of the y in Saturday and the dot
            of the i in isn't sit in the same column. Measured against the real
            font, the ink separates at 0.93 and 0.95 leaves about 2px of air.
            Recheck if the copy changes. */}
        <h1 className="m-0 max-w-[19ch] font-display text-[clamp(44px,9vw,112px)] leading-[0.95] font-extrabold tracking-[-0.05em] text-balance text-acid">
          Saturday&rsquo;s busy. Sunday isn&rsquo;t.
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 pt-8 pb-11">
          <p className="m-0 max-w-[46ch] text-[17px] leading-relaxed text-acid sm:text-[19px]">
            From &ldquo;Are you free?&rdquo; to the final invoice. One place for
            enquiries, quotes, contracts, deposits, run sheets, and the couple
            who went quiet in March. Built for nothing except weddings.
          </p>

          {/* shrink-0 only once there is room for it: at 390px it forces the
              row past the viewport and gives the page a horizontal scroll. */}
          <div className="flex flex-wrap gap-3.5 sm:shrink-0">
            <WaitlistButton
              variant="acid"
              size="lg"
              presetCategory={category.name}
              className="hover:rotate-[-1deg]"
            >
              Join the waitlist
            </WaitlistButton>
            <a
              href="#building"
              className={buttonClass(
                "outlineAcid",
                "lg",
                "hover:rotate-[1deg]",
              )}
            >
              See what we&rsquo;re building
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-10">
          <span className="label-mono mr-2 text-acid/70">Pick yours</span>
          {HERO_CATEGORIES.map(({ category: cat, index: i }) => {
            const on = i === index;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={on}
                className={`cursor-pointer border-0 px-3.5 py-2.5 font-sans text-sm font-semibold transition-transform duration-300 ease-overshoot ${
                  on
                    ? "-translate-y-[3px] bg-acid text-bottle"
                    : "bg-transparent text-acid shadow-[inset_0_0_0_1.5px_rgba(198,255,61,0.55)] hover:-translate-y-1 hover:rotate-[-1.5deg]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <HeroMock category={category} />
      </div>
    </section>
  );
}
