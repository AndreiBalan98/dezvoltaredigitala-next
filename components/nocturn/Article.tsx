// Article in "Nocturn" (spec 007, Linear-inspired): breadcrumb and title on the left, the body in the
// main column and a sticky "properties" panel on the right (category, date, the next action, contact).
import Image from "next/image";
import Link from "next/link";
import a from "@/components/article/article.module.css";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import type { Entry } from "@/lib/content";
import { CALCULATOR_ARTICLE, FUNDING, formatDate } from "@/lib/posts";
import s from "./nocturn.module.css";

export default function Article({ entry, label, children }: { entry: Entry; label: string; children: React.ReactNode }) {
  const action =
    entry.path === CALCULATOR_ARTICLE
      ? { href: "/calculator-baterii/", text: "Calculează-ți punctajul" }
      : { href: "/contact/", text: "Contactează-ne" };
  return (
    <article className={s.inner}>
      <p className={s.crumbs}>
        <Link href="/finantari-nerambursabile/">{FUNDING}</Link>
        {label !== FUNDING && ` / ${label}`}
      </p>
      <h1 className={s.articleTitle}>{entry.title}</h1>
      <div className={s.articleGrid}>
        <div className={s.articleMain}>
          {entry.featuredImage && (
            <figure className={s.figure}>
              <Image src={entry.featuredImage.src} alt={entry.featuredImage.alt} fill priority sizes="(max-width: 860px) 100vw, 700px" />
            </figure>
          )}
          <div className={a.body}>{children}</div>
        </div>
        <aside className={s.panel} aria-label="Despre articol">
          <dl className={s.props}>
            <dt>Categorie</dt>
            <dd>{label}</dd>
            <dt>Publicat</dt>
            <dd>
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            </dd>
          </dl>
          <div className={s.panelActions}>
            <Link className={s.button} href={action.href}>
              {action.text}
            </Link>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </aside>
      </div>
    </article>
  );
}
