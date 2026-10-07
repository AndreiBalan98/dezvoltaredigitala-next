import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/components/focus/FooterContent";
import MenuToggle from "@/components/MenuToggle";
import s from "./atelier.module.css";

// Sticky light bar: logo, links, one dark "Contactează-ne" button (spec 008, "Atelier").
export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <Link href="/" className={s.logo} aria-label="Dezvoltare digitală – acasă">
          <Image src="/media/2025/02/logo-1.png" alt="" width={335} height={129} priority />
        </Link>
        <MenuToggle classes={{ toggle: s.menuToggle, nav: s.nav, open: s.navOpen }}>
          {NAV.filter((item) => item.href !== "/contact/").map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className={s.navButton} href="/contact/">
            Contactează-ne
          </Link>
        </MenuToggle>
      </div>
    </header>
  );
}
