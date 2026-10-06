# Spec 006 — Three styles with a switcher

**Milestone:** M4b (inserted before the demo) · **Status:** approved (PO, 2026-10-06, with changes: Apple/Linear directions, switcher on home only) · **Date:** 2026-10-06

## Goal
The PO can show the whole site in three clearly different looks and switch between them with one
tap, on any page, on phone and laptop. "Editorial" (approved) stays the default; two new directions
are added, both fitted to what the site is about: **EU funding** (official calls, rules, eligibility,
deadlines) and **digitalisation / energy** (websites, automation, batteries, kWh).

## Not doing
- Any change to text, pages, URLs, the calculator's logic or the Editorial look.
- A different page structure per style: same HTML, the styles change type, colour and block treatment.
- Automatic dark mode (following the phone setting), animations, gradients, new images, stock photos, emoji (PRODUCT.md *Forbidden*).
- New npm dependencies (fonts come through `next/font/google`, already used).
- Deciding the final style — the PO picks after the demo; the losing styles are removed then.

## Approach
**PO direction (6 Oct, answering the first draft).** The first two candidates ("Instituțional",
"Tehnic") were rejected: *"take inspiration from Apple and Linear websites, those are the 2 new
styles"*. Inspiration only — no Apple/Linear logos, names, icons or copied text on the site.

**C — "Apple"-inspired, shown as "Luminos"** (bright, product-page calm)
- Colours: white `#ffffff` and light grey `#f5f5f7` alternating surfaces, text `#1d1d1f`, muted
  `#6e6e73`, link/accent blue `#0066cc` (hover `#0071e3` buttons / `#004f9e` links), line `#d2d2d7`.
- Type: **Inter** (400/600/700), tight tracking on big headings (-0.02em), very large centred titles
  (56px desktop / 36px phone), body 17px.
- Blocks: grey rounded panels (18px corners) instead of rules; facts and score figures as tiles on
  `#f5f5f7`; pill-shaped buttons (fully rounded) and "Află mai mult ›" style text links; header a slim
  translucent-white bar with small 13px links; images with rounded corners. Lots of white space.

**D — "Linear"-inspired, shown as "Nocturn"** (dark, precise software look)
- Colours: page `#08090a`, raised surfaces `#111214`, text `#f7f8f8`, secondary `#b4bcd0`, muted
  `#8a8f98`, accent indigo `#5e6ad2` (light variant `#828fff` for links on dark), lines
  `rgba(255,255,255,0.08)`.
- Type: **Inter** (400/500/600), headings 600 with tight tracking, smaller labels in 500.
- Blocks: hairline-bordered cards with 8–12px corners on raised surfaces; facts as a bordered grid;
  numbered sections as muted mono-like small labels; buttons indigo, 6px corners; header black with
  1px hairline under it.
- **Note:** PRODUCT.md forbade "dark mode for the demo". Linear's look is dark by nature, so this is
  a dark *style* chosen by the PO (not automatic dark mode following the phone setting). No gradients.

**How it is built**
- `<html data-stil="editorial|luminos|nocturn">`. A tiny inline script in `<head>` sets it
  before the first paint from `?stil=` in the URL (so a link can open a given style) or from
  `localStorage`, default `editorial` → no flash of the wrong style.
- Editorial tokens stay in `:root`; each new style overrides the tokens in `app/globals.css` and,
  where the block treatment differs, adds rules at the end of the existing CSS module files under
  `:global([data-stil="…"])`. No component markup changes beyond what a style hook strictly needs.
- Fonts for C and D are loaded with `preload: false`: the browser downloads them only when that style
  is active, so Editorial's Lighthouse scores stay as measured.
- **Switcher (PO: home page only):** a small row at the top of the home page — `Stil: Editorial ·
  Luminos · Nocturn` — three real buttons, the active one marked (`aria-pressed`), keyboard-operable,
  styled by the active style. The chosen style stays on every page (stored in the browser).
  It is a demo tool: removed when the PO picks a style.

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `components/StyleSwitcher.tsx` + `.module.css` | new | the three-button row on the home page (client component) |
| `app/layout.tsx` | changed | Inter font variable (not preloaded), head script |
| `components/pages/Home.tsx` | changed | renders the switcher at the top |
| `app/globals.css` | changed | token overrides for C and D |
| `components/**/*.module.css` | changed | per-style block rules appended at the end of each file |
| `tests/styles.test.mjs` | new | built pages contain the switcher and the head script; every style's colour pairs pass AA contrast |
| `docs/PRODUCT.md` | changed | Design rules: C and D listed as candidates under review |

No URL changes. `?stil=` is an optional query parameter, ignored if unknown.

## Touches existing code
- The home page gets the switcher row (a few words of new text — not counted as changed old text).
- The layout gains an inline script; pages still build statically.
- Editorial must look exactly as now: checked by screenshot before/after at 375px and 1280px.

## Test plan
| Case | Type | Expected |
|---|---|---|
| switch on the article page, then open another page | manual (headless Chrome screenshots) | the chosen style stays |
| `/?stil=nocturn` | screenshot | opens in Nocturn and remembers it |
| unknown `?stil=xyz` / no storage (private window) | unit + screenshot | Editorial, no error |
| keyboard only | manual | Tab reaches the 3 buttons, Enter switches, focus visible |
| contrast of each style's text/accent/muted on its background | unit | ≥ 4.5:1 |
| all 24 pages × 3 styles at 375px and 1280px | screenshots | nothing overflows, nothing unreadable |
| Lighthouse mobile, article, Editorial | measured | Performance ≥ 90, Accessibility ≥ 95 still |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm run check:links
npm test
```
End-to-end check: screenshots of home, article, calculator and a service page in all three styles,
at 375px and 1280px, sent to the PO with the Vercel URL.

## Assumptions made
- Editorial stays the default style; the switcher is visible to everyone on the demo URL.
- Style names shown on the switcher: Editorial, Luminos (Apple-inspired), Nocturn (Linear-inspired) —
  Romanian words, no brand names on the client's site.
- Inter for both new styles (the closest open font to Apple's SF Pro and Linear's own font).

## Risks
- Three styles on one HTML structure: C and D can differ in type, colour and block treatment but not
  in layout order. If the PO wants a different structure per style, that is a bigger, separate spec.
- More CSS to maintain until the PO picks; removing the losers afterwards is a short cleanup.

## Needs a decision from the Product Owner
- [x] Directions: Apple- and Linear-inspired; switcher on the home page only (PO, 2026-10-06).
