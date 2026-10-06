// Body of /finantare-sisteme-stocare-energie/ — text copied word for word from the WordPress export
// (content/posts/finantare-sisteme-stocare-energie.json). tests/pages-text.test.mjs checks it.
import {
  ActionBlock,
  ButtonLink,
  Criterion,
  DashList,
  Fact,
  FactGrid,
  FinePrint,
  HelpBox,
  IconRow,
  Lead,
  Note,
  ScoreSplit,
  Section,
} from "@/components/article/blocks";

export const summary =
  "Ai panouri fotovoltaice și ești prosumator? Poți solicita finanțare pentru achiziția și instalarea unui sistem de stocare a energiei electrice produse din surse regenerabile.";

export default function FinantareStocareEnergie() {
  return (
    <>
      <Lead>
        Ai panouri fotovoltaice și ești prosumator? Poți solicita finanțare pentru achiziția și instalarea unui sistem
        de stocare a energiei electrice produse din surse regenerabile.
      </Lead>

      <FactGrid>
        <Fact title="Finanțare de până la 15.000 lei">
          AFM poate acoperi maximum 75% din valoarea totală a proiectului, iar contribuția proprie este de minimum 25%.
        </Fact>
        <Fact title="Sistem de stocare de minimum 10 kWh">
          Standardul maxim de cost eligibil este de 1.500 lei/kWh, TVA inclusă.
        </Fact>
      </FactGrid>

      <ActionBlock title="Vrei să vezi dacă te încadrezi?">
        <p>Completează câteva informații despre proiect și poți afla rapid:</p>
        <DashList
          items={[
            "dacă îndeplinești principalele condiții de eligibilitate;",
            "ce punctaj estimativ poți obține;",
            "cum influențează contribuția proprie și capacitatea bateriei șansele proiectului.",
          ]}
        />
        <ButtonLink href="/calculator-baterii/">Calculează-ți punctajul</ButtonLink>
      </ActionBlock>

      <Section title="Cum se face selecția?">
        <p>Proiectele pot obține maximum 100 de puncte, calculate astfel:</p>
        <ScoreSplit>
          <Criterion points={50} title="Contribuția proprie – maximum 50 puncte">
            O contribuție proprie mai mare poate crește punctajul proiectului.
          </Criterion>
          <Criterion points={50} title="Capacitatea sistemului de stocare – maximum 50 puncte">
            Se acordă 2,5 puncte pentru fiecare kWh, până la maximum 50 de puncte.
          </Criterion>
        </ScoreSplit>
        <Note>Proiectele sunt selectate în ordinea descrescătoare a punctajului, în limita bugetului disponibil.</Note>
      </Section>

      <Section title="Condiții importante">
        <IconRow icon="person">
          Solicitantul trebuie să fie persoană fizică și prosumator, să nu aibă obligații restante la bugetul de stat
          sau local și să respecte regula privind evitarea dublei finanțări. Dacă la locul de implementare se
          desfășoară activități economice sau profesionale, consumul aferent acestora trebuie să fie contorizat separat
          de consumul casnic.
        </IconRow>
        <IconRow icon="shield">
          Sistemul de stocare trebuie să fie nou, compatibil cu instalația fotovoltaică și să respecte cerințele tehnice
          din ghid, inclusiv capacitatea minimă de 10 kWh, garanția de minimum 5 ani și minimum 5.000 de cicluri de
          încărcare-descărcare.
        </IconRow>
      </Section>

      <HelpBox>
        <p>
          Dacă vrei să verificăm situația ta în detaliu sau să discutăm despre pașii necesari pentru depunerea
          proiectului, ne poți contacta:
        </p>
      </HelpBox>

      <FinePrint>
        Verificarea automată are caracter preliminar și orientativ. Eligibilitatea și punctajul final sunt stabilite de
        AFM în urma verificării documentelor și informațiilor depuse.
      </FinePrint>
    </>
  );
}
