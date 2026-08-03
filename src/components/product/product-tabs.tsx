"use client";

import { useState } from "react";
import type { Category } from "@/content/categories";

/** Product mock. Sprout, the neutral app ground and 6px corners are legal here. */

const TABS = ["Overview", "Bookings", "The job"] as const;

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-app-ink/5 bg-app-panel p-4 sm:p-5">
      {children}
    </div>
  );
}

function PanelHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div className="font-display text-[clamp(22px,4vw,30px)] font-extrabold tracking-[-0.03em]">
        {title}
      </div>
      <div className="label-mono text-app-faint">{meta}</div>
    </div>
  );
}

function Overview() {
  const stats = [
    { label: "Confirmed", value: "31" },
    { label: "In play", value: "$412k" },
    { label: "Collected", value: "$284k" },
    { label: "Overdue", value: "$5.9k", danger: true },
  ];

  const suggestions = [
    {
      title: "Ellery & Fox hold expires Friday",
      reason: "19 days, no deposit. Two others want that date.",
      action: "Chase",
    },
    {
      title: "Hazel & Jun, nine days overdue",
      reason: "$5,900 out, job in 32 days. Terms say 30.",
      action: "Remind",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <PanelHeader title="Overview" meta="Tue 28 Jul" />

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-app-ink/5 bg-app-panel px-4 py-3.5"
          >
            <div className="label-mono text-[8px] text-app-faint">
              {stat.label}
            </div>
            <div
              className={`mt-1 font-display text-[26px] font-extrabold tracking-[-0.03em] ${
                stat.danger ? "text-coral" : ""
              }`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <Panel>
        <div className="mb-2.5 flex items-center justify-between">
          <span className="label-mono text-app-faint">Worth doing</span>
          <span className="label-mono text-app-fainter">3 open</span>
        </div>
        <div className="grid gap-2.5">
          {suggestions.map((item) => (
            <div
              key={item.title}
              className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-app px-4 py-3.5"
            >
              <div>
                <div className="text-[15px] font-semibold">{item.title}</div>
                {/* Every suggestion states its reasoning from real data. */}
                <div className="mt-1 text-[13px] text-app-muted">
                  {item.reason}
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-bottle px-3.5 py-2.5 text-xs font-semibold text-white">
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Bookings() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const legend = [
    { label: "Confirmed", colour: "bg-sprout" },
    { label: "Hold", colour: "bg-lilac" },
    { label: "Draft", colour: "bg-cornflower" },
  ];

  const cells: {
    date: string;
    events?: { label: string; tone: "confirmed" | "hold" | "draft" }[];
  }[] = [
    { date: "09" },
    { date: "10" },
    { date: "11" },
    { date: "12" },
    { date: "13" },
    {
      date: "14",
      events: [
        { label: "Nina & Theo", tone: "confirmed" },
        { label: "Kade & Ro", tone: "confirmed" },
        { label: "+2 more", tone: "hold" },
      ],
    },
    { date: "15" },
    { date: "16" },
    { date: "17", events: [{ label: "Hold · Ellery", tone: "hold" }] },
    { date: "18" },
    { date: "19" },
    { date: "20" },
    { date: "21", events: [{ label: "Corporate · Ridge", tone: "draft" }] },
    { date: "22" },
  ];

  const eventTone = {
    confirmed: "bg-sprout text-bottle",
    hold: "bg-lilac text-bottle",
    draft: "bg-cornflower text-white",
  };

  return (
    <div className="flex flex-col gap-4">
      <PanelHeader title="Bookings" meta="February · 5 jobs" />

      <Panel>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day) => (
            <div
              key={day}
              className="label-mono pb-1 text-[8px] text-app-faint"
            >
              {day}
            </div>
          ))}
          {cells.map((cell) => (
            <div
              key={cell.date}
              className={`flex min-h-[70px] flex-col gap-1 rounded-md p-1.5 sm:min-h-[96px] ${
                cell.events ? "bg-app" : "bg-app-sunken"
              }`}
            >
              <span
                className={`pl-0.5 font-mono text-[9px] ${
                  cell.events ? "text-app-faint" : "text-app-fainter"
                }`}
              >
                {cell.date}
              </span>
              {cell.events?.map((event) => (
                <span
                  key={event.label}
                  className={`truncate rounded-[4px] px-1.5 py-1 text-[10px] leading-tight font-semibold sm:text-[11px] ${eventTone[event.tone]}`}
                >
                  {event.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Panel>

      <div className="label-mono flex flex-wrap items-center gap-3.5 text-[8px] text-app-faint">
        {legend.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <i className={`block h-2.5 w-2.5 rounded-[2px] ${item.colour}`} />
            {item.label}
          </span>
        ))}
        <span className="ml-auto hidden lg:inline">
          Four on one day stacks, click the cell for the day view
        </span>
      </div>
    </div>
  );
}

function TheJob({ category }: { category: Category }) {
  const jobTabs = [
    "Overview",
    "Contacts",
    "Run sheet",
    "Forms",
    "Money",
    "Files",
    "Activity",
  ];
  const active = new Set(["Overview", "Run sheet"]);

  return (
    <div className="flex flex-col gap-4">
      <PanelHeader title="Nina & Theo" meta={`14 Feb · ${category.meta}`} />

      <div className="label-mono flex flex-wrap gap-1.5 text-[8px]">
        {jobTabs.map((tab) => (
          <span
            key={tab}
            className={`rounded-md px-2.5 py-2 ${
              active.has(tab)
                ? "bg-bottle text-white"
                : "border border-app-ink/5 bg-app-panel text-app-faint"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <Panel>
        <div className="grid gap-2">
          {category.runSheet.map((row) => (
            <div
              key={row.time}
              className={`grid grid-cols-[20px_58px_1fr] items-center gap-3 rounded-md px-3.5 py-3 text-sm sm:grid-cols-[20px_66px_1fr_110px] ${
                row.done ? "bg-sprout-wash" : "bg-app"
              }`}
            >
              <span
                className={`block h-[15px] w-[15px] rounded-[4px] ${
                  row.done
                    ? "bg-sprout"
                    : "bg-app-panel shadow-[inset_0_0_0_1.5px_rgba(23,33,27,0.25)]"
                }`}
              />
              <span className="font-mono text-[11px]">{row.time}</span>
              <span
                className={row.done ? "text-app-muted line-through" : undefined}
              >
                {row.label}
              </span>
              <span
                className={`label-mono col-start-3 row-start-2 justify-self-start rounded-md px-2 py-1.5 text-[8px] tracking-[0.12em] sm:col-start-4 sm:row-start-1 ${
                  row.done ? "bg-sprout text-bottle" : "text-app-faint"
                }`}
              >
                {row.done ? "Confirmed" : (row.state ?? "Locked")}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function ProductTabs({ category }: { category: Category }) {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="label-mono mb-3.5 flex items-center gap-3 text-acid">
        <span>Click through them</span>
        <span className="inline-block animate-nudge">&rarr;</span>
      </div>

      <div role="tablist" className="flex gap-px bg-cream/25">
        {TABS.map((label, index) => {
          const on = tab === index;
          return (
            <button
              key={label}
              role="tab"
              id={`product-tab-${index}`}
              aria-selected={on}
              aria-controls={`product-panel-${index}`}
              onClick={() => setTab(index)}
              className={`label-mono flex-1 cursor-pointer border-0 px-3 py-4 text-[10px] tracking-[0.16em] transition-transform duration-300 ease-overshoot ${
                on
                  ? "-translate-y-[3px] bg-acid text-bottle"
                  : "bg-bottle text-cream hover:-translate-y-[2px]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`product-panel-${tab}`}
        aria-labelledby={`product-tab-${tab}`}
        className="min-h-[396px] border-2 border-t-0 border-acid bg-app px-4 py-6 text-app-ink sm:px-7"
      >
        {tab === 0 ? <Overview /> : null}
        {tab === 1 ? <Bookings /> : null}
        {tab === 2 ? <TheJob category={category} /> : null}
      </div>
    </div>
  );
}
