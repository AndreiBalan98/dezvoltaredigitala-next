import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/components/pages/ServicesIndex";
import { CERTIFICATES, EMAIL, PHONE_DISPLAY, PHONE_HREF, PORTFOLIO } from "@/components/SiteFooter";
import { postCards } from "@/lib/posts";
import s from "./luminos.module.css";

// Tiny grey footer with link columns (spec 007, Apple-inspired). Same facts as the Editorial footer.
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <p className={s.footerIntro}>
          C&amp;A Connect S.R.L. · Strada Doboșari 79H, Botoșani · <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> ·{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <div className={s.footerCols}>
          <section aria-labelledby="lf-finantari">
            <h2 id="lf-finantari">Finanțări nerambursabile</h2>
            <ul>
              {postCards(5).map((p) => (
                <li key={p.path}>
                  <Link href={p.path}>{p.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/finantari-nerambursabile/">Toate articolele</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="lf-servicii">
            <h2 id="lf-servicii">Servicii</h2>
            <ul>
              {SERVICES.map((sv) => (
                <li key={sv.href}>
                  <Link href={sv.href}>{sv.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/calculator-baterii/">Calculator punctaj baterii</Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="lf-proiecte">
            <h2 id="lf-proiecte">Proiecte realizate</h2>
            <ul>
              {PORTFOLIO.map((p) => (
                <li key={p.href}>
                  <a href={p.href} rel="noopener">
                    {p.name}
                  </a>{" "}
                  – {p.kind}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="lf-legal">
            <h2 id="lf-legal">Informații legale</h2>
            <ul>
              <li>
                <Link href="/politica-de-confidentialitate/">Politica de confidențialitate</Link>
              </li>
              <li>
                <Link href="/termeni-si-conditii/">Termeni și condiții</Link>
              </li>
              {CERTIFICATES.map((c) => (
                <li key={c.href}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ))}
            </ul>
            <div className={s.badges}>
              <a href="https://reclamatiisal.anpc.ro/" rel="noopener">
                <Image src="/media/2025/02/anpc-logo-2.png" alt="ANPC – Soluționarea alternativă a litigiilor" width={419} height={120} />
              </a>
              <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" rel="noopener">
                <Image src="/media/2025/02/solutionare-1.png" alt="Soluționarea online a litigiilor (SOL)" width={451} height={112} />
              </a>
            </div>
          </section>
        </div>
        <p className={s.footerBottom}>© {new Date().getFullYear()} C&amp;A Connect S.R.L. · dezvoltaredigitala.ro</p>
      </div>
    </footer>
  );
}
