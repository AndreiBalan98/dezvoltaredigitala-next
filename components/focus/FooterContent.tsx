// The facts every footer must carry (company, contact, legal pages, ISO, portfolio, ANPC + SOL), as plain
// markup that each focused design (spec 008) lays out with its own class. Same facts as Editorial's footer.
import Image from "next/image";
import Link from "next/link";
import { CERTIFICATES, EMAIL, PHONE_DISPLAY, PHONE_HREF, PORTFOLIO } from "@/components/SiteFooter";

export const NAV = [
  { href: "/", label: "Acasă" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/finantari-nerambursabile/", label: "Finanțări nerambursabile" },
  { href: "/calculator-baterii/", label: "Calculator baterii" },
  { href: "/contact/", label: "Contact" },
];

export default function FooterContent({ className, idPrefix }: { className: string; idPrefix: string }) {
  return (
    <div className={className}>
      <section aria-labelledby={`${idPrefix}-contact`}>
        <h2 id={`${idPrefix}-contact`}>Contact</h2>
        <p>
          C&amp;A Connect S.R.L.
          <br />
          Strada Doboșari 79H, Botoșani
        </p>
        <p>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <br />
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>
      <section aria-labelledby={`${idPrefix}-iso`}>
        <h2 id={`${idPrefix}-iso`}>Certificări ISO</h2>
        <ul>
          {CERTIFICATES.map((c) => (
            <li key={c.href}>
              <a href={c.href}>{c.label}</a>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby={`${idPrefix}-proiecte`}>
        <h2 id={`${idPrefix}-proiecte`}>Proiecte realizate</h2>
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
      <section aria-labelledby={`${idPrefix}-legal`}>
        <h2 id={`${idPrefix}-legal`}>Informații legale</h2>
        <ul>
          <li>
            <Link href="/politica-de-confidentialitate/">Politica de confidențialitate</Link>
          </li>
          <li>
            <Link href="/termeni-si-conditii/">Termeni și condiții</Link>
          </li>
        </ul>
        <div data-role="badges">
          <a href="https://reclamatiisal.anpc.ro/" rel="noopener">
            <Image src="/media/2025/02/anpc-logo-2.png" alt="ANPC – Soluționarea alternativă a litigiilor" width={419} height={120} />
          </a>
          <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" rel="noopener">
            <Image src="/media/2025/02/solutionare-1.png" alt="Soluționarea online a litigiilor (SOL)" width={451} height={112} />
          </a>
        </div>
      </section>
    </div>
  );
}
