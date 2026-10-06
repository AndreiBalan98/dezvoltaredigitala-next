import Image from "next/image";
import Link from "next/link";
import MenuToggle from "./MenuToggle";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/", label: "Acasă" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/finantari-nerambursabile/", label: "Finanțări nerambursabile" },
  { href: "/contact/", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Dezvoltare digitală – acasă">
          <Image src="/media/2025/02/logo-1.png" alt="" width={335} height={129} priority />
        </Link>
        <MenuToggle>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className={styles.cta}>
            Eligibilitate preliminară
          </Link>
        </MenuToggle>
      </div>
    </header>
  );
}
