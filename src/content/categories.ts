/**
 * The eleven vendor categories. Picking one re-skins the hero mock (the account
 * it is signed into, the headline, the stats, the jobs on the board), the
 * pipeline stages and counts, and the automation example. That is the whole
 * point: Arbour is not a photographer tool with other logos on it.
 *
 * Two of the rows are deliberately not weddings (a venue gala, a caterer's
 * staff party), because vendors run that work through the same board.
 */

// oxlint-disable unicorn/no-thenable -- `then` here is the automation's
// "when/then", not a promise.

export type RunSheetRow = {
  time: string;
  label: string;
  /** Ticked off already. Everything else is still ahead of you. */
  done?: boolean;
  /** Shown on rows that are not done. "Locked" unless the day says otherwise. */
  state?: string;
};

/**
 * One of the three numbers above the board. Keep `value` to about five
 * characters and `label` to about ten: they sit in a fixed three-up grid at
 * 9px mono and will not wrap gracefully. One stat per category carries
 * `danger`, which is the only Coral in the mock.
 */
export type MockStat = { value: string; label: string; danger?: boolean };

/** Badge colours inside the mock. Lilac is the soft hold, per the brand doc. */
export type RowTone = "paid" | "late" | "draft" | "hold";

export type MockRow = {
  /** Contact, not always a couple. */
  name: string;
  /** Date and place. */
  detail: string;
  /** The job in three words, mono, hidden under 640px. */
  line: string;
  /** About ten characters. The column is 104px. */
  badge: string;
  tone: RowTone;
};

export type Category = {
  name: string;
  /** The account the mock is signed into. A different business per category. */
  studio: { name: string; place: string; initials: string };
  /** Replaces "Saturday is sorted" as the mock's display line. */
  mockTitle: string;
  /** Sits under the mock title. */
  heroSub: string;
  stats: [MockStat, MockStat, MockStat];
  rows: [MockRow, MockRow, MockRow];
  /** Meta line on the job detail tab. */
  meta: string;
  /** Five pipeline stages. Accounts can change these, these are the defaults. */
  stages: [string, string, string, string, string];
  /** Counts under each stage. Illustrative, one vendor's book. */
  stageCounts: [number, number, number, number, number];
  automation: { when: string; then: string };
  runSheet: RunSheetRow[];
};

export const CATEGORIES: Category[] = [
  {
    name: "Photographers",
    studio: { name: "Fern & Fold", place: "Red Hill", initials: "FF" },
    mockTitle: "Saturday is sorted",
    heroSub:
      "Timeline agreed, shot list locked, both cards formatted. Nothing left to do but turn up.",
    stats: [
      { value: "31", label: "Booked" },
      { value: "$284k", label: "Collected" },
      { value: "2", label: "Chasing", danger: true },
    ],
    rows: [
      {
        name: "Nina & Theo",
        detail: "14 Feb · Merricks",
        line: "8hr coverage",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Hazel & Jun",
        detail: "28 Feb · Coldstream",
        line: "10hr + second",
        badge: "Overdue",
        tone: "late",
      },
      {
        name: "Priya & Sam",
        detail: "07 Mar · Red Hill",
        line: "6hr + album",
        badge: "Draft",
        tone: "draft",
      },
    ],
    meta: "Sent Tuesday · your shot list",
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
    runSheet: [
      { time: "07:30", label: "First light · detail flatlays", done: true },
      {
        time: "11:00",
        label: "Getting-ready coverage, both sides",
        done: true,
      },
      { time: "15:30", label: "Ceremony · under the arbour", state: "Locked" },
      {
        time: "17:45",
        label: "Golden hour, twelve minutes, non-negotiable",
        state: "Ambitious",
      },
      {
        time: "23:00",
        label: "Last dance, then cards backed up twice",
        state: "Locked",
      },
    ],
  },
  {
    name: "Videographers",
    studio: { name: "Northlight Films", place: "Fitzroy", initials: "NF" },
    mockTitle: "Saturday is in the can",
    heroSub:
      "Two cameras charged, audio backup packed, music licence sorted on Tuesday.",
    stats: [
      { value: "24", label: "Booked" },
      { value: "$196k", label: "Collected" },
      { value: "1", label: "Overdue", danger: true },
    ],
    rows: [
      {
        name: "Ivy & Marcus",
        detail: "21 Feb · Macedon",
        line: "film + teaser",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Georgia & Tom",
        detail: "14 Mar · Yarra Glen",
        line: "two cameras",
        badge: "Pencilled",
        tone: "hold",
      },
      {
        name: "Bec & Alicia",
        detail: "04 Apr · Fitzroy",
        line: "ceremony only",
        badge: "Draft",
        tone: "draft",
      },
    ],
    meta: "Sent Tuesday · two-camera plan",
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
    runSheet: [
      {
        time: "07:00",
        label: "Gear check · batteries, cards, spare audio",
        done: true,
      },
      {
        time: "11:00",
        label: "Prep b-roll while the light is soft",
        done: true,
      },
      {
        time: "15:30",
        label: "Ceremony · two angles, one backup mic",
        state: "Locked",
      },
      {
        time: "18:30",
        label: "Speeches, lav on whoever holds the mic",
        state: "Locked",
      },
      {
        time: "22:00",
        label: "Dance floor, then offload on site",
        state: "Locked",
      },
    ],
  },
  {
    name: "Florists",
    studio: { name: "Wildacre Floral", place: "Bellarine", initials: "WF" },
    mockTitle: "Saturday is conditioned",
    heroSub:
      "Stems ordered, cool room booked, install slot confirmed with the venue.",
    stats: [
      { value: "18", label: "Installs" },
      { value: "$71k", label: "Collected" },
      { value: "2", label: "Unpaid", danger: true },
    ],
    rows: [
      {
        name: "Sana & Will",
        detail: "08 Nov · Barwon Heads",
        line: "arbour + aisle",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Freya & Ollie",
        detail: "29 Nov · Bellarine",
        line: "12 tables",
        badge: "Quote out",
        tone: "draft",
      },
      {
        name: "Mei & Josh",
        detail: "13 Dec · Torquay",
        line: "install 12:00",
        badge: "Hold",
        tone: "hold",
      },
    ],
    meta: "Sent Tuesday · install plan",
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
    runSheet: [
      {
        time: "05:30",
        label: "Market run · check the peonies actually arrived",
        done: true,
      },
      { time: "08:00", label: "Conditioning in the cool room", done: true },
      { time: "12:00", label: "Arbour install on site", state: "Locked" },
      { time: "14:00", label: "Bouquets to the bridal suite", state: "Locked" },
      {
        time: "23:30",
        label: "Bump-out, vases back in the van",
        state: "Locked",
      },
    ],
  },
  {
    name: "Celebrants",
    studio: { name: "Marnie Doyle", place: "Mornington", initials: "MD" },
    mockTitle: "Saturday is legal",
    heroSub:
      "NOIM lodged in time, script approved, witnesses briefed. All legally boring.",
    stats: [
      { value: "42", label: "Ceremonies" },
      { value: "6", label: "NOIMs out" },
      { value: "1", label: "Overdue", danger: true },
    ],
    rows: [
      {
        name: "Tessa & Hamish",
        detail: "17 Jan · Mornington",
        line: "ceremony 15:30",
        badge: "NOIM in",
        tone: "paid",
      },
      {
        name: "Ana & Dev",
        detail: "07 Feb · Flinders",
        line: "script draft 2",
        badge: "Chasing",
        tone: "late",
      },
      {
        name: "Kirra & Nate",
        detail: "01 Mar · Sorrento",
        line: "elopement, 8",
        badge: "Pencilled",
        tone: "hold",
      },
    ],
    meta: "Sent Tuesday · paperwork checked",
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
    runSheet: [
      {
        time: "14:45",
        label: "Arrive, sound check, find the witnesses",
        done: true,
      },
      { time: "15:15", label: "Sign the witnesses in", done: true },
      { time: "15:30", label: "Ceremony · under the arbour", state: "Locked" },
      {
        time: "15:58",
        label: "Register signed, three signatures",
        state: "Locked",
      },
      { time: "16:10", label: "Certificate handed over", state: "Locked" },
    ],
  },
  {
    name: "Venues",
    studio: { name: "The Tannery", place: "Red Hill", initials: "TT" },
    mockTitle: "Saturday is staffed",
    heroSub:
      "Room flip scheduled, load-in window sent to nine suppliers, wet-weather call at one.",
    stats: [
      { value: "61", label: "Booked" },
      { value: "$1.4m", label: "Contracted" },
      { value: "4", label: "Holds due", danger: true },
    ],
    rows: [
      {
        name: "Lucy & Ari",
        detail: "27 Sep · Long Room",
        line: "122 guests",
        badge: "Signed",
        tone: "paid",
      },
      {
        name: "Marlowe Group",
        detail: "18 Oct · Long Room",
        line: "gala, 180 pax",
        badge: "Hold ends",
        tone: "late",
      },
      {
        name: "Sienna & Beau",
        detail: "08 Nov · The Lawn",
        line: "ceremony + 90",
        badge: "Site visit",
        tone: "draft",
      },
    ],
    meta: "Sent Tuesday · run of house",
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
    runSheet: [
      { time: "08:00", label: "Room flip from last night", done: true },
      { time: "12:00", label: "Vendor load-in window opens", done: true },
      {
        time: "15:30",
        label: "Ceremony on the lawn · wet-weather call at 13:00",
        state: "Weather",
      },
      { time: "18:00", label: "Service begins, 122 covers", state: "Locked" },
      { time: "00:30", label: "Bar close, staff out by one", state: "Locked" },
    ],
  },
  {
    name: "Caterers",
    studio: { name: "Long Table Co", place: "Coldstream", initials: "LT" },
    mockTitle: "Saturday is plated",
    heroSub:
      "Final numbers in, nine dietaries flagged, canapés timed to the photos.",
    stats: [
      { value: "122", label: "Covers Sat" },
      { value: "9", label: "Dietaries" },
      { value: "2", label: "Chasing", danger: true },
    ],
    rows: [
      {
        name: "Amira & Ned",
        detail: "11 Oct · Coldstream",
        line: "122 covers",
        badge: "Numbers in",
        tone: "paid",
      },
      {
        name: "Jess & Kaya",
        detail: "25 Oct · Healesville",
        line: "grazing + mains",
        badge: "Chasing",
        tone: "late",
      },
      {
        name: "Hollis & Co",
        detail: "02 Nov · Fitzroy",
        line: "staff party, 60",
        badge: "Tasting",
        tone: "draft",
      },
    ],
    meta: "Sent Tuesday · 122 covers",
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
    runSheet: [
      { time: "06:00", label: "Prep kitchen · sauces and garnish", done: true },
      { time: "13:00", label: "Load-in, set the pass", done: true },
      { time: "17:00", label: "Canapés out during photos", state: "Locked" },
      {
        time: "18:45",
        label: "Mains · 122 covers, 9 dietaries",
        state: "Locked",
      },
      {
        time: "22:00",
        label: "Late-night rolls, the real hero",
        state: "Locked",
      },
    ],
  },
  {
    name: "Bands & DJs",
    studio: { name: "Northside Sound", place: "Brunswick", initials: "NS" },
    mockTitle: "Saturday is loaded in",
    heroSub:
      "Set times agreed, do-not-play list received, one lift and no stairs. Allegedly.",
    stats: [
      { value: "38", label: "Booked" },
      { value: "$92k", label: "Collected" },
      { value: "1", label: "Date clash", danger: true },
    ],
    rows: [
      {
        name: "Zoe & Rafi",
        detail: "06 Dec · Brunswick",
        line: "4 x 45min",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Poppy & Dan",
        detail: "20 Dec · Kyneton",
        line: "DJ + sax",
        badge: "Clash",
        tone: "late",
      },
      {
        name: "Ash & Jordan",
        detail: "17 Jan · Daylesford",
        line: "ceremony PA",
        badge: "Pencilled",
        tone: "hold",
      },
    ],
    meta: "Sent Tuesday · set times",
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
    runSheet: [
      {
        time: "15:00",
        label: "Load-in · one lift, no stairs, allegedly",
        done: true,
      },
      { time: "16:00", label: "Sound check before guests arrive", done: true },
      { time: "18:00", label: "Dinner set · low and slow", state: "Locked" },
      {
        time: "20:30",
        label: "First dance, then straight into it",
        state: "Locked",
      },
      { time: "23:45", label: "Encore, then pack down", state: "Locked" },
    ],
  },
  {
    name: "Hair & makeup",
    studio: { name: "Pearl & Powder", place: "Torquay", initials: "PP" },
    mockTitle: "Saturday is in the chair",
    heroSub:
      "Timing plan sent, trial signed off, six faces in the right order.",
    stats: [
      { value: "27", label: "Booked" },
      { value: "6", label: "Faces Sat" },
      { value: "2", label: "Chasing", danger: true },
    ],
    rows: [
      {
        name: "Elke & Paddy",
        detail: "15 Nov · Torquay",
        line: "6 faces, 06:30",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Ruby & Cass",
        detail: "06 Dec · Anglesea",
        line: "hair only, 4",
        badge: "Trial due",
        tone: "draft",
      },
      {
        name: "Neve & Tom",
        detail: "10 Jan · Lorne",
        line: "bride + 3",
        badge: "Pencilled",
        tone: "hold",
      },
    ],
    meta: "Sent Tuesday · timing plan",
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
    runSheet: [
      { time: "06:30", label: "Arrive, set up by the good window", done: true },
      { time: "07:00", label: "Bridesmaid one · the early riser", done: true },
      { time: "09:30", label: "Mother of the bride", state: "Locked" },
      {
        time: "10:30",
        label: "Bride · 75 minutes, protected",
        state: "Locked",
      },
      { time: "11:45", label: "Touch-up kit handed over", state: "Locked" },
    ],
  },
  {
    name: "Stylists",
    studio: { name: "Saltbush Styling", place: "Barwon Heads", initials: "SB" },
    mockTitle: "Saturday is dressed",
    heroSub:
      "Hire confirmed, floor plan with the venue, twelve rounds to dress.",
    stats: [
      { value: "12", label: "Rounds Sat" },
      { value: "$64k", label: "Collected" },
      { value: "2", label: "Chasing", danger: true },
    ],
    rows: [
      {
        name: "Harriet & Lars",
        detail: "22 Nov · Barwon Heads",
        line: "12 rounds",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Immy & Rhys",
        detail: "13 Dec · Queenscliff",
        line: "hire + signage",
        badge: "Hire due",
        tone: "draft",
      },
      {
        name: "Tao & Bel",
        detail: "24 Jan · Ocean Grove",
        line: "tablescape only",
        badge: "Overdue",
        tone: "late",
      },
    ],
    meta: "Sent Tuesday · floor plan",
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
    runSheet: [
      {
        time: "09:00",
        label: "Hire delivery · count everything twice",
        done: true,
      },
      { time: "10:30", label: "Tablescape · twelve rounds", done: true },
      { time: "13:00", label: "Signage and seating chart", state: "Locked" },
      {
        time: "15:00",
        label: "Final walk-through with the planner",
        state: "Locked",
      },
      { time: "23:30", label: "De-style, hire collected", state: "Locked" },
    ],
  },
  {
    name: "Cake",
    studio: {
      name: "Sugar Gum Bakehouse",
      place: "Daylesford",
      initials: "SG",
    },
    mockTitle: "Saturday is iced",
    heroSub:
      "Three tiers, one spare, and the venue found a cold room after all.",
    stats: [
      { value: "19", label: "Booked" },
      { value: "3", label: "Tiers Sat" },
      { value: "1", label: "Unpaid", danger: true },
    ],
    rows: [
      {
        name: "Mabel & Finn",
        detail: "18 Oct · Daylesford",
        line: "3 tiers, figs",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Suri & Jack",
        detail: "08 Nov · Hepburn",
        line: "2 tiers + slab",
        badge: "Tasting",
        tone: "draft",
      },
      {
        name: "Clare & Rowan",
        detail: "29 Nov · Trentham",
        line: "naked finish",
        badge: "Pencilled",
        tone: "hold",
      },
    ],
    meta: "Sent Tuesday · three tiers",
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
    runSheet: [
      { time: "05:00", label: "Bake · three tiers, one spare", done: true },
      { time: "09:00", label: "Crumb coat and chill", done: true },
      {
        time: "13:00",
        label: "Final finish, fresh flowers on",
        state: "Locked",
      },
      {
        time: "15:00",
        label: "Delivery · cold room, not the sun",
        state: "Locked",
      },
      { time: "20:30", label: "Cut and served", state: "Locked" },
    ],
  },
  {
    name: "Planners",
    studio: { name: "Fieldnote Events", place: "Kyneton", initials: "FE" },
    mockTitle: "Saturday runs itself",
    heroSub:
      "Every supplier confirmed, every deposit cleared, run sheet went out Tuesday.",
    stats: [
      { value: "14", label: "Jobs live" },
      { value: "$412k", label: "Managed" },
      { value: "2", label: "Chasing", danger: true },
    ],
    rows: [
      {
        name: "Anouk & Felix",
        detail: "14 Feb · Merricks",
        line: "9 vendors",
        badge: "Paid",
        tone: "paid",
      },
      {
        name: "Sasha & Cormac",
        detail: "21 Mar · Kyneton",
        line: "full planning",
        badge: "Chasing",
        tone: "late",
      },
      {
        name: "Delphi & Wren",
        detail: "11 Apr · Macedon",
        line: "on the day only",
        badge: "Proposal",
        tone: "draft",
      },
    ],
    meta: "Sent Tuesday · 9 vendors",
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
    runSheet: [
      { time: "07:30", label: "Florist load-in · Merricks Barn", done: true },
      { time: "11:00", label: "Hair & makeup, bridal suite", done: true },
      { time: "15:30", label: "Ceremony · under the arbour", state: "Locked" },
      {
        time: "17:45",
        label: "Speeches, keep Uncle Rob to four minutes",
        state: "Optimistic",
      },
      {
        time: "23:00",
        label: "Band out, lights up, everyone into taxis",
        state: "Locked",
      },
    ],
  },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);
