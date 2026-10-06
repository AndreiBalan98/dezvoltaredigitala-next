import type { Design } from "@/lib/design";
import styles from "./StyleSwitcher.module.css";

// Demo tool (spec 007): three tiny links that switch the whole site's design. "/?stil=…" is handled by
// proxy.ts (stores the choice in a cookie, then shows the home page). Removed once a design is picked.
const DESIGN_LABELS: [Design, string][] = [
  ["editorial", "Editorial"],
  ["luminos", "Luminos"],
  ["nocturn", "Nocturn"],
];

export default function StyleSwitcher({ current, className = "" }: { current: Design; className?: string }) {
  return (
    <nav className={`${styles.switcher} ${className}`} aria-label="Designul site-ului">
      {DESIGN_LABELS.map(([id, label]) => (
        <a key={id} href={`/?stil=${id}`} className={styles.option} aria-current={id === current ? "true" : undefined}>
          {label}
        </a>
      ))}
    </nav>
  );
}
