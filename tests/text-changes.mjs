// Every intentional change to the old site's text (spec 004). This is the list the PO reads.
// tests/pages-text.test.mjs applies these before comparing old and new text, and fails when an old
// sentence is missing from a rebuilt page without an entry here — or when an entry no longer matches.
//
// Applied automatically everywhere, not listed one by one (see spec 004):
// emoji and Facebook emoji images · "fancy" Unicode bold letters → normal letters · decorative bullets ·
// the copied "Categorii populare / Postări populare" sidebar · old phone 0770 102 495 → +40 749 589 848 ·
// diacritics and punctuation fixed (the comparison ignores diacritics, punctuation and letter case).
//
// Entry: { page, old, new, why } — `new: null` means removed.

export const TEXT_CHANGES = [
  // /start-up-nation-2025/
  { page: "/start-up-nation-2025/", old: "crearea de locui de munca", new: "crearea de locuri de muncă", why: "typo" },

  // /ghidul-incepatorului-in-accesarea-fondurilor-europene-ce-trebuie-sa-stii-inainte-sa-aplici/
  { page: "/ghidul-incepatorului-in-accesarea-fondurilor-europene-ce-trebuie-sa-stii-inainte-sa-aplici/", old: "erori are pot duce", new: "erori care pot duce", why: "typo" },
  { page: "/ghidul-incepatorului-in-accesarea-fondurilor-europene-ce-trebuie-sa-stii-inainte-sa-aplici/", old: "Email:", new: "E-mail:", why: "contact lines are now the standard „Ai nevoie de ajutor?” box" },

  // /servicii/digitalizare-si-automatizare/
  { page: "/servicii/digitalizare-si-automatizare/", old: "solutii eficiente si inovatoare pentru", new: "soluții eficiente pentru", why: "„soluții inovatoare” is on the PRODUCT.md Forbidden list" },
  { page: "/servicii/digitalizare-si-automatizare/", old: "Ce oferim:", new: null, why: "empty heading (nothing followed it on the old page)" },

  // /servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/
  { page: "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/", old: "Citește mai mult", new: null, why: "show/hide button label: all text is now shown" },
  { page: "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/", old: "Arată mai puțin", new: null, why: "show/hide button label: all text is now shown" },
  { page: "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/", old: "Spre pagina de contact", new: "Contactează-ne", why: "same button label as on the other pages" },

  // /contact/
  { page: "/contact/", old: "Suport online", new: null, why: "label of the contact form, which is not part of the demo" },
  { page: "/contact/", old: "Nume", new: null, why: "contact form field (no form for the demo)" },
  { page: "/contact/", old: "Adresa de email", new: null, why: "contact form field (no form for the demo)" },
  { page: "/contact/", old: "Mesajul tău (opțional)", new: null, why: "contact form field (no form for the demo)" },

  // / (home)
  { page: "/", old: "Transformă-ți afacerea cu soluții digitale inovatoare", new: "Transformă-ți afacerea cu soluții digitale", why: "„soluții inovatoare” is on the PRODUCT.md Forbidden list" },
  // The old HTML splits this sentence in two (the last words were bold), hence two entries.
  { page: "/", old: "Descoperă potențialul nelimitat al lumii digitale cu serviciile noastre de", new: null, why: "„potențial nelimitat” is on the PRODUCT.md Forbidden list" },
  { page: "/", old: "dezvoltare digitală", new: null, why: "end of the sentence above (bold on the old page)" },
  { page: "/", old: "Servicii oferite", new: null, why: "small label above „Soluțiile noastre pentru dezvoltare”, repeated meaning" },
  { page: "/", old: "Cu ce ne lăudăm?", new: null, why: "fluff label above the portfolio" },
  { page: "/", old: "Fonduri europene pentru modernizarea microîntreprinderilor", new: null, why: "two fixed article cards replaced by the 3 newest articles (generated)" },
  { page: "/", old: "martie 14, 2025", new: null, why: "two fixed article cards replaced by the 3 newest articles (generated)" },
  { page: "/", old: "Dacă ai o microîntreprindere și îți dorești să o modernizezi, acest program de finanțare este șansa ideală de a accesa fonduri nerambursabile pentru investiții care îți pot transforma activitatea!Ce presupune acest apel de finanțare?Programul „Investiții pentru modernizarea microîntreprinderilor” oferă sprijin", new: null, why: "two fixed article cards replaced by the 3 newest articles (generated)" },
  { page: "/", old: "Alătură-te EduWebLab și obține un site GRATUIT", new: null, why: "two fixed article cards replaced by the 3 newest articles (generated)" },
  { page: "/", old: "martie 3, 2025", new: null, why: "two fixed article cards replaced by the 3 newest articles (generated)" },
  { page: "/", old: "C&A Connect te invită să fii parte din proiectul EduWebLab, un program dedicat susținerii tinerelor talente din domeniul IT și dezvoltării digitale a mediului de afaceri. În colaborare cu Universitatea „Ștefan cel Mare” din Suceava, oferim oportunitatea antreprenorilor de a", new: null, why: "two fixed article cards replaced by the 3 newest articles (generated)" },
];

// Every image the old pages showed that the new pages no longer show (spec 004). tests/leftovers.test.mjs
// checks each one is really gone from its page. Event photos, the building photo, portfolio screenshots,
// certificates and article images are kept.
const STOCK_PEOPLE = "stock photo of people (PRODUCT.md: no stock photos of people)";
const ICON_GRID = "decorative icon of the six-icon grid (PRODUCT.md Forbidden list); the six areas are now a list";
const SERVICE_ICONS = [
  "web.svg",
  "analiza-teh-1.svg",
  "optimation-seo-speed-svgrepo-com.svg",
  "analytics-chart-earning-svgrepo-com.svg",
  "search-seo-word-svgrepo-com.svg",
  "data-protection-save-svgrepo-com.svg",
];
const servicePage = (page, photos) => [
  ...photos.map((file) => ({ page, file, why: STOCK_PEOPLE })),
  ...SERVICE_ICONS.map((file) => ({ page, file, why: ICON_GRID })),
];

export const REMOVED_IMAGES = [
  { page: "/", file: "young-business-woman-pointing-office-Photoroom.png", why: "person pointing (PRODUCT.md Forbidden list)" },
  ...["analiza-teh.svg", "crm.svg", "gest.svg"].map((file) => ({ page: "/", file, why: "decorative icon" })),
  ...["antiv-logo-1.png", "eduweblab-logo-1024x154.png", "xat-logo.png", "b2b-logo.webp", "jocurinoi-logo.webp", "buygames-logo.webp", "caconnect-logo-1.png"].map(
    (file) => ({ page: "/", file, why: "logo strip under the portfolio (repeated the portfolio)" }),
  ),
  ...servicePage("/servicii/creare-website/", [
    "young-male-designer-using-graphics-tablet-while-working-with-com-scaled.jpg",
    "coding-man-scaled.jpg",
  ]),
  ...servicePage("/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/", [
    "hands-working-with-laptop-scaled.jpg",
    "group-young-business-people-working-office-scaled.jpg",
  ]),
  ...servicePage("/servicii/digitalizare-si-automatizare/", [
    "computer-engineer-typing-keyboard-writing-code-build-firewalls-scaled.jpg",
    "handsome-businessman-doing-job-digital-tablet-reading-something-standing-white-background.jpg",
    "business-scene-top-view-scaled.jpg",
  ]),
  ...servicePage("/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/", ["about-us-bg.png"]),
];
