import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/article/ArticleLayout";
import { ARTICLES } from "@/components/articles";
import { PAGES } from "@/components/pages";
import { allEntries, findEntry, toPath, toSegments } from "@/lib/content";

// Only the exported WordPress URLs exist; anything else is a 404.
export const dynamicParams = false;

type Props = { params: Promise<{ path: string[] }> };

export function generateStaticParams() {
  return allEntries()
    .filter((e) => e.path !== "/")
    .map((e) => ({ path: toSegments(e.path) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = findEntry(toPath((await params).path));
  if (!entry) return {};
  return { title: ARTICLES[entry.path]?.title ?? entry.title };
}

export default async function Page({ params }: Props) {
  const entry = findEntry(toPath((await params).path));
  if (!entry) notFound();

  const PageBody = PAGES[entry.path];
  if (PageBody) return <PageBody entry={entry} />;

  const article = ARTICLES[entry.path];
  if (!article) notFound();
  return (
    <ArticleLayout entry={{ ...entry, title: article.title ?? entry.title }} label={article.label}>
      <article.Body />
    </ArticleLayout>
  );
}
