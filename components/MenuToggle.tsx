"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";

// On phones the main menu folds behind a "Meniu" button; on wider screens the button is hidden.
export default function MenuToggle({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Close the menu after a link in it opened another page (the header stays mounted across pages).
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

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
