"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./wordmark";
import { WaitlistButton } from "./waitlist/waitlist-button";
import { NAV_LINKS } from "@/content/site";

// Anchor links have to be driven by hand. Left to the router they land at the
// wrong offset, because the section heights change under a smooth scroll as
// the Reveal blocks in between resolve. scrollIntoView honours the
// scroll-padding-top on <html>, so the nav never covers the heading.
function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/**
 * One ground on every page. It used to flip to Acid on About and Thanks so the
 * bar matched the flood beneath it, but that read as two different navs, so the
 * bar is Bottle everywhere and the flood starts under it.
 */
export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Arriving from another page, e.g. /about to /#pricing. The router restores
  // the hash before the page has settled, so do it again once it has.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  function onNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setMenuOpen(false);

    const [path, id] = href.split("#");
    // Only same-page anchors. Everything else is an ordinary navigation, and a
    // modified click is the user asking for a new tab.
    if (!id) return;
    if ((path || "/") !== pathname) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;

    if (scrollToId(id)) {
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <nav className="on-dark sticky top-0 z-50 border-b-2 border-bottle bg-bottle text-acid">
      <div className="flex items-center gap-8 px-6 py-3.5 sm:px-10">
        <Link href="/" className="shrink-0">
          <Wordmark className="text-[22px] sm:text-[26px]" />
        </Link>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => onNavClick(event, link.href)}
              className="label-mono text-[10px] tracking-[0.16em] hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <WaitlistButton variant="acid" size="sm">
            Join the waitlist
          </WaitlistButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="label-mono ml-auto cursor-pointer border-0 bg-transparent px-2 py-2 text-[10px] tracking-[0.16em] md:hidden"
          style={{ color: "currentColor" }}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-acid/20 bg-bottle px-6 pt-4 pb-6 text-acid md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => onNavClick(event, link.href)}
              className="label-mono py-2.5 text-[11px] tracking-[0.16em]"
            >
              {link.label}
            </Link>
          ))}
          <WaitlistButton variant="acid" size="sm" className="mt-3 w-full">
            Join the waitlist
          </WaitlistButton>
        </div>
      ) : null}
    </nav>
  );
}
