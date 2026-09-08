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

Wedding vendors deciding whether to put their name down for software that has
not opened yet. Two situations, weighted equally:

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
  software. Not self-serve; they reach the founders through `/contact` or by
  replying to the waitlist confirmation.
- **Press and partners** through `/contact`.
- **The two founders** (Ben and Alex), who edit every word of copy themselves.

## Product Purpose

The site is a waitlist funnel for a pre-launch product. It exists to explain
what Arbour is, why it is different from the CRM a vendor already has, and to
collect an email plus a vendor category so the first release is set up for
that category on the day they get in.

Success is a qualified waitlist signup: an email and a category, followed by
exactly one confirmation email. Secondary success is a House enquiry from a
venue or group. There is no drip sequence, no webinar and nothing to buy.

## Positioning

The same four claims the product makes, adapted for a visitor who cannot log
in yet. All four are load-bearing.

1. **One record, enquiry to invoice.** Sales CRM and delivery on the same job
   record. The competitors do the sales half only.
2. **Wedding-only, every vendor.** Built for the whole wedding industry, not
   photographers first with everyone else bolted on. The brand lives in the
   wedding niche; the software never assumes a booking is a wedding, and the
   site shows non-wedding work (a venue gala, a staff party) on purpose.
3. **Australian-first.** AUD, GST-inclusive pricing, Australian English,
   support answered by one of the two founders, on a Saturday if that is when
   the job is.
4. **No lock-in, real build time.** Full export from day one. House customers
   get a real engineering build slot **every quarter**, shipped into their
   account. Not a roadmap vote.

Named competitors: Studio Ninja, HoneyBook, Iris Works, Táve.

## Operating Context

- **Pre-launch, waitlist only.** Confirmed September 2026. Arbour has no
  customers anyone can name and no product a visitor can log into. The site
  claims scope (what is in the first release) and never traction (who uses it,
  how much runs through it).
- **Routes.** `/` (hero with category picker, problem, product, statement,
  build scope, sales, pricing, FAQ, final call), `/about`, `/contact`, `/bio`
  (phone-only link stack for Instagram, no nav or footer), `/thanks`
  (post-signup, not indexed), `/privacy`, `/terms`.
- **Waitlist flow.** A dialog anywhere on the site collects email and
  category, posts to `/api/waitlist`, sends one confirmation through Resend
  and lands on `/thanks?category=`. Storage is a Resend segment for now; the
  intended destination is Pipedrive, behind one provider interface in
  `src/lib/waitlist/`. The category is never pre-selected.
- **Contact flow.** `/contact` posts a topic and message to `/api/contact`,
  delivered to the one shared inbox (`support@usearbour.com`). Both founders
  read it. There is no second address to keep alive.
- **Product hosts.** The software runs at `app.usearbour.com`,
  `portal.usearbour.com` and `api.usearbour.com`, in a separate repo. Nothing
  on this site links into it until launch.
- **Copy lives in `src/content/`**, not in components: site facts, nav,
  categories, build scope, pricing, FAQ, about, bio, contact. Each file's
  header comment states what it may and may not claim.
- **Category picker.** Choosing one of the eleven categories re-skins the hero
  mock (account, headline, stats, jobs on the board), the pipeline stages and
  the automation example. All of that data is illustrative, one vendor's book.
- **Founders' language.** Jobs, not weddings. Contacts, not couples. Trade
  language where it is genuine: the book, the run sheet, load-in, the rain
  call, covers, load out.

## Capabilities and Constraints

Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 with the
brand tokens declared in `src/app/globals.css`, bun, oxlint and oxfmt. Fonts
are self-hosted through `next/font`. No CMS, no analytics script, no cookie
banner. Env in `.env.example`.

Confirmed site facts:

- **Pricing is indicative.** Solo $89 and Studio $119 AUD per month, GST
  inclusive, House scoped per customer. These match the main app's plan
  catalogue. Every tier routes to the waitlist, there is no checkout and no
  monthly/annual toggle, and the copy says prices are locked before opening.
- **Build scope, not build status.** The panel in `src/content/build-scope.ts`
  states what is in the first release, what comes right after, and what is
  deliberately not being built. Items grow a status chip only when given a
  real `status`; nothing there says a thing is finished.
- **The hero mock is the only place Sprout, the neutral app ground and 6px
  corners are allowed.** Inside the frame it is the product; outside it is
  marketing.
- **Australian English throughout.** `lang="en-AU"`, `en_AU` Open Graph
  locale.
- **Never em dashes in shipped copy.**
- **No launch date.** The FAQ deliberately refuses to name one. Do not add one.

Undecided or deliberately absent:

- When the waitlist moves from Resend to Pipedrive.
- Facebook exists as an empty tile on `/bio` until the page is created.
- Whether native apps, multi-currency or a directory ever ship. The site says
  "not yet, on purpose" and must not soften that.

Known drift to resolve in a copy pass, not silently:

- This repo's `docs/brand.md`, the House pricing tier and the FAQ say the build
  slot is every six months. The confirmed cadence is every quarter (above).
- The about page counts 250+ weddings worked; the FAQ says over three hundred.
  One number is right. Ben decides which.

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
- **Honesty over proof.** Because there is no proof yet, the copy carries the
  honesty: it says "in build", "indicative", "first release", and lets the
  reader see exactly how far along things are.
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
- The hero mock (`src/components/product/hero-mock.tsx`), hand-built with
  illustrative data per category. It depicts intent, not the shipped screen.
- Three product previews at `public/overview-preview.png`,
  `public/pipeline-preview.png` and `public/bookings-preview.png`. **These are
  mockups, not captures of the product.** Confirmed September 2026. Future
  work may show them as illustration and must not present them as proof of
  what has shipped.
- Real facts about the founders in `src/content/about.ts`: Ben's decade of
  weddings and Love Poets, Alex's seven years writing software, the
  Apr 2025 / Jun 2026 / Aug 2026 timeline, zero investors.
- The survey at `https://forms.gle/2haJPf696ejiLHRx8`, linked from `/bio`.

Absent. Do not fabricate:

- No customers, testimonials, logos, case studies, press or quotes.
- No usage numbers, revenue, deposit totals, wedding counts run on Arbour, or
  waitlist size.
- No real product screenshots. When the main app's help-centre captures are
  ready they become the truthful imagery; until then, none exist here.
- No launch date.

## Product Principles

1. **Claim scope, never traction.** Say what is being built and for whom. The
   day there is real usage, it goes on the site with a number; until then the
   absence is the honesty.
2. **Never assume a wedding.** Every example, screen and label must read
   correctly for a corporate function or a commercial shoot, and the site
   shows at least one on purpose.
3. **Assume a two-year user.** The reader has used a CRM. Explain the
   difference, not the category.
4. **One ask.** Every path ends at the waitlist or the contact inbox. No second
   CTA, no chat widget, no lead magnet.
5. **Two people, and say so.** Support, copy and code are Ben and Alex. The
   site never implies a team, a sales function or a support desk.

## Accessibility & Inclusion

- Reduced motion is honoured globally: `prefers-reduced-motion` in
  `src/app/globals.css` stops the looping square animations and the hero mock
  swap.
- Text on Acid and Cream is always Bottle or Ink; text on Bottle is Cream or
  Acid. Hairlines are Ink at low opacity, never grey, so contrast holds.
- `/bio` is built for one thumb and a bad signal: no nav, no footer, large
  targets, no horizontal scroll.
- The thanks page only echoes a category it recognises, never arbitrary query
  text.
