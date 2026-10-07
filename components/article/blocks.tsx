// Building blocks for article bodies (spec 003, extended in spec 004).
import Image from "next/image";
import Link from "next/link";
import { MailIcon, PersonIcon, PhoneIcon, ShieldIcon } from "./icons";
import styles from "./article.module.css";

type Children = { children: React.ReactNode };

export function Lead({ children }: Children) {
  return <p className={styles.lead}>{children}</p>;
}

/** A section with a numbered heading (01, 02 …). */
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

export function DashList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={styles.dash}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Plain running text: paragraphs, lists and links with the article's spacing. */
export function Prose({ children }: Children) {
  return <div className={styles.prose}>{children}</div>;
}

/** Numbered steps (1, 2, 3 …), each with a short bold title. */
export function Steps({ items }: { items: { title: string; text: React.ReactNode }[] }) {
  return (
    <ol className={styles.steps}>
      {items.map((s) => (
        <li key={s.title}>
          <strong>{s.title}</strong>
          {s.text}
        </li>
      ))}
    </ol>
  );
}

type Img = { src: string; width: number; height: number; alt: string };

/** A package with its starting price, what it includes and a request button. */
export function Price({ name, price, items }: { name: string; price: string; items: string[] }) {
  return (
    <section className={styles.price}>
      <h3>{name}</h3>
      <p className={styles.priceFrom}>
        Începând de la <strong>{price}</strong>
      </p>
      <DashList items={items} />
      <Link href="/contact/" className={styles.priceLink}>
        Cere oferta
      </Link>
    </section>
  );
}

export function PriceGrid({ children }: Children) {
  return <div className={styles.prices}>{children}</div>;
}

/** The six service areas listed on every service page of the old site (no icons). Also shown by the
 * focused designs' services pages (spec 008). */
export const SERVICE_AREAS = [
  { title: "Website", text: "Dezvoltare website-uri, e-commerce și software specializat" },
  {
    title: "Analiză tehnică",
    text: "Servicii de analiză pentru identificarea soluțiilor tehnice necesare digitalizării afacerii",
  },
  { title: "CRM", text: "CRM (Customer Relationship Management)" },
  { title: "Gestiune", text: "Soluții pentru gestiune financiară, gestiunea furnizorilor, resurse umane, logistică" },
  { title: "IoT", text: "Implementare tehnologii de tip IoT (Internet of Things), AI (Artificial Intelligence)" },
  { title: "Cloud", text: "Servicii de tip Cloud Computing și securitate cibernetică" },
];

export function ServiceAreas() {
  return (
    <Section title="Servicii diversificate">
      <FactGrid>
        {SERVICE_AREAS.map((a) => (
          <Fact key={a.title} title={a.title}>
            {a.text}
          </Fact>
        ))}
      </FactGrid>
    </Section>
  );
}

/** An image in the text; `narrow` keeps tall (portrait) photos at half width. */
export function Figure({ src, width, height, alt, caption, narrow }: Img & { caption?: string; narrow?: boolean }) {
  return (
    <figure className={`${styles.inlineFigure} ${narrow ? styles.narrow : ""}`}>
      <Image src={src} width={width} height={height} alt={alt} sizes="(max-width: 800px) 100vw, 760px" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** A row of photos (2–3), e.g. from an event. */
export function Gallery({ images }: { images: Img[] }) {
  return (
    <div className={styles.gallery}>
      {images.map((img) => (
        <Image key={img.src} src={img.src} width={img.width} height={img.height} alt={img.alt} sizes="(max-width: 640px) 100vw, 250px" />
      ))}
    </div>
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
