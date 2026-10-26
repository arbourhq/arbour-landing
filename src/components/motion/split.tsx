import { Fragment } from "react";

/**
 * A headline set word by word (globals.css, "Reveal"). Each word is an
 * inline block carrying its place in the line as `--i`, so the stagger is
 * pure CSS and this stays a server component. The spaces stay real text, so
 * the line wraps, balances, copies and reads exactly as it did before.
 *
 * The heading around it decides when it plays: `data-reveal` on screen, or
 * `reveal-now` on mount.
 */
export function Split({ text, from = 0 }: { text: string; from?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="split-word"
            style={{ "--i": from + i } as React.CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
