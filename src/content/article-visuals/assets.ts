import type { ArticleImage } from "./types";

function product(
  src: string,
  alt: string,
  width = 2880,
  height = 1800,
): ArticleImage {
  return { src, alt, width, height, kind: "product" };
}

/** Genuine product captures. Their source records live beside each file. */
export const ARTICLE_ASSETS = {
  enquiries: product(
    "/product/demos/enquiries-board-poster.webp",
    "Arbour's enquiry board, with stages, contacts and event dates.",
  ),
  quote: product(
    "/product/quote.webp",
    "An Arbour quote with itemised coverage, extra reception hours and a deposit payment plan.",
    2048,
    1620,
  ),
  booking: product(
    "/product/demos/booking-poster.webp",
    "An Arbour booking with payment status, contacts, event dates and crew.",
  ),
  calendar: product(
    "/product/demos/calendar-poster.webp",
    "Arbour's event calendar showing bookings and calendar views.",
  ),
  payments: product(
    "/product/demos/payments-poster.webp",
    "Arbour's payments overview with outstanding, overdue and collected totals.",
  ),
  reports: product(
    "/product/reports.webp",
    "Arbour's sales and financial reports with conversion, booking value and outstanding invoices.",
  ),
  overview: product(
    "/product/overview.webp",
    "Arbour's overview with its needs-you queue and business dashboard.",
  ),
  portal: product(
    "/product/portal.webp",
    "An Arbour client portal showing an accepted quote, a partly paid invoice and upcoming dates.",
  ),
  roles: product(
    "/product/roles.webp",
    "Arbour's team role settings, with separate owner, admin and member permissions.",
  ),
  contact: product(
    "/product/contact.webp",
    "An Arbour contact record with personal details, custom fields and linked enquiries and bookings.",
  ),
  questionnaire: product(
    "/product/questionnaire.webp",
    "Arbour's questionnaire editor for collecting information before a job.",
  ),
  automation: product(
    "/product/automation.webp",
    "An Arbour automation rule with a trigger, conditions and an action.",
  ),
  automationList: product(
    "/product/automations-list.webp",
    "Arbour's list of automation rules and their current status.",
  ),
  taskList: product(
    "/product/articles/task-list.webp",
    "Arbour's task list with an owner, due date, linked booking and blocked status.",
  ),
  csvMapping: product(
    "/product/articles/csv-mapping.webp",
    "Arbour's CSV import mapper matching source columns to job and contact fields.",
  ),
  workflowEditor: product(
    "/product/articles/workflow-editor.webp",
    "Arbour's workflow settings with editable enquiry and booking stages.",
  ),
  runSheetJob: product(
    "/product/articles/run-sheet-job.webp",
    "Arbour's run-sheet starter asking which booking the schedule belongs to.",
    896,
    492,
  ),
  runSheetSettings: product(
    "/product/articles/run-sheet-settings.webp",
    "Arbour's run-sheet settings for viewing, adding, editing and deleting client entries.",
  ),
  paymentPlan: product(
    "/product/articles/payment-plan.webp",
    "Arbour's payment-plan editor with deposit and balance instalments, payment methods and due dates.",
    2208,
    1918,
  ),
  invoice: product(
    "/product/invoice.webp",
    "An Arbour invoice summary with its status, due date and remaining balance.",
    2684,
    488,
  ),
  arby: product(
    "/product/arby.webp",
    "Arby's console panel, which explains that it reads permitted records and changes nothing.",
    896,
    1800,
  ),
  dubsadoExport: product(
    "/product/articles/dubsado-export.webp",
    "Dubsado's project export dialog in Arbour's test workspace, with project, client, invoice and custom field options.",
    1728,
    907,
  ),
  reception: {
    src: "/images/articles-stock/reception.webp",
    alt: "Wedding reception tables with flowers beneath a garden pavilion.",
    width: 1600,
    height: 1068,
    kind: "photo",
    credit: {
      label: "Photo by engin akyurt on Unsplash",
      href: "https://unsplash.com/photos/a-table-set-up-for-a-wedding-reception-i3rFV6ULk-o",
    },
  },
  outdoor: {
    src: "/images/articles-stock/outdoor.webp",
    alt: "A wedding couple walking beneath an umbrella in the rain.",
    width: 1600,
    height: 1067,
    kind: "photo",
    credit: {
      label: "Photo by Huynh Van on Pexels",
      href: "https://www.pexels.com/photo/a-couple-getting-married-8582710/",
    },
  },
  seasonalVenue: {
    src: "/images/articles-stock/seasonal-venue.webp",
    alt: "An outdoor wedding ceremony beneath autumn trees.",
    width: 1600,
    height: 2400,
    kind: "photo",
    credit: {
      label: "Photo by Redd Francisco on Unsplash",
      href: "https://unsplash.com/photos/wedding-ceremony-beside-fall-trees-during-daytime-y4bE8ST_CTg",
    },
  },
} satisfies Record<string, ArticleImage>;
