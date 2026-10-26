import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Row } from "@/components/ui/row";

export interface LegalSection {
  heading: string;
  paragraphs: readonly string[];
  items?: readonly string[];
}

/**
 * Privacy and Terms, in the console's reading layout: a page header, the
 * effective date as an info alert (a square tone dot beside a mono tone label,
 * no flooded ground), then numbered sections down one ruled column at a
 * reading measure. The numbers stay because people cite a clause by them.
 */
export function LegalPage({
  eyebrow,
  title,
  introduction,
  effectiveDate,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  effectiveDate: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Row
          first
          labelledBy="legal-title"
          className="pt-[calc(var(--nav-h)+var(--nav-gap))]"
        >
          <div className="grid gap-x-12 gap-y-6 px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-14 lg:grid-cols-12 lg:items-end lg:px-12 lg:pt-24 lg:pb-16">
            <h1
              id="legal-title"
              className="headline m-0 max-w-[14ch] text-hero text-ink lg:col-span-7"
            >
              {title}
            </h1>
            <div className="flex flex-col items-start gap-5 lg:col-span-5">
              <p className="m-0 max-w-[46ch] text-lead text-ink-secondary">
                {introduction}
              </p>
              <div
                role="note"
                className="w-full max-w-[46ch] rounded-md border border-line bg-page px-3.5 py-3"
              >
                <p className="m-0 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-xs bg-cornflower"
                  />
                  <span className="mono-label font-semibold text-cornflower-ink">
                    {eyebrow} · Effective date
                  </span>
                </p>
                <p className="m-0 mt-1.5 pl-4 text-ui text-ink-secondary">
                  {effectiveDate}
                </p>
              </div>
            </div>
          </div>
        </Row>

        <Row>
          <article>
            {sections.map((section, index) => (
              <section
                key={section.heading}
                aria-labelledby={`legal-${index}`}
                className={`grid gap-x-12 gap-y-4 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-12 ${
                  index > 0 ? "border-t border-rule" : ""
                }`}
              >
                <p className="mono-eyebrow m-0 pt-1.5 text-ink-muted lg:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="lg:col-span-8">
                  <h2
                    id={`legal-${index}`}
                    className="headline m-0 text-section text-ink"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-5 flex max-w-[68ch] flex-col gap-4 text-body text-ink-secondary">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="m-0">
                        {paragraph}
                      </p>
                    ))}
                    {section.items ? (
                      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.6em] size-1.5 shrink-0 rounded-xs bg-ink-faint"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </section>
            ))}
          </article>
        </Row>
      </main>
      <SiteFooter />
    </>
  );
}
