---
name: Arbour marketing site
description: The site for the wedding industry CRM, drawn in the console's own register as one ruled sheet.
colors:
  bottle: "#0b4030"
  bottle-ink: "#052117"
  bottle-wash: "#e9f1eb"
  sprout: "#9fe870"
  sprout-ink: "#2a5a1d"
  sprout-wash: "#eafadd"
  cornflower: "#4e6df5"
  cornflower-ink: "#2438a8"
  cornflower-wash: "#e7ebfe"
  lilac: "#b9a7ff"
  coral: "#ff4438"
  coral-ink: "#9e1d14"
  coral-wash: "#ffe5e2"
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
  close:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1rem + 5.4vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.9
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
  page-title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 0.95
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
  article-body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  article-intro:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.65
  ui:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
  mono-eyebrow:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  mono-label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.5625rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  tiny: "2px"
  small: "4px"
  base: "6px"
  dot: "9999px"
spacing:
  gutter-phone: "20px"
  gutter-tablet: "32px"
  gutter-desktop: "48px"
  row-top-phone: "64px"
  row-top: "96px"
  row-foot-phone: "40px"
  row-foot: "48px"
  cell: "40px"
  sheet-max: "1280px"
  nav-gap: "12px"
  nav-height: "56px"
  strip-height: "48px"
components:
  button-sprout:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.bottle}"
    typography: "{typography.body}"
    rounded: "{rounded.base}"
    height: "48px"
    padding: "0 22px"
  button-primary:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.on-dark}"
    typography: "{typography.ui}"
    rounded: "{rounded.base}"
    height: "40px"
    padding: "0 16px"
  button-secondary:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.base}"
    height: "40px"
    padding: "0 16px"
  button-secondary-hover:
    backgroundColor: "{colors.panel}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bottle}"
    rounded: "{rounded.base}"
    height: "36px"
    padding: "0 14px"
  button-ghost-hover:
    backgroundColor: "{colors.panel}"
  button-on-dark:
    backgroundColor: "rgba(244, 244, 240, 0.1)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.base}"
    height: "40px"
    padding: "0 16px"
  input-field:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.base}"
    height: "44px"
    padding: "0 14px"
  nav-bar:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.base}"
    height: "{spacing.nav-height}"
  nav-link-current:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.small}"
    height: "36px"
  stage-strip:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.base}"
    height: "{spacing.strip-height}"
  stage-chip-current:
    backgroundColor: "{colors.bottle}"
    textColor: "{colors.on-dark}"
    typography: "{typography.mono-eyebrow}"
    rounded: "{rounded.small}"
  badge-enterprise:
    backgroundColor: "{colors.cornflower-wash}"
    textColor: "{colors.cornflower-ink}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.small}"
    padding: "6px 8px"
  claim-pointing:
    backgroundColor: "{colors.sprout-wash}"
    padding: "24px 32px"
  capture-cell:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.base}"
    padding: "32px"
  segmented-thumb:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.small}"
    padding: "8px 14px"
---

# Design System: Arbour marketing site

## Overview

**Creative North Star: "The Ruled Sheet"**

The site is one printed run sheet, nav to footer, set in the console's own register. Every section is a full-bleed row whose top rule crosses the window; inside it the sheet is a single column whose two side rules run unbroken from the top of the window to the foot of the page, with a small ink registration cross wherever a row rule meets a column rule. Cells butt against each other inside that column and draw their own hairlines, so a claim always sits in a cell beside the real console screen that proves it.

The register is the software's, deliberately. White page, grey-green Panel cells, near-black Ink, Bottle for structure and one lit Sprout action per view. Corners are 6px, buttons carry a letterpress bottom edge, and only floating chrome casts a shadow. A visitor should finish the page thinking "that is my console", because the tokens here are the console kit's own (arbour/packages/ui/src/styles/globals.css) and the site only adds what a long marketing page needs: fluid display steps, the ruled sheet, the stage strip and the capture frame.

The world refuses the feature-card grid and the retired marketing look (Acid, Cream floods, square corners, the Acid stage rail). Colour arrives in whole rows or cells, never as tinted cards on white.

**Key Characteristics:**
- One continuous ruled column, 1280px maximum, with registration marks at every crossing.
- White by default; Panel for sunken cells; Bottle only for the close.
- Bricolage 800 hard left at fluid sizes, with optical size doing the tightening.
- Martian Mono as a small uppercase label voice: captions, field labels, indices, block heads.
- Real screens as proof, with claims that point at measured regions of them.
- 6px corners, letterpress depth on content, blur only on floating chrome.

## Colors

A neutral console palette with one structural green, one lit green, and status colours that never decorate.

### Primary
- **Bottle** (`{colors.bottle}`): structure. The default solid button, the current nav link, the current stage chip, stage numbers, the pressed crosshair, the Arby mark square, and the Bottle band that floods the close and the footer.
- **Bottle Ink** (`{colors.bottle-ink}`): hover on Bottle text links.
- **Bottle Wash** (`{colors.bottle-wash}`): the ground for Arby placements that need one.

### Secondary
- **Sprout** (`{colors.sprout}`): the one lit thing. The trial button, the reading-progress line under the nav, passed stage dots and their joining hairlines, the playing caption leaf, and the rings round claim regions on a capture.
- **Sprout Ink** (`{colors.sprout-ink}`): check marks in plan feature lists and text on Sprout Wash.
- **Sprout Wash** (`{colors.sprout-wash}`): the console's selected-row wash; a claim cell while it points, a success badge, text selection.

### Tertiary
- **Cornflower** (`{colors.cornflower}`), **Cornflower Ink** and **Wash**: enterprise and info. The House plan's Enterprise badge, info badges in the Needs you fragment, a category leaf.
- **Lilac** (`{colors.lilac}`): a category leaf; tentative state in illustrative product fragments.
- **Coral** (`{colors.coral}`), **Coral Ink**, **Coral Wash**: danger only. Form errors and overdue badges.
- **Ochre Ink** and **Ochre Wash** (`{colors.ochre-wash}`): warning badges only.

### Neutral
- **Page** (`{colors.page}`): the ground everywhere, and the raised plan cells inside the Panel band.
- **Panel** (`{colors.panel}`): sunken cells (the capture cell, the hero pipeline cell), the pricing band, segmented tracks, hover on secondary and ghost controls. **Panel Hover** (`{colors.panel-hover}`) is hover on Panel and the segmented track.
- **Line** (`{colors.line}`): the opaque hairline. Every rule, divider and the sheet's column rules.
- **Track** (`{colors.track}`): idle leaves and dots.
- **Ink** (`{colors.ink}`), **Ink Secondary** (`{colors.ink-secondary}`), **Ink Muted** (`{colors.ink-muted}`), **Ink Faint** (`{colors.ink-faint}`): text, body under a title, mono labels and meta, placeholders and unpassed stage dots.
- **On Dark** (`{colors.on-dark}`): text on Bottle, at full strength for headlines and 60 to 75% for body and labels.
- **Borders** (`{colors.border-default}`, `{colors.border-input}`, `{colors.border-input-hover}`): translucent Ink, never a grey hex. Default frames captures and panels; input frames fields and secondary buttons.
- **Mark** (`{colors.mark}`): the registration crosses on white rows.
- **Focus** (`{colors.focus}`): the focus outline. Bottle at 55%, where the kit uses 30%, because the lighter ring falls under 3:1 on white.

### Named Rules
**The One Lit Action Rule.** Sprout marks the single thing to do next in any view: the trial button. Every other button is Bottle, secondary or ghost. Two Sprout buttons in one view means there is no headline action.

**The Status Is Not Decoration Rule.** Coral and Ochre speak only for danger and warning. Category leaves use Bottle, Sprout, Cornflower and Lilac only.

**The Bottle Close Rule.** The Bottle band is reserved for the close: the final call to action and the footer under it. Inside a Bottle band the rules turn On Dark at 14%, the marks On Dark at 60%, and the focus ring Sprout at 70%.

**The One Panel Band Rule.** Pricing is the one full Panel band on the home page. Elsewhere Panel lives in cells, not rows.

**The No Acid, No Cream Rule.** Acid and Cream are print and social colours. Neither appears on a screen; Acid survives only as the A on the app icon.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui), loaded with its `opsz` axis.
**Body Font:** Instrument Sans (with ui-sans-serif, system-ui).
**Label/Mono Font:** Martian Mono (with ui-monospace).

**Character:** A heavy, slightly quirky grotesque that the optical size axis tightens at display sizes, over a plain, even sans for reading, with a wide mono doing the small print of a run sheet.

### Hierarchy
- **Statement** (800, `{typography.statement}`, 0.85): one per page, sized to hold one line from a laptop up.
- **Hero** (800, `{typography.hero}`, 0.92): the home h1 only, with the vendor category set inside it as a live select.
- **Readout** (800, `{typography.readout}`, 0.85): the number that matters, for example the plan price. Tabular figures.
- **Close** (800, `{typography.close}`, 0.9): the last headline on a Bottle band, on the home and about pages.
- **Headline** (800, `{typography.headline}`, 0.95): section heads, held to 16 to 18ch.
- **Stage** (800, `{typography.stage}`, 0.95): stage titles and the Bottle stage numbers beside them.
- **Page title / Section / Title** (800, 32px, 24px, 20px): plan names, legal headings and footer lines, panel and card titles.
- **Lead** (400, 17px, 1.5; 19px from 640px in the hero): the paragraph under a headline, held to 44 to 52ch.
- **Body** (400, 15px, 1.5): all reading text and claim bodies, held to 40 to 68ch. Claim labels are body at 600.
- **UI** (600, 14px, 1.4): buttons, nav links, chips, fields.
- **Mono eyebrow** (11px, +0.14em, uppercase): stage names in the strip, legal section indices, the head of a console block such as "Needs you".
- **Mono label** (9px, +0.16em, uppercase): captions under captures, field labels, meta under prices and buttons, plan limits.
- **Article body / Intro** (400, `{typography.article-body}` / `{typography.article-intro}`): long-form reading, capped at 70ch. Body uses Ink secondary; the opening paragraphs use Ink. Paragraph gaps are 20px.

### Named Rules
**The Eight Hundred Rule.** Bricolage is set at 800 and nothing else, with no added letter spacing and balanced wrapping. The `opsz` axis does the tightening.

**The Label Voice Rule.** Mono is always uppercase and always small. It captions, labels fields, indexes and heads the console's blocks. It never sits above a heading as a kicker and never carries a sentence of body copy.

**The Numbers Are Display Rule.** Prices, counts and stage numbers are Bricolage 800, never body.

## Layout

The page is a stack of full-bleed rows. Each row's top rule runs the window's width; the sheet inside is `min(100% - 1.5rem, 80rem)` on a phone, `- 3rem` from 640px and `- 5rem` from 1024px, with its own left and right rules. The floating nav and the stage strip share the sheet's width so the column rules carry straight through them. The first row drops its top rule and its marks and starts under the nav.

Inside a row, a heading block sits on a 12-column grid (headline across 7, supporting copy across 5, aligned to the foot), then a cell rule, then butted cells. Cells draw their own top or left hairline so any cell can carry its own ground: stacked on a phone, two by two from 640px, three or four across from 1024px.

Rhythm: gutters 20, 32 and 48px by breakpoint; a row head opens 64px from the rule on a phone and 96px from 640px, and closes 40 or 48px above the cell rule; cells pad 32 to 40px vertically. Nothing is centred by default. Headlines sit hard left, and the stage rows swap the recording and its claims from side to side (recording across 8 columns, claims across 4).

On a desktop the recording sticks in view beside a claim column taller than it. On a phone the claims stack under the recording, and the capture shows its close-up.

Rows develop as they scroll in: content is fully visible by default, and where scroll timelines exist and motion is allowed, a row rises 14px from 18% opacity over a stretch of its cover range, with cells staggered by `--develop-at`, and the row's top rule draws in from the left. A row that sits at the fold on load keeps its rule still.

Article reading keeps the sheet and its rules, with a contents rail beside a single prose column. Below 1024px the contents become a native, initially collapsed details control above the text. The desktop rail is 15rem, increasing to 18rem from 1280px, and sticks below the floating nav. Sections open after 48px on phones and 56px from 640px. A short takeaway block precedes the intro; captioned figures follow the sections they explain, with 40px vertical margins. These are Read-mode patterns; the Articles composition is recorded in its surface brief.

## Elevation & Depth

Content is flat and pressed, never lifted. Depth on content comes from letterpress: an inset bottom edge on solid buttons and an inset hairline on fields and sunken controls. Only floating chrome may blur: the nav bar, the stage strip while stuck, the category menu and the Arby Help panel.

### Shadow Vocabulary
- **Letterpress button** (`box-shadow: inset 0 -4px 0 rgba(11, 64, 48, 0.4)`): Bottle and Sprout buttons, and the selected category chip.
- **Inset panel** (`box-shadow: inset 0 0 0 1px rgba(23, 33, 27, 0.1)`): the category select field in the hero.
- **Thumb** (`box-shadow: 0 1px 2px rgba(23, 33, 27, 0.28)`): the chosen segment of a segmented control.
- **Lifted** (`box-shadow: 0 10px 28px rgba(23, 33, 27, 0.13), 0 2px 5px rgba(23, 33, 27, 0.07)`): floating chrome only.

### Named Rules
**The Lift Is For Chrome Rule.** A blurred shadow means the object floats over the page. Content cells, captures and plan cells never cast one; they sit in the sheet.

**The Lift On Hover Rule.** Solid buttons rise 3px on the overshoot curve, with a 6px hover bridge under them so the cursor never drops off mid-lift, and settle back on press.

## Shapes

One small radius scale, borrowed whole from the kit. 6px for buttons, fields, captures, the nav bar, the stage strip, menus and panels; 4px for small controls (nav links, stage chips, badges, menu items, segments, the crosshair button); 2px for leaves. Every larger Tailwind radius maps back to 6px. Circles are kept for status and stage dots only. The ruled sheet itself is square: rules and cells have no corners. The registration mark is a 13px hairline cross.

## Components

### Buttons
Pressed letterpress, lifting on the overshoot.
- **Shape:** 6px corners.
- **Sprout (the trial):** Sprout ground, Bottle text, 48px tall at 22px padding with 15px semibold text. One per view.
- **Primary:** Bottle ground, On Dark text. The default solid button.
- **Secondary:** white with an input-strength border; hover darkens the border and floods Panel.
- **Ghost:** no box, Bottle text, Panel on hover. "Log in" in the nav.
- **On dark:** On Dark at 10% with a 40% border, for secondary actions on a Bottle band.
- **Sizes:** 36px (dense, 14px padding), 40px (UI, 16px), 48px (body, 22px).
- **Hover / Focus:** colours ease out over 180ms; the lift uses the overshoot at 260ms. Focus is the 3px Bottle 55% outline, offset 1px, composing with the letterpress edge. Disabled is 45% opacity.

### Chips
- **Style:** 40px, 6px corners, UI text, a 7px leaf in front. Unselected sits on white with an input border.
- **State:** selected turns Bottle with the letterpress edge, a Sprout leaf and a check. A dashed-border mono chip ends the list as "and more".

### Cards / Containers
- **Corner Style:** square inside the sheet; 6px on captures and floating panels.
- **Background:** Page, or Panel for a sunken cell.
- **Shadow Strategy:** none on content (see Elevation & Depth).
- **Border:** the cell's own Line hairline; captures use Border default.
- **Internal Padding:** 20/32/48px gutters, 32 to 40px vertical.

### Inputs / Fields
- **Style:** white, input-strength border, 6px corners, 44px tall, 14px horizontal padding, UI text. Mono label above.
- **Focus:** the border turns Bottle with a 3px Bottle 30% halo, the kit's field treatment. Hover darkens the border.
- **Error:** a Coral Wash block with a Coral border at 40% and Coral Ink text.

### Navigation
The console's floating bar, moved to the top of the window: fixed 12px from the top, the sheet's width, white, a Line border, 6px corners and the lifted shadow, 56px tall. The wordmark sits left; links are 14px semibold Ink secondary, Panel on hover, and the current page is a Bottle 4px chip. A 2px Sprout line along its foot fills with reading progress. Below 1024px the links fold into a Menu button that opens a ruled list inside the bar.

### Segmented Control
A Panel Hover track with 3px gaps and 4px padding; the chosen segment is white with the thumb shadow. Used for the billing interval, where the price flips in place on change.

### Signature Component: the Stage Strip
The booking header's progress, lifted from the console. A 48px white bar with 6px corners that sits at the head of stage 01 and sticks under the nav through the five stages, gaining the lifted shadow only while stuck. Five mono eyebrow stage names, each behind a dot, joined by hairlines. Passed stages fill their dot Sprout (with a bloom) and their following hairline Sprout over 320ms on the glide; the current stage sits in a Bottle chip; unpassed dots are Ink faint rings. On a phone only the current name shows.

### Signature Component: the Capture Frame
A real console screen at 16:10 inside a 6px frame with a Border default hairline, held in a Panel cell. Under it a mono label caption ("Screen recording, seed data") with a 7px leaf that turns Sprout while the recording plays. Recordings play only on screen, in a front tab, with motion allowed; otherwise the poster holds the box. When a claim points, the frame holds the poster, rings each measured region in a 2px Sprout ring over Sprout at 15%, and glides in on them up to 2.4 times over 320ms. Below 640px the frame shows a close-up shaped to the stage's focus region, a highlight re-frames that close-up instead of zooming, and a "Whole screen" button opens it out.

### Signature Component: the Claim Cell
Four claims beside each recording, each a ruled cell: a 600 body label, a body paragraph, and, where the screen can show it, a 28px crosshair button. Hovering the claim or focusing the crosshair points it; pressing pins it (the crosshair turns Bottle). A pointing claim takes Sprout Wash. A claim the screen cannot show has no crosshair.

### Signature Component: the Category Select
The hero's category word is a select at headline size: the field skin (Panel inside the inset hairline, 6px corners) with a chevron at 0.34em, its width animating on the overshoot between names and each name flipping in. It opens the kit's menu surface (white, Line border, lifted shadow, 4px items, a mono label head). It cycles every 2.6 seconds while on screen and untouched.

### Arby Help Panel
Floating chrome drawn like the console's Arby sheet: white, Line border, 6px corners, lifted shadow, a 40px Bottle square mark beside a 20px Bricolage title, starter questions as bordered 44px rows, the reader's words in a Panel bubble and replies as plain text. The send button is Bottle and goes flat to Panel when there is nothing to send. No Sprout anywhere in it.

### Article rows
A story is a ruled row with one link and one keyboard stop. A 3:2 photo or actual product cover sits beside a Bricolage title and small mono reading time; collection headings supply the category. The thumbnail is 88px on phones, 160px from 640px and 208px from 1024px, with 4px corners. Description and arrow appear from 640px. Hover and keyboard focus put Panel behind the row; hover turns the title Bottle and moves the arrow. Reduced motion removes the arrow transform. The same row serves the collection and related reading.

### Article reading
The contents use ordinary section anchors, small Instrument Sans links and a mono block heading on desktop. On phones a Bottle summary opens the native details control. Sources are a ruled numbered list; inline citations are small Bottle links to the matching source. Body links stay underlined. Neither the prose nor the contents casts a shadow. The article typography and paragraph gaps above preserve the reading rhythm across every story.

The takeaway block is Panel with the inset hairline, 6px corners, 20px padding on phones and 24px from 640px. Its Bricolage heading sits over a 15px list with 12px item gaps; 32px separates it from the intro. Figure headings use Bricolage, with plain-text captions below. Real product captures stay unfiltered. Photography alone uses the Bottle colour treatment and carries credit. Article media never uses AI-generated raster images.

HTML/CSS figures use real text, Bottle ink, Panel grounds and ruled divisions. Processes are ordered lists; comparison tables retain row and column headings in a keyboard-focusable horizontal scroll region. Charts show text values, begin bars at zero and link measured data to sources. Captions state whether a figure is measured, forecast or an example. Keep product demonstrations visibly distinct from research results; never imitate a product screen in CSS.

Screenshot figures have a 6px frame with a translucent Ink border. Shared profiles may show labelled pairs or stacks of genuine extracts, with separate layouts below and above 640px. A figure's explicit focus takes precedence over the shared profile. Every crop uses the unchanged source; its alternative text combines the figure title and the selected detail. A native details control with a Panel summary reveals the original full screen; the summary changes to Show close-up while open. A separate full-size image link and demonstration-data label sit beneath the frame. Screens without a preview retain the original view.

## Do's and Don'ts

### Do:
- **Do** put every new section in a ruled row inside the sheet, so the column rules and registration marks stay continuous from nav to footer.
- **Do** set a claim in a cell beside the real screen that proves it, and give it measured regions when the screen can show it.
- **Do** keep one Sprout action per view; make every other button Bottle, secondary or ghost.
- **Do** set headlines in Bricolage 800 hard left with no added tracking, using the fluid steps (stage, headline, readout, hero, statement).
- **Do** use mono labels to caption, to label fields, to index and to head a console block.
- **Do** use 6px corners, 4px for small controls, 2px for leaves.
- **Do** use the 3px Bottle 55% focus outline on white and the Sprout 70% outline on Bottle.
- **Do** let motion pop on the overshoot (`cubic-bezier(0.34, 1.8, 0.45, 1)`, 260ms) and slide on the glide (`cubic-bezier(0.16, 0.84, 0.36, 1)`, 180 to 320ms), and keep content visible when motion is reduced.

### Don't:
- **Don't** build a feature-card grid or flood a mid-page section with colour; the Bottle band is the close and Pricing is the one Panel band.
- **Don't** put Acid or Cream on a screen.
- **Don't** use Coral or Ochre for anything but danger and warning.
- **Don't** set a mono kicker or eyebrow above a heading.
- **Don't** cast a blurred shadow from content; only floating chrome lifts.
- **Don't** use a radius above 6px, a pill, a gradient or glassmorphism.
- **Don't** use a grey hex for a border; borders are translucent Ink and rules are Line.
- **Don't** put Sprout in the Arby Help panel.

### Mobile landing page

Below 640px the hero uses tighter vertical spacing, a dedicated category line sized for every vendor name at 320px, and a full-width trial action above the secondary article link. Its pipeline uses proportional label and bar columns with wrapping stage labels. Below 1024px primary controls, category options, claim crosshairs and stage links have at least 44px touch targets. The stage dock names only the active stage until desktop width; phone connectors shrink so all five links fit. The menu scrolls within short viewports. Desktop composition and product close-ups stay as specified above.
