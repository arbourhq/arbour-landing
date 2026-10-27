# Search visibility

Implemented 28 October 2026. Code changes need deployment before they affect search.

## Targets

Prioritise `Arbour`, `Arbour CRM`, `wedding CRM Australia`, `Australian wedding CRM`
and `wedding CRM`. Generic `CRM` has a much broader audience than Arbour serves.
Measure it separately rather than making it the main content target.

The homepage identifies the brand and product. `/wedding-crm-australia` answers
Australian buying questions with product screens, current plans, migration details
and founder support. Both pages share pricing and FAQ sources with the rest of the
site. Do not add near-identical city or vendor pages just to repeat keywords.

## Deployment and verification

1. Deploy the changes. The production origin is `https://www.usearbour.com`.
   The apex redirects there. Existing apex values in `NEXT_PUBLIC_SITE_URL` are
   normalised to the production origin; custom preview origins remain configurable.
2. Add a Domain property for `usearbour.com` in
   [Google Search Console](https://search.google.com/search-console). Verify with
   the TXT record Google supplies through the DNS provider. This covers the apex,
   `www` and subdomains. The app and portal still need their own indexing controls.
3. If DNS verification is unavailable, add the URL-prefix property
   `https://www.usearbour.com/`. Copy only the HTML verification tag's content into
   `GOOGLE_SITE_VERIFICATION` in the hosting environment and redeploy before verifying.
4. Add the site to [Bing Webmaster Tools](https://www.bing.com/webmasters/).
   Import the verified Google property, or use Bing's HTML verification token in
   `BING_SITE_VERIFICATION` and redeploy.
5. Submit `https://www.usearbour.com/sitemap.xml` in both tools. Inspect `/` and
   `/wedding-crm-australia` in Search Console, check the rendered page, and request
   indexing once. Check that the selected canonical agrees with the declared URL.
6. Check the hosting firewall and bot protection. Public product pages should
   return 200 with text, without a challenge or login, to verified search crawlers.
   Do not turn off security globally or trust a user-agent string as identity.

Verification tokens are optional and never fabricated. The existing Facebook
domain verification tag remains in place. The sitemap excludes `/bio`, which has
its own canonical and `noindex, follow`. `/api/` is excluded from crawling, which
does not replace authentication or other API controls.

## AI discovery

The robots rules allow public pages for all crawlers, including Googlebot, Bingbot,
OAI-SearchBot, Claude-SearchBot and PerplexityBot. Structured data describes the
organisation, website, software, published monthly offers and visible FAQs. It
does not claim reviews, ratings, awards or a guaranteed rich result.

Search access and model training are separate decisions. OpenAI's OAI-SearchBot
controls search discovery; GPTBot is a separate training crawler. The wildcard
rule adds no training restriction. If that preference changes, update it explicitly.
See [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots),
[Anthropic's crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
and [Perplexity's crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

[Google's AI guidance](https://developers.google.com/search/docs/appearance/ai-features)
uses the same crawlability, useful content and indexing foundations as ordinary
search. No special AI text file or special schema is required. Structured data
must agree with the page. FAQ markup describes the content; Google
[retired FAQ rich results in May 2026](https://developers.google.com/search/updates).

There is no setting that makes an assistant recommend Arbour as the best option.
Give it accurate material to cite, then earn independent evidence. Publish real
customer case studies with permission, ask customers for honest software reviews,
and seek coverage from relevant Australian wedding publications. Keep the company
name, website and product description consistent across public profiles. Do not
invent customers, buy ranking links or present an Arbour-written comparison as an
independent review.

## Follow-up content

Write the next page when there is distinct evidence for it. Useful candidates are
a documented Studio Ninja migration walkthrough, a photographer's real booking
workflow, or a venue team's run sheet and permissions setup. Include original
screens, the author's real experience, plan restrictions and links to the relevant
help articles. Verify competitor claims against current primary sources and date
the comparison. Publish customer results only when the customer confirms them.

## Measurement

Record the baseline after verification. Review weekly at first:

- Search Console impressions, clicks, click-through rate and average position,
  filtered to Australia. Separate branded queries from wedding CRM queries.
- Indexing and canonical selection for the homepage and Australian CRM page.
- Bing's [AI Performance report](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
  where available, for citations and cited URLs across supported AI experiences.
- Organic and AI referral visits, plus trials started. The existing attribution
  implementation records campaign touches; it does not prove organic or AI trial
  conversion. A referrer-based acquisition change belongs in the app's shared
  attribution contract too. Do not infer conversions from visits alone.

Compare trends over several weeks, with the same country and query groups.
Personalised manual searches and one-off assistant answers are spot checks, not a
ranking or recommendation guarantee.

## Validation

```sh
bun run typecheck
bun run lint
bun test
bun run format:check
bun run build
bun run start --port 3100
# In another terminal, checks HTTP HTML without running JavaScript:
node scripts/check-seo.mjs http://localhost:3100
# After deployment:
node scripts/check-seo.mjs https://www.usearbour.com
```

For a deliberate custom canonical origin, set `SEO_EXPECTED_ORIGIN` when running
the smoke check. Also validate published URLs with the
[Schema Markup Validator](https://validator.schema.org/) and Google's
[Rich Results Test](https://search.google.com/test/rich-results). The rich result
test can report unsupported or ineligible types even when Schema.org markup is valid.
