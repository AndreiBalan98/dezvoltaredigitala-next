// Article in "Luminos" (spec 007, Apple-inspired): a sticky local bar with the title and one action,
// a centred giant headline, the featured image edge to edge, then the body in a narrow column.
import Image from "next/image";
import Link from "next/link";
import a from "@/components/article/article.module.css";
import type { Entry } from "@/lib/content";
import { CALCULATOR_ARTICLE, formatDate } from "@/lib/posts";
import s from "./luminos.module.css";

export default function Article({ entry, label, children }: { entry: Entry; label: string; children: React.ReactNode }) {
  const action =
    entry.path === CALCULATOR_ARTICLE
      ? { href: "/calculator-baterii/", text: "Calculează-ți punctajul" }
      : { href: "/contact/", text: "Contactează-ne" };
  return (
    <article>
      <div className={s.localBar}>
        <div className={s.localInner}>
          <span className={s.localTitle}>{entry.title}</span>
          <Link className={s.localPill} href={action.href}>
            {action.text}
          </Link>
        </div>
      </div>
      <header className={s.articleHead}>
        <p className={s.eyebrow}>{label}</p>
        <h1 className={s.giant}>{entry.title}</h1>
        <p className={s.articleDate}>
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        </p>
      </header>
      {entry.featuredImage && (
        <figure className={s.hero}>
          <Image src={entry.featuredImage.src} alt={entry.featuredImage.alt} fill priority sizes="100vw" />
        </figure>
      )}
      <div className={`${a.body} ${s.articleBody}`}>{children}</div>
    </article>
  );
}
