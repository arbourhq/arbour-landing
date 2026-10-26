import { SOCIALS } from "@/content/bio";

/**
 * The console's outline icon buttons: a 44px square at the 6px corner, an
 * input-strength border, the glyph in Ink. The glyphs are the platforms' own
 * marks, so they keep their own shapes. A platform with no account yet sits
 * on Panel with its glyph in Ink faint, and is not a link.
 */

const TILE =
  "flex size-11 items-center justify-center rounded-md border transition-[background-color,border-color,transform] duration-[var(--duration-base)]";

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="size-5"
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
      className="size-5"
      fill="currentColor"
    >
      <path d="M12.6 2h3.1a4.9 4.9 0 0 0 4.4 4.3v3.1a7.9 7.9 0 0 1-4.4-1.4v6a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.2a2.9 2.9 0 1 0 2 2.7V2Z" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="size-5"
      fill="currentColor"
    >
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function BioSocials() {
  return (
    <ul className="m-0 flex list-none gap-2 p-0">
      {SOCIALS.map((social) => (
        <li key={social.name}>
          {social.href ? (
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`${TILE} border-input bg-page text-ink hover:border-input-hover hover:bg-panel`}
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
            // No account yet, so nothing to click. The tile holds the spot so
            // the row does not jump the day it goes up, and carries the glyph
            // quietly so it reads as "not yet" rather than as a broken image.
            <span
              title="Facebook, not yet"
              className={`${TILE} border-transparent bg-panel text-ink-faint`}
            >
              <FacebookGlyph />
              <span className="sr-only">Facebook, not yet</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
