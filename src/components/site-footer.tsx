import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NAV_LINKS } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-bottle px-6 py-9 text-cream sm:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-6">
        <Link href="/" className="text-acid">
          <Wordmark className="text-xl" />
        </Link>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-mono opacity-70 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="label-mono ml-auto opacity-60">
          Made for people who work weekends
        </p>
      </div>
    </footer>
  );
}
