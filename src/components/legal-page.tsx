import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";

export interface LegalSection {
  heading: string;
  paragraphs: readonly string[];
  items?: readonly string[];
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: readonly LegalSection[];
}) {
  return (
    <WaitlistProvider>
      <SiteNav />
      <main>
        <section className="bg-acid px-6 pt-16 pb-20 sm:px-10 sm:py-22">
          <div className="mx-auto max-w-[1180px]">
            <p className="eyebrow mb-6 text-bottle">{eyebrow}</p>
            <h1 className="m-0 max-w-[16ch] font-display text-[clamp(44px,9vw,112px)] leading-[0.95] font-extrabold tracking-[-0.05em] text-balance text-bottle">
              {title}
            </h1>
            <p className="m-0 max-w-[50ch] pt-8 text-[17px] leading-relaxed text-bottle sm:text-[19px]">
              {introduction}
            </p>
          </div>
        </section>

        <section className="bg-cream px-6 py-16 sm:px-10 sm:py-22">
          <article className="mx-auto max-w-[820px]">
            <div className="mb-14 bg-bottle p-6 text-cream shadow-[inset_0_0_0_1px_rgba(15,42,30,0.2)] sm:p-8">
              <p className="label-mono mb-3 text-acid">
                Draft for legal review
              </p>
              <p className="m-0 max-w-[58ch] text-[15px] leading-relaxed text-cream/80">
                This page contains placeholder legal copy. It must be reviewed
                and approved by an Australian legal practitioner before Arbour
                launches.
              </p>
            </div>

            <div className="divide-y divide-ink/15">
              {sections.map((section, index) => (
                <section
                  key={section.heading}
                  className="grid gap-5 py-10 first:pt-0 sm:grid-cols-[80px_1fr]"
                >
                  <p className="label-mono pt-1 opacity-50">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="m-0 mb-5 font-display text-[30px] leading-tight font-extrabold tracking-[-0.03em] text-ink">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-[16px] leading-relaxed text-ink/80">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="m-0">
                          {paragraph}
                        </p>
                      ))}
                      {section.items ? (
                        <ul className="m-0 list-square space-y-2 pl-5">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </WaitlistProvider>
  );
}
