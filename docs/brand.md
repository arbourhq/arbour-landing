# Arbour brand reference

Source of truth for colour, type, layout, wordmark and voice. Self-contained: it can be pasted whole into any AI tool that has no other context.

## 1. What Arbour is

Arbour is the operating system that weddings run on: an all-in-one sales CRM plus project management platform built for nothing except the wedding industry.

It serves EVERY wedding vendor category, not just planners: photographers, videographers, planners, celebrants, florists, DJs, entertainment agencies, caterers, venues, hire companies, stylists.

One record carries a job from first enquiry ("are you free?") all the way to the final invoice. Sales and delivery are the same tool.

Vendors also run non-wedding work through it (corporate functions, commercial shoots, private parties), so product language stays general: JOBS, not "weddings"; CONTACTS, not "couples".

Positioning note: the brand lives in the wedding niche, but the software must never assume a wedding.

Top tier is enterprise, called HOUSE: venues, groups and studios who have outgrown other software. Unlimited seats, priority support and onboarding done for you, plus priority feature requests.

Team: two founders. Ben (wedding videographer) and Alex (software engineer). Support is answered by one of the two.

Main competitors: Studio Ninja, HoneyBook, Iris Works, Táve.

## 2. Colour palette

Named colours (use these hex values exactly):

| Name | Hex | Use |
|---|---|---|
| Bottle | `#0B4030` | house colour, dark panels, primary |
| Bottle deep | `#083023` | hover |
| Bottle ink | `#052117` | active / deepest |
| Acid | `#C6FF3D` | the A on the app icon, print and social; never a screen colour |
| Sprout | `#9FE870` | the one lit action, success, selection, progress |
| Coral | `#FF4438` | alerts, danger, overdue |
| Cornflower | `#4E6DF5` | enterprise, info |
| Lilac | `#B9A7FF` | soft holds, tentative state |
| Cream | `#FFFBEF` | print only, never on the site or in the product |
| Ink | `#0F2A1E` | print ink (screens use the register Ink below) |

Supporting tints:

| Name | Hex | Name | Hex |
|---|---|---|---|
| Cream sunken | `#F6F0DC` | Acid wash | `#F0FFCE` |
| Cream inset | `#EDE5C9` | Sprout wash | `#EAFADD` |
| Bottle wash | `#E9F1EB` | Coral wash | `#FFE5E2` |
| Ochre (warning only) | `#DFA023` | Cornflower wash | `#E7EBFE` |
| | | Lilac wash | `#F1EDFF` |

### The one rule that matters most

> **One register. The site looks like the software it sells.**

Decided 26 October 2026: the separate marketing look (Acid, Cream floods, square corners) is retired from usearbour.com. The site and the console share one register: white and Panel grounds, Bottle for structure, Sprout for the one thing to do next.

Sprout `#9FE870` is the single lit action on any screen: the trial button on the site, the headline action in the console, and selection, success and progress everywhere. A screen with two Sprout buttons has no headline action, so the default button is Bottle.

Acid and Cream stay in the brand for print and social, and Acid is the A on the app icon (the console's and the site's alike). Neither is ever a screen colour on the site or in the product.

### Register (screens)

| Name | Hex | Use |
|---|---|---|
| Page | `#FFFFFF` | the ground, everywhere |
| Panel | `#F5F6F2` | sunken cells, stat tiles, tab tracks |
| Panel hover | `#EDEEE9` | hover on Panel |
| Line | `#EFEFEC` | the opaque hairline: rules and dividers |
| Ink | `#17211B` | all screen text |
| Ink secondary | `#57574F` | descriptions, body under a title |
| Ink muted | `#61615A` | mono labels, meta |
| Ink faint | `#6A6A62` | placeholders |
| On dark | `#F4F4F0` | text on Bottle |

Each status family has an ink step for text on its wash: Sprout ink `#2A5A1D`, Coral ink `#9E1D14`, Cornflower ink `#2438A8`, Lilac ink `#4C3A99`, Ochre ink `#7A5510`.

### Borders

Translucent ink, never a grey hex:

- soft `rgba(23,33,27,.05)` on raised cards
- default `rgba(23,33,27,.10)` on panels
- input `rgba(23,33,27,.12)`, hover `rgba(23,33,27,.28)`

Rules and dividers use the opaque Line. Reason for the neutral grounds: vendors are in the software eight hours a day and it must feel calm, and the site should look like what they will be using.

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

Type scale (written in rem against an unpinned 16px root; px shown):

| px | Use | px | Use |
|---|---|---|---|
| 9 | mono micro labels | 20 | card titles |
| 11 | mono eyebrows, meta | 24 | section heads |
| 12 | captions, hints | 32 | page titles |
| 13 | dense UI, tables | 44 | display |
| 14 | controls, card body | 32 to 56 | site section headlines |
| 15 | body default | 44 to 96 | site hero |
| 17 | lead body | 56 to 160 | the single statement moment |

Line heights: display 0.9, tight 1.05, UI 1.4, body 1.5.

Letter spacing:

- Bricolage headlines carry no added spacing. Load the optical size axis (`opsz`), which tightens the face at display sizes.
- Mono labels `+0.16em` (9px), eyebrows `+0.14em` (11px), UPPERCASE
- Wordmark `+0.04em`

Rules:

- Bricolage only at 800. Never use faux bold or lighter weights for headlines.
- Mono is always uppercase and always small. It is a label voice, never body copy.
- Big numbers (stats, money, counts) are Bricolage 800, not body.

## 4. Wordmark

FIXED, do not redesign: an open "A" with NO CROSSBAR (it reads as a triangular wedding arbour) followed by "RBOUR" in Bricolage Grotesque 800, all caps, `+0.04em` tracking.

The A is drawn as a single stroked path with rounded caps, and a FLAT TOP:

```html
<svg viewBox="333 372 528 494" style="height:.66em;width:auto">
  <path d="M394 805 L595 383 L796 805" fill="none"
    stroke="currentColor" stroke-width="122"
    stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
```

The apex is flat, not domed. Only the two feet are round. The flat comes from the viewBox: it starts at `y=372` and the apex vertex is at `y=383`, so the top edge of the viewport cuts the join off 11 units above the vertex, leaving a flat 124.65 units wide. The join style is irrelevant because the whole join sits above the cut.

THE VIEWBOX IS LOAD-BEARING. Do not raise its top edge, and do not re-frame the path into a bigger box without reproducing the cut, or the mark grows a rounded dome it has never had. Anything that re-frames the A (an app icon, a favicon, a social avatar) must clip at `y=372` in path coordinates:

```html
<clipPath id="a-flat-top"><rect x="260" y="372" width="620" height="560"/></clipPath>
```

Set the SVG height to `0.66em` of the type size with about `0.04em` of right margin, aligned on the baseline of RBOUR.

Valid grounds on screens: white with a Bottle mark, Bottle with a white mark. In print and social, Acid with a Bottle mark and Cream with a Bottle mark are also valid. Never on a photograph, never outlined, never with a crossbar added.

### Arby, the mascot

Arby, the in-app assistant, has a face: a kookaburra, drawn as twelve fixed-artwork poses that live in the product kit. Like the wordmark it is FIXED: master colours always (a cream body, dark green plumage, a lime crest), never the register's, never recoloured for a ground. The crest lime is artwork, not a UI colour, so it does not breach the Acid / Sprout rule.

Valid grounds: Bottle wash `#E9F1EB`, white, or the neutral Panel ground. Never Acid, Bottle or Bottle deep, never on a photograph. Cream only for the peeking pose, which is cut at the shoulders and reads by its crest, wing, beak and eye; a full-body pose on Cream loses its body.

Where it appears: brand moments only. In the product, the first day, a dead end, an error, an empty chat, a clear queue. On the marketing home page, one scroll companion replaces the two separate mascot appearances. It follows scrolling, lands on clear page edges, and uses a branch attached to the viewport edge when no suitable page edge is visible. Reduced motion, disabled animation and unavailable JavaScript leave one still bird in the Arby block. Never in the portal, the embed form, emails, PDFs or social images.

Home-page companion exception, approved 17 September 2026: the free-flying bird and its landings may cross the site's grounds, Bottle bands included. Keep the master paths and colours unchanged. A 1px Cream keyline (at most 1px, unblurred) keeps the dark plumage's edge on the Bottle footer and all but vanishes on white. No blurred shadow. It replaced the heavier Cream and Ink silhouette outline on 26 October 2026. Keep flight close to the edge of the viewport, prefer clear perches, avoid controls, and honour reduced motion. The user removed the bottom-right launcher and hide controls on 17 September 2026. This exception does not allow recolouring or change the background rules for any other mascot placement.

Arby Help, approved 17 September 2026: clicking the companion or still fallback opens the support chat. Arby lands on the panel's top rule and stays there until it closes. The bird itself is the launcher; there are no bottom-right buttons. So people know it is clickable, Arby says so in a speech bubble (added 26 October 2026): a hello once the page settles, then a line for whatever section is on screen when it lands ("Not on the list? Click me and ask" by the FAQ), at most four a page, never the same section twice running, gone after five seconds or on the next scroll, and always on hover. The bubble is floating chrome: white, the Line hairline, 6px corners, the lifted shadow, a mono cue line. Once the chat has been opened it stops. The panel is floating chrome in the register, drawn like the console's own Arby sheet: a white panel with the Bottle square Arby mark beside a Bricolage title, starter questions as bordered rows, a Bottle send button that goes flat to Panel while there is nothing to send (the console's disabled solid button), 6px corners and the lifted shadow. No Sprout: an assistant is neither a sale nor a success. Reduced motion keeps the perched bird still. Identify the chat as AI and distinguish it from the account-aware assistant inside the product.

About page hello, approved 26 October 2026: the waving pose stands on the hero's cell rule, right of "The ultimate collab.", on white, from 640px up. It hops in once the headline has landed, then runs the kit's own waving idle. Decorative, master colours, no launcher.

## 5. Visual language

- **SLIGHTLY ROUNDED, ONE SCALE.** 6px for buttons, inputs, cards, panels and floating chrome; 4px for small controls (badges, menu items, checkboxes, tab segments); 2px for leaves and dots. Nothing above 6px. Pills only for avatars and status dots. Print stays square.
- **INSET / LETTERPRESS DEPTH** on content. Solid buttons carry an inset bottom edge: `box-shadow: inset 0 -4px 0 rgba(11,64,48,.4)`. Panels use an inset hairline: `inset 0 0 0 1px rgba(23,33,27,.1)`. Only floating chrome (the nav bar, menus, popovers, the Arby Help panel, toasts) may cast a blurred shadow: `0 10px 28px rgba(23,33,27,.13), 0 2px 5px rgba(23,33,27,.07)`.
- **WHITE BY DEFAULT, COLOUR IN WHOLE BLOCKS.** Most of a screen is white. When colour arrives it takes a whole block edge to edge (a Bottle band, a Panel cell) rather than tinting a card inside the page.
- **DELIBERATE ASYMMETRY.** Nothing centred by default. Big type sits hard left, elements sit off-axis on purpose.
- **OVERSIZED TYPE AS INTERFACE**, not decoration.
- Hairline rules and single-pixel dividers do the layout work. On the site they are visible construction: column rules run the length of the page, with small registration marks where a row crosses them.
- **MOTION: playful overshoot.** `cubic-bezier(.34,1.8,.45,1)` at 260ms for pops and lifts; `cubic-bezier(.16,.84,.36,1)` glide at 180 to 260ms for slides and fades. Hovers lift 3px. Motion should feel confident and slightly cartoon, never slow or cinematic.
- No gradients. No glassmorphism. No soft rounded shadow cards.
- Emoji: no.
- Article media uses genuine stock photography and actual product captures. No AI-generated raster images. Apply colour filters to photography only, keep product screens legible, and use HTML/CSS for diagrams and charts.

## 6. Tone of voice

Upbeat, dry, human. Confident enough to be playful. Sometimes a little cheeky. Lean into our Australian roots.

Weddings are PARTIES, not projects. We are in the business of
good days, and the copy should sound like someone who has worked
a hundred of them.

The register: we know exactly what we are doing, and we are
relaxed enough about it to be funny.

DO:
- Speak to someone who has used the platform for two years.
  No hand-holding, no explaining the obvious.
- Short sentences. Concrete nouns. Real numbers.
- Trade language where it is genuine: the book, the run sheet,
  load-in, the rain call, covers, load out.
- Let a line land dryly. "Nothing needs you. Genuinely."
- Australian English (organise, prioritise, recognise).

DO NOT:
- NEVER USE EM DASHES. Not anywhere, in any copy. Use a comma,
  a full stop, a colon, or brackets instead. This is absolute.
- No pitch-deck language: no "seamlessly", "empower",
  "revolutionise", "supercharge", "unlock", "game-changing",
  "leverage", "solutions", "at scale".
- No exclamation marks stacked for enthusiasm.
- No onboarding voice in a mature product ("sent from your
  address, not ours" tells a two-year customer nothing).
- No fake urgency, no dark patterns.

In-app page headings are plain, not clever. "Pipeline" not "$412k in play".
Save the wit for body copy and empty states.

Voice examples that are correct:
  "Book thirty planning meetings without manually sending a single email. That's cool."
  "Arbour is the operating system that wedding vendors actually keep open."
  "Nothing needs you. Genuinely. Go and have a coffee that is
   not from the servo."
  "Quiet. Suspiciously quiet. Hmmm."
  "Lock-in is not a business model, it is a hostage situation."
  "That is the whole wedding, banked."
  "No confetti, the ducks eat it."

## 7. Product data model

Two primary objects:

- **CONTACTS**: one person, one contact, with all their own data
- **JOBS**: a piece of work, with linked contacts

Everything else hangs off these. Crew, suppliers and clients are all contacts with different roles on a job.

CUSTOM VARIABLES are how the platform adapts per vendor category. Users define their own fields on contacts, jobs and crew. Choosing a vendor category at signup only pre-populates a sensible starter set. Never hard-code category-specific fields (guest counts, dietaries, shot lists) into the core product.

AI SUGGESTIONS are confined to the Today screen only. Every other screen shows data, not advice. A suggestion must always state its reasoning from real data, for example: "Hold expires Friday. Pencilled 19 days ago, no deposit, and two other enquiries have asked about that date."

## 8. Quick checklist before shipping anything

- [ ] Zero em dashes
- [ ] No Acid or Cream on screens; one Sprout action per screen
- [ ] Corners 6px maximum (4px small controls, 2px leaves)
- [ ] Inset depth on content; blur only on floating chrome
- [ ] Bricolage 800 for display, Instrument Sans for body, Martian Mono uppercase for labels
- [ ] Wordmark A has no crossbar
- [ ] Arby in master colours, on Bottle wash or white (Cream for peeking only), only at a brand moment
- [ ] Headings plain, not buzzwords
- [ ] Copy assumes an experienced user
- [ ] Product wording works for a corporate function, not just a wedding
