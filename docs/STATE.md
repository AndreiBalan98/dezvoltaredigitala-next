# STATE

> Rewritten at the end of every work block. Written for someone returning after **three weeks**.

**Last updated:** 2026-10-06
**Current milestone:** M4 — Demo ready (status: spec — waiting for PO approval)
**Current spec:** docs/specs/005-demo-ready.md (draft)
**Branch:** main

## Where we are
- M0 done: `npm run export:wp` copied 12 posts, 11 pages, the footer and 141 images (25.3 MB) from
  the live WordPress site into `content/` and `public/media/`. Counts match the API.
- M1 done: Next.js 16.3.8 site, a page for every one of the 23 old URLs (unknown URLs → 404).
- M2 done (PO look-check 2026-10-06): style **"Editorial"**; reference article + battery calculator.
- M3 done (PO look-check 2026-10-06: "go on, its ok"): **every old URL is a real page** in the Editorial style — home, funding list, 12 articles,
  `/servicii/` + 4 service pages, contact, 2 legal pages, 404. Live at
  **https://dezvoltaredigitala-next.vercel.app** (Vercel deploys every push to `main`; repo is public).
  - Articles: `components/articles/*.tsx`, registry `components/articles/index.ts` (URL → body, summary,
    label, corrected title). Other pages: `components/pages/*.tsx`. Routing: `app/[...path]/page.tsx`.
  - Checks: `tests/pages-text.test.mjs` (every old sentence kept or listed), `tests/leftovers.test.mjs`
    (no builder classes, emoji, Facebook images, old phone, old-site links, removed images; real
    content on every page), funding-list order. 58 tests + 23/23 routes.

## What was cut or changed (for the PO)
Full list with reasons: `tests/text-changes.mjs` (text) and `REMOVED_IMAGES` in the same file.
- **Everywhere:** emoji and Facebook emoji images; "fancy" bold Unicode letters → normal letters; the
  "Postări populare" sidebar copied into each post; old phone 0770 102 495 → +40 749 589 848;
  diacritics and punctuation fixed; links to people's/companies' Facebook and LinkedIn pages → plain names.
- **Typos fixed:** "locui de munca" → "locuri de muncă" (Start-Up Nation), "erori are pot" → "erori care pot" (Ghidul).
- **Home:** "Transformă-ți afacerea cu soluții digitale ~~inovatoare~~"; removed "Descoperă potențialul
  nelimitat…", the labels "Servicii oferite" and "Cu ce ne lăudăm?", the photo of a woman pointing,
  3 decorative icons and the logo strip; the two fixed article cards → the 3 newest articles (automatic).
- **Service pages:** stock photos of people (8) and the six-icon grids → a plain list of the 6 areas;
  "Citește mai mult / Arată mai puțin" buttons gone (all text shown); "soluții eficiente ~~și inovatoare~~".
- **Contact:** the form (Nume, Telefon, E-mail, Mesaj, "Suport online") — no form for the demo; e-mail typo fixed.
- **Titles:** "Economia circulară", "Start-Up Nation 2025". Non-funding posts are labelled "Noutăți".

## Next step
PO approves spec 005 (M4): link check as a DoD command, Lighthouse via PageSpeed Insights on the
article page (Performance ≥ 90, Accessibility ≥ 95), 5-step demo script, final phone/laptop look-check.

## Why the current approach
- Content is exported once into the repo, so the new site never calls the old server.
- Articles are hand-converted into TSX with shared blocks (page-builder HTML was too irregular to clean
  automatically); legal pages show the exported HTML as is (it was already clean).
- The text test compares old and new text ignoring diacritics, punctuation and case, so a dropped
  sentence fails the build unless it is on the cuts list — the cuts list is the PO's review document.
- `components/RouteHistory.tsx` remembers in-app page visits, because moving between pages inside the
  app does not update `document.referrer` (the calculator's back link needs the previous page).

## In progress / committed but unfinished
- nothing

## Blocked on the human
- **Approve spec 005** (`docs/specs/005-demo-ready.md`) and the PageSpeed Insights question in it.

## Decisions made since last review
- PO: fix diacritics and obvious typos in old texts, each non-diacritic fix listed (2026-10-06).
- PO: header button "Eligibilitate preliminară" → `/contact/` for the demo (2026-10-06). On the old site it
  opens a pop-up application form (company, CUI, funding programme, balance sheet + Certificat
  Constatator upload) — rebuild after the demo together with the form-service decision.
- PO picked direction B "Editorial" (2026-10-06). Fonts Source Serif 4 + Source Sans 3 via `next/font`.
- Kept photos: C&A Connect building, event photos, server close-up (no people), portfolio
  screenshots, ISO certificates, article images.
- Repo stays public (PO decision). 12 posts, all keep their URLs (`/test-2/`, `/test-3/`, `/877-2/` are real posts).
- Home page and footer are WordPress theme parts (not in the API); the exporter took them from the live HTML.
- Footer ISO links open the certificate images. The certificates say "data expirării 18.12.2024", with
  yearly reviews stamped up to Dec 2025 — PO may want to check they are still valid before the demo.
- Tests use Node's built-in runner (no test library added).

## Tried and rejected — don't retry
- Importing on Vercel before the code was pushed: Vercel saved framework "Other" and served only
  `public/` (every page 404, images 200). Fixed by `vercel.json` `"framework": "nextjs"` — keep that file.
- Paginating the WP API by "stop when a page is short" — a missing item crashed with HTTP 400 instead
  of a clear count error. Now uses the `X-WP-TotalPages` header.
- Calculator back link from `document.referrer` alone: wrong after in-app navigation. Use `previousPath()`.

## Known debt
- Do not run `npm run dev` in a Claude session: Next 16 detects the agent and appends a block to
  `CLAUDE.md` / creates `AGENTS.md` (outside the closed document set). Use `npm run build && npx next start`.
- `npm install` reports audit warnings from the scaffold's dependencies; not reviewed.
- 25.3 MB of images are in git (some no longer used after M3). Fine for the demo; clean up before production.
- Featured images have no stored width/height; `ArticleLayout` crops them to a fixed ratio.
- A new WordPress post would need its own body in `components/articles/` (no automatic import).
- `npm test` prints a Node "MODULE_TYPELESS_PACKAGE_JSON" notice (tests import `.ts`); harmless.
