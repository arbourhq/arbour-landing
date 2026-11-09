---
name: Arbour marketing site
description: The site for the wedding industry's CRM, drawn in the console's own register, with one job bound as a lit 3D book whose pages the scroll turns.
colors:
  bottle: "#0b4030"
  bottle-deep: "#083023"
  bottle-ink: "#052117"
  bottle-wash: "#e9f1eb"
  sprout: "#9fe870"
  sprout-press: "#86d653"
  sprout-ink: "#2a5a1d"
  sprout-wash: "#eafadd"
  coral: "#ff4438"
  coral-ink: "#9e1d14"
  coral-wash: "#ffe5e2"
  cornflower: "#4e6df5"
  cornflower-ink: "#2438a8"
  cornflower-wash: "#e7ebfe"
  lilac: "#b9a7ff"
  lilac-ink: "#4c3a99"
  lilac-wash: "#f1edff"
  ochre: "#dfa023"
  ochre-ink: "#7a5510"
  ochre-wash: "#fbf1d6"
  page: "#ffffff"
  panel: "#f5f6f2"
  panel-hover: "#edeee9"
  line: "#efefec"
  track: "#ddded8"
  ink: "#17211b"
  ink-secondary: "#57574f"
  ink-muted: "#61615a"
  ink-faint: "#6a6a62"
  on-dark: "#f4f4f0"
  border-default: "rgba(23, 33, 27, 0.1)"
  border-soft: "rgba(23, 33, 27, 0.05)"
  border-input: "rgba(23, 33, 27, 0.12)"
  border-input-hover: "rgba(23, 33, 27, 0.28)"
  mark: "rgba(23, 33, 27, 0.5)"
  focus: "rgba(11, 64, 48, 0.55)"
typography:
  statement:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 0.25rem + 8.6vw, 8rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "normal"
  hero:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 0.9rem + 5.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "normal"
  readout:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 1.5rem + 4.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "normal"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.25rem + 2.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "normal"
  stage:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.1rem + 2vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "normal"
  section:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.05
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.05
  lead:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  ui:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  dense:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  eyebrow:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.5625rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  tiny: "2px"
  small: "4px"
  base: "6px"
spacing:
  leaf-inset: "20px"
  leaf-head: "13px 0 11px"
  leaf-foot: "10px 20px 12px"
  plate-stock: "10px 10px 0"
  sheet-gutter-phone: "0.75rem"
  sheet-gutter-tablet: "1.5rem"
  sheet-gutter-desktop: "2.5rem"
  sheet-max: "80rem"
  nav-gap: "12px"
  touch-min: "44px"
components:
  button-sprout:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.bottle}"
    rounded: "{rounded.base}"
    typography: "{typography.body}"
    height: "48px"
    padding: "0 22px"
  button-primary:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.base}"
    typography: "{typography.ui}"
    height: "40px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.bottle-deep}"
  button-secondary:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    typography: "{typography.ui}"
    height: "40px"
    padding: "0 16px"
  button-secondary-hover:
    backgroundColor: "{colors.panel}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bottle}"
    rounded: "{rounded.base}"
    typography: "{typography.ui}"
    height: "40px"
    padding: "0 16px"
  leaf:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
  plate:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.base}"
    padding: "{spacing.plate-stock}"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    typography: "{typography.ui}"
    padding: "0 14px"
  nav-bar:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.base}"
    height: "56px"
  badge:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.small}"
    typography: "{typography.label}"
    padding: "6px 8px"
  stage-chip-active:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.small}"
    typography: "{typography.eyebrow}"
---

# Design System: Arbour marketing site

## Overview

**Creative North Star: "The Book on the Table"**

The site is the console's own register (a white page, Panel cells, Bottle for structure, Sprout for the one thing to do next) with one physical object on it: the job, bound as a book in woven Bottle cloth and lit by a window to the right. The white page is the table. The book drops onto it in the hero, opens, and the reader's scroll turns its leaves from enquiry to paid, one spread per stage, each right-hand page holding a real console screen square-on. At the close the book shuts and goes on the season's pile, spines titled with jobs. Everything around the book is the ruled sheet: hairline column rules, registration marks, Bottle and Panel bands, oversized Bricolage set hard left.

The 3D is lit like a product shot, but every flat thing stays its exact hex. The light is calibrated so a page lying face up takes exactly π (hemisphere plus the key's share at its angle), and nothing is tone mapped, so white stock renders #FFFFFF and a printed screen renders exactly as captured. That is why the screen can hand over to a sharp HTML plate whenever the camera rests, with no seam. Shading, soft Bottle-tinted shadows, cloth sheen and depth of field belong to things that are tilted, turning or not being read.

Density is calm and generous: one idea per row, big type with charged empty paper around it, one accent per view. The scroll is a crank: every turn and claim step is a pure function of scroll position, so scrolling back plays everything backwards exactly. Reduced motion, no hardware WebGL2, a lost context or a low-power phone get the flat page, which carries the same screens and engine-rendered stills of the same book.

**Key Characteristics:**
- One register with the console: white and Panel grounds, Bottle structure, one Sprout action.
- The book is the site's object; the leaf is its flat DOM page.
- Lit 3D, unlit screens: calibrated light, no tone mapping, HTML plate at rest.
- Hairline construction: column rules, registration marks, whole-block colour.
- Bricolage 800 as interface, hard left; Martian Mono only as small uppercase labels.
- Slightly rounded on one scale (6 / 4 / 2px); letterpress depth on content, blur only on floating chrome.

## Colors

A neutral console register with one house colour, one lit accent and a status family that appears only inside real or replicated console UI.

### Primary
- **Bottle** (`bottle`): structure. The default solid button, the nav's trial button, stage numerals, the book's cloth, the active stage chip, whole Bottle bands (final call to action, footer). Hover deepens to **Bottle Deep**; **Bottle Ink** is the deboss on the cover and the deepest press.
- **Bottle Wash** (`bottle-wash`): the ground Arby may stand on, and quiet Bottle badges.

### Secondary
- **Sprout** (`sprout`): the one lit thing. The hero's and final band's Start free trial button, the book's satin ribbon (where the job is), passed-stage dots, the selection ring on a resting screen, the last bar of a pipeline. **Sprout Press** is its pressed state; **Sprout Ink** and **Sprout Wash** carry success text and the flat page's pointed-claim highlight.

### Tertiary
- **Cornflower** (`cornflower`, ink, wash): enterprise. The House plan's Enterprise badge, info states.
- **Coral, Lilac, Ochre** (each with ink and wash): overdue, tentative and warning states inside console replicas (the Needs you block, captured screens). Never section grounds, never decoration.

### Neutral
- **Page** (`page`): the ground everywhere, the table under the book, white stock on every leaf and plate.
- **Panel** (`panel`): sunken cells and Panel bands (pricing), stage frames on the flat page, the category select's box. **Panel Hover** is its hover and the third paper tone.
- **Line** (`line`): the opaque hairline for rules and dividers. **Track** for inactive dots and quiet bars.
- **Ink** (`ink`), **Ink Secondary**, **Ink Muted**, **Ink Faint**: text, descriptions, mono labels, placeholders. **On Dark** for text on Bottle.
- **Translucent borders** (`border-soft`, `border-default`, `border-input`, `border-input-hover`): edges of leaves, cards and fields; never a grey hex.
- **Mark** (`mark`): registration marks where a row's rule crosses a column rule. **Focus** (`focus`): the outline focus ring.

### Named Rules
**The One Sprout Rule.** One Sprout action per view. The hero and the final band each carry the Sprout trial button; the nav's trial button is Bottle; plan buttons are Bottle. Two Sprout buttons in a view means there is no headline action.

**The Exact Hex Rule.** Anything flat stays its hex, in CSS and in the 3D alike. The book's materials are the palette's hexes (palette.ts mirrors globals.css); the canvas is transparent over the page's own white; shadows on the page are Bottle at 0.2 opacity, never grey or black.

**The Whole Block Rule.** Colour arrives edge to edge (a Bottle band, a Panel band, a Panel cell). The band redefines the rule and mark inks so the sheet's construction stays continuous across it.

**The Print-Only Rule.** Acid and Cream never appear on screen. Arby's crest lime is fixed artwork, not a UI colour.

## Typography

**Display Font:** Bricolage Grotesque, 800 only, optical size axis loaded (with ui-sans-serif, system-ui)
**Body Font:** Instrument Sans, 400 and 600 (with ui-sans-serif, system-ui)
**Label/Mono Font:** Martian Mono (with ui-monospace)

**Character:** A heavy, slightly quirky grotesque used as interface, against a plain, even sans for reading and a small tracked mono for the book's small print. The same three faces are printed into the 3D: Bricolage numerals and spine titles, mono running heads, a debossed Bricolage category on the cover.

### Hierarchy
- **Statement** (800, 56 to 128px fluid, 0.85): the single statement moment, "Nothing needs you.", at the close beside the pile. One per page.
- **Hero** (800, 36 to 96px fluid, 0.92): the home h1, hard left, with the category select set inline in a Panel box.
- **Readout** (800, 52 to 96px fluid, 0.85): big numbers (plan prices). Numbers are always Bricolage.
- **Headline** (800, 32 to 56px fluid, 0.95): section heads ("Cheaper than an hour of your time.", "Reasonable questions"). The final Bottle band runs larger, to 88px.
- **Stage** (800, 28 to 44px fluid, 0.95): stage numerals and titles on the flat page. In the book the title scales with the page (`--page-k`), clamped 20 to 44px, and the numeral is printed on the paper instead.
- **Section / Title** (800, 24px and 20px, 1.05): card and leaf titles (plan names), nav wordmark size.
- **Lead** (400, 17px, 1.5): the hero lead and section intros, Ink Secondary.
- **Body** (400 / 600, 15px, 1.5): reading text, claim labels (600) and claim bodies capped near 52ch.
- **UI / Dense** (600 / 400, 14px / 13px, 1.4): controls, nav links, field text, tables.
- **Eyebrow** (mono, 11px, +0.14em, uppercase): stage strip names, panel labels inside console replicas.
- **Label** (mono, 9px, +0.16em, uppercase): small print. Leaf running heads, plate captions ("FIG. 01 · ENQUIRIES · REAL SCREEN, SEED DATA"), price units, meta beside a button ("14 DAYS FREE · NO CARD"), field labels.

### Named Rules
**The 800 Only Rule.** Bricolage is set at 800 with no added letter spacing; the opsz axis does the tightening. No lighter weights, no faux bold.

**The Small Print Rule.** Mono is always uppercase, always 9 or 11px, and always small print: a running head, a caption, a unit, a label. It is never body copy and never a line set above a headline to introduce it.

## Layout

**The ruled sheet.** Every section is a full-bleed row with a 1px top rule. Inside it, the sheet is one column (`min(100% - gutter, 80rem)`, gutters 0.75rem, 1.5rem and 2.5rem a side at phone, 640px and 1024px) whose side rules run unbroken from nav to footer. Where a row's rule crosses a column rule sits a 13px registration cross in Mark ink. Cells inside a row butt and draw their own hairline so each can carry its own ground. Rows develop in on scroll (from 0.18 opacity and 14px down) where scroll timelines exist, and the top rule draws in from the left.

**The story.** On desktop (1024px and up, 3D running) the hero, the five stages and the statement share one transparent canvas, sticky at 100svh behind the rows. Inside the story the sheet's rules and marks step aside so no hairline crosses a page or a screen. Each stage gets a turn spacer (36svh) and a hold of 22svh per claim. Every turn takes a camera breath (pulling back as the leaf goes over). The stage copy is set sticky on the left-hand page, positioned by the engine (`--copy-top`, `--copy-left`, `--copy-width`), with claims stepping open one per stretch of hold. The right-hand page holds the screen.

**The phone band.** Below 1024px the book is a sticky band under the nav, `min((100vw - 16px) × 0.625 + 64px, 40svh)` tall, ruled top and bottom, showing the right-hand page across its width. At rest an HTML plate zooms to the stage's close-up, with Whole screen and Stop controls under the page at full 44px touch size. Stage copy scrolls beneath as ordinary sheet rows.

**Asymmetry.** Big type sits hard left; the hero's closed book sits right and bleeds off the edge; the statement's pile bleeds off the right. Section grids split 5 / 7 (copy / screen) and alternate sides on the flat page. Nothing is centred by default.

**Floating chrome.** The nav floats 12px below the top, matched to the sheet's width. The stage strip docks at the foot of the window while the stages are on screen. Arby's launcher sits bottom right, 52px, rising above the dock.

**Touch.** Every control is at least 44px below 1024px.

## Elevation & Depth

Two systems that never mix. The DOM is flat with letterpress: content is pressed into the page, and only floating chrome casts a blurred shadow. The 3D book is lit for real: a calibrated window key from the right and slightly toward the reader (60% of the light) plus a hemisphere (40%), PCF soft shadows from a 4096px map on desktop (2048px on a phone), a faint room environment (0.2) for reflections, and no tone mapping. Its shadow lands on the page through a Bottle-tinted catcher that fades out a little beyond the book, so nothing it throws reaches the nav or the window's edges.

### Shadow Vocabulary
- **Button letterpress** (`box-shadow: inset 0 -4px 0 rgba(11,64,48,.4)`): the bottom edge of every solid button (Bottle and Sprout) and the active category chip.
- **Panel letterpress** (`box-shadow: inset 0 0 0 1px rgba(23,33,27,.1)`): sunken panels drawn by inset hairline.
- **Lifted** (`box-shadow: 0 10px 28px rgba(23,33,27,.13), 0 2px 5px rgba(23,33,27,.07)`): floating chrome only. The nav bar, the stage strip dock, Arby's launcher and help panel, menus, the plate's Stop control.
- **Modal** (`box-shadow: 0 30px 70px rgba(23,33,27,.3)`): dialogs over a scrim.
- **Thumb** (`box-shadow: 0 1px 2px rgba(23,33,27,.28)`): toggle and slider thumbs.
- **Book shadow** (three.js ShadowMaterial, Bottle at 0.2): the only shadow the 3D casts onto the DOM page.

### Named Rules
**The Lit Object, Unlit Screen Rule.** The book, its cloth, paper, ribbon and arbour are lit, shaded and shadowed. A real console screen is never lit, never tone mapped, never blurred: it sits square-on at real size, and at rest the HTML plate takes over exactly on top of it. No bloom, glow, vignette or glass anywhere.

**The Calibrated Light Rule.** A page lying flat takes exactly π of light. Change the light, the materials or the camera and the flat page must still render #FFFFFF, or the plate handoff shows a seam.

**The Depth of Field Rule.** Bokeh runs on desktop only, and only on shots where no screen is being read: the hero's shut book (strength 0.85, focused mid-cover) and the closing pile (0.6, focused on the job's book on top). Focus is the focus point's view-space depth, never its straight-line distance; aperture is 0.0012 × strength and maxblur 0.012 × strength. Strength is zero on every resting spread.

**The Paper Lifts Rule.** In the DOM, a pointed-at leaf or button lifts 3px toward the reader on the overshoot curve. A state is a position, never a colour wash.

## Shapes

Slightly rounded on one scale: 6px for buttons, inputs, leaves, plates, panels and floating chrome; 4px for small controls (badges, chips, menu items, claim pointers, the selection ring on a screen); 2px for leaves of a pipeline, status dots and bars. Nothing above 6px; pills only for avatars. The book carries the same language at physical scale: boards stand 0.22 units proud of a 16 by 10 page block (the shape of a 16:10 console capture), and the ribbon is a narrow satin strip falling out over the tail. Hairlines are 1px everywhere; dashed borders mark only an empty or add slot.

## Components

### Buttons
Tactile and confident: a solid ground with a pressed bottom edge that lifts on hover.
- **Shape:** gently rounded (6px), Instrument Sans 600, sizes 36 / 40 / 48px tall (sm / md / lg).
- **Sprout:** Sprout ground, Bottle text, letterpress edge. The one headline action (Start free trial, lg in the hero and final band).
- **Primary:** Bottle ground, On Dark text, letterpress edge; hover Bottle Deep. The default solid button (nav trial, plan buttons).
- **Hover / Focus:** lifts 3px on the overshoot curve (260ms) with a 6px hover bridge beneath so the cursor never loses it mid-lift; colours ease plainly at 180ms. Focus is an outline in Focus ink (Sprout-tinted on Bottle bands).
- **Secondary:** white, input-strength border, hover Panel ground and darker border. **Ghost:** no box, Bottle text, Panel on hover. **On Dark:** a translucent On Dark border and wash on Bottle bands.

### Chips and badges
- **Badges:** mono label, 4px corner, a wash ground with its ink (Panel / Ink Secondary for "Illustrative", Cornflower wash / ink for Enterprise, Bottle wash / Bottle).
- **Category chips:** 40px, 6px, bordered; selected is a solid Bottle chip with letterpress and a Sprout dot that blooms in.

### Leaf
The DOM page of the book, and the site's card. White stock, a translucent hairline edge, the 6px corner. A running head in mono small print (label on the outer side, an optional note by the gutter) over a Line hairline, inset 20px; the body; a foot in mono small print with a tabular folio. Pricing plans are leaves with an engine-rendered volume (one book for Solo, a stack for Studio, a taller mixed stack for House) above a hairline. A leaf may lift on hover (3px, border to input-hover); it never fills with colour.

### Plate
A screen tipped in on a page: 10px of white stock round the capture, a hairline edge, 6px corner, and a mono caption under it ("FIG. 06 · REAL SCREEN, SEED DATA · AUTOMATIONS"). Captures carry a Sprout selection ring (2px, 4px corner, 15% Sprout fill) when a claim points at part of the screen. Below 640px a plate crops to the stage's close-up, with Whole screen to undo it. Product frames never scroll.

### Inputs / Fields
- **Style:** white, input-strength border, 6px, 14px UI text, 14px side padding, mono label above.
- **Focus:** border goes Bottle with a 3px Bottle ring at 0.3. Hover darkens the border to input-hover. Editable controls rise to 16px under 640px so iOS does not zoom.

### Navigation
A floating white bar (56px, 6px, Line hairline, lifted shadow) matching the sheet's width, 12px from the top. Wordmark left; links in UI text right; Log in as ghost; Start free trial as a Bottle button. Below 1024px: wordmark, the Bottle trial button and a bordered Menu button, all 44px.

### Stage strip
Floating chrome docked at the foot while the five stages are on screen: mono eyebrow names joined by hairlines. Passed stages get a Sprout dot, the current one a solid Bottle chip, the rest a hollow ring. It lifts in on the overshoot and glides away. On a phone only the current name shows.

### The Book (signature)
One job bound in woven Bottle cloth with a sheen, the wordmark foiled at the head of the cover and the visitor's category blind-debossed at its foot (re-pressed when the category select changes). Heavy white stock, Bricolage numerals and mono running heads printed on the left-hand pages (no rule under the head, so nothing crosses the numerals). One Sprout satin ribbon lies on the right-hand page by the gutter and falls over the tail edge, hanging straight down to whatever is below (onto the table, or down the front of the pile once the book is shelved); when that page turns, the page's root lifts the ribbon and tips it up, it slips toward the fold as the page steepens, and once the page passes upright it drops back onto the new right-hand page and lands soft, with no bounce. Its head stays tucked over the head edge, its tail is always the same length (lifting the ribbon draws the end in), and its width always lies in what carries it, so it never cuts through a page. States are things a book does: shut and dropped in with a settle and a riffle (hero), opened, turned one curling leaf per stage, shut and shelved on the pile. Camera and book are pure functions of scroll; nothing keeps state. At rest the camera is square over the right-hand page and the HTML plate (poster, then the stage's recording, with a Stop control) sharpens in over the printed screen.

### Mini book
The same book, small (4:3), as a secondary page's one 3D moment (About, Contact, Wedding CRM Australia), its cover pressed with a word of that page. It drops in when scrolled into view, leans toward the pointer and riffles under hover. Decorative; reduced motion or no WebGL gets the engine-rendered still.

### Arby launcher
Floating chrome bottom right: 52px white tile, Line hairline, 6px, lifted shadow, Arby standing in it in master colours. Lifts 3px on hover; opens the help panel.

## Do's and Don'ts

### Do:
- **Do** keep every flat surface its exact hex, in CSS and in three.js; the canvas stays transparent over the page's own white.
- **Do** light the book with the calibrated rig (a flat page takes exactly π) and keep tone mapping off, so white stock is #FFFFFF and screens read as captured.
- **Do** hand a resting screen to the HTML plate, square-on and at real size; only the moves between rests are 3D.
- **Do** drive every camera move, page turn and claim step from scroll position alone, so it reverses exactly.
- **Do** use the book's own verbs for state: shut, opened, turned, shelved. In the DOM, lift 3px.
- **Do** keep one Sprout action per view; the nav's trial button stays Bottle.
- **Do** set Bricolage 800 hard left with charged empty paper around it, and print numbers in Bricolage.
- **Do** give the flat page the same screens, and engine-rendered stills of the same book, each raster with a provenance sidecar.
- **Do** keep depth of field to the hero and the pile, desktop only.
- **Do** keep touch targets at 44px below 1024px.

### Don't:
- **Don't** light, shade, tone map, blur or reflect a console screen.
- **Don't** add bloom, glow, vignette, glass or a CSS gradient. Light falling across the book is not a gradient; a CSS gradient is.
- **Don't** tilt a dashboard or float UI in space; screens live on the page.
- **Don't** let a hairline, rule or mark cross a page or a screen inside the story.
- **Don't** wash a leaf, a book or a stage with colour to show state.
- **Don't** put Acid or Cream on screen, or recolour Arby or the wordmark.
- **Don't** round above 6px or cast a blurred shadow from content; blur belongs to floating chrome.
- **Don't** set mono as body copy, or as a kicker line above a headline.
- **Don't** show a resting screen with depth of field, or a screen that scrolls inside its frame.
