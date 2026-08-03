"use client";

import { useState } from "react";
import { LENSES } from "@/content/about";

export function Lenses() {
  const [active, setActive] = useState(0);
  const lens = LENSES[active];

  return (
    <>
      <div
        role="tablist"
        className="grid grid-cols-2 gap-px bg-ink/20 lg:w-[calc(50%-0.5px)]"
      >
        {LENSES.map((item, i) => {
          const on = active === i;
          return (
            <button
              key={item.id}
              role="tab"
              id={`lens-tab-${i}`}
              aria-selected={on}
              aria-controls="lens-panel"
              onClick={() => setActive(i)}
              className={`label-mono cursor-pointer border-0 px-3.5 py-4 text-[10px] tracking-[0.16em] ${
                on ? "bg-bottle text-acid" : "bg-cream text-ink"
              }`}
            >
              {item.tab}
            </button>
          );
        })}
      </div>

      <div
        id="lens-panel"
        role="tabpanel"
        aria-labelledby={`lens-tab-${active}`}
        className="grid gap-px bg-ink/20 lg:grid-cols-2"
      >
        <div className="on-dark flex min-h-[400px] flex-col gap-5 bg-bottle p-8 text-cream sm:p-10">
          <div className="flex items-center gap-3">
            {lens.id === "videographer" ? (
              <span className="block h-3 w-3 animate-rec rounded-full bg-coral" />
            ) : null}
            <span className="label-mono text-acid">{lens.tag}</span>
          </div>
          <p className="m-0 max-w-[20ch] font-display text-[clamp(28px,4.5vw,40px)] leading-[0.98] font-extrabold tracking-[-0.035em] text-acid">
            {lens.headline}
          </p>
          <p className="m-0 max-w-[46ch] text-[17px] leading-relaxed opacity-85">
            {lens.body}
          </p>
          <p className="label-mono mt-auto text-acid/80">{lens.sign}</p>
        </div>

        <div className="flex min-h-[400px] flex-col bg-cream p-8 sm:p-10">
          <p className="label-mono mb-5 opacity-50">What that taught Arbour</p>
          {lens.lessons.map((lesson) => (
            <div
              key={lesson}
              className="border-t border-dashed border-ink/30 py-4 text-[16px] leading-snug"
            >
              {lesson}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
