import Image from "next/image";
import Link from "next/link";
import { CERTIFICATES } from "@/components/SiteFooter";
import s from "./nocturn.module.css";

// A quiet line under the content (spec 007): company, legal links, certificates, ANPC / SOL.
export default function Footer() {
  return (
    <footer className={`${s.inner} ${s.footer}`}>
      <div className={s.footerRow}>
        <p>C&amp;A Connect S.R.L. · Strada Doboșari 79H, Botoșani</p>
        <div className={s.footerLinks}>
          <Link href="/politica-de-confidentialitate/">Politica de confidențialitate</Link>
          <Link href="/termeni-si-conditii/">Termeni și condiții</Link>
          {CERTIFICATES.map((c) => (
            <a key={c.href} href={c.href}>
              {c.label}
            </a>
          ))}
        </div>
      </div>
      <div className={s.footerRow}>
        <p>© {new Date().getFullYear()} C&amp;A Connect S.R.L. · dezvoltaredigitala.ro</p>
        <div className={s.badges}>
          <a href="https://reclamatiisal.anpc.ro/" rel="noopener">
            <Image src="/media/2025/02/anpc-logo-2.png" alt="ANPC – Soluționarea alternativă a litigiilor" width={419} height={120} />
          </a>
          <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" rel="noopener">
            <Image src="/media/2025/02/solutionare-1.png" alt="Soluționarea online a litigiilor (SOL)" width={451} height={112} />
          </a>
        </div>
      </div>
    </footer>
  );
}
