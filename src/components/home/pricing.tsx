import Link from "next/link";
import { PRICING_NOTE, TIERS } from "@/content/pricing";
import { CONTACT_TOPICS } from "@/content/contact";
import { Reveal } from "@/components/reveal";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";
import { buttonClass } from "@/components/ui/button";

/**
 * Redesigned away from the three-card SaaS grid the bundle used. That layout
 * forced every tier into the same height, buried the House pitch in a bullet
 * list and looked like everyone else. This is a ledger: oversized type as
 * interface, hairlines doing the layout, and a whole row flooding on hover.
 *
 * No monthly/annual toggle: nothing can be billed yet, so there is nothing to
 * toggle. Every tier routes to the waitlist except House, which routes to a
 * conversation, because that one is a real conversation we can have today.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      className="on-dark bg-bottle px-6 py-20 text-cream sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div>
              <p className="eyebrow mb-5 text-acid/70">06 · Pricing</p>
              <h2 className="m-0 max-w-[16ch] font-display text-[clamp(34px,6.5vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-acid">
                Cheaper than an hour of your time.
              </h2>
            </div>
            {/* Mono is a label voice, never body copy, so the eyebrow is mono
                and the sentence under it is not. */}
            <div className="max-w-[34ch]">
              <p className="label-mono mb-2 text-acid/70">Not open yet</p>
              <p className="text-[15px] leading-relaxed text-cream/75">
                {PRICING_NOTE}
              </p>
            </div>
          </div>
        </Reveal>

        {/* The ledger bleeds past the text column so the hover flood has room
            either side of the row, while the content stays on the same left
            edge as the heading above it. */}
        <div className="mt-14 -mx-3 border-b border-cream/20 sm:-mx-6">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06}>
              <div className="group grid grid-cols-1 items-start gap-x-8 gap-y-6 border-t border-cream/20 px-4 py-9 transition-colors duration-200 hover:bg-acid hover:text-bottle sm:px-7 lg:grid-cols-[3rem_minmax(0,1.05fr)_minmax(0,1fr)_auto]">
                <div className="label-mono pt-3 text-cream/45 group-hover:text-bottle/55">
                  {tier.index}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="m-0 font-display text-[clamp(32px,5vw,44px)] leading-none font-extrabold tracking-[-0.04em] text-acid group-hover:text-bottle">
                      {tier.name}
                    </h3>
                    {tier.enterprise ? (
                      <span className="label-mono bg-cornflower px-2.5 py-1.5 text-[8px] text-cream">
                        Enterprise
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-cream/75 group-hover:text-bottle/80">
                    {tier.who}
                  </p>
                </div>

                <ul className="m-0 grid list-none gap-0 p-0">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-t border-cream/15 py-2.5 text-[15px] leading-snug first:border-t-0 first:pt-0 group-hover:border-bottle/20"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="flex items-baseline gap-2 lg:flex-col lg:items-end lg:gap-1">
                    {tier.price === null ? (
                      <span className="font-display text-[clamp(28px,4vw,38px)] leading-none font-extrabold tracking-[-0.04em] text-acid group-hover:text-bottle">
                        Built for you
                      </span>
                    ) : (
                      <span className="font-display text-[clamp(44px,6vw,64px)] leading-none font-extrabold tracking-[-0.045em] text-acid group-hover:text-bottle">
                        ${tier.price}
                      </span>
                    )}
                    <span className="label-mono text-cream/60 group-hover:text-bottle/65">
                      {tier.priceNote}
                    </span>
                    {/* Each tier row is its own grid, so the auto-sized price
                        column is measured per row: House's "Built for you" is
                        wider than "$39", which squeezed its feature column and
                        started that list further left than the other two. This
                        zero-height sizer gives the priced rows the same
                        intrinsic width, so all three lists share a left edge
                        without pinning the track to a magic pixel value. */}
                    {tier.price === null ? null : (
                      <span
                        aria-hidden="true"
                        className="-mt-1 hidden h-0 overflow-hidden font-display text-[clamp(28px,4vw,38px)] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap lg:block"
                      >
                        Built for you
                      </span>
                    )}
                  </div>

                  {tier.enterprise ? (
                    <Link
                      href={`/contact?topic=${encodeURIComponent(CONTACT_TOPICS[1])}`}
                      className={buttonClass(
                        "outlineAcid",
                        "sm",
                        "w-full justify-center lg:w-auto group-hover:shadow-[inset_0_0_0_2px_#0B4030] group-hover:text-bottle",
                      )}
                    >
                      Talk to us
                    </Link>
                  ) : (
                    <WaitlistButton
                      variant="acid"
                      size="sm"
                      className="w-full justify-center group-hover:bg-bottle group-hover:text-acid lg:w-auto"
                    >
                      Join the waitlist
                    </WaitlistButton>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-[15px] leading-relaxed text-cream/60">
          No card is being taken today. Nobody on the waitlist is charged
          anything until Arbour opens and they decide they want it.
        </p>
      </div>
    </section>
  );
}
