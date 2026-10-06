// /politica-de-confidentialitate/ and /termeni-si-conditii/ — the exported legal text, shown as is.
// Only WordPress classes/ids and empty paragraphs are dropped, and headings start at h2 (spec 004).
import PageLayout from "@/components/article/PageLayout";
import type { Entry } from "@/lib/content";
import styles from "./pages.module.css";

export function cleanLegalHtml(html: string): string {
  return html
    .replace(/\s(?:class|id)="[^"]*"/g, "")
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<(\/?)h[3-6]>/g, "<$1h2>");
}

export default function Legal({ entry }: { entry: Entry & { html: string } }) {
  return (
    <PageLayout label="Informații legale" title={entry.title}>
      <div className={styles.legal} dangerouslySetInnerHTML={{ __html: cleanLegalHtml(entry.html) }} />
    </PageLayout>
  );
}
