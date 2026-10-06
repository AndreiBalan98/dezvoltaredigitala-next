# Spec 001 — Export the WordPress content

**Milestone:** M0 · **Status:** done (approved by PO: "plan approved, run M0 and M1", 2026-10-06) · **Date:** 2026-10-06

## Goal
One script copies every post, page and referenced image from the live WordPress site into the repo,
so the new site never depends on the old server. The script proves completeness with counts.

## Not doing
- Cleaning page-builder HTML (that is M3). Content is stored as the API returns it.
- Downloading the whole media library — only images referenced by a post or page (incl. featured images).
- Any change to the live site.

## Approach
- Node 22 built-ins only (`fetch`, `fs`). No dependencies.
- Paginate `/wp-json/wp/v2/{posts,pages}?per_page=100&status=publish`; read `X-WP-Total` and compare with
  what was saved. Mismatch → exit 1.
- Per item: `content/{posts,pages}/<slug>.json` with id, slug, path, title, date, modified, excerpt,
  featured image, categories, parent, and the raw `content.rendered` HTML.
- Images: collect every `dezvoltaredigitala.ro/wp-content/uploads/...` URL from `src`, `srcset`, `href`,
  `data-src`, inline `url(...)` and featured media; download to `public/media/<same uploads path>`.
  Failures are listed and make the script exit 1.
- `content/media-map.json`: old URL → new `/media/...` path (used by M2/M3 to rewrite HTML).
- Found during the build: the home page and the footer are theme template parts, so the API has no
  content for them. For any page with empty API content, the script takes the live page from `<main>`
  up to the site `<footer>`; the footer itself goes to `content/site/footer.html`. Their images are
  downloaded too. (`/servicii/` and `/finantari-nerambursabile/` have no own text — the second is the post list.)
- Prints an inventory table (type, date, path, title) to the terminal.

## Files and interfaces
| File / interface | New / changed | What |
|---|---|---|
| `scripts/export-wp.mjs` | new | the exporter (`node scripts/export-wp.mjs`) |
| `content/posts/*.json`, `content/pages/*.json` | new | exported content |
| `content/media-map.json` | new | URL map |
| `content/site/footer.html` | new | live footer (theme part) |
| `public/media/**` | new | downloaded images |

## Touches existing code
None — the repo has no code yet.

## Test plan
| Case | Type | Expected |
|---|---|---|
| counts match `X-WP-Total` | integration (script run) | "posts 12/12, pages 11/11" printed, exit 0 |
| count mismatch | integration (forced) | exit 1 with a clear message — shown once as evidence |
| image download fails | integration (forced bad URL) | failure listed, exit 1 — shown once as evidence |

## Definition of Done (commands)
```
node scripts/export-wp.mjs   # exit 0, counts match, 0 failed images
```

## Assumptions made
- 12 posts exist (PRODUCT.md said 10): `/test-2/` and `/bizz-club-botosani/` are also published. All 12 are exported and keep their URLs.
- Images are committed to the repo (no external storage), as PRODUCT.md decides.

## Risks
- Large media size in git (25.3 MB, 141 files). Mitigation: only referenced images; size is printed.

## Needs a decision from the Product Owner
- [ ] none for M0
