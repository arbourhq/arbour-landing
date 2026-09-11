/**
 * The eleven vendor categories. Picking one re-skins the hero board (the stage
 * names and counts), the vendor chips further down and the automation example.
 * That is the whole point: Arbour is not a photographer tool with other logos
 * on it.
 *
 * Everything here is illustrative: one vendor's book, invented, and the page
 * says so beside it. The stage names are what an organisation in that
 * category might rename the defaults to; the product ships New enquiry,
 * Qualified and Quote sent and lets you customise the pipeline from there.
 */

// oxlint-disable unicorn/no-thenable -- `then` here is the automation's
// "when/then", not a promise.

export type Category = {
  name: string;
  /** Five pipeline stages, in the vendor's own words. */
  stages: [string, string, string, string, string];
  /** Counts under each stage. Illustrative, one vendor's book. */
  stageCounts: [number, number, number, number, number];
  automation: { when: string; then: string };
};

export const CATEGORIES: Category[] = [
  {
    name: "Photographers",
    stages: [
      "Enquiry in",
      "Date held",
      "Contract out",
      "Deposit paid",
      "Gallery delivered",
    ],
    stageCounts: [9, 5, 3, 2, 31],
    automation: {
      when: "A couple books you",
      then: "Send over a confirmation and questionnaire",
    },
  },
  {
    name: "Videographers",
    stages: [
      "Enquiry in",
      "Date held",
      "Contract out",
      "Deposit paid",
      "Film delivered",
    ],
    stageCounts: [7, 4, 3, 2, 24],
    automation: {
      when: "The deposit clears",
      then: "Send the music licence form and book the second shooter",
    },
  },
  {
    name: "Florists",
    stages: [
      "Enquiry in",
      "Consult booked",
      "Quote sent",
      "Deposit paid",
      "Installed",
    ],
    stageCounts: [12, 6, 4, 3, 18],
    automation: {
      when: "A quote is accepted",
      then: "Order stems six weeks out and send the care sheet",
    },
  },
  {
    name: "Celebrants",
    stages: [
      "Enquiry in",
      "Date held",
      "NOIM lodged",
      "Deposit paid",
      "Ceremony done",
    ],
    stageCounts: [11, 7, 5, 3, 42],
    automation: {
      when: "A date goes on hold",
      then: "Send the NOIM and diarise the one-month legal deadline",
    },
  },
  {
    name: "Venues",
    stages: [
      "Enquiry in",
      "Site visit",
      "Hold placed",
      "Contract signed",
      "Event run",
    ],
    stageCounts: [23, 9, 6, 4, 61],
    automation: {
      when: "A hold expires in 48 hours",
      then: "Chase the couple and flag the date as at risk",
    },
  },
  {
    name: "Caterers",
    stages: [
      "Enquiry in",
      "Tasting booked",
      "Quote sent",
      "Final numbers",
      "Served",
    ],
    stageCounts: [14, 6, 5, 3, 37],
    automation: {
      when: "It is fourteen days out",
      then: "Request the final headcount and dietaries, twice if they go quiet",
    },
  },
  {
    name: "Bands & DJs",
    stages: [
      "Enquiry in",
      "Date held",
      "Contract out",
      "Deposit paid",
      "Played",
    ],
    stageCounts: [10, 6, 4, 2, 38],
    automation: {
      when: "A booking is confirmed",
      then: "Send the do-not-play list and confirm power and load-in access",
    },
  },
  {
    name: "Hair & makeup",
    stages: [
      "Enquiry in",
      "Trial booked",
      "Quote sent",
      "Deposit paid",
      "Done",
    ],
    stageCounts: [13, 7, 4, 3, 27],
    automation: {
      when: "The trial is finished",
      then: "Send the timing plan and the night-before hair-wash reminder",
    },
  },
  {
    name: "Stylists",
    stages: [
      "Enquiry in",
      "Mood board sent",
      "Quote sent",
      "Deposit paid",
      "Styled",
    ],
    stageCounts: [8, 5, 3, 2, 22],
    automation: {
      when: "The deposit clears",
      then: "Lock the hire items and send the floor plan to the venue",
    },
  },
  {
    name: "Cake",
    stages: [
      "Enquiry in",
      "Tasting booked",
      "Quote sent",
      "Deposit paid",
      "Delivered",
    ],
    stageCounts: [6, 4, 3, 2, 19],
    automation: {
      when: "It is ten days out",
      then: "Confirm tiers, flavours and whether the venue has a cold room",
    },
  },
  {
    name: "Planners",
    stages: [
      "Enquiry in",
      "Discovery call",
      "Proposal sent",
      "Deposit paid",
      "Day run",
    ],
    stageCounts: [5, 3, 2, 2, 14],
    automation: {
      when: "A supplier goes quiet for five days",
      then: "Nudge them, copy nobody, and tell you only if they still ignore it",
    },
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);
