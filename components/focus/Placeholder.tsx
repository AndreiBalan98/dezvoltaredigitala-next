// Every page the focused designs do not build in full (spec 008): the page's real title, one line
// saying so, and links to the designed pages and to the same page in Editorial. Each design styles it
// through the class it passes in (descendant selectors on h1, p, ul).
import Link from "next/link";
import type { Entry } from "@/lib/content";
import { DESIGNED_PAGES, SERVICE_DETAILS, serviceAnchor } from "./data";

export default function Placeholder({ entry, label, className }: { entry: Entry; label: string; className: string }) {
  const service = SERVICE_DETAILS.find((s) => s.href === entry.path);
  return (
    <section className={className}>
      <p data-role="label">{label}</p>
      <h1>{entry.title}</h1>
      <p data-role="note">Această pagină nu a fost refăcută în stilul acesta.</p>
      <ul>
        {service && (
          <li>
            <Link href={serviceAnchor(entry.path)}>{service.title} – pe pagina Servicii</Link>
          </li>
        )}
        {DESIGNED_PAGES.map((p) => (
          <li key={p.href}>
            <Link href={p.href}>{p.label}</Link>
          </li>
        ))}
        <li>
          {/* A plain link: proxy.ts switches the design to Editorial and opens this same page. */}
          <a href={`${entry.path}?stil=editorial`}>Vezi pagina completă în stilul Editorial</a>
        </li>
      </ul>
    </section>
  );
}
