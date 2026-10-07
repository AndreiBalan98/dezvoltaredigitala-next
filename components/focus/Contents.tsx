"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };
type Classes = { root: string; heading: string; toggle: string; list: string; open: string; active: string };

const slug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// A contents list that highlights the section in view (spec 008: Ghid's "Cuprins", Atelier's service
// index). Given `items`, it links to those ids; given `scan`, it lists the h2 headings inside that
// element after loading (article bodies have no ids, so it adds them). On phones it folds behind a button;
// on wider screens the button is hidden (display: none) and a plain heading shows instead.
export default function Contents({
  items: given,
  scan,
  title = "Cuprins",
  classes,
}: {
  items?: Item[];
  scan?: string;
  title?: string;
  classes: Classes;
}) {
  const [scanned, setScanned] = useState<Item[]>([]);
  const items = given ?? scanned;
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!scan) return;
    const headings = [...document.querySelectorAll<HTMLElement>(`${scan} h2`)];
    // Reading the page's own headings once, after the server-rendered body is in place.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScanned(
      headings.map((h) => {
        if (!h.id) h.id = slug(h.textContent ?? "");
        return { id: h.id, title: h.textContent ?? "" };
      }),
    );
  }, [scan]);

  useEffect(() => {
    if (!items.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  if (!items.length) return null;
  return (
    <nav className={`${classes.root} ${open ? classes.open : ""}`} aria-label={title}>
      <p className={classes.heading} aria-hidden="true">
        {title}
      </p>
      <button type="button" className={classes.toggle} aria-expanded={open} onClick={() => setOpen(!open)}>
        {title}
      </button>
      <ol className={classes.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.id === active ? classes.active : undefined}
              aria-current={item.id === active ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
