export type Crop = readonly [
  x: number,
  y: number,
  width: number,
  height: number,
];

/** Close-ups of actual controls, expressed as percentages of each unchanged source. */
export const SCREEN_PREVIEWS: Record<
  string,
  readonly [desktop: Crop, mobile: Crop]
> = {
  "csv-mapping.webp": [
    [20, 24, 52, 75],
    [20, 27, 31, 46],
  ],
  "roles.webp": [
    [20, 30, 47, 42],
    [21, 42, 27, 29],
  ],
  "dubsado-export.webp": [
    [29.5, 8, 41, 84],
    [31, 21.5, 23, 64],
  ],
  "arby.webp": [
    [0, 0, 100, 40],
    [4, 12, 82, 27],
  ],
  "enquiries-board-poster.webp": [
    [2, 35, 65, 43],
    [3, 38, 30, 42],
  ],
  "calendar-poster.webp": [
    [37, 17, 60, 76],
    [63, 33, 34, 42],
  ],
  "payments-poster.webp": [
    [2, 32, 95, 52],
    [3, 30, 34, 42],
  ],
  "questionnaire.webp": [
    [20, 30, 55, 58],
    [20, 42, 31, 47],
  ],
  "run-sheet-settings.webp": [
    [20, 30, 65, 53],
    [20, 38, 34, 35],
  ],
  "workflow-editor.webp": [
    [20, 28, 76, 71],
    [20, 38, 30, 45],
  ],
  "task-list.webp": [
    [2, 21, 95, 34],
    [2, 24, 43, 22],
  ],
  "payment-plan.webp": [
    [0, 20, 72, 75],
    [0, 28, 41, 40],
  ],
};

export type ScreenDetail = { label: string; crop: Crop };
export type ScreenDetails = { desktop: ScreenDetail[]; mobile: ScreenDetail[] };

/** These are labelled extracts from one unchanged screen, not a rebuilt interface. */
export const SCREEN_DETAILS: Record<string, ScreenDetails> = {
  "booking-poster.webp": {
    desktop: [
      { label: "Contacts, event dates and crew", crop: [2, 48, 96, 51] },
      { label: "Payment status", crop: [72, 26, 26, 15] },
    ],
    mobile: [
      { label: "Contacts", crop: [3, 51, 32, 27] },
      { label: "Event dates", crop: [51, 51, 46, 18] },
      { label: "Crew", crop: [51, 70, 30, 13] },
      { label: "Payment status", crop: [72, 26, 26, 15] },
    ],
  },
  "reports.webp": {
    desktop: [
      { label: "Sales", crop: [2, 24, 47, 65] },
      { label: "Financial", crop: [52, 24, 47, 65] },
    ],
    mobile: [
      { label: "Sales", crop: [2, 24, 47, 65] },
      { label: "Financial", crop: [52, 24, 47, 65] },
    ],
  },
  "portal.webp": {
    desktop: [
      { label: "Quotes and invoice status", crop: [29, 46, 66, 30] },
      { label: "Upcoming dates", crop: [29, 81, 66, 18] },
    ],
    mobile: [
      { label: "Quote status", crop: [29, 46, 33, 30] },
      { label: "Invoice status", crop: [62, 46, 33, 30] },
      { label: "Upcoming dates", crop: [80, 85, 15, 14] },
    ],
  },
  "quote.webp": {
    desktop: [
      { label: "Itemised services and payment plan", crop: [2, 12, 96, 77] },
    ],
    mobile: [
      { label: "Quoted services", crop: [2, 20, 54, 25] },
      { label: "Quantities and prices", crop: [59, 20, 39, 28] },
      { label: "Payment plan", crop: [2, 52, 96, 38] },
    ],
  },
  "automation.webp": {
    desktop: [
      { label: "Rule name, trigger and conditions", crop: [20, 24, 52, 75] },
    ],
    mobile: [
      { label: "Rule name and action summary", crop: [20, 28, 44, 26] },
      { label: "Trigger and conditions", crop: [22, 55, 38, 44] },
    ],
  },
};
