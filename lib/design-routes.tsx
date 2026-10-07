// Route helpers shared by the candidate designs' page trees (app/luminos, app/nocturn — spec 007; app/grila,
// app/atelier, app/ghid — spec 008). They serve exactly the URLs Editorial serves; proxy.ts maps a
// visitor's normal URL onto them.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/components/articles";
import { PAGES } from "@/components/pages";
import { allEntries, findEntry, toPath, toSegments, type Entry } from "@/lib/content";
import { CALCULATOR_ARTICLE, FUNDING } from "@/lib/posts";

export type DesignProps = { params: Promise<{ path: string[] }> };

export function designStaticParams() {
  return allEntries()
    .filter((e) => e.path !== "/")
    .map((e) => ({ path: toSegments(e.path) }));
}

export async function designMetadata({ params }: DesignProps): Promise<Metadata> {
  const entry = findEntry(toPath((await params).path));
  if (!entry) return {};
  return { title: ARTICLES[entry.path]?.title ?? entry.title };
}

type Frames = {
  List: React.ComponentType;
  Article: React.ComponentType<{ entry: Entry; label: string; children: React.ReactNode }>;
};

type FocusFrames = Frames & {
  Services: React.ComponentType;
  Placeholder: React.ComponentType<{ entry: Entry; label: string }>;
};

/** The focused designs (spec 008): services, funding list and the newest article in the design's own
 * frames; every other URL as the design's placeholder. The home page has its own route. */
export async function renderFocusPage({ params }: DesignProps, { List, Article, Services, Placeholder }: FocusFrames) {
  const entry = findEntry(toPath((await params).path));
  if (!entry) notFound();
  if (entry.path === "/finantari-nerambursabile/") return <List />;
  if (entry.path === "/servicii/") return <Services />;

  const article = ARTICLES[entry.path];
  const titled = { ...entry, title: article?.title ?? entry.title };
  if (article && entry.path === CALCULATOR_ARTICLE) {
    return (
      <Article entry={titled} label={article.label ?? FUNDING}>
        <article.Body />
      </Article>
    );
  }
  const label = article ? (article.label ?? FUNDING) : entry.path.startsWith("/servicii/") ? "Servicii" : "Pagină";
  return <Placeholder entry={titled} label={label} />;
}

/** Renders a URL with the design's own list and article frames; other pages are shared. */
export async function renderDesignPage({ params }: DesignProps, { List, Article }: Frames) {
  const entry = findEntry(toPath((await params).path));
  if (!entry) notFound();
  if (entry.path === "/finantari-nerambursabile/") return <List />;

  const PageBody = PAGES[entry.path];
  if (PageBody) return <PageBody entry={entry} />;

  const article = ARTICLES[entry.path];
  if (!article) notFound();
  return (
    <Article entry={{ ...entry, title: article.title ?? entry.title }} label={article.label ?? FUNDING}>
      <article.Body />
    </Article>
  );
}
