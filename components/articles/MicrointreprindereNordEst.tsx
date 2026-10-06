// Body of /ai-o-microintreprindere-in-regiunea-nord-est-si-te-gandesti-sa-o-modernizezi/ — text from the
// WordPress export, cleaned (spec 004; changes in tests/text-changes.mjs).
import { DashList, Fact, FactGrid, HelpBox, Lead, Note, Prose, Section } from "@/components/article/blocks";

export const summary = "Acum ai șansa să contribui direct la o regiune mai competitivă și mai inovativă.";

export default function MicrointreprindereNordEst() {
  return (
    <>
      <Lead>Acum ai șansa să contribui direct la o regiune mai competitivă și mai inovativă.</Lead>

      <Prose>
        <p>
          Va intra în consultanța publică apelul dedicat modernizării microîntreprinderilor, disponibil pentru
          județele Bacău, Botoșani, Iași, Neamț, Suceava și Vaslui, oferind finanțare nerambursabilă semnificativă
          pentru investiții în dezvoltarea activității tale.
        </p>
      </Prose>

      <Section title="Valoarea finanțării nerambursabile și a cofinanțării:">
        <FactGrid>
          <Fact title="50.000€ – 200.000€">
            Valoarea finanțării nerambursabile este de la 50.000€ la maxim 200.000€ per întreprindere
          </Fact>
          <Fact title="10 – 20%">Cuantumul cofinanțării este de 10 – 20%</Fact>
        </FactGrid>
      </Section>

      <Section title="Cheltuieli eligibile pentru finanțare:">
        <DashList
          items={[
            "Lucrări de construire / modernizare / extindere a spațiilor de producție, pentru care este necesară autorizația de construire, inclusiv a utilităților generale aferente (alimentare cu apă, canalizare, alimentare cu gaze naturale, agent termic, energie electrică, PSI)",
            "Dotarea cu active corporale de natura mijloacelor fixe (obligatoriu): achiziția de echipamente tehnologice, mobilier, aparatură birotică, instalații de lucru, echipamente informatice etc.",
            "Dotarea cu active necorporale: cunoștințe tehnice, brevete, drepturi de utilizare, licențe, mărci comerciale, programe informatice, alte drepturi și active similare",
            "Servicii de marketing și branding pentru noile produse/servicii",
          ]}
        />
        <Note>Profită de timp și oportunitate – pregătește-ți din timp strategia și proiectul!</Note>
      </Section>

      <HelpBox>
        <p>
          Dacă vrei să verificăm situația ta în detaliu sau să discutăm despre pașii necesari pentru depunerea
          proiectului, ne poți contacta:
        </p>
      </HelpBox>
    </>
  );
}
