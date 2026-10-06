// /finantari-nerambursabile/ in "Nocturn" (spec 007, Linear-inspired): a changelog-style timeline —
// the date with a dot in a left column, the article (label, title, image, summary) on the right.
import Image from "next/image";
import Link from "next/link";
import { postCards } from "@/lib/posts";
import s from "./nocturn.module.css";

export default function List() {
  return (
    <div className={s.inner}>
      <header className={s.pageHead}>
        <h1 className={s.pageTitle}>Finanțări nerambursabile</h1>
      </header>
      <ol className={s.entries}>
        {postCards().map((post, i) => (
          <li key={post.path} className={s.entry}>
            <p className={s.when}>
              <time dateTime={post.date}>{post.dateText}</time>
            </p>
            <div>
              <p className={s.entryLabel}>{post.label}</p>
              <h2 className={s.entryTitle}>
                <Link href={post.path}>{post.title}</Link>
              </h2>
              {post.image && (
                <div className={s.entryImage}>
                  <Image src={post.image.src} alt="" fill priority={i === 0} sizes="(max-width: 860px) 100vw, 720px" />
                </div>
              )}
              {post.summary && <p className={s.entrySummary}>{post.summary}</p>}
              <Link className={s.arrow} href={post.path}>
                Citește articolul
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
