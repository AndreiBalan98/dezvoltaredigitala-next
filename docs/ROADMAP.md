# ROADMAP

Status: `todo` → `spec` → `building` → `review` → `done`, plus `cancelled`. One milestone at a time.
Direction changes are edits to this file in a `docs:` commit — never decided in chat only.
Level I0 until the demo: Claude commits and pushes to `main`; Vercel deploys each push.
**PO look-check at the end of every milestone from M2 on** (PO, 6 Oct 2026: "consult me at every
milestone"): Claude posts the Vercel URL + screenshots; the PO approves or says what to change.
Nothing in the next milestone starts before that yes. Goal: all pages remade by the demo (7 Oct) —
PO chose this knowing it leaves fewer approval rounds; most-visited pages go first.

## M0 — Export everything · status: done · ~20 min
**Outcome:** `scripts/export-wp.mjs` pulls all posts, pages and media from
`https://dezvoltaredigitala.ro/wp-json/wp/v2/` into `content/` and `public/media/`.
**Definition of Done:**
- [x] post and page counts equal the API's `X-WP-Total` headers (printed by the script)
- [x] every image referenced by any post or page is downloaded; script lists any that failed
- [x] `content/inventory.md`-style summary is printed to the terminal (slug, title, date, type) — not a new doc
- [x] if content is missing or broken: stop and tell the PO before M1

## M1 — Setup · status: done · ~45 min
**Outcome:** empty Next.js site with header, footer and design tokens, live on Vercel.
**Definition of Done:**
- [x] `.gitignore` committed before `npm install`
- [x] `.claude/dod-commands`: `npm run lint`, `npm run build`, `npm run check:routes`
      (every exported slug has a page) and `npm test` — each proven able to fail once
- [x] **HUMAN TASK:** PO imports the GitHub repo on vercel.com (3 clicks, written in STATE.md); preview URL works
**Out of scope:** any page content.

## M2 — Style direction + the reference pages · status: done · ~2 h
**Outcome:** (a) two distinct style directions applied to the same article page, PO picks one;
(b) `/finantare-sisteme-stocare-energie/` and `/calculator-baterii/` built in the chosen style from
reusable components, with a new header and footer.
**Definition of Done:**
- [x] **PO PICKS A DIRECTION** (B "Editorial", 2026-10-06) from two variants (screenshots at 375px and 1280px); the choice replaces
      the colour/type lines in PRODUCT.md
- [x] calculator logic ported unchanged into its own module, with tests: 5 fixed inputs give the
      same score / AFM / own-contribution as the live calculator
- [x] both pages pass at 375px and 1280px (screenshots in the PR/commit evidence)
- [x] **PO LOOK-CHECK** on the Vercel URL: approve the look, or say what to change. Nothing else starts before this. (PO: "top, keep going like this", 2026-10-06)

## M3 — All pages · status: done · ~2 h
**Outcome:** every URL in PRODUCT.md's MVP list renders with the approved look; structure may change
(e.g. merged service pages), old URLs redirect where a page moved.
**Definition of Done:**
- [x] older articles: page-builder HTML cleaned into the article template (text and facts kept, emoji
      and builder leftovers removed); the list of cuts goes into STATE.md for the PO
- [x] home, `/finantari-nerambursabile/`, 4 service pages, contact, legal pages, 404
- [x] `npm run check:routes` green: every old URL is built or has a redirect
- [x] **PO LOOK-CHECK** on the Vercel URL (home, a service page, the funding list at minimum) (PO: "go on, its ok", 2026-10-06)

## M4 — Demo ready · status: review · ~45 min
**Outcome:** the PO can present from his phone and laptop without surprises.
**Definition of Done:**
- [x] Lighthouse mobile on the article page: Performance ≥ 90, Accessibility ≥ 95 (numbers in STATE.md) (92 / 96)
- [x] link check: no broken internal links (`npm run check:links`, in the DoD)
- [ ] **PO LOOK-CHECK** on phone and laptop: final yes for the demo
- [x] STATE.md has a 5-step demo script (which pages to show, in which order) and the open questions

## After the demo (not now)
Promote I0 → I1 (branches + PRs), contact form, production hosting decision, domain switch with the
old site kept as fallback, delete `/test-3/`-style slugs with redirects.