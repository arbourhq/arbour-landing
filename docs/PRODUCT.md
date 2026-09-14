# Product

<!-- impeccable:product-schema 1 -->

Durable product truth for the Arbour marketing site (`usearbour.com`). Visual
system, type, colour, wordmark and voice are canonical in [brand.md](brand.md)
and are binding; this file does not repeat them. Product truth for the
software itself lives in the main app repo (`arbourhq/arbour`, at
`docs/PRODUCT.md`); this file records only what the site is, who it is for and
what it may claim. Read both before designing anything a visitor sees.

## Platform

web

## Users

Wedding vendors deciding whether to start a 14-day trial. Two situations,
weighted equally:

- **Solo owner-operator.** A photographer, videographer, celebrant or florist
  who does sales, delivery and admin alone. Often arrives on a phone from the
  Instagram profile link (`/bio`), between jobs, and gives the page seconds.
- **Small studio owner with a team.** Two to eight staff, evaluating on a
  laptop, comparing against the CRM they already pay for.

Both are experienced operators. Copy assumes someone who has run a hundred
wedding days and used a CRM for two years. No hand-holding.

Vendor categories the site speaks to (registry in `src/content/categories.ts`,
eleven of them): photographers, videographers, florists, celebrants, venues,
caterers, bands and DJs, hair and makeup, stylists, cake, planners. The main
app's registry carries more; the site's eleven are the confirmed marketing set.

Secondary audiences:

- **House prospects.** Venues, groups and studios who have outgrown other
  software. Not self-serve; they reach the founders through `/contact` or
  `support@usearbour.com`.
- **Press and partners** through `/contact`.
- **The two founders** (Ben and Alex), who edit every word of copy themselves.

## Product Purpose

The site sells a product that is open. It exists to explain what Arbour is,
why it is different from the CRM a vendor already has, show the real console
doing the job, and send the vendor to `app.usearbour.com/sign-up`, where the
14-day trial starts without a card.

Success is a started trial. Secondary success is a House enquiry from a venue
or group. There is no drip sequence, no webinar and no demo call: the product
is the demo.

## Positioning

The same four claims the product makes. All four are load-bearing, and each
one on the home page sits beside a real capture of the screen that earns it.

1. **One record, enquiry to invoice.** Sales CRM and delivery on the same job
   record. The competitors do the sales half only.
2. **Wedding-only, every vendor.** Built for the whole wedding industry, not
   photographers first with everyone else bolted on. The brand lives in the
   wedding niche; the software never assumes a booking is a wedding, and the
   site shows non-wedding work (a venue gala, a staff party) on purpose.
3. **Australian-first.** AUD, GST-inclusive pricing, Xero and QuickBooks,
   Australian English, support answered by one of the two founders, on a
   Saturday if that is when the job is.
4. **No lock-in, real build time.** Studio Ninja import in; API keys,
   webhooks, accounting sync and CSV out. House customers get a real
   engineering build slot **every quarter**, shipped into their account. Not
   a roadmap vote.

Named competitors: Studio Ninja, HoneyBook, Iris Works, Táve.

## Operating Context

- **Open since September 2026.** The console at `app.usearbour.com` takes
  sign-ups with a 14-day trial, no card, one trial per person. The site still
  has no customers it can name and no usage numbers, so it claims what the
  product does (with real captures) and never traction (who uses it, how much
  runs through it).
- **Routes.** `/` (hero with category picker and the category's board, the
  five-stage board with a real capture per stage, the quiet section with
  automations and Arby, every vendor, pricing, FAQ, final call), `/about`,
  `/contact`, `/bio` (phone-only link stack for Instagram, no nav or footer),
  `/privacy`, `/terms`.
- **Call to action.** Every CTA is `src/components/trial-link.tsx`, a plain
  link to the console's sign-up. There is no form of our own, no dialog and
  no waitlist; the product owns sign-up. The nav also carries Log in.
- **Contact flow.** `/contact` posts a topic and message to `/api/contact`,
  delivered to the one shared inbox (`support@usearbour.com`). Both founders
  read it. There is no second address to keep alive.
- **Product hosts.** The software runs at `app.usearbour.com`,
  `portal.usearbour.com` and `api.usearbour.com`, in a separate repo
  (`arbourhq/arbour`). The site links to sign-up, sign-in and the public help
  centre at `app.usearbour.com/help`, all in `src/content/site.ts`.
- **Copy lives in `src/content/`**, not in components: site facts, nav,
  categories, the five stages, pricing, FAQ, about, bio, contact. Each file's
  header comment states what it may and may not claim.
- **Category picker.** Choosing one of the eleven categories re-skins the hero
  board (stage names and counts), the vendor chips and the automation
  example. All of that data is illustrative, one vendor's book, and the panel
  says so.
- **Product captures.** `public/product/*.webp` are help-centre screenshots
  of the seeded console from the main repo (`apps/web/public/help`), copied
  by hand. They are real screens with seed data (Acme Weddings, Ella & Jack)
  and every frame's caption says so. Refresh them from the main repo when the
  screens change; the stage copy in `src/content/stages.ts` is checked
  against the matching help article.
- **Founders' language.** Jobs, not weddings. Contacts, not couples. Trade
  language where it is genuine: the book, the run sheet, load-in, the rain
  call, covers, load out.

## Capabilities and Constraints

Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 with the
brand tokens declared in `src/app/globals.css`, bun, oxlint and oxfmt. Fonts
are self-hosted through `next/font`. No CMS, no analytics script, no cookie
banner. Env in `.env.example`.

Confirmed site facts:

- **Pricing mirrors the plan catalogue** in the main repo
  (`packages/core/src/plans.ts`): Solo $89, Studio $129 AUD a month, GST
  inclusive, yearly at ten months for twelve, extra Studio seats $19, House by
  arrangement. Trial is 14 days, no card, one per person. Solo and Studio
  route to sign-up; House routes to `/contact`.
- **Captures are the only place Sprout, the neutral app ground and 6px
  corners appear.** Inside the frame it is the product; outside it is
  marketing.
- **Australian English throughout.** `lang="en-AU"`, `en_AU` Open Graph
  locale.
- **Never em dashes in shipped copy.**
Undecided or deliberately absent:

- Facebook exists as an empty tile on `/bio` until the page is created.
- Native apps, multi-currency and a directory. The site does not promise them.
- Testimonials and customer logos. None exist yet; the day they do, they go
  on with a name.

## Brand Commitments

[brand.md](brand.md) is fully binding: the wordmark, colour system, type
stack, visual language, motion, voice and the product patterns in section 7.
Do not restate or reinterpret it here; change it there first.

The commitments future site work must never loosen:

- **Wordmark is fixed.** The open A with no crossbar and a flat apex, then
  RBOUR in Bricolage Grotesque 800. Rendered by `src/components/wordmark.tsx`;
  raster versions at `public/arbour-wordmark-acid.png` and
  `public/arbour-wordmark-bottle.png`, icon at `public/arbour-icon-bottle.svg`.
  Never as live text, never on a photograph.
- **Acid sells Arbour. Sprout runs it.** Acid is this site's green. Sprout
  appears only inside a product mock.
- **Loud brand, quiet product.** The site is the loud half.
- **Voice.** Upbeat, dry, human, Australian. Weddings are parties, not
  projects. Wit lives in body copy; headings stay plain. No pitch-deck
  vocabulary, no stacked exclamation marks, no fake urgency.
- **Honesty over proof.** The proof is the product: real captures, labelled
  as real screens with seed data. The copy never invents customers, usage or
  quotes to stand beside them.
- **Founder bios are canon.** Everything in `src/content/about.ts` was
  confirmed by Ben or Alex. Do not add biography, employers or company names
  that are not already there.

## Evidence on Hand

Present:

- Founder photos on Bottle at `public/ben.png` and `public/alex.png`, and
  handwritten signatures at `public/ben-signature.png` and
  `public/alex-signature.png` (hosted here for the founders' email
  signatures; the site code does not reference them).
- Brand artwork: wordmark and icon PNG/SVG in `public/`, `src/app/icon.svg`,
  `src/app/apple-icon.png`, `public/arbour-squares.png`.
- Real console captures in `public/product/` (24 screens, WebP, captured 4
  to 7 September 2026 from the seeded console). Provenance is recorded in
  each file's metadata and in the header of `src/content/stages.ts`.
- Real facts about the founders in `src/content/about.ts`: Ben's decade of
  weddings and Love Poets, Alex's seven years writing software, the
  Apr 2025 / Jun 2026 / Aug 2026 timeline, zero investors.
- The public help centre at `app.usearbour.com/help`, one article per
  screen, which the site's product copy is checked against.

Absent. Do not fabricate:

- No customers, testimonials, logos, case studies, press or quotes.
- No usage numbers, revenue, deposit totals, wedding counts run on Arbour, or
  trial counts.

## Product Principles

1. **Show the product, never invent traction.** Say what it does, beside the
   real screen that does it. The day there is real usage, it goes on the site
   with a number; until then the absence is the honesty.
2. **Never assume a wedding.** Every example, screen and label must read
   correctly for a corporate function or a commercial shoot, and the site
   shows at least one on purpose.
3. **Assume a two-year user.** The reader has used a CRM. Explain the
   difference, not the category.
4. **One ask.** Every path ends at sign-up or the contact inbox. No second
   CTA, no chat widget, no lead magnet, no demo call.
5. **Two people, and say so.** Support, copy and code are Ben and Alex. The
   site never implies a team, a sales function or a support desk.

## Accessibility & Inclusion

- Reduced motion is honoured globally: `prefers-reduced-motion` in
  `src/app/globals.css` stops the looping square animations, the category
  cycle and the count tallies.
- Text on Acid and Cream is always Bottle or Ink; text on Bottle is Cream or
  Acid. Hairlines are Ink at low opacity, never grey, so contrast holds.
- `/bio` is built for one thumb and a bad signal: no nav, no footer, large
  targets, no horizontal scroll.
- The stage rail is a list of real anchors with `aria-current`, so keyboard
  and screen-reader users get the same five stops.
