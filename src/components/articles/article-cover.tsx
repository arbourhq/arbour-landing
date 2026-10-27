import Image from "next/image";
import type { ArticleImage } from "@/content/article-visuals/types";

/** Colour treatment belongs to photography. Product controls stay readable. */
export function ArticleCover({
  image,
  sizes,
  preload = false,
  compact = false,
  linkCredit = false,
}: {
  image: ArticleImage;
  sizes: string;
  preload?: boolean;
  compact?: boolean;
  linkCredit?: boolean;
}) {
  const photo = image.kind === "photo";
  return (
    <figure className="m-0 flex h-full flex-col justify-center bg-panel">
      <div
        className={`relative aspect-[3/2] overflow-hidden ${photo ? "bg-bottle" : "bg-panel"}`}
      >
        <Image
          src={image.src}
          alt={compact ? "" : image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          preload={preload}
          className={`absolute inset-0 h-full w-full ${photo ? "object-cover object-[center_60%] opacity-85 mix-blend-luminosity grayscale" : "object-contain p-2 sm:p-4"}`}
        />
      </div>
      {!compact ? (
        <figcaption className="border-t border-rule px-4 py-3 text-caption leading-[1.5] text-ink-muted sm:px-5">
          {image.credit ? (
            linkCredit ? (
              <a
                href={image.credit.href}
                className="rounded-xs underline underline-offset-4 hover:text-bottle"
              >
                {image.credit.label}
              </a>
            ) : (
              image.credit.label
            )
          ) : (
            "Product screen, demonstration data"
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}
