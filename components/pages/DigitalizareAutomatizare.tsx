// /servicii/digitalizare-si-automatizare/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs). Stock photos of people removed.
import PageLayout from "@/components/article/PageLayout";
import { ButtonLink, DashList, Lead, Prose, Section, ServiceAreas, Steps } from "@/components/article/blocks";

export const summary =
  "Vă oferim o gamă variată de servicii de automatizare a proceselor software, bazate pe tehnologii avansate precum roboți software și Internet of Things (IOT).";

// Lists shared with the focused designs' services pages (spec 008).
export const BENEFITS = [
  "Creșterea eficienței și productivității organizației",
  "Reducerea costurilor și riscurilor operaționale",
  "Îmbunătățirea satisfacției clienților și angajaților",
  "Accesarea de informații și date în timp real",
  "Adaptarea rapidă la schimbările pieței și ale cerințelor legale",
];

export const STEPS = [
  {
    title: "Identifică procesele care pot fi automatizate.",
    text: "Acestea sunt de obicei sarcini repetitive, complexe și de mare volum, care nu necesită intervenție umană sau creativitate. De exemplu, introducerea datelor, generarea rapoartelor, validarea facturilor, procesarea comenzilor, etc.",
  },
  {
    title: "Alege o soluție software potrivită pentru nevoile tale.",
    text: "Există pe piață diferite soluții software care oferă servicii de automatizare a proceselor software, bazate pe tehnologii avansate precum roboți software și Internet of Things (IOT). Trebuie să alegi o soluție care să fie personalizabilă, scalabilă, sigură și eficientă.",
  },
  {
    title: "Colaborează cu echipa noastră de specialiști.",
    text: "Pentru a implementa cu succes roboți software în afacerea ta, ai nevoie de ajutorul unei echipe de specialiști în domeniul software, care să te consilieze, să îți ofere suport tehnic și să îți asigure mentenanța și actualizarea soluției software.",
  },
  {
    title: "Monitorizează și evaluează rezultatele.",
    text: "După ce ai implementat roboți software în afacerea ta, trebuie să monitorizezi și să evaluezi rezultatele obținute. Poți folosi instrumente de analiză a datelor și generare de rapoarte, care să îți arate gradul de eficiență și productivitate al roboților software.",
  },
];

export default function DigitalizareAutomatizare() {
  return (
    <PageLayout label="Servicii" title="Digitalizare și automatizare">
      <Section title="Servicii de furnizare de ERP, CMS, și digitalizarea afacerii">
        <Prose>
          <p>
            Folosim cele mai noi tehnologii și metodologii de lucru, pentru a asigura calitatea și securitatea
            produselor noastre.
          </p>
          <p>
            Avem o echipă de experți în domeniul IT, care vă pot oferi consultanță, proiectare, dezvoltare,
            implementare, testare, întreținere și suport tehnic pentru soluțiile software pe care le livrăm.
          </p>
        </Prose>
      </Section>

      <Section title="Beneficii diverse, asigurate printr-o colaborare continuă">
        <DashList items={BENEFITS} />
        <ButtonLink href="/contact/">Contactează-ne</ButtonLink>
      </Section>

      <Section title="Automatizare roboți software și IOT">
        <Lead>Cum vă pot ajuta aceste tehnologii să vă optimizați afacerea?</Lead>
        <Prose>
          <p>
            Într-o lume din ce în ce mai conectată și competitivă, este esențial să găsiți soluții eficiente pentru a vă
            îmbunătăți performanța și productivitatea afacerii dumneavoastră.
          </p>
          <p>
            De aceea, vă oferim o gamă variată de servicii de automatizare a proceselor software, bazate pe tehnologii
            avansate precum roboți software și Internet of Things (IOT).
          </p>
        </Prose>
      </Section>

      <Section title="Pentru a integra roboți software în afacerea ta, trebuie să urmezi câțiva pași esențiali:">
        <Steps items={STEPS} />
        <ButtonLink href="/contact/">Contactează-ne</ButtonLink>
      </Section>

      <ServiceAreas />
    </PageLayout>
  );
}
