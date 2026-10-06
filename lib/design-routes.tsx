// Route helpers shared by the candidate designs' page trees (app/luminos, app/nocturn — spec 007).
// They serve exactly the URLs Editorial serves; proxy.ts maps a visitor's normal URL onto them.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/components/articles";
import { PAGES } from "@/components/pages";
import { allEntries, findEntry, toPath, toSegments, type Entry } from "@/lib/content";
import { FUNDING } from "@/lib/posts";

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
