import { ARTICLE_ASSETS as assets } from "./assets";
import type { ArticleFigure, ArticleImage, ArticleVisuals } from "./types";

function screenshot(
  afterSection: string,
  image: ArticleImage,
  title: string,
  caption: string,
): ArticleFigure {
  return {
    kind: "screenshot",
    afterSection,
    image,
    title,
    caption: `${caption} Real Arbour console, seed data.`,
  };
}

export const GUIDE_VISUALS: Record<string, ArticleVisuals> = {
  "how-to-choose-wedding-crm": {
    cover: assets.overview,
    takeaways: [
      "Write pass conditions for your ordinary jobs and awkward ones.",
      "Test the whole booking, including access, changes and exports.",
      "Compare the total cost of the setup you actually tested.",
    ],
    figures: [
      {
        kind: "steps",
        afterSection: "write-the-pass-conditions",
        title: "Give the trial a job to do",
        caption: "Use the same test booking in every platform.",
        items: [
          { label: "Define", detail: "Write the essential pass conditions." },
          {
            label: "Run",
            detail: "Follow one job through sales and delivery.",
          },
          {
            label: "Change",
            detail: "Move the date and inspect the exceptions.",
          },
          {
            label: "Verify",
            detail: "Check access, exports and the full cost.",
          },
        ],
      },
      screenshot(
        "follow-one-job-through",
        assets.booking,
        "Inspect what carries into the booking",
        "Find the contacts, payment status, event dates and crew after acceptance.",
      ),
      screenshot(
        "invite-the-person-who-uses-it",
        assets.roles,
        "Test the role, not the owner's login",
        "Check what a coordinator can see before giving them a normal task.",
      ),
    ],
  },
  "move-wedding-business-from-spreadsheets": {
    cover: assets.csvMapping,
    takeaways: [
      "Keep an untouched copy before cleaning or exporting the workbook.",
      "Map contacts, jobs and payment records separately.",
      "Reconcile the result before switching live work to the new system.",
    ],
    figures: [
      {
        kind: "table",
        afterSection: "separate-contacts-from-jobs",
        title: "Map the information to the right record",
        caption:
          "Keep the old column name and a sample value in your migration notes.",
        columns: ["Information", "Destination", "Check"],
        rows: [
          ["Name, email, mobile", "Contact", "Inspect possible duplicates"],
          [
            "Event date, venue, service",
            "Job",
            "Preserve the original job reference",
          ],
          [
            "Amounts and payment dates",
            "Payment fields",
            "Separate due from received",
          ],
          [
            "Blank cells",
            "Documented meaning",
            "Unknown, not applicable or not collected",
          ],
        ],
      },
      screenshot(
        "test-the-awkward-records",
        assets.csvMapping,
        "Check the destination field before importing",
        "The CSV mapper connects source columns to contact and job fields.",
      ),
      screenshot(
        "set-the-switch-date",
        assets.taskList,
        "Give each migration exception an owner",
        "A task can keep the remaining check, responsible person and due date together.",
      ),
    ],
  },
  "wedding-photography-crm-workflow": {
    cover: assets.booking,
    takeaways: [
      "Keep coverage, deliverables and the payment schedule explicit.",
      "Give shoot preparation and editing handovers an owner.",
      "Use a gallery service for photographs and the job record for administration.",
    ],
    figures: [
      screenshot(
        "make-the-booking-specific",
        assets.quote,
        "Put the coverage and extras on the quote",
        "An itemised quote keeps the agreed work beside its payment plan.",
      ),
      screenshot(
        "prepare-the-shoot",
        assets.taskList,
        "Make the next preparation task visible",
        "Assign a person and a due date to the work needed before the shoot.",
      ),
      {
        kind: "steps",
        afterSection: "test-the-delivery",
        title: "Check the handovers after the shoot",
        caption:
          "A completed CRM task records a check. Your editing, backup and gallery tools still hold the files.",
        items: [
          { label: "Files", detail: "Confirm ingestion and separate backups." },
          { label: "Editing", detail: "Name the owner and the next step." },
          {
            label: "Delivery",
            detail: "Keep the agreed delivery date visible.",
          },
          {
            label: "Gallery",
            detail: "Test the invitation and download settings.",
          },
        ],
      },
    ],
  },
  "wedding-venue-booking-management": {
    cover: assets.booking,
    takeaways: [
      "Check setup, service and pack-down alongside the event itself.",
      "Give each hold an owner, expiry and clear conditions.",
      "Hand operations the approved version and name every unresolved decision.",
    ],
    figures: [
      screenshot(
        "record-the-whole-booking-window",
        assets.calendar,
        "Check the dates around the event",
        "Review the job calendar, then verify room and shared-resource conflicts through your venue's own process.",
      ),
      {
        kind: "steps",
        afterSection: "keep-commercial-and-operational-approvals-aligned",
        title: "Carry an agreed change into the handover",
        caption:
          "Keep the previous approval as history while the current plan moves forward.",
        items: [
          {
            label: "Record",
            detail: "Keep the requested variation with the job.",
          },
          {
            label: "Agree",
            detail: "Confirm the scope, price and required approval.",
          },
          {
            label: "Update",
            detail: "Identify the current plan and issue date.",
          },
          {
            label: "Brief",
            detail: "Tell operations and affected suppliers what changed.",
          },
        ],
      },
      screenshot(
        "hand-operations-an-approved-event",
        assets.runSheetJob,
        "Start the schedule against the right booking",
        "The run-sheet starter asks which booking the schedule belongs to.",
      ),
    ],
  },
  "marriage-celebrant-booking-workflow": {
    cover: assets.contact,
    takeaways: [
      "Keep the commercial booking separate from the legal marriage assessment.",
      "Record legal milestones as checks for the celebrant to complete.",
      "Restrict sensitive information and finish registry paperwork before closing the job.",
    ],
    figures: [
      screenshot(
        "confirm-the-commercial-booking",
        assets.booking,
        "Keep the commercial record together",
        "The booking shows the job, contacts and payment position. Legal assessment remains the celebrant's responsibility.",
      ),
      {
        kind: "table",
        afterSection: "track-legal-milestones-separately",
        title: "Separate the administrative record from the legal decision",
        caption:
          "These are review prompts, not an eligibility decision or a substitute for official guidance.",
        columns: ["Record", "Celebrant's check"],
        rows: [
          ["Date the notice was received", "Check the required notice period"],
          ["Document review task", "Assess the actual evidence"],
          [
            "Separate in-person meeting tasks",
            "Complete the required meetings",
          ],
          [
            "Registry submission reference",
            "Follow the relevant registry instructions",
          ],
        ],
      },
      screenshot(
        "limit-personal-information",
        assets.roles,
        "Review who can access the booking",
        "Check team permissions while keeping regulated documents in an appropriate document-handling process.",
      ),
    ],
  },
  "wedding-florist-business-workflow": {
    cover: assets.quote,
    takeaways: [
      "Quote labour, delivery and collection alongside the flowers.",
      "Record substitutions and client approval before issuing the production brief.",
      "Keep purchasing and inventory in the studio's dedicated tool.",
    ],
    figures: [
      screenshot(
        "quote-the-work",
        assets.quote,
        "Make the agreed work visible",
        "The quote keeps itemised work beside the payment plan. Use your own floral quantities and logistics lines.",
      ),
      {
        kind: "steps",
        afterSection: "turn-design-into-order",
        title: "Turn the approved design into a checked order",
        caption:
          "Use the latest approved quantities in the studio's purchasing worksheet or stock tool.",
        items: [
          {
            label: "Quantities",
            detail: "Start with the approved arrangements.",
          },
          { label: "Recipes", detail: "Calculate the stems each piece needs." },
          {
            label: "Orders",
            detail: "Record supplier, status and collection date.",
          },
          {
            label: "Arrivals",
            detail: "Check what arrived and flag shortages.",
          },
        ],
      },
      screenshot(
        "confirm-installation",
        assets.runSheetJob,
        "Link the installation schedule to its booking",
        "The run-sheet starter selects the booking before the schedule is prepared.",
      ),
    ],
  },
  "wedding-planner-client-management": {
    cover: assets.taskList,
    takeaways: [
      "Give clients a short list of decisions, deadlines and consequences.",
      "Record the agreed change before sending new supplier instructions.",
      "Share the information each person needs for their part of the job.",
    ],
    figures: [
      screenshot(
        "create-a-client-decision-list",
        assets.taskList,
        "Keep an owner and a deadline beside the task",
        "The task list shows responsibility, due date, linked booking and blocked status.",
      ),
      {
        kind: "steps",
        afterSection: "record-changes-before-issuing-instructions",
        title: "Keep requests separate from agreed instructions",
        caption:
          "Follow the variation process in your contract and keep both parties' agreement.",
        items: [
          { label: "Request", detail: "Record the proposed change." },
          {
            label: "Check",
            detail: "Confirm affected suppliers, documents and cost.",
          },
          { label: "Agree", detail: "Obtain the required approval." },
          {
            label: "Issue",
            detail: "Publish the current version and tell affected suppliers.",
          },
        ],
      },
      screenshot(
        "share-only-the-needed-information",
        assets.roles,
        "Check the team's access before sharing",
        "Team roles control access inside the business. Supplier distribution still needs an explicit process.",
      ),
    ],
  },
  "wedding-enquiry-follow-up": {
    cover: assets.enquiries,
    takeaways: [
      "Publish a response window you can keep during a working weekend.",
      "Give each enquiry an owner and one useful next action.",
      "Keep enquiry handling separate from marketing consent.",
    ],
    figures: [
      {
        kind: "steps",
        afterSection: "answer-the-enquiry",
        title: "Make the first reply useful",
        caption:
          "The client should finish the message knowing what happens next.",
        items: [
          {
            label: "Check",
            detail: "Confirm date, location and practical availability.",
          },
          {
            label: "Read",
            detail: "Use the details the enquirer already supplied.",
          },
          { label: "Answer", detail: "Respond to the question they asked." },
          {
            label: "Next step",
            detail: "Give one action that moves the enquiry forward.",
          },
        ],
      },
      screenshot(
        "record-the-next-action",
        assets.enquiries,
        "Keep the conversation with the enquiry",
        "The enquiry board keeps contacts, event dates and stages together.",
      ),
      screenshot(
        "review-the-queue",
        assets.overview,
        "Review what still needs a person",
        "The overview keeps the needs-you queue beside the business dashboard.",
      ),
    ],
  },
  "wedding-booking-pipeline-forecast": {
    cover: assets.reports,
    takeaways: [
      "Give each stage an entry rule and keep a next action on open work.",
      "Use observed conversion history and check delivery capacity.",
      "Separate booking value, scheduled payments and money received.",
    ],
    figures: [
      screenshot(
        "define-stages",
        assets.workflowEditor,
        "Make stage names match the work",
        "Workflow settings let the business define its enquiry and booking stages.",
      ),
      {
        kind: "table",
        afterSection: "use-historical-conversion",
        title: "Keep the assumptions beside the forecast",
        caption:
          "Hypothetical example. Check competing dates and capacity before using this scenario. It is not expected cash received.",
        columns: ["Calculation", "Result"],
        rows: [
          ["8 bookings from 20 past quotes", "40% observed conversion"],
          ["10 current quotes at $4,000 each", "$40,000 quoted value"],
          ["$40,000 multiplied by 40%", "$16,000 weighted scenario"],
        ],
      },
      screenshot(
        "separate-cash-and-value",
        assets.payments,
        "Read collected and outstanding amounts separately",
        "The payments overview separates amounts collected, outstanding and overdue. Its figures are a seeded example, separate from the calculation above.",
      ),
    ],
  },
  "wedding-business-automation": {
    cover: assets.automationList,
    takeaways: [
      "Write the trigger, conditions and action before configuring a rule.",
      "Test changed dates, replies, missing fields and duplicate triggers.",
      "Give failed actions and sensitive exceptions a person to review them.",
    ],
    figures: [
      screenshot(
        "write-the-rule-in-plain-english",
        assets.automation,
        "Read the rule before enabling it",
        "The editor keeps the quote-sent trigger and conditions beside the rule's name.",
      ),
      {
        kind: "table",
        afterSection: "test-the-unusual-jobs",
        title: "Test the exceptions deliberately",
        caption:
          "Inspect the result in your trial. These checks do not assume that every platform handles an exception automatically.",
        columns: ["Test case", "Inspect"],
        rows: [
          ["Revised quote", "The enquiry's current stage"],
          ["Changed event date", "Old and new reminder schedules"],
          ["Client replies while waiting", "Pending follow-up actions"],
          ["Missing recipient address", "Failure and recovery process"],
          ["The trigger happens twice", "Repeated messages or stage changes"],
        ],
      },
      screenshot(
        "give-exceptions-an-owner",
        assets.taskList,
        "Assign the recovery work",
        "A task gives a manual check an owner and a due date when an exception needs attention.",
      ),
    ],
  },
  "wedding-run-sheet-guide": {
    cover: assets.calendar,
    takeaways: [
      "Include bump-in, handovers and pack-down, not only guest timings.",
      "Give each line an owner and make dependencies visible.",
      "Name the current version and tell affected people when it changes.",
    ],
    figures: [
      screenshot(
        "give-each-line-an-owner",
        assets.runSheetJob,
        "Start with the right booking",
        "The run-sheet starter asks which booking the schedule belongs to.",
      ),
      {
        kind: "steps",
        afterSection: "build-buffers-around-real-constraints",
        title: "Give each interval a job",
        caption:
          "Hypothetical timing example from this guide. These are not standard wedding timings.",
        items: [
          { label: "1.30 pm", detail: "Floral installation finishes." },
          { label: "1.45 pm", detail: "The venue reset is complete." },
          {
            label: "2 pm",
            detail: "The celebrant and audio operator complete sound check.",
          },
          { label: "2.30 pm", detail: "Guests arrive." },
          { label: "3 pm", detail: "The ceremony begins." },
        ],
      },
      screenshot(
        "distribute-and-check-onsite",
        assets.runSheetSettings,
        "Decide what clients can change",
        "Run-sheet settings distinguish viewing, adding, editing and deleting entries.",
      ),
    ],
  },
  "wedding-client-portal-guide": {
    cover: assets.portal,
    takeaways: [
      "Keep the current scope, contract and payment information easy to find.",
      "Treat viewing, quote acceptance and contract signing as different actions.",
      "Test the client view and share supplier information separately.",
    ],
    figures: [
      screenshot(
        "put-current-booking-information-together",
        assets.portal,
        "Show clients the current booking",
        "The portal brings the accepted quote, invoice status and upcoming dates together.",
      ),
      {
        kind: "table",
        afterSection: "define-each-approval",
        title: "Ask for the decision you need",
        caption:
          "Keep your business's booking requirements explicit and check the actual contract terms separately.",
        columns: ["Action", "What it records"],
        rows: [
          ["View a document", "The client opens the information"],
          ["Accept a quote", "The client accepts the quoted scope"],
          ["Sign a contract", "The requested signature step is completed"],
          [
            "Approve a change",
            "The agreed contact approves the specific version and cost",
          ],
        ],
      },
      screenshot(
        "keep-supplier-handover-separate",
        assets.roles,
        "Keep the team's access deliberate",
        "Check who handles money and who handles timings. Prepare a separate supplier handover rather than forwarding the client link.",
      ),
    ],
  },
  "wedding-deposits-and-payment-schedules": {
    cover: assets.payments,
    takeaways: [
      "Agree on amounts and actual due dates before taking payment.",
      "Choose milestones around costs without confusing payment and cancellation terms.",
      "Reconcile invoices, receipts and expected supplier bills each week.",
    ],
    figures: [
      screenshot(
        "agree-the-schedule-before-booking",
        assets.paymentPlan,
        "Put the due dates beside the instalments",
        "The payment-plan editor keeps deposit and balance lines, due dates and payment methods together.",
      ),
      {
        kind: "steps",
        afterSection: "choose-milestones-around-costs",
        title: "Check that the instalments add up",
        caption:
          "Hypothetical $8,000 schedule from this guide. These amounts are not recommended deposit percentages or cancellation terms.",
        items: [
          { label: "$1,000", detail: "At booking, as agreed with the client." },
          { label: "$3,000", detail: "At the agreed planning milestone." },
          { label: "$4,000", detail: "Before the event, on the agreed date." },
        ],
      },
      screenshot(
        "invoice-and-tax-records",
        assets.invoice,
        "Keep the remaining balance visible",
        "The invoice summary shows its status, due date and amount remaining. This seeded $4,500 job is separate from the $8,000 example above.",
      ),
    ],
  },
};
