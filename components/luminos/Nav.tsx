import Image from "next/image";
import Link from "next/link";
import MenuToggle from "@/components/MenuToggle";
import s from "./luminos.module.css";

// Thin sticky bar: small logo, short centred links (spec 007, Apple-inspired).
export const NAV = [
  { href: "/", label: "Acasă" },
  { href: "/finantari-nerambursabile/", label: "Finanțări nerambursabile" },
  { href: "/calculator-baterii/", label: "Calculator baterii" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/contact/", label: "Contact" },
];

export default function Nav() {
  return (
    <header className={s.nav}>
      <div className={s.navInner}>
        <Link href="/" className={s.navLogo} aria-label="Dezvoltare digitală – acasă">
          <Image src="/media/2025/02/logo-1.png" alt="" width={335} height={129} priority />
        </Link>
        <MenuToggle classes={{ toggle: s.navToggle, nav: s.navLinks, open: s.navOpen }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact/">Eligibilitate preliminară</Link>
        </MenuToggle>
      </div>
    </header>
  );
}
