import { SOCIALS } from "@/content/bio";

/**
 * Square tiles, hairline in Acid, sitting straight under the branding. The
 * glyphs are the platforms' own marks, so they keep their own shapes: this is
 * the one place on the site where a rounded corner is somebody else's call.
 */

const TILE =
  "flex h-13 w-13 items-center justify-center transition-transform duration-300 ease-overshoot";

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-5.5 w-5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-5.5 w-5.5"
      fill="currentColor"
    >
      <path d="M12.6 2h3.1a4.9 4.9 0 0 0 4.4 4.3v3.1a7.9 7.9 0 0 1-4.4-1.4v6a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.2a2.9 2.9 0 1 0 2 2.7V2Z" />
    </svg>
  );
}

export function BioSocials() {
  return (
    <ul className="flex list-none gap-2.5 p-0">
      {SOCIALS.map((social) => (
        <li key={social.name}>
          {social.href ? (
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`${TILE} bg-transparent text-acid shadow-[inset_0_0_0_1.5px_rgba(198,255,61,0.4)] hover:-translate-y-1 hover:rotate-[-3deg] hover:bg-acid hover:text-bottle`}
            >
              {social.name === "Instagram" ? (
                <InstagramGlyph />
              ) : (
                <TikTokGlyph />
              )}
              <span className="sr-only">
                {social.name} {social.handle}
              </span>
            </a>
          ) : (
            // No account yet, so no glyph and nothing to click. The tile holds
            // the spot so the row does not jump the day it goes up.
            <div
              aria-hidden="true"
              className={`${TILE} shadow-[inset_0_0_0_1.5px_rgba(198,255,61,0.16)]`}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
