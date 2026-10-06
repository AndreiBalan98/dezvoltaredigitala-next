// /finantari-nerambursabile/ in "Luminos" (spec 007, Apple-inspired): a newsroom — the newest article as
// a large card, the rest as a 3-column grid of cards.
import Image from "next/image";
import Link from "next/link";
import { postCards, type PostCard } from "@/lib/posts";
import s from "./luminos.module.css";

function CardText({ post }: { post: PostCard }) {
  return (
    <>
      <p className={s.newsLabel}>{post.label}</p>
      <h2 className={s.newsTitle}>
        <Link href={post.path}>{post.title}</Link>
      </h2>
      {post.summary && <p className={s.newsSummary}>{post.summary}</p>}
      <p className={s.newsDate}>
        <time dateTime={post.date}>{post.dateText}</time>
      </p>
    </>
  );
}

export default function List() {
  const [first, ...rest] = postCards();
  return (
    <div className={s.list}>
      <h1 className={s.listTitle}>Finanțări nerambursabile</h1>
      <div className={s.featured}>
        <div className={s.featuredImage}>
          {first.image && <Image src={first.image.src} alt="" fill priority sizes="(max-width: 680px) 100vw, 600px" />}
        </div>
        <div className={s.featuredText}>
          <CardText post={first} />
        </div>
      </div>
      <ul className={s.newsGrid}>
        {rest.map((post) => (
          <li key={post.path} className={s.newsCard}>
            <div className={s.newsImage}>
              {post.image && <Image src={post.image.src} alt="" fill sizes="(max-width: 680px) 100vw, 330px" />}
            </div>
            <div className={s.newsText}>
              <CardText post={post} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
