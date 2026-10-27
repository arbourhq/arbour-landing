import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type {
  ArticleFigure,
  ArticleImage,
} from "@/content/article-visuals/types";

type Crop = readonly [x: number, y: number, width: number, height: number];

/** Close-ups of actual controls, expressed as percentages of each unchanged source. */
const PREVIEWS: Record<string, readonly [desktop: Crop, mobile: Crop]> = {
  "automation.webp": [
    [20, 24, 52, 75],
    [20, 54, 29, 46],
  ],
  "csv-mapping.webp": [
    [20, 24, 52, 75],
    [20, 27, 31, 46],
  ],
  "portal.webp": [
    [29, 44, 67, 35],
    [29, 46, 32, 30],
  ],
  "roles.webp": [
    [20, 30, 47, 42],
    [21, 42, 27, 29],
  ],
  "dubsado-export.webp": [
    [29.5, 8, 41, 84],
    [31, 21.5, 23, 64],
  ],
  "arby.webp": [
    [0, 0, 100, 40],
    [4, 12, 82, 27],
  ],
  "booking-poster.webp": [
    [61, 17, 37, 27],
    [73, 24, 25, 18],
  ],
  "enquiries-board-poster.webp": [
    [2, 35, 65, 43],
    [3, 38, 30, 42],
  ],
  "calendar-poster.webp": [
    [37, 17, 60, 76],
    [63, 33, 34, 42],
  ],
  "payments-poster.webp": [
    [2, 32, 95, 52],
    [3, 30, 34, 42],
  ],
  "reports.webp": [
    [2, 23, 47, 68],
    [3, 24, 31, 64],
  ],
  "questionnaire.webp": [
    [20, 30, 55, 58],
    [20, 42, 31, 47],
  ],
  "run-sheet-settings.webp": [
    [20, 30, 65, 53],
    [20, 38, 34, 35],
  ],
  "workflow-editor.webp": [
    [20, 28, 76, 71],
    [20, 38, 30, 45],
  ],
  "task-list.webp": [
    [2, 21, 95, 34],
    [2, 24, 43, 22],
  ],
  "quote.webp": [
    [2, 12, 96, 77],
    [2, 49, 39, 40],
  ],
  "payment-plan.webp": [
    [0, 20, 72, 75],
    [0, 28, 41, 40],
  ],
};

function CloseUp({
  image,
  crop,
  className,
}: {
  image: ArticleImage;
  crop: Crop;
  className: string;
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
        alt={`Close-up. ${image.alt}`}
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
  const fallback: Crop | undefined = focus
    ? [focus.x, focus.y, focus.w, focus.h]
    : undefined;
  const previews =
    PREVIEWS[filename] ?? (fallback ? [fallback, fallback] : undefined);
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
      {previews ? (
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
            <CloseUp
              image={image}
              crop={previews[0]}
              className="hidden sm:block"
            />
            <CloseUp image={image} crop={previews[1]} className="sm:hidden" />
          </div>
        </>
      ) : (
        original
      )}
    </div>
  );
}
