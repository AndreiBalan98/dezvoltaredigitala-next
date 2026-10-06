# Spec 002 — Setup: empty Next.js site, header, footer, tokens

**Milestone:** M1 · **Status:** review (approved by PO: "plan approved, run M0 and M1", 2026-10-06) · **Date:** 2026-10-06

## Goal
An empty but real Next.js site: shared header and footer, the design tokens from PRODUCT.md, and a
placeholder page for every old URL, deployed on Vercel from GitHub `main`.

## Not doing
- Any page content, article template or calculator (M2/M3).
- Contact form, analytics, cookie banner.

## Approach
- `create-next-app` (current stable Next.js, App Router, TypeScript, ESLint, no Tailwind, no `src/`).
  These come with the approved stack; no other dependency is added.
- Static export of all routes (`generateStaticParams`, `dynamicParams = false`); unknown paths → `not-found`.
- `trailingSlash: true` so URLs match WordPress exactly (`/contact/`).
- `lib/content.ts` reads `content/` at build time and lists all routes (pages by WP path, posts by slug).
- Design tokens as CSS custom properties in `app/globals.css`; header/footer as CSS modules.
- Font: system font stack (one family, two weights) — no font download, no dependency.
- `npm test` uses Node's built-in test runner (`node --test`), no test library.
- `npm run check:routes` (`scripts/check-routes.mjs`): after `next build`, every exported path has an
  `.html` file in the build output; missing → exit 1.
- Footer content: company details, ANPC + SOL links, ISO certificates (ISO/IEC 27001, ISO/IEC 20000-1,
  linking to the certificate images), portfolio — taken from the exported `content/site/footer.html`
  and home page; phone `+40 749 589 848` (PRODUCT.md default).

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` | new | scaffold |
| `app/layout.tsx`, `app/globals.css` | new | shell + tokens |
| `components/SiteHeader.*`, `components/SiteFooter.*` | new | header, footer |
| `app/page.tsx`, `app/[...path]/page.tsx`, `app/not-found.tsx` | new | placeholders for every route |
| `lib/content.ts` | new | route list from `content/` |
| `scripts/check-routes.mjs`, `tests/*.test.mjs` | new | checks |
| `.claude/dod-commands` | changed | lint, build, check:routes, test |

## Touches existing code
Only `.claude/dod-commands`. `scripts/export-wp.mjs` and `content/` are read, not changed.

## Test plan
| Case | Type | Expected |
|---|---|---|
| every exported path is built | integration (`check:routes`) | 23 paths found |
| a route is missing | integration (forced) | `check:routes` exits 1 naming it — shown once |
| route list is correct | unit (`npm test`) | contains `/`, `/servicii/creare-website/`, `/877-2/`; no duplicates |
| lint error | forced | `npm run lint` exits 1 — shown once |
| build error | forced | `npm run build` exits 1 — shown once |
| failing unit test | forced | `npm test` exits 1 — shown once |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm test
```
End-to-end check: the Vercel preview URL serves `/` and `/contact/` with header and footer (HUMAN TASK).

## Assumptions made
- Header nav: Acasă · Servicii · Finanțări nerambursabile · Contact, plus the button
  "Eligibilitate preliminară" → `/calculator-baterii/` (PRODUCT.md default).
- System font stack instead of a web font (fast, no dependency). PO can overturn at the M2 look-check.

## Risks
- Vercel Hobby is for non-commercial use — fine for the demo, open question for production.

## Needs a decision from the Product Owner
- [x] Repo visibility: public (PO decided 2026-10-06; PRODUCT.md updated).
