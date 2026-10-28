---
version: 1
slug: "src-app-articles-page-tsx"
primary_target: "src/app/articles/page.tsx"
related_targets: ["src/app/articles/[slug]/page.tsx", "src/components/articles"]
---

# Articles

Scope: `/articles` and `/articles/[slug]`, media revision 28 October 2026. Mode: Read. Readers are Australian wedding vendors who already run a business and want evidence, a practical workflow or a fair software comparison. The existing Arbour world remains binding in `docs/brand.md` and `DESIGN.md`.

Job: find a useful story, understand its answer, inspect its sources and choose a relevant next read. Discovery lives in the shared footer. Articles do not join the top navigation.

## Direction contract

THESIS: A reading collection inside The Ruled Sheet. A genuine photograph or product cover introduces the lead story; compact ruled rows organise the rest. Takeaways and section-specific figures give long articles a useful reading rhythm.

OWN-WORLD: White page, Panel grounds, Bottle ink, Line rules and registration marks. Bricolage 800 headings, Instrument Sans prose, small uppercase Martian Mono metadata. Bottle colour treatment belongs to photographs; product screens remain unfiltered. HTML/CSS figures use the site's type and rules. Keep the established corner scale, flat content and restrained product link.

STORY: Answer an experienced vendor's question with a clear argument, useful steps and named evidence. Official statistics, industry surveys and forecasts remain distinct. The publisher is visible.

FIRST VIEWPORT: The index opens with the hard-left Articles heading, purpose and category anchors, then the large lead story. An article header establishes title, description, genuine photo or product capture, category, reading time, linked byline and publication date. An updated date appears only when it differs from the publication date.

FORM: One lead story, then category-grouped ruled lists. The reading page pairs a narrow contents rail with a comfortable prose measure. Three takeaways precede the opening paragraphs; three captioned figures follow the sections they explain. Sources, publisher disclosure, three chosen related stories and a quiet product link finish the page.

FINISH: The media revision completed a fresh full review in `.impeccable/review/articles-media-finish-review.md`. Its one screenshot-framing finding was corrected across all five affected presets. The reviewer scored that fix list resolved and returned `ship` in `.impeccable/review/articles-media-verdict.md`; that verdict is limited to the listed fixes.

## Implemented behaviour

- The initial catalogue has 20 articles across Industry research, Business guides and Software comparisons. Editorial order in `src/content/articles.ts` selects the lead. The remaining 19 stories sit beneath category headings; native category anchors avoid client-side filters and duplicate query URLs.
- Each list row has one full-row link and one keyboard stop. Its photo or product thumbnail, title and reading time remain on a phone. Description and arrow appear from 640px. Collection headings supply the category.
- Reading prose is capped at 70ch. Body is 17px at 1.75 line height; the opening paragraphs are 20px at 1.65. Paragraphs have 20px gaps. Section spacing is 48px on phones and 56px from 640px.
- A pressed Panel block opens the text with three takeaways. Its 15px list has 12px item gaps, 20px padding on phones and 24px from 640px, then 32px separation before the intro. Figures sit after their assigned sections with 40px vertical margins, a Bricolage heading and a plain-text caption. The media explains the adjoining text.
- Below 1024px, contents use a native, initially collapsed details control. Desktop contents occupy a 15rem rail, widening to 18rem from 1280px, and stick below the floating navigation. All contents links are document anchors, including Sources.
- Inline numbered citations link to the ruled source list. The list records source title and publisher, followed by Arbour's publisher disclosure. Related reading contains three editorially chosen stories and reuses the same article row.
- Both routes and their article components render on the server. Article text, category navigation, sources and native contents remain usable without JavaScript.

## Content and assets

Copy lives in `src/content/articles/*.json`; catalogue order, categories and related choices live in `src/content/articles.ts`. `src/content/article-visuals.ts` combines the typed research, guide and comparison catalogues in `src/content/article-visuals/`. These supply the covers, takeaways and figures tied to existing section IDs. Reading time, metadata, sitemap entries and article schema derive from the article and visual catalogues. `docs/articles-editorial-brief.md` records the writing and maintenance contract.

`Arbour Research Team` is a collective editorial byline. It does not imply separate staff or independent research. Arbour identifies itself as publisher and explains that comparisons include its own product.

No AI-generated raster imagery. Each article has a genuine stock photograph or actual product cover, three takeaways and three inline figures. The current 60 figure placements comprise 40 real screenshots, one source-linked bar chart, ten ordered processes and nine tables. Labels and numerical values remain HTML text. Captions distinguish measured evidence, forecasts and examples; factual figures link to the article's sources. CSS figures never imitate product screens.

The three stock photographs and their credit, licence and source sidecars live in `public/images/articles-stock/`. Photos use a Bottle ground with luminosity blending and greyscale; product images keep their actual colours and fit within the cover frame. Non-compact covers show photo credit or the demonstration-data label, with linked photo credit on the reading page. Existing real console captures remain in `public/product/`; seven additional captures and their provenance sidecars live in `public/product/articles/`, including the genuine Dubsado export capture. Large covers use descriptive alternative text; repeated list thumbnails are decorative within the story link.

Tables retain semantic column and row headings inside a keyboard-focusable horizontal scroll region. Processes are ordered lists. The bar chart starts at zero and includes text values and a source link. Figures use Panel, Bottle, the existing corner scale and inset depth.

Screenshot figures use `article-screenshot.tsx` and the shared profiles in `article-screenshot-crops.ts`. Known screens may show labelled pairs or stacks of genuine extracts, with separate selections below and above 640px. A figure-specific focus overrides the shared profile and uses that selected crop at both sizes. CSS crops the unchanged source; crop alternative text derives from the figure title and the selected part. A native details control switches between Show full screen and Show close-up. Captures without a configured preview display the original. Every screenshot figure also offers a full-size image link and a demonstration-data label. The controls work without JavaScript.

## Documentation evidence

The values above come from the current route templates, article components and visual catalogue. They are source-derived values, not a new computed-style measurement. The full review and fix-list verdict above record the evidence and their respective verification limits.
