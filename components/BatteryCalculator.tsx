"use client";

// UI of the battery score calculator. Behaviour and texts follow the live /calculator-baterii/ page;
// the rules live in lib/calculator.ts.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { previousPath } from "@/components/RouteHistory";
import { CONFIG, calc, clamp, fmt, lei, parseNum, type Field } from "@/lib/calculator";
import styles from "./BatteryCalculator.module.css";

const CONDITIONS = [
  "Am panouri fotovoltaice racordate la rețea și contract de prosumator.",
  "Am invertor hibrid sau îl montez pe banii mei, până la punerea în funcțiune a bateriei.",
  "Bateria e nouă, fără plumb, cu BMS, garanție de minimum 5 ani și minimum 5.000 de cicluri.",
  "Nu am datorii la bugetul de stat sau la cel local.",
  "La adresă nu se desfășoară activități economice (sau consumul lor e contorizat separat).",
  "Nu am beneficiat de finanțare din alte fonduri publice, naționale sau europene, pentru bateria de stocare.",
];

const FIELDS: { key: Field; label: string; unit: string; placeholder: string; hint: string }[] = [
  { key: "kwh", label: "Capacitatea bateriei", unit: "kWh", placeholder: "ex. 15", hint: "Minimum 10 kWh pentru a fi eligibil." },
  { key: "vt", label: "Valoarea totală", unit: "lei", placeholder: "ex. 25.000", hint: "Cu TVA: baterie, montaj și invertor hibrid, dacă e cazul." },
  { key: "cp", label: "Contribuția proprie", unit: "lei", placeholder: "ex. 10.000", hint: "Cât plătești tu. Minimum 25% din total." },
];

const NUME: Record<Field, string> = { kwh: "capacitatea bateriei", vt: "valoarea totală", cp: "contribuția proprie" };

type Values = Record<Field, string>;

const parse = (values: Values, k: Field) => parseNum(values[k], k !== "kwh");

export default function BatteryCalculator() {
  const [values, setValues] = useState<Values>({ kwh: "", vt: "", cp: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [checked, setChecked] = useState<boolean[]>(CONDITIONS.map(() => false));
  const [written, setWritten] = useState(false);
  const [resultVisible, setResultVisible] = useState(true);
  const [back, setBack] = useState({ href: "/finantari-nerambursabile/", label: "← Toate finanțările nerambursabile" });
  const resultRef = useRef<HTMLDivElement>(null);

  // Sticky score bar (phones): shown only while the result card is off screen.
  useEffect(() => {
    if (!resultRef.current || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => setResultVisible(entries[0].isIntersecting));
    io.observe(resultRef.current);
    return () => io.disconnect();
  }, []);

  // Back link: to the page the visitor came from, if it is on this site. Inside the app the referrer
  // is not updated, so the in-app history is asked first.
  useEffect(() => {
    const ref = document.referrer;
    const href =
      previousPath(location.pathname) ??
      (ref && ref.indexOf(location.origin) === 0 && ref !== location.href ? ref : null);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the history only exists in the browser
    if (href) setBack({ href, label: "← Înapoi" });
  }, []);

  const r = calc(parse(values, "kwh"), parse(values, "vt"), parse(values, "cp"));
  const nrChecked = checked.filter(Boolean).length;
  const conditions = nrChecked === CONDITIONS.length;
  const ok = r.status === "ok" && conditions;

  function onInput(k: Field, v: string) {
    setWritten(true);
    setValues((old) => ({ ...old, [k]: v }));
  }

  // On leaving a field: 25000 becomes 25.000, 12.5 becomes 12,5.
  function onBlur(k: Field) {
    setTouched((old) => ({ ...old, [k]: true }));
    const v = parse(values, k);
    if (v === null || isNaN(v)) return;
    setValues((old) => ({ ...old, [k]: k === "kwh" ? String(v).replace(".", ",") : Math.round(v).toLocaleString("ro-RO") }));
  }

  let info = "";
  if (r.status === "incomplet") {
    const lipsa = FIELDS.filter((f) => r.err[f.key] === "req").map((f) => NUME[f.key]);
    info = lipsa.length
      ? "Completează " +
        (lipsa.length > 1 ? lipsa.slice(0, -1).join(", ") + " și " + lipsa[lipsa.length - 1] : lipsa[0]) +
        " pentru a vedea punctajul."
      : "Corectează valorile marcate cu roșu pentru a vedea punctajul.";
    if (r.minCp !== null && r.err.cp === "req") info += " Contribuția ta minimă pentru acest proiect: " + lei(r.minCp) + ".";
  }

  const totalClass = ok ? styles.total : `${styles.total} ${r.status === "neeligibil" ? styles.bad : styles.empty}`;

  return (
    <div className={styles.calc}>
      <Link className={styles.back} href={back.href}>
        {back.label}
      </Link>
      <h1 className={styles.title}>Calculator punctaj baterii</h1>
      <p className={styles.intro}>
        Estimează punctajul și finanțarea pentru programul AFM de baterii pentru prosumatori. Completează exact
        valorile din oferta instalatorului.
      </p>

      <fieldset className={`${styles.card} ${r.status === "ok" && !conditions ? styles.cardBad : ""}`}>
        <legend className={styles.step}>
          <span>1</span>Condiții de bază
        </legend>
        <ul className={styles.checks}>
          {CONDITIONS.map((c, i) => (
            <li key={c}>
              <label>
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={(e) => setChecked((old) => old.map((v, j) => (j === i ? e.target.checked : v)))}
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.card}>
        <legend className={styles.step}>
          <span>2</span>Datele proiectului
        </legend>
        <div className={styles.grid}>
          {FIELDS.map((f) => {
            const e = r.err[f.key];
            let shown = false;
            let text = f.hint;
            if (e === "req") {
              if (touched[f.key]) {
                shown = true;
                text = "Câmp obligatoriu.";
              }
            } else if (e) {
              shown = true;
              text = e;
            }
            const warn = !shown && r.warn[f.key];
            if (warn) text = r.warn[f.key]!;
            return (
              <div className={styles.field} key={f.key}>
                <label htmlFor={`dd-${f.key}`}>{f.label}</label>
                <div className={styles.input}>
                  <input
                    id={`dd-${f.key}`}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder={f.placeholder}
                    aria-describedby={`dd-${f.key}-h`}
                    aria-invalid={shown}
                    className={warn ? styles.warned : undefined}
                    value={values[f.key]}
                    onChange={(ev) => onInput(f.key, ev.target.value)}
                    onBlur={() => onBlur(f.key)}
                  />
                  <span className={styles.unit}>{f.unit}</span>
                </div>
                <span id={`dd-${f.key}-h`} className={`${styles.hint} ${shown ? styles.err : warn ? styles.warn : ""}`}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.card} id="dd-result" ref={resultRef}>
        <p className={styles.step}>
          <span>3</span>Rezultat
        </p>
        <div className={totalClass}>
          <strong>{ok ? fmt(r.total) : "–"}</strong>
          <span>{r.status === "neeligibil" ? "Neeligibil" : "/ 100 puncte"}</span>
        </div>
        <div className={styles.bar}>
          <span style={{ width: (ok ? clamp(r.total, 100) : 0) + "%" }} />
        </div>
        <p className={styles.context}>
          Nu există un prag fix: cererile se finanțează în ordinea punctajului, până se termină bugetul. Cu cât
          punctajul e mai mare, cu atât șansele sunt mai bune.
        </p>
        <dl className={styles.rows}>
          <dt>Punctaj contribuție</dt>
          <dd>{(ok ? fmt(r.p1) : "–") + " / " + CONFIG.maxContrib}</dd>
          <dt>Punctaj baterie</dt>
          <dd>{(ok ? fmt(r.p2) : "–") + " / " + CONFIG.maxBaterie}</dd>
          <dt className={styles.sep}>Plătește AFM</dt>
          <dd className={styles.sep}>{ok ? lei(r.afm!) : "–"}</dd>
          <dt>Plătești tu</dt>
          <dd>{ok ? lei(r.own!) + " (" + fmt(r.ownPct!) + "%)" : "–"}</dd>
        </dl>
        <div aria-live="polite">
          {r.status === "incomplet" && <div className={`${styles.msg} ${styles.info}`}>{info}</div>}
          {r.status === "neeligibil" && (
            <div className={`${styles.msg} ${styles.error}`}>
              Cu aceste valori proiectul nu poate fi finanțat. Vezi câmpul marcat cu roșu.
            </div>
          )}
          {r.status === "ok" && !conditions && (
            <div className={`${styles.msg} ${styles.error}`}>
              Bifează toate cele {CONDITIONS.length} condiții de bază (ai bifat {nrChecked}). Dacă una nu e îndeplinită,
              cererea nu e eligibilă și punctajul nu se calculează.
            </div>
          )}
          {ok && r.tips.length > 0 && (
            <div className={`${styles.msg} ${styles.tip}`}>
              <strong>Cum poți crește punctajul</strong>
              <ul className={styles.tips}>
                {r.tips.map((tp) => (
                  <li key={tp.text}>
                    <span>{tp.text}</span>
                    {tp.apply && (
                      <button
                        type="button"
                        className={styles.apply}
                        onClick={() => setValues((old) => ({ ...old, cp: Number(tp.apply).toLocaleString("ro-RO") }))}
                      >
                        Aplică
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className={styles.note}>
        Estimare orientativă, calculată după ghidul de finanțare AFM. Nu garantează obținerea finanțării. Punctajul se
        stabilește din ce declari la înscriere; dacă la final bateria sau contribuția proprie sunt mai mici decât ai
        declarat și punctajul ar scădea, AFM nu decontează finanțarea.
      </p>
      <p>
        <Link className={styles.cta} href="/contact/">
          Vrei ajutor cu dosarul? Contactează-ne
        </Link>
      </p>

      <div className={`${styles.sticky} ${written && !resultVisible ? styles.show : ""}`} aria-hidden="true">
        <span>
          <strong>{ok ? fmt(r.total) : "–"}</strong> / 100 puncte
        </span>
        <button
          type="button"
          tabIndex={-1}
          onClick={() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Vezi rezultatul
        </button>
      </div>
    </div>
  );
}
