# Emporium — Frontend

Marketing site for Emporium, an aviation, hospitality and travel training institute.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · pnpm.

Frontend only — all content is served from typed modules in `src/lib/`. No API calls yet.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` before deploying —
it drives `metadataBase`, canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, split-flap departure board, programs, training, placements, admissions, enquiry |
| `/programs` | All six programs, split into diplomas and certificates |
| `/programs/[slug]` | Program detail — overview, curriculum, outcomes, careers (6 static pages) |
| `/why-emporium` | The six differences, institute principles, alumni stories |
| `/training` | Facilities, what happens in each space, a typical training week |
| `/placements` | Placement-cell support, recruiters, alumni stories |
| `/admissions` | Four-step process, documents, fees, FAQ |
| `/enquire` | Enquiry form and direct contact details |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated metadata routes |

Every page exports complete `metadata` (title, description, keywords, canonical, Open Graph,
Twitter) built by `pageMetadata()` in `src/lib/seo.ts`. Program pages emit `Course` JSON-LD and
`/admissions` emits `FAQPage` JSON-LD.

## Where the content lives

| File | Holds |
| --- | --- |
| `src/lib/site.ts` | Institute name, phone, email, address, socials, navigation, disclaimer |
| `src/lib/programs.ts` | The six programs — codes, durations, modules, outcomes, careers |
| `src/lib/content.ts` | Stats, recruiters, pillars, facilities, stories, admission steps, FAQs |
| `src/lib/seo.ts` | `pageMetadata()` helper |

Editing copy means editing these files — the pages read from them.

## Design system

The visual language lives in `src/app/globals.css`: brand tokens (`--navy`, `--royal`,
`--crimson`, `--paper`, …) followed by the component classes the pages use (`.btn`, `.board`,
`.pass`, `.pillar`, `.story`, `.step`, `.form-card`). The shadcn tokens (`--primary`,
`--background`, …) are mapped onto the same palette, so shadcn primitives sit on-brand.

Fonts: Space Grotesk (headings), Instrument Sans (body), Space Mono (labels, board, code) —
self-hosted through `next/font/google`.

## Connecting the Node backend

The enquiry form is the only place that will need the API. In
`src/components/enquiry-form.tsx`, `handleSubmit` currently simulates a request:

```ts
// TODO: POST to the Node API once the backend is wired up.
// await fetch("/api/enquiries", { method: "POST", body: JSON.stringify(values) })
await new Promise((resolve) => setTimeout(resolve, 600));
```

Replace that with a real `fetch`. Validation, error states, the confirmation
boarding-pass view and the PNR are already in place. For content, swap the imports from
`src/lib/*` for server-side fetches — the page components are already async-ready.
