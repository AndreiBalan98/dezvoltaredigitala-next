// Body of /apelul-regional-vinnovate-2025/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs).
import { DashList, Fact, FactGrid, HelpBox, Lead, Note, Prose, Section } from "@/components/article/blocks";

export const summary =
  "Dacă ai o idee validată și vrei să o transformi în produs funcțional, apelul regional VInnovate 2025 este pentru tine!";

export default function VInnovate2025() {
  return (
    <>
      <Lead>
        Dacă ai o idee validată și vrei să o transformi în produs funcțional, apelul regional VInnovate 2025 este
        pentru tine!
      </Lead>

      <Section title="Cine poate participa?">
        <Prose>
          <p>
            În Regiunea Nord-Est, solicitanții eligibili trebuie să se încadreze în categoria IMM-urilor
            (microîntreprinderi, întreprinderi mici, mijlocii) și să vizeze proiecte în domeniile RIS3 Nord-Est:
          </p>
          <p>agroalimentar, industria lemnului, energie, textile, TIC, turism, mediu, sănătate.</p>
        </Prose>
      </Section>

      <Section title="Ce tipuri de proiecte sunt finanțate?">
        <Prose>
          <p>
            Proiectele eligibile trebuie să aibă în vedere confirmarea funcționalității unui prototip și validarea
            acestuia în mediu operațional, prin parcurgerea etapelor de maturitate tehnologică (TRL) de la nivelul TRL 6
            (Demonstrația prototipului de sistem / proces într-un mediu operațional) la TRL 7 (Sistem pilot integrat
            demonstrat) și/sau TRL 8 (Sistem încorporat în design comercial).
          </p>
        </Prose>
        <Note>
          TRL = Technology Readiness Level = Nivel de Maturitate Tehnologică. Este un sistem folosit în proiectele de
          cercetare, inovare și dezvoltare tehnologică (cum sunt cele finanțate prin programe europene, precum
          VInnovate), pentru a evalua cât de avansată este o tehnologie înainte de a fi lansată pe piață.
        </Note>
      </Section>

      <Section title="Care sunt beneficiile participării?">
        <FactGrid>
          <Fact title="Până la 200.000 Euro">Finanțare de până la 200.000 Euro (grant nerambursabil)</Fact>
          <Fact title="Competitivitate">Creșterea competitivității și productivității companiei</Fact>
        </FactGrid>
        <DashList
          items={[
            "Dezvoltarea de produse, servicii și tehnologii inovatoare cu potențial de piață",
            "Facilitarea tranziției către o economie cu valoare adăugată ridicată",
            "Dezvoltarea capacității de inovare",
            "Schimb de cunoștințe, expertiză și resurse cu parteneri din alte regiuni europene",
          ]}
        />
        <Note>Fii cu un pas înainte! Sesiunea de informare vine în curând.</Note>
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
