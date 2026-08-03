import { Wordmark } from "@/components/wordmark";
import type { Category } from "@/content/categories";

/**
 * A mock of the product sitting inside a marketing page. This is the only
 * context on the site where Sprout, the neutral app ground and 6px corners are
 * allowed: inside the frame it is the product, outside it is marketing.
 */

const ROWS = [
  {
    name: "Nina & Theo",
    detail: "14 Feb · Merricks",
    tone: "paid" as const,
    badge: "Paid",
  },
  {
    name: "Hazel & Jun",
    detail: "28 Feb · Coldstream",
    tone: "late" as const,
    badge: "Overdue",
  },
  {
    name: "Priya & Sam",
    detail: "07 Mar · Red Hill",
    tone: "draft" as const,
    badge: "Draft",
  },
];

const BADGE_TONE = {
  paid: "bg-sprout text-bottle",
  late: "bg-coral text-white",
  draft: "bg-cornflower text-white",
};

function Stat({
  value,
  label,
  danger,
}: {
  value: string;
  label: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-md border border-app-ink/5 bg-app-panel px-4 py-3 text-center">
      <div
        className={`font-display text-2xl font-extrabold tracking-[-0.03em] ${
          danger ? "text-coral" : "text-app-ink"
        }`}
      >
        {value}
      </div>
      <div className="label-mono mt-1 text-[8px] text-app-faint">{label}</div>
    </div>
  );
}

export function HeroMock({ category }: { category: Category }) {
  return (
    <div className="relative overflow-hidden rounded-t-lg border-2 border-b-0 border-acid bg-app px-4 pt-5 pb-8 text-app-ink sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Wordmark className="text-[17px] text-bottle" />
        <div className="flex items-center gap-3.5">
          <span className="label-mono hidden text-app-muted sm:inline">
            The Tannery · Red Hill
          </span>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-md bg-bottle font-display text-xs font-extrabold text-sprout">
            RJ
          </span>
        </div>
      </div>

      <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="label-mono mb-2.5 text-app-muted">
            Tue 28 Jul · Red Hill
          </div>
          <div className="font-display text-[clamp(26px,5vw,38px)] leading-[0.94] font-extrabold tracking-[-0.035em]">
            Saturday is sorted
          </div>
          <p className="mt-2 max-w-[52ch] text-sm leading-snug text-app-muted">
            {category.heroSub}
          </p>
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-2.5">
          <Stat value="31" label="Booked" />
          <Stat value="$284k" label="Collected" />
          <Stat value="2" label="Chasing" danger />
        </div>
      </div>

      <div className="rounded-md border border-app-ink/5 bg-app-panel px-4 py-5 sm:px-5.5">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="label-mono text-app-faint">Next up</span>
          <span className="label-mono text-app-muted">All jobs &rarr;</span>
        </div>

        <div className="grid gap-2">
          {ROWS.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-md bg-app px-3.5 py-3 text-sm sm:grid-cols-[1.5fr_1.05fr_0.75fr_104px]"
            >
              <b className="font-semibold">{row.name}</b>
              <span className="order-3 text-app-muted sm:order-none">
                {row.detail}
              </span>
              <span className="order-4 hidden font-mono text-[10px] tracking-[0.06em] text-app-muted sm:order-none sm:block">
                {category.jobLabel}
              </span>
              <span
                className={`label-mono justify-self-end rounded-md px-2.5 py-1.5 text-[8px] tracking-[0.12em] sm:justify-self-start ${BADGE_TONE[row.tone]}`}
              >
                {row.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating app chrome. 6px corners are legal inside the product. */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-0.5 rounded-lg border border-app-ink/10 bg-app-panel p-1.5 shadow-[0_10px_28px_rgba(23,33,27,0.13),0_2px_5px_rgba(23,33,27,0.07)]">
          <span className="flex items-center gap-2 rounded-[5px] bg-bottle px-3 py-2.5 text-[13px] font-semibold text-white">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-[15px] w-[15px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="3" y="3" width="14" height="14" />
              <path d="M3 8h14M8 8v9" />
            </svg>
            Today
          </span>
          {[
            "M3 4h14v13H3zM3 8h14M7 2v4M13 2v4",
            "M10 16.5 4 9.5 10 3l6 6.5-6 7zM7 9.5h6",
            "M2.5 5h15v10h-15zM2.5 8.5h15",
          ].map((d) => (
            <span
              key={d}
              className="hidden rounded-[5px] px-3 py-2.5 text-app-ink sm:flex"
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-[15px] w-[15px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d={d} />
              </svg>
            </span>
          ))}
          <span className="mx-1.5 h-[22px] w-px bg-app-ink/10" />
          <span className="rounded-[5px] bg-bottle px-4 py-2.5 text-[13px] font-semibold text-acid">
            + New enquiry
          </span>
        </div>
      </div>
    </div>
  );
}
