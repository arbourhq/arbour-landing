/**
 * Answers for a product that is open. Every claim here is checked against the
 * help centre in the main repo (apps/web/content/help). If the product
 * changes, the article changes first and this follows.
 */
export const FAQS = [
  {
    q: "How does the trial work?",
    a: "Fourteen days, no card. Pick Solo or Studio at sign-up and that plan applies from day one, limits and all. Add a card whenever you like and billing starts when the trial ends, not before. One trial per person, ever, so make it count.",
  },
  {
    q: "Do I have to move everything over in one go?",
    a: "No. Coming from Studio Ninja, Dubsado, Pixieset or Sprout Studio, zip up the export and upload it. Contacts, jobs, dates, invoices and documents come across in one run, and you see the counts before anything is written. Coming from anywhere else, export a CSV, say whether it is sales or bookings, and map the columns to your own fields. Arbour suggests the mapping, you correct it. Or bring the season in front of you and leave the archive where it is. Your data goes out again through the API, webhooks, accounting sync and CSV.",
  },
  {
    q: "Will my clients have to log into something?",
    a: "No password and no account. Every job has one private link, and it opens on their phone under your logo and colours: quotes to accept, contracts to sign, invoices to pay, the run sheet, the questionnaire and one conversation for the job. On Studio and House the link can live on your own domain, clients.yourstudio.com.au, and Arbour handles the certificate.",
  },
  {
    q: "Is this just Studio Ninja with better fonts?",
    a: "The fonts are better. The real difference is that Studio Ninja is built for photographers and Arbour is built for the wedding, so the florist, the celebrant, the caterer, the band and the venue all run their own pipeline in it. It also does the delivery half: the calendar, the crew, the run sheet, the money after the deposit.",
  },
  {
    q: "Does it assume every job is a wedding?",
    a: "No. A corporate function, a commercial shoot or a staff party goes through the same board with the same quote and the same portal. The words are jobs and contacts, not weddings and couples, because that is what the work actually is.",
  },
  {
    q: "You will really build custom software for my business?",
    a: "On the House plan, yes. One build slot every quarter, scoped with you, shipped into your account. Not a roadmap vote. Email support@usearbour.com and one of the two of us will reply.",
  },
  {
    q: "Who answers support?",
    a: "Ben or Alex. Ben has worked over 250 weddings behind a camera and still shoots, Alex writes every line of the software. Saturdays included, because that is when the job is. The help centre is public if you would rather read than ask.",
  },
] as const;
