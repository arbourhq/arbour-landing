import { WaitlistButton } from "@/components/waitlist/waitlist-button";

/**
 * The bundle's version had 88px of top padding and 0 at the bottom with an
 * empty trailing div, so the Acid flood stopped dead against the footer. This
 * one closes properly on its own padding.
 */
export function FinalCta() {
  return (
    <section className="overflow-hidden bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="m-0 max-w-[16ch] font-display text-[clamp(40px,8.5vw,104px)] leading-[0.86] font-extrabold tracking-[-0.05em] text-bottle">
          Your Saturday is waiting.
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
