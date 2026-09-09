---
name: Arbour marketing site
description: The loud half of "loud brand, quiet product": a pipeline board read top to bottom in Bottle, Acid and Cream floods, letterpress depth, overshoot motion.
colors:
  bottle: "#0b4030"
  bottle-deep: "#083023"
  bottle-ink: "#052117"
  acid: "#c6ff3d"
  acid-wash: "#f0ffce"
  cream: "#fffbef"
  cream-sunken: "#f6f0dc"
  ink: "#0f2a1e"
  cornflower: "#4e6df5"
  cornflower-deep: "#3a57dc"
  lilac: "#b9a7ff"
  coral: "#ff4438"
  coral-wash: "#ffe5e2"
  app: "#f4f4f1"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(34px, 8.4vw, 92px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  statement:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(40px, 8.5vw, 88px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  numeral:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(56px, 9vw, 120px)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(32px, 6vw, 60px)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  ui:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.375
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
  eyebrow:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  none: "0px"
spacing:
  cell: "12px"
  stack: "20px"
  gutter: "24px"
  gutter-wide: "40px"
  row: "28px"
  column-gap: "48px"
  section: "80px"
  section-wide: "96px"
  container: "1180px"
components:
  button-acid:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.bottle}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-bottle:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.acid}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-outline-acid:
    backgroundColor: "transparent"
    textColor: "{colors.acid}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-outline-bottle:
    backgroundColor: "transparent"
    textColor: "{colors.bottle}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.cornflower}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  chip-cell:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.bottle}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
    height: "56px"
  chip-cell-selected:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.acid}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
    height: "56px"
  rail-cell-tall:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.bottle}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "96px"
  rail-cell:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.bottle}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "52px"
  rail-cell-active:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.acid}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "52px"
  field:
    backgroundColor: "{colors.acid-wash}"
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
    padding: "16px 18px"
  ledger-row:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "20px 12px"
  capture-frame:
    backgroundColor: "{colors.app}"
    rounded: "{rounded.none}"
    padding: "2px"
  board-card:
    backgroundColor: "{colors.acid}"
    rounded: "{rounded.none}"
    height: "11px"
    width: "72px"
---

# Design System: Arbour marketing site

## Overview

**Creative North Star: "The Board"**

The site is a pipeline board read top to bottom. Every section is a whole colour, edge to edge, and no two neighbours share a ground: Bottle, Acid, Cream and Cream sunken take turns, with Cornflower, Lilac and Coral admitted one at a time as a single stage's accent. Inside each flood a real capture of the console sits in a two-pixel square frame, and everything else is type and hairlines. There are no cards. The layout work is done by rules, butted cells and oversized numerals, and the reader always knows which stage they are on because the sticky rail says so. The hero draws the board itself in the brand's own squares: five stacks of accent cards, one card per job, standing on the five cells of the rail. The rail is born tall on the hero's foot, at the fold, as the board's column headers, and squashes into the compact sticky rail as the reader scrolls into stage 01.

This is the loud half of "loud brand, quiet product". Bricolage Grotesque at 800 is set hard left and tightened to -0.04em; the biggest word on the page is a control (the category slab inside the h1) rather than an ornament. Depth is letterpress: filled buttons carry an inset bottom edge, panels sit inside an inset hairline ring, the active rail cell has an inset edge in its stage's accent. Nothing floats on a blurred shadow. Motion is short and slightly cartoon: one overshoot curve at 260 to 320ms, hovers that lift a few pixels and tilt a degree, one small square per section that pops, drops or squashes on a loop.

Confirmed rejections, all evidenced by the build: no gradients, no blurred drop shadows, no rounded corners on marketing surfaces, no grey borders, no Sprout outside a product capture, no em dashes in copy, no emoji, no glyph icon sets (the only icons are two hand-drawn 16px strokes: a plus and an outbound arrow).

**Key Characteristics:**
- Whole-section colour floods that alternate Bottle / Acid / Cream / Cream sunken, never two alike in a row.
- One accent per stage (Cornflower, Lilac, Acid, Coral), carried by the hero board's card stack, a small square (beside the numeral and in the tall rail's sub-line), the rail's active edge and the caption mark.
- Bricolage Grotesque 800 hard left at -0.04em; Instrument Sans body at 15px; Martian Mono uppercase labels at 9px.
- Letterpress depth: inset bottom edges and inset hairline rings, drawn with box-shadow, never blur.
- Hairline ledgers instead of cards: rows separated by Ink at 0.20 alpha, flooding Acid on hover.
- Square everything, including the scrollbar, the selection highlight and the focus ring; nothing sits off axis at rest, rotation is a hover.
- Overshoot motion, cubic-bezier(.34,1.8,.45,1), 200 to 320ms, lifts of 2 to 8px with a degree or so of rotate.

## Colors

Three grounds and one ink do almost all of the work; three chromatic accents appear one at a time, and each has a deep or wash step for when contrast demands it.

### Primary
- **Bottle** (`bottle`): the house green. Nav bar, hero, stages 02 and 05, pricing and footer flood with it; on light grounds it is the filled button, the selected chip, the capture frame border and the display numeral. **Bottle deep** is the hover step (scrollbar thumb, category list rows) and **Bottle ink** is the deepest: the category popover and the active scrollbar thumb.
- **Acid** (`acid`): the marketing green and the site's only loud colour. It floods the stage rail, stage 03, the automation section and the final CTA; on Bottle it is every headline, every label, every primary button, the hero board's counts and the card stacks of stages 03 and 05; on Cream it is the hover flood of every ledger row and chip. **Acid wash** is the form field ground.

### Secondary
- **Cornflower** (`cornflower`): stage 01's accent and the enterprise colour. It is stage 01's card stack in the hero board; its square sits beside the "01" numeral, in the tall rail's first sub-line, and under the active rail cell. **Cornflower deep** carries Cream text at 5.7:1 for the Enterprise badge, because Cream on plain Cornflower is only 4.2:1.
- **Lilac** (`lilac`): stage 02's accent, the tentative colour. Hero card stack, numeral square, tall-rail square and rail edge only.
- **Coral** (`coral`): stage 04's accent and the error colour. Hero card stack, numeral and tall-rail squares, rail edge, the recording dot on About, and the 1.5px inset ring on the contact form's error panel, whose ground is **Coral wash**.

### Neutral
- **Cream** (`cream`): the page ground and the ground of stages 01 and 04's neighbours, the FAQ and the vendor section. On Bottle it is body copy at 0.60 to 0.80 alpha, and the hero board's "illustrative" label at 0.55.
- **Cream sunken** (`cream-sunken`): stage 04's flood, the "More at sign-up" cell and the scrollbar channel. The one step down from Cream when two light sections would otherwise touch.
- **Ink** (`ink`): all text on light grounds, and every hairline on them at 0.15 to 0.25 alpha. Body copy on Cream runs Ink at 0.75 to 0.80 alpha, labels at 0.65.
- **App** (`app`): the neutral in-product ground, legal only as the fill behind a product capture while it loads.

### Named Rules
**The Acid Sells, Sprout Runs Rule.** Sprout (#9fe870) is the product's action colour and appears on this site only inside a product capture. It is defined in the theme and used in zero lines of markup; keep it that way.

**The No Two Alike Rule.** Adjacent sections never share a ground. The home page runs Bottle, Acid (rail), Cream, Bottle, Acid, Cream sunken, Bottle, Acid, Cream, Bottle, Cream, Acid, Bottle. When two light sections would touch, the second drops to Cream sunken.

**The One Accent Rule.** A stage gets exactly one of Cornflower, Lilac, Acid or Coral, and it appears in exactly five places: the card stack in the hero board, the 8px square in the tall rail's sub-line, the square beside the numeral, the inset edge under the active rail cell, and the mark before the capture caption. On an Acid ground the square turns Bottle; on Bottle the Acid stages' cards stay Acid.

**The Ink Hairline Rule.** Rules and dividers are Ink on light grounds and Cream or Acid on Bottle, always at low alpha (0.15 subtle, 0.20 default, 0.25 for dashed sub-rules and butted-cell grout). Never a grey.

## Typography

**Display Font:** Bricolage Grotesque (with system-ui, sans-serif)
**Body Font:** Instrument Sans (with system-ui, sans-serif)
**Label/Mono Font:** Martian Mono (with ui-monospace, monospace)

**Character:** Bricolage at 800 and tight tracking is the whole personality: chunky, confident, set hard left and often the biggest object on screen. Instrument Sans sits underneath it at reading sizes with generous leading, and Martian Mono in small caps-height uppercase handles every label, index and meta line without ever becoming body copy.

### Hierarchy
- **Display** (800, clamp(34px, 8.4vw, 92px), 0.92, -0.045em): the home h1 only, run across the full container width with the Acid category slab inside it. The floor is set by the longest category name on a 375px phone; the cap is where two lines still clear the capture and the rail at 1440x900.
- **Statement** (800, clamp(40px, 8.5vw, 88px), 0.86): the final CTA and secondary-page h1s (which run to clamp(40px, 9vw, 104px) and 112px at -0.05em).
- **Numeral** (800, clamp(56px, 9vw, 120px), 0.8, -0.05em, tabular): the stage index, "01" to "05". It is the same numeral the rail carries, not decoration. Prices use the same face at clamp(44px, 6vw, 60px), and the hero board's column counts at clamp(22px, 3vw, 32px), leading 1, -0.04em, tabular. A count is always a numeral, never label-mono.
- **Headline** (800, clamp(32px, 6vw, 60px), 0.9): every section h2, max-width 16 to 22ch, `text-balance`.
- **Title** (800, 24px, 1, -0.03em): ledger row titles, footer tagline, contact facts (22px). Between 22 and 30px tracking eases to -0.03em.
- **Lead** (400, 17px, 1.625; 19px from sm): the paragraph beside a headline, 46 to 52ch.
- **Body** (400, 15px, 1.625): the default reading size, 29 call sites. Ledger facts, tier copy, footer copy, 30 to 58ch.
- **UI** (600, 15px, 1.375): buttons, rail and chip labels, stage names, FAQ questions (17 to 20px).
- **Dense** (400, 13px, 1.375): the automation panel's When / Then lines.
- **Label** (400, 9px, 0.16em, UPPERCASE): the `label-mono` utility. Stage fact labels, capture captions, the hero board's two labels ("Your board · {category}" in Acid, "One job per card · illustrative" in Cream 0.55), rail indices and the tall rail's sub-lines (the category's stage name, from sm), nav links (10px in the bar, 11px in the phone menu), meta lines under buttons, footer column heads.
- **Eyebrow** (400, 10px, 0.2em, UPPERCASE): the `eyebrow` utility. Form field labels on the contact form, and section index labels on About.

### Named Rules
**The 800 Only Rule.** Bricolage Grotesque is loaded and set at one weight, 800. No other weight of it exists on the site.

**The Tighten at Size Rule.** Bricolage tracks -0.03em up to 30px, -0.04em from 32px, -0.045em at the 92px display, and -0.05em at 100px and above. Leading falls with size: 1 at title, 0.92 at display, 0.9 at headline, 0.86 at statement, 0.8 at numeral.

**The Label Voice Rule.** Martian Mono is always uppercase and always 9 to 11px. It names data (a stage index, a caption, a column head, a form field); it never runs as a sentence of body copy and it never sits above a headline as a kicker on the home page.

## Layout

A single 1180px container, centred, inside 24px gutters (40px from 640px). Sections stack as full-bleed floods with 80px of vertical padding (96px from 640px); stage sections run tighter at the top (40/48px) so the numeral lands close under the rail, and 56/80px at the bottom.

Every section head is a two-column grid, headline left (1.15fr) and lead right (1fr) with 48px between, collapsing to one column below 1024px. Stage bodies are a twelve-column grid: the capture takes eight, the fact ledger four, and the pair swaps sides on alternate stages (`flip`). The hero is the exception: it fills the first viewport on lg (`min-height: calc(100svh - var(--nav-h) - var(--rail-tall))`, both variables measured live) so the tall rail lands exactly on the fold. Section padding is 40px top and 20px bottom (48px top from 640px). Its h1 runs the full container width; beneath it (32px) a two-column row at lg puts the lead (40ch) on the left and the two CTAs with the label-mono trial line on the right, aligned to the row's end, both bottom-aligned. The board band is pushed to the section's foot with `margin-top: auto`, 40px below the row: a five-column grid on the same 1180px container and 16px side gutter (from 640px) as the rail, so each column stands on its rail cell; columns are `items-end`, with 10px side padding (16px from 640px) and a 1px column gap.

Ledgers (stage facts, vendor claims, pricing tiers, FAQ) are single-column lists of rows separated by hairlines, bled 12px past the container (24px from 640px) so a row's hover flood has room either side. Row padding is 20px for facts, 28px for claims and FAQ, 36px for pricing tiers. Butted cell grids (the stage rail, the vendor chips, the category popover) are `gap-px` on a low-alpha ground so the grout is the hairline; cells are 52 to 56px tall; the rail's tall state is 72px on phones and 96px from 640px (a `matchMedia` in the component).

Breakpoints as used: 640px (sm) is the main step for padding, type and grids; 1024px (lg) is where two-column layouts turn on; 768px (md) is used only by the nav to swap the phone menu for links; 1280px (xl) shows the large A behind the final CTA.

Section anchors clear the sticky nav through `scroll-padding-top: var(--nav-h)` on `<html>`, and stage sections additionally clear the sticky rail through a constant `scroll-margin-top` of 52px, the compact bar's height. The rail's sticky wrapper keeps the tall height (96px, 72px on phones, written to `--rail-tall` for the hero) in the layout in both states; the squash to 52px happens to the bar inside it, so sticking never moves the wrapper's own top edge. That constancy is load-bearing: a rail that shrank in layout as it stuck un-stuck itself and flickered. The 44px under the compact bar is transparent and passes pointer events through. The hero and the five stages share one `#board` wrapper so the rail is sticky for exactly their combined height.

## Elevation & Depth

No blurred shadows anywhere. Depth is letterpress: a solid inset edge along the bottom of a filled object makes it read as pressed into the page, and an inset one-pixel ring makes a light panel read as set into its ground. Everything is drawn with `box-shadow: inset ...` so it costs no layout. Floating chrome (the sticky nav and rail) is flat, separated from content by a hairline only.

### Shadow Vocabulary
- **Press** (`box-shadow: inset 0 -4px 0 rgb(11 64 48 / 0.4)`): the bottom edge on Acid and Cream filled buttons and on the category slab.
- **Press large** (`box-shadow: inset 0 -5px 0 rgb(11 64 48 / 0.5)`): the same edge on a large Acid surface.
- **Press dark** (`box-shadow: inset 0 -5px 0 rgb(0 0 0 / 0.45)`): the bottom edge on Bottle filled buttons, the selected vendor chip and the automation panel.
- **Hairline ring** (`box-shadow: inset 0 0 0 1px rgb(15 42 30 / 0.2)`): the inset outline on light panels.
- **Edge Bottle / Edge Acid** (`box-shadow: inset 0 0 0 2px var(--color-bottle|acid)`): outline buttons, the contact form's two panels, the billing toggle.
- **Edge thin** (`box-shadow: inset 0 0 0 1.5px ...`): form fields and topic chips (Bottle), the error panel (Coral).
- **Accent edge** (`box-shadow: inset 0 -4px 0 var(--color-<accent>)`): the active rail cell, in its stage's accent.
- **Cell divider** (`box-shadow: inset 1px 0 0 rgba(11,64,48,0.25)`): the rule between butted rail cells; the rail's own bottom is `inset 0 -1px 0 rgba(11,64,48,0.3)`.

### Named Rules
**The Letterpress Rule.** Depth is an inset edge on the object itself, never a shadow cast onto the ground. If a surface needs to sit forward, give it a bottom edge; if it needs to sit back, give it a ring.

## Shapes

Square corners, everywhere, with no radius token other than zero. Buttons, panels, chips, fields, the capture frame, the scrollbar thumb, the selection highlight and the focus ring are all hard-cornered. Product captures carry the app's 6px corners inside their artwork, which is fine because the frame around them is square.

The recurring silhouette is the small solid square: 8px in the tall rail's sub-lines, 10px before a caption, 16 to 28px beside a numeral or above a panel heading, in the stage accent or Bottle, and carrying the section's one loop of ambient motion. Its long cousin is the board card: a full-width block up to 72px wide and 9px tall (11px from 640px), stacked 4px apart in the stage's accent. Nothing on the site is rotated at rest; tilt is a hover. The only circles on the site are two 10 to 12px Coral "recording" dots on the About page, which the brand allows as an illustration badge.

Outlines are inset rings drawn with box-shadow (see Elevation), so an outline never changes an element's box. Rules are single-pixel borders at low alpha; dashed rules (Ink at 0.25) separate sub-lines within a ledger row. Capture frames are a 2px solid border in the ground's ink (Bottle on light, Acid on Bottle).

The wordmark is fixed artwork: an open A with no crossbar and a flat apex, then RBOUR in Bricolage 800 at +0.04em, supplied as a PNG in Acid or Bottle and set at 22 to 26px in the nav, 18px in the footer. The bare A is an SVG (`viewBox="333 372 528 494"`, stroke 122, round caps) and appears once at size, 420px behind the final CTA.

## Components

### Buttons
Square, filled, with a letterpress bottom edge; they lift on hover with the overshoot curve and tilt a degree when they are the section's main action.
- **Shape:** square (0px), Instrument Sans 600, no border.
- **Sizes:** sm 11px/16px at 14px type (nav); md 16px/24px at 15px (forms); lg 17px/28px at 16 to 17px (hero, section CTAs).
- **Acid** (on Bottle): Acid ground, Bottle text, Press edge. The trial CTA everywhere the ground is dark.
- **Bottle** (on Acid or Cream): Bottle ground, Acid text, Press dark edge.
- **Outline Acid / Outline Bottle:** transparent with a 2px inset ring in Acid or Bottle, matching text. The secondary action beside a filled button.
- **Cream** (on Cornflower): Cream ground, Cornflower text, Press edge. Defined for enterprise surfaces.
- **Hover / Active / Focus:** `translateY(-4px)` over 300ms on the overshoot curve, often with `rotate(-1deg)` to `rotate(-1.5deg)` for the primary and `rotate(1deg)` for the secondary; active returns to 0; disabled sits at 0.6 opacity with no lift. Focus is the global ring: 3px Bottle at 55% with 2px offset, switching to solid Acid inside any `.on-dark` section. A transparent 10px "skirt" is drawn behind any lifted element while hovered so the cursor is not left behind by the lift.

### Chips (vendor category cells)
- **Style:** butted cells in a `gap-px` grid whose ground is Ink at 0.20, so the grout is the hairline. Cream cell, Bottle text, Instrument Sans 600 at 15px, 56px tall, left-aligned.
- **State:** hover lifts 2px and floods Acid; selected inverts to Bottle with Acid text and a Press dark edge. The trailing cell ("More at sign-up") is Cream sunken with a label-mono line. Contact topic chips are the smaller cousin: 1.5px Bottle inset ring, 14px type, selected fills Bottle.

### Cards / Containers
There are no cards. The three container patterns are:
- **Ledger row:** a full-width row between Ink 0.20 hairlines (Cream 0.20 on Bottle, Bottle 0.30 on Acid), bled past the container by 12 to 24px, that floods Acid and shifts 4px right on hover. Titles inside are Title or Headline size; sub-lines are separated by dashed Ink 0.25 rules.
- **Automation panel:** butted Bottle cells on an Acid 0.25 `gap-px` grout with a Press dark edge, each cell a label-mono When / Then key in Acid beside 13px Cream copy, a Cream 0.6 11px footnote cell below; the whole panel `swap`s when the category changes.
- **Capture frame:** a 2px square border in Bottle (light grounds) or Acid (Bottle), App ground behind the image, followed 12px below by a label-mono caption with a 10px accent square in front of it, at 0.8 opacity. The hero carries no capture; its bottom band is the board (below).
Form panels on Contact are Acid or Cream blocks with a 2px Bottle inset ring and 32 to 44px padding.

### Inputs / Fields
- **Style:** Acid wash ground, 1.5px Bottle inset ring, no border, square, Instrument Sans at 17px, 16px/18px padding, placeholder Ink at 0.65. Labels are the eyebrow utility at 0.7 opacity, 10px above the field.
- **Focus:** the global focus ring only (3px Bottle 55%, 2px offset); the field itself does not change.
- **Error:** a separate Coral wash panel with a 1.5px Coral inset ring and 14px Ink copy. Disabled buttons drop to 0.6 opacity.
- **Toggle (billing interval):** a two-cell fieldset inside a 2px Acid ring; the on cell fills Acid with Bottle text, the off cell is transparent Acid text that tints Acid 0.15 on hover. 200ms colour transition, no lift.

### Navigation
- **Bar:** sticky, Bottle on every page, Acid text, 14px vertical padding, 24/40px gutters. Wordmark left at 22/26px; links right in label-mono at 10px/0.16em with underline on hover (Product targets `#stage-enquiry`, the first stage, not the hero); "Log in" as a link; a small Acid trial button. A 2px Acid line along the bottom scales from the left with scroll progress.
- **Phone:** below 768px the links collapse behind a label-mono "Menu / Close" toggle into a Bottle drawer under an Acid 0.20 hairline, links at 11px with 12px vertical padding, trial button full width. Escape closes it.
- **Footer:** Bottle, four columns (1.7fr then three 1fr) with label-mono column heads in Acid 0.7, 15px Cream 0.7 links that turn Acid on hover, then a Cream 0.15 hairline bar carrying the wordmark at 18px and three label-mono facts.

### Stage rail (signature)
The board's column headers, one element with two states. It starts on the hero's foot, at the fold, and is sticky under the nav for the length of the five stages. Five butted Acid cells across the full container, divided by inset 1px Bottle 0.25 rules, each with its label-mono index (hidden on phones) and stage name at 12/15px 600 (short name on phones).
- **Tall** (72px cells on phones, 96px from 640px, while it sits at the fold): under the name a label-mono sub-line in Bottle 0.7 carries the chosen category's own name for the stage, led by an 8px square in the stage's accent (Bottle where the accent is Acid); below 640px the name is hidden and the square alone marks the stage. The hero board's card stacks stand on these cells, so the headers sit at the fold where a board's headers belong; the sub-lines `swap` when the category changes. No cell is active while the hero is on screen.
- **Compact** (52px cells, once stuck under the nav): the sub-lines fold away (`grid-template-rows` 1fr to 0fr with opacity, 300ms on the overshoot curve) while the cell's min-height, colour and transform transition on the same curve. The cell whose stage is under the reader inverts to Bottle with Acid text and takes a 4px inset bottom edge in that stage's accent; the others lift 2px and tint Bottle 0.10 on hover.
Both stuck and active are decided on scroll (stuck when the rail's top meets the nav; active from the stage's top edge crossing the rail's bottom), so the squash and the hand-off are exact.

### Hero board (signature)
The kanban standing on its headers: the hero's bottom band, drawn in the brand's own squares rather than a capture. Two label-mono lines sit above it, "Your board · {category}" in Acid on the left (it `swap`s with the category) and "One job per card · illustrative" in Cream 0.55 on the right, because the book is invented. Below, five columns on the rail's own grid. Each column is the category's count for that stage in Bricolage 800 (clamp(22px, 3vw, 32px), tabular, Acid) above a bottom-aligned stack of cards: one per job, capped at 12 visible (the count above is always the truth), each a full-width block up to 72px wide, 9px tall (11px from 640px), 4px apart, in the stage's accent (Cornflower, Lilac, Acid, Coral, Acid); the top card at full opacity, the rest at 0.85. Cards deal in with the one-shot `flip` from an `origin-bottom`, staggered 28ms from the bottom card up, and the grid is keyed on the category so choosing another re-deals every stack.

### Category slab (signature)
The vendor category is a button inside the h1: an Acid block at headline size with a Press edge, 0.2em side padding, Bottle text, animating its width between names. Left alone it flips to the next category every 2.6s (a 0.34s one-shot `flip`, squashing on the way in), stops while hovered, open or off screen, and holds for 30s after a touch. Clicking opens a portalled two-column listbox on Bottle ink (Acid 0.25 grout) of label-mono options, selected in Acid. Choosing a category re-deals the hero board and reskins the tall rail's sub-lines, the vendor chips and the automation example.

### Reveal and ambient motion
Blocks enter with a 320ms overshoot fade from 4px below, at 12% visibility, staggered no more than 0.04s apart. Each section carries one small square on a 3.2 to 3.5s loop (`drop`, `tilt`, `squash`, `wob`, `pop`, in stage order) and nothing else moves ambiently. Data swaps inside a panel or the rail's sub-lines use `swap` (0.28s, 7px) not an entrance; in-place value changes use `flip`, and the hero board's cards deal in on `flip` staggered 28ms a card. Nothing blinks. `prefers-reduced-motion` collapses every animation and transition to 0.01ms and stops the slab cycle.

### Browser surfaces
The scrollbar on fine pointers is a 10px square Bottle thumb (inset -3px edge, Bottle deep on hover, Bottle ink active) in a Cream sunken channel with an Ink 0.24 hairline on its left; on the Bottle-flooded /bio page the channel inverts to Bottle ink with an Acid thumb. Text selection is Acid with Bottle text.

## Do's and Don'ts

### Do:
- **Do** flood the whole section with one ground and pick the next ground so it differs from both neighbours (The No Two Alike Rule).
- **Do** set every Bricolage headline at 800, hard left, -0.04em, with a `max-w` of 16 to 22ch and `text-balance`.
- **Do** give filled buttons a Press edge (`inset 0 -4px 0 rgb(11 64 48 / 0.4)`, or Press dark on Bottle) and lift them 4px on `cubic-bezier(.34,1.8,.45,1)` over 300ms.
- **Do** draw outlines and panel rings as inset box-shadows in Bottle or Acid, 1px for hairline rings, 1.5px for fields, 2px for outline buttons.
- **Do** build lists as hairline ledgers (Ink 0.20 rules, rows that flood Acid on hover) rather than as cards.
- **Do** use butted `gap-px` cells on a low-alpha ground for any set of equal choices (rail, chips, toggle, category list, automation panel).
- **Do** keep Martian Mono uppercase at 9 to 11px and use it for indices, captions, column heads and form labels.
- **Do** give each stage or section one accent square (16 to 28px) and one ambient loop, and put every hairline in Ink, Cream or Acid at low alpha.
- **Do** frame product captures in a 2px square border, App ground, with a label-mono caption and accent mark below.
- **Do** draw invented data in the brand's own squares (a Bricolage count above a stack of accent blocks) and label it illustrative; a real screen is a capture, never a mock.
- **Do** switch focus rings to Acid inside any section marked `.on-dark`.

### Don't:
- **Don't** use Sprout (#9fe870) anywhere in marketing markup; it lives only inside product captures.
- **Don't** add a border-radius on any marketing surface; the only permitted circles are illustration badges such as the recording dot.
- **Don't** cast blurred drop shadows, gradients, glassmorphism or soft rounded cards.
- **Don't** use grey for rules or borders; hairlines are Ink at 0.15 to 0.25, or Cream / Acid at 0.15 to 0.25 on Bottle.
- **Don't** set Bricolage at any weight other than 800, or use it for body copy.
- **Don't** run Martian Mono as body copy, at more than 11px, or as a kicker above a home page headline.
- **Don't** put Cream body copy on plain Cornflower or Coral; step to Cornflower deep, or carry Bottle ink on Coral.
- **Don't** use slow or cinematic motion: nothing longer than 320ms for a transition, no reveal larger than 4px, no stagger beyond 0.04s.
- **Don't** import an icon set or use emoji; the two stroke icons in use (16px plus, 14px outbound arrow) are inline SVG with square caps.
- **Don't** redraw the wordmark: the A has no crossbar and a flat top, and the viewBox top edge at y=372 is what makes it flat.
