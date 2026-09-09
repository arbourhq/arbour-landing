/**
 * The board. Five stages a job moves through, each carrying one real capture
 * of the console and the facts that stage is allowed to claim.
 *
 * Every capture in public/product/ is a help-centre screenshot of the seeded
 * console from the main repo (apps/web/public/help), taken 4 to 7 September
 * 2026. The data in them (Acme Weddings, Ella & Jack, Ruby & Max Walker) is
 * seed data, and the copy says so once, in the frame's caption. Every fact
 * below is checked against the help article for that screen; when the product
 * changes, the article changes first and this follows.
 */

export type Capture = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
  lead: string;
  ground: Ground;
  /** The stage's one accent: the square by the numeral, the rail's active edge, the caption mark. */
  accent: Accent;
  capture: Capture;
  /** A smaller second capture, when the stage has a second screen worth showing. */
  detail?: Capture & { note: string };
  facts: StageFact[];
  /** Capture on the right instead of the left. Alternates down the page. */
  flip?: boolean;
};

export const STAGES: Stage[] = [
  {
    id: "enquiry",
    index: "01",
    name: "Enquiry in",
    short: "Enquiry",
    title: "Every “are you free?” lands on the board.",
    lead: "From your website form, your inbox or a phone call at a fair. One card, every answer attached, nobody retyping anything.",
    ground: "cream",
    accent: "cornflower",
    capture: {
      src: "/product/enquiries-board.webp",
      alt: "The enquiries board with New enquiry, Qualified and Quote sent columns, each holding a card with the client's name, event date and package.",
      width: 2880,
      height: 1800,
    },
    detail: {
      src: "/product/enquiry-form.webp",
      alt: "The enquiry form editor: fixed fields at the top, then your own questions, each with a type and a required tick.",
      width: 2880,
      height: 1800,
      note: "The form on your site. Fixed details, then your questions.",
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
        label: "Coming from Studio Ninja",
        body: "Upload the export ZIP. Clients, dates, notes, invoices, quotes, contracts and questionnaires come across in one run.",
      },
    ],
  },
  {
    id: "quote",
    index: "02",
    name: "Quote out",
    short: "Quote",
    title: "Quote, contract, deposit. One chain.",
    lead: "The quote carries the contract and the payment plan. The client accepts on their phone, signs, and pays the deposit, and none of it is typed twice.",
    ground: "bottle",
    accent: "lilac",
    flip: true,
    capture: {
      src: "/product/quote.webp",
      alt: "A quote being edited: two lines, Photo and film and Extra reception hour, a $7,000 total including GST, then a payment plan with a 30% deposit on acceptance and the balance due before the event.",
      width: 2048,
      height: 1620,
    },
    detail: {
      src: "/product/packages.webp",
      alt: "The packages page: Full day photography at $4,500 selected, with its booked total, win rate and a live quote preview beside it.",
      width: 2880,
      height: 1800,
      note: "Packages you already sell, copied straight onto a quote.",
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
    lead: "Nothing moves house. The enquiry converts on the spot with its portal link, its quote and its history, and what is owed sits on the header.",
    ground: "acid",
    accent: "acid",
    capture: {
      src: "/product/booking.webp",
      alt: "A booking for Ella & Jack on Saturday 3 October 2026: the stage strip across the header, $3,150 outstanding of $4,500, and the contacts, event dates, crew and client portal cards below.",
      width: 2880,
      height: 1800,
    },
    detail: {
      src: "/product/portal.webp",
      alt: "The client portal under the vendor's banner: Hello Ella, the accepted quote, the partially paid invoice, and what is up next.",
      width: 2880,
      height: 1800,
      note: "What the client sees. Your logo, your colours, no password.",
    },
    facts: [
      {
        label: "One private link per job",
        body: "Quotes, contracts, invoices, questionnaires, the run sheet and one conversation, under your logo and colours. No account, no password.",
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
    lead: "One calendar holds every job and every blocked-out day. The run sheet lives on the booking and the client can edit it in the portal.",
    ground: "sunken",
    accent: "coral",
    flip: true,
    capture: {
      src: "/product/calendar.webp",
      alt: "The calendar on October 2026 in month view, with Bookings, Enquiries and Unavailable toggles and a two-day booking bar for Ella & Jack across the weekend.",
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
    lead: "An accepted quote issues its own invoice. Payments, refunds and receipts sit on the job, push to your accounting software, and roll up into reports you did not have to build.",
    ground: "bottle",
    accent: "acid",
    capture: {
      src: "/product/payments.webp",
      alt: "The payments overview: outstanding, overdue, collected and average days to pay across the top, a money-in chart, and the ageing bar underneath.",
      width: 2880,
      height: 1800,
    },
    detail: {
      src: "/product/reports.webp",
      alt: "Sales and financial reports side by side: new enquiries, bookings won, conversion rate and time to convert on the left, booked revenue, payments and outstanding invoices on the right.",
      width: 2880,
      height: 1800,
      note: "Sales and financial reports, against the period before.",
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
