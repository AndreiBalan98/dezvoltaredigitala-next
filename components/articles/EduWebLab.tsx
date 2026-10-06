// Body of /877-2/ — text from the WordPress export, cleaned (spec 004; changes in tests/text-changes.mjs).
import { HelpBox, Lead, Prose } from "@/components/article/blocks";

export const summary =
  "C&A Connect te invită să fii parte din proiectul EduWebLab, un program dedicat susținerii tinerelor talente din domeniul IT și dezvoltării digitale a mediului de afaceri.";

export default function EduWebLab() {
  return (
    <>
      <Lead>
        C&amp;A Connect te invită să fii parte din proiectul EduWebLab, un program dedicat susținerii tinerelor
        talente din domeniul IT și dezvoltării digitale a mediului de afaceri.
      </Lead>
      <Prose>
        <p>
          În colaborare cu Universitatea „Ștefan cel Mare” din Suceava, oferim oportunitatea antreprenorilor de a
          beneficia de site-uri web create gratuit de studenți și experți IT.
        </p>
        <p>
          Dacă ești antreprenor și îți dorești un site profesional pentru afacerea ta, aplică acum pe{" "}
          <a href="https://www.eduweblab.ro/">www.eduweblab.ro</a> și profită de această oportunitate unică.
        </p>
      </Prose>
      <HelpBox>
        <p>
          Pentru informații suplimentare, ne poți contacta la: <a href="mailto:contact@eduweblab.ro">contact@eduweblab.ro</a>{" "}
          · <a href="https://www.eduweblab.ro/">www.eduweblab.ro</a>
        </p>
      </HelpBox>
    </>
  );
}
