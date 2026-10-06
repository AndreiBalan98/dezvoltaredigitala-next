import Image from "next/image";
import Link from "next/link";
import styles from "./SiteFooter.module.css";

// Facts taken from the live site footer and home page (content/site/footer.html, content/pages/sample-page.json).
const PHONE_DISPLAY = "+40 749 589 848";
const PHONE_HREF = "tel:+40749589848";
const EMAIL = "contact@dezvoltaredigitala.ro";

const CERTIFICATES = [
  { label: "ISO/IEC 27001 – securitatea informației", href: "/media/2025/02/Screenshot-2025-03-27-144026.jpg" },
  { label: "ISO/IEC 20000-1 – managementul serviciilor IT", href: "/media/2025/03/Screenshot-2025-03-27-144118.jpg" },
];

const PORTFOLIO = [
  { name: "jocurinoi.ro", kind: "Magazin online", href: "https://www.jocurinoi.ro/" },
  { name: "antiv.ro", kind: "Magazin online", href: "https://www.antiv.ro/" },
  { name: "xat.ro", kind: "Găzduire web", href: "https://www.xat.ro/" },
  { name: "eduweblab.ro", kind: "Creare site-uri", href: "https://www.eduweblab.ro/" },
  { name: "farmaciaanca.ro", kind: "Magazin online", href: "https://www.farmaciaanca.ro/" },
  { name: "caconnect.ro", kind: "Website de prezentare", href: "https://www.caconnect.ro/" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className={styles.heading}>
            Contact
          </h2>
          <p className={styles.text}>
            C&amp;A Connect S.R.L.
            <br />
            Strada Doboșari 79H, Botoșani
          </p>
          <p className={styles.text}>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </section>

        <section aria-labelledby="footer-iso">
          <h2 id="footer-iso" className={styles.heading}>
            Certificări ISO
          </h2>
          <ul className={styles.list}>
            {CERTIFICATES.map((c) => (
              <li key={c.href}>
                <a href={c.href}>{c.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-portfolio">
          <h2 id="footer-portfolio" className={styles.heading}>
            Proiecte realizate
          </h2>
          <ul className={styles.list}>
            {PORTFOLIO.map((p) => (
              <li key={p.href}>
                <a href={p.href} rel="noopener">
                  {p.name}
                </a>{" "}
                <span className="muted">– {p.kind}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-legal">
          <h2 id="footer-legal" className={styles.heading}>
            Informații legale
          </h2>
          <ul className={styles.list}>
            <li>
              <Link href="/politica-de-confidentialitate/">Politica de confidențialitate</Link>
            </li>
            <li>
              <Link href="/termeni-si-conditii/">Termeni și condiții</Link>
            </li>
          </ul>
          <div className={styles.badges}>
            <a href="https://reclamatiisal.anpc.ro/" rel="noopener">
              <Image src="/media/2025/02/anpc-logo-2.png" alt="ANPC – Soluționarea alternativă a litigiilor" width={419} height={120} />
            </a>
            <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" rel="noopener">
              <Image src="/media/2025/02/solutionare-1.png" alt="Soluționarea online a litigiilor (SOL)" width={451} height={112} />
            </a>
          </div>
        </section>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p className="muted">© {new Date().getFullYear()} C&amp;A Connect S.R.L. · dezvoltaredigitala.ro</p>
      </div>
    </footer>
  );
}
