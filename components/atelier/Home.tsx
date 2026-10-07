// Home in "Atelier" (spec 008): the intro beside two "doors" (funding / software), then the services as
// catalogue cards, the newest articles, solutions, about, ISO and portfolio.
import Image from "next/image";
import Link from "next/link";
import { SERVICE_DETAILS, serviceAnchor } from "@/components/focus/data";
import { ABOUT, ABOUT_IMAGE, CERTIFICATES, INTRO, PORTFOLIO, SOLUTIONS } from "@/components/pages/Home";
import StyleSwitcher from "@/components/StyleSwitcher";
import { postCards } from "@/lib/posts";
import s from "./atelier.module.css";

export default function Home() {
  const funding = SERVICE_DETAILS.filter((d) => d.line === "Finanțări");
  const software = SERVICE_DETAILS.filter((d) => d.line === "Software");
  return (
    <>
      <div className={s.wrap}>
        <div className={s.switchRow}>
          <StyleSwitcher current="atelier" />
        </div>

        <section className={s.hero}>
          <div>
            <h1 className={s.heroTitle}>{INTRO.title}</h1>
            <p className={s.lead}>{INTRO.lead}</p>
            <p className={s.muted}>{INTRO.text}</p>
          </div>
          <div className={s.doors}>
            <div className={s.door}>
              <span className={s.tagFunding}>Finanțări</span>
              {funding.map((d) => (
                <p key={d.id} className={s.doorTitle}>
                  <Link href={`/servicii/#${d.id}`}>{d.title}</Link>
                </p>
              ))}
              <p className={s.doorLinks}>
                <Link href="/finantari-nerambursabile/">Finanțări nerambursabile</Link>
                <Link href="/calculator-baterii/">Calculator punctaj baterii</Link>
              </p>
            </div>
            <div className={s.door}>
              <span className={s.tag}>Software</span>
              <ul className={s.doorList}>
                {software.map((d) => (
                  <li key={d.id}>
                    <Link href={`/servicii/#${d.id}`}>{d.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={s.section} aria-labelledby="a-servicii">
          <div className={s.sectionHead}>
            <h2 id="a-servicii">Servicii</h2>
            <Link href="/servicii/">Toate serviciile</Link>
          </div>
          <ul className={s.catalog}>
            {SERVICE_DETAILS.map((d) => (
              <li key={d.id} className={s.catalogCard}>
                <span className={d.line === "Finanțări" ? s.tagFunding : s.tag}>{d.line}</span>
                <h3 className={s.cardTitle}>
                  <Link href={`/servicii/#${d.id}`}>{d.title}</Link>
                </h3>
                <p>{d.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="a-finantari">
          <div className={s.sectionHead}>
            <h2 id="a-finantari">Finanțări nerambursabile</h2>
            <Link href="/finantari-nerambursabile/">Toate articolele</Link>
          </div>
          <ul className={s.posts}>
            {postCards(3).map((p) => (
              <li key={p.path} className={s.post}>
                <div className={s.postImage}>
                  {p.image && <Image src={p.image.src} alt="" fill sizes="(max-width: 760px) 100vw, 360px" />}
                </div>
                <div className={s.postText}>
                  <span className={s.tagFunding}>{p.label}</span>
                  <h3 className={s.cardTitle}>
                    <Link href={p.path}>{p.title}</Link>
                  </h3>
                  <p className={s.postDate}>
                    <time dateTime={p.date}>{p.dateText}</time>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.section} aria-labelledby="a-solutii">
          <div className={s.sectionHead}>
            <h2 id="a-solutii">Soluțiile noastre pentru dezvoltare</h2>
          </div>
          <ul className={s.solutions}>
            {SOLUTIONS.map((sol) => (
              <li key={sol.title}>
                <h3>{sol.title}</h3>
                <p>{sol.text}</p>
                <Link href={serviceAnchor(sol.href)}>Vezi mai mult</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${s.section} ${s.about}`} aria-labelledby="a-despre">
          <div className={s.aboutImage}>
            <Image src={ABOUT_IMAGE.src} alt={ABOUT_IMAGE.alt} fill sizes="(max-width: 860px) 100vw, 520px" />
          </div>
          <div>
            <h2 id="a-despre" className={s.h2}>
              Despre noi
            </h2>
            {ABOUT.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className={s.certRow}>
              {CERTIFICATES.map((c) => (
                <a key={c.src} href={c.src} className={s.certChip}>
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={s.section} aria-labelledby="a-proiecte">
          <div className={s.sectionHead}>
            <h2 id="a-proiecte">O parte din proiectele finalizate</h2>
          </div>
          <ul className={s.portfolio}>
            {PORTFOLIO.map((p) => (
              <li key={p.href}>
                <a href={p.href} rel="noopener">
                  <div className={s.shot}>
                    <Image src={p.shot} alt="" fill sizes="(max-width: 640px) 100vw, 360px" />
                  </div>
                  <span className={s.shotName}>{p.name}</span>
                  <span className={s.shotKind}>{p.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
