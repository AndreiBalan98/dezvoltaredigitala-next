// Body of /o-regiune-mai-digitalizata/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs).
import { Fact, FactGrid, HelpBox, Lead, Note, Prose, Section } from "@/components/article/blocks";

export const summary = "Digitalizarea – acesta este viitorul. Apelul urmează curând, pentru Regiunea Nord-Est.";

const ELIGIBLE = [
  {
    title: "Automatizezi vânzările",
    text: "Cu CRM, ERP și Cloud nu mai pierzi clienți, nu mai greșești facturi, totul este conectat.",
  },
  {
    title: "Îți faci magazin online și aplicație mobilă",
    text: "Vânzări non-stop. Clienții tăi te găsesc oricând, oriunde.",
  },
  {
    title: "Cumperi echipamente IT și servere",
    text: "Lucrezi mai rapid, scanezi stocuri, ai control complet în timp real.",
  },
  {
    title: "Înlocuiești Excel-ul cu softuri dedicate",
    text: "Mai puține erori, mai multă eficiență. Gestiune modernă pentru producție, stocuri și clienți.",
  },
];

export default function RegiuneDigitalizata() {
  return (
    <>
      <Lead>
        Digitalizarea – acesta este viitorul. Apelul urmează curând, pentru Regiunea Nord-Est. Este momentul perfect
        să începi strategia ta, alături de C&amp;A Connect.
      </Lead>

      <Section title="Ce poți face cu 100.000 € nerambursabili pentru afacerea ta?">
        <h3>Ce cheltuieli sunt eligibile?</h3>
        <FactGrid>
          {ELIGIBLE.map((e) => (
            <Fact key={e.title} title={e.title}>
              {e.text}
            </Fact>
          ))}
        </FactGrid>
      </Section>

      <Section title="Cine poate aplica?">
        <Prose>
          <p>
            Solicitanții eligibili în cadrul acestui apel de proiecte sunt societățile comerciale (non-agricole),
            constituite în baza Legii nr. 31/1990 privind societățile comerciale, cu modificările și completările
            ulterioare.
          </p>
          <p>
            Aceștia trebuie să se încadreze în categoria IMM-urilor, să desfășoare activitate în alte sectoare decât
            TIC, și să aibă sediul social în Regiunea Nord-Est la momentul primei plăți din ajutorul acordat.
          </p>
          <p>Scopul este creșterea competitivității IMM-urilor și a nivelului de intensitate digitală.</p>
        </Prose>
        <Note>
          Digitalizarea nu este un moft. Este o investiție în profit, timp și claritate. Și acum ai șansa să o faci cu
          finanțare nerambursabilă.
        </Note>
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
