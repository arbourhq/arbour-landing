---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/home","src/content"]
---

# Home page (launched)

Scope: `/`, the launched marketing home. Mode: Persuade. Visitor: a wedding vendor deciding whether to start a 14-day trial; solo operator on a phone from the Instagram bio, or a studio owner on a laptop comparing against the CRM they pay for.

Job: recognise their own pipeline, see the real console doing each stage, understand it is one record enquiry to invoice, and start the trial (no card) at `app.usearbour.com/sign-up`.

Proof: each stage has one full-width 2880 × 1800 Playwright recording of the seeded local console in `public/product/demos/`, with lossless WebP, a matching poster and capture provenance. Four facts sit beneath each recording; there is no secondary image. Product facts come from `../arbour/apps/web/content/help/*.mdx` and `packages/core/src/plans.ts`. No customers, testimonials, usage numbers or launch-day claims.

Constraints: brand.md binding (Acid sells, Sprout only inside captures, square corners, inset depth, no gradients, no em dashes, Australian English). Category picker stays as the copy device. Every CTA is the trial; House routes to contact.

## Direction contract

THESIS: The page is a pipeline board read top to bottom: five stages the vendor's week already runs on, each a full-bleed colour flood carrying one real console capture. It refuses hero plus three-feature grid plus testimonial.

OWN-WORLD: Bottle, Acid and Cream floods; Cornflower, Lilac and Coral as one accent per stage; Bricolage 800 headlines hard left; Martian Mono stage labels; hairline rules; captures inside a 2px square frame; letterpress buttons; overshoot motion.

STORY: "That is my board." Then: the real product does each stage, on one record. Then: start the trial.

FIRST VIEWPORT: Bottle. Headline in Acid at 96px hard left with the flipping category slab, one lead, one Acid Start free trial button at the largest size on the site with the mono trial facts beside it. Natural height, even rhythm. Straight under it the stage rail: five column headers, 64px, the same rail that sticks; stage 01 starts below.

FORM: The Board, third on my ranked list. Seed key d4e8bfb3. Signature interaction: the rail sits straight under the hero and sticks under the nav through the five stages; the active stage inverts with its accent as an inset edge, hovering a cell lifts it; the category slab reskins the vendor chips and the automation example.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
