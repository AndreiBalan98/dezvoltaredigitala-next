// /servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/ — text from the WordPress export,
// cleaned (spec 004; changes in tests/text-changes.mjs). The "Citește mai mult" toggles are gone: all text
// is shown. Stock photo of people removed.
import PageLayout from "@/components/article/PageLayout";
import { ButtonLink, DashList, Lead, Section, ServiceAreas, Steps } from "@/components/article/blocks";

export const summary =
  "Accesarea fondurilor nerambursabile poate fi un proces complex, iar o echipă de consultanță specializată îți poate crește semnificativ șansele de succes.";

export default function ConsultantaFonduri() {
  return (
    <PageLayout label="Servicii" title="Consultanță pentru accesarea fondurilor nerambursabile">
      <Section title="Servicii:">
        <DashList
          items={[
            "Identificarea oportunităților de finanțare (analiză eligibilitate, potrivirea proiectului cu un program de finanțare).",
            "Redactarea și depunerea cererilor de finanțare (documentație, plan de afaceri, studii de fezabilitate, bugetare).",
            "Implementare și management de proiect (asistență în raportare, monitorizare, respectarea condițiilor de finanțare).",
          ]}
        />
      </Section>

      <Section title="Avantajele consultanței profesionale">
        <Lead>
          Accesarea fondurilor nerambursabile poate fi un proces complex, iar o echipă de consultanță specializată îți
          poate crește semnificativ șansele de succes
        </Lead>
        <p>Iată principalele avantaje ale apelării la consultanță profesională:</p>
        <Steps
          items={[
            {
              title: "Evaluarea șanselor și calculul punctajului înainte de redactarea proiectului",
              text: "Analizăm criteriile de selecție și calculăm punctajul estimativ înainte de a începe redactarea proiectului. Dacă punctajul nu este suficient pentru aprobare, îți oferim soluții de îmbunătățire a proiectului pentru a crește șansele de succes. Evităm respingerea proiectului din cauza unui punctaj insuficient sau a unor aspecte neeligibile.",
            },
            {
              title: "Economie de timp și resurse",
              text: "Procesul de accesare a fondurilor implică multă birocrație – consultanții preiau acest efort, iar tu te poți concentra pe afacerea ta. Nu trebuie să înveți regulile complicate ale programelor de finanțare – experții se ocupă de tot. Eviți întârzierile cauzate de neînțelegeri privind regulile de eligibilitate.",
            },
            {
              title: "Alegerea programului de finanțare potrivit.",
              text: "Un consultant analizează profilul firmei tale și îți recomandă fondul nerambursabil cel mai avantajos. Te ghidează în identificarea celui mai potrivit apel de proiecte. Te ajută să eviți programele cu cerințe restrictive sau cu concurență foarte mare, maximizând șansele de succes.",
            },
            {
              title: "Optimizarea bugetului și planului de afaceri.",
              text: "Consultanții te ajută să îți planifici corect cheltuielile, astfel încât să respecți regulile finanțatorului. Îți oferă soluții pentru asigurarea cofinanțării (dacă este necesară). Pregătesc proiecții financiare realiste, astfel încât proiectul să fie fezabil și sustenabil pe termen lung.",
            },
            {
              title: "Sprijin în implementarea și raportarea proiectului",
              text: "După obținerea finanțării, consultanții te ajută să respecți condițiile impuse de finanțator. Se ocupă de pregătirea rapoartelor și documentelor necesare pentru decontarea cheltuielilor. Te asistă în gestionarea eventualelor inspecții sau audituri ale autorităților.",
            },
            {
              title: "Acces la surse alternative de finanțare",
              text: "Pe lângă fondurile europene, consultanții pot identifica și alte opțiuni de finanțare: granturi guvernamentale, credite preferențiale, finanțare prin investitori.",
            },
          ]}
        />
        <ButtonLink href="/contact/">Contactează-ne</ButtonLink>
      </Section>

      <ServiceAreas />
    </PageLayout>
  );
}
