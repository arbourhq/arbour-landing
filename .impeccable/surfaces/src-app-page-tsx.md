---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/home","src/content"]
---

# Home page (product register redesign)

Scope: `/`, the launched marketing home, redesigned 26 October 2026 into the console's own register. Mode: Persuade. Visitor: a wedding vendor deciding whether to start a 14-day trial; a solo operator on a phone from the Instagram bio, or a studio owner on a laptop comparing against the CRM they pay for.

Job: recognise the console they would use, see the real screens doing each stage on one record, and start the trial (no card) at `app.usearbour.com/sign-up`. House routes to `/contact`.

Proof: the five stage recordings in `public/product/demos/` and the captures in `public/product/`, labelled as real screens with seed data. Code-drawn fragments (pipeline board, needs-you rail, automation rule) are illustrative and say so. No customers, testimonials or usage numbers.

Constraints: the user kept the copy word for word and the Arby scroll companion; the category picker and the five-stage layout were released for rework. "Pick yours and the page follows" stays true, so a category choice still reskins the page. brand.md binding as rewritten for the product register.

## Direction contract

THESIS: One ruled sheet, nav to footer, in the console's own register: every claim sits in a cell beside the screen that proves it. Refuses the feature-card grid and the old colour floods.

OWN-WORLD: White page, Panel cells, Line rules with registration marks at crossings; Bottle structure, one Sprout action; Bricolage 800 hard left, mono indices; 6px corners, letterpress buttons, lift only on floating chrome.

STORY: "That is my console." Real screens run every stage on one record. Start the trial.

FIRST VIEWPORT: Floating nav. h1 hard left at 96px, category as an inline select; lead; Sprout trial button; live pipeline fragment right; stage 01 row at the fold.

FORM: The Ruled Sheet, sixth of seven. Seed d7ddbaa4. Signature: the booking header's stage strip sticks through the stages, dots filling Sprout.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Mobile refinement, 28 October 2026

Preserve the desktop composition and all copy. Below 640px the hero has less
vertical padding, its category occupies a dedicated line at a size that fits
every name at 320px, and the full-width trial action precedes the secondary
article link. Its pipeline uses proportional label and bar columns, a narrow
count column, and wrapping labels rather than truncation.

Below 1024px controls have at least 44px touch targets. The stage dock names
only the active stage and keeps every stage directly accessible; phone
connectors shrink to fit. The mobile menu scrolls within short viewports.
Product close-ups and their whole-screen controls remain unchanged.
