// /servicii/ in "Grilă" (spec 008): each service as a giant numbered row on the grid — number in the
// margin, title, intro, lists in two columns, steps as a numbered grid, packages with huge prices.
import Link from "next/link";
import { SERVICE_AREAS, SERVICE_DETAILS } from "@/components/focus/data";
import s from "./grila.module.css";

export default function Services() {
  return (
    <div className={s.wrap}>
      <header className={s.pageHead}>
        <h1 className={s.poster}>Servicii</h1>
        <ol className={s.jump}>
          {SERVICE_DETAILS.map((d, i) => (
            <li key={d.id}>
              <a href={`#${d.id}`}>
                <span>{String(i + 1).padStart(2, "0")}</span> {d.title}
              </a>
            </li>
          ))}
        </ol>
      </header>

      {SERVICE_DETAILS.map((d, i) => (
        <section key={d.id} id={d.id} className={s.serviceRow} aria-labelledby={`${d.id}-t`}>
          <p className={s.serviceNo} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </p>
          <div className={s.serviceMain}>
            <p className={s.indexTag}>{d.line}</p>
            <h2 id={`${d.id}-t`} className={s.serviceTitle}>
              {d.title}
            </h2>
            <p className={s.serviceLead}>{d.lead ?? d.summary}</p>

            {d.lists.map((l) => (
              <div key={l.title} className={s.serviceBlock}>
                <h3 className={s.blockLabel}>{l.title}</h3>
                <ul className={s.cols}>
                  {l.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}

            {d.steps && (
              <div className={s.serviceBlock}>
                <h3 className={s.blockLabel}>{d.steps.title}</h3>
                <ol className={s.stepGrid}>
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
              <div className={s.serviceBlock}>
                <h3 className={s.blockLabel}>{d.packages.title}</h3>
                <ul className={s.packages}>
                  {d.packages.items.map((p) => (
                    <li key={p.name}>
                      <h4>{p.name}</h4>
                      <p className={s.packagePrice}>{p.price}</p>
                      <ul>
                        {p.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link className={s.arrowLink} href="/contact/">
              Contactează-ne
            </Link>
          </div>
        </section>
      ))}

      <section className={s.block} aria-labelledby="x-domenii">
        <h2 id="x-domenii" className={s.blockLabel}>
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
  );
}
