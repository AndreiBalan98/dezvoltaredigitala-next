# STATE

> Rewritten at the end of every work block. Written for someone returning after **three weeks**.

**Last updated:** 2026-10-06
**Current milestone:** M2 — Style direction + reference pages (status: building)
**Current spec:** docs/specs/003-style-and-reference-pages.md (approved 2026-10-06)
**Branch:** main

## Where we are
- M0 done: `npm run export:wp` copied 12 posts, 11 pages, the footer and 141 images (25.3 MB) from
  the live WordPress site into `content/` and `public/media/`. Counts match the API.
- M1 built: Next.js 16.3.8 site with header, footer, design tokens and a placeholder page for every
  one of the 23 old URLs (unknown URLs show the 404 page). DoD green locally.
- Live at **https://dezvoltaredigitala-next.vercel.app** — all 23 old URLs return 200, unknown URLs 404,
  `/contact` → 308 → `/contact/`. Vercel deploys every push to `main`. Repo is public (PO decision).

- M2 Part 1 done: two style directions on the same article, at `/stil-a/` ("Clar") and `/stil-b/`
  ("Editorial"). New header (phone "Meniu" button) and footer restyle; article block components in
  `components/article/`, article body in `components/articles/FinantareStocareEnergie.tsx`.

## Next step
PO picks A or B (spec 003, Part 1 gate) → Part 2: delete the preview pages and the losing direction's
CSS/fonts, update PRODUCT.md design rules, build the real article page + calculator (`lib/calculator.ts`
+ parity tests), then PO look-check.

## Why the current approach
- Content is exported once into the repo, so the new site never calls the old server.
- Page-builder HTML is stored raw; cleaning it is M3's job.
- Direction B is switched on by a `.dir-b` marker on the page (`body:has(.dir-b)` in CSS), so one build
  shows both directions with the same components. Temporary — removed in Part 2.

## In progress / committed but unfinished
- M2 Part 2 not started (waits for the PO's pick). Article URL still shows the placeholder.

## Blocked on the human
- **PO: pick direction A or B** — open https://dezvoltaredigitala-next.vercel.app/stil-a/ and
  https://dezvoltaredigitala-next.vercel.app/stil-b/ on phone and laptop; answer "A", "B", or
  "A/B, but with … from the other".

## Decisions made since last review
- Repo stays public (PO decision); PRODUCT.md updated.
- PO direction 2026-10-06: full remake, structure may change, old URLs keep working (open or 308),
  PO picks between two style directions at M2, look-check every milestone, aim: all pages by 7 Oct.
- 12 posts exist, not 10: `/test-2/` and `/bizz-club-botosani/` are also published. All keep their URLs.
- Home page and footer are WordPress theme parts (not in the API); the exporter takes them from the live HTML.
- `/servicii/` has no text of its own on the old site (only a title).
- System font (no web font download). Can change at the M2 look-check.
- Header: Acasă · Servicii · Finanțări nerambursabile · Contact + button "Eligibilitate preliminară" → `/calculator-baterii/`.
- Footer ISO links open the certificate images (ISO/IEC 27001 and ISO/IEC 20000-1 — standard names
  and short labels read from the certificate scans; the old site only said "Suntem certificați ISO"). The certificates
  shown on the old site say "data expirării 18.12.2024", with yearly reviews stamped up to Dec 2025 —
  PO may want to check they are still valid before the demo.
- Tests use Node's built-in runner (no test library added).

## Tried and rejected — don't retry
- Importing on Vercel before the code was pushed: Vercel saved framework "Other" and served only
  `public/` (every page 404, images 200). Fixed by `vercel.json` `"framework": "nextjs"` — keep that file.
- Paginating the WP API by "stop when a page is short" — a missing item crashed with HTTP 400 instead
  of a clear count error. Now uses the `X-WP-TotalPages` header.

## Known debt
- Do not run `npm run dev` in a Claude session: Next 16 detects the agent and appends a block to
  `CLAUDE.md` / creates `AGENTS.md` (outside the closed document set). Use `npm run build && npx next start`.
- `npm install` reports audit warnings from the scaffold's dependencies; not reviewed.
- 25.3 MB of images are in git. Fine for the demo; revisit before production.
