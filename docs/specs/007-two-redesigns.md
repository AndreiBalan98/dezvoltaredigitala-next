# Spec 007 — Two redesigns with their own structure (Apple- and Linear-inspired)

**Milestone:** M4b (replaces the approach of spec 006) · **Status:** approved (PO, 2026-10-06) · **Date:** 2026-10-06

## Goal
The PO can show the site in three *different designs*, not three colour schemes: Editorial (approved,
default), **Luminos** (Apple-inspired) and **Nocturn** (Linear-inspired). The two new ones have their
own header, footer, home page, funding list, article frame and page frame. Same text, same images,
same URLs; the tiny top-right switcher on the home page changes the design for the whole visit.

PO, 6 Oct, on spec 006's result: *"just copies of the first one with different styles … I want two
completely different designs … one may not have header, or might be different, one may have bigger
images, covering the pages."*

## Not doing
- Any change to text, URLs, the calculator's logic or the Editorial design.
- Brand material: no Apple/Linear logos, names, icons, product images or copied text.
- Article bodies are not rewritten per design: the 12 bodies keep their blocks; each design restyles
  them (the frame around them — hero, header, sidebar, navigation — is different).
- Animations on scroll, gradients, glassmorphism, stock photos, emoji.

## Research (apple.com, apple.com/macbook-air, linear.app, linear.app/changelog — 6 Oct)
- **Apple:** a thin centred nav bar; the home page is a stack of **full-width tiles**, each one product:
  centred big headline, one-line subline, two pill buttons, a huge image filling the tile; then a
  2-column grid of tiles edge to edge; product pages start with eyebrow + giant headline + "buy" pill
  bar, then highlight tiles with **giant numbers** (13″ / 15″); tiny grey footer with link columns.
- **Linear:** dark; left-aligned big headline with a short grey subline; a **product window** (the
  app with a sidebar and a list of issues) as the hero image; logo strip; 3 columns separated by thin
  vertical rules with tiny mono labels ("FIG 0.1"); sections as **title left / text right**; the
  changelog is a **timeline: date in a left column with a dot, entry on the right**.

## Approach
**C — Luminos (Apple-inspired)** · light, image-led, centred
- **Nav:** thin 48px bar, logo small on the left, links centred in 13px, no button.
- **Home:** a stack of full-width tiles. Tile 1 = newest funding article: label, giant headline, its
  summary, pills "Află mai mult" + "Calculează-ți punctajul", its image huge under it. Then the next
  articles as a 2-column grid of tiles with their images; then the 4 services as tiles (grey/white
  alternating); then "Despre noi" with the building photo full width; ISO + portfolio as a row of
  screenshots; contact as one big centred line with the phone number.
- **Article:** a sticky local bar under the nav (article short title on the left, "Calculează" pill on
  the right where the article links the calculator); eyebrow + giant centred headline; **full-bleed
  featured image** (edge to edge); body in a narrow centred column; facts/points as big grey tiles.
- **Funding list:** newsroom grid — first article as a large card with a big image, the rest as
  3-column cards (image on top, label, title, date).
- **Pages (services, contact, legal, calculator, 404):** centred giant title + narrow body.
- **Footer:** light grey, tiny 12px text, link columns, legal line.

**D — Nocturn (Linear-inspired)** · dark, app-like, left-aligned — **no top header on desktop**
- **Sidebar:** a fixed left sidebar like an app's: logo, "Acasă", "Finanțări (12)", "Calculator",
  "Servicii" with the 4 services nested, "Contact", phone and e-mail at the bottom. On phones it
  becomes a slim top bar with a "Meniu" button.
- **Home:** left-aligned big headline + grey subline; a **"product window"**: a dark panel that lists
  the funding articles like an issue list (short code, title, label, date); 3 services in columns
  with thin vertical rules and tiny mono labels; each remaining section as title left / text right;
  portfolio as a text-logo strip.
- **Funding list:** changelog **timeline** — date + dot in a left column, title, image and summary on
  the right.
- **Article:** two columns: the body on the left; on the right a sticky **properties panel** (label,
  publish date, "Calculează-ți punctajul", phone, e-mail) like an issue's side panel.
- **Pages:** same two-column frame without the panel where it adds nothing.
- **Footer:** inside the sidebar (company, ANPC/SOL links) plus a small footer line.

**How it is built (static, same URLs)**
- Editorial moves into a route group `app/(editorial)/` (no URL change). The new designs are built as
  their own static page trees: `app/luminos/[[...path]]` and `app/nocturn/[[...path]]` (same
  `generateStaticParams`), each with its own layout, header/sidebar and footer. Those prefixed URLs
  are `noindex`.
- **`proxy.ts`** (Next 16's name for middleware): if the `stil` cookie is `luminos` or `nocturn`, the
  visitor's URL (e.g. `/contact/`) is served from `/luminos/contact/` — the address bar stays
  `/contact/`. `?stil=nocturn` sets the cookie and redirects to the clean URL; `?stil=editorial`
  clears it. No cookie → nothing changes (Editorial). This runs on Vercel's routing layer, included in
  the free plan; no new dependency.
- The switcher (tiny, top right, home page only, in every design) sets the cookie and reloads.
- Spec 006's token/attribute styling is reused only to restyle article blocks inside the new frames;
  its pre-paint script and localStorage are removed (the cookie replaces them).

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `app/(editorial)/…` | moved | current `page.tsx`, `[...path]`, layout with header/footer (URLs unchanged) |
| `app/layout.tsx` | changed | only `<html>`, fonts, `<body>` |
| `app/luminos/[[...path]]/page.tsx`, `app/nocturn/[[...path]]/page.tsx` + layouts | new | the two designs |
| `components/luminos/*`, `components/nocturn/*` | new | header/sidebar, footer, home, list, article and page frames |
| `proxy.ts` | new | cookie → design rewrite, `?stil=` handling |
| `components/StyleSwitcher.tsx` | changed | sets the cookie and reloads |
| `scripts/check-routes.mjs` | changed if needed | also expects the prefixed pages |
| `tests/styles.test.mjs` | changed | proxy rules (unit), each design builds every page, contrast |

## Touches existing code
- Moving Editorial into a route group must not change its HTML: pixel diff against the live site again.
- Every request now passes through `proxy.ts` (a few ms). Lighthouse re-measured on the article.
- `check:links` also scans the new pages (their links stay unprefixed and resolve through the proxy).

## Test plan
| Case | Type | Expected |
|---|---|---|
| no cookie | unit (proxy) + pixel diff | Editorial, identical to live |
| cookie `nocturn`, URL `/contact/` | unit (proxy) | rewritten to `/nocturn/contact/` |
| `?stil=luminos` | unit | cookie set, redirect to the clean URL |
| `/_next/…`, `/media/…`, unknown cookie | unit | untouched |
| all 23 URLs in each design | build + check:routes | built, real content |
| home, list, article, calculator, a service page × 2 designs × 375/1280 | screenshots | different structure, nothing overflows |
| contrast of each design | unit | ≥ 4.5:1 |
| Lighthouse article (Editorial) | measured | ≥ 90 / ≥ 95 |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm run check:links
npm test
```
End-to-end: the screenshots above, sent to the PO with the live URL.

## Assumptions made
- Names stay "Luminos" and "Nocturn"; Editorial stays the default.
- Article bodies keep their structure inside each design (rewriting 12 bodies × 2 is out of scope).
- Unknown URLs show the Editorial 404 in every design (Next renders the 404 outside the design
  layouts); a per-design 404 was last in the priority order and was not built. Valid URLs are unaffected.
- Small deviations from the sketches after looking at screenshots: the Luminos nav keeps an
  "Eligibilitate preliminară" text link (PO decision on that link); Luminos services are one grey section
  of white cards; Nocturn's ANPC/SOL links sit in the footer under the content (on every page).

## Risks
- Biggest build so far (~2 page sets). If something must give, the order is: home → article →
  funding list → calculator → services → contact/legal/404.
- The proxy is the first code that runs per request; if Vercel misbehaves, the fallback is direct
  links to `/luminos/…` and `/nocturn/…` (already built).

## Needs a decision from the Product Owner
- [x] Approve the two structures and the "same URL, cookie" approach (PO, 2026-10-06).
