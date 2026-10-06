// /servicii/creare-website/ — text from the WordPress export, cleaned (spec 004; changes in
// tests/text-changes.mjs). Stock photos of people removed.
import PageLayout from "@/components/article/PageLayout";
import { ButtonLink, DashList, Lead, Price, PriceGrid, Prose, Section, ServiceAreas } from "@/components/article/blocks";

export const summary =
  "Echipa noastră dedicată de profesioniști în domeniul dezvoltării digitale se angajează să creeze magazine online complet personalizate.";

export default function CreareWebsite() {
  return (
    <PageLayout label="Servicii" title="Creare website">
      <Lead>Dezvoltare digitală se situează în fruntea ofertelor din domeniul dezvoltării magazinelor online.</Lead>
      <Prose>
        <p>
          Echipa noastră dedicată de profesioniști în domeniul dezvoltării digitale se angajează să creeze magazine
          online complet personalizate.
        </p>
        <p>
          Ne concentrăm asupra detaliilor, asigurându-ne că fiecare aspect al platformei este meticulos analizat și
          implementat pentru a oferi o experiență de utilizare excepțională atât pentru publicul local, cât și pentru
          cel internațional.
        </p>
        <p>
          Pe lângă designul atrăgător, ne axăm și pe funcționalități avansate care să optimizeze performanța
          magazinului online și să răspundă nevoilor în schimbare ale clienților.
        </p>
      </Prose>
      <ButtonLink href="/contact/">Contactează-ne</ButtonLink>

      <Section title="Ce oferim?">
        <DashList
          items={[
            "Coduri scrise în mod unic pentru generarea de pagini dinamice;",
            "Adaptabile oricărui domeniu de activitate;",
            "Coș de produse ușor accesibil și vizibil pe toată perioada navigării;",
            "Funcționalități nelimitate: status comenzi, gestiune produse, import produse, facturare, modul curier, statistici și rapoarte vânzări;",
            "Variante de produs (atribute) și filtre de căutare avansată;",
            "GDPR",
            "Grafică personalizată",
            "Design compatibil cu dispozitive mobile",
            "Panou de administrare",
            "Galerie foto administrabilă",
            "Design logo",
            "Funcție tap to chat button",
            "Efecte animate",
            "100% design unic",
          ]}
        />
      </Section>

      <ServiceAreas />

      <Section title="Alege unul dintre pachetele noastre pentru a dezvolta afacerea ta online.">
        <p>
          Pornind de la aceste pachete noi putem crea și consolida viitorul magazin online sau platforma digitală în
          funcție de necesitățile fiecărui business în parte.
        </p>
        <PriceGrid>
          <Price
            name="Site prezentare"
            price="€400"
            items={[
              "Grafică basic",
              "Design compatibil cu dispozitive mobile",
              "Până la 5 pagini",
              "Formular contact",
              "Informații Contact: Harta Google",
            ]}
          />
          <Price
            name="Magazin online"
            price="€800"
            items={[
              "Grafică standard",
              "Panou de administrare",
              "Până la 10 pagini",
              "Suport tehnic gratuit 30 zile",
              "Campanii de promovare web, la cerere",
            ]}
          />
          <Price
            name="Roboți software"
            price="€1200"
            items={[
              "Plăți în funcție de numărul și complexitatea roboților",
              "Procesare facturi și extrase de cont",
              "Date în sisteme ERP sau CRM",
              "Generare de rapoarte și analize",
              "Verificare și validare de informații",
            ]}
          />
        </PriceGrid>
      </Section>
    </PageLayout>
  );
}
