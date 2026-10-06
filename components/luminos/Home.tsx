// Home in "Luminos" (spec 007, Apple-inspired): a stack of full-width tiles — the intro on black, the
// newest funding article with a huge image, a 2-column grid of the next articles, then services,
// solutions, about, certificates, portfolio and a contact tile. Same texts as the Editorial home.
import Image from "next/image";
import Link from "next/link";
import { ABOUT, ABOUT_IMAGE, CERTIFICATES, HELP_TEXT, INTRO, PORTFOLIO, SOLUTIONS } from "@/components/pages/Home";
import { SERVICES } from "@/components/pages/ServicesIndex";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import StyleSwitcher from "@/components/StyleSwitcher";
import { postCards } from "@/lib/posts";
import s from "./luminos.module.css";

export default function Home() {
  const [newest, ...rest] = postCards(5);
  return (
    <>
      <div className={s.switchRow}>
        <StyleSwitcher current="luminos" />
      </div>

      <section className={`${s.tile} ${s.tileDark}`}>
        <h1 className={s.giant}>{INTRO.title}</h1>
        <p className={s.sub}>{INTRO.lead}</p>
        <p className={s.subMuted}>{INTRO.text}</p>
        <div className={s.pills}>
          <Link className={s.pill} href="/finantari-nerambursabile/">
            Finanțări nerambursabile
          </Link>
          <Link className={s.pillOutline} href="/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/">
            {INTRO.itLink}
          </Link>
        </div>
      </section>

      <section className={s.tile} aria-labelledby="l-newest">
        <p className={s.eyebrow}>
          {newest.label} · {newest.dateText}
        </p>
        <h2 id="l-newest" className={s.giant}>
          {newest.title}
        </h2>
        <p className={s.sub}>{newest.summary}</p>
        <div className={s.pills}>
          <Link className={s.pill} href={newest.path}>
            Citește articolul
          </Link>
          <Link className={s.pillOutline} href="/finantari-nerambursabile/">
            Toate articolele
          </Link>
        </div>
        {newest.image && (
          <div className={s.tileImage}>
            <Image src={newest.image.src} alt={newest.image.alt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" />
          </div>
        )}
      </section>

      <div className={s.grid}>
        {rest.map((p, i) => (
          <section key={p.path} className={`${s.gridTile} ${i === 1 ? s.tileDark : ""}`}>
            <p className={s.eyebrow}>{p.label}</p>
            <h2 className={s.big}>{p.title}</h2>
            <p className={s.subMuted}>{p.summary}</p>
            <div className={s.pills}>
              <Link className={s.pill} href={p.path}>
                Citește articolul
              </Link>
            </div>
            {p.image ? (
              <div className={s.gridImage}>
                <Image src={p.image.src} alt="" fill sizes="(max-width: 680px) 100vw, 50vw" />
              </div>
            ) : (
              <div className={s.gridSpacer} />
            )}
          </section>
        ))}
      </div>

      <section className={`${s.section} ${s.sectionGrey}`} aria-labelledby="l-servicii">
        <h2 id="l-servicii" className={s.sectionHead}>
          Servicii
        </h2>
        <div className={s.cards2}>
          {SERVICES.map((sv) => (
            <div key={sv.href} className={s.card}>
              <h3>{sv.title}</h3>
              <p>{sv.summary}</p>
              <Link className={s.more} href={sv.href}>
                Află mai mult
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section} aria-labelledby="l-solutii">
        <h2 id="l-solutii" className={s.sectionHead}>
          Soluțiile noastre pentru dezvoltare
        </h2>
        <div className={s.cards4}>
          {SOLUTIONS.map((sol) => (
            <div key={sol.title} className={s.card}>
              <h3>{sol.title}</h3>
              <p>{sol.text}</p>
              <Link className={s.more} href={sol.href}>
                Vezi mai mult
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={s.sectionGrey} aria-labelledby="l-despre">
        <div className={s.bleed}>
          <Image src={ABOUT_IMAGE.src} alt={ABOUT_IMAGE.alt} fill sizes="100vw" />
        </div>
        <div className={`${s.section} ${s.narrowText}`}>
          <h2 id="l-despre" className={s.big}>
            Despre noi
          </h2>
          {ABOUT.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className={s.pills}>
            <Link className={s.pill} href="/contact/">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

      <section className={s.section} aria-labelledby="l-iso">
        <h2 id="l-iso" className={s.sectionHead}>
          Suntem certificați ISO
        </h2>
        <div className={s.certs}>
          {CERTIFICATES.map((c) => (
            <a key={c.src} href={c.src}>
              <Image src={c.src} width={c.width} height={c.height} alt={`Certificat ${c.label}`} sizes="170px" />
              {c.label}
            </a>
          ))}
        </div>
        <h2 className={s.sectionHead}>O parte din proiectele finalizate</h2>
        <ul className={s.portfolio}>
          {PORTFOLIO.map((p) => (
            <li key={p.href}>
              <a href={p.href} rel="noopener">
                <div className={s.shot}>
                  <Image src={p.shot} alt="" fill sizes="(max-width: 680px) 100vw, 330px" />
                </div>
                <h3>{p.name}</h3>
                <p>{p.kind}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.section} ${s.sectionGrey}`} aria-labelledby="l-ajutor">
        <div className={s.narrowText}>
          <h2 id="l-ajutor" className={s.big}>
            Ai nevoie de ajutor?
          </h2>
          <p>{HELP_TEXT}</p>
          <a className={s.phoneBig} href={PHONE_HREF}>
            {PHONE_DISPLAY}
          </a>
          <br />
          <a className={s.mailBig} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </section>
    </>
  );
}
