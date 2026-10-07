// /finantari-nerambursabile/ in "Grilă" (spec 008): a poster-like ruled index — giant title, then one
// row per article: date, title, label; the newest row carries its image and summary.
import Image from "next/image";
import Link from "next/link";
import { postCards } from "@/lib/posts";
import s from "./grila.module.css";

export default function List() {
  const [newest, ...rest] = postCards();
  return (
    <div className={s.wrap}>
      <header className={s.pageHead}>
        <h1 className={s.poster}>Finanțări nerambursabile</h1>
      </header>

      <article className={s.leadStory}>
        <div className={s.leadImage}>
          {newest.image && <Image src={newest.image.src} alt="" fill priority sizes="(max-width: 860px) 100vw, 50vw" />}
        </div>
        <div>
          <p className={s.indexTag}>
            {newest.label} · <time dateTime={newest.date}>{newest.dateText}</time>
          </p>
          <h2 className={s.leadTitle}>
            <Link href={newest.path}>{newest.title}</Link>
          </h2>
          <p>{newest.summary}</p>
        </div>
      </article>

      <table className={s.ruled}>
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Articol</th>
            <th scope="col" className={s.ruledLabel}>
              Categorie
            </th>
          </tr>
        </thead>
        <tbody>
          {rest.map((p) => (
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
    </div>
  );
}
