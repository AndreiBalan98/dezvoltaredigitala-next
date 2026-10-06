// Body of /start-up-nation-2025/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs).
import { DashList, FactGrid, Fact, HelpBox, Lead, Prose, Section, Steps } from "@/components/article/blocks";

export const summary = "Vrei să îți deschizi propria afacere? Programul Start-Up Nation 2025 îți oferă șansa!";

export default function StartUpNation2025() {
  return (
    <>
      <Lead>
        Vrei să îți deschizi propria afacere? Programul Start-Up Nation 2025 îți oferă șansa!
      </Lead>

      <FactGrid>
        <Fact title="Maximum 250.000 lei/întreprindere">
          Pentru înființarea de întreprinderi valoarea sprijinului financiar acordat în cadrul acestei scheme de
          antreprenoriat va fi de maximum 250.000 lei/întreprindere.
        </Fact>
        <Fact title="Cofinanțare de minimum 10%">
          Pentru fiecare întreprindere înființată în cadrul proiectului, persoana din grupul țintă care înființează
          întreprinderea trebuie să asigure o cofinanțare proprie de minimum 10% din valoarea sprijinului financiar
          primit.
        </Fact>
      </FactGrid>

      <Section title="Acțiuni sprijinite în cadrul apelului:">
        <DashList
          items={[
            "Identificarea sectoarelor economice competitive",
            "Formarea competențelor antreprenoriale în rândul persoanelor aparținând grupului țintă și dezvoltarea planurilor de afaceri;",
            "Măsuri de sprijin prin servicii de tutorat/mentorat/asistență și consiliere precum și dobândirea de competențe în managementul de proiect;",
            "Acordarea de sprijin financiar de minimis pentru dezvoltarea de întreprinderi mici și mijlocii și crearea de locuri de muncă.",
          ]}
        />
      </Section>

      <Section title="Grup țintă">
        <Prose>
          <p>
            În regiunile: Nord-Est, Sud-Est, Sud Muntenia, Sud-Vest Oltenia, Vest, Nord-Vest, Centru:
          </p>
          <DashList items={["Persoane până în 35 ani (35 ani neîmpliniți la data înscrierii la curs)"]} />
          <p>sau</p>
          <p>Persoane peste 35 ani dacă fac parte din una din aceste categorii:</p>
          <ol>
            <li>persoane care au domiciliul în mediul rural în CI</li>
            <li>persoane aflate în căutarea unui loc de muncă</li>
            <li>șomeri, șomeri de lungă durată</li>
            <li>persoane inactive</li>
            <li>persoane din grupurile dezavantajate pe piața muncii</li>
          </ol>
        </Prose>
      </Section>

      <Section title="Sesiunea din 2025 a programului Start-up Nation 4 se va desfășura astfel:">
        <Steps
          items={[
            {
              title: "Pasul 1: Înscrierea la cursurile de competențe antreprenoriale",
              text: (
                <DashList
                  items={[
                    "Cursurile sunt gratuite",
                    "Înscrierea se face în aplicația pusă la dispoziție de Minister începând cu 15.04.2025",
                    "Important: Nu sunt eligibile persoanele fizice care au absolvit cursuri de competențe antreprenoriale finanțate din Fonduri Europene în alte programe!",
                  ]}
                />
              ),
            },
            {
              title: "Pasul 2: Înființarea firmei",
              text: "Înființarea firmei (SRL) de către persoanele care au absolvit cursul de competențe antreprenoriale urmat în cadrul programului Start-up Nation 2025.",
            },
            {
              title: "Pasul 3: Depunerea proiectului",
              text: "Începând cu data 01.iunie.2025 se pot depune proiecte în aplicația electronică timp de 45 zile lucrătoare.",
            },
          ]}
        />
      </Section>

      <HelpBox>
        <p>Contactează-ne acum pentru mai multe detalii!</p>
      </HelpBox>
    </>
  );
}
