# STATE

> Rewritten at the end of every work block. Written for someone returning after **three weeks**.

**Last updated:** 2026-10-06
**Current milestone:** M1 — Setup (status: review — waiting for the Vercel HUMAN TASK)
**Current spec:** docs/specs/002-setup.md (M0 spec 001 is done)
**Branch:** main

## Where we are
- M0 done: `npm run export:wp` copied 12 posts, 11 pages, the footer and 141 images (25.3 MB) from
  the live WordPress site into `content/` and `public/media/`. Counts match the API.
- M1 built: Next.js 16.3.8 site with header, footer, design tokens and a placeholder page for every
  one of the 23 old URLs (unknown URLs show the 404 page). DoD green locally.
- Pushed to GitHub `main` (public repo, PO decision 2026-10-06).

## Next step
1. PO does HUMAN TASK 1 (Vercel import) and pastes the URL.
2. Claude checks the URL, marks M1 done, then starts M2 (spec 003: article template + calculator).

## Why the current approach
- Content is exported once into the repo, so the new site never calls the old server.
- Page-builder HTML is stored raw; cleaning it is M3's job.

## In progress / committed but unfinished
- M1 is committed but not verified on Vercel yet.

## Blocked on the human
- **HUMAN TASK 1 — Import the repo on Vercel:**
  1. Open https://vercel.com/new in the browser. If asked, click **Continue with GitHub** and log in.
  2. Under **Import Git Repository**, find `dezvoltaredigitala-next`.
     If it is not in the list: click **Adjust GitHub App Permissions →**, choose
     **Only select repositories**, add `dezvoltaredigitala-next`, click **Save**, go back to the Vercel tab.
  3. Click **Import** next to `dezvoltaredigitala-next`.
  4. Leave everything as it is (Framework Preset shows **Next.js**; no environment variables). Click **Deploy**.
  5. Wait 1–2 minutes until you see "Congratulations". Click **Continue to Dashboard**.
  6. Under **Domains**, copy the address ending in `.vercel.app`.
  - **Done looks like:** that address shows the blue "Dezvoltare digitală" logo, the menu, and the
    footer; adding `/contact/` at the end shows a page titled "Contact".
  - **What Claude does with it:** opens `/`, `/contact/`, `/servicii/creare-website/` and a wrong URL
    (must be 404), writes the URL here, and marks M1 done.

## Decisions made since last review
- Repo stays public (PO decision); PRODUCT.md updated.
- 12 posts exist, not 10: `/test-2/` and `/bizz-club-botosani/` are also published. All keep their URLs.
- Home page and footer are WordPress theme parts (not in the API); the exporter takes them from the live HTML.
- `/servicii/` has no text of its own on the old site (only a title).
- System font (no web font download). Can change at the M2 look-check.
- Header: Acasă · Servicii · Finanțări nerambursabile · Contact + button "Eligibilitate preliminară" → `/calculator-baterii/`.
- Footer ISO links open the certificate images (ISO/IEC 27001 and ISO/IEC 20000-1 — standard names
  and short labels read from the certificate scans; the old site only said "Suntem certificați ISO"). The certificates
  shown on the old site say "data expirării 18.12.2024", with yearly reviews stamped up to Dec 2025 —
  PO may want to check they are still valid before the demo.
- Tests use Node's built-in runner (no test library added).

## Tried and rejected — don't retry
- Paginating the WP API by "stop when a page is short" — a missing item crashed with HTTP 400 instead
  of a clear count error. Now uses the `X-WP-TotalPages` header.

## Known debt
- Do not run `npm run dev` in a Claude session: Next 16 detects the agent and appends a block to
  `CLAUDE.md` / creates `AGENTS.md` (outside the closed document set). Use `npm run build && npx next start`.
- `npm install` reports audit warnings from the scaffold's dependencies; not reviewed.
- 25.3 MB of images are in git. Fine for the demo; revisit before production.
