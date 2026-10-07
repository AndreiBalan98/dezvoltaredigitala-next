// Home in "Ghid" (spec 008): funding guides first (the newest three with their summaries and the
// calculator as a start button), then the services as a short list in two groups, about, ISO, portfolio.
import Image from "next/image";
import Link from "next/link";
import { SERVICE_DETAILS } from "@/components/focus/data";
import { ABOUT, ABOUT_IMAGE, CERTIFICATES, HELP_TEXT, INTRO, PORTFOLIO } from "@/components/pages/Home";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import StyleSwitcher from "@/components/StyleSwitcher";
import { postCards } from "@/lib/posts";
import s from "./ghid.module.css";

export default function Home() {
  const lines = ["Finanțări", "Software"] as const;
  return (
    <div className={s.wrap}>
      <div className={s.switchRow}>
        <StyleSwitcher current="ghid" />
      </div>

      <div className={s.homeHead}>
        <div className={s.twoThirds}>
          <h1 className={s.titleXl}>{INTRO.title}</h1>
          <p className={s.lead}>{INTRO.lead}</p>
          <p>{INTRO.text}</p>
        </div>
      </div>

      <div className={s.homeGrid}>
        <section className={s.twoThirds} aria-labelledby="g-ghiduri">
          <h2 id="g-ghiduri" className={s.sectionTitle}>
            Finanțări nerambursabile
          </h2>
          <ul className={s.entries}>
            {postCards(3).map((p) => (
              <li key={p.path} className={s.entry}>
                <h3 className={s.entryTitle}>
                  <Link href={p.path}>{p.title}</Link>
                </h3>
                <p className={s.entrySummary}>{p.summary}</p>
                <p className={s.entryMeta}>
                  {p.label} · <time dateTime={p.date}>{p.dateText}</time>
                </p>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/finantari-nerambursabile/">Toate articolele</Link>
          </p>
        </section>

        <aside className={s.related} aria-labelledby="g-calc">
          <h2 id="g-calc">Calculator punctaj baterii</h2>
          <Link className={s.start} href="/calculator-baterii/">
            Calculează-ți punctajul
            <svg aria-hidden="true" viewBox="0 0 33 40" width="17" height="19">
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
            </svg>
          </Link>
          <h2>Ai nevoie de ajutor?</h2>
          <p>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </aside>
      </div>

      <section className={s.homeSection} aria-labelledby="g-servicii">
        <h2 id="g-servicii" className={s.sectionTitle}>
          Servicii
        </h2>
        <div className={s.columns}>
          {lines.map((line) => (
            <div key={line}>
              <h3 className={s.caption}>{line}</h3>
              <ul className={s.linkList}>
                {SERVICE_DETAILS.filter((d) => d.line === line).map((d) => (
                  <li key={d.id}>
                    <Link href={`/servicii/#${d.id}`}>{d.title}</Link>
                    <p>{d.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={`${s.homeSection} ${s.about}`} aria-labelledby="g-despre">
        <div>
          <h2 id="g-despre" className={s.sectionTitle}>
            Despre noi
          </h2>
          {ABOUT.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Image src={ABOUT_IMAGE.src} width={ABOUT_IMAGE.width} height={ABOUT_IMAGE.height} alt={ABOUT_IMAGE.alt} sizes="(max-width: 900px) 100vw, 400px" />
      </section>

      <section className={s.homeSection} aria-labelledby="g-iso">
        <h2 id="g-iso" className={s.sectionTitle}>
          Suntem certificați ISO
        </h2>
        <div className={s.certs}>
          {CERTIFICATES.map((c) => (
            <a key={c.src} href={c.src}>
              <Image src={c.src} width={c.width} height={c.height} alt={`Certificat ${c.label}`} sizes="140px" />
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className={s.homeSection} aria-labelledby="g-proiecte">
        <h2 id="g-proiecte" className={s.sectionTitle}>
          O parte din proiectele finalizate
        </h2>
        <ul className={s.portfolio}>
          {PORTFOLIO.map((p) => (
            <li key={p.href}>
              <div className={s.shot}>
                <Image src={p.shot} alt="" fill sizes="(max-width: 640px) 100vw, 300px" />
              </div>
              <a href={p.href} rel="noopener">
                {p.name}
              </a>
              <p>{p.kind}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.homeSection} ${s.help}`} aria-labelledby="g-ajutor">
        <h2 id="g-ajutor" className={s.sectionTitle}>
          Ai nevoie de ajutor?
        </h2>
        <p>{HELP_TEXT}</p>
        <p className={s.contactLine}>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>
    </div>
  );
}
