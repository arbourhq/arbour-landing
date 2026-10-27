import { ArticleCover } from "./article-cover";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/content/articles";
import { getArticleVisuals, articleReadingMinutes } from "@/lib/articles";

/** A story is a row in the sheet, with one link and one keyboard stop. */
export function ArticleRow({ article }: { article: Article }) {
  return (
    <li className="border-t border-rule">
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-x-5 gap-y-3 px-5 py-6 transition-colors duration-[var(--duration-base)] hover:bg-panel focus-visible:bg-panel sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center sm:gap-x-8 sm:px-8 sm:py-8 lg:grid-cols-[13rem_minmax(0,1fr)_auto] lg:gap-x-12 lg:px-12"
      >
        <div className="overflow-hidden rounded-sm bg-panel">
          <ArticleCover
            image={getArticleVisuals(article).cover}
            sizes="(max-width: 639px) 88px, (max-width: 1023px) 160px, 208px"
            compact
          />
        </div>
        <div className="min-w-0">
          <h3 className="headline m-0 max-w-[36ch] text-title leading-[1.15] text-ink group-hover:text-bottle sm:text-section lg:text-[1.75rem]">
            {article.title}
          </h3>
          <p className="m-0 mt-3 hidden max-w-[65ch] text-body text-ink-secondary sm:block">
            {article.description}
          </p>
          <p className="mono-label m-0 mt-3 text-ink-muted">
            {articleReadingMinutes(article)} min read
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="hidden size-5 text-bottle transition-transform duration-[var(--duration-base)] ease-glide group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none sm:block"
        />
      </Link>
    </li>
  );
}
