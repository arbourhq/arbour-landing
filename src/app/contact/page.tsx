import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TrialLink } from "@/components/trial-link";
import { ContactForm } from "@/components/contact/contact-form";
import { Row } from "@/components/ui/row";
import { CONTACT_FACTS } from "@/content/contact";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask about the product, the House plan or moving across. There are two of us and one of us answers.",
};

export default async function ContactPage({
  searchParams,
}: {
  // searchParams is a promise in Next 16.
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <>
      <SiteNav />

      <main id="main">
        <Row
          first
          labelledBy="contact-title"
          className="pt-[calc(var(--nav-h)+var(--nav-gap))]"
        >
          <div className="grid gap-x-12 gap-y-6 px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-14 lg:grid-cols-12 lg:items-end lg:px-12 lg:pt-24 lg:pb-16">
            <h1
              id="contact-title"
              className="headline m-0 max-w-[12ch] text-hero text-ink lg:col-span-7"
            >
              Ask us something hard.
            </h1>
            <div className="flex flex-col items-start gap-4 lg:col-span-5">
              <p className="m-0 max-w-[46ch] text-lead text-ink-secondary">
                What it costs, what it will not do, whether it survives a
                two-hundred cover Saturday. It is our software and our names on
                it, so there is nothing to be cagey about.
              </p>
              {/* The console's presence dot: someone is actually there. */}
              <p className="mono-label m-0 flex items-center gap-2 text-ink-muted">
                <span
                  aria-hidden="true"
                  className="size-[7px] rounded-full bg-sprout"
                />
                Contact · one of two people
              </p>
            </div>
          </div>

          <div className="cell-rule-t grid lg:grid-cols-12">
            <div className="px-5 py-8 sm:px-8 sm:py-10 lg:col-span-7 lg:px-12 lg:py-12">
              <ContactForm initialTopic={topic} />
            </div>

            <aside className="cell-rule-t bg-panel lg:col-span-5 lg:border-t-0 lg:border-l lg:border-rule">
              <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <p className="m-0 text-lead text-ink">
                  Or skip the form entirely:{" "}
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    className="font-semibold break-all text-bottle underline underline-offset-4 hover:text-bottle-ink"
                  >
                    {SITE.contactEmail}
                  </a>
                </p>
                <p className="m-0 mt-3 max-w-[38ch] text-body text-ink-secondary">
                  Same inbox, same two people. Attach the spreadsheet you are
                  trying to escape if it helps.
                </p>
              </div>

              <dl className="m-0 border-t border-rule">
                {CONTACT_FACTS.map((fact, i) => (
                  <div
                    key={fact.index}
                    className={`px-5 py-6 sm:px-8 lg:px-10 ${i > 0 ? "border-t border-rule" : ""}`}
                  >
                    <dt className="headline text-title text-ink">
                      {fact.title}
                    </dt>
                    <dd className="m-0 mt-2 max-w-[42ch] text-body text-ink-secondary">
                      {fact.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Row>

        <Row band="bottle" labelledBy="contact-close-title">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20 lg:px-12">
            <h2
              id="contact-close-title"
              className="headline m-0 max-w-[14ch] text-[clamp(2.25rem,1rem+4.4vw,4.5rem)] leading-[0.9] text-on-dark"
            >
              Not a question, just want in?
            </h2>
            <TrialLink variant="sprout" size="lg" />
          </div>
        </Row>
      </main>

      <SiteFooter />
    </>
  );
}
