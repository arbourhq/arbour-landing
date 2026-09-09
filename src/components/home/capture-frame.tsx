import Image from "next/image";
import type { Capture } from "@/content/stages";

/**
 * A real screenshot of the console sitting inside a marketing page. Inside the
 * frame it is the product, so Sprout, the neutral app ground and 6px corners
 * are all legal: they are in the artwork, not in this markup. The frame itself
 * is square, two pixels, in whichever ink the ground takes.
 */

export type FrameTone = "bottle" | "acid";

const FRAME: Record<FrameTone, string> = {
  bottle: "border-bottle",
  acid: "border-acid",
};

export function CaptureFrame({
  capture,
  tone,
  caption,
  mark,
  sizes,
  priority = false,
  className,
}: {
  capture: Capture;
  tone: FrameTone;
  caption?: string;
  /** A background class for the small square before the caption: the stage's accent. */
  mark?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className ?? ""}`}>
      <div className={`overflow-hidden border-2 bg-app ${FRAME[tone]}`}>
        <Image
          src={capture.src}
          alt={capture.alt}
          width={capture.width}
          height={capture.height}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="label-mono mt-3 flex items-center gap-2.5 opacity-80">
          {mark ? (
            <span
              aria-hidden="true"
              className={`block h-2.5 w-2.5 shrink-0 ${mark}`}
            />
          ) : null}
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
