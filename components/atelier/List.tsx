// /finantari-nerambursabile/ in "Atelier" (spec 008): articles as catalogue entries, grouped by label
// (funding calls first, then news), each group with its count.
import Image from "next/image";
import Link from "next/link";
import { FUNDING, postCards } from "@/lib/posts";
import s from "./atelier.module.css";

const sectionId = (label: string) => (label === FUNDING ? "finantari" : "noutati");

export default function List() {
  const posts = postCards();
  const labels = [...new Set(posts.map((p) => p.label))];
  return (
    <div className={s.wrap}>
      <header className={s.pageHead}>
        <p className={s.eyebrow}>Dezvoltare digitală</p>
        <h1 className={s.pageTitle}>Finanțări nerambursabile</h1>
        <p className={s.filters}>
          {labels.map((label) => (
            <a key={label} href={`#${sectionId(label)}`} className={s.filter}>
              {label} <span>{posts.filter((p) => p.label === label).length}</span>
            </a>
          ))}
        </p>
      </header>

      {labels.map((label, i) => (
        <section key={label} id={sectionId(label)} className={s.section} aria-labelledby={`al-${i}`}>
          <div className={s.sectionHead}>
            <h2 id={`al-${i}`}>{label}</h2>
          </div>
          <ul className={s.posts}>
            {posts
              .filter((p) => p.label === label)
              .map((p) => (
                <li key={p.path} className={s.post}>
                  <div className={s.postImage}>
                    {p.image && <Image src={p.image.src} alt="" fill sizes="(max-width: 760px) 100vw, 360px" />}
                  </div>
                  <div className={s.postText}>
                    <span className={label === FUNDING ? s.tagFunding : s.tag}>{p.label}</span>
                    <h3 className={s.cardTitle}>
                      <Link href={p.path}>{p.title}</Link>
                    </h3>
                    {p.summary && <p className={s.postSummary}>{p.summary}</p>}
                    <p className={s.postDate}>
                      <time dateTime={p.date}>{p.dateText}</time>
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
