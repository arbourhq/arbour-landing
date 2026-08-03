/**
 * Contact content. Nothing here may promise a response time we cannot keep, or
 * imply a support team that does not exist. There are two of us.
 */

export const CONTACT_TOPICS = [
  "Something about the product",
  "House plan, venues and groups",
  "Waitlist and early access",
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
    body: "There is no support desk and no ticket queue. Whatever you send lands with Ben or Alex, and one of them writes back.",
  },
  {
    index: "02",
    title: "Weekends included",
    body: "Saturday is when the job happens, so Saturday is when we read this. Monday help is no help to anyone who works a wedding.",
  },
  {
    index: "03",
    title: "Not a sales call",
    body: "Nothing to sell yet. Ask what you like about the build, the scope or what it will cost, and you get a straight answer.",
  },
];
