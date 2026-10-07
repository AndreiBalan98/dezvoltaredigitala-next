# Spec 008 — Three more designs, each built around one page (home, services, articles)

**Milestone:** M4c · **Status:** approved (PO, 2026-10-07) · **Date:** 2026-10-07

## Goal
The PO can compare three more designs on the same switcher: **Grilă** (built around the home page),
**Atelier** (built around the services page) and **Ghid** (built around the funding articles). Each one
has its own header, footer and page frames. Only four pages are designed in full in each:
home `/`, `/servicii/`, `/finantari-nerambursabile/` and the newest article
`/finantare-sisteme-stocare-energie/`. **All four are fully designed in every one of the three
designs**; each design is shaped first by its focus page and goes furthest there, and its other pages
follow the same idea. Every other URL shows a placeholder page in the same design.
The site is for two lines of business: **software and digitalisation** (websites, automation, IT
consulting) and **EU-funding consultancy**, and every design shows both on the home page.

PO, 7 Oct (on the first draft): *"the 3 new styles i want them to be applied for each page (Acasa,
Servicii and Fonduri nerambursabile) but each style prioritizes and tries to be sutable for one of them".*

PO, 7 Oct: *"another 3 styles on the same switcher but not for the full website, just 3 pages … one
prioritizing the home page, one the services page and one the articles."*

## Not doing
- Any change to Editorial, Luminos or Nocturn, to the text, the URLs or the calculator's logic.
- Full versions of the other 19 pages in the new designs (they are placeholders).
- New copywriting: the designs rearrange existing text. Placeholders and labels such as "Cuprins"
  are the only new words.
- Brand material from the inspiration sites (logos, names, images, copied text).
- Gradients, glassmorphism, drop shadows on cards, emoji, scroll animations, stock photos.

## Approach
Three designs, each with a different focus. All are light, use square corners, and differ from
Editorial, Luminos and Nocturn in structure, not just in colour.

**E — Grilă (home-first) · Swiss poster style, as on design-studio sites**
- White, black and one signal colour (vermilion `#d93a1f`, used only for the accent and links,
  AA-checked). A tight grid with giant grotesque type (Inter Tight or a similar free font via
  `next/font`) and thick black rules.
- **Home (the showcase):** a two-part opening, giant **"Software"** on one side and **"Finanțări"** on
  the other, each with its sentence from the current home page and a link (services / funding list).
  Then a numbered services index (01–04, full width, large type), the 3 newest articles as a ruled
  table (date · label · title), big figures taken from the content (12 articles, 4 services,
  6 portfolio sites, ISO 9001/27001), portfolio screenshots in an uneven grid, the building photo,
  and the phone number as the last giant line.
- Services: the four services as giant numbered rows with their packages in a strict grid. Funding
  list: a poster-like ruled index. Article: a wide grid with the facts as huge figures in the margin.

**F — Atelier (services-first) · product-catalogue style, as on Stripe's product pages**
- Warm off-white, deep navy text, a teal accent. A clean sans-serif typeface, and thin hairline panels
  instead of shadows.
- **`/servicii/` (the showcase):** a sticky left index of the 4 services. Each service is a full
  section on the same page: its intro, "Ce oferim" as a 2-column checklist, the service areas, and the
  **price packages as a comparison table** (where the old page has prices). Every section ends with its
  own contact action. The section in view is highlighted in the index. The 4 individual service URLs
  stay placeholders that link to their section (`/servicii/#creare-website`).
- Home: two service "doors" (software / funding), then the 4 services as catalogue cards.
- Funding list: articles as catalogue entries filtered visually by label. Article: the facts as a
  spec sheet beside the text, with the calculator as the "product" call to action.

**G — Ghid (articles-first) · public-guide style, as on GOV.UK guides and Stripe Docs**
- White, near-black text, one blue for links (underlined, which also fixes the one Lighthouse
  accessibility finding in this design). Very readable: 19px body text and a clear visual hierarchy.
- **Article (the showcase):** a top **"Pe scurt" panel** built from the article's existing facts
  (how much money, what system, who it is for). A left **"Cuprins"** (contents) built automatically
  from the article's section headings, sticky on desktop and collapsed on phones. The section in view
  is highlighted. The calculator link is a prominent step box, plus a closing "Ai nevoie de ajutor?"
  block with the phone number and e-mail.
- **Funding list:** a guide index with the newest article as a featured entry, then the rest grouped
  by year with date, label and summary. All 12 are listed, and only the newest opens in full.
- Home: funding guides first (newest 3, as guide entries with summaries), then services as a
  short guide list. Services: each service as a guide page section with its own contents line.

**Shared**
- **Placeholder page (every other URL in E/F/G):** the design's header and footer, the page's real
  title, one line saying *"Această pagină nu a fost refăcută în stilul acesta."*, and links to the
  4 designed pages and to the same page in Editorial (`?stil=editorial`). No 404s: every URL still renders.
- **Switcher:** the same tiny top-right row on the home page, now with 6 words:
  `Editorial Luminos Nocturn · Grilă Atelier Ghid`. It wraps cleanly at 375px.
- **Routing:** the same mechanism as spec 007. `lib/design.ts` gains `grila`, `atelier` and `ghid`,
  and `proxy.ts` rewrites to `app/grila/…`, `app/atelier/…` and `app/ghid/…` (`noindex`). There is no
  new dependency, apart from possibly one more free Google font self-hosted by `next/font`
  (already used, not a new package).

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `lib/design.ts` | changed | 3 more design names |
| `app/grila/`, `app/atelier/`, `app/ghid/` (`layout.tsx`, `page.tsx`, `[...path]/page.tsx`) | new | the three page trees |
| `components/grila/*`, `components/atelier/*`, `components/ghid/*` | new | header, footer, the 4 pages, placeholder |
| `components/Placeholder.tsx` | new | shared placeholder content (styled per design) |
| `components/StyleSwitcher.tsx` | changed | 6 entries in two groups |
| `lib/design-routes.tsx` | changed | lets a design render only some pages and the placeholder for the rest |
| `tests/styles.test.mjs` | changed | proxy rules for the 3 new names, every URL builds per design, switcher has 6 entries, contrast |

## Touches existing code
- Editorial, Luminos and Nocturn must look the same apart from the switcher row: a pixel diff on their
  article pages and their homes, where only the switcher row is expected to change.
- 3 × 23 more static pages: longer build, still static, so no runtime cost. `check:links` scans them all.
- The proxy logic changes, so it is re-tested and checked live (`?stil=ghid` and so on).

## Test plan
| Case | Type | Expected |
|---|---|---|
| cookie `grila`/`atelier`/`ghid`, URL `/servicii/` | unit (proxy) | rewritten to `/<design>/servicii/` |
| `?stil=atelier` | unit + live | cookie set, redirect to the clean URL |
| all 23 URLs × 3 new designs | build + test | each renders the designed page or the placeholder, never 404 |
| the 4 designed pages × 3 designs × 375/1280 | screenshots | own structure, nothing overflows |
| Ghid "Cuprins", Atelier service index | manual + keyboard | links jump to the section, reachable with Tab |
| switcher with 6 words at 375px | screenshot | fits, nothing overlaps |
| Editorial / Luminos / Nocturn | pixel diff | only the switcher row changed |
| contrast of each new design | unit | ≥ 4.5:1 |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm run check:links
npm test
```
End-to-end: the screenshots above, sent to the PO together with the live URL.

## Assumptions made
- "Servicii" means the `/servicii/` page. In Atelier it holds all 4 services in full, so the 4 detail
  URLs are placeholders that point into it.
- "Fonduri nerambursabile with one article" means the funding list (all 12 entries listed) plus the
  newest article in full. The other 11 articles are placeholders.
- Names: Grilă, Atelier, Ghid (cookie values `grila`, `atelier`, `ghid`). Editorial stays the default.
- The calculator is a placeholder in the new designs. The placeholder links to it in Editorial.
- Build order if time runs short: Ghid article → Atelier services → Grilă home → the remaining
  designed pages → placeholders.

## Risks
- Today is the demo day. Editorial (the default) is not touched, so the demo path is safe. The
  switcher simply shows 3 more words. If the build is not finished in time, nothing is pushed and the
  live site stays as it is.
- Six designs is a lot to compare. After the demo the PO keeps one, and the rest are removed.

## Needs a decision from the Product Owner
- [x] Approve the three focuses (Grilă = home, Atelier = services, Ghid = articles) and the placeholder approach.
