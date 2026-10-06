// /servicii/consultanta-solutii-it-si-studii-de-fezabilitate/ — text from the WordPress export, cleaned
// (spec 004; changes in tests/text-changes.mjs). Stock photos of people removed.
import PageLayout from "@/components/article/PageLayout";
import { ButtonLink, DashList, Figure, Lead, Prose, Section, ServiceAreas } from "@/components/article/blocks";

export const summary =
  "Prin colaborarea cu acești specialiști, vei putea identifica o strategie eficientă de digitalizare, beneficiind de perspective relevante asupra tendințelor actuale din domeniul tehnologic.";

export default function ConsultantaIt() {
  return (
    <PageLayout label="Servicii" title="Consultanță soluții IT și studii de fezabilitate">
      <Lead>
        Dacă te afli în etapa de explorare a digitalizării sau ai deja un proiect în desfășurare, consultarea cu experți
        din industria IT sau a specialiștilor în consultanță în afaceri reprezintă un pas esențial pentru a asigura
        succesul inițiativei tale digitale.
      </Lead>

      <Section title="Consultanță IT digitalizare">
        <Prose>
          <p>
            Prin colaborarea cu acești specialiști, vei putea identifica o strategie eficientă de digitalizare,
            beneficiind de perspective relevante asupra tendințelor actuale din domeniul tehnologic.
          </p>
          <p>
            Consultanța lor poate acoperi diverse aspecte, de la selecția tehnologiilor potrivite la optimizarea
            proceselor operaționale, contribuind astfel la transformarea digitală reușită a afacerii tale.
          </p>
        </Prose>
      </Section>

      <Section title="Ce servicii oferim ?">
        <DashList
          items={[
            "Analiza fezabilității digitalizării uneia sau mai multor activități dintre cele autorizate: se stabilesc activitățile specifice care pot beneficia de programul de digitalizare;",
            "Colectare, interpretare și validare informații privind indicatorii DESI (Digital Economy & Society Index) la momentul analizei: se analizează fiecare indicator DESI;",
            "Propunere minim 1 soluție de digitalizare, cu detalierea domeniilor de aplicare;",
            "Studiu de fezabilitate digitală conform cu cerințele din Ghidul PR Nord-Est Transformarea digitală a IMM-urilor orientată către creșterea intensității digitale;",
            "Suport pentru realizarea studiului de piață (minim 2 oferte) aferente soluțiilor de digitalizare propuse;",
          ]}
        />
        <ButtonLink href="/contact/">Contactează-ne</ButtonLink>
        <Figure
          src="/media/2025/02/close-up-server-hub-it-professional-debugging-optimizing-code-scaled.jpg"
          width={2560}
          height={1707}
          alt=""
        />
      </Section>

      <ServiceAreas />
    </PageLayout>
  );
}
