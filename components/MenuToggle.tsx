"use client";

import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

// On phones the main menu folds behind a "Meniu" button; on wider screens the button is hidden.
export default function MenuToggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="meniu-principal"
        onClick={() => setOpen(!open)}
      >
        {open ? "Închide" : "Meniu"}
      </button>
      <nav id="meniu-principal" aria-label="Meniu principal" className={`${styles.nav} ${open ? styles.open : ""}`}>
        {children}
      </nav>
    </>
  );
}
