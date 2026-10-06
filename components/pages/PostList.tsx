import Image from "next/image";
import Link from "next/link";
import { ARTICLES } from "@/components/articles";
import { posts } from "@/lib/content";
import styles from "./pages.module.css";

const dateFormat = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" });

/** Posts newest first (all, or the newest `limit`), each with image, date, title and summary. */
export default function PostList({ limit }: { limit?: number }) {
  const list = posts().slice(0, limit);
  return (
    <ul className={styles.posts}>
      {list.map((post) => {
        const article = ARTICLES[post.path];
        return (
          <li key={post.path} className={styles.post}>
            {post.featuredImage && (
              <div className={styles.postImage}>
                <Image src={post.featuredImage.src} alt="" fill sizes="(max-width: 640px) 100vw, 240px" />
              </div>
            )}
            <div>
              <p className={styles.postMeta}>
                {article?.label ?? "Finanțări nerambursabile"} ·{" "}
                <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
              </p>
              <h3 className={styles.postTitle}>
                <Link href={post.path}>{article?.title ?? post.title}</Link>
              </h3>
              {article && <p className={styles.postSummary}>{article.summary}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
