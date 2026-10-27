import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StructuredData } from "@/components/structured-data";
import { TrialLink } from "@/components/trial-link";
import { Row } from "@/components/ui/row";
import { TIERS } from "@/content/pricing";
import { STAGES } from "@/content/stages";
import { WEDDING_CRM as COPY } from "@/content/wedding-crm";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const metadata = pageMetadata({
  title: COPY.title,
  description: COPY.description,
  path: COPY.path,
});

const LINK =
  "text-ui font-semibold text-bottle underline underline-offset-4 hover:text-bottle-deep";
const GUTTER = "px-5 py-10 sm:px-8 sm:py-14 lg:px-12";
const currency = (price: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(price);

export default function WeddingCrmPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": siteUrl(`${COPY.path}#webpage`),
              url: siteUrl(COPY.path),
              name: COPY.title,
              description: COPY.description,
              inLanguage: "en-AU",
              isPartOf: { "@id": siteUrl("/#website") },
              about: { "@id": siteUrl("/#software") },
              breadcrumb: { "@id": siteUrl(`${COPY.path}#breadcrumb`) },
            },
            {
              "@type": "BreadcrumbList",
              "@id": siteUrl(`${COPY.path}#breadcrumb`),
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Arbour",
                  item: siteUrl("/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: COPY.linkLabel,
                  item: siteUrl(COPY.path),
                },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": siteUrl(`${COPY.path}#faq`),
              mainEntity: COPY.faqs.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }}
      />
      <SiteNav />
      <main id="main">
        <Row
          first
          labelledBy="crm-title"
          className="pt-[calc(var(--nav-h)+var(--nav-gap))]"
        >
          <div className="px-5 pt-8 sm:px-8 lg:px-12">
            <nav aria-label="Breadcrumb" className="text-ui text-ink-secondary">
              <ol className="m-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0">
                <li>
                  <Link href="/" className={LINK}>
                    Arbour
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{COPY.linkLabel}</li>
              </ol>
            </nav>
          </div>
          <div className={`${GUTTER} grid gap-8 lg:grid-cols-12 lg:items-end`}>
            <h1
              id="crm-title"
              className="headline m-0 max-w-[15ch] text-hero text-ink lg:col-span-7"
            >
              {COPY.heading}
            </h1>
            <div className="flex flex-col items-start gap-6 lg:col-span-5">
              <p className="m-0 max-w-[46ch] text-lead text-ink-secondary">
                {COPY.introduction}
              </p>
              <TrialLink variant="sprout" size="lg" />
              <p className="mono-label m-0 text-ink-muted">{COPY.trial}</p>
            </div>
          </div>
        </Row>
        <Row labelledBy="crm-audience">
          <div className={`${GUTTER} grid gap-6 lg:grid-cols-12`}>
            <h2
              id="crm-audience"
              className="headline m-0 text-headline text-ink lg:col-span-5"
            >
              {COPY.audienceHeading}
            </h2>
            <p className="m-0 max-w-[68ch] text-lead text-ink-secondary lg:col-span-7">
              {COPY.audience}
            </p>
          </div>
        </Row>
        <Row labelledBy="crm-workflow">
          <div className={`${GUTTER} grid gap-6 lg:grid-cols-12`}>
            <h2
              id="crm-workflow"
              className="headline m-0 max-w-[20ch] text-headline text-ink lg:col-span-7"
            >
              {COPY.workflowHeading}
            </h2>
            <p className="m-0 max-w-[46ch] text-body text-ink-secondary lg:col-span-5">
              {COPY.workflowIntroduction}
            </p>
          </div>
          {STAGES.filter(
            (stage) => stage.id === "quote" || stage.id === "day",
          ).map((stage) => (
            <div key={stage.id} className="cell-rule-t grid lg:grid-cols-12">
              <div className={`${GUTTER} lg:col-span-4`}>
                <h3 className="headline m-0 text-section text-ink">
                  {stage.title}
                </h3>
                <p className="mt-5 mb-6 max-w-[46ch] text-body text-ink-secondary">
                  {stage.facts[0].body}
                </p>
                <Link href={`/#stage-${stage.id}`} className={LINK}>
                  {stage.name}
                </Link>
              </div>
              <figure className="cell-rule-t m-0 bg-panel p-4 sm:p-6 lg:col-span-8 lg:border-t-0 lg:border-l lg:border-rule">
                <Image
                  src={stage.capture.src}
                  alt={stage.capture.alt}
                  width={stage.capture.width}
                  height={stage.capture.height}
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="h-auto w-full rounded-md border border-border-default"
                />
                <figcaption className="mono-label mt-3 text-ink-muted">
                  Real console screen · seed data
                </figcaption>
              </figure>
            </div>
          ))}
        </Row>
        <Row labelledBy="crm-australia">
          <div className={GUTTER}>
            <h2
              id="crm-australia"
              className="headline m-0 text-headline text-ink"
            >
              {COPY.australianHeading}
            </h2>
          </div>
          <dl className="m-0">
            {COPY.australianFacts.map((fact) => (
              <div
                key={fact.title}
                className={`${GUTTER} cell-rule-t grid gap-4 lg:grid-cols-12`}
              >
                <dt className="headline text-section text-ink lg:col-span-5">
                  {fact.title}
                </dt>
                <dd className="m-0 max-w-[68ch] text-body text-ink-secondary lg:col-span-7">
                  {fact.body}
                </dd>
              </div>
            ))}
          </dl>
        </Row>
        <Row labelledBy="crm-criteria">
          <div className={`${GUTTER} grid gap-6 lg:grid-cols-12`}>
            <h2
              id="crm-criteria"
              className="headline m-0 max-w-[23ch] text-headline text-ink lg:col-span-7"
            >
              {COPY.criteriaHeading}
            </h2>
            <p className="m-0 max-w-[46ch] text-body text-ink-secondary lg:col-span-5">
              {COPY.criteriaIntroduction}
            </p>
          </div>
          {COPY.criteria.map((criterion) => (
            <div
              key={criterion.question}
              className={`${GUTTER} cell-rule-t grid gap-5 lg:grid-cols-12`}
            >
              <h3 className="headline m-0 max-w-[24ch] text-section text-ink lg:col-span-5">
                {criterion.question}
              </h3>
              <div className="lg:col-span-7">
                <p className="mt-0 mb-5 max-w-[68ch] text-body text-ink-secondary">
                  {criterion.answer}
                </p>
                <Link href={criterion.href} className={LINK}>
                  {criterion.link}
                </Link>
              </div>
            </div>
          ))}
        </Row>
        <Row labelledBy="crm-pricing" band="panel">
          <div className={GUTTER}>
            <h2
              id="crm-pricing"
              className="headline m-0 text-headline text-ink"
            >
              {COPY.pricingHeading}
            </h2>
            <p className="mt-6 mb-8 max-w-[68ch] text-body text-ink-secondary">
              {COPY.pricingIntroduction}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-body text-ink">
                <caption className="sr-only">{COPY.pricingHeading}</caption>
                <thead>
                  <tr>
                    {COPY.pricingColumns.map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="border-b border-rule px-3 py-4 first:pl-0"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((tier) => (
                    <tr key={tier.name}>
                      <th
                        scope="row"
                        className="border-b border-rule py-5 pr-3 font-semibold"
                      >
                        {tier.name}
                      </th>
                      <td className="border-b border-rule px-3 py-5 whitespace-nowrap">
                        {tier.price
                          ? currency(tier.price.monthly)
                          : COPY.housePrice}
                      </td>
                      <td className="border-b border-rule px-3 py-5 whitespace-nowrap">
                        {tier.price
                          ? currency(tier.price.yearly)
                          : COPY.housePrice}
                      </td>
                      <td className="border-b border-rule px-3 py-5">
                        {tier.limits.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/#pricing" className={`${LINK} mt-6 inline-block`}>
              {COPY.criteria[3].link}
            </Link>
          </div>
        </Row>
        <Row labelledBy="crm-faq">
          <div className={GUTTER}>
            <h2 id="crm-faq" className="headline m-0 text-headline text-ink">
              {COPY.faqHeading}
            </h2>
          </div>
          <dl className="m-0">
            {COPY.faqs.map(({ q, a }) => (
              <div
                key={q}
                className={`${GUTTER} cell-rule-t grid gap-5 lg:grid-cols-12`}
              >
                <dt className="text-lead font-semibold text-ink lg:col-span-5">
                  {q}
                </dt>
                <dd className="m-0 max-w-[68ch] text-body text-ink-secondary lg:col-span-7">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </Row>
        <Row band="bottle" labelledBy="crm-trial">
          <div className={`${GUTTER} grid gap-8 lg:grid-cols-12 lg:items-end`}>
            <div className="lg:col-span-8">
              <h2
                id="crm-trial"
                className="headline m-0 max-w-[18ch] text-headline text-on-dark"
              >
                {COPY.closingHeading}
              </h2>
              <p className="mt-6 mb-0 max-w-[52ch] text-lead text-on-dark/75">
                {COPY.closing}
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:col-span-4">
              <TrialLink variant="onDark" size="lg" />
              <Link
                href="/"
                className="text-ui font-semibold text-on-dark underline underline-offset-4"
              >
                {COPY.productLink}
              </Link>
              <Link
                href="/about"
                className="text-ui font-semibold text-on-dark underline underline-offset-4"
              >
                {COPY.foundersLink}
              </Link>
            </div>
          </div>
        </Row>
      </main>
      <SiteFooter />
    </>
  );
}
