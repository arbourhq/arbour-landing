import { ChevronDown } from "lucide-react";
import type { Article } from "@/content/articles";

function ContentsLinks({ sections }: { sections: Article["sections"] }) {
  return (
    <ul className="m-0 grid list-none gap-1 p-0">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="inline-block rounded-sm py-2 text-ui leading-[1.5] text-ink-secondary underline-offset-4 hover:text-bottle hover:underline"
          >
            {section.heading}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#sources"
          className="inline-block rounded-sm py-2 text-ui text-ink-secondary underline-offset-4 hover:text-bottle hover:underline"
        >
          Sources
        </a>
      </li>
    </ul>
  );
}

export function ArticleContents({
  sections,
}: {
  sections: Article["sections"];
}) {
  return (
    <aside className="border-b border-rule lg:border-r lg:border-b-0">
      <details className="group px-5 sm:px-8 lg:hidden">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-ui font-semibold text-bottle [&::-webkit-details-marker]:hidden">
          In this article
          <ChevronDown
            aria-hidden="true"
            className="size-4 transition-transform duration-[var(--duration-base)] group-open:rotate-180"
          />
        </summary>
        <nav aria-label="Article contents" className="pb-5">
          <ContentsLinks sections={sections} />
        </nav>
      </details>
      <nav
        aria-label="Article contents"
        className="sticky top-[calc(var(--nav-h)+var(--nav-gap)+1.5rem)] hidden px-8 py-12 lg:block"
      >
        <h2 className="mono-eyebrow m-0 mb-4 text-ink-muted">
          In this article
        </h2>
        <ContentsLinks sections={sections} />
      </nav>
    </aside>
  );
}
