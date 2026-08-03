import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";
import { buttonClass } from "@/components/ui/button";
import { CATEGORY_NAMES } from "@/content/categories";

export const metadata: Metadata = {
  title: "You are on the list",
  description: "Thanks for joining the Arbour waitlist.",
  // Nothing to gain from indexing a confirmation page.
  robots: { index: false, follow: true },
};

const STEPS = [
  {
    index: "01",
    title: "Nothing, for a while",
    body: "We are building. There is no drip sequence waiting for you and no webinar invitation coming.",
  },
  {
    index: "02",
    title: "Then one email",
    body: "When the first release is good enough to run a real season on, the waitlist hears first, in the order people joined.",
  },
  {
    index: "03",
    title: "Set up already done",
    body: "Your category decides which pipeline, which run sheet and which automations are waiting when you get in.",
  },
];

export default async function ThanksPage({
  searchParams,
}: {
  // searchParams is a promise in Next 16.
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  // Only echo back a category we recognise, never arbitrary query text.
  const known =
    category && CATEGORY_NAMES.includes(category) ? category : null;

  return (
    <WaitlistProvider>
      <SiteNav />

      <main>
        <section className="relative overflow-hidden bg-acid px-6 pt-16 pb-20 text-bottle sm:px-10 sm:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-6">Waitlist · confirmed</p>
            <h1 className="m-0 max-w-[14ch] font-display text-[clamp(44px,10vw,120px)] leading-[0.86] font-extrabold tracking-[-0.05em] text-bottle">
              You are on the list.
            </h1>

            {known ? (
              <p className="mt-8 inline-block bg-bottle px-5 py-3.5 font-mono text-[11px] tracking-[0.16em] text-acid uppercase">
                Down as · {known}
              </p>
            ) : null}

            <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed sm:text-[19px]">
              Check your inbox, there is a short confirmation in there. If it
              has not arrived in a few minutes it is in the spam folder,
              alongside every other email you actually wanted.
            </p>
          </div>
        </section>

        <section className="bg-cream px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-5 opacity-55">What happens now</p>
            <div className="grid gap-px bg-ink/20 lg:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.index}
                  className="flex min-h-[220px] flex-col justify-between gap-5 bg-cream p-7"
                >
                  <p className="label-mono opacity-45">{step.index}</p>
                  <div>
                    <div className="mb-2 font-display text-2xl font-extrabold tracking-[-0.03em]">
                      {step.title}
                    </div>
                    <div className="text-[15px] leading-relaxed opacity-80">
                      {step.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="on-dark mt-px flex flex-wrap items-center gap-6 bg-bottle p-8 text-cream">
              <span className="block h-7 w-7 shrink-0 animate-pop bg-acid" />
              <p className="m-0 max-w-[58ch] text-[17px] leading-relaxed">
                Run a venue or a group and want to talk about the House plan?
                Reply to the confirmation email. It will not be a sales call, it
                will be one of the two of us.
              </p>
              <div className="ml-auto flex flex-wrap gap-3">
                <Link href="/about" className={buttonClass("acid", "sm")}>
                  Meet the two of us
                </Link>
                <Link
                  href="/contact"
                  className={buttonClass("outlineAcid", "sm")}
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </WaitlistProvider>
  );
}
