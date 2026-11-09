---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/home","src/components/book","src/content"]
---

# Home page (3D redesign: The Book)

Scope: `/`, redesigned 7 November 2026, replacing the Docket Rail (rejected by the user on concept, flat unlit rendering, small and busy composition, and pacing). Home gets the full real-time three.js treatment, fully lit (user decision, 7 Nov 2026: real light, soft shadows, rich materials, depth of field, in the brand palette). About, Pricing, Contact and Wedding CRM get the new look with one lighter 3D moment each; Bio and legal stay simple. Mode: Persuade.

Visitor: a wedding vendor deciding on a 14-day trial; a solo operator on a phone from Instagram, or a studio owner on a laptop comparing CRMs. Job: recognise the console, watch one record carry a job through five stages on real screens, start the trial at `app.usearbour.com/sign-up`. House routes to `/contact`.

Proof: the five stage recordings and posters in `public/product/demos/` and the captures in `public/product/`, labelled real screens with seed data. Illustrative counts say so. No customers, testimonials or usage numbers.

Constraints: brand.md binding except the retired print-flat 3D rule (exact hexes on every flat surface, no gradients in UI, one Sprout button per view, 6px ceiling, letterpress on content, blur only on floating chrome). Screens rest flat, unlit and untone-mapped, at real size, and hand off to HTML at rest; only transitions are 3D. Copy kept word for word unless a change is stated. Category picker still reskins the page. Arby stays a still launcher at the bottom right. Touch targets 44px below 1024px. Reduced motion, no hardware WebGL2 and low-power phones get a complete flat page with the same screens.

Raises kept from declined challengers: the scroll is one crank that drives every turn and reverses exactly (paper automata); a spread's front is its summary and opening unfolds the detail (toy-aisle window boxes; its paper arbour at The day was cut by the user on 8 November 2026); spreads set asymmetrically on charged empty paper, one accent per view (ikebana).

## Direction contract

THESIS: The job is a book whose pages the scroll turns from enquiry to invoice, each spread holding the real screen square-on. Refuses floating UI and tilted dashboards.

OWN-WORLD: White page as table, window light, soft shadows; woven debossed Bottle cloth; curling white stock; one Sprout ribbon; unlit real screens; printed Bricolage numerals.

STORY: My book, my console: one record, five spreads of real screens, shelved when paid. Start the trial.

FIRST VIEWPORT: Nav; h1 hard left with category select; lead; Sprout trial. Right: the closed book, huge, off the edge, shadowed on the page; drops, settles, riffles.

FORM: The Book, fifth of seven, seed 855a21e5. Signature: scroll-turned pages, each lifting the ribbon and laying it back down.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
