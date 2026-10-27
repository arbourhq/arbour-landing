import { ARTICLE_ASSETS } from "./assets";
import type { ArticleVisuals } from "./types";

export const RESEARCH_VISUALS: Record<string, ArticleVisuals> = {
  "australian-wedding-industry-report": {
    cover: ARTICLE_ASSETS.reception,
    takeaways: [
      "Marriage registrations do not measure wedding vendor revenue.",
      "Survey averages describe respondents, not every Australian wedding.",
      "Check external research against your own bookings and delivery costs.",
    ],
    figures: [
      {
        kind: "bars",
        afterSection: "what-the-official-count-measures",
        title: "Registered marriages in Australia",
        items: [
          { label: "2022", value: 127161, displayValue: "127,161" },
          { label: "2023", value: 118439, displayValue: "118,439" },
          { label: "2024", value: 120844, displayValue: "120,844" },
          { label: "2025", value: 118804, displayValue: "118,804" },
        ],
        sourceId: 1,
        caption:
          "ABS registered marriages, 2022 to 2025. The bars start at zero. These are legal registrations, not vendor revenue or a count of paid wedding jobs. [1][2]",
      },
      {
        kind: "screenshot",
        afterSection: "separate-a-full-calendar-from-a-profitable-one",
        title: "Read sales and finances together",
        image: ARTICLE_ASSETS.reports,
        focus: { x: 2, y: 24, w: 96, h: 64 },
        caption:
          "Arbour separates sales measures from revenue and outstanding invoices. Real Arbour console, seed data. The values shown are not industry results.",
      },
      {
        kind: "screenshot",
        afterSection: "keep-the-evidence-beside-the-decision",
        title: "Keep the history on the booking",
        image: ARTICLE_ASSETS.booking,
        caption:
          "The booking keeps its contacts, event details, crew and payment status together. Real Arbour console, seed data.",
      },
    ],
  },
  "future-of-australian-wedding-industry": {
    cover: ARTICLE_ASSETS.outdoor,
    takeaways: [
      "Use several demand scenarios before adding fixed costs.",
      "Record scope, weather decisions and approval limits on the job.",
      "Give AI a defined task and a person who checks the result.",
    ],
    figures: [
      {
        kind: "screenshot",
        afterSection: "make-scope-easier-to-understand",
        title: "Show the scope before asking for approval",
        image: ARTICLE_ASSETS.quote,
        caption:
          "An itemised quote separates the package, extra coverage and payment plan. Real Arbour console, seed data.",
      },
      {
        kind: "steps",
        afterSection: "put-weather-decisions-in-the-booking",
        title: "Write down the rain call",
        items: [
          {
            label: "Name the alternative",
            detail: "Record the wet-weather space and access arrangements.",
          },
          {
            label: "Set the decision time",
            detail: "Leave enough time to move people, equipment and stock.",
          },
          {
            label: "Name the decision-maker",
            detail: "Make it clear who can approve the change.",
          },
          {
            label: "Agree on extra work",
            detail: "Record the cost, labour and required client approval.",
          },
        ],
        caption:
          "A weather plan needs decisions and owners before the final week. It cannot predict conditions on a future event date.",
      },
      {
        kind: "screenshot",
        afterSection: "use-ai-with-defined-limits",
        title: "Define what the assistant can do",
        image: ARTICLE_ASSETS.arby,
        focus: { x: 0, y: 0, w: 100, h: 72 },
        caption:
          "Arby states that it reads records the user's role can access and changes nothing. Real Arbour console, seed data.",
      },
    ],
  },
  "ai-for-wedding-businesses": {
    cover: ARTICLE_ASSETS.arby,
    takeaways: [
      "Start with public information or blank templates for drafting.",
      "Check names, dates, amounts and promises against the original record.",
      "Reading records and changing them need different controls.",
    ],
    figures: [
      {
        kind: "table",
        afterSection: "keep-client-information-out-of-casual-prompts",
        title: "Choose the input before writing the prompt",
        columns: ["Start with", "Keep out of casual prompts"],
        rows: [
          [
            "Published package descriptions",
            "Real client questionnaire answers",
          ],
          ["Blank questionnaire templates", "Whole client email threads"],
          [
            "Invented details for a trial",
            "Identity documents and private circumstances",
          ],
        ],
        caption:
          "For a publicly available AI drafting tool, begin with public information or blank templates. Assess a system's intended use and privacy arrangements before approving real records. [2]",
      },
      {
        kind: "screenshot",
        afterSection: "check-against-the-job-record",
        title: "Check the answer against the booking",
        image: ARTICLE_ASSETS.booking,
        caption:
          "Open the actual booking to check the current event details and payment status before contacting a client. Real Arbour console, seed data.",
      },
      {
        kind: "screenshot",
        afterSection: "separate-answers-from-actions",
        title: "An answer is different from an action",
        image: ARTICLE_ASSETS.arby,
        focus: { x: 0, y: 0, w: 100, h: 72 },
        caption:
          "Arby explains its read-only scope inside the panel. Check the booking before acting on an answer. Real Arbour console, seed data.",
      },
    ],
  },
  "wedding-seasonality-australia": {
    cover: ARTICLE_ASSETS.seasonalVenue,
    takeaways: [
      "Separate enquiry dates, confirmation dates and event dates.",
      "Check local climate and your own booking history before planning capacity.",
      "Include preparation, travel, pack-down and delivery work in the calendar.",
    ],
    figures: [
      {
        kind: "steps",
        afterSection: "registration-and-event-dates",
        title: "One job, two different workloads",
        items: [
          {
            label: "April: the enquiry arrives",
            detail: "Allow time for the reply, proposal and booking work.",
          },
          {
            label: "November: the job takes place",
            detail: "Allow time for preparation, the event and delivery.",
          },
        ],
        caption:
          "Illustrative booking from this guide. April carries the sales work and November carries the delivery work.",
      },
      {
        kind: "screenshot",
        afterSection: "capacity-calendar",
        title: "Check the work around the date",
        image: ARTICLE_ASSETS.calendar,
        caption:
          "Use the delivery calendar alongside preparation and follow-up commitments before accepting another job. Real Arbour console, seed data.",
      },
      {
        kind: "screenshot",
        afterSection: "cash-flow-and-quieter-months",
        title: "Review payments beside the event calendar",
        image: ARTICLE_ASSETS.payments,
        caption:
          "The payment view separates collected money from outstanding and overdue amounts. A busy event month need not be the strongest cash month. Real Arbour console, seed data.",
      },
    ],
  },
};
