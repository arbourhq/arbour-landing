/**
 * About content. Every claim here is one Ben or Alex has confirmed, so nothing
 * on this page is invented flavour dressed as history. Arbour is pre-launch and
 * waitlist only: no customer counts, no traction numbers, no "vendors already
 * running on it". The figures that will drift are the wedding count, the years
 * writing software and the dates in TIMELINE. Change them here.
 */

export const ABOUT_STATS = [
  { value: 250, suffix: "+", label: "Weddings worked, personally" },
  { value: 7, suffix: "", label: "Years writing software" },
  { value: 0, suffix: "", label: "Investors on the cap table" },
];

export const LENSES = [
  {
    id: "videographer",
    tab: "The videographer",
    tag: "Rec · 06:12 · card 1 of 2",
    headline: "A wedding is a live event you cannot re-shoot.",
    body: "You get one pass at the vows. One pass at the first look. If the run sheet says 15:30 and the celebrant starts at 15:12, you are not in position and that moment is simply gone. Nothing about the day is undoable, which is why every tool built for offices fails on it, offices assume you can try again on Tuesday.",
    sign: "Ben · ten years behind a camera, still shooting",
    lessons: [
      "Every timeline is written in minutes, not in “morning” and “afternoon”.",
      "If a time moves, everything hanging off it moves with it.",
      "The run sheet needs to be dynamic and reactive.",
      "Wedding suppliers need software that speaks their language.",
    ],
  },
  {
    id: "engineer",
    tab: "The engineer",
    tag: "Shipped · rollback ready",
    headline: "A wedding is forty deadlines pretending to be one.",
    body: "Deposits, contracts, final numbers, licences, load-in windows, dietaries, a balance due eleven days out. Each has an owner, a date and a way of failing quietly. That is a workflow engine, but every workflow engine on the market is built for software teams, so it has no idea what a NOIM is or why a florist cares about a cool room.",
    sign: "Alex · seven years writing software, still shipping",
    lessons: [
      "Custom fields, not our guess at your job. Every vendor runs differently.",
      "Automations are boring on purpose, boring is what you trust.",
      "One record per job, from first enquiry to final invoice.",
      "If two vendors disagree about a time, the system says who changed it.",
    ],
  },
];

/**
 * The real sequence, short because it is short. Three entries, so the grid on
 * the about page runs three across rather than five.
 */
export const TIMELINE = [
  {
    year: "Apr 2025",
    body: "Met at uni. Ben had been shooting weddings for nine years by then, which came up in about the first ten minutes.",
    chip: "bg-bottle animate-drop origin-bottom",
    ground: "bg-cream",
  },
  {
    year: "Jun 2026",
    body: "Couple of industry products worked on together, now was the time to get serious. Where are Ben's main pain points? Software.",
    chip: "bg-cornflower animate-unfold origin-left",
    ground: "bg-cream",
  },
  {
    year: "Aug 2026",
    body: "In motion. Platform skeleton in production. Waitlist early-access on the way.",
    chip: "bg-bottle animate-spin-slow",
    ground: "bg-acid",
  },
];

export const RULES = [
  {
    title: "We work weekends too",
    body: "Support will answer on a Saturday because that is when the job is. Anyone who has shot a wedding knows Monday help is no help.",
    ground: "on-dark bg-bottle text-cream",
    titleClass: "text-acid",
    chip: "bg-acid animate-pop origin-bottom-left",
  },
  {
    title: "No feature that only a demo needs",
    body: "If it does not survive a real Saturday, it does not ship. We test on our own weddings first.",
    ground:
      "bg-acid-wash text-bottle shadow-[inset_0_0_0_1px_rgba(15,42,30,0.2)]",
    chip: "bg-bottle animate-squash origin-bottom",
  },
  {
    title: "One thumb, or it is broken",
    body: "On the day you have one hand free at best. Every mobile screen is built for a thumb and a bad signal.",
    ground: "bg-coral text-cream",
    chip: "bg-cream animate-wob origin-top",
  },
  {
    title: "Your data leaves whenever you like",
    body: "Full export, one button, no phone call, no retention specialist. Lock-in is not a business model, it is a hostage situation.",
    ground: "bg-cornflower text-cream",
    chip: "bg-cream animate-unfold origin-left",
  },
  {
    title: "Nobody gets charged per couple",
    body: "A busy season should not cost you more to record. Price is per seat, and a good year is yours.",
    ground: "bg-lilac text-bottle",
    chip: "bg-bottle animate-tilt",
  },
  {
    title: "Weddings first",
    body: "Arbour is built for weddings first, but versatile enough to use in a commercial setting.",
    ground: "bg-acid text-bottle",
    chip: "bg-bottle animate-drop origin-bottom",
  },
];

export const FOUNDERS = [
  {
    name: "Ben",
    role: "Co-founder · runs the business, answers the email",
    bio: "Ten years shooting weddings, mostly regional Victoria. Anywhere the love's strong and the coffee's good. Founded Love Poets in 2024, still shooting a few himself every season. Will answer support on a Saturday from a venue carpark with a camera in the opposite hand.",
    footnote: "Knows where the good light is at 5pm in March",
    /** Shot on Bottle, so the panel behind it is Bottle and the two meet. */
    photo: "/ben.png" as string | null,
    photoAlt: "Ben, shoulders up, against a bottle green backdrop",
    ground: "bg-bottle",
    chip: "bg-coral animate-wob origin-top",
  },
  {
    name: "Alex",
    role: "Co-founder · builds the whole thing",
    bio: "Seven years writing software, the last two of them in startups. Does the code, the product, and the support. That's a polite way of saying every screen here is his fault. Came to weddings sideways, through fixing Love Poets' tech, and here we are today.",
    footnote: "Has opinions about idempotency at parties",
    photo: "/alex.png" as string | null,
    photoAlt: "Alex, shoulders up, against a bottle green backdrop",
    ground: "bg-bottle",
    chip: "bg-cornflower animate-tilt",
  },
];
