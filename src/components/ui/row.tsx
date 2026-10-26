/**
 * One row of the ruled sheet (globals.css, "The ruled sheet"). The section is
 * full bleed so its top rule runs the width of the window; the sheet inside
 * it is the column, whose side rules every row draws at the same x, so they
 * read as two unbroken lines from the nav to the footer. The marks where the
 * two meet are drawn by the sheet's own pseudo-elements.
 *
 * `band` floods the whole row: Bottle for a record that has become a booking
 * and for the close, Panel for a sunken passage. `first` drops the top rule
 * and its marks, for the row that starts under the nav. `still` keeps the
 * rule but skips drawing it in, for a row whose top sits at the fold on load,
 * where a half-drawn rule would read as a rendering fault.
 */
export function Row({
  id,
  labelledBy,
  band,
  first = false,
  still = false,
  className,
  sheetClassName,
  style,
  children,
}: {
  id?: string;
  labelledBy?: string;
  band?: "bottle" | "panel";
  first?: boolean;
  still?: boolean;
  className?: string;
  sheetClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ground =
    band === "bottle" ? "band-bottle" : band === "panel" ? "band-panel" : "";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      style={style}
      className={`ruled ${first ? "ruled-first" : still ? "" : "develop-rule"} ${ground} ${className ?? ""}`}
    >
      <div className={`sheet ${sheetClassName ?? ""}`}>{children}</div>
    </section>
  );
}
