# ROADMAP

Status: `todo` → `spec` → `building` → `review` → `done`, plus `cancelled`. One milestone at a time.
Direction changes are edits to this file in a `docs:` commit — never decided in chat only.
Level I0 until the demo: Claude commits and pushes to `main`; Vercel deploys each push.
**One look-check by the PO after M2** (design is taste — the only thing a machine can't check).

## M0 — Export everything · status: todo · ~20 min
**Outcome:** `scripts/export-wp.mjs` pulls all posts, pages and media from
`https://dezvoltaredigitala.ro/wp-json/wp/v2/` into `content/` and `public/media/`.
**Definition of Done:**
- [ ] post and page counts equal the API's `X-WP-Total` headers (printed by the script)
- [ ] every image referenced by any post or page is downloaded; script lists any that failed
- [ ] `content/inventory.md`-style summary is printed to the terminal (slug, title, date, type) — not a new doc
- [ ] if content is missing or broken: stop and tell the PO before M1

## M1 — Setup · status: todo · ~45 min
**Outcome:** empty Next.js site with header, footer and design tokens, live on Vercel.
**Definition of Done:**
- [ ] `.gitignore` committed before `npm install`
- [ ] `.claude/dod-commands`: `npm run lint`, `npm run build`, `npm run check:routes`
      (every exported slug has a page) and `npm test` — each proven able to fail once
- [ ] **HUMAN TASK:** PO imports the GitHub repo on vercel.com (3 clicks, written in STATE.md); preview URL works
**Out of scope:** any page content.

## M2 — The reference: article template + calculator · status: todo · ~1.5 h
**Outcome:** `/finantare-sisteme-stocare-energie/` and `/calculator-baterii/` look like the PO's
article, made of reusable components (fact card, action block, score split, icon row, help box).
**Definition of Done:**
- [ ] calculator logic ported unchanged into its own module, with tests: 5 fixed inputs give the
      same score / AFM / own-contribution as the live calculator
- [ ] both pages pass at 375px and 1280px (screenshots in the PR/commit evidence)
- [ ] **PO LOOK-CHECK** on the Vercel URL: approve the look, or say what to change. Nothing else starts before this.

## M3 — All pages · status: todo · ~2 h
**Outcome:** every URL in PRODUCT.md's MVP list renders with the approved look.
**Definition of Done:**
- [ ] older articles: page-builder HTML cleaned into the article template (text and facts kept, emoji
      and builder leftovers removed); the list of cuts goes into STATE.md for the PO
- [ ] home, `/finantari-nerambursabile/`, 4 service pages, contact, legal pages, 404
- [ ] `npm run check:routes` green: no old URL missing

## M4 — Demo ready · status: todo · ~45 min
**Outcome:** the PO can present from his phone and laptop without surprises.
**Definition of Done:**
- [ ] Lighthouse mobile on the article page: Performance ≥ 90, Accessibility ≥ 95 (numbers in STATE.md)
- [ ] link check: no broken internal links
- [ ] STATE.md has a 5-step demo script (which pages to show, in which order) and the open questions

## After the demo (not now)
Promote I0 → I1 (branches + PRs), contact form, production hosting decision, domain switch with the
old site kept as fallback, delete `/test-3/`-style slugs with redirects.