import Image from "next/image";
import { ARBY_CAPTURE } from "@/content/stages";

/**
 * The real Arby sheet, whole. The capture is a full-height sheet whose
 * middle is empty until a chat starts: the starter questions sit at the
 * top and the composer is pinned to the foot. So it is shown as the sheet
 * reads in a shorter window, the top and the foot of the same screen joined
 * across the empty white between them, instead of a crop that cuts the
 * questions off and loses the composer. Nothing is redrawn; the seam falls
 * in white on both sides.
 */

const { width: W, height: H } = ARBY_CAPTURE;

/** Source pixels: the header and questions, then the composer and model. */
const SLICES = [
  [0, 700],
  [1456, H],
] as const;

export function ArbySheet({ className }: { className?: string }) {
  return (
    <figure className={`m-0 ${className ?? ""}`}>
      <div className="overflow-hidden rounded-md border border-border-default bg-page">
        {SLICES.map(([from, to], i) => (
          <div
            key={from}
            className="relative overflow-hidden"
            style={{ aspectRatio: `${W} / ${to - from}` }}
          >
            <Image
              src={ARBY_CAPTURE.src}
              alt={i === 0 ? ARBY_CAPTURE.alt : ""}
              width={W}
              height={H}
              sizes="(max-width: 640px) calc(100vw - 48px), 384px"
              unoptimized
              className="absolute inset-x-0 top-0 block h-auto w-full"
              style={{ transform: `translateY(-${(from / H) * 100}%)` }}
            />
          </div>
        ))}
      </div>
      <figcaption className="mono-label mt-3 flex min-h-9 items-center gap-2 text-ink-muted">
        <span
          aria-hidden="true"
          className="size-[7px] shrink-0 rounded-xs bg-track"
        />
        Real screen · Arby
      </figcaption>
    </figure>
  );
}
