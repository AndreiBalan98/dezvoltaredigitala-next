// Article in "Ghid" (spec 008, the design's focus): breadcrumbs, title and date, a "Pe scurt" panel with
// the key facts and the calculator as a start button, then a sticky "Cuprins" beside the body.
import Image from "next/image";
import Link from "next/link";
import a from "@/components/article/article.module.css";
import Contents from "@/components/focus/Contents";
import { KEY_FACTS } from "@/components/focus/data";
import type { Entry } from "@/lib/content";
import { formatDate } from "@/lib/posts";
import { Breadcrumbs } from "./Header";
import s from "./ghid.module.css";

export default function Article({ entry, label, children }: { entry: Entry; label: string; children: React.ReactNode }) {
  const short = KEY_FACTS[entry.path];
  return (
    <div className={s.wrap}>
      <Breadcrumbs trail={[{ href: "/finantari-nerambursabile/", label: "Finanțări nerambursabile" }]} />
      <article className={s.guide}>
        <header className={s.guideHead}>
          <p className={s.caption}>{label}</p>
          <h1 className={s.title}>{entry.title}</h1>
          <p className={s.meta}>
            Publicat pe <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          </p>
        </header>

        {short && (
          <section className={s.short} aria-labelledby="pe-scurt">
            <h2 id="pe-scurt">Pe scurt</h2>
            <ul>
              {short.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link className={s.start} href="/calculator-baterii/">
              Calculează-ți punctajul
              <svg aria-hidden="true" viewBox="0 0 33 40" width="17" height="19">
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </Link>
          </section>
        )}

        <div className={s.guideGrid}>
          <aside className={s.side}>
            <Contents
              scan="#corp-articol"
              classes={{ root: s.contents, heading: s.contentsHeading, toggle: s.contentsToggle, list: s.contentsList, open: s.contentsOpen, active: s.contentsActive }}
            />
          </aside>
          <div id="corp-articol" className={s.guideBody}>
            {entry.featuredImage && (
              <figure className={s.figure}>
                <Image src={entry.featuredImage.src} alt={entry.featuredImage.alt} fill priority sizes="(max-width: 900px) 100vw, 640px" />
              </figure>
            )}
            <div className={a.body}>{children}</div>
          </div>
        </div>
      </article>
    </div>
  );
}
