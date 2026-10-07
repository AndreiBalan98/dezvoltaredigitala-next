// Article in "Grilă" (spec 008): giant title across the grid, the image full width, then the body in the
// middle columns with the article's key numbers as huge figures in the left margin.
import Image from "next/image";
import Link from "next/link";
import a from "@/components/article/article.module.css";
import { DESIGNED_ARTICLE } from "@/components/focus/data";
import type { Entry } from "@/lib/content";
import { formatDate } from "@/lib/posts";
import s from "./grila.module.css";

// The designed article's numbers, each with its own sentence from the body (word for word).
const FIGURES: Record<string, { figure: string; text: string }[]> = {
  [DESIGNED_ARTICLE]: [
    { figure: "15.000 lei", text: "Finanțare de până la 15.000 lei" },
    { figure: "75%", text: "AFM poate acoperi maximum 75% din valoarea totală a proiectului" },
    { figure: "10 kWh", text: "Sistem de stocare de minimum 10 kWh" },
    { figure: "100", text: "Proiectele pot obține maximum 100 de puncte" },
  ],
};

export default function Article({ entry, label, children }: { entry: Entry; label: string; children: React.ReactNode }) {
  const figures = FIGURES[entry.path] ?? [];
  return (
    <div className={s.wrap}>
      <article>
        <header className={s.articleHead}>
          <p className={s.indexTag}>
            <Link href="/finantari-nerambursabile/">{label}</Link> · <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          </p>
          <h1 className={s.articleTitle}>{entry.title}</h1>
        </header>
        {entry.featuredImage && (
          <figure className={s.articleImage}>
            <Image src={entry.featuredImage.src} alt={entry.featuredImage.alt} fill priority sizes="(max-width: 1280px) 100vw, 1240px" />
          </figure>
        )}
        <div className={s.articleGrid}>
          <aside className={s.margin} aria-label="În cifre">
            {figures.map((f) => (
              <p key={f.figure}>
                <span className={s.marginFigure}>{f.figure}</span>
                <span className={s.marginText}>{f.text}</span>
              </p>
            ))}
            <Link className={s.blackButton} href="/calculator-baterii/">
              Calculează-ți punctajul
            </Link>
          </aside>
          <div className={`${a.body} ${s.articleBody}`}>{children}</div>
        </div>
      </article>
    </div>
  );
}
