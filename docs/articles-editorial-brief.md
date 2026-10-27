# Articles editorial brief

Audience: Australian wedding vendors who already run a business. The collection balances industry research, practical business guides and software comparisons. Its navigation lives in the footer, never the main navigation.

All articles use the collective byline `Arbour Research Team`. This is an editorial byline, not a claim of independent research or a separate department. The reading page identifies Arbour as the publisher and explains that comparisons include its own product.

## Research and writing

Read `AGENTS.md`, `docs/brand.md`, `src/content/wedding-crm.ts`, `src/content/product.ts`, `src/content/pricing.ts`, `/Users/alexlai/.codex/skills/unslop/SKILL.md`, `/Users/alexlai/.codex/skills/humaniser/SKILL.md` and the humaniser reference before writing. Apply both writing skills to the finished draft.

Research on the web. Prefer primary sources: ABS, government agencies, platform documentation and original research. Industry surveys are useful if their publisher, sample limitations and reference period are explicit. Do not present a survey average as an official Australian population estimate. Distinguish registered marriages from weddings and wedding-business revenue. Do not invent statistics, interviews, customer outcomes or quotes. Forecasts are scenarios, not measured facts. Avoid legal or tax advice; cite official guidance when discussing obligations.

Use facts available as of 28 October 2026. Software features, availability and prices must be checked against current official documentation. Do not invent limitations of competitors or claim that Arbour is universally better. State who each tool suits. Arbour product claims must match the repository. Do not repeat exact Arbour plan prices in articles, link to `/#pricing` instead so the live catalogue stays authoritative.

Write 700 to 1,000 useful words, with 4 to 7 specific sections, concrete workflows and a clear answer to the reader's question. No SEO filler or generic conclusion. Use Australian English, sentence case headings, straight quotes, no em or en dashes, no decorative emoji. Include 3 to 6 directly relevant source pages, with inline numeric citations such as `[1]` next to sourced claims. Paraphrase sources; do not copy passages. Keep quotations to zero unless necessary. At least one natural internal link to an existing product route may use `[label](/path)` syntax. Do not use other markdown syntax inside paragraphs. Bullets are separate array entries.

## Content format

Each agent owns only `src/content/articles/<assigned-slug>.json`. Do not change other files or commit. Write valid JSON with exactly these fields:

```json
{
  "slug": "assigned-slug",
  "title": "Specific title in sentence case",
  "description": "A unique search description, roughly 140 to 160 characters.",
  "category": "Industry research",
  "author": "Arbour Research Team",
  "publishedAt": "2026-10-28",
  "updatedAt": "2026-10-28",
  "intro": ["One or two substantial opening paragraphs."],
  "sections": [
    {
      "id": "specific-heading",
      "heading": "Specific heading",
      "paragraphs": ["Useful paragraphs. A sourced claim. [1]"],
      "bullets": ["Optional practical steps, omit this field if unnecessary."]
    }
  ],
  "sources": [
    {
      "id": 1,
      "title": "Exact source page title",
      "url": "https://primary-source.example/page",
      "publisher": "Named publisher"
    }
  ]
}
```

Categories are exactly `Industry research`, `Business guides`, or `Software comparisons`. Image filenames follow the article slug. Reading time is calculated centrally.

## Maintaining the collection

Article copy lives in `src/content/articles/*.json`. The catalogue and related-reading choices live in `src/content/articles.ts`. Add an explicit import and catalogue entry when adding a story, then give it three relevant related links. Every article should receive a related link from another article.

Visual content lives in `src/content/article-visuals/`, grouped as research, guides and comparisons. The typed catalogue gives each article a genuine photo or product cover, a short takeaway list and three inline figures tied to existing section IDs. Use real Arbour screenshots or documented competitor captures, plus semantic HTML/CSS tables, process diagrams and charts. No AI-generated raster imagery. Keep screenshots unfiltered, caption demonstration data and provide access to the full-size capture. Photographs may use the Bottle colour treatment. Photo credits and licence/source records live alongside the files in `public/images/articles-stock/`; product provenance lives beside the captures in `public/product/`.

Use a real publication date. Change `updatedAt` when the content is materially revised, then recheck the sources. Metadata, the sitemap, reading time and article schema derive from the article and visual catalogues.

Paragraphs support `[label](/internal-path)`, `[label](https://external.example/page)` and numeric source references such as `[1]`. Other Markdown formatting is intentionally unsupported. Keep source IDs unique within an article and match every reference to a source.

Run `bun test`, `bun run typecheck`, `bun run lint`, `bun run format:check` and `bun run build` after changes. The catalogue count test records this initial twenty-article commission, so update it deliberately when expanding the collection. Article discovery stays in the shared footer; do not add it to `NAV_LINKS`.

## Topics and intent

1. `australian-wedding-industry-report` · Industry research · What official marriage data and industry surveys actually tell Australian vendors.
2. `future-of-australian-wedding-industry` · Industry research · Wedding business scenarios for 2026 to 2031, with evidence and uncertainty.
3. `how-to-choose-wedding-crm` · Business guides · A practical trial checklist and buying framework.
4. `arbour-vs-studio-ninja` · Software comparisons · Current, fair comparison for Australian vendors.
5. `arbour-vs-honeybook` · Software comparisons · Australian suitability, geographic availability and workflows.
6. `arbour-vs-dubsado` · Software comparisons · Configurability, delivery and team fit.
7. `move-wedding-business-from-spreadsheets` · Business guides · Safe migration without losing the book.
8. `wedding-photography-crm-workflow` · Business guides · Enquiry through delivery for photographers.
9. `wedding-venue-booking-management` · Business guides · Holds, space allocation, site visits and handover.
10. `marriage-celebrant-booking-workflow` · Business guides · Administrative workflow with official marriage requirements separated from CRM work.
11. `wedding-florist-business-workflow` · Business guides · Quotes, procurement, substitutions and installation.
12. `wedding-planner-client-management` · Business guides · Scope, approvals and multi-supplier coordination.
13. `wedding-enquiry-follow-up` · Business guides · Response and follow-up without invented conversion numbers.
14. `wedding-booking-pipeline-forecast` · Business guides · Define pipeline stages and forecast work honestly.
15. `wedding-business-automation` · Business guides · Useful triggers, conditions, checks and exceptions.
16. `wedding-run-sheet-guide` · Business guides · Build a useful versioned run sheet with responsibilities and buffers.
17. `wedding-client-portal-guide` · Business guides · A practical client portal and approval workflow.
18. `wedding-deposits-and-payment-schedules` · Business guides · Operational payment schedules with careful consumer-law context.
19. `ai-for-wedding-businesses` · Industry research · Useful AI work, privacy and review boundaries.
20. `wedding-seasonality-australia` · Industry research · Read seasonality and regional variation to plan capacity.

## Design contract

Read mode inside the existing Arbour design system. The index opens with a hard-left Articles heading and purpose, followed by one large lead story and a compact ruled list of the remaining stories. Category anchors provide simple navigation without client-side filtering or query URL duplicates. Each row has a real photograph or product capture, category, title, description and reading time. Avoid a repeated card grid.

Article pages use the existing nav, ruled sheet and footer. The first viewport establishes title, description, byline, date and a real photograph or product capture. The reading area has a narrow contents rail, a short takeaway block and a comfortable text measure. Three section-specific figures break up each article: actual product screens, source-backed comparisons, workflows or data charts. Captions explain what each visual demonstrates. Sources, publisher disclosure, related articles and a restrained product link finish the page. Articles render on the server and remain usable without JavaScript. No article links in the top navigation. No change to the established visual identity.

Diagrams use Bottle ink on Panel with the site's type and rules. Labels and numerical values remain real HTML text. State whether a figure is a measured result, a forecast or a hypothetical example, and link factual figures to the article's sources. Do not imitate a product screen in CSS or pass sample business figures off as industry research.
