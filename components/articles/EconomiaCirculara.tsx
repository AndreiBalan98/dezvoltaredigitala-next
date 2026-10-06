// Body of /economia-circulara/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs).
import { DashList, Fact, FactGrid, HelpBox, Lead, Note, Section } from "@/components/article/blocks";

export const summary =
  "Ai o firmă în Regiunea Nord-Est? Obține până la 1.000.000 EURO nerambursabili pentru dezvoltare și tehnologizare!";

export default function EconomiaCirculara() {
  return (
    <>
      <Lead>
        Ai o firmă în Regiunea Nord-Est? Obține până la 1.000.000 EURO nerambursabili pentru dezvoltare și
        tehnologizare!
      </Lead>

      <Section title="Eligibilitate:">
        <FactGrid>
          <Fact title="IMM">IMM cu sediu/punct de lucru în: Bacău, Botoșani, Iași, Neamț, Suceava, Vaslui</Fact>
          <Fact title="Investiții sustenabile">
            Proiectul trebuie să vizeze investiții sustenabile și inovatoare.
          </Fact>
        </FactGrid>
      </Section>

      <Section title="Ce sprijină apelul pentru economie circulară:">
        <DashList
          items={[
            "Folosirea de materiale reciclate sau reutilizate",
            "Reducerea deșeurilor și a consumului de resurse",
            "Proiectarea de produse durabile, reparabile și reciclabile",
            "Simbioză industrială – colaborări pentru valorificarea deșeurilor între firme",
            "Implementarea de tehnologii verzi și sisteme de monitorizare a sustenabilității",
          ]}
        />
      </Section>

      <Section title="Ce poți achiziționa prin apel:">
        <DashList
          items={[
            "Echipamente și utilaje tehnologice",
            "IT & mobilier necesar activității",
            "Licențe software, brevete, know-how",
            "Lucrări de construcție / modernizare spații de producție",
            "Servicii de proiectare, marketing, audit, certificări",
            "Tehnologii verzi & sisteme de sustenabilitate",
          ]}
        />
        <Note>Nu rata șansa de a-ți îmbunătăți operațiunile cu ajutorul fondurilor europene!</Note>
      </Section>

      <HelpBox>
        <p>
          Noi, echipa C&amp;A Connect, te ghidăm pas cu pas pentru a obține finanțarea! Hai să discutăm despre cum
          putem digitaliza afacerea ta!
        </p>
      </HelpBox>
    </>
  );
}
