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
