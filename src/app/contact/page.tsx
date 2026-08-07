import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";
import { WaitlistButton } from "@/components/waitlist/waitlist-button";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT_FACTS } from "@/content/contact";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask about the build, the House plan or what it will cost. There are two of us and one of us answers.",
};

export default async function ContactPage({
  searchParams,
}: {
  // searchParams is a promise in Next 16.
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <WaitlistProvider>
      <SiteNav />

      <main>
        <section className="bg-acid px-6 pt-16 pb-20 text-bottle sm:px-10 sm:py-22">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-6">Contact · one of two people</p>
            <h1 className="m-0 mb-4 max-w-[15ch] font-display text-[clamp(40px,9vw,104px)] leading-[0.86] font-extrabold tracking-[-0.05em] text-bottle">
              Ask us something hard.
            </h1>
            <p className="m-0 max-w-[52ch] text-[17px] leading-relaxed sm:text-[19px]">
              What it will cost, what it will not do, whether it survives a
              two-hundred cover Saturday. Nothing is for sale yet, so there is
              nothing to be cagey about.
            </p>
          </div>
        </section>

        <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] items-start gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <ContactForm initialTopic={topic} />

            <div className="flex flex-col gap-10">
              <div>
                <p className="eyebrow mb-5 opacity-55">
                  Or skip the form entirely
                </p>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="font-display text-[clamp(24px,3.4vw,34px)] leading-none font-extrabold tracking-[-0.035em] break-all text-bottle underline decoration-2 underline-offset-[6px]"
                >
                  {SITE.contactEmail}
                </a>
                <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed opacity-75">
                  Same inbox, same two people. Attach the spreadsheet you are
                  trying to escape if it helps.
                </p>
              </div>

              <div className="grid gap-px bg-ink/20">
                {CONTACT_FACTS.map((fact) => (
                  <div key={fact.index} className="bg-cream py-6 pr-2">
                    <p className="label-mono mb-2.5 opacity-45">{fact.index}</p>
                    <div className="mb-1.5 font-display text-[22px] leading-none font-extrabold tracking-[-0.03em]">
                      {fact.title}
                    </div>
                    <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed opacity-80">
                      {fact.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-acid px-6 py-20 text-bottle sm:px-10 sm:py-24">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-end justify-between gap-x-12 gap-y-8">
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(32px,6vw,64px)] leading-[0.88] font-extrabold tracking-[-0.045em] text-bottle">
              Not a question, just want in?
            </h2>
            <WaitlistButton
              variant="bottle"
              size="lg"
              className="hover:rotate-[-1.5deg]"
            >
              Join the waitlist
            </WaitlistButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </WaitlistProvider>
  );
}
