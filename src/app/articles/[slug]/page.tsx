import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ArticleCover } from "@/components/articles/article-cover";
import { ArticleFigure } from "@/components/articles/article-figure";
import { ArticleContents } from "@/components/articles/article-contents";
import { ArticleRow } from "@/components/articles/article-row";
import { ArticleText } from "@/components/articles/article-text";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { Row } from "@/components/ui/row";
import { ARTICLES } from "@/content/articles";
import {
  articleMetadata,
  articleReadingMinutes,
  articleStructuredData,
  formatArticleDate,
  getArticle,
  getArticleVisuals,
  getRelatedArticles,
} from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return articleMetadata(article);
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const visuals = getArticleVisuals(article);

  return (
    <>
      <SiteNav />
      <StructuredData data={articleStructuredData(article)} />
      <main id="main">
        <article>
          <header className="ruled ruled-first pt-[calc(var(--nav-h)+var(--nav-gap))]">
            <div className="sheet">
              <nav
                aria-label="Breadcrumb"
                className="px-5 pt-6 sm:px-8 lg:px-12"
              >
                <Link
                  href="/articles"
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm text-ui text-bottle underline-offset-4 hover:underline"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" /> All
                  articles
                </Link>
              </nav>
              <div className="grid lg:grid-cols-12">
                <div className="px-5 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12 lg:col-span-7 lg:px-12 lg:pt-10">
                  <h1 className="headline m-0 max-w-[22ch] text-[clamp(2.25rem,1.1rem+3.5vw,4.5rem)] leading-[1.02] text-ink">
                    {article.title}
                  </h1>
                  <p className="m-0 mt-6 max-w-[55ch] text-lead text-ink-secondary">
                    {article.description}
                  </p>
                  <p className="mono-label m-0 mt-6 text-ink-muted">
                    {article.category} · {articleReadingMinutes(article)} min
                    read
                  </p>
                </div>
                <div className="cell-rule-t overflow-hidden bg-panel lg:col-span-5 lg:border-t-0 lg:border-l lg:border-rule">
                  <ArticleCover
                    image={visuals.cover}
                    sizes="(max-width: 1023px) calc(100vw - 48px), 535px"
                    preload
                    linkCredit
                  />
                </div>
              </div>
              <div className="cell-rule-t flex flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 text-ui text-ink-secondary sm:px-8 lg:px-12">
                <Link
                  rel="author"
                  href="/articles#editorial-approach"
                  className="font-semibold text-bottle underline-offset-4 hover:underline"
                >
                  {article.author}
                </Link>
                <span>
                  Published{" "}
                  <time dateTime={article.publishedAt}>
                    {formatArticleDate(article.publishedAt)}
                  </time>
                </span>
                {article.updatedAt !== article.publishedAt ? (
                  <span>
                    Updated{" "}
                    <time dateTime={article.updatedAt}>
                      {formatArticleDate(article.updatedAt)}
                    </time>
                  </span>
                ) : null}
              </div>
            </div>
          </header>

          <div className="ruled">
            <div className="sheet grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
              <ArticleContents sections={article.sections} />

              <div className="min-w-0 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
                <div className="mx-auto max-w-[70ch] text-[1.0625rem] leading-[1.75] text-ink-secondary">
                  <section
                    aria-labelledby="takeaways-title"
                    className="mb-8 rounded-md bg-panel p-5 inset-shadow-depth-panel sm:p-6"
                  >
                    <h2
                      id="takeaways-title"
                      className="headline m-0 mb-4 text-section text-ink"
                    >
                      In brief
                    </h2>
                    <ul className="m-0 list-disc space-y-3 pl-5 text-body leading-[1.6] marker:text-bottle">
                      {visuals.takeaways.map((point) => (
                        <li key={point} className="pl-1">
                          <ArticleText text={point} />
                        </li>
                      ))}
                    </ul>
                  </section>
                  <div className="grid gap-5 text-title leading-[1.65] text-ink">
                    {article.intro.map((paragraph) => (
                      <p key={paragraph} className="m-0">
                        <ArticleText text={paragraph} />
                      </p>
                    ))}
                  </div>
                  {article.sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      aria-labelledby={`${section.id}-title`}
                      className="mt-12 sm:mt-14"
                    >
                      <h2
                        id={`${section.id}-title`}
                        className="headline m-0 mb-5 text-[1.75rem] leading-[1.1] text-ink sm:text-page-title"
                      >
                        {section.heading}
                      </h2>
                      <div className="grid gap-5">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="m-0">
                            <ArticleText text={paragraph} />
                          </p>
                        ))}
                        {section.bullets ? (
                          <ul className="m-0 list-disc space-y-3 pl-5 marker:text-bottle">
                            {section.bullets.map((bullet) => (
                              <li key={bullet} className="pl-1">
                                <ArticleText text={bullet} />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                      {visuals.figures
                        .filter((figure) => figure.afterSection === section.id)
                        .map((figure) => (
                          <ArticleFigure key={figure.title} figure={figure} />
                        ))}
                    </section>
                  ))}

                  <section
                    id="sources"
                    aria-labelledby="sources-title"
                    className="mt-14 border-t border-rule pt-10"
                  >
                    <h2
                      id="sources-title"
                      className="headline m-0 mb-3 text-page-title text-ink"
                    >
                      Sources
                    </h2>
                    <p className="m-0 mb-6 text-body">
                      Sources checked on {formatArticleDate(article.updatedAt)}.
                      Product details and guidance can change.
                    </p>
                    <ol className="m-0 list-none divide-y divide-line p-0">
                      {article.sources.map((source) => (
                        <li
                          key={source.id}
                          id={`source-${source.id}`}
                          className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 py-4 text-body"
                        >
                          <span className="mono-label pt-1 text-ink-muted">
                            {source.id}
                          </span>
                          <div>
                            <a
                              href={source.url}
                              className="rounded-xs font-semibold text-bottle underline decoration-bottle/35 underline-offset-4 hover:decoration-bottle"
                            >
                              {source.title}
                              <ArrowUpRight
                                aria-hidden="true"
                                className="ml-1 inline size-3.5"
                              />
                            </a>
                            <p className="m-0 mt-1 text-caption text-ink-muted">
                              {source.publisher}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <p className="m-0 mt-8 border-t border-rule pt-6 text-body">
                      Published by Arbour, which makes wedding business
                      software.{" "}
                      <Link
                        href="/articles#editorial-approach"
                        className="text-bottle underline underline-offset-4 hover:decoration-bottle/50"
                      >
                        Read our editorial approach.
                      </Link>
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Row labelledBy="related-title" still>
          <div className="flex flex-wrap items-end justify-between gap-5 px-5 pt-12 pb-8 sm:px-8 sm:pt-16 lg:px-12">
            <h2
              id="related-title"
              className="headline m-0 text-headline text-ink"
            >
              Keep reading.
            </h2>
            <Link
              href="/articles"
              className="inline-flex min-h-11 items-center gap-2 rounded-sm text-ui font-semibold text-bottle underline-offset-4 hover:underline"
            >
              All articles <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="m-0 list-none p-0">
            {getRelatedArticles(article).map((related) => (
              <ArticleRow key={related.slug} article={related} />
            ))}
          </ul>
        </Row>
        <Row band="panel" labelledBy="product-title" still>
          <div className="flex flex-wrap items-center justify-between gap-6 px-5 py-10 sm:px-8 lg:px-12">
            <div>
              <h2
                id="product-title"
                className="headline m-0 text-section text-ink"
              >
                One record, first enquiry to final invoice.
              </h2>
              <p className="m-0 mt-3 max-w-[60ch] text-body text-ink-secondary">
                See how Arbour keeps sales and delivery together.
              </p>
            </div>
            <Link
              href="/wedding-crm-australia"
              className="inline-flex min-h-11 items-center gap-3 rounded-sm text-ui font-semibold text-bottle underline-offset-4 hover:underline"
            >
              Explore Arbour{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Row>
      </main>
      <SiteFooter />
    </>
  );
}
