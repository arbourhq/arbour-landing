import type { ReactNode } from "react";

/**
 * Holds the height of the tallest string in a set.
 *
 * The hero picker changes copy in five places, and the replacements are not
 * the same length: "Saturday is iced" against "Saturday is in the chair", a
 * 42 character automation against a 66 character one. On a phone that is one
 * line against two, so the hero grew and shrank on a timer and every section
 * under it moved with it.
 *
 * Every candidate is stacked in the same grid cell and only the current one
 * paints, so the box is always as tall as the longest option and a swap cannot
 * move the page. It also survives a copy rewrite, which a hand-set min-height
 * does not.
 *
 * Duplicates are collapsed: two categories share an automation trigger, and
 * painting the same string twice in one cell doubles its anti-aliasing.
 */
export function Reserve({
  text,
  all,
  className,
}: {
  text: string;
  all: readonly string[];
  className?: string;
}): ReactNode {
  return (
    <span className={`grid ${className ?? ""}`}>
      {[...new Set(all)].map((candidate) => (
        <span
          key={candidate}
          aria-hidden={candidate !== text}
          className={`col-start-1 row-start-1 ${candidate === text ? "" : "invisible"}`}
        >
          {candidate}
        </span>
      ))}
    </span>
  );
}
