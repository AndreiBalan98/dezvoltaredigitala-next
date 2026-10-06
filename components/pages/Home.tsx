// / — rebuilt from the old home page's text (spec 004; cuts in tests/text-changes.mjs): fluff on the
// PRODUCT.md Forbidden list removed, stock photo of a person pointing removed, post cards generated.
import Image from "next/image";
import Link from "next/link";
import { HelpBox } from "@/components/article/blocks";
import PostList from "./PostList";
import styles from "./pages.module.css";

const SOLUTIONS = [
  {
    title: "Roboți software",
    text: "Oferim soluții inteligente de automatizare a proceselor de afaceri utilizând roboți software, care vă pot ajuta să economisiți timp, bani și resurse.",
    href: "/servicii/digitalizare-si-automatizare/",
  },
  {
    title: "Creare site-uri web",
    text: "Oferim servicii de creare web personalizate, concepute să se adapteze perfect nevoilor și cerințelor afacerii dvs.",
    href: "/servicii/creare-website/",
  },
  {
    title: "Magazine Online",
    text: "Vă ajutăm să vă extindeți afacerea în mediul online, oferindu-vă o platformă de comerț electronic sigură, eficientă și ușor de utilizat.",
    href: "/servicii/creare-website/",
  },
  {
    title: "Promovare Web",
    text: "Dezvoltăm campanii de promovare web personalizate și eficiente, care vizează platformele de socializare potrivite pentru afacerea dvs.",
    href: "/servicii/creare-website/",
  },
];

const CERTIFICATES = [
  { label: "ISO/IEC 27001", src: "/media/2025/02/Screenshot-2025-03-27-144026.jpg", width: 719, height: 1049 },
  { label: "ISO/IEC 20000-1", src: "/media/2025/03/Screenshot-2025-03-27-144118.jpg", width: 630, height: 914 },
];

const PORTFOLIO = [
  { name: "Jocurinoi.ro", kind: "Magazin online", href: "https://www.jocurinoi.ro/", shot: "/media/2025/02/jocuri-noi1.png" },
  { name: "antiv.ro", kind: "Magazin online", href: "https://www.antiv.ro/", shot: "/media/2025/02/antiv-resize.png" },
  { name: "xat.ro", kind: "Găzduire web", href: "https://www.xat.ro/", shot: "/media/2025/02/portfolio-xat.png" },
  { name: "eduweblab.ro", kind: "Creare site-uri", href: "https://www.eduweblab.ro/", shot: "/media/2025/02/portfolio-eduweblab.png" },
  { name: "Farmaciaanca.ro", kind: "Magazin online", href: "https://www.farmaciaanca.ro/", shot: "/media/2025/02/farmacia-anca1.png" },
  {
    name: "C&A Connect",
    kind: "Website de prezentare",
    href: "https://www.caconnect.ro/",
    shot: "/media/2025/02/395330181_831555735639716_1570820402123901229_n-1.jpg",
  },
];

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.narrow}>
        <h1 className={styles.heroTitle}>Transformă-ți afacerea cu soluții digitale</h1>
        <p className={styles.heroLead}>
          Dacă te afli în etapa de explorare a digitalizării sau ai deja un proiect în desfășurare, consultarea cu
          experți din industria IT sau a specialiștilor în consultanță în afaceri reprezintă un pas esențial pentru a
          asigura succesul inițiativei tale digitale.
        </p>
        <p className={styles.heroText}>
          Echipa noastră de experți dedicați te va ajuta să-ți crești afacerea și să atingi obiectivele dorite prin
          strategii eficiente de lead generation și soluții personalizate.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/finantari-nerambursabile/">
            Finanțări nerambursabile
          </Link>
          <Link className={styles.secondary} href="/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/">
            Află mai multe despre consultanță soluții IT și studii de fezabilitate
          </Link>
        </div>
      </section>

      <section className={`${styles.wide} ${styles.block}`} aria-labelledby="home-finantari">
        <div className={styles.blockHead}>
          <h2 id="home-finantari">Finanțări nerambursabile</h2>
          <Link href="/finantari-nerambursabile/">Toate articolele</Link>
        </div>
        <PostList limit={3} />
      </section>

      <section className={`${styles.wide} ${styles.block}`} aria-labelledby="home-solutii">
        <div className={styles.blockHead}>
          <h2 id="home-solutii">Soluțiile noastre pentru dezvoltare</h2>
          <Link href="/servicii/">Toate serviciile</Link>
        </div>
        <div className={`${styles.cards} ${styles.twoCols}`}>
          {SOLUTIONS.map((s) => (
            <div key={s.title} className={styles.card}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link href={s.href}>Vezi mai mult</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.wide} ${styles.block}`} aria-labelledby="home-despre">
        <div className={styles.about}>
          <Image
            src="/media/2025/02/395330181_831555735639716_1570820402123901229_n-1.jpg"
            width={2048}
            height={1438}
            alt="Sediul C&A Connect din Botoșani"
            sizes="(max-width: 860px) 100vw, 500px"
          />
          <div>
            <div className={styles.blockHead}>
              <h2 id="home-despre">Despre noi</h2>
            </div>
            <p>
              Suntem specializați într-o gamă variată de servicii, precum crearea de site-uri web, dezvoltarea software
              personalizată, optimizarea SEO și promovarea pe rețelele sociale.
            </p>
            <p>
              Echipa noastră, alcătuită din profesioniști talentați și dedicați, este gata să vă ofere expertiza și
              experiența necesare pentru a vă concretiza viziunile în proiecte digitale.
            </p>
            <Link className={styles.primary} href="/contact/">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.wide} ${styles.block}`} aria-labelledby="home-iso">
        <div className={styles.blockHead}>
          <h2 id="home-iso">Suntem certificați ISO</h2>
        </div>
        <div className={styles.certs}>
          {CERTIFICATES.map((c) => (
            <a key={c.src} href={c.src}>
              <Image src={c.src} width={c.width} height={c.height} alt={`Certificat ${c.label}`} sizes="180px" />
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className={`${styles.wide} ${styles.block}`} aria-labelledby="home-proiecte">
        <div className={styles.blockHead}>
          <h2 id="home-proiecte">O parte din proiectele finalizate</h2>
        </div>
        <ul className={styles.portfolio}>
          {PORTFOLIO.map((p) => (
            <li key={p.href}>
              <a href={p.href} rel="noopener">
                <div className={styles.shot}>
                  <Image src={p.shot} alt="" fill sizes="(max-width: 640px) 100vw, 340px" />
                </div>
                <h3>{p.name}</h3>
                <p>{p.kind}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.narrow}>
        <HelpBox>
          <p>
            Dacă vrei să verificăm situația ta în detaliu sau să discutăm despre pașii necesari pentru depunerea
            proiectului, ne poți contacta:
          </p>
        </HelpBox>
      </div>
    </div>
  );
}
