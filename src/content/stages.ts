/**
 * The board. Five stages a job moves through, each carrying one real capture
 * of the console and the facts that stage is allowed to claim.
 *
 * The stage demos are Playwright recordings of the local seeded console.
 * Their posters, capture routes and provenance live in public/product/demos/.
 * Supporting facts are checked against the corresponding help articles.
 */

export type Capture = {
  src: string;
  alt: string;
  width: number;
  height: number;
} & (
  | { recording?: never; label?: never }
  | {
      /** Animated WebP, loaded only while visible and motion is allowed. */
      recording: string;
      label: string;
    }
);

export type StageFact = {
  label: string;
  body: string;
};

export type Ground = "cream" | "bottle" | "acid" | "sunken";

export type Accent = "cornflower" | "lilac" | "acid" | "coral";

export type Stage = {
  id: string;
  index: string;
  /** Rail label, full and short. */
  name: string;
  short: string;
  title: string;
  ground: Ground;
  /** The stage's one accent: the square by the numeral, the rail's active edge, the caption mark. */
  accent: Accent;
  capture: Capture;
  facts: StageFact[];
};

export const STAGES: Stage[] = [
  {
    id: "enquiry",
    index: "01",
    name: "Enquiry in",
    short: "Enquiry",
    title: "Every “are you free?” lands on the board.",
    ground: "cream",
    accent: "cornflower",
    capture: {
      src: "/product/demos/enquiries-board-poster.webp",
      recording: "/product/demos/enquiries-board.webp",
      label: "enquiries",
      alt: "The enquiries board switching between board and list views, with each enquiry’s contact, event date and package kept together.",
      width: 2880,
      height: 1800,
    },
    facts: [
      {
        label: "A form on your site",
        body: "Hosted or embedded, one public link that never changes. A submission is a card on the board with every answer on it.",
      },
      {
        label: "Your inbox, filed on the job",
        body: "Connect Gmail or Microsoft 365. Every thread with a contact sits on their enquiry, and a reply from Arbour goes out from your address.",
      },
      {
        label: "Stages are yours",
        body: "Rename, reorder, add and remove them. Saved views, filters, assignees, and a custom field for anything we did not think of.",
      },
      {
        label: "Coming from somewhere else",
        body: "Studio Ninja, Dubsado, Pixieset or Sprout Studio: zip up the export and the history comes across in one run. Anything else, upload the CSV and map the columns yourself.",
      },
    ],
  },
  {
    id: "quote",
    index: "02",
    name: "Quote out",
    short: "Quote",
    title: "Quote, contract, deposit. One chain.",
    ground: "bottle",
    accent: "lilac",
    capture: {
      src: "/product/demos/quote-poster.webp",
      recording: "/product/demos/quote.webp",
      label: "quote",
      alt: "A quote being edited: two lines, Photo and film and Extra reception hour, a $7,000 total including GST, then a payment plan with a 30% deposit on acceptance and the balance due before the event.",
      width: 2880,
      height: 1800,
    },
    facts: [
      {
        label: "Fixed or flexible",
        body: "Send it take-it-or-leave-it, or let the client tick the optional lines. Packages copy in with their price and their description.",
      },
      {
        label: "The contract rides on the quote",
        body: "Accepting freezes the wording and sends it for signature in the portal. Countersign if you want to. Nothing goes out without one.",
      },
      {
        label: "Deposit on acceptance",
        body: "Instalments come off a payment plan: a percentage on acceptance, the balance so many days before the event. Card through Stripe, or bank transfer.",
      },
      {
        label: "Revisions, not resends",
        body: "Edit a sent quote and it becomes a revision. The client keeps seeing the published one until you send the new one.",
      },
    ],
  },
  {
    id: "booked",
    index: "03",
    name: "Booked",
    short: "Booked",
    title: "Accepted. Same record, now a booking.",
    ground: "acid",
    accent: "acid",
    capture: {
      src: "/product/demos/booking-poster.webp",
      recording: "/product/demos/booking.webp",
      label: "booking",
      alt: "A booking for Ella & Jack on Saturday 3 October 2026: the stage strip across the header, $3,150 outstanding of $4,500, and the contacts, event dates, crew and client portal cards below.",
      width: 2880,
      height: 1800,
    },
    facts: [
      {
        label: "One private link per job",
        body: "Quotes, contracts, invoices, questionnaires, the run sheet and one conversation, under your logo and colours, on your own domain if you have one. No account, no password.",
      },
      {
        label: "The money, on the header",
        body: "Paid instalments ticked off, the next one dated, the outstanding figure in large type. Overdue turns red here, on the overview and in the portal.",
      },
      {
        label: "Questionnaires",
        body: "The questions you need answered before the day, with file uploads and revisions. Answers land on the job, not in a PDF.",
      },
      {
        label: "Custom fields",
        body: "Guest count, dietaries, shot list, load-in window. Yours to define, shown on the card, the board and the form.",
      },
    ],
  },
  {
    id: "day",
    index: "04",
    name: "The day",
    short: "The day",
    title: "The book, the run sheet, and who is where.",
    ground: "sunken",
    accent: "coral",
    capture: {
      src: "/product/demos/calendar-poster.webp",
      recording: "/product/demos/calendar.webp",
      label: "calendar",
      alt: "The October 2026 calendar opening Ella & Jack’s booking details, then switching between month and year views.",
      width: 2880,
      height: 1800,
    },
    facts: [
      {
        label: "One calendar, every job",
        body: "Enquiries, bookings and unavailable time in one grid, by year, month, week or day. Subscribe from your phone. Bridge Google or Outlook so a dentist appointment blocks the date.",
      },
      {
        label: "Run sheets the client can edit",
        body: "Timings on the booking's Day-of tab, shared into the portal. You decide whether they can view, add, edit or delete entries.",
      },
      {
        label: "Crew on the job",
        body: "Assign members to a booking. Everyone sees the work that is theirs; roles decide who sees the money.",
      },
      {
        label: "Reminders that count the days",
        body: "Automations run on a date around the event: the final-numbers questionnaire fourteen days out, the run sheet on the Tuesday.",
      },
    ],
  },
  {
    id: "paid",
    index: "05",
    name: "Paid",
    short: "Paid",
    title: "The whole job, banked.",
    ground: "bottle",
    accent: "acid",
    capture: {
      src: "/product/demos/payments-poster.webp",
      recording: "/product/demos/payments.webp",
      label: "payments",
      alt: "The payments overview: outstanding, overdue, collected and average days to pay across the top, a money-in chart, and the ageing bar underneath.",
      width: 2880,
      height: 1800,
    },
    facts: [
      {
        label: "Tax invoices with your numbering",
        body: "Your ABN, your sequence, GST included. Instalments follow the payment plan the quote was sent with.",
      },
      {
        label: "Xero or QuickBooks, one way",
        body: "Issued invoices, payments and refunds push across. Nothing your bookkeeper changes over there comes back to touch what the client sees.",
      },
      {
        label: "Reports, not a spreadsheet",
        body: "Enquiries, conversion, time to convert, booked revenue, outstanding, overdue, ageing. Export CSV from any card.",
      },
      {
        label: "Stripe under the hood",
        body: "Card payments and refunds through Stripe Connect, into your own account. Receipts go out on their own.",
      },
    ],
  },
];

/** The automations screen, for the quiet section. */
export const AUTOMATION_CAPTURE: Capture = {
  src: "/product/automation.webp",
  alt: "An automation rule, When a quote is sent, move the enquiry: the trigger set to when something happens, the event quote.sent, and no conditions.",
  width: 2880,
  height: 1800,
};

export const OVERVIEW_CAPTURE: Capture = {
  src: "/product/overview.webp",
  alt: "The console overview: a left rail with Start something, Needs you and Jump to, and the widget dashboard beside it.",
  width: 2880,
  height: 1800,
};
