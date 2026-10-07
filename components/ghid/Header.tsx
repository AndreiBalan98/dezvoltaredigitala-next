import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/components/focus/FooterContent";
import MenuToggle from "@/components/MenuToggle";
import s from "./ghid.module.css";

// Plain white header with a thick blue rule under it, like a public-service site (spec 008, "Ghid").
export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <Link href="/" className={s.logo} aria-label="Dezvoltare digitală – acasă">
          <Image src="/media/2025/02/logo-1.png" alt="" width={335} height={129} priority />
        </Link>
        <MenuToggle classes={{ toggle: s.menuToggle, nav: s.nav, open: s.navOpen }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </MenuToggle>
      </div>
    </header>
  );
}

/** "Acasă › Finanțări nerambursabile › …" above a page title. */
export function Breadcrumbs({ trail }: { trail: { href: string; label: string }[] }) {
  return (
    <nav className={s.crumbs} aria-label="Unde te afli">
      <ol>
        <li>
          <Link href="/">Acasă</Link>
        </li>
        {trail.map((t) => (
          <li key={t.href}>
            <Link href={t.href}>{t.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
