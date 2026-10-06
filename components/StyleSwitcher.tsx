"use client";

import { useSyncExternalStore } from "react";
import styles from "./StyleSwitcher.module.css";

// Demo tool (spec 006): three candidate styles for the PO to compare. The choice is stored in the
// browser and applied to every page by the script in app/layout.tsx. Removed once a style is picked.
const STYLES = [
  { id: "editorial", label: "Editorial" },
  { id: "luminos", label: "Luminos" },
  { id: "nocturn", label: "Nocturn" },
];

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-stil"] });
  return () => observer.disconnect();
}

const current = () => document.documentElement.getAttribute("data-stil") ?? "editorial";

export default function StyleSwitcher() {
  const active = useSyncExternalStore(subscribe, current, () => "editorial");

  function choose(id: string) {
    document.documentElement.setAttribute("data-stil", id);
    try {
      localStorage.setItem("stil", id);
    } catch {
      // Storage blocked (private window): the style still applies to this page.
    }
  }

  return (
    <div className={styles.switcher} role="group" aria-label="Stilul site-ului">
      <span className={styles.label}>Stil</span>
      {STYLES.map((s) => (
        <button
          key={s.id}
          type="button"
          className={styles.option}
          aria-pressed={active === s.id}
          onClick={() => choose(s.id)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
