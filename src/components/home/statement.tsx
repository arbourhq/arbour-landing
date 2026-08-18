import { Reveal } from "@/components/reveal";

/**
 * The page's single 150px moment, and the only place on the site that touches
 * the top of the type scale. Everything else now tops out at 88, so this has to
 * stay the one. If a second one turns up, one of them is wrong.
 *
 * It sits here because it is the punchline to the six panels above it: that
 * section lists what stops being your job, this is what is left over. No
 * number, because it is a breath between chapters rather than a chapter.
 */
export function Statement() {
  return (
    <section className="on-dark overflow-hidden bg-bottle px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="m-0 font-display text-[clamp(56px,15vw,150px)] leading-[0.86] font-extrabold tracking-[-0.04em] text-acid">
            Nothing needs you.
          </p>
          <p className="mt-7 max-w-[44ch] text-[17px] leading-relaxed text-cream/75">
            Genuinely. The follow-ups went out on Tuesday, the deposit cleared
            on Wednesday, the run sheet is with the venue. Go and have a coffee
            that is not from the servo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
