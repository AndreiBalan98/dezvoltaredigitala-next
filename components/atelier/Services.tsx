// /servicii/ in "Atelier" (spec 008, the design's focus): a catalogue. Four cards on top, then a sticky
// index beside one full section per service: intro, "Ce oferim" as a checklist, steps as numbered cards,
// the website packages as a comparison table, and a contact action at the end of each section.
import Link from "next/link";
import Contents from "@/components/focus/Contents";
import { SERVICE_AREAS, SERVICE_DETAILS } from "@/components/focus/data";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import s from "./atelier.module.css";

const Check = () => (
  <svg className={s.check} aria-hidden="true" viewBox="0 0 20 20" width="20" height="20">
    <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 10.5l2.6 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Services() {
  const index = [...SERVICE_DETAILS.map((d) => ({ id: d.id, title: d.title })), { id: "domenii", title: "Servicii diversificate" }];
  return (
    <div className={s.wrap}>
      <header className={s.pageHead}>
        <p className={s.eyebrow}>Dezvoltare digitală</p>
        <h1 className={s.pageTitle}>Servicii</h1>
      </header>

      <ul className={s.catalog}>
        {SERVICE_DETAILS.map((d) => (
          <li key={d.id} className={s.catalogCard}>
            <span className={d.line === "Finanțări" ? s.tagFunding : s.tag}>{d.line}</span>
            <h2 className={s.cardTitle}>
              <a href={`#${d.id}`}>{d.title}</a>
            </h2>
            <p>{d.summary}</p>
          </li>
        ))}
      </ul>

      <div className={s.catalogGrid}>
        <aside>
          <Contents
            items={index}
            title="Servicii"
            classes={{ root: s.index, heading: s.indexHeading, toggle: s.indexToggle, list: s.indexList, open: s.indexOpen, active: s.indexActive }}
          />
        </aside>

        <div className={s.sections}>
          {SERVICE_DETAILS.map((d, i) => (
            <section key={d.id} id={d.id} className={s.service} aria-labelledby={`${d.id}-t`}>
              <div className={s.serviceHead}>
                <span className={s.serviceNo}>{String(i + 1).padStart(2, "0")}</span>
                <span className={d.line === "Finanțări" ? s.tagFunding : s.tag}>{d.line}</span>
              </div>
              <h2 id={`${d.id}-t`} className={s.serviceTitle}>
                {d.title}
              </h2>
              <p className={s.lead}>{d.lead ?? d.summary}</p>

              {d.lists.map((l) => (
                <div key={l.title} className={s.block}>
                  <h3 className={s.blockTitle}>{l.title}</h3>
                  <ul className={s.checklist}>
                    {l.items.map((it) => (
                      <li key={it}>
                        <Check />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {d.steps && (
                <div className={s.block}>
                  <h3 className={s.blockTitle}>{d.steps.title}</h3>
                  <ol className={s.stepCards}>
                    {d.steps.items.map((st, n) => (
                      <li key={st.title}>
                        <span className={s.stepNo}>{n + 1}</span>
                        <h4>{st.title}</h4>
                        <p>{st.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {d.packages && (
                <div className={s.block}>
                  <h3 className={s.blockTitle}>{d.packages.title}</h3>
                  <div className={s.compareScroll}>
                    <table className={s.compare}>
                      <thead>
                        <tr>
                          <td />
                          {d.packages.items.map((p) => (
                            <th key={p.name} scope="col">
                              {p.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={s.priceRow}>
                          <th scope="row">Preț</th>
                          {d.packages.items.map((p) => (
                            <td key={p.name}>{p.price}</td>
                          ))}
                        </tr>
                        <tr>
                          <th scope="row">Include</th>
                          {d.packages.items.map((p) => (
                            <td key={p.name}>
                              <ul className={s.compareList}>
                                {p.items.map((it) => (
                                  <li key={it}>
                                    <Check />
                                    <span>{it}</span>
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className={s.serviceCta}>
                <Link className={s.button} href="/contact/">
                  Contactează-ne
                </Link>
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </section>
          ))}

          <section id="domenii" className={s.service} aria-labelledby="domenii-t">
            <h2 id="domenii-t" className={s.serviceTitle}>
              Servicii diversificate
            </h2>
            <ul className={s.areas}>
              {SERVICE_AREAS.map((a) => (
                <li key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
