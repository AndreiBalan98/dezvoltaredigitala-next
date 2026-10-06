import Link from "next/link";
import PageLayout from "@/components/article/PageLayout";
import { DashList, Prose } from "@/components/article/blocks";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

// Unknown URLs, in every design, get the Editorial 404 (it renders outside the design layouts).
export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <SiteHeader />
      <main id="continut">
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
      </main>
      <SiteFooter />
    </>
  );
}
