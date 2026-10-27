import { ARTICLE_ASSETS } from "./assets";
import type { ArticleVisuals } from "./types";

export const COMPARISON_VISUALS: Record<string, ArticleVisuals> = {
  "arbour-vs-studio-ninja": {
    cover: ARTICLE_ASSETS.booking,
    takeaways: [
      "Studio Ninja's photography integrations may already suit your delivery work.",
      "Test team permissions and accounting sync before moving your book.",
      "Use the same sample booking in both trials.",
    ],
    figures: [
      {
        kind: "screenshot",
        afterSection: "compare-the-booking-experience",
        title: "The Arbour client view",
        caption:
          "The portal groups booking documents, invoice status and upcoming dates. Real Arbour console, seed data.",
        image: ARTICLE_ASSETS.portal,
      },
      {
        kind: "screenshot",
        afterSection: "check-team-access",
        title: "Check access with a second login",
        caption:
          "Arbour's role settings separate owner, admin and member permissions. Test the resulting access before inviting crew. Real Arbour console, seed data.",
        image: ARTICLE_ASSETS.roles,
      },
      {
        kind: "table",
        afterSection: "understand-accounting-sync",
        title: "The differences to put through a trial",
        caption:
          "Choose the workflow your business needs. Confirm current plan inclusions, including the conflicting Starter details described below.",
        columns: ["Check", "Arbour", "Studio Ninja"],
        rows: [
          [
            "Delivery fit",
            "Jobs and custom fields for the wider wedding vendor list.",
            "Built for photographers and videographers, with gallery integrations. [1][2]",
          ],
          [
            "Client booking",
            "A private job portal for quotes, signatures and payments.",
            "A portal for quotes, contracts, questionnaires, payments and gallery links. [2]",
          ],
          [
            "Team access",
            "Studio includes roles and granular permissions.",
            "Users guidance describes whole-account access. Confirm the chosen plan. [3][4]",
          ],
          [
            "Accounting sync",
            "Issued invoices, payments and refunds push to Xero or QuickBooks in one direction.",
            "Xero invoice copying with optional payment sync in both directions. [5]",
          ],
        ],
      },
    ],
  },
  "arbour-vs-honeybook": {
    cover: ARTICLE_ASSETS.portal,
    takeaways: [
      "HoneyBook now supports Australian businesses and AUD subscriptions.",
      "Compare smart files with the whole sales and delivery workflow.",
      "Include setup work, team access and payment processing in the total cost.",
    ],
    figures: [
      {
        kind: "screenshot",
        afterSection: "client-booking-documents",
        title: "Booking documents in the client portal",
        caption:
          "Arbour's portal keeps the accepted quote, invoice status and next dates together. Real Arbour console, seed data.",
        image: ARTICLE_ASSETS.portal,
      },
      {
        kind: "screenshot",
        afterSection: "delivery-after-booking",
        title: "The booking after acceptance",
        caption:
          "Contacts, event dates, crew and payment status remain on the Arbour job record. Real Arbour console, seed data.",
        image: ARTICLE_ASSETS.booking,
      },
      {
        kind: "table",
        afterSection: "automations-and-access",
        title: "Compare the work, including the handover",
        caption:
          "Both products serve Australian businesses. Put the same client booking and delivery change through each trial.",
        columns: ["Check", "Arbour", "HoneyBook"],
        rows: [
          [
            "Australian setup",
            "AUD plans including GST, with ABN tax invoices.",
            "AUD subscriptions and an Australian payment setup process. [2][3]",
          ],
          [
            "Client documents",
            "Quotes, contracts and payment plans stay with the job and portal.",
            "Smart files combine service selection, contracts, questions and invoices. [4]",
          ],
          [
            "Delivery work",
            "Calendar, crew, questionnaires and run sheets on the booking.",
            "Project workspaces, notes, team participation and questionnaire answers. [4][6]",
          ],
          [
            "Automation",
            "Rules combine a trigger, matching conditions and an action.",
            "Conditional automations with approval options on Essentials and Premium. [5]",
          ],
        ],
      },
    ],
  },
  "arbour-vs-dubsado": {
    cover: ARTICLE_ASSETS.automation,
    takeaways: [
      "Dubsado's configurable client flows suit owners willing to maintain the templates.",
      "Arbour keeps the sale, crew coordination and delivery on the same job record.",
      "Compare billing currency separately from Australian client payment support.",
    ],
    figures: [
      {
        kind: "screenshot",
        afterSection: "automation-and-setup",
        title: "An Arbour automation rule",
        caption:
          "The actual rule editor puts its trigger, conditions and action in one view. Real Arbour console, seed data.",
        image: ARTICLE_ASSETS.automation,
      },
      {
        kind: "table",
        afterSection: "australian-costs",
        title: "Keep these checks separate",
        caption:
          "A subscription's billing currency does not decide which client payment methods the product supports.",
        columns: ["Check", "Arbour", "Dubsado"],
        rows: [
          [
            "Subscription billing",
            "AUD plans including GST.",
            "US-dollar plans and add-ons. [1]",
          ],
          [
            "Australian payments",
            "Card payments through Stripe or bank transfer.",
            "Dubsado Payments supports Australian merchants. Check regional methods and fees. [5]",
          ],
          [
            "Automation",
            "Trigger, conditions and action rules.",
            "Dubsado 3.0 flows, with automated workflows on Premier. [1][2]",
          ],
          [
            "Portal access",
            "A private job link without a client account or password.",
            "Public links require a password; client-specific links use the client's email. [4]",
          ],
        ],
      },
      {
        kind: "screenshot",
        afterSection: "which-to-trial",
        title: "Inspect what an export contains",
        caption:
          "Dubsado project export in Arbour's test workspace. Test data. Check the selected fields, then reconcile a sample before moving live records.",
        image: ARTICLE_ASSETS.dubsadoExport,
      },
    ],
  },
};
