// Body of /investitii-pentru-modernizarea-microintreprinderilor/ — text from the WordPress export,
// cleaned (spec 004; changes in tests/text-changes.mjs).
import { DashList, HelpBox, Lead, Prose, Section } from "@/components/article/blocks";

export const summary =
  "Dacă ai o microîntreprindere și îți dorești să o modernizezi, acest program de finanțare este șansa ideală de a accesa fonduri nerambursabile.";

export default function ModernizareMicrointreprinderi() {
  return (
    <>
      <Lead>
        Dacă ai o microîntreprindere și îți dorești să o modernizezi, acest program de finanțare este șansa ideală de
        a accesa fonduri nerambursabile pentru investiții care îți pot transforma activitatea!
      </Lead>

      <Section title="Ce presupune acest apel de finanțare?">
        <p>Programul „Investiții pentru modernizarea microîntreprinderilor” oferă sprijin financiar pentru:</p>
        <DashList
          items={[
            "Lucrări de construire/ extindere/ modernizare a spațiilor de producție/ prestare de servicii ale microîntreprinderilor, inclusiv a utilităților generale aferente.",
            "Achiziționarea de echipamente tehnologice, utilaje, instalații de lucru, mobilier, echipamente informatice.",
            "Achiziționarea de instalații/ echipamente specifice în scopul obținerii unei economii de energie, precum și sisteme care utilizează surse regenerabile de energie pentru eficientizarea activităților pentru care s-a solicitat finanțare.",
            "Investiții în active necorporale: brevete, licențe, mărci comerciale, programe informatice.",
            "Activități de marketing și branding.",
          ]}
        />
      </Section>

      <Section title="Cine poate aplica?">
        <p>Microîntreprinderi din regiunea Nord-Est (Suceava, Botoșani, Neamț, Iași, Bacău și Vaslui).</p>
      </Section>

      <Section title="Cum te putem ajuta?">
        <DashList
          items={[
            "Oferim consultanță și suport pentru întocmirea dosarului de finanțare.",
            "Analizăm eligibilitatea afacerii tale și găsim cea mai bună strategie de aplicare.",
            "Asigurăm redactarea planului de afaceri și anexelor necesare obținerii finanțării.",
            "Înregistrarea și transmiterea cererii de finanțare, asistență pe toată perioada de evaluare, contractare și implementare.",
          ]}
        />
        <Prose>
          <p>
            Dacă vrei să îți optimizezi procesele, să devii mai competitiv și să îți crești afacerea, acum este
            momentul să aplici!
          </p>
        </Prose>
      </Section>

      <HelpBox>
        <p>Contactează-ne pentru mai multe informații și suport în depunerea proiectului!</p>
      </HelpBox>
    </>
  );
}
