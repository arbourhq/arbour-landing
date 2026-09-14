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
