// Building blocks for article bodies (spec 003). Each block matches one block of the PO's article.
import Link from "next/link";
import { MailIcon, PersonIcon, PhoneIcon, ShieldIcon } from "./icons";
import styles from "./article.module.css";

type Children = { children: React.ReactNode };

export function Lead({ children }: Children) {
  return <p className={styles.lead}>{children}</p>;
}

/** A numbered section heading (numbers are shown only in direction B). */
export function Section({ title, children }: { title: string } & Children) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export function FactGrid({ children }: Children) {
  return <div className={styles.facts}>{children}</div>;
}

export function Fact({ title, children }: { title: string } & Children) {
  return (
    <p className={styles.fact}>
      <strong className={styles.factTitle}>{title}</strong>
      {children}
    </p>
  );
}

/** The one tinted "do this next" block of the page. */
export function ActionBlock({ title, children }: { title: string } & Children) {
  return (
    <section className={styles.action}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function DashList({ items }: { items: string[] }) {
  return (
    <ul className={styles.dash}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ButtonLink({ href, children }: { href: string } & Children) {
  return (
    <Link href={href} className={styles.button}>
      {children}
    </Link>
  );
}

export function ScoreSplit({ children }: Children) {
  return <div className={styles.score}>{children}</div>;
}

export function Criterion({ points, title, children }: { points: number; title: string } & Children) {
  return (
    <p className={styles.crit}>
      <span className={styles.critPoints} aria-hidden="true">
        {points}
      </span>
      <strong className={styles.critTitle}>{title}</strong>
      {children}
    </p>
  );
}

export function Note({ children }: Children) {
  return <p className={styles.note}>{children}</p>;
}

const ICONS = { person: PersonIcon, shield: ShieldIcon };

export function IconRow({ icon, children }: { icon: keyof typeof ICONS } & Children) {
  const Icon = ICONS[icon];
  return (
    <div className={styles.iconRow}>
      <span className={styles.iconBox}>
        <Icon className={styles.icon} />
      </span>
      <p>{children}</p>
    </div>
  );
}

const PHONE_DISPLAY = "+40 749 589 848";
const PHONE_HREF = "tel:+40749589848";
const EMAIL = "contact@dezvoltaredigitala.ro";

/** The quiet "Ai nevoie de ajutor?" box with phone and e-mail. */
export function HelpBox({ children }: Children) {
  return (
    <section className={styles.help}>
      <h2>Ai nevoie de ajutor?</h2>
      {children}
      <p className={styles.org}>
        <strong>Dezvoltare Digitală</strong>
      </p>
      <p className={styles.contactLine}>
        <span className={styles.contactIcon}>
          <PhoneIcon className={styles.icon} />
        </span>
        <span>
          Telefon: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </span>
      </p>
      <p className={styles.contactLine}>
        <span className={styles.contactIcon}>
          <MailIcon className={styles.icon} />
        </span>
        <span>
          E-mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </span>
      </p>
    </section>
  );
}

export function FinePrint({ children }: Children) {
  return <p className={styles.fine}>{children}</p>;
}
