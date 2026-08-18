"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Real screenshots of the product sitting inside a marketing page. Inside the
 * Acid frame it is the product, so Sprout, the neutral app ground and 6px
 * corners are all legal: they are in the artwork, not in this markup.
 *
 * Each shot is a full-width capture, so it goes edge to edge inside the frame
 * rather than sitting in a padded box.
 */

/**
 * Every tab gets the same frame so the page does not jump when you click
 * across. The shots are 2438x1188, 2438x1146 and 2444x1476, so the shortest
 * one sets the ratio and the other two are cropped from the bottom. Cropping
 * here rather than in the files keeps the originals whole: change this ratio
 * and the whole strip follows.
 */
const RATIO = "aspect-[2438/1146]";

const TABS = [
  {
    label: "Overview",
    src: "/overview-preview.png",
    alt: "The Today screen: four suggestions worth doing, each with its reasoning, Saturday's ceremony times, and the season pace.",
  },
  {
    label: "Pipeline",
    src: "/pipeline-preview.png",
    alt: "The pipeline board: enquiries through to contract out, each column totalled, every card showing its date, value and source.",
  },
  {
    label: "Bookings",
    src: "/bookings-preview.png",
    alt: "A booking: run sheet down the left, deposit and balance both paid, and the notes for the day.",
  },
] as const;

export function ProductTabs() {
  const [tab, setTab] = useState(0);
  const shot = TABS[tab];

  return (
    <div>
      <div className="label-mono mb-3.5 flex items-center gap-3 text-acid">
        <span>Click through them</span>
        <span className="inline-block animate-nudge">&rarr;</span>
      </div>

      {/*
        The divider hairline rides on the button itself (inset, so it costs no
        width) rather than sitting in a gap behind the row. Tabs lift on hover
        and on select, and a gap-based rule would flash in and out as they move.
        Only two adjacent resting tabs need one: the acid tab separates itself.
      */}
      <div role="tablist" className="flex">
        {TABS.map((item, index) => {
          const on = tab === index;
          const divider = index > 0 && !on && tab !== index - 1;
          return (
            <button
              key={item.label}
              role="tab"
              id={`product-tab-${index}`}
              aria-selected={on}
              aria-controls={`product-panel-${index}`}
              onClick={() => setTab(index)}
              className={`label-mono flex-1 cursor-pointer border-0 px-3 py-4 text-[10px] tracking-[0.16em] transition-transform duration-300 ease-overshoot ${
                on
                  ? "-translate-y-[3px] bg-acid text-bottle"
                  : "bg-bottle text-cream hover:-translate-y-[2px]"
              } ${divider ? "shadow-[inset_1px_0_0_0_rgba(255,251,239,0.25)]" : ""}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`product-panel-${tab}`}
        aria-labelledby={`product-tab-${tab}`}
        className={`relative ${RATIO} border-2 border-t-0 border-acid bg-app`}
      >
        {/* object-top so the crop always comes off the bottom. */}
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 1180px) 100vw, 1180px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
