# STATE

> Rewritten at the end of every work block. Written for someone returning after **three weeks**.

**Last updated:** 2026-10-06
**Current milestone:** M1 — Setup (status: review — waiting for the Vercel HUMAN TASK)
**Current spec:** docs/specs/002-setup.md (M0 spec 001 is done)
**Branch:** main

## Where we are
- M0 done: `npm run export:wp` copied 12 posts, 11 pages, the footer and 141 images (25.3 MB) from
  the live WordPress site into `content/` and `public/media/`. Counts match the API.
- M1 built: Next.js 16.3.8 site with header, footer, design tokens and a placeholder page for every
  one of the 23 old URLs (unknown URLs show the 404 page). DoD green locally.
- Pushed to GitHub `main` (public repo, PO decision 2026-10-06).

## Next step
1. PO does HUMAN TASK 2 (find the real Vercel address). Claude checks it, marks M1 done.
2. M2 under the new direction (PRODUCT.md / ROADMAP.md, commit a2a3f3c): write spec 003 → PO approves
   → two style directions on the energy-storage article → PO picks → build article + calculator.

## Why the current approach
- Content is exported once into the repo, so the new site never calls the old server.
- Page-builder HTML is stored raw; cleaning it is M3's job.

## In progress / committed but unfinished
- M1 is committed but not verified on Vercel yet.

## Blocked on the human
- **HUMAN TASK 1 — Import on Vercel:** done by PO 2026-10-06. Deploys succeed (GitHub shows
  "Deployment has completed" for 9338ea4), but `https://dezvoltaredigitala-next.vercel.app` answers
  Vercel's own `NOT_FOUND` — that name is not attached to the project. The per-deployment URLs
  (`…-new-world-orders-projects.vercel.app`) exist but sit behind Vercel login.
- **HUMAN TASK 2 — Find the real public address:**
  1. Open https://vercel.com/new-world-orders-projects/dezvoltaredigitala-next
  2. In the **Production Deployment** box, find **Domains**. Copy every address listed there.
  3. Also note the word next to **Status** (should be **Ready**).
  - **Done looks like:** you paste the address(es) + the status word to Claude.
  - **What Claude does with it:** opens the address; if it still fails, gives the one setting to change.

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
- Paginating the WP API by "stop when a page is short" — a missing item crashed with HTTP 400 instead
  of a clear count error. Now uses the `X-WP-TotalPages` header.

## Known debt
- Do not run `npm run dev` in a Claude session: Next 16 detects the agent and appends a block to
  `CLAUDE.md` / creates `AGENTS.md` (outside the closed document set). Use `npm run build && npx next start`.
- `npm install` reports audit warnings from the scaffold's dependencies; not reviewed.
- 25.3 MB of images are in git. Fine for the demo; revisit before production.
