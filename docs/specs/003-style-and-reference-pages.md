# Spec 003 — Style direction + the reference pages (article + calculator)

**Milestone:** M2 · **Status:** done (PO look-check 2026-10-06: "top, keep going like this"; web font for B allowed) · **Date:** 2026-10-06

## Goal
The PO compares two clearly different looks on the same real article and picks one. Then
`/finantare-sisteme-stocare-energie/` and `/calculator-baterii/` are built in that look, from reusable
components (that M3 will reuse for every other page), with a new header and footer on the whole site.
The calculator gives exactly the same numbers as the live one.

## Not doing
- Any other page's content (home, services, list, contact, legal, older articles) — M3. They keep their
  placeholder body, but get the new header and footer automatically.
- Lighthouse scores, link check — M4.
- Changing any text. Article and calculator text are kept word for word (no cuts needed: both pages
  are already clean and emoji-free).
- Changing the calculator's rules, formulas, messages or behaviour.
- A third direction, a dark mode, animations, new images.

## Approach
Two parts, with a PO decision between them.

**Part 1 — two directions (PO picks).**
- **A — "Clar"** (calm, light): the PO's own article, refined. White background, accent `#236581`,
  system sans-serif font, fact cards with a 1px border, one tinted action block, 44px icon squares.
  Header: logo left, plain text links, one solid button.
- **B — "Editorial"** (sober, print-like): warm off-white paper `#f7f5f0`, near-black ink text, one deep
  green accent (`#1f5c45`, the colour the old calculator already uses), **serif headings + sans body**,
  thin horizontal rules instead of boxes, numbered section labels, large serif figures for the
  amounts (15.000 lei, 10 kWh). Header: thin rule under it, links in small caps-style weight.
- Both obey the PRODUCT.md *Forbidden* list (no gradients, shadows on cards, emoji, scroll animations…),
  pass colour contrast AA, work at 375px and with the keyboard only.
- How it's built: the components read CSS variables (tokens). Direction A is the default; direction B
  overrides the tokens and a few component rules when the page contains a `.dir-b` marker
  (CSS `body:has(.dir-b)`), so the header and footer switch too — no layout refactor.
- Two temporary preview pages, same article content: **`/stil-a/`** and **`/stil-b/`** (`noindex`).
- Claude takes screenshots at 375px and 1280px with the Chrome already installed on this machine
  (headless, no new package), checks them, then sends the PO the two Vercel URLs + screenshots.
- **Gate:** the PO picks A or B (or "A, but with X from B"). Nothing in Part 2 starts before that.

**Part 2 — build in the chosen direction.**
- Delete the preview pages and the losing direction's CSS (and its font, if it had one).
- Replace the colour/type lines in PRODUCT.md *Design rules* with the chosen direction.
- **Article:** a generic `ArticleLayout` (title, publish date, featured image, reading column) + small
  block components: `Lead`, `FactGrid`/`Fact`, `ActionBlock`, `ScoreSplit`, `IconRow`, `HelpBox`,
  `FinePrint`. The article body is written once as TSX using those blocks, text copied verbatim from
  `content/posts/finantare-sisteme-stocare-energie.json`. Other posts keep the placeholder until M3.
- **Calculator:** the logic block of the live script (between `// LOGIC START` and `// LOGIC END`,
  plus `CONFIG`) is copied **unchanged** into `lib/calculator.ts` (only TypeScript types added). The
  page UI becomes a React client component that reproduces the live behaviour: 6 condition checkboxes,
  3 fields with hints and errors, number formatting on leaving a field (25000 → 25.000), score + bar,
  AFM / own share, "how to raise your score" tips with the **Aplică** button, sticky score bar on
  phones, back link that returns to the previous page of the site.
- Header and footer redesigned in the chosen direction, same content as now. On phones the menu
  folds into a "Meniu" button (keyboard-operable, `aria-expanded`).
- **PO look-check** on the Vercel URL (both pages, phone and laptop). M3 doesn't start before a yes.

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `app/globals.css` | changed | tokens for A (default) + B overrides (B removed in Part 2 if not chosen) |
| `app/layout.tsx` | changed | font loading (only if a web font is approved, see below) |
| `components/SiteHeader.*`, `components/SiteFooter.*` | changed | new design, same links/content |
| `components/MenuToggle.tsx` | new | phone menu button (client component) |
| `components/article/*` | new | `ArticleLayout` + block components |
| `components/articles/FinantareStocareEnergie.tsx` | new | the reference article body |
| `app/stil-a/page.tsx`, `app/stil-b/page.tsx` | new, then deleted | temporary preview pages |
| `app/[...path]/page.tsx` | changed | renders the real article / calculator for those two paths; placeholder for the rest |
| `lib/calculator.ts` | new | live calculator logic, unchanged |
| `components/RouteHistory.tsx` (+ `app/layout.tsx`) | new | remembers in-app visits so the calculator's back link works after in-app navigation (added after the spec review) |
| `components/BatteryCalculator.tsx` (+ `.module.css`) | new | calculator UI |
| `tests/calculator.test.mjs` | new | 5 fixed cases + parity with the live script |
| `tests/pages-text.test.mjs` | new | every sentence of the old article/calculator text is on the built page |
| `docs/PRODUCT.md` | changed | design-rule colour/type lines replaced by the chosen direction |

No URL changes. `/stil-a/` and `/stil-b/` exist only between Part 1 and Part 2.

## Touches existing code
- Header and footer change on **every** page (look only; links and content stay).
- Global tokens change → the placeholder pages and 404 restyle too.
- `app/[...path]/page.tsx` gets two special cases; the other 21 routes behave as today
  (`check:routes` proves all 23 still build).

## Test plan
| Case | Type | Expected |
|---|---|---|
| 15 kWh, 25.000 lei, own 10.000 lei | unit | 20 + 37,5 = **57,5** pts; AFM 15.000 lei; own 10.000 lei (40%) |
| 20 kWh, 30.000 lei, own 18.750 lei | unit | 50 + 50 = **100** pts; AFM 11.250 lei; no tips |
| 10 kWh, 15.000 lei, own 5.000 lei | unit | 15 + 25 = **40** pts; AFM 10.000 lei; 2 tips (own 9.375 lei → +35 pts; 20 kWh → +25 pts) |
| 12,5 kWh, 20.000 lei, own 4.000 lei | unit | not computed: "minimum 5.000 lei" error on own contribution |
| 8 kWh, 20.000 lei, own 5.000 lei | unit | **neeligibil** (under 10 kWh) |
| parity: ported logic vs. the live script's own code (read from the export) on ~300 input combinations | unit | identical results for every one |
| Romanian number parsing: `25.000`, `25000`, `12,5`, `12.5`, `abc` | unit | 25000, 25000, 12.5, 12.5, error |
| article + calculator text kept | integration (built HTML) | every sentence of the old text is present |
| all 23 old URLs still build | integration (`check:routes`) | 23 of 23 |
| calculator in a browser: tick 6 boxes, type case 1, tab through, press **Aplică** | manual (Claude, headless Chrome screenshots) + PO look-check | 57,5 shown; Aplică sets 15.625 lei → 87,5 pts |
| 375px and 1280px | manual (screenshots) | no horizontal scroll, menu works |
| a check that can fail | forced | change one coefficient in `lib/calculator.ts` → parity test red; delete one sentence from the article → text test red. Both shown once. |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm test
```
End-to-end check: on the Vercel URL, the PO opens the article on his phone, taps "Calculează-ți
punctajul", fills case 1, and sees 57,5 / 100 — the same as the live site.

## Assumptions made
- Preview pages at `/stil-a/` and `/stil-b/`, both the full article with header and footer.
- Both directions keep the existing logo image.
- The featured image of the article is shown under the title (it is the article's own image).
- Calculator keeps its own colours for error (red) and warning (amber) — those are status colours,
  not a second accent.
- Screenshots are taken by Claude with headless Chrome and not committed (they go in the look-check
  message).
- **Part 1 outcome:** PO picked **B "Editorial"** (2026-10-06: "b is way better"). Direction A's CSS and
  the preview pages were deleted; B's tokens became the defaults.
- Calculator port: besides types, `var` became `const`/`let` (lint rule); the parity test runs 700
  input combinations (not ~300) plus 22 number-parsing cases against the live script's code.
- Calculator page shows the WordPress page title "Calculator punctaj baterii" as its heading (the old
  theme showed it above the calculator).
- Small markup fixes with no visible behaviour change: the condition and data cards are
  `fieldset`/`legend` (screen readers announce the group); the divider inside the result list is a
  border, not a `div` (a `div` there is invalid HTML); the sticky score bar's button is out of the Tab
  order because the bar is `aria-hidden` (the result itself is reachable by keyboard); the score bar
  no longer animates its width (no-animation rule).

## Risks
- Two directions in one evening means each is a strong sketch, not a polished system; polish goes
  into the chosen one in Part 2.
- Porting the calculator UI to React could change a small behaviour; the parity test covers the
  numbers, the screenshots + PO check cover the behaviour.

## Needs a decision from the Product Owner
- [x] Approve this spec. (PO: approved, 2026-10-06)
- [x] (PO: allowed, 2026-10-06) Web font for direction B: Next.js's built-in font loader (`next/font`, already part of Next — no
      new package) downloads the font **at build time** and serves it from our own site; visitors never
      contact Google. *Recommendation: allow it* — the serif headings are what make B feel different.
      If not allowed, B uses the device's serif font (looks different on Android vs. iPhone).
