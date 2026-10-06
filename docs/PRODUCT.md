# PRODUCT

> Pre-filled from the 6 Oct 2026 planning chat (site read end to end). Changes need the Product Owner.

## Operating settings
| Setting | Value |
|---|---|
| **Involvement level** | I0 until the demo (7 Oct 2026) → promote to I1 if it goes ahead |
| **Maturity level** | L0 prototype → L1 after the demo |
| Budget ceiling / month | 0 for the demo. Vercel Hobby is free but meant for non-commercial use — production hosting is an OPEN QUESTION |
| Deadline | **Demo: Wednesday 7 Oct 2026** |
| Who else touches this code | nobody |
| **Repository visibility** | public (PO decision, 6 Oct 2026) |

## Riskiest assumption
*"We can get all of the old site's content out cleanly."* **Mostly settled on 6 Oct:** the WordPress
REST API is open (`/wp-json/wp/v2/posts`, `/pages`, `/media` return full JSON). What remains: old
pages are built with page-builder plugins (Essential Blocks, Stackable, Spectra/UAGB), so their HTML
is messy. Articles can be cleaned automatically; service pages get rebuilt as clean components using
their existing text. M0 proves the export with counts.

## Problem
dezvoltaredigitala.ro (C&A Connect S.R.L., Botoșani) sells EU-funding consultancy and digitalisation
services to small businesses and individuals in the Nord-Est region. The current WordPress site looks
dated and inconsistent: page-builder layouts, stock photos, emoji-heavy posts, two different phone
numbers. The newest article (*Finanțare pentru sisteme de stocare a energiei*, 6 Oct 2026) and its
calculator are clean and are **the design reference for the whole new site.**

## Users
Primary: owners of micro-enterprises/SMEs and prosumers in Nord-Est who saw a funding call on
Facebook or Google. Secondary: businesses wanting a website or digitalisation.

## Core loop
Visitor lands on a funding article → understands in 30 seconds whether it applies to them →
uses the calculator or calls / emails.

## MVP scope — every old URL keeps working, same path
- `/` home
- `/finantari-nerambursabile/` — list of all funding articles, newest first
- every post at `/<slug>/` (10 posts; e.g. `/finantare-sisteme-stocare-energie/`)
- `/calculator-baterii/` — the battery score calculator, logic ported unchanged
- `/servicii/creare-website/`, `/servicii/digitalizare-si-automatizare/`,
  `/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/`,
  `/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/` (+ the `/servicii/` parent if it exists)
- `/contact/`, `/politica-de-confidentialitate/`, `/termeni-si-conditii/`, a 404 page
- footer: company details, ANPC + SOL links (legally required), ISO certificates, portfolio
  (jocurinoi.ro, antiv.ro, xat.ro, eduweblab.ro, farmaciaanca.ro, caconnect.ro)

## Non-goals (explicitly NOT building)
- CMS, admin panel, backend, database, login
- a working contact form (demo uses phone + email buttons; a form service is decided later)
- comments, search, newsletter, cookie banner beyond what's legally needed
- new copywriting — facts are kept; obvious fluff and emoji are cut, and every cut is listed for the PO
- animations on scroll, stock photos of people, AI-generated illustrations added by us
- NeoBot, pages not listed above

## Design rules — "professional, clean, not AI slop"
Taken from the PO's own article (`.dd-art` CSS on the live site):
- **Colours:** accent `#236581`, accent-2 `#42adec`, tint `#e8f4fc`, line `#e2e8ec`,
  muted `#56636c`, text `#1d1d26`, white background. One accent. No gradients.
- **Type:** one font family, two weights. Body 18px / 1.7 (17px on phones). Reading column 760px.
  Lead paragraph 20px. Headings with generous space above (56px).
- **Blocks:** fact cards (1px line border, 14px radius, no shadow), one tint "action" block per page,
  icon rows with a 44px tinted square, a quiet "Ai nevoie de ajutor?" box, small print in muted grey.
- **Forbidden:** gradients, glassmorphism, drop shadows on cards, emoji in UI, fade/slide-in
  animations, a hero photo of a person pointing, grids of six icons-in-circles, phrases like
  "soluții inovatoare" / "potențial nelimitat", dark mode for the demo.
- Romanian diacritics with comma-below (ș ț), Romanian number format (25.000 lei, 12,5 kWh).
- Works at 375px wide. Every interactive element reachable by keyboard.

## Success criteria (demo)
- every URL in the MVP list renders on the Vercel preview, none 404
- the calculator gives the same result as the live one for 5 fixed test inputs
- Lighthouse on the article page: Performance ≥ 90, Accessibility ≥ 95 (mobile)
- the PO, looking on his phone and laptop, says it looks professional

## Technical decisions
| Area | Decision | Why |
|---|---|---|
| Delivery target | static website | |
| Stack | Next.js (current stable, App Router), TypeScript | PO's choice |
| Styling | plain CSS: global design tokens + CSS modules | the PO's article is already plain CSS; fewer deps |
| Content | exported once from the WP REST API by `scripts/export-wp.mjs` into `content/` (JSON + cleaned HTML); images downloaded to `public/media/` | no runtime dependency on the old server |
| Data & storage | none — files in the repo | |
| Auth | none | |
| External services | none at runtime | |
| Hosting | Vercel, auto-deploy from GitHub `main` | PO's choice |
| Architecture | monolith, statically generated | default |

## Constraints
- Content in Romanian; code, commits and docs in English.
- The old site stays live and untouched until the PO decides on the domain switch.

## Open questions
<!-- Defaults are used for the demo; the PO can override any of them. -->
- OPEN QUESTION: **phone number.** Old pages show 0770 102 495; the contact page and the newest
  article (both edited 6 Oct 2026) show +40 749 589 848. *Default: +40 749 589 848 everywhere.*
- OPEN QUESTION: contact page `mailto:` has a typo (`dezvolatredigitala`). *Default: fixed.*
- OPEN QUESTION: 2025 funding calls (Start-Up Nation 2025, VInnovate 2025…) may be closed.
  *Default: keep them, show the publish date clearly, make no claim about status.*
- OPEN QUESTION: two posts have bad slugs (`/877-2/`, `/test-3/`). *Default: keep the URLs for the demo.*
- OPEN QUESTION: the header button "Eligibilitate preliminară" — where should it go? *Default: calculator.*
- OPEN QUESTION (after demo): production hosting (Vercel Pro ~$20/month for commercial use, or other),
  contact form service, domain switch date.