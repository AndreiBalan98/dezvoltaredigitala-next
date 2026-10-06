# STATE

> Rewritten at the end of every work block. Written for someone returning after **three weeks**.

**Last updated:** 2026-10-06
**Current milestone:** M2 — Style direction + reference pages (status: review — waiting for the PO look-check)
**Current spec:** docs/specs/003-style-and-reference-pages.md (approved 2026-10-06)
**Branch:** main

## Where we are
- M0 done: `npm run export:wp` copied 12 posts, 11 pages, the footer and 141 images (25.3 MB) from
  the live WordPress site into `content/` and `public/media/`. Counts match the API.
- M1 done: Next.js 16.3.8 site, a page for every one of the 23 old URLs (unknown URLs → 404).
- Live at **https://dezvoltaredigitala-next.vercel.app** — Vercel deploys every push to `main`. Repo is public.
- M2 built: the PO picked style **"Editorial"** (B) from two previews. The whole site now uses it
  (tokens in `app/globals.css`, rules in PRODUCT.md *Design rules*). Built pages:
  - `/finantare-sisteme-stocare-energie/` — `ArticleLayout` + block components in `components/article/`,
    body in `components/articles/FinantareStocareEnergie.tsx` (text word for word, checked by a test).
  - `/calculator-baterii/` — logic in `lib/calculator.ts` (copied from the live script; a test runs the
    live script's own code on 700 inputs and compares), UI in `components/BatteryCalculator.tsx`.
  - new header (phone "Meniu" button) and footer on every page.
  - The other 21 URLs still show the M1 placeholder (title only) — M3's job.

## Next step
PO look-check of M2 (below). After a yes: M3 — write spec 004 (all remaining pages: home, list,
services, contact, legal, 10 older articles cleaned from page-builder HTML, 404).

## Why the current approach
- Content is exported once into the repo, so the new site never calls the old server.
- Page-builder HTML is stored raw; cleaning it is M3's job.
- Article bodies are written as TSX with block components (not raw HTML), so every article uses the
  same blocks; `ARTICLES` in `app/[...path]/page.tsx` maps a URL to its body.
- `components/RouteHistory.tsx` remembers in-app page visits, because moving between pages inside the
  app does not update `document.referrer` (the calculator's back link needs the previous page).

## In progress / committed but unfinished
- nothing

## Blocked on the human
- **PO LOOK-CHECK (M2).** On your phone and laptop open:
  1. https://dezvoltaredigitala-next.vercel.app/finantare-sisteme-stocare-energie/
  2. Tap **Calculează-ți punctajul**. Tick all 6 boxes, type 15 / 25000 / 10000.
  3. Done looks like: score **57,5 / 100**. Tap **Aplică** → **87,5**. The link at the top says "← Înapoi"
     and goes back to the article.
  4. Answer "approved" or say what to change. M3 does not start before this.

## Decisions made since last review
- PO picked direction B "Editorial" (2026-10-06). Fonts Source Serif 4 + Source Sans 3 via `next/font`
  (PO allowed; no new package, self-hosted at build). Replaces the M1 "system font" decision.
- Calculator page shows its WordPress title "Calculator punctaj baterii" as heading; small markup
  fixes listed in spec 003 *Assumptions*. The phone menu closes after tapping a link.
- Repo stays public (PO decision); PRODUCT.md updated.
- PO direction 2026-10-06: full remake, structure may change, old URLs keep working (open or 308),
  look-check every milestone, aim: all pages by 7 Oct.
- 12 posts exist, not 10: `/test-2/` and `/bizz-club-botosani/` are also published. All keep their URLs.
- Home page and footer are WordPress theme parts (not in the API); the exporter takes them from the live HTML.
- `/servicii/` has no text of its own on the old site (only a title).
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
- Calculator back link from `document.referrer` alone: wrong after in-app navigation (found by the
  spec reviewer). Use `previousPath()` from `components/RouteHistory.tsx`.

## Known debt
- Do not run `npm run dev` in a Claude session: Next 16 detects the agent and appends a block to
  `CLAUDE.md` / creates `AGENTS.md` (outside the closed document set). Use `npm run build && npx next start`.
- `npm install` reports audit warnings from the scaffold's dependencies; not reviewed.
- 25.3 MB of images are in git. Fine for the demo; revisit before production.
- Featured images have no stored width/height (the export doesn't keep them); `ArticleLayout` crops
  them to a fixed ratio (21:9, 4:3 on phones).
