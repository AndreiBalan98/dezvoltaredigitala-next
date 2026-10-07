// Home in "Grilă" (spec 008, the design's focus): a poster. The title, then the two lines of business as
// giant words side by side, a numbered services index, the newest articles as a ruled table, big
// figures counted from the content, portfolio screenshots in an uneven grid, about, and the phone number
// as the last giant line.
import Image from "next/image";
import Link from "next/link";
import { SERVICE_DETAILS } from "@/components/focus/data";
import { ABOUT, ABOUT_IMAGE, CERTIFICATES, HELP_TEXT, INTRO, PORTFOLIO } from "@/components/pages/Home";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import StyleSwitcher from "@/components/StyleSwitcher";
import { postCards } from "@/lib/posts";
import s from "./grila.module.css";

export default function Home() {
  const all = postCards();
  const fonduri = SERVICE_DETAILS.find((d) => d.line === "Finanțări")!;
  const figures = [
    { n: all.length, label: "articole" },
    { n: SERVICE_DETAILS.length, label: "servicii" },
    { n: PORTFOLIO.length, label: "proiecte finalizate" },
    { n: CERTIFICATES.length, label: "certificări ISO" },
  ];
  return (
    <div className={s.wrap}>
      <div className={s.switchRow}>
        <StyleSwitcher current="grila" />
      </div>

      <section className={s.opening}>
        <h1 className={s.poster}>{INTRO.title}</h1>
        <p className={s.openingText}>{INTRO.lead}</p>
      </section>

      <section className={s.halves} aria-label="Ce facem">
        <div className={s.half}>
          <p className={s.giantWord} aria-hidden="true">
            Software
          </p>
          <h2 className={s.halfTitle}>Software și digitalizare</h2>
          <p>{ABOUT[0]}</p>
          <Link className={s.arrowLink} href="/servicii/#consultanta-it">
            Servicii
          </Link>
        </div>
        <div className={`${s.half} ${s.halfAccent}`}>
          <p className={s.giantWord} aria-hidden="true">
            Finanțări
          </p>
          <h2 className={s.halfTitle}>Finanțări nerambursabile</h2>
          <p>{fonduri.summary}</p>
          <Link className={s.arrowLink} href="/finantari-nerambursabile/">
            Toate articolele
          </Link>
        </div>
      </section>

      <section className={s.block} aria-labelledby="x-servicii">
        <h2 id="x-servicii" className={s.blockLabel}>
          Servicii
        </h2>
        <ol className={s.index}>
          {SERVICE_DETAILS.map((d, i) => (
            <li key={d.id}>
              <Link href={`/servicii/#${d.id}`} className={s.indexRow}>
                <span className={s.indexNo}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.indexTitle}>{d.title}</span>
                <span className={s.indexTag}>{d.line}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.block} aria-labelledby="x-noi">
        <div className={s.blockHead}>
          <h2 id="x-noi" className={s.blockLabel}>
            Finanțări nerambursabile
          </h2>
          <Link href="/finantari-nerambursabile/">Toate articolele</Link>
        </div>
        <table className={s.ruled}>
          <tbody>
            {all.slice(0, 3).map((p) => (
              <tr key={p.path}>
                <td className={s.ruledDate}>
                  <time dateTime={p.date}>{p.shortDate}</time>
                </td>
                <th scope="row">
                  <Link href={p.path}>{p.title}</Link>
                </th>
                <td className={s.ruledLabel}>{p.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={s.figures} aria-label="În cifre">
        {figures.map((f) => (
          <p key={f.label}>
            <span className={s.figure}>{f.n}</span>
            <span className={s.figureLabel}>{f.label}</span>
          </p>
        ))}
      </section>

      <section className={s.block} aria-labelledby="x-proiecte">
        <h2 id="x-proiecte" className={s.blockLabel}>
          O parte din proiectele finalizate
        </h2>
        <ul className={s.mosaic}>
          {PORTFOLIO.map((p) => (
            <li key={p.href}>
              <a href={p.href} rel="noopener">
                <div className={s.mosaicShot}>
                  <Image src={p.shot} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <span className={s.mosaicName}>{p.name}</span>
                <span className={s.mosaicKind}>{p.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.block} ${s.about}`} aria-labelledby="x-despre">
        <div className={s.aboutImage}>
          <Image src={ABOUT_IMAGE.src} alt={ABOUT_IMAGE.alt} fill sizes="(max-width: 860px) 100vw, 60vw" />
        </div>
        <div>
          <h2 id="x-despre" className={s.blockLabel}>
            Despre noi
          </h2>
          {ABOUT.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className={s.isoLine}>
            Suntem certificați ISO:{" "}
            {CERTIFICATES.map((c, i) => (
              <span key={c.src}>
                {i > 0 && " · "}
                <a href={c.src}>{c.label}</a>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className={`${s.block} ${s.closing}`} aria-labelledby="x-ajutor">
        <h2 id="x-ajutor" className={s.blockLabel}>
          Ai nevoie de ajutor?
        </h2>
        <p className={s.closingText}>{HELP_TEXT}</p>
        <a className={s.phone} href={PHONE_HREF}>
          {PHONE_DISPLAY}
        </a>
        <a className={s.mail} href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </section>
    </div>
  );
}
