/**
 * What is in the first release, what comes straight after, and what we are
 * deliberately not doing. Sourced from the MVP build spec's in-scope and
 * out-of-scope sections.
 *
 * This panel replaces the usage stats and the customer quote that the design
 * bundle carried. Arbour has no customers yet, so it cannot claim any.
 *
 * IMPORTANT: this makes claims about SCOPE, not about progress. Nothing here
 * says a thing is finished. When there is real build status to show, give
 * items a `status` and the panel will render the chip: the columns, the copy
 * and the layout do not need to change.
 */

export type BuildStatus = "built" | "building" | "next";

export type ScopeItem = {
  label: string;
  /** The dry half-line under it. */
  note: string;
  /** Leave unset until it is genuinely true. */
  status?: BuildStatus;
};

export type ScopeGroup = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  items: ScopeItem[];
};

export const STATUS_LABELS: Record<BuildStatus, string> = {
  built: "Built",
  building: "In build",
  next: "Next",
};

export const BUILD_SCOPE: ScopeGroup[] = [
  {
    id: "first",
    index: "01",
    title: "In the first release",
    blurb:
      "Enough to run a whole season on. If it is on this list, opening day without it is not opening day.",
    items: [
      {
        label: "Pipeline, quotes and contracts",
        note: "Enquiry to signed, one record, no re-keying.",
      },
      {
        label: "Jobs, calendar and run sheets",
        note: "The book, soft holds, and a timeline written in minutes.",
      },
      {
        label: "Payments, invoices and deposits",
        note: "Deposits, instalments, and a balance that chases itself.",
      },
      {
        label: "Two-way inbox",
        note: "Gmail or Outlook, threads on the job, replies from your address.",
      },
      {
        label: "Custom fields per category",
        note: "Guest counts, dietaries, shot lists. Yours to define.",
      },
      {
        label: "Enquiry forms for your own site",
        note: "Straight into the pipeline, tagged with where it came from.",
      },
      {
        label: "Client portal",
        note: "Optional, and branded like you rather than like us.",
      },
      {
        label: "Team and permissions",
        note: "Seats, roles, and who gets to see the money.",
      },
    ],
  },
  {
    id: "after",
    index: "02",
    title: "Right after",
    blurb:
      "Designed, specified, and deliberately not holding up the first release.",
    items: [
      {
        label: "Native automations",
        note: "Triggers on your own jobs: chase the balance, send the run sheet, nudge the crew.",
      },
      {
        label: "Webhooks",
        note: "Fire an event out to whatever else you run, no polling.",
      },
      {
        label: "Xero and QuickBooks",
        note: "Export works from day one. Proper sync comes second.",
      },
      {
        label: "E-signing in the app",
        note: "At first Arbour tracks the contract and holds the file, signing happens on a link.",
      },
      {
        label: "Crew scheduling and permissions",
        note: "Shifts, rates and who can see what, once teams are on it.",
      },
    ],
  },
  {
    id: "not",
    index: "03",
    title: "Not yet, on purpose",
    blurb:
      "These are the things we have decided can wait.",
    items: [
      {
        label: "Native apps",
        note: "Mobile web, installable. A wrapper would not make the run sheet better.",
      },
      {
        label: "Multi-currency",
        note: "AUD at launch. The money layer is built currency-aware for later.",
      },
      {
        label: "Marketplace and directory",
        note: "Arbour is not selling your leads back to you.",
      },
      {
        label: "Your tax, your website, your email marketing",
        note: "It does weddings. That is the whole idea.",
      },
    ],
  },
];
