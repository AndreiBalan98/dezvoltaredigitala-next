import Link from "next/link";
import PageLayout from "@/components/article/PageLayout";
import { DashList, Prose } from "@/components/article/blocks";

export default function NotFound() {
  return (
    <PageLayout label="Eroare 404" title="Pagina nu a fost găsită">
      <Prose>
        <p>Adresa nu există sau a fost mutată. Poți continua de aici:</p>
      </Prose>
      <DashList
        items={[
          <Link key="home" href="/">Pagina principală</Link>,
          <Link key="list" href="/finantari-nerambursabile/">Finanțări nerambursabile</Link>,
          <Link key="calc" href="/calculator-baterii/">Calculator punctaj baterii</Link>,
          <Link key="contact" href="/contact/">Contact</Link>,
        ]}
      />
    </PageLayout>
  );
}
