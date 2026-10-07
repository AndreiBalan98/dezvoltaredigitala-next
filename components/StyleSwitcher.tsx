import type { Design } from "@/lib/design";
import styles from "./StyleSwitcher.module.css";

// Demo tool (specs 007, 008): tiny links that switch the whole site's design. "/?stil=…" is handled by
// proxy.ts (stores the choice in a cookie, then shows the home page). Removed once a design is picked.
// Two groups: the three full designs, then the three designs built around one page each (spec 008).
const GROUPS: [Design, string][][] = [
  [
    ["editorial", "Editorial"],
    ["luminos", "Luminos"],
    ["nocturn", "Nocturn"],
  ],
  [
    ["grila", "Grilă"],
    ["atelier", "Atelier"],
    ["ghid", "Ghid"],
  ],
];

export default function StyleSwitcher({ current, className = "" }: { current: Design; className?: string }) {
  return (
    <nav className={`${styles.switcher} ${className}`} aria-label="Designul site-ului">
      {GROUPS.map((group, i) => (
        <span key={i} className={styles.group}>
          {group.map(([id, label]) => (
            <a key={id} href={`/?stil=${id}`} className={styles.option} aria-current={id === current ? "true" : undefined}>
              {label}
            </a>
          ))}
        </span>
      ))}
    </nav>
  );
}
