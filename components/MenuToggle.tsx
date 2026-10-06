"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import headerStyles from "./SiteHeader.module.css";

type Classes = { toggle: string; nav: string; open: string };

// On phones the main menu folds behind a "Meniu" button; on wider screens the button is hidden.
// Each design passes its own class names (default: Editorial's header).
export default function MenuToggle({
  children,
  classes = headerStyles as Classes,
}: {
  children: React.ReactNode;
  classes?: Classes;
}) {
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
        className={classes.toggle}
        aria-expanded={open}
        aria-controls="meniu-principal"
        onClick={() => setOpen(!open)}
      >
        {open ? "Închide" : "Meniu"}
      </button>
      <nav id="meniu-principal" aria-label="Meniu principal" className={`${classes.nav} ${open ? classes.open : ""}`}>
        {children}
      </nav>
    </>
  );
}
