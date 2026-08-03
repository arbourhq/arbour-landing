/**
 * About content. Every claim here is one Ben or Alex has confirmed, so nothing
 * on this page is invented flavour dressed as history. Arbour is pre-launch and
 * waitlist only: no customer counts, no traction numbers, no "vendors already
 * running on it". The four figures that will drift are the wedding count, the
 * years writing software, the vendor conversations and the dates in TIMELINE.
 * Change them here.
 */

export const ABOUT_STATS = [
  { value: 340, suffix: "+", label: "Weddings worked, personally" },
  { value: 7, suffix: "", label: "Years writing software" },
  { value: 0, suffix: "", label: "Investors on the cap table" },
  { value: 10, suffix: "", label: "Vendors asked before a line of code" },
];

export const LENSES = [
  {
    id: "videographer",
    tab: "The videographer",
    tag: "Rec · 06:12 · card 2 of 4",
    headline: "A wedding is a live event you cannot re-shoot.",
    body: "You get one pass at the vows. One pass at the first look. If the run sheet says 15:30 and the celebrant starts at 15:12, you are not in position and that moment is simply gone. Nothing about the day is undoable, which is why every tool built for offices fails on it, offices assume you can try again on Tuesday.",
    sign: "Ben · ten years behind a camera, still shooting",
    lessons: [
      "The day-of screen came before the dashboard, not after it.",
      "Every timeline is written in minutes, not in “morning” and “afternoon”.",
      "Offline first. The best venues have the worst reception.",
      "A notification that arrives during the ceremony is a bug, not a feature.",
    ],
  },
  {
    id: "engineer",
    tab: "The engineer",
    tag: "Shipped · rollback ready",
    headline: "A wedding is forty deadlines pretending to be one.",
    body: "Deposits, contracts, final numbers, licences, load-in windows, dietaries, a balance due eleven days out. Each has an owner, a date and a way of failing quietly. That is a workflow engine, but every workflow engine on the market is built for software teams, so it has no idea what a NOIM is or why a florist cares about a cool room.",
    sign: "Alex · seven years writing software, one marketplace that failed",
    lessons: [
      "Custom fields, not our guess at your job. Every category runs differently.",
      "Automations are boring on purpose, boring is what you trust.",
      "One record per job, from first enquiry to final invoice.",
      "If two vendors disagree about a time, the system says who changed it.",
    ],
  },
];

/**
 * The real sequence, short because it is short. Two of these are failures and
 * they stay in: the marketplace is the reason Arbour exists, and a page that
 * hides it is the pitch-deck voice the brand doc bans.
 */
export const TIMELINE = [
  {
    year: "Apr 2025",
    body: "Met at uni. Ben had been shooting weddings for nine years by then, which came up in about the first ten minutes.",
    chip: "bg-bottle animate-drop origin-bottom",
    ground: "bg-cream",
  },
  {
    year: "2025",
    body: "Plandid: a marketplace for wedding creatives. We built the whole thing, both sides of it.",
    chip: "bg-cornflower animate-unfold origin-left",
    ground: "bg-cream",
  },
  {
    year: "Jun 2026",
    body: "Shut it down. The product worked. Getting it in front of anyone did not, and we could never agree what it was.",
    chip: "bg-coral animate-wob origin-top",
    ground: "bg-cream",
  },
  {
    year: "Jul 2026",
    body: "Ben runs the Love Poets crew on Studio Ninja. No two-way email sync, no Zapier, fixes that arrive next year. Ten other vendors said the same thing.",
    chip: "bg-lilac animate-squash origin-bottom",
    ground: "bg-cream",
  },
  {
    year: "Aug 2026",
    body: "Started building. Nothing is live yet. The waitlist gets in before anyone else.",
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
    ground: "bg-acid-wash text-bottle shadow-[inset_0_0_0_1px_rgba(15,42,30,0.2)]",
    chip: "bg-bottle animate-squash origin-bottom",
  },
  {
    title: "One thumb, or it is broken",
    body: "On the day you have one hand free at best. Every day-of screen is built for a thumb and a bad signal.",
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
    title: "We say no to most things",
    body: "Arbour will never do your tax, your website or your email marketing. It does weddings. That is the whole idea.",
    ground: "bg-acid text-bottle",
    chip: "bg-bottle animate-drop origin-bottom",
  },
];

export const FOUNDERS = [
  {
    name: "Ben",
    role: "Co-founder · runs the business, answers the email",
    bio: "Ten years shooting weddings, most of it freelance, most of it regional Victoria: Wangaratta, Albury, anywhere that is a two hour drive and a servo coffee away. Founded Love Poets in 2024 and runs the crew there, still shooting a few himself every season, which is the only reason the day-of mode is going to be any good. Will answer support on a Saturday, from a venue car park, usually eating something beige.",
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
    bio: "Seven years writing software, the last two of it in startups. Does the code, the product and the design, which is a polite way of saying every screen here is his fault. Came to weddings sideways: fixing Love Poets' tech, then a year building a wedding marketplace that nobody found.",
    footnote: "Has opinions about idempotency at parties",
    photo: "/alex.png" as string | null,
    photoAlt: "Alex, shoulders up, against a bottle green backdrop",
    ground: "bg-bottle",
    chip: "bg-cornflower animate-tilt",
  },
];
