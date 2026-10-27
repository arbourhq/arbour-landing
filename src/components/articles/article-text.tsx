import Link from "next/link";

/** Only links and source references are supported. React escapes the text. */
export function ArticleText({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\[\d+\])/g).map((part, index) => {
    const citation = part.match(/^\[(\d+)\]$/);
    if (citation) {
      return (
        <sup key={index} className="ml-0.5 text-[0.7em]">
          <a
            href={`#source-${citation[1]}`}
            aria-label={`Source ${citation[1]}`}
            className="rounded-xs text-bottle underline decoration-bottle/35 underline-offset-2 hover:decoration-bottle"
          >
            {part}
          </a>
        </sup>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (
        [...href].some(
          (character) => character === "\\" || character.charCodeAt(0) <= 32,
        )
      )
        return part;
      const className =
        "rounded-xs text-bottle underline decoration-bottle/35 underline-offset-4 hover:decoration-bottle";
      if (href.startsWith("/") && !href.startsWith("//")) {
        return (
          <Link key={index} href={href} className={className}>
            {label}
          </Link>
        );
      }
      if (href.startsWith("https://")) {
        return (
          <a key={index} href={href} className={className}>
            {label}
          </a>
        );
      }
    }
    return part;
  });
}
