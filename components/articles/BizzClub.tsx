// Body of /test-3/ — text from the WordPress export, cleaned (spec 004; changes in tests/text-changes.mjs).
import { DashList, Figure, Lead, Note, Prose, Section } from "@/components/article/blocks";

export const summary =
  "Miercuri, 12 februarie 2025, ne reunim la C&A Connect pentru o sesiune de networking, educație și descoperirea unor oportunități strategice.";

export default function BizzClub() {
  return (
    <>
      <Lead>Antreprenori din Botoșani, pregătiți-vă pentru o întâlnire de impact!</Lead>
      <Prose>
        <p>
          Miercuri, 12 februarie 2025, ne reunim la C&amp;A Connect pentru o sesiune de networking, educație și
          descoperirea unor oportunități strategice pentru business-urile noastre.
        </p>
        <p>
          Momentul de educație: Îl avem alături pe Cojocaru Cristian, un profesionist cu peste 16 ani de experiență în
          industria IT și high-tech gaming, dar și un lider vizionar în procesul de digitalizare și accesare de fonduri
          europene nerambursabile.
        </p>
      </Prose>

      <Section title="De ce să vii?">
        <DashList
          items={[
            "Descoperi cum digitalizarea îți poate crește eficiența și competitivitatea.",
            "Afli ce fonduri europene sunt disponibile pentru afacerea ta și cum le poți accesa.",
            "Înveți pași concreți pentru a transforma tehnologia într-un avantaj real.",
            "Ai acces la o comunitate puternică de antreprenori cu care poți schimba idei și oportunități.",
            "Te încarci cu energie, inspirație și soluții aplicabile imediat!",
          ]}
        />
        <Note>Unde? Sediul C&amp;A CONNECT SRL, Strada Doboșari 79, Botoșani 710023</Note>
        <p>Înscrie-te acum și hai să ne dezvoltăm împreună!</p>
      </Section>

      <Figure
        src="/media/2025/03/480577629_122206289336198794_5085059768532657375_n.jpg"
        width={1538}
        height={2048}
        alt="Întâlnire BIZZ CLUB la sediul C&A Connect din Botoșani"
        narrow
      />
    </>
  );
}
