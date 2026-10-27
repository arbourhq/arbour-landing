# arbour-landing

Landing page for **Arbour** — the CRM for wedding professionals.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `bun run dev`       | Start the dev server (Turbopack) |
| `bun run build`     | Production build                 |
| `bun run start`     | Serve the production build       |
| `bun run lint`      | ESLint                           |
| `bun run typecheck` | TypeScript, no emit              |

## Structure

```
src/app/
  layout.tsx    # root layout, fonts, metadata
  page.tsx      # home page (placeholder)
  globals.css   # Tailwind + theme tokens
```

## Search visibility

Canonical URLs, search metadata, robots rules and the sitemap use the production
`www` host. The Australian wedding CRM page is at `/wedding-crm-australia`.
Structured data uses the same product facts, FAQs and prices as the visible site.

See [docs/seo.md](docs/seo.md) for Google and Bing verification, sitemap submission,
AI crawler access and measurement. After starting the production server, check the
initial HTML with `node scripts/check-seo.mjs http://localhost:3100`.

## Arby Help

Click Arby on the home page to open support chat. The same bird
lands on the panel, stays through scrolling and resizing, then returns to page
perches when it closes. Reduced motion uses a still bird. Closing keeps the
conversation in memory until navigation or refresh; **New chat** clears it.

Add `ANTHROPIC_API_KEY` to `.env.local` and the hosting environment. The
server-only `/api/arby-help` route calls the Anthropic Messages API with
`claude-haiku-5-5` at low effort. No key is shipped to the browser. Without a
key, the panel offers retry and contact links rather than fabricated replies.

Answers use the same content as the public pages: product explanations, FAQs,
pricing, vendor examples, founders, company history, contact details, social
links, terms and privacy policy. Uncertain or undocumented answers explicitly
refer visitors to Contact us or the support email. Arby Help has no access to
visitor accounts or actions. Keep the shared content current when the product changes. Messages are sent to OpenAI only when the visitor asks a
question. This app does not persist chat transcripts.

`bun run test:arby-help` checks validation, provider configuration, errors and
rate limits. `bun run test:arby` checks the companion's flight geometry. The
server has a per-process backstop of 12 requests per client and 60 total per
minute. Production hosting should overwrite forwarded IP headers and enforce
a shared rate limit across instances for `/api/arby-help`.

## Product recordings

Each of the five landing-page stages uses one full-width animated
WebP recording of the seeded local Arbour app. Static posters load first, and
remain in place for reduced motion, hidden tabs and offscreen frames. Stop demo
returns to the poster; Play demo restarts the recording.

To refresh them, keep the local Arbour stack running and its fixture users seeded.
The script uses Playwright and the sign-in helpers from the sibling `../arbour`
checkout, plus `img2webp` (from `libwebp`). It runs under Node and only
accepts a local host and a Clerk test instance. It never saves or sends a quote,
changes a pipeline stage or submits a client form.

```bash
bun run capture:demos
# Or refresh selected frames:
bun run capture:demos quote calendar
# Use a different checkout:
ARBOUR_REPO=/absolute/path/to/arbour bun run capture:demos
```

Recordings, matching posters and capture provenance live in
`public/product/demos/`. The original Playwright PNG frames stay in a printed
temporary directory. Authentication state stays in memory. Captures render a
1440 × 900 viewport at 2× device scale for true 2880 × 1800 recordings, captured
at up to 10 fps and encoded as lossless animated WebP. Update the dimensions in
`src/content/stages.ts` if the viewport changes.
