import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  return entry ? { title: entry.title } : {};
}

// Placeholder until M2/M3 build the real templates.
export default async function Page({ params }: Props) {
  const entry = findEntry(toPath((await params).path));
  if (!entry) notFound();

  return (
    <article className="reading">
      <h1>{entry.title}</h1>
      {entry.type === "post" && (
        <p className="muted">
          Publicat la{" "}
          <time dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </p>
      )}
    </article>
  );
}
