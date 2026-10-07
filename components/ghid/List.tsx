// /finantari-nerambursabile/ in "Ghid" (spec 008): a guide index — the newest article as a featured entry,
// the rest grouped by year, each with its label, date and summary.
import Link from "next/link";
import { postCards, type PostCard } from "@/lib/posts";
import { Breadcrumbs } from "./Header";
import s from "./ghid.module.css";

function Entry({ post }: { post: PostCard }) {
  return (
    <li className={s.entry}>
      <h3 className={s.entryTitle}>
        <Link href={post.path}>{post.title}</Link>
      </h3>
      {post.summary && <p className={s.entrySummary}>{post.summary}</p>}
      <p className={s.entryMeta}>
        {post.label} · <time dateTime={post.date}>{post.dateText}</time>
      </p>
    </li>
  );
}

export default function List() {
  const [newest, ...rest] = postCards();
  const years = [...new Set(rest.map((p) => p.date.slice(0, 4)))];
  return (
    <div className={s.wrap}>
      <Breadcrumbs trail={[]} />
      <div className={s.twoThirds}>
        <h1 className={s.title}>Finanțări nerambursabile</h1>

        <section className={s.featured} aria-labelledby="g-cel-mai-nou">
          <h2 id="g-cel-mai-nou" className={s.caption}>
            Cel mai nou
          </h2>
          <ul className={s.entries}>
            <Entry post={newest} />
          </ul>
        </section>

        {years.map((year) => (
          <section key={year} aria-labelledby={`g-an-${year}`}>
            <h2 id={`g-an-${year}`} className={s.yearHead}>
              {year}
            </h2>
            <ul className={s.entries}>
              {rest
                .filter((p) => p.date.startsWith(year))
                .map((p) => (
                  <Entry key={p.path} post={p} />
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
