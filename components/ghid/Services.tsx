// /servicii/ in "Ghid" (spec 008): all four services on one guide page with a "Cuprins", each service a
// numbered part with its lists, steps and, for websites, the packages as a plain table.
import Link from "next/link";
import Contents from "@/components/focus/Contents";
import { SERVICE_AREAS, SERVICE_DETAILS } from "@/components/focus/data";
import { Breadcrumbs } from "./Header";
import s from "./ghid.module.css";

export default function Services() {
  const items = [...SERVICE_DETAILS.map((d) => ({ id: d.id, title: d.title })), { id: "domenii", title: "Servicii diversificate" }];
  return (
    <div className={s.wrap}>
      <Breadcrumbs trail={[]} />
      <article className={s.guide}>
        <header className={s.guideHead}>
          <p className={s.caption}>Dezvoltare digitală</p>
          <h1 className={s.title}>Servicii</h1>
        </header>
        <div className={s.guideGrid}>
          <aside className={s.side}>
            <Contents
              items={items}
              classes={{ root: s.contents, heading: s.contentsHeading, toggle: s.contentsToggle, list: s.contentsList, open: s.contentsOpen, active: s.contentsActive }}
            />
          </aside>
          <div className={s.guideBody}>
            {SERVICE_DETAILS.map((d, i) => (
              <section key={d.id} id={d.id} className={s.part} aria-labelledby={`${d.id}-t`}>
                <p className={s.caption}>
                  {i + 1}. {d.line}
                </p>
                <h2 id={`${d.id}-t`} className={s.partTitle}>
                  {d.title}
                </h2>
                <p className={s.lead}>{d.lead ?? d.summary}</p>
                {d.lists.map((l) => (
                  <div key={l.title}>
                    <h3>{l.title}</h3>
                    <ul className={s.bullets}>
                      {l.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {d.steps && (
                  <>
                    <h3>{d.steps.title}</h3>
                    <ol className={s.steps}>
                      {d.steps.items.map((st) => (
                        <li key={st.title}>
                          <strong>{st.title}</strong>
                          <p>{st.text}</p>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                {d.packages && (
                  <>
                    <h3>{d.packages.title}</h3>
                    <div className={s.tableScroll}>
                      <table className={s.table}>
                        <thead>
                          <tr>
                            <th scope="col">Pachet</th>
                            <th scope="col">Preț</th>
                            <th scope="col">Ce include</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.packages.items.map((p) => (
                            <tr key={p.name}>
                              <th scope="row">{p.name}</th>
                              <td className={s.price}>{p.price}</td>
                              <td>{p.items.join("; ")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                <p>
                  <Link className={s.button} href="/contact/">
                    Contactează-ne
                  </Link>
                </p>
              </section>
            ))}
            <section id="domenii" className={s.part} aria-labelledby="domenii-t">
              <h2 id="domenii-t" className={s.partTitle}>
                Servicii diversificate
              </h2>
              <dl className={s.summaryList}>
                {SERVICE_AREAS.map((area) => (
                  <div key={area.title}>
                    <dt>{area.title}</dt>
                    <dd>{area.text}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
