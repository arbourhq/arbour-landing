/**
 * A leaf of the book, flat on the page: the same paper the home page's 3D
 * book is printed on (src/components/book), drawn in the DOM. White stock,
 * a hairline edge and the 6px corner; a running head in mono small print
 * (a label on the outer side, a note by the gutter) over a hairline; what
 * the page carries; and its foot, small print with a folio when it has one.
 *
 * `head` prints something else in the running head's place, such as a title
 * that is the page's name, so no label sits above it.
 *
 * Every state is something paper does: a leaf lifts toward the reader when
 * it is pointed at, never washes with colour.
 */
type LeafHead =
  | { label: React.ReactNode; note?: React.ReactNode; head?: never }
  | { head: React.ReactNode; label?: never; note?: never };

export function Leaf({
  label,
  note,
  head,
  foot,
  folio,
  lift = false,
  className,
  bodyClassName,
  style,
  children,
  as: Tag = "div",
}: LeafHead & {
  foot?: React.ReactNode;
  /** The page number, printed at the foot's outer corner. */
  folio?: React.ReactNode;
  /** Lift toward the reader on hover and focus. */
  lift?: boolean;
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  as?: "div" | "figure" | "article" | "li";
}) {
  const footContent =
    foot || folio ? (
      <>
        <span>{foot}</span>
        {folio ? <span className="leaf-folio">{folio}</span> : null}
      </>
    ) : null;
  return (
    <Tag
      className={`leaf ${lift ? "leaf-lift" : ""} ${className ?? ""}`}
      style={style}
    >
      <div className="leaf-head">
        {head ?? (
          <>
            <span className="mono-label text-ink">{label}</span>
            {note ? (
              <span className="mono-label text-ink-muted">{note}</span>
            ) : null}
          </>
        )}
      </div>
      <div className={`leaf-body ${bodyClassName ?? ""}`}>{children}</div>
      {footContent ? (
        Tag === "figure" ? (
          <figcaption className="leaf-foot mono-label">
            {footContent}
          </figcaption>
        ) : (
          <div className="leaf-foot mono-label">{footContent}</div>
        )
      ) : null}
    </Tag>
  );
}
