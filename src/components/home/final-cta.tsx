import { ArbourA } from "@/components/wordmark";
import { TrialLink } from "@/components/trial-link";
import { TRIAL_DAYS } from "@/content/site";

/**
 * The A is the only piece of geometry the brand owns and it appears at 26px in
 * the nav and nowhere else at size, so the page signs off with it: Bottle mark
 * on an Acid ground, flat and at full strength.
 *
 * It is xl only, sized and offset so it starts clear of the 16ch headline.
 * Bottle type over a Bottle mark is invisible, so if the copy grows, move the
 * mark, do not fade it.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-24">
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="relative mx-auto h-full max-w-[1180px]">
          <ArbourA className="absolute top-1/2 right-[-40px] h-[420px] w-auto -translate-y-1/2 text-bottle" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        <h2 className="m-0 max-w-[16ch] font-display text-[clamp(40px,8.5vw,88px)] leading-[0.86] font-extrabold tracking-[-0.04em] text-bottle">
          Have the Saturday. We&rsquo;ll take the rest.
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-5 pt-8">
          <TrialLink
            variant="bottle"
            size="lg"
            className="hover:rotate-[-1.5deg]"
          />
          <span className="label-mono max-w-[34ch] leading-relaxed">
            {TRIAL_DAYS} days free · no card · one of us on support
          </span>
        </div>
      </div>
    </section>
  );
}
