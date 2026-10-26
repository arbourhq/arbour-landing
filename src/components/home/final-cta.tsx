import { TrialLink } from "@/components/trial-link";
import { Row } from "@/components/ui/row";
import { Split } from "@/components/motion/split";
import { TRIAL_DAYS } from "@/content/site";

/**
 * The close. The sheet turns Bottle from here to the foot of the page, the
 * way the console floods a booking's header: the last headline in on-dark,
 * hard left, and the one Sprout action on the page's final screen. Nothing
 * else in the row; the footer under it carries the mark.
 */
export function FinalCta() {
  return (
    <Row band="bottle" labelledBy="close-title">
      <div
        data-reveal
        className="px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20 lg:px-12"
      >
        <h2
          id="close-title"
          className="headline m-0 max-w-[14ch] text-[clamp(2.5rem,1rem+5.4vw,5.5rem)] leading-[0.9] text-on-dark"
        >
          <Split text="Have the Saturday. We’ll take the rest." />
        </h2>
        <div
          className="reveal-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
          style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
        >
          <TrialLink variant="sprout" size="lg" />
          <span className="mono-label text-on-dark/70">
            {TRIAL_DAYS} days free · no card · one of us on support
          </span>
        </div>
      </div>
    </Row>
  );
}
