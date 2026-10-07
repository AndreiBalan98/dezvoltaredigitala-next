import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/components/focus/FooterContent";
import MenuToggle from "@/components/MenuToggle";
import s from "./grila.module.css";

// Logo and uppercase links on a strict grid, closed by a thick black rule (spec 008, "Grilă").
export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <Link href="/" className={s.logo} aria-label="Dezvoltare digitală – acasă">
          <Image src="/media/2025/02/logo-1.png" alt="" width={335} height={129} priority />
        </Link>
        <MenuToggle classes={{ toggle: s.menuToggle, nav: s.nav, open: s.navOpen }}>
          {NAV.map((item, i) => (
            <Link key={item.href} href={item.href}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </MenuToggle>
      </div>
    </header>
  );
}
