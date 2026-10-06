# Spec 005 — Demo ready

**Milestone:** M4 · **Status:** approved (PO, 2026-10-06) · **Date:** 2026-10-06

## Goal
The PO can present the new site tomorrow (7 Oct) from his phone and laptop without surprises: the
reference article is fast and accessible (Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95),
no internal link is broken, and STATE.md holds a 5-step demo script plus the open questions.

## Not doing
- New pages, new text, design changes beyond what a Lighthouse finding requires.
- Contact form, production hosting, domain switch (after the demo).
- Lighthouse on every page — only the article page (PRODUCT.md success criterion). Other pages are
  measured once for information, not fixed.
- Checking external links (Facebook, ANPC, portfolio sites): they are not ours and can change any day.
- Cleaning unused images out of git (known debt, before production).

## Approach
**1. Link check (new DoD command).** `scripts/check-links.mjs`, run as `npm run check:links` after
the build, the same way as `check:routes`: it reads every built HTML page in `.next/server/app`, takes
every internal `href` and `src` (starting with `/`), and fails if one points to neither a built page,
a file in `public/`, nor a `/_next/` asset. Prints each broken link with the page it is on. Added to
`.claude/dod-commands`, proven able to fail by adding one broken link on purpose.

**2. Lighthouse.** Measured on the live Vercel URL with Google PageSpeed Insights (the official
Lighthouse, run on Google's servers, mobile profile) by one `curl` — no install. Each page is run
3 times and the middle score is kept (scores move a few points between runs). Numbers go into
STATE.md. If the article page is under the bar: fix the specific findings (typical: image sizes,
font loading, contrast, missing labels), redeploy, measure again.

**3. Demo script.** 5 steps in STATE.md: which page to open, what to point at, in which order —
the core loop from PRODUCT.md (land on an article → understand it → calculator / call).

**4. Final PO look-check** on phone and laptop, written as a HUMAN TASK.

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `scripts/check-links.mjs` | new | internal link check over the built HTML |
| `package.json` | changed | `check:links` script (no new dependency) |
| `.claude/dod-commands` | changed | + `npm run check:links` |
| page/component files | changed only if Lighthouse requires | the smallest fix per finding |
| `docs/STATE.md` | changed | Lighthouse numbers, demo script, open questions, human task |

No URL changes. No new dependency.

## Touches existing code
- Only if a Lighthouse finding requires it (e.g. image `sizes`, a colour token for contrast). Each
  such change is named in the commit and in STATE.md. Colour changes stay within the Editorial palette;
  if a palette colour itself fails contrast, I stop and ask.

## Test plan
| Case | Type | Expected |
|---|---|---|
| all internal links on all 23 pages + 404 resolve | integration (`check:links`) | 0 broken |
| link check can fail | forced | add a link to `/nu-exista/` → red, names page + link — shown once, then removed |
| article page, mobile | Lighthouse via PageSpeed Insights, median of 3 | Performance ≥ 90, Accessibility ≥ 95 |
| home, funding list, calculator, contact | Lighthouse, once | recorded for information |
| phone + laptop | manual (PO) | "yes for the demo" |

## Definition of Done (commands)
```
npm run lint
npm run build
npm run check:routes
npm run check:links
npm test
```
End-to-end check: Lighthouse numbers in STATE.md meet the bar; PO says yes on phone and laptop.

## Assumptions made
- "Article page" = `/finantare-sisteme-stocare-energie/` (the reference article from M2).
- Median of 3 runs counts as the score.
- The demo script follows PRODUCT.md's core loop; the PO can reorder it.

## Risks
- PageSpeed Insights without a key is rate-limited; if it refuses, I fall back to running Lighthouse
  locally (would need your OK — it is a tool download).
- Big featured images could hold Performance under 90; the fix (proper image sizing) is in scope.

## Needs a decision from the Product Owner
- [x] Approve this spec. (PO: approved, 2026-10-06)
- [x] (PO: PageSpeed Insights, 2026-10-06) Measure Lighthouse with Google PageSpeed Insights (free Google service; it only receives the
      public Vercel URL). *Recommendation: yes* — nothing to install, and it measures the real live
      site you will demo. Alternative: download Lighthouse and run it on this machine with Chrome
      (works offline, but measures a local copy, not Vercel).
