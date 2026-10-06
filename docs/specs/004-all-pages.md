# Spec 004 — All pages in the Editorial style

**Milestone:** M3 · **Status:** approved (PO, 2026-10-06; diacritics and typo fixes allowed) · **Date:** 2026-10-06

## Goal
Every one of the 23 old URLs shows a real page in the approved Editorial look — no placeholders left.
The older articles keep their facts and wording, without emoji, Facebook images, "fancy" Unicode
letters or page-builder leftovers. The PO gets one list of everything that was cut or changed.

## Not doing
- New copywriting. Facts and wording stay; only the cuts and fixes listed below.
- Merging or moving pages: every URL keeps its own page, so no redirects are needed in M3.
- Contact form, map, search, comments, newsletter (PRODUCT non-goals).
- Lighthouse scores and link check — M4.
- Editing the legal texts (privacy policy, terms): shown exactly as exported.
- New images. Images are only removed (see Approach), never added.

## Approach
**Order (most-visited first):** funding list → home → the 10 older articles → 4 service pages +
`/servicii/` → contact → legal pages → 404.

**Older articles (10 posts).** Rewritten once as TSX bodies with the M2 block components — the same
way as the reference article — plus a few new generic blocks: `Prose` paragraphs, `Steps`
(numbered), `Figure` (image + caption), `Gallery` (event photos); lists reuse `DashList`. Added to the
`ARTICLES` map in `app/[...path]/page.tsx`. Every article ends with the standard `HelpBox`.
Removed everywhere, automatically checked:
- emoji and the Facebook emoji images (`static.xx.fbcdn.net` — loaded from Facebook's servers today);
- "fancy" Unicode bold letters (`𝐀𝐧𝐭𝐫𝐞𝐩𝐫𝐞𝐧𝐨𝐫𝐢` → `Antreprenori`; screen readers cannot read them);
- the "Categorii populare / Postări populare" sidebar copied into every post (the funding list replaces it);
- decorative bullets (`➤`, `•`, `–` at line start) → real lists;
- the old phone `0770 102 495` → `+40 749 589 848` (PRODUCT.md default);
- links to `https://dezvoltaredigitala.ro/...` → the same path on this site.

**Funding list `/finantari-nerambursabile/`.** All 12 posts, newest first: image, date, title, first
sentence. Generated from `content/posts/` (a new post appears automatically).

**Home `/`.** New structure from the existing text: short intro, the 4 services (title + one existing
sentence each, linking to their pages), the 3 newest articles (generated), "Despre noi", contact
block. Sentences on PRODUCT.md's Forbidden list ("soluții digitale inovatoare", "potențialul
nelimitat…") and similar fluff are cut — each one listed.

**Service pages (4) and `/servicii/`.** Rebuilt with the blocks; text, lists and **prices** kept
(e.g. "Site prezentare — de la €400"). The six-icon grids become a plain list with rules
(PRODUCT.md forbids "grids of six icons"). `/servicii/` (no text on the old site) becomes a short
index of the 4 services: title + one existing sentence each.

**Images.** Kept: article featured images, real event/team photos, logos, ISO certificates.
Removed: stock photos of people (e.g. the home page's woman pointing — Forbidden list) and the
decorative SVG icons from the six-icon grids. Each removed image is in the cuts list.

**Contact `/contact/`.** Address, phone, hours (L-V: 8-16), e-mail (typo fixed:
`dezvolatredigitala` → `dezvoltaredigitala`) as large tap-to-call / tap-to-mail links. No form.

**Legal pages.** The exported HTML (clean WordPress core blocks) is shown as is, inside a `Prose`
wrapper; only empty paragraphs are dropped and heading levels are made consecutive (h5 → h2) for
screen readers. Text untouched.

**404.** Restyled; links to home, funding list, calculator.

**The cuts list.** `tests/text-changes.mjs` lists every intentional change as
`{ page, old, new | null, why }`. It is the list the PO reads (also summarised in STATE.md) and the
text test uses it: the test fails if any old sentence is missing from the built page and is not on
the list.

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `components/articles/*.tsx` | new | 10 article bodies |
| `components/article/blocks.tsx`, `article.module.css` | changed | `Prose`, `Steps`, `Figure`, `Gallery`, `Price`/`PriceGrid`, `ServiceAreas`; `DashList` takes rich items |
| `components/article/PageLayout.tsx` | new | frame for non-article pages (label + title, no date/photo) |
| `components/articles/index.ts` | new | registry: URL → body, summary, kicker label, corrected title |
| `components/pages/*.tsx` (+ `pages.module.css`) | new | home, post list, funding list, services index, 4 service pages, contact, legal |
| `app/page.tsx`, `app/[...path]/page.tsx`, `app/not-found.tsx` | changed | real pages; the placeholder branch is deleted |
| `lib/content.ts` | changed | `posts()` newest first, `excerpt` helper, legal HTML normaliser |
| `tests/text-changes.mjs` | new | the cuts / changes list |
| `tests/pages-text.test.mjs` | changed | covers all 22 content pages, honours the cuts list |
| `tests/leftovers.test.mjs` | new | built pages have no builder classes, emoji, fbcdn, old phone, absolute old-site links; every page has real content |
| `docs/STATE.md` | changed | cuts summary for the PO |

No URL changes. No new dependency.

## Touches existing code
- `app/[...path]/page.tsx`: the placeholder branch goes away — every route must have a real body
  (the leftovers test fails on a page with almost no text).
- `tests/pages-text.test.mjs` grows from 2 pages to all content pages.
- The reference article and calculator from M2 are not changed.
- Header button "Eligibilitate preliminară" now goes to `/contact/` instead of the calculator
  (PO decision 2026-10-06: on the old site it opens an application form, not the calculator).

## Test plan
| Case | Type | Expected |
|---|---|---|
| every old sentence is on the new page, or on the cuts list | integration (built HTML) | 0 missing on all 22 pages |
| a cut sentence is not on the list | forced | text test red, names page + sentence — shown once |
| no `eb-`/`stk-`/`uagb`/`wp-block-` classes, no `fbcdn`, no emoji, no `0770 102 495`, no `https://dezvoltaredigitala.ro/` links in any built page | integration | 0 hits |
| leftovers check can fail | forced | put an emoji back in one article → red — shown once |
| funding list order | unit | 12 posts, newest first, first is `/finantare-sisteme-stocare-energie/` |
| all 23 URLs build | integration (`check:routes`) | 23 of 23 |
| 375px and 1280px, keyboard | manual (headless Chrome screenshots) | no sideways scroll; menu and links reachable |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm test
```
End-to-end check: PO look-check on the Vercel URL — home, a service page, the funding list at minimum.

## Assumptions made
- Older articles are hand-converted into TSX (like the reference article), not shown as cleaned HTML:
  page-builder markup is too irregular to clean automatically to the M2 standard.
- No page merges or redirects in M3 (keeps the risk low the day before the demo).
- Non-funding posts (EduWebLab, internship, two BIZZ CLUB events) are labelled "Noutăți" instead of
  "Finanțări nerambursabile" above the title. Titles fixed: "Economia circulară", "Start-Up Nation 2025".
- Links to people's personal Facebook/LinkedIn profiles (with tracking codes) became plain names.
- Kept photos: the C&A Connect building, event photos, the server close-up (no people), portfolio
  screenshots, certificates. Removed: stock photos with people, decorative SVG icons, the logo strip
  under the portfolio (it repeated the portfolio).
- Leftovers check: a page needs ≥ 25 words of content (contact, the shortest, has ~40).
- 2025 funding calls stay, with the date clearly shown and no claim about status (PRODUCT.md default).
- `/test-2/`, `/test-3/`, `/877-2/` keep their URLs (PRODUCT.md default); they are real posts
  ("O nouă provocare profesională!", "BIZZ CLUB", "Alătură-te EduWebLab…"), not duplicates.
- Legal texts are not corrected, even where diacritics are missing (legal wording is not ours to edit).

## Risks
- Volume: ~4.500 words over 18 pages by hand, the day before the demo. Mitigation: most-visited
  first, commit and deploy after each group, so a partial M3 is still demo-able.
- Hand conversion could drop a sentence by accident — the text test catches it.

## Needs a decision from the Product Owner
- [x] Approve this spec. (PO: approved, 2026-10-06)
- [x] (PO: fix them, 2026-10-06) Old texts often miss diacritics or have small typos ("competente", "locui de munca",
      "Cos de produse usor accesibil"). *Recommendation: fix them* (diacritics and obvious typos only,
      every fix on the cuts list) — the site should look professional. Alternative: keep them as they are.
