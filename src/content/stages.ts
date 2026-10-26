/**
 * The board. Five stages a job moves through, each carrying one real capture
 * of the console and the facts that stage is allowed to claim.
 *
 * Fact regions and each stage's phone close-up are measured off the poster
 * frames in public/product/demos/; re-measure them when a recording is
 * refreshed, because the poster is the frame they point at.
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

/** A box on a capture's poster frame, in percent of its width and height. */
export type Region = { x: number; y: number; w: number; h: number };

export type StageFact = {
  label: string;
  body: string;
  /**
   * Where the poster frame shows the claim, when it does. Hovering or
   * focusing the claim holds the poster and rings these boxes. A claim the
   * screen cannot show has none, rather than a box pointing at something
   * nearby.
   */
  regions?: Region[];
};

export type Stage = {
  id: string;
  index: string;
  /** Rail label, full and short. */
  name: string;
  short: string;
  title: string;
  capture: Capture;
  /** The close-up a phone shows, in percent of the frame. */
  focus: Region;
  facts: StageFact[];
};

export const STAGES: Stage[] = [
  {
    id: "enquiry",
    index: "01",
    name: "Enquiry in",
    short: "Enquiry",
    title: "Every “are you free?” lands on the board.",
    capture: {
      src: "/product/demos/enquiries-board-poster.webp",
      recording: "/product/demos/enquiries-board.webp",
      label: "enquiries",
      alt: "The enquiries board switching between board and list views, with each enquiry’s contact, event date and package kept together.",
      width: 2880,
      height: 1800,
    },
    focus: { x: 3, y: 36, w: 34, h: 42 },
    facts: [
      {
        label: "A form on your site",
        body: "Hosted or embedded, one public link that never changes. A submission is a card on the board with every answer on it.",
        regions: [{ x: 4, y: 43.3, w: 18.1, h: 33 }],
      },
      {
        label: "Your inbox, filed on the job",
        body: "Connect Gmail or Microsoft 365. Every thread with a contact sits on their enquiry, and a reply from Arbour goes out from your address.",
      },
      {
        label: "Stages are yours",
        body: "Rename, reorder, add and remove them. Saved views, filters, assignees, and a custom field for anything we did not think of.",
        regions: [
          { x: 3, y: 38.6, w: 62.4, h: 4.9 },
          { x: 76.3, y: 14.8, w: 11.4, h: 5.1 },
        ],
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
    capture: {
      src: "/product/demos/quote-poster.webp",
      recording: "/product/demos/quote.webp",
      label: "quote",
      alt: "A quote being edited: two lines, Photo and film and Extra reception hour, a $7,000 total including GST, then a payment plan with a 30% deposit on acceptance and the balance due before the event.",
      width: 2880,
      height: 1800,
    },
    focus: { x: 50, y: 15, w: 34, h: 42 },
    facts: [
      {
        label: "Fixed or flexible",
        body: "Send it take-it-or-leave-it, or let the client tick the optional lines. Packages copy in with their price and their description.",
        regions: [
          { x: 58.3, y: 17.6, w: 10.2, h: 4.6 },
          { x: 15.6, y: 27.8, w: 39.4, h: 6.8 },
        ],
      },
      {
        label: "The contract rides on the quote",
        body: "Accepting freezes the wording and sends it for signature in the portal. Countersign if you want to. Nothing goes out without one.",
      },
      {
        label: "Deposit on acceptance",
        body: "Instalments come off a payment plan: a percentage on acceptance, the balance so many days before the event. Card through Stripe, or bank transfer.",
        regions: [{ x: 15.6, y: 58.6, w: 67.8, h: 15 }],
      },
      {
        label: "Revisions, not resends",
        body: "Edit a sent quote and it becomes a revision. The client keeps seeing the published one until you send the new one.",
        regions: [
          { x: 15.6, y: 7, w: 38.4, h: 7.2 },
          { x: 72.2, y: 87.6, w: 11.3, h: 4.8 },
        ],
      },
    ],
  },
  {
    id: "booked",
    index: "03",
    name: "Booked",
    short: "Booked",
    title: "Accepted. Same record, now a booking.",
    capture: {
      src: "/product/demos/booking-poster.webp",
      recording: "/product/demos/booking.webp",
      label: "booking",
      alt: "A booking for Ella & Jack on Saturday 3 October 2026: the stage strip across the header, $3,150 outstanding of $4,500, and the contacts, event dates, crew and client portal cards below.",
      width: 2880,
      height: 1800,
    },
    focus: { x: 62, y: 16, w: 36, h: 27 },
    facts: [
      {
        label: "One private link per job",
        body: "Quotes, contracts, invoices, questionnaires, the run sheet and one conversation, under your logo and colours, on your own domain if you have one. No account, no password.",
        regions: [
          { x: 3.1, y: 81.9, w: 45.6, h: 16.1 },
          { x: 63.4, y: 20, w: 8.8, h: 4.4 },
        ],
      },
      {
        label: "The money, on the header",
        body: "Paid instalments ticked off, the next one dated, the outstanding figure in large type. Overdue turns red here, on the overview and in the portal.",
        regions: [{ x: 73.6, y: 26.7, w: 22.7, h: 12 }],
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
    capture: {
      src: "/product/demos/calendar-poster.webp",
      recording: "/product/demos/calendar.webp",
      label: "calendar",
      alt: "The October 2026 calendar opening Ella & Jack’s booking details, then switching between month and year views.",
      width: 2880,
      height: 1800,
    },
    focus: { x: 62, y: 36, w: 34, h: 42 },
    facts: [
      {
        label: "One calendar, every job",
        body: "Enquiries, bookings and unavailable time in one grid, by year, month, week or day. Subscribe from your phone. Bridge Google or Outlook so a dentist appointment blocks the date.",
        regions: [
          { x: 3.1, y: 31.7, w: 32.6, h: 3.7 },
          { x: 73.5, y: 23.9, w: 22.8, h: 4.8 },
          { x: 78.3, y: 12.2, w: 6.4, h: 4 },
        ],
      },
      {
        label: "Run sheets the client can edit",
        body: "Timings on the booking's Day-of tab, shared into the portal. You decide whether they can view, add, edit or delete entries.",
      },
      {
        label: "Crew on the job",
        body: "Assign members to a booking. Everyone sees the work that is theirs; roles decide who sees the money.",
        regions: [{ x: 37.8, y: 31.4, w: 16.8, h: 3.9 }],
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
    capture: {
      src: "/product/demos/payments-poster.webp",
      recording: "/product/demos/payments.webp",
      label: "payments",
      alt: "The payments overview: outstanding, overdue, collected and average days to pay across the top, a money-in chart, and the ageing bar underneath.",
      width: 2880,
      height: 1800,
    },
    focus: { x: 3, y: 30, w: 34, h: 42 },
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
        regions: [
          { x: 3.1, y: 33.6, w: 93.2, h: 11.1 },
          { x: 89.2, y: 48.3, w: 7.1, h: 3.9 },
        ],
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

/** The Arby sheet, opened from the console's top bar. Portrait. */
export const ARBY_CAPTURE: Capture = {
  src: "/product/arby.webp",
  alt: "The Arby sheet in the console: Ask about anything on the books, Arby reads what you can already see and changes nothing, with four starter questions and a composer.",
  width: 896,
  height: 1800,
};

export const OVERVIEW_CAPTURE: Capture = {
  src: "/product/overview.webp",
  alt: "The console overview: a left rail with Start something, Needs you and Jump to, and the widget dashboard beside it.",
  width: 2880,
  height: 1800,
};
