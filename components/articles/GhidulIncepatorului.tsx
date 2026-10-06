// Body of /ghidul-incepatorului-in-accesarea-fondurilor-europene-ce-trebuie-sa-stii-inainte-sa-aplici/ —
// text from the WordPress export, cleaned (spec 004; changes in tests/text-changes.mjs).
import {
  ActionBlock,
  ButtonLink,
  DashList,
  Fact,
  FactGrid,
  Figure,
  HelpBox,
  Lead,
  Prose,
  Section,
  Steps,
} from "@/components/article/blocks";

export const summary =
  "Fondurile europene pot fi o oportunitate extraordinară pentru antreprenori, ONG-uri sau chiar autorități locale.";

const PROGRAMS = [
  { name: "PNRR", what: "Planul Național de Redresare și Reziliență (pentru digitalizare, energie, infrastructură)", url: "https://pnrr.gov.ro" },
  { name: "AFIR/PNDR", what: "pentru investiții în agricultură și mediul rural", url: "https://www.afir.info" },
  {
    name: "POCIDIF",
    what: "program dedicat digitalizării firmelor",
    url: "https://oportunitati-ue.gov.ro/program/programul-crestere-inteligenta-digitalizare-si-instrumente-financiare/",
  },
  {
    name: "POR",
    what: "Programul Operațional Regional (pentru modernizare locală și infrastructură)",
    url: "https://mfe.gov.ro/programe/autoritati-de-management/por/",
  },
];

export default function GhidulIncepatorului() {
  return (
    <>
      <Lead>
        Fondurile europene pot fi o oportunitate extraordinară pentru antreprenori, ONG-uri sau chiar autorități
        locale. Dar, pentru cine nu a mai trecut printr-un astfel de proces, pot părea complicate sau inaccesibile. În
        acest articol, îți explicăm pas cu pas ce trebuie să știi ca începător, ca să știi dacă merită să aplici și cum
        să faci asta corect.
      </Lead>

      <Section title="Ce sunt fondurile europene?">
        <Prose>
          <p>
            Fondurile europene sunt sume de bani nerambursabili acordate de Uniunea Europeană pentru a sprijini
            dezvoltarea economică, socială și durabilă a statelor membre. România beneficiază, în fiecare ciclu
            bugetar, de miliarde de euro alocați prin diverse programe.
          </p>
          <p>
            Aceste fonduri sunt împărțite pe domenii: dezvoltare regională, agricultură, digitalizare, educație, energie
            verde, infrastructură etc. Cele mai cunoscute programe sunt:
          </p>
        </Prose>
        <DashList
          items={PROGRAMS.map((p) => (
            <>
              <strong>{p.name}</strong> – {p.what}: <a href={p.url}>{p.url}</a>
            </>
          ))}
        />
      </Section>

      <Section title="Cine poate accesa fonduri europene?">
        <p>
          Vestea bună este că accesul la fonduri nu este rezervat doar companiilor mari sau instituțiilor publice.
          Iată cine poate aplica, în funcție de program:
        </p>
        <DashList
          items={[
            <><strong>Persoane fizice</strong>, în anumite cazuri (de exemplu, pentru formare profesională sau energie verde)</>,
            <><strong>IMM-uri</strong> – microîntreprinderile, întreprinderile mici și mijlocii sunt cei mai frecvenți beneficiari</>,
            <><strong>Start-up-uri</strong>, prin programe dedicate antreprenorilor aflați la început de drum</>,
            <><strong>ONG-uri</strong> – în special pentru proiecte educaționale, culturale sau sociale</>,
            <><strong>Primării, școli, spitale</strong> – pentru investiții publice și comunitare</>,
          ]}
        />
        <FactGrid>
          <Fact title="Mit">Doar firmele mari sau cei cu relații pot accesa fonduri europene.</Fact>
          <Fact title="Adevăr">
            Proiectele sunt evaluate pe criterii clare și transparente. Chiar și un start-up sau un ONG mic poate primi
            finanțare dacă ideea e bună.
          </Fact>
        </FactGrid>
      </Section>

      <Section title="Etapele accesării fondurilor europene">
        <p>
          Procesul poate părea complex la început, dar urmează cam același traseu în toate programele. Iată care sunt
          pașii principali:
        </p>
        <Figure src="/media/2025/07/Documentare-1024x576.jpg" width={1024} height={576} alt="" />
        <Steps
          items={[
            {
              title: "Documentare",
              text: (
                <>
                  Caută un program care se potrivește ideii tale. Poți începe cu{" "}
                  <a href="https://www.fonduri-ue.ro">www.fonduri-ue.ro</a> sau{" "}
                  <a href="https://mfe.gov.ro">https://mfe.gov.ro</a>.
                </>
              ),
            },
            {
              title: "Verificare eligibilitate",
              text: "Citește Ghidul Solicitantului pentru a vedea dacă tu sau afacerea ta îndepliniți toate cerințele. Puteți apela la un consultant pentru a evita erori care pot duce la respingerea proiectului.",
            },
            {
              title: "Scrierea proiectului",
              text: "Pregătirea cererii de finanțare, a bugetului și a planului de afaceri este o etapă-cheie. Mulți aleg să lucreze cu o echipă de consultanți, pentru a se asigura că proiectul este eligibil, corect redactat și are șanse reale de finanțare.",
            },
            { title: "Depunerea proiectului", text: "De obicei se face online, pe platforma MySMIS." },
            { title: "Evaluarea proiectului", text: "Proiectul este analizat de experți care acordă punctaje." },
            { title: "Semnarea contractului", text: "Dacă ai fost selectat, urmează semnarea oficială a finanțării." },
            {
              title: "Implementarea și raportarea",
              text: "Vei cheltui banii conform proiectului și vei trimite rapoarte către autoritatea finanțatoare.",
            },
          ]}
        />
      </Section>

      <Section title="Sfaturi utile pentru începători (și de ce să nu faci totul singur)">
        <Prose>
          <p>
            Dacă ești la primul contact cu fondurile europene, cel mai important sfat este să nu te complici inutil. Da,
            poți învăța totul de la zero, poți citi zeci de pagini de ghiduri și poți încerca să gestionezi întreg
            procesul singur, dar va dura mult, va fi obositor și există riscul să pierzi timp și bani dacă greșești ceva
            mic.
          </p>
          <p>
            O variantă mai sigură și mai rapidă este să lucrezi cu o echipă de consultanți care înțelege exact ce se
            cere și te poate ghida pas cu pas. La noi, procesul e clar, structurat și adaptat nevoii tale. Tu vii cu
            ideea, noi ne ocupăm de tot ce înseamnă:
          </p>
        </Prose>
        <DashList
          items={[
            "alegerea programului potrivit",
            "redactarea cererii de finanțare",
            "pregătirea bugetului",
            "încărcarea documentelor în platformă",
            "și mai ales: susținerea implementării după ce câștigi",
          ]}
        />
        <Prose>
          <p>Așa te poți concentra pe proiectul tău, nu pe hârtii, formulare și birocrație.</p>
          <p>
            În plus, am lucrat deja cu zeci de proiecte câștigătoare și știm din practică ce funcționează și ce nu. Dacă
            vrei să aplici la un program activ sau să te pregătești pentru viitoarele apeluri,{" "}
            <strong>hai să vorbim. E mai simplu decât crezi.</strong>
          </p>
        </Prose>
      </Section>

      <ActionBlock title="Ai un proiect în minte? Hai să-l facem împreună!">
        <p>
          Dacă vrei să afli ce fonduri europene ți se potrivesc sau ai nevoie de ajutor concret în pregătirea
          dosarului de finanțare, scrie-ne și te contactăm în cel mai scurt timp.
        </p>
        <ButtonLink href="/contact/">Programează o întâlnire</ButtonLink>
      </ActionBlock>

      <HelpBox>
        <p>Program: Luni–Vineri, 08:00 – 16:00</p>
      </HelpBox>
    </>
  );
}
