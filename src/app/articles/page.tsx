import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCover } from "@/components/articles/article-cover";
import { ArticleRow } from "@/components/articles/article-row";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { Row } from "@/components/ui/row";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_INDEX,
  ARTICLES,
} from "@/content/articles";
import {
  articleImage,
  articleReadingMinutes,
  articlesStructuredData,
  formatArticleDate,
  getArticleVisuals,
} from "@/lib/articles";
import { pageMetadata, siteUrl } from "@/lib/seo";

const indexMetadata = pageMetadata({
  title: ARTICLE_INDEX.title,
  description: ARTICLE_INDEX.description,
  path: "/articles",
});

const indexImage = {
  url: siteUrl(articleImage(ARTICLES[0])),
  width: getArticleVisuals(ARTICLES[0]).cover.width,
  height: getArticleVisuals(ARTICLES[0]).cover.height,
  alt: getArticleVisuals(ARTICLES[0]).cover.alt,
};

export const metadata: Metadata = {
  ...indexMetadata,
  openGraph: { ...indexMetadata.openGraph, images: [indexImage] },
  twitter: { ...indexMetadata.twitter, images: [indexImage] },
};

export default function ArticlesPage() {
  const [lead, ...remaining] = ARTICLES;

  return (
    <>
      <SiteNav />
      <StructuredData data={articlesStructuredData()} />
      <main id="main">
        <Row
          first
          labelledBy="articles-title"
          className="pt-[calc(var(--nav-h)+var(--nav-gap))]"
        >
          <div className="grid gap-x-12 gap-y-6 px-5 pt-14 pb-10 sm:px-8 sm:pt-20 sm:pb-12 lg:grid-cols-12 lg:items-end lg:px-12 lg:pt-24">
            <h1
              id="articles-title"
              className="headline m-0 text-hero text-ink lg:col-span-7"
            >
              {ARTICLE_INDEX.heading}.
            </h1>
            <p className="m-0 max-w-[44ch] text-lead text-ink-secondary lg:col-span-5">
              {ARTICLE_INDEX.introduction}
            </p>
          </div>
          <div className="cell-rule-t flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-3 sm:px-8 lg:px-12">
            <nav
              aria-label="Article topics"
              className="flex flex-wrap gap-x-6 gap-y-1"
            >
              {ARTICLE_CATEGORIES.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm text-ui font-semibold text-bottle underline-offset-4 hover:underline"
                >
                  {category.name}
                  <span className="text-caption font-normal text-ink-muted">
                    {
                      ARTICLES.filter(
                        (article) => article.category === category.name,
                      ).length
                    }
                  </span>
                </a>
              ))}
            </nav>
            <span className="mono-label text-ink-muted">
              {ARTICLES.length} articles
            </span>
          </div>
        </Row>

        <Row still labelledBy="lead-story-title">
          <Link
            href={`/articles/${lead.slug}`}
            className="group grid transition-colors duration-[var(--duration-base)] hover:bg-panel focus-visible:bg-panel lg:grid-cols-12"
          >
            <div className="overflow-hidden bg-panel lg:col-span-7">
              <ArticleCover
                image={getArticleVisuals(lead).cover}
                sizes="(max-width: 1023px) calc(100vw - 48px), 745px"
                preload
              />
            </div>
            <div className="cell-rule-t flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-rule lg:px-10">
              <h2
                id="lead-story-title"
                className="headline m-0 max-w-[22ch] text-page-title leading-[1.02] text-ink group-hover:text-bottle sm:text-[2.5rem]"
              >
                {lead.title}
              </h2>
              <p className="mono-label m-0 mt-5 text-ink-muted">
                {lead.category} · {articleReadingMinutes(lead)} min read
              </p>
              <p className="m-0 mt-5 max-w-[48ch] text-lead text-ink-secondary">
                {lead.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                <time
                  dateTime={lead.publishedAt}
                  className="text-caption text-ink-muted"
                >
                  {formatArticleDate(lead.publishedAt)}
                </time>
                <span className="inline-flex items-center gap-3 text-ui font-semibold text-bottle">
                  Read the research{" "}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-[var(--duration-base)] group-hover:translate-x-1 motion-reduce:transform-none"
                  />
                </span>
              </div>
            </div>
          </Link>
        </Row>

        {ARTICLE_CATEGORIES.map((category) => (
          <Row
            key={category.slug}
            id={category.slug}
            labelledBy={`${category.slug}-title`}
            still
          >
            <div className="grid gap-x-12 gap-y-4 px-5 pt-14 pb-8 sm:px-8 sm:pt-20 sm:pb-10 lg:grid-cols-12 lg:items-end lg:px-12">
              <h2
                id={`${category.slug}-title`}
                className="headline m-0 text-headline text-ink lg:col-span-7"
              >
                {category.name}
              </h2>
              <p className="m-0 max-w-[44ch] text-lead text-ink-secondary lg:col-span-5">
                {category.description}
              </p>
            </div>
            <ul className="m-0 list-none p-0">
              {remaining
                .filter((article) => article.category === category.name)
                .map((article) => (
                  <ArticleRow key={article.slug} article={article} />
                ))}
            </ul>
          </Row>
        ))}

        <Row
          id="editorial-approach"
          labelledBy="editorial-title"
          band="panel"
          still
        >
          <div className="grid gap-x-12 gap-y-6 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:px-12">
            <h2
              id="editorial-title"
              className="headline m-0 text-page-title text-ink lg:col-span-5"
            >
              How we write.
            </h2>
            <div className="grid max-w-[65ch] gap-4 text-body text-ink-secondary lg:col-span-7">
              <p className="m-0">
                Arbour Research Team is our collective editorial byline. Arbour
                publishes these articles and makes the software discussed here.
                Our comparisons include our own product.
              </p>
              <p className="m-0">
                Each article links to its sources. We separate official
                statistics from industry surveys, and forecasts from measured
                results. Product details reflect the documentation available on
                the publication date.
              </p>
              <p className="m-0">
                Spotted something that has changed?{" "}
                <Link
                  href="/contact"
                  className="text-bottle underline underline-offset-4 hover:decoration-bottle/50"
                >
                  Send Ben or Alex a correction.
                </Link>
              </p>
            </div>
          </div>
        </Row>
      </main>
      <SiteFooter />
    </>
  );
}
