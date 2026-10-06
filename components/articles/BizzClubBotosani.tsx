// Body of /bizz-club-botosani/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs).
import { DashList, Gallery, Lead, Prose } from "@/components/article/blocks";

export const summary =
  "Ieri seară am avut parte de o întâlnire memorabilă la sediul C&A CONNECT SRL, despre importanța contextului în discuții.";

const PHOTO = { width: 1538, height: 2048, alt: "Întâlnirea BIZZ CLUB Botoșani la sediul C&A Connect" };

export default function BizzClubBotosani() {
  return (
    <>
      <Lead>
        Ieri seară am avut parte de o întâlnire memorabilă la sediul C&amp;A CONNECT SRL, unde Romeo Crețu ne-a oferit
        o perspectivă clară asupra importanței contextului în discuții.
      </Lead>
      <p>Am descoperit că succesul unei conversații depinde de:</p>
      <DashList
        items={[
          <><strong>Speța discuției</strong> – Alegerea momentului și a cadrului potrivit face diferența între o soluție eficientă și un dialog fără rezultat.</>,
          <><strong>Energia discuției</strong> – Nivelul de implicare și tonul comunicării influențează profunzimea și impactul schimbului de idei.</>,
          <><strong>Scopul discuției</strong> – Fără un obiectiv clar, conversațiile devin vagi și ineficiente. Stabilirea unui scop ajută la obținerea unor rezultate concrete.</>,
        ]}
      />
      <Prose>
        <p>
          În plus, am avut parte de un moment de provocare, unde am analizat o situație reală ridicată de Florin
          Hustiuc, administratorul Diasos Top Distrib SRL.
        </p>
        <p>
          Împreună, am explorat soluții și am demonstrat că o comunitate puternică de antreprenori găsește mereu
          răspunsuri și oportunități.
        </p>
        <p>
          După întâlnirea săptămânală, a urmat cina, pe care am luat-o împreună la restaurantul Deja Vu Botoșani, iar
          pe această cale îi mulțumim pentru ospitalitate colegei noastre Ioana Boboc.
        </p>
        <p>
          <strong>Antreprenor din Botoșani, ești pregătit să îți duci afacerea la următorul nivel?</strong>
        </p>
        <p>
          Vino la următoarea întâlnire BIZZ.CLUB Botoșani și descoperă puterea networking-ului și a învățării
          continue!
        </p>
      </Prose>
      <Gallery
        images={[
          { src: "/media/2025/03/480577629_122206289336198794_5085059768532657375_n.jpg", ...PHOTO },
          { src: "/media/2025/03/481903838_122206289360198794_2820273200595103189_n.jpg", ...PHOTO },
          { src: "/media/2025/03/480707617_122206289582198794_3121945253911349157_n.jpg", ...PHOTO },
        ]}
      />
    </>
  );
}
