// Article in "Atelier" (spec 008): the key facts as a spec sheet beside the text, with the calculator as
// the "product" action, and the featured image in a framed panel under the title.
import Image from "next/image";
import Link from "next/link";
import a from "@/components/article/article.module.css";
import { KEY_FACTS } from "@/components/focus/data";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import type { Entry } from "@/lib/content";
import { formatDate } from "@/lib/posts";
import s from "./atelier.module.css";

export default function Article({ entry, label, children }: { entry: Entry; label: string; children: React.ReactNode }) {
  const facts = KEY_FACTS[entry.path] ?? [];
  return (
    <div className={s.wrap}>
      <article>
        <header className={s.articleHead}>
          <p className={s.crumb}>
            <Link href="/finantari-nerambursabile/">Finanțări nerambursabile</Link>
          </p>
          <span className={s.tagFunding}>{label}</span>
          <h1 className={s.pageTitle}>{entry.title}</h1>
          <p className={s.postDate}>
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          </p>
        </header>
        {entry.featuredImage && (
          <figure className={s.articleImage}>
            <Image src={entry.featuredImage.src} alt={entry.featuredImage.alt} fill priority sizes="(max-width: 1120px) 100vw, 1080px" />
          </figure>
        )}
        <div className={s.articleGrid}>
          <div className={`${a.body} ${s.articleBody}`}>{children}</div>
          <aside className={s.sheet} aria-labelledby="fisa">
            <h2 id="fisa" className={s.sheetTitle}>
              Pe scurt
            </h2>
            <ul className={s.sheetList}>
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link className={s.sheetButton} href="/calculator-baterii/">
              Calculează-ți punctajul
            </Link>
            <p className={s.sheetContact}>
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </aside>
        </div>
      </article>
    </div>
  );
}
