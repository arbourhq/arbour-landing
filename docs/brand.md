# Arbour brand reference

Source of truth for colour, type, layout, wordmark and voice. Self-contained: it can be pasted whole into any AI tool that has no other context.

## 1. What Arbour is

Arbour is the operating system that weddings run on: an all-in-one sales CRM plus project management platform built for nothing except the wedding industry.

It serves EVERY wedding vendor category, not just planners: photographers, videographers, planners, celebrants, florists, DJs, entertainment agencies, caterers, venues, hire companies, stylists.

One record carries a job from first enquiry ("are you free?") all the way to the final invoice. Sales and delivery are the same tool.

Vendors also run non-wedding work through it (corporate functions, commercial shoots, private parties), so product language stays general: JOBS, not "weddings"; CONTACTS, not "couples".

Positioning note: the brand lives in the wedding niche, but the software must never assume a wedding.

Top tier is enterprise, called HOUSE: venues, groups and studios who have outgrown other software. Its headline benefit is a BUILD SLOT EVERY QUARTER, real engineering time on the customer's own problem, shipped into their account. Not a roadmap vote.

Team: two founders. Ben (wedding videographer) and Alex (software engineer). Support is answered by one of the two.

Main competitors: Studio Ninja, HoneyBook, Iris Works, Táve.

## 2. Colour palette

Named colours (use these hex values exactly):

| Name | Hex | Use |
|---|---|---|
| Bottle | `#0B4030` | house colour, dark panels, primary |
| Bottle deep | `#083023` | hover |
| Bottle ink | `#052117` | active / deepest |
| Acid | `#C6FF3D` | MARKETING ONLY (see rule below) |
| Sprout | `#9FE870` | IN-PRODUCT success / primary action |
| Coral | `#FF4438` | alerts, danger, overdue |
| Cornflower | `#4E6DF5` | enterprise, info |
| Lilac | `#B9A7FF` | soft holds, tentative state |
| Cream | `#FFFBEF` | the page ground |
| Ink | `#0F2A1E` | all text |

Supporting tints:

| Name | Hex | Name | Hex |
|---|---|---|---|
| Cream sunken | `#F6F0DC` | Acid wash | `#F0FFCE` |
| Cream inset | `#EDE5C9` | Sprout wash | `#EAFADD` |
| Bottle wash | `#E9F1EB` | Coral wash | `#FFE5E2` |
| Ochre (warning only) | `#DFA023` | Cornflower wash | `#E7EBFE` |
| | | Lilac wash | `#F1EDFF` |

### The one rule that matters most

> **Acid sells Arbour. Sprout runs it.**

Acid `#C6FF3D` is for marketing, the wordmark ground, print, social, and rare earned celebration moments inside the product (a month fully paid, roughly four times a year).

Sprout `#9FE870` does all the day-to-day work inside the app: primary buttons, active nav, selection, success, progress.

They only ever appear together when a product screenshot is sitting inside a marketing page. Never side by side in UI.

### Borders

Ink hairlines at low opacity, never grey:

- subtle `rgba(15,42,30,.14)`
- default `rgba(15,42,30,.24)`
- strong `rgba(15,42,30,.45)`

In-product grounds run neutral (white `#FFFFFF` or a warm grey `#F4F4F1`) rather than Cream. Cream is for marketing and print. Reason: vendors are in the software eight hours a day and it must feel calm. Loud brand, quiet product.

## 3. Typography

| Role | Family | Notes |
|---|---|---|
| Display | Bricolage Grotesque | weight 800, headlines, numbers |
| Body | Instrument Sans | 400/600, all reading text |
| Labels | Martian Mono | eyebrows, data, micro-labels |

Google Fonts import:

```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&family=Martian+Mono:wght@300..700&display=swap
```

Type scale (px):

| px | Use | px | Use |
|---|---|---|---|
| 9 | mono micro labels | 24 | section heads |
| 11 | mono eyebrows, meta | 32 | page titles |
| 13 | dense UI, tables | 44 | display |
| 15 | body default | 60 | hero |
| 17 | lead body | 88 | statement |
| 20 | card titles | 150 | the single "This." moment |

Line heights: display 0.9, tight 1.05, snug 1.25, body 1.5, relaxed 1.6.

Letter spacing:

- Bricolage headlines `-0.04em` (tighten hard at size)
- Mono labels `+0.16em`, eyebrows `+0.2em`, UPPERCASE
- Wordmark `+0.04em`

Rules:

- Bricolage only at 800. Never use faux bold or lighter weights for headlines.
- Mono is always uppercase and always small. It is a label voice, never body copy.
- Big numbers (stats, money, counts) are Bricolage 800, not body.

## 4. Wordmark

FIXED, do not redesign: an open "A" with NO CROSSBAR (it reads as a triangular wedding arbour) followed by "RBOUR" in Bricolage Grotesque 800, all caps, `+0.04em` tracking.

The A is drawn as a single stroked path, rounded caps and joins:

```html
<svg viewBox="333 372 528 494" style="height:.66em;width:auto">
  <path d="M394 805 L595 383 L796 805" fill="none"
    stroke="currentColor" stroke-width="122"
    stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

Set the SVG height to `0.66em` of the type size with about `0.04em` of right margin, aligned on the baseline of RBOUR.

Valid grounds: Acid with Bottle mark, Bottle with Acid mark, Cream with Bottle mark. Never on a photograph, never outlined, never with a crossbar added.

## 5. Visual language

- **SQUARE CORNERS**, or very nearly. 0 for marketing and print surfaces; up to 6px inside the product. Never pills, never large radii. Exception: floating chrome (a nav bar) may use 6px, and icon badges in illustrations may be circular.
- **INSET / LETTERPRESS DEPTH**, never blurred drop shadows. Buttons carry an inset bottom edge: `box-shadow: inset 0 -4px 0 rgba(11,64,48,.4)`. Panels use inset hairlines: `inset 0 0 0 1px rgba(15,42,30,.2)`.
- **COLOUR FLOODS WHOLE SECTIONS.** A section takes an entire colour edge to edge rather than tinting a card inside a white page.
- **DELIBERATE ASYMMETRY.** Nothing centred by default. Big type sits hard left, elements sit off-axis on purpose.
- **OVERSIZED TYPE AS INTERFACE**, not decoration.
- Hairline rules and single-pixel dividers do the layout work.
- **MOTION: playful overshoot.** Standard curve `cubic-bezier(.34,1.8,.45,1)` at 260-320ms. Hovers lift (`translateY(-3px)`), sometimes with a degree or two of rotate. Squares pop, wobble and squash. Motion should feel confident and slightly cartoon, never slow or cinematic.
- No gradients. No glassmorphism. No soft rounded shadow cards.
- Emoji: no.

## 6. Tone of voice

Upbeat, dry, human. Confident enough to be playful.

Weddings are PARTIES, not projects. We are in the business of good days, and the copy should sound like someone who has worked a hundred of them.

The register: we know exactly what we are doing, and we are relaxed enough about it to be funny.

**DO:**

- Speak to someone who has used the platform for two years. No hand-holding, no explaining the obvious.
- Short sentences. Concrete nouns. Real numbers.
- Trade language where it is genuine: the book, the run sheet, load-in, the rain call, covers, load out.
- Let a line land dryly. "Nothing needs you. Genuinely."
- Australian English (organise, prioritise, recognise).

**DO NOT:**

- NEVER USE EM DASHES. Not anywhere, in any copy. Use a comma, a full stop, a colon, or brackets instead. This is absolute.
- No pitch-deck language: no "seamlessly", "empower", "revolutionise", "supercharge", "unlock", "game-changing", "leverage", "solutions", "at scale".
- No exclamation marks stacked for enthusiasm.
- No onboarding voice in a mature product ("sent from your address, not ours" tells a two-year customer nothing).
- No fake urgency, no dark patterns.

Headings are plain, not clever. "Pipeline" not "$412k in play". Save the wit for body copy and empty states.

Voice examples that are correct:

- "Run thirty weddings without losing a Saturday."
- "Arbour is the CRM wedding vendors actually keep open."
- "Nothing needs you. Genuinely. Go and have a coffee that is not from the servo."
- "Quiet. Suspiciously quiet."
- "Lock-in is not a business model, it is a hostage situation."
- "That is the whole wedding, banked."
- "No confetti, the ducks eat it."

## 7. Product data model

Two primary objects:

- **CONTACTS**: one person, one contact, with all their own data
- **JOBS**: a piece of work, with linked contacts

Everything else hangs off these. Crew, suppliers and clients are all contacts with different roles on a job.

CUSTOM VARIABLES are how the platform adapts per vendor category. Users define their own fields on contacts, jobs and crew. Choosing a vendor category at signup only pre-populates a sensible starter set. Never hard-code category-specific fields (guest counts, dietaries, shot lists) into the core product.

AI SUGGESTIONS are confined to the Today screen only. Every other screen shows data, not advice. A suggestion must always state its reasoning from real data, for example: "Hold expires Friday. Pencilled 19 days ago, no deposit, and two other enquiries have asked about that date."

## 8. Quick checklist before shipping anything

- [ ] Zero em dashes
- [ ] Acid only on marketing; Sprout inside the product
- [ ] Corners square or 6px maximum
- [ ] Inset depth, no blurred shadows
- [ ] Bricolage 800 for display, Instrument Sans for body, Martian Mono uppercase for labels
- [ ] Wordmark A has no crossbar
- [ ] Headings plain, not buzzwords
- [ ] Copy assumes an experienced user
- [ ] Product wording works for a corporate function, not just a wedding
