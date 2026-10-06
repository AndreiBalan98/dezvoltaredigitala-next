import styles from "./article.module.css";

// Frame for pages that are not articles (services, contact, legal): kicker label, title, body.
export default function PageLayout({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.article}>
      <header className={`${styles.header} ${styles.pageHeader}`}>
        <p className={styles.kicker}>{label}</p>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
