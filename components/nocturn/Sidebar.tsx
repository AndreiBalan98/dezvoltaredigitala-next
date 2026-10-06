import Image from "next/image";
import Link from "next/link";
import MenuToggle from "@/components/MenuToggle";
import { SERVICES } from "@/components/pages/ServicesIndex";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import { posts } from "@/lib/content";
import s from "./nocturn.module.css";

// The app-like left sidebar that replaces the top header (spec 007, Linear-inspired).
// On phones it becomes a top bar with a "Meniu" button.
const SHORT_SERVICE: Record<string, string> = {
  "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/": "Fonduri nerambursabile",
  "/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/": "Soluții IT și fezabilitate",
  "/servicii/digitalizare-si-automatizare/": "Digitalizare și automatizare",
  "/servicii/creare-website/": "Creare website",
};

export default function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <Link href="/" className={s.logo} aria-label="Dezvoltare digitală – acasă">
        <Image src="/media/2025/02/logo-1.png" alt="" width={335} height={129} priority />
      </Link>
      <MenuToggle classes={{ toggle: s.toggle, nav: s.menu, open: s.open }}>
        <Link className={s.navItem} href="/">
          Acasă
        </Link>
        <Link className={s.navItem} href="/finantari-nerambursabile/">
          Finanțări nerambursabile <span className={s.count}>{posts().length}</span>
        </Link>
        <Link className={s.navItem} href="/calculator-baterii/">
          Calculator baterii
        </Link>
        <Link className={s.navGroup} href="/servicii/">
          Servicii
        </Link>
        {SERVICES.map((sv) => (
          <Link key={sv.href} className={`${s.navItem} ${s.navSub}`} href={sv.href}>
            {SHORT_SERVICE[sv.href] ?? sv.title}
          </Link>
        ))}
        <Link className={`${s.navItem} ${s.navGap}`} href="/contact/">
          Contact
        </Link>
        <div className={s.sideBottom}>
          <Link className={s.sideButton} href="/contact/">
            Eligibilitate preliminară
          </Link>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </MenuToggle>
    </aside>
  );
}
