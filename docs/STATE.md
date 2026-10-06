# STATE

> Rewritten at the end of every work block. Written for someone returning after **three weeks**.

**Last updated:** 2026-10-06
**Current milestone:** M4b — Three styles with a switcher (status: review — waiting for the PO's look-check);
M4 — Demo ready (built; its final look-check is folded into the same check)
**Current spec:** docs/specs/006-three-styles.md (approved 2026-10-06, PO chose Apple/Linear inspiration)
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
- M4 built: `npm run check:links` (DoD) — 1396 internal links on 24 built pages (incl. preload image links), 0 broken; proven red
  with a link to `/nu-exista/` (1 broken) and a missing logo file (73 broken).
  **Lighthouse 12.8.2, mobile, live Vercel URL, 2026-10-06** (run locally with `npx lighthouse@12` — the
  keyless PageSpeed Insights quota was exhausted; PO approved the fallback):
  | Page | Performance | Accessibility |
  |---|---|---|
  | `/finantare-sisteme-stocare-energie/` (3 runs: 91, 93, 92 → median) | **92** | **96** |
  | `/` | 97 | 96 |
  | `/finantari-nerambursabile/` | 92 | 96 |
  | `/calculator-baterii/` | 100 | 96 |
  | `/contact/` | 96 | 96 |
  The only accessibility finding on every page: links inside paragraphs differ from text by colour
  only (no underline). Not fixed — above the bar; easy follow-up after the demo.

- M4b built (spec 006): **three styles**, switched with three tiny words "Editorial Luminos Nocturn"
  at the top right of the header, home page only (PO: "small, almost unnoticeable"); the choice is remembered on every page (browser storage).
  - **Editorial** — the approved one, still the default; pixel-identical to before (0 differing pixels
    vs the live site, 4 pages × 375/1280 px).
  - **Luminos** — Apple-inspired: white/light grey, Inter font, rounded grey tiles, blue pill buttons,
    centred big titles.
  - **Nocturn** — Linear-inspired: near-black, Inter, hairline-bordered cards, light buttons, indigo links.
  - A link can open a style directly: `/?stil=luminos`, `/?stil=nocturn`, `/?stil=editorial`.
  - How: `<html data-stil>` set by a tiny script in `<head>` before paint (`app/layout.tsx`); tokens in
    `app/globals.css`; per-style rules at the end of each CSS module (`:global([data-stil="…"])`).
    Inter is not preloaded, so it is only downloaded when a new style is active.
  - Check: `tests/styles.test.mjs` (switcher, head-script cases, AA contrast of all 3 styles) — proven
    red by making Luminos grey too light (2.32:1 → 2 failures). 89 tests.
  - Lighthouse after M4b (live, mobile, Editorial, 3 runs: 91, 93, 91): **Performance 91, Accessibility 96**
    — still above the bar (was 92 / 96; the difference is run-to-run noise).

## Demo script (7 Oct) — 5 steps
1. **Laptop, home `/`.** The new look: clean intro, the 3 newest funding articles (they update by
   themselves), the 4 services, ISO certificates and portfolio at the bottom.
2. **Click the newest article** (*Finanțare pentru sisteme de stocare a energiei*). Show that in
   30 seconds you see who it is for, how much money, and the points — that is the site's job.
3. **"Calculează-ți punctajul" link in the article.** Enter one example; show the score and the AFM / own
   contribution. Same results as the old calculator (tested on 5 fixed inputs).
4. **Menu → "Finanțări nerambursabile".** All 12 articles, newest first; open an older one
   (e.g. Start-Up Nation 2025) — same text as before, no emoji or page-builder clutter.
5. **Phone, same article.** Scroll it, then tap the phone number — it starts a call. Mention every
   old address still works, so Google links and Facebook posts keep working after the switch.

## Open questions to raise at the demo
- Phone number: the site shows **+40 749 589 848** everywhere (old pages had 0770 102 495). Confirm.
- ISO certificates in the footer say "data expirării 18.12.2024" (reviews stamped to Dec 2025) — still valid?
- 2025 funding calls (Start-Up Nation 2025, VInnovate 2025…) may be closed; shown with their date, no status claim.
- After the demo: production hosting (Vercel Hobby is non-commercial; Pro ~$20/month), contact form
  service, the "Eligibilitate preliminară" application form, domain switch date, `/877-2/`-style slugs.

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
PO's look-check of the three styles (below). After it: M4 + M4b done → the demo (show the switcher).
After the demo the PO keeps one style; the other two and the switcher are removed (short cleanup). After the demo: promote I0 → I1 and
decide the open questions above.

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
- **PO LOOK-CHECK (M4 + M4b).** Takes ~10 minutes.
  1. On your **laptop**, open https://dezvoltaredigitala-next.vercel.app/ . In the small words at the
     top right, click **Luminos**, then open the newest article and the calculator. Go back to the home page, click
     **Nocturn**, and look at the same two pages.
  2. On your **phone**, do the same, then walk through the 5 demo steps above (step 5: tap the number,
     then hang up).
  3. Read the "Open questions to raise at the demo" list; note anything you want changed first.
  Done looks like: you answer "yes for the demo" (and, if you already know, which style you prefer),
  or name what to change.

## Decisions made since last review
- PO: two more styles, inspired by Apple and Linear (rejected the first proposal "Instituțional/Tehnic");
  switcher on the home page only (2026-10-06). Nocturn is dark by the PO's choice.
- PO: fix diacritics and obvious typos in old texts, each non-diacritic fix listed (2026-10-06).
- PO: header button "Eligibilitate preliminară" → `/contact/` for the demo (2026-10-06). On the old site it
  opens a pop-up application form (company, CUI, funding programme, balance sheet + Certificat
  Constatator upload) — rebuild after the demo together with the form-service decision.
- PO: Lighthouse measured locally with `npx lighthouse@12` after the PageSpeed Insights quota ran out (2026-10-06).
- PO picked direction B "Editorial" (2026-10-06). Fonts Source Serif 4 + Source Sans 3 via `next/font`.
- Kept photos: C&A Connect building, event photos, server close-up (no people), portfolio
  screenshots, ISO certificates, article images.
- Repo stays public (PO decision). 12 posts, all keep their URLs (`/test-2/`, `/test-3/`, `/877-2/` are real posts).
- Home page and footer are WordPress theme parts (not in the API); the exporter took them from the live HTML.
- Footer ISO links open the certificate images. The certificates say "data expirării 18.12.2024", with
  yearly reviews stamped up to Dec 2025 — PO may want to check they are still valid before the demo.
- Tests use Node's built-in runner (no test library added).

## Tried and rejected — don't retry
- PageSpeed Insights API without a key: "Quota exceeded … Queries per day" (the keyless quota is shared
  by everyone). Use `npx -y lighthouse@12 <url> --form-factor=mobile --chrome-flags="--headless=new"`.
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
