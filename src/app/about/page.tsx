import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Marquee } from "@/components/marquee";
import { ArbourA } from "@/components/wordmark";
import { Lenses } from "@/components/about/lenses";
import { AboutStats } from "@/components/about/counter";
import { buttonClass } from "@/components/ui/button";
import { FOUNDERS, RULES, TIMELINE } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arbour is built by two people: a wedding videographer and a software engineer. Here is what each of them thinks a wedding is.",
};

const MARQUEE_ITEMS = [
  "250+ weddings worked",
  "Seven years shipping software",
  "Zero investors",
];

export default function AboutPage() {
  return (
    <WaitlistProvider>
      <SiteNav />

      <main>
        <section className="bg-acid px-6 pt-16 pb-20 sm:px-10 sm:py-22">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-6 text-bottle">About</p>
            <h1 className="m-0 max-w-[19ch] font-display text-[clamp(44px,9vw,112px)] leading-[0.95] font-extrabold tracking-[-0.05em] text-balance text-bottle">
              The ultimate collab.
            </h1>
            <p className="m-0 max-w-[46ch] pt-8 text-[17px] leading-relaxed text-bottle sm:text-[19px]">
              What do you get when you cross a wedding videographer with a
              software engineer? This.
            </p>
          </div>
        </section>

        <Marquee
          items={MARQUEE_ITEMS}
          seconds={30}
          className="bg-bottle text-acid"
        />

        <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-5 opacity-55">01 · The two brains</p>
            {/* Wide enough to hold "Ask each of us what a wedding is." on one
                line at the 60px cap. At 22ch the measure cut after "wedding"
                and left "is." stranded on its own. */}
            <h2 className="m-0 mb-4 max-w-[30ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
              Ask each of us what a wedding is.
            </h2>
            <p className="m-0 mb-9 max-w-[52ch] text-[17px] leading-relaxed opacity-80 sm:text-lg">
              You get two completely different answers, and Arbour needed both
              of them. Flip it.
            </p>
            <Lenses />
          </div>
        </section>

        <section className="bg-cream px-6 pb-20 sm:px-10 sm:pb-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-5 opacity-55">02 · The history</p>
            <h2 className="m-0 mb-4 max-w-[20ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
              How we got here.
            </h2>
            <p className="m-0 mb-10 max-w-[52ch] text-[17px] leading-relaxed opacity-80 sm:text-lg">
              Sixteen months, multiple industry projects together. Time to get
              serious.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {TIMELINE.map((entry) => (
                <div
                  key={entry.year}
                  className={`flex min-h-[280px] flex-col justify-between gap-5 p-6 shadow-[inset_0_0_0_1px_rgba(15,42,30,0.2)] transition-transform duration-300 ease-overshoot hover:-translate-y-2 ${entry.ground}`}
                >
                  <span className={`block h-[26px] w-[26px] ${entry.chip}`} />
                  <div>
                    <div className="mb-2.5 font-display text-[30px] font-extrabold tracking-[-0.03em] text-bottle">
                      {entry.year}
                    </div>
                    <div className="text-[15px] leading-snug text-ink">
                      {entry.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutStats />

        <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-5 opacity-55">03 · Our values</p>
            <h2 className="m-0 mb-10 max-w-[22ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
              Six rules, written on a napkin, still true.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {RULES.map((rule) => (
                <div
                  key={rule.title}
                  // Not justify-between: the copy is bottom-anchored under that,
                  // so a card with a shorter body drops its title below the
                  // titles either side of it. Chip top, copy straight under it,
                  // slack at the foot, and every title in a row lines up.
                  className={`flex min-h-[240px] flex-col gap-5 p-8 transition-transform duration-300 ease-overshoot hover:-translate-y-2 ${rule.ground}`}
                >
                  <span className={`block h-7 w-7 ${rule.chip}`} />
                  <div>
                    <div
                      className={`mb-2 font-display text-2xl font-extrabold tracking-[-0.03em] ${rule.titleClass ?? ""}`}
                    >
                      {rule.title}
                    </div>
                    <div className="text-[15px] leading-relaxed opacity-90">
                      {rule.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream px-6 pb-20 sm:px-10 sm:pb-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-5 opacity-55">
              04 · Who you are actually emailing
            </p>
            <div className="grid gap-px bg-ink/20 lg:grid-cols-2">
              {FOUNDERS.map((person) => (
                <div
                  key={person.name}
                  className="flex flex-col bg-cream transition-transform duration-300 ease-overshoot hover:-translate-y-2"
                >
                  <div
                    className={`relative aspect-square w-full overflow-hidden ${person.ground}`}
                  >
                    {person.photo ? (
                      // Both headshots are shot on Bottle, so the panel behind
                      // them is Bottle too and the edge of the frame vanishes.
                      // Square panel because the source files are square and
                      // the subject sits centred: any letterbox crop here eats
                      // the shoulders and leaves dead backdrop above the head.
                      <Image
                        src={person.photo}
                        alt={person.photoAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 590px"
                        className="object-cover"
                      />
                    ) : (
                      // Until a photo is dropped in, the block would be a flat
                      // slab of colour and read as unfinished. The mark makes
                      // it deliberate.
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <ArbourA className="h-[45%] w-auto animate-drift text-cream/15" />
                      </div>
                    )}

                    {person.name === "Ben" ? (
                      <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2.5 bg-bottle/70 px-3 py-2">
                        <span className="block h-2.5 w-2.5 animate-rec rounded-full bg-coral" />
                        <span className="label-mono text-[8px] text-cream">
                          Rec · 04:12
                        </span>
                      </div>
                    ) : (
                      <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 bg-bottle/70 px-3 py-2">
                        <span className="label-mono text-[8px] text-acid">
                          deploy · ok
                        </span>
                        <span className="block h-3 w-[7px] animate-cursor bg-acid" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`block h-[22px] w-[22px] shrink-0 ${person.chip}`}
                        />
                        <div className="font-display text-[30px] font-extrabold tracking-[-0.03em]">
                          {person.name}
                        </div>
                      </div>
                      <div className="label-mono mt-2 opacity-60">
                        {person.role}
                      </div>
                    </div>
                    <p className="m-0 text-[16px] leading-relaxed opacity-80">
                      {person.bio}
                    </p>
                    <div className="label-mono mt-auto animate-slide opacity-50">
                      {person.footnote}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="on-dark mt-px flex flex-wrap items-center gap-6 bg-bottle p-8 text-cream">
              <span className="block h-7 w-7 shrink-0 animate-pop bg-acid" />
              <p className="m-0 max-w-[62ch] text-[17px] leading-relaxed">
                Want a word with us? Tell us your deepest desires about custom
                wedding software, the field nobody else will add, the automation
                you have been faking with a spreadsheet. It lands with Ben or
                Alex, because there is nobody else here. Yet.
              </p>
              <Link
                href="/contact"
                className={buttonClass(
                  "acid",
                  "lg",
                  "shrink-0 hover:rotate-[-1.5deg] sm:ms-auto",
                )}
              >
                Hit the button
              </Link>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-24">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="m-0 max-w-[17ch] font-display text-[clamp(38px,8vw,96px)] leading-[0.86] font-extrabold tracking-[-0.05em] text-bottle">
              Come and run your season on it.
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-5 pt-8">
              <WaitlistButton
                variant="bottle"
                size="lg"
                className="hover:rotate-[-1.5deg]"
              >
                Join the waitlist
              </WaitlistButton>
              <Link
                href="/#product"
                className={buttonClass(
                  "outlineBottle",
                  "lg",
                  "hover:rotate-[1.5deg]",
                )}
              >
                See the product
              </Link>
              <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <Link
                  href="/contact"
                  className="text-[15px] font-semibold underline underline-offset-4"
                >
                  Or write to one of us
                </Link>
                <span className="label-mono">
                  We do reply, usually on a Sunday
                </span>
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </WaitlistProvider>
  );
}
