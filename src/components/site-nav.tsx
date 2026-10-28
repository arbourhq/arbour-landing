"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./wordmark";
import { TrialLink } from "./trial-link";
import { buttonClass } from "./ui/button";
import { APP, NAV_LINKS } from "@/content/site";

// Anchor links are driven by hand. Left to the router they land at the wrong
// offset while the rows between are still developing; scrollIntoView honours
// the scroll-padding-top on <html>, so the bar never covers the heading.
function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

const LINK =
  "inline-flex h-9 items-center rounded-sm px-3 text-ui font-semibold text-ink-secondary transition-colors duration-[var(--duration-base)] hover:bg-panel hover:text-ink aria-[current=page]:bg-bottle aria-[current=page]:text-on-dark";

/**
 * The console's floating bar, at the top of the window instead of the foot:
 * white, a Line border, 6px corners and the lifted shadow, the one kind of
 * object allowed to cast it. It lines up with the sheet's column rules, so
 * the page's construction carries straight through it.
 *
 * Fixed rather than sticky, so the first row's column rules can start at the
 * top of the window and run behind it. A 2px Sprout line along its foot
 * fills with reading progress.
 */
export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // scroll-padding-top has to clear the bar exactly. It changes height when
  // the phone menu opens, so it is measured rather than hard-coded; the open
  // menu is excluded so anchors do not jump while it is down.
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (el.dataset.open === "true") return;
      document.documentElement.style.setProperty(
        "--nav-h",
        `${el.offsetHeight}px`,
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reading progress, written straight to the node so a scroll does not
  // re-render the nav.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = progress.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Arriving from another page, e.g. /about to /#pricing. The router restores
  // the hash before the page has settled, so do it again once it has.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function onNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    setMenuOpen(false);
    const [path, id] = href.split("#");
    if (!id) return;
    if ((path || "/") !== pathname) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if (scrollToId(id)) {
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
    }
  }

  const current = (href: string) =>
    !href.includes("#") && pathname === href ? "page" : undefined;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-(--nav-gap) z-50">
      <nav
        ref={bar}
        aria-label="Main"
        data-open={menuOpen}
        className="sheet-frame pointer-events-auto relative overflow-hidden rounded-md border border-line bg-page shadow-lifted"
      >
        <div className="flex h-14 items-center gap-6 pr-2 pl-4 sm:pl-5">
          <Link
            href="/"
            aria-label="Arbour, home"
            className="-mx-1 rounded-sm px-1 py-1.5 max-lg:inline-flex max-lg:min-h-11 max-lg:items-center"
          >
            <Wordmark title={null} className="text-title sm:text-section" />
          </Link>

          <ul className="m-0 ml-auto hidden list-none items-center gap-1 p-0 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current(link.href)}
                  onClick={(event) => onNavClick(event, link.href)}
                  className={LINK}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <a
              href={APP.signIn}
              className={buttonClass("ghost", "sm", "max-sm:hidden")}
            >
              Log in
            </a>
            <TrialLink size="sm" className="max-[379px]:hidden" />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className={buttonClass("secondary", "sm", "lg:hidden")}
            >
              {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div
            id="site-menu"
            className="max-h-[calc(100dvh-var(--nav-gap)*2-3.5rem-2px)] animate-swap overflow-y-auto overscroll-contain border-t border-line px-2 pt-2 pb-3 lg:hidden"
          >
            <ul className="m-0 grid list-none gap-0.5 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current(link.href)}
                    onClick={(event) => onNavClick(event, link.href)}
                    className={`${LINK} h-11 w-full`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={APP.signIn} className={`${LINK} h-11 w-full`}>
                  Log in
                </a>
              </li>
            </ul>
            {/* The bar already carries the trial from 380px up. */}
            <TrialLink size="md" className="mt-2 w-full min-[380px]:hidden" />
          </div>
        ) : null}

        <span
          ref={progress}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-sprout"
        />
      </nav>
    </div>
  );
}
