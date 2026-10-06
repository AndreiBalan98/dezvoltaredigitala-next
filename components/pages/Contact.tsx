// /contact/ — address, phone, hours and e-mail from the old page (e-mail typo fixed). No form (PRODUCT.md
// non-goal for the demo).
import PageLayout from "@/components/article/PageLayout";
import { Prose } from "@/components/article/blocks";
import styles from "./pages.module.css";

export default function Contact() {
  return (
    <PageLayout label="Contact" title="Ai o întrebare? Scrie-ne aici">
      <Prose>
        <p>
          Dacă vrei să verificăm situația ta în detaliu sau să discutăm despre pașii necesari pentru depunerea
          proiectului, ne poți contacta:
        </p>
      </Prose>
      <div className={styles.contactLines}>
        <p className={styles.contactLabel}>Telefon</p>
        <p className={styles.contactBig}>
          <a href="tel:+40749589848">+40 749 589 848</a>
        </p>
        <p className={styles.contactLabel}>E-mail</p>
        <p className={styles.contactBig}>
          <a href="mailto:contact@dezvoltaredigitala.ro">contact@dezvoltaredigitala.ro</a>
        </p>
        <p className={styles.contactLabel}>Program</p>
        <p>L-V: 8-16</p>
        <p className={styles.contactLabel}>Adresă</p>
        <p>C&amp;A Connect S.R.L. Botoșani, Strada Doboșari, 79 H</p>
      </div>
    </PageLayout>
  );
}
