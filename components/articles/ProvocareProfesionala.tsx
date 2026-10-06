// Body of /test-2/ — text from the WordPress export, cleaned (spec 004; changes in tests/text-changes.mjs).
import { DashList, Lead, Prose, Section } from "@/components/article/blocks";

export const summary =
  "Suntem extrem de încântați să anunțăm că am început un stagiu de practică ca Web Developeri la C&A Connect SRL!";

export default function ProvocareProfesionala() {
  return (
    <>
      <Lead>
        Suntem extrem de încântați să anunțăm că am început un stagiu de practică ca Web Developeri la C&amp;A
        Connect SRL!
      </Lead>
      <Prose>
        <p>
          Această experiență ne oferă o șansă extraordinară de a ne dezvolta abilitățile în web development, alături
          de o echipă talentată.
        </p>
        <p>
          Echipa noastră este formată din Gabriela Zamcu, Elena-Alina Burlacu și Sorin Lupaștean, iar împreună avem
          ocazia să punem în aplicare cunoștințele dobândite până acum și să învățăm lucruri noi direct din industrie.
        </p>
      </Prose>

      <Section title="În cadrul acestui stagiu, avem oportunitatea să:">
        <DashList
          items={[
            "Lucrăm la proiecte reale și să înțelegem mai bine cerințele din industria IT;",
            "Ne perfecționăm cunoștințele de HTML, CSS, WordPress și alte tehnologii esențiale pentru dezvoltarea web;",
            "Explorăm framework-uri moderne și să aplicăm bune practici utilizate de profesioniștii din domeniu;",
            "Colaborăm cu o echipă experimentată, de la care putem învăța și alături de care putem crește profesional;",
            "Descoperim mai multe despre procesele și metodologiile utilizate în dezvoltarea software.",
          ]}
        />
        <Prose>
          <p>
            Pentru noi, acest stagiu nu este doar o oportunitate de a învăța, ci și o provocare de a ne autodepăși și de
            a contribui activ la proiectele în care suntem implicați.
          </p>
          <p>
            Suntem recunoscători pentru șansa de a face parte din echipa C&amp;A Connect SRL și abia așteptăm să
            împărtășim din experiențele noastre!
          </p>
          <p>Mulțumim mentorilor și colegilor pentru susținere!</p>
        </Prose>
      </Section>
    </>
  );
}
