import industry from "./articles/australian-wedding-industry-report.json";
import future from "./articles/future-of-australian-wedding-industry.json";
import chooseCrm from "./articles/how-to-choose-wedding-crm.json";
import studioNinja from "./articles/arbour-vs-studio-ninja.json";
import honeybook from "./articles/arbour-vs-honeybook.json";
import dubsado from "./articles/arbour-vs-dubsado.json";
import spreadsheets from "./articles/move-wedding-business-from-spreadsheets.json";
import photography from "./articles/wedding-photography-crm-workflow.json";
import venue from "./articles/wedding-venue-booking-management.json";
import celebrant from "./articles/marriage-celebrant-booking-workflow.json";
import florist from "./articles/wedding-florist-business-workflow.json";
import planner from "./articles/wedding-planner-client-management.json";
import enquiry from "./articles/wedding-enquiry-follow-up.json";
import pipeline from "./articles/wedding-booking-pipeline-forecast.json";
import automation from "./articles/wedding-business-automation.json";
import runSheet from "./articles/wedding-run-sheet-guide.json";
import portal from "./articles/wedding-client-portal-guide.json";
import payments from "./articles/wedding-deposits-and-payment-schedules.json";
import ai from "./articles/ai-for-wedding-businesses.json";
import seasonality from "./articles/wedding-seasonality-australia.json";

export const ARTICLE_AUTHOR = "Arbour Research Team";

export const ARTICLE_INDEX = {
  title: "Articles for Australian wedding businesses",
  heading: "Articles",
  description:
    "Research, practical guides and software comparisons for Australian wedding vendors. Read the evidence and make better decisions about your business.",
  introduction:
    "The wedding industry, the work behind it, and the software that keeps it moving. Research and practical guides for people who work weekends.",
} as const;

export const ARTICLE_CATEGORIES = [
  {
    name: "Industry research",
    slug: "industry-research",
    description:
      "Australian marriage data, changing demand and the decisions ahead.",
  },
  {
    name: "Business guides",
    slug: "business-guides",
    description:
      "Practical ways to run the book, organise the work and finish the job.",
  },
  {
    name: "Software comparisons",
    slug: "software-comparisons",
    description:
      "Current product facts and clear trade-offs, including our own.",
  },
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]["name"];

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  author: string;
  publishedAt: string;
  updatedAt: string;
  intro: string[];
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  sources: {
    id: number;
    title: string;
    url: string;
    publisher: string;
  }[];
};

// JSON imports widen strings. Check the category once when building the
// catalogue so article consumers can use the shared category names safely.
function articleWithCategory(
  article: Omit<Article, "category"> & { category: string },
): Article {
  const category = ARTICLE_CATEGORIES.find(
    (entry) => entry.name === article.category,
  );
  if (!category)
    throw new Error(`Unknown article category: ${article.category}`);
  return { ...article, category: category.name };
}

/** Editorial order is deliberate. The first article is the index lead. */
export const ARTICLES: Article[] = [
  industry,
  future,
  chooseCrm,
  studioNinja,
  honeybook,
  dubsado,
  spreadsheets,
  photography,
  venue,
  celebrant,
  florist,
  planner,
  enquiry,
  pipeline,
  automation,
  runSheet,
  portal,
  payments,
  ai,
  seasonality,
].map(articleWithCategory);

/** Related reading follows the reader's next decision, across categories. */
export const ARTICLE_RELATED_SLUGS: Record<string, readonly string[]> = {
  "australian-wedding-industry-report": [
    "future-of-australian-wedding-industry",
    "wedding-seasonality-australia",
    "wedding-booking-pipeline-forecast",
  ],
  "future-of-australian-wedding-industry": [
    "australian-wedding-industry-report",
    "ai-for-wedding-businesses",
    "wedding-business-automation",
  ],
  "how-to-choose-wedding-crm": [
    "arbour-vs-studio-ninja",
    "arbour-vs-honeybook",
    "arbour-vs-dubsado",
  ],
  "arbour-vs-studio-ninja": [
    "how-to-choose-wedding-crm",
    "wedding-photography-crm-workflow",
    "move-wedding-business-from-spreadsheets",
  ],
  "arbour-vs-honeybook": [
    "how-to-choose-wedding-crm",
    "wedding-client-portal-guide",
    "wedding-deposits-and-payment-schedules",
  ],
  "arbour-vs-dubsado": [
    "how-to-choose-wedding-crm",
    "wedding-business-automation",
    "wedding-planner-client-management",
  ],
  "move-wedding-business-from-spreadsheets": [
    "how-to-choose-wedding-crm",
    "wedding-client-portal-guide",
    "wedding-booking-pipeline-forecast",
  ],
  "wedding-photography-crm-workflow": [
    "wedding-enquiry-follow-up",
    "wedding-run-sheet-guide",
    "wedding-business-automation",
  ],
  "wedding-venue-booking-management": [
    "wedding-seasonality-australia",
    "wedding-run-sheet-guide",
    "wedding-deposits-and-payment-schedules",
  ],
  "marriage-celebrant-booking-workflow": [
    "wedding-enquiry-follow-up",
    "wedding-deposits-and-payment-schedules",
    "wedding-client-portal-guide",
  ],
  "wedding-florist-business-workflow": [
    "wedding-planner-client-management",
    "wedding-booking-pipeline-forecast",
    "wedding-run-sheet-guide",
  ],
  "wedding-planner-client-management": [
    "wedding-venue-booking-management",
    "wedding-florist-business-workflow",
    "wedding-client-portal-guide",
  ],
  "wedding-enquiry-follow-up": [
    "wedding-booking-pipeline-forecast",
    "wedding-business-automation",
    "wedding-client-portal-guide",
  ],
  "wedding-booking-pipeline-forecast": [
    "wedding-seasonality-australia",
    "wedding-deposits-and-payment-schedules",
    "australian-wedding-industry-report",
  ],
  "wedding-business-automation": [
    "wedding-enquiry-follow-up",
    "ai-for-wedding-businesses",
    "wedding-run-sheet-guide",
  ],
  "wedding-run-sheet-guide": [
    "wedding-venue-booking-management",
    "wedding-planner-client-management",
    "wedding-photography-crm-workflow",
  ],
  "wedding-client-portal-guide": [
    "wedding-deposits-and-payment-schedules",
    "wedding-planner-client-management",
    "move-wedding-business-from-spreadsheets",
  ],
  "wedding-deposits-and-payment-schedules": [
    "wedding-booking-pipeline-forecast",
    "marriage-celebrant-booking-workflow",
    "wedding-client-portal-guide",
  ],
  "ai-for-wedding-businesses": [
    "wedding-business-automation",
    "future-of-australian-wedding-industry",
    "how-to-choose-wedding-crm",
  ],
  "wedding-seasonality-australia": [
    "australian-wedding-industry-report",
    "wedding-venue-booking-management",
    "wedding-florist-business-workflow",
  ],
};
