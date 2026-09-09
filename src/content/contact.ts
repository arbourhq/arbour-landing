/**
 * Contact content. Nothing here may promise a response time we cannot keep, or
 * imply a support team that does not exist. There are two of us.
 */

export const CONTACT_TOPICS = [
  "Something about the product",
  "House plan, venues and groups",
  "Moving across from other software",
  "Press or partnerships",
  "Something else",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Widened for the route handler, which validates untrusted input against it. */
export const CONTACT_TOPIC_NAMES: readonly string[] = CONTACT_TOPICS;

export const CONTACT_FACTS = [
  {
    index: "01",
    title: "It is one of two people",
    body: "Whatever you send lands with Ben or Alex, and we'll reply like our business depends on it.",
  },
  {
    index: "02",
    title: "Weekends included",
    body: "Saturday is when the job happens, so Saturday is when we read this. Monday help is no help to anyone who works a wedding.",
  },
  {
    index: "03",
    title: "Straight answers",
    body: "Ask what it costs, what it will not do, or whether it survives a two-hundred cover Saturday. If the answer is no, you will hear no.",
  },
];
