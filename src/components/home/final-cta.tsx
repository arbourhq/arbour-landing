import { ArbourA } from "@/components/wordmark";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";

/**
 * The bundle's version had 88px of top padding and 0 at the bottom with an
 * empty trailing div, so the Acid flood stopped dead against the footer. This
 * one closes properly on its own padding.
 *
 * The A is the only piece of geometry the brand owns and it appears at 26px in
 * the nav and nowhere else at size, so the page signs off with it: Bottle mark
 * on an Acid ground, which is one of the three legal pairings, flat and at full
 * strength rather than a faded watermark.
 *
 * It is xl only, and the size and offset are chosen so it starts clear of the
 * 16ch headline. Bottle type over a Bottle mark is invisible, so if the copy
 * grows, move the mark, do not fade it.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-24">
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="relative mx-auto h-full max-w-[1180px]">
          {/* ArbourA sets aria-hidden itself. */}
          <ArbourA className="absolute top-1/2 right-[-40px] h-[420px] w-auto -translate-y-1/2 text-bottle" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        <h2 className="m-0 max-w-[16ch] font-display text-[clamp(40px,8.5vw,88px)] leading-[0.86] font-extrabold tracking-[-0.04em] text-bottle">
          Have the Saturday. We&rsquo;ll take the rest.
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-5 pt-8">
          <WaitlistButton
            variant="bottle"
            size="lg"
            className="hover:rotate-[-1.5deg]"
          >
            Join the waitlist
          </WaitlistButton>
          <span className="label-mono max-w-[34ch] leading-relaxed">
            No card · no demo call · one email when it opens
          </span>
        </div>
      </div>
    </section>
  );
}
