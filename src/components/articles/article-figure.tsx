import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { ArticleScreenshot } from "@/components/articles/article-screenshot";
import { ArticleText } from "@/components/articles/article-text";
import type { ArticleFigure as ArticleFigureData } from "@/content/article-visuals/types";

function Screenshot({
  figure,
}: {
  figure: Extract<ArticleFigureData, { kind: "screenshot" }>;
}) {
  const { image } = figure;

  return (
    <>
      <ArticleScreenshot figure={figure} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
        {image.kind === "product" ? (
          <span className="mono-label text-ink-muted">
            Real product screen · demo data
          </span>
        ) : null}
        <a
          href={image.src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-9 items-center gap-2 rounded-sm text-ui font-semibold text-bottle underline underline-offset-4 hover:decoration-bottle/50"
        >
          Open full-size image
          <span className="sr-only">: {figure.title}</span>
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </>
  );
}

function Steps({
  figure,
}: {
  figure: Extract<ArticleFigureData, { kind: "steps" }>;
}) {
  return (
    <ol className="m-0 grid list-none divide-y divide-line rounded-md bg-panel px-5 py-1 inset-shadow-depth-panel sm:px-6">
      {figure.items.map((item, index) => (
        <li
          key={item.label}
          className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-4 py-5"
        >
          <span
            aria-hidden="true"
            className="headline flex size-8 items-center justify-center rounded-sm bg-bottle text-title text-on-dark"
          >
            {index + 1}
          </span>
          <div>
            <p className="m-0 text-body font-semibold leading-[1.5] text-ink">
              <ArticleText text={item.label} />
            </p>
            <p className="m-0 mt-1.5 text-ui leading-[1.6] text-ink-secondary">
              <ArticleText text={item.detail} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- The horizontal table scroll region needs keyboard focus for arrow-key scrolling. */
function ComparisonTable({
  figure,
}: {
  figure: Extract<ArticleFigureData, { kind: "table" }>;
}) {
  return (
    <>
      <section
        aria-label={`${figure.title}, scrollable table`}
        tabIndex={0}
        className="max-w-full overflow-x-auto rounded-md border border-border-default"
      >
        <table className="min-w-full border-collapse text-left text-ui leading-[1.6]">
          <caption className="sr-only">{figure.title}</caption>
          <thead className="bg-panel">
            <tr>
              {figure.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="min-w-36 border-b border-line px-4 py-4 align-top font-semibold text-ink"
                >
                  <ArticleText text={column} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-page">
            {figure.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th
                      key={index}
                      scope="row"
                      className="px-4 py-4 align-top font-semibold text-ink"
                    >
                      <ArticleText text={cell} />
                    </th>
                  ) : (
                    <td
                      key={index}
                      className="px-4 py-4 align-top text-ink-secondary"
                    >
                      <ArticleText text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="m-0 mt-3 flex items-center gap-2 text-caption text-ink-muted lg:hidden">
        <MoveHorizontal aria-hidden="true" className="size-4" /> Scroll across
        to compare.
      </p>
    </>
  );
}
/* oxlint-enable jsx-a11y/no-noninteractive-tabindex */

function Bars({
  figure,
}: {
  figure: Extract<ArticleFigureData, { kind: "bars" }>;
}) {
  const maximum = Math.max(1, ...figure.items.map((item) => item.value));

  return (
    <div className="rounded-md bg-panel p-5 inset-shadow-depth-panel sm:p-6">
      <ul className="m-0 grid list-none gap-6 p-0">
        {figure.items.map((item) => (
          <li key={item.label}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-body text-ink">
                <ArticleText text={item.label} />
              </span>
              <span className="headline text-section tabular-nums text-bottle">
                {item.displayValue}
              </span>
            </div>
            <div aria-hidden="true" className="h-3 rounded-xs bg-panel-hover">
              <div
                className="h-full rounded-xs bg-bottle"
                style={{
                  width: `${(Math.max(0, item.value) / maximum) * 100}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-4 text-caption text-ink-muted">
        <span>0</span>
        <a
          href={`#source-${figure.sourceId}`}
          className="rounded-xs text-bottle underline underline-offset-4 hover:decoration-bottle/50"
        >
          Source {figure.sourceId}
        </a>
      </div>
    </div>
  );
}

/** Each visual explains the adjoining section and retains its source caption. */
export function ArticleFigure({ figure }: { figure: ArticleFigureData }) {
  return (
    <figure aria-label={figure.title} className="mx-0 my-10 min-w-0">
      <h3 className="headline m-0 mb-4 text-title leading-[1.2] text-ink sm:text-section">
        <ArticleText text={figure.title} />
      </h3>
      {figure.kind === "screenshot" ? <Screenshot figure={figure} /> : null}
      {figure.kind === "steps" ? <Steps figure={figure} /> : null}
      {figure.kind === "table" ? <ComparisonTable figure={figure} /> : null}
      {figure.kind === "bars" ? <Bars figure={figure} /> : null}
      <figcaption className="mt-4 text-ui leading-[1.6] text-ink-secondary">
        <ArticleText text={figure.caption} />
      </figcaption>
    </figure>
  );
}
