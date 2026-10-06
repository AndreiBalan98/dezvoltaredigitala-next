// Home in "Nocturn" (spec 007, Linear-inspired): a left-aligned headline, the funding articles in a
// "product window" listed like issues in an app, the portfolio as a name strip, the services in ruled
// columns, then title-left / text-right sections. Same texts as the Editorial home.
import Image from "next/image";
import Link from "next/link";
import { ABOUT, ABOUT_IMAGE, CERTIFICATES, HELP_TEXT, INTRO, PORTFOLIO, SOLUTIONS } from "@/components/pages/Home";
import { SERVICES } from "@/components/pages/ServicesIndex";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import StyleSwitcher from "@/components/StyleSwitcher";
import { FUNDING, postCards } from "@/lib/posts";
import s from "./nocturn.module.css";

const SHOWN = 7;

export default function Home() {
  const all = postCards();
  return (
    <div className={s.inner}>
      <div className={s.switchRow}>
        <StyleSwitcher current="nocturn" />
      </div>

      <section className={s.hero}>
        <h1 className={s.heroTitle}>{INTRO.title}</h1>
        <p className={s.heroSub}>{INTRO.lead}</p>
        <p className={s.heroSub}>{INTRO.text}</p>
        <div className={s.actions}>
          <Link className={s.button} href="/finantari-nerambursabile/">
            Finanțări nerambursabile
          </Link>
          <Link className={s.arrow} href="/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/">
            {INTRO.itLink}
          </Link>
        </div>

        <div className={s.window}>
          <div className={s.windowBar}>
            <h2 className={s.windowTitle}>
              Finanțări nerambursabile <span>{all.length}</span>
            </h2>
          </div>
          <ul className={s.rows}>
            {all.slice(0, SHOWN).map((p, i) => (
              <li key={p.path}>
                <Link className={s.row} href={p.path}>
                  <span className={s.code}>FN-{all.length - i}</span>
                  <span className={`${s.dot} ${p.label === FUNDING ? "" : s.dotNews}`} aria-hidden="true" />
                  <span className={s.rowTitle}>{p.title}</span>
                  <span className={s.tag}>{p.label}</span>
                  <span className={s.rowDate}>{p.shortDate}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link className={s.windowFoot} href="/finantari-nerambursabile/">
            Toate articolele ({all.length}) →
          </Link>
        </div>
      </section>

      <section aria-labelledby="n-proiecte">
        <ul className={s.strip}>
          {PORTFOLIO.map((p) => (
            <li key={p.href}>
              <a href={p.href} rel="noopener">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
        <h2 id="n-proiecte" className={`${s.label} ${s.stripCaption}`}>
          O parte din proiectele finalizate
        </h2>
      </section>

      <section className={s.split} aria-labelledby="n-servicii">
        <h2 id="n-servicii" className={s.splitTitle}>
          Servicii
        </h2>
      </section>
      <div className={s.columns}>
        {SERVICES.map((sv, i) => (
          <div key={sv.href} className={s.column}>
            <p className={s.label}>0.{i + 1}</p>
            <h3>{sv.title}</h3>
            <p>{sv.summary}</p>
            <Link className={s.arrow} href={sv.href}>
              Află mai mult
            </Link>
          </div>
        ))}
      </div>

      <section className={s.split} aria-labelledby="n-solutii">
        <h2 id="n-solutii" className={s.splitTitle}>
          Soluțiile noastre pentru dezvoltare
        </h2>
        <ul className={s.stack}>
          {SOLUTIONS.map((sol) => (
            <li key={sol.title}>
              <h3>{sol.title}</h3>
              <p>{sol.text}</p>
              <Link className={s.arrow} href={sol.href}>
                Vezi mai mult
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="n-despre">
        <div className={s.split}>
          <h2 id="n-despre" className={s.splitTitle}>
            Despre noi
          </h2>
          <div className={s.splitText}>
            {ABOUT.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link className={s.arrow} href="/contact/">
              Contactează-ne
            </Link>
          </div>
        </div>
        <div className={s.wideImage}>
          <Image src={ABOUT_IMAGE.src} alt={ABOUT_IMAGE.alt} fill sizes="(max-width: 860px) 100vw, 1040px" />
        </div>
      </section>

      <section className={s.split} aria-labelledby="n-iso">
        <h2 id="n-iso" className={s.splitTitle}>
          Suntem certificați ISO
        </h2>
        <div className={s.certs}>
          {CERTIFICATES.map((c) => (
            <a key={c.src} href={c.src}>
              <Image src={c.src} width={c.width} height={c.height} alt={`Certificat ${c.label}`} sizes="130px" />
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className={s.split} aria-label="Proiecte realizate">
        <p className={s.label}>Proiecte realizate</p>
        <ul className={s.shots}>
          {PORTFOLIO.map((p) => (
            <li key={p.href}>
              <a href={p.href} rel="noopener">
                <div className={s.shot}>
                  <Image src={p.shot} alt="" fill sizes="(max-width: 860px) 50vw, 300px" />
                </div>
                {p.name} <span>– {p.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.split} aria-labelledby="n-ajutor">
        <h2 id="n-ajutor" className={s.splitTitle}>
          Ai nevoie de ajutor?
        </h2>
        <div className={s.splitText}>
          <p>{HELP_TEXT}</p>
          <a className={s.phone} href={PHONE_HREF}>
            {PHONE_DISPLAY}
          </a>
          <p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
