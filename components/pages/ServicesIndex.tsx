// /servicii/ — the old page had only a title; now a short index of the four service pages, each with one
// sentence taken from its own page.
import Link from "next/link";
import PageLayout from "@/components/article/PageLayout";
import * as fonduri from "./ConsultantaFonduri";
import * as it from "./ConsultantaIt";
import * as website from "./CreareWebsite";
import * as digitalizare from "./DigitalizareAutomatizare";
import styles from "./pages.module.css";

export const SERVICES = [
  {
    href: "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/",
    title: "Consultanță pentru accesarea fondurilor nerambursabile",
    summary: fonduri.summary,
  },
  {
    href: "/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/",
    title: "Consultanță soluții IT și studii de fezabilitate",
    summary: it.summary,
  },
  { href: "/servicii/digitalizare-si-automatizare/", title: "Digitalizare și automatizare", summary: digitalizare.summary },
  { href: "/servicii/creare-website/", title: "Creare website", summary: website.summary },
];

export default function ServicesIndex() {
  return (
    <PageLayout label="Dezvoltare digitală" title="Servicii">
      <ul className={styles.services}>
        {SERVICES.map((s) => (
          <li key={s.href}>
            <h2>
              <Link href={s.href}>{s.title}</Link>
            </h2>
            <p>{s.summary}</p>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
