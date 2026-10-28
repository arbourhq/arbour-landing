import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type {
  ArticleFigure,
  ArticleImage,
} from "@/content/article-visuals/types";

import {
  SCREEN_DETAILS,
  SCREEN_PREVIEWS,
  type Crop,
  type ScreenDetail,
} from "./article-screenshot-crops";

function CloseUp({
  image,
  crop,
  className,
  alt,
}: {
  image: ArticleImage;
  crop: Crop;
  className: string;
  alt: string;
}) {
  const [x, y, width, height] = crop;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: `${image.width * width} / ${image.height * height}`,
      }}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        unoptimized
        className="absolute max-w-none"
        style={{
          width: `${10000 / width}%`,
          height: "auto",
          left: `${(-100 * x) / width}%`,
          top: `${(-100 * y) / height}%`,
        }}
      />
    </div>
  );
}

export function ArticleScreenshot({
  figure,
}: {
  figure: Extract<ArticleFigure, { kind: "screenshot" }>;
}) {
  const { image, focus } = figure;
  const filename = image.src.split("/").at(-1) ?? "";
  const explicit: ScreenDetail[] | undefined = focus
    ? [
        {
          label: "Selected screen detail",
          crop: [focus.x, focus.y, focus.w, focus.h],
        },
      ]
    : undefined;
  const preset = SCREEN_DETAILS[filename];
  const standard = SCREEN_PREVIEWS[filename];
  const details = explicit
    ? { desktop: explicit, mobile: explicit }
    : (preset ??
      (standard
        ? {
            desktop: [{ label: "", crop: standard[0] }],
            mobile: [{ label: "", crop: standard[1] }],
          }
        : undefined));
  const original = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 1023px) calc(100vw - 88px), 795px"
      unoptimized
      className={`block h-auto w-full object-contain ${image.height > image.width ? "mx-auto max-w-sm" : ""}`}
    />
  );

  return (
    <div className="overflow-hidden rounded-md border border-border-default bg-page">
      {details ? (
        <>
          <details className="peer group">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 bg-panel px-4 text-ui font-semibold text-bottle [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Show full screen</span>
              <span className="hidden group-open:inline">Show close-up</span>
              <span className="sr-only">: {figure.title}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 group-open:rotate-180"
              />
            </summary>
            <div className="border-t border-line">{original}</div>
          </details>
          <div className="border-t border-line peer-open:hidden">
            {(["desktop", "mobile"] as const).map((size) => (
              <div
                key={size}
                className={`grid gap-5 p-3 sm:p-4 ${size === "desktop" ? "hidden sm:grid" : "sm:hidden"}`}
              >
                {details[size].map((detail) => (
                  <div key={detail.label || size} className="min-w-0">
                    {detail.label ? (
                      <p className="m-0 mb-2 text-ui font-semibold text-ink">
                        {detail.label}
                      </p>
                    ) : null}
                    <CloseUp
                      image={image}
                      crop={detail.crop}
                      className="rounded-sm border border-line"
                      alt={`${figure.title}. ${detail.label || "Product screen detail"}. Close-up from the original screen.`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        original
      )}
    </div>
  );
}
