/**
 * The eleven vendor categories. Picking one re-skins the hero mock, the
 * pipeline stages, the run sheet and the automation example, which is the
 * whole point: Arbour is not a photographer tool with other logos on it.
 *
 * Ported verbatim from the design bundle's marketing-site template.
 */

export type RunSheetRow = {
  time: string;
  label: string;
  /** Ticked off already. Everything else is still ahead of you. */
  done?: boolean;
  /** Shown on rows that are not done. "Locked" unless the day says otherwise. */
  state?: string;
};

export type Category = {
  name: string;
  /** Sits under "Saturday is sorted" in the hero mock. */
  heroSub: string;
  /** The one-line job descriptor in the hero's Next up rows. */
  jobLabel: string;
  /** Meta line on the job detail tab. */
  meta: string;
  /** Five pipeline stages. Accounts can change these, these are the defaults. */
  stages: [string, string, string, string, string];
  automation: { when: string; then: string };
  runSheet: RunSheetRow[];
};

/** Counts shown under each pipeline stage. Illustrative, one vendor's book. */
export const STAGE_COUNTS = [9, 5, 3, 2, 31] as const;

export const CATEGORIES: Category[] = [
  {
    name: "Photographers",
    heroSub:
      "Timeline agreed, shot list locked, both cards formatted. Nothing left to do but turn up.",
    jobLabel: "8hr coverage",
    meta: "Sent Tuesday · your shot list",
    stages: [
      "Enquiry in",
      "Date held",
      "Contract out",
      "Deposit paid",
      "Gallery delivered",
    ],
    automation: {
      when: "A couple books you",
      then: "Send the shot-list questionnaire and diarise the engagement session",
    },
    runSheet: [
      { time: "07:30", label: "First light · detail flatlays", done: true },
      { time: "11:00", label: "Getting-ready coverage, both sides", done: true },
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
    heroSub:
      "Two cameras charged, audio backup packed, music licence sorted on Tuesday.",
    jobLabel: "film + teaser",
    meta: "Sent Tuesday · two-camera plan",
    stages: [
      "Enquiry in",
      "Date held",
      "Contract out",
      "Deposit paid",
      "Film delivered",
    ],
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
      { time: "11:00", label: "Prep b-roll while the light is soft", done: true },
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
      { time: "22:00", label: "Dance floor, then offload on site", state: "Locked" },
    ],
  },
  {
    name: "Florists",
    heroSub:
      "Stems ordered, cool room booked, install slot confirmed with the venue.",
    jobLabel: "install 12:00",
    meta: "Sent Tuesday · install plan",
    stages: [
      "Enquiry in",
      "Consult booked",
      "Quote sent",
      "Deposit paid",
      "Installed",
    ],
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
      { time: "23:30", label: "Bump-out, vases back in the van", state: "Locked" },
    ],
  },
  {
    name: "Celebrants",
    heroSub:
      "NOIM lodged in time, script approved, witnesses briefed. All legally boring.",
    jobLabel: "ceremony 15:30",
    meta: "Sent Tuesday · paperwork checked",
    stages: [
      "Enquiry in",
      "Date held",
      "NOIM lodged",
      "Deposit paid",
      "Ceremony done",
    ],
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
      { time: "15:58", label: "Register signed, three signatures", state: "Locked" },
      { time: "16:10", label: "Certificate handed over", state: "Locked" },
    ],
  },
  {
    name: "Venues",
    heroSub:
      "Room flip scheduled, load-in window sent to nine suppliers, wet-weather call at one.",
    jobLabel: "122 guests",
    meta: "Sent Tuesday · run of house",
    stages: [
      "Enquiry in",
      "Site visit",
      "Hold placed",
      "Contract signed",
      "Event run",
    ],
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
    heroSub: "Final numbers in, nine dietaries flagged, canapés timed to the photos.",
    jobLabel: "122 covers",
    meta: "Sent Tuesday · 122 covers",
    stages: [
      "Enquiry in",
      "Tasting booked",
      "Quote sent",
      "Final numbers",
      "Served",
    ],
    automation: {
      when: "It is fourteen days out",
      then: "Request the final headcount and dietaries, twice if they go quiet",
    },
    runSheet: [
      { time: "06:00", label: "Prep kitchen · sauces and garnish", done: true },
      { time: "13:00", label: "Load-in, set the pass", done: true },
      { time: "17:00", label: "Canapés out during photos", state: "Locked" },
      { time: "18:45", label: "Mains · 122 covers, 9 dietaries", state: "Locked" },
      { time: "22:00", label: "Late-night rolls, the real hero", state: "Locked" },
    ],
  },
  {
    name: "Bands & DJs",
    heroSub:
      "Set times agreed, do-not-play list received, one lift and no stairs. Allegedly.",
    jobLabel: "4 x 45min",
    meta: "Sent Tuesday · set times",
    stages: ["Enquiry in", "Date held", "Contract out", "Deposit paid", "Played"],
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
    heroSub: "Timing plan sent, trial signed off, six faces in the right order.",
    jobLabel: "6 faces",
    meta: "Sent Tuesday · timing plan",
    stages: ["Enquiry in", "Trial booked", "Quote sent", "Deposit paid", "Done"],
    automation: {
      when: "The trial is finished",
      then: "Send the timing plan and the night-before hair-wash reminder",
    },
    runSheet: [
      { time: "06:30", label: "Arrive, set up by the good window", done: true },
      { time: "07:00", label: "Bridesmaid one · the early riser", done: true },
      { time: "09:30", label: "Mother of the bride", state: "Locked" },
      { time: "10:30", label: "Bride · 75 minutes, protected", state: "Locked" },
      { time: "11:45", label: "Touch-up kit handed over", state: "Locked" },
    ],
  },
  {
    name: "Stylists",
    heroSub: "Hire confirmed, floor plan with the venue, twelve rounds to dress.",
    jobLabel: "12 rounds",
    meta: "Sent Tuesday · floor plan",
    stages: [
      "Enquiry in",
      "Mood board sent",
      "Quote sent",
      "Deposit paid",
      "Styled",
    ],
    automation: {
      when: "The deposit clears",
      then: "Lock the hire items and send the floor plan to the venue",
    },
    runSheet: [
      { time: "09:00", label: "Hire delivery · count everything twice", done: true },
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
    heroSub: "Three tiers, one spare, and the venue found a cold room after all.",
    jobLabel: "3 tiers",
    meta: "Sent Tuesday · three tiers",
    stages: [
      "Enquiry in",
      "Tasting booked",
      "Quote sent",
      "Deposit paid",
      "Delivered",
    ],
    automation: {
      when: "It is ten days out",
      then: "Confirm tiers, flavours and whether the venue has a cold room",
    },
    runSheet: [
      { time: "05:00", label: "Bake · three tiers, one spare", done: true },
      { time: "09:00", label: "Crumb coat and chill", done: true },
      { time: "13:00", label: "Final finish, fresh flowers on", state: "Locked" },
      { time: "15:00", label: "Delivery · cold room, not the sun", state: "Locked" },
      { time: "20:30", label: "Cut and served", state: "Locked" },
    ],
  },
  {
    name: "Planners",
    heroSub:
      "Every supplier confirmed, every deposit cleared, run sheet went out Tuesday.",
    jobLabel: "9 vendors",
    meta: "Sent Tuesday · 9 vendors",
    stages: [
      "Enquiry in",
      "Discovery call",
      "Proposal sent",
      "Deposit paid",
      "Day run",
    ],
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
