"use client";

import { useCategory } from "@/components/category-context";

/**
 * The hero's live fragment: the chosen category's pipeline, five stages in
 * the vendor's own words with a count under each, drawn the way the console
 * draws a progress bar (a Panel hover track, a Bottle bar gliding to length,
 * the radius following the height). The last stage is the done pile, so it
 * takes Sprout, the console's success colour.
 *
 * Illustrative, one vendor's book, and it says so on its face.
 */
export function PipelineFragment() {
  const { category } = useCategory();
  const max = Math.max(...category.stageCounts);
  const last = category.stages.length - 1;

  return (
    <div className="rounded-md border border-border-default bg-page">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5">
        <p className="headline m-0 text-title text-ink">Pipeline</p>
        <span
          key={category.name}
          className="mono-label animate-swap rounded-sm bg-bottle-wash px-2 py-1.5 font-semibold text-bottle"
        >
          {category.name}
        </span>
      </div>
      {/* The label column is sized for the longest stage name in any
          category ("Gallery delivered"), so the bars hold still when the
          category changes. */}
      <ol className="m-0 list-none p-0">
        {category.stages.map((stage, i) => {
          const count = category.stageCounts[i];
          return (
            <li
              key={i}
              className="grid grid-cols-[8.75rem_minmax(0,1fr)_2.5rem] items-center gap-3 border-t border-line px-5 py-2"
            >
              <span
                key={stage}
                className="mono-label animate-swap truncate text-ink-muted"
              >
                {stage}
              </span>
              <span className="block h-2.5 overflow-hidden rounded-sm bg-panel-hover">
                <span
                  className={`pipe-bar block h-full rounded-sm transition-[width] duration-[320ms] ease-glide motion-reduce:transition-none ${
                    i === last ? "bg-sprout" : "bg-bottle"
                  }`}
                  style={
                    {
                      width: `${Math.max(4, (count / max) * 100)}%`,
                      "--i": i,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span
                key={`${category.name}-${count}`}
                className="headline animate-flip text-right text-title text-ink tabular-nums"
              >
                {count}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mono-label m-0 border-t border-line px-5 py-2.5 text-ink-muted">
        Illustrative · one vendor&rsquo;s book
      </p>
    </div>
  );
}
