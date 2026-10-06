import Image from "next/image";
import type { Entry } from "@/lib/content";
import styles from "./article.module.css";

const dateFormat = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" });

// Shared frame for every funding article: kicker with the publish date, title, featured image, body.
export default function ArticleLayout({ entry, children }: { entry: Entry; children: React.ReactNode }) {
  const image = entry.featuredImage;
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <p className={styles.kicker}>
          Finanțări nerambursabile · <time dateTime={entry.date}>{dateFormat.format(new Date(entry.date))}</time>
        </p>
        <h1 className={styles.title}>{entry.title}</h1>
      </header>
      {image && (
        <figure className={styles.figure}>
          <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1100px) 100vw, 1040px" />
        </figure>
      )}
      <div className={styles.body}>{children}</div>
    </article>
  );
}
