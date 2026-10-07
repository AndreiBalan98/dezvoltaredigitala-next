// Shared by the three focused designs (spec 008): which pages they design in full, and the four services
// as data, so a services page can show all of them on one page. Texts come from the service pages.
import { SERVICE_AREAS } from "@/components/article/blocks";
import * as fonduri from "@/components/pages/ConsultantaFonduri";
import * as it from "@/components/pages/ConsultantaIt";
import * as website from "@/components/pages/CreareWebsite";
import * as digitalizare from "@/components/pages/DigitalizareAutomatizare";
import { INTRO } from "@/components/pages/Home";
import { CALCULATOR_ARTICLE } from "@/lib/posts";

export { SERVICE_AREAS };

/** The newest article: the one article the focused designs build in full. */
export const DESIGNED_ARTICLE = CALCULATOR_ARTICLE;

/** The designed article's key sentences (word for word from its body), lifted to the top or a side panel. */
export const KEY_FACTS: Record<string, string[]> = {
  [DESIGNED_ARTICLE]: [
    "Finanțare de până la 15.000 lei",
    "AFM poate acoperi maximum 75% din valoarea totală a proiectului, iar contribuția proprie este de minimum 25%.",
    "Sistem de stocare de minimum 10 kWh",
    "Solicitantul trebuie să fie persoană fizică și prosumator",
    "Proiectele pot obține maximum 100 de puncte",
  ],
};

/** Every other URL is a placeholder in these designs. */
export const DESIGNED_PAGES = [
  { href: "/", label: "Acasă" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/finantari-nerambursabile/", label: "Finanțări nerambursabile" },
  { href: DESIGNED_ARTICLE, label: "Finanțare pentru sisteme de stocare a energiei" },
];

/** The two lines of business, as the home pages present them. */
export type Line = "Finanțări" | "Software";

export type ServiceDetail = {
  id: string;
  href: string;
  line: Line;
  title: string;
  summary: string;
  lead?: string;
  lists: { title: string; items: string[] }[];
  steps?: { title: string; items: { title: string; text: string }[] };
  packages?: { title: string; items: typeof website.PACKAGES };
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: "consultanta-fonduri",
    href: "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/",
    line: "Finanțări",
    title: "Consultanță pentru accesarea fondurilor nerambursabile",
    summary: fonduri.summary,
    lists: [{ title: "Servicii", items: fonduri.OFFER }],
    steps: { title: "Iată principalele avantaje ale apelării la consultanță profesională", items: fonduri.ADVANTAGES },
  },
  {
    id: "consultanta-it",
    href: "/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/",
    line: "Software",
    title: "Consultanță soluții IT și studii de fezabilitate",
    summary: it.summary,
    lead: INTRO.lead,
    lists: [{ title: "Ce servicii oferim?", items: it.OFFER }],
  },
  {
    id: "digitalizare",
    href: "/servicii/digitalizare-si-automatizare/",
    line: "Software",
    title: "Digitalizare și automatizare",
    summary: digitalizare.summary,
    lists: [{ title: "Beneficii diverse, asigurate printr-o colaborare continuă", items: digitalizare.BENEFITS }],
    steps: { title: "Pentru a integra roboți software în afacerea ta, trebuie să urmezi câțiva pași esențiali", items: digitalizare.STEPS },
  },
  {
    id: "creare-website",
    href: "/servicii/creare-website/",
    line: "Software",
    title: "Creare website",
    summary: website.summary,
    lead: "Dezvoltare digitală se situează în fruntea ofertelor din domeniul dezvoltării magazinelor online.",
    lists: [{ title: "Ce oferim?", items: website.OFFER }],
    packages: { title: "Alege unul dintre pachetele noastre pentru a dezvolta afacerea ta online.", items: website.PACKAGES },
  },
];

/** Where a service's own URL points in a design that shows all services on /servicii/. */
export const serviceAnchor = (href: string) => {
  const s = SERVICE_DETAILS.find((d) => d.href === href);
  return s ? `/servicii/#${s.id}` : "/servicii/";
};
