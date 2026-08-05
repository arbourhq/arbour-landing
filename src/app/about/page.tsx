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
  "Ten years of weddings",
  "Seven years shipping software",
  "Zero venture capital",
  "One marketplace that did not work",
];

export default function AboutPage() {
  return (
    <WaitlistProvider>
      <SiteNav />

      <main>
        <section className="bg-acid px-6 pt-16 pb-20 sm:px-10 sm:py-22">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-6 text-bottle">
              About · two people, one strange overlap
            </p>
            <h1 className="m-0 mb-4 max-w-[26ch] font-display text-[clamp(34px,6.5vw,64px)] leading-[0.92] font-extrabold tracking-[-0.04em] text-bottle">
              What do you get when you cross a wedding videographer with a
              software engineer?
            </h1>
            <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
              <p className="m-0 font-display text-[clamp(72px,16vw,150px)] leading-[0.82] font-extrabold tracking-[-0.055em] text-bottle">
                This.
              </p>
              <p className="m-0 mb-4 max-w-[44ch] text-[17px] leading-relaxed text-bottle sm:text-[19px]">
                Arbour is built by two people who met at uni, built a wedding
                marketplace that nobody found, and learnt more from that than
                from anything that worked. One of us has shot weddings for ten
                years. The other writes every line of this.
              </p>
            </div>
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
            <h2 className="m-0 mb-4 max-w-[22ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
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
            <p className="eyebrow mb-5 opacity-55">
              02 · How it actually happened
            </p>
            <h2 className="m-0 mb-4 max-w-[20ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
              We built the wrong thing first.
            </h2>
            <p className="m-0 mb-10 max-w-[52ch] text-[17px] leading-relaxed opacity-80 sm:text-lg">
              Sixteen months, one shut-down and about ten long phone calls with
              other vendors. Short version, in order.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5">
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
            <p className="eyebrow mb-5 opacity-55">03 · What we will not do</p>
            <h2 className="m-0 mb-10 max-w-[22ch] font-display text-[clamp(32px,6vw,60px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
              Six rules, written on a napkin, still true.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {RULES.map((rule) => (
                <div
                  key={rule.title}
                  className={`flex min-h-[240px] flex-col justify-between gap-5 p-8 transition-transform duration-300 ease-overshoot hover:-translate-y-2 ${rule.ground}`}
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
              <p className="m-0 max-w-[72ch] text-[17px] leading-relaxed">
                Two people, and that is the whole company. Support is not a
                department here, it is one of us. Email on a Saturday and the
                reply comes from the person who has stood in a field with a
                camera, or the person who wrote the screen you are complaining
                about. On the House plan, whoever builds your custom module is
                on this page.
              </p>
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
