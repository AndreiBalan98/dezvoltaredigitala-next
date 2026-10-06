import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/article/ArticleLayout";
import FinantareStocareEnergie from "@/components/articles/FinantareStocareEnergie";
import BatteryCalculator from "@/components/BatteryCalculator";
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

// Article bodies rebuilt so far; every other post keeps the placeholder until M3.
const ARTICLES: Record<string, () => React.ReactNode> = {
  "/finantare-sisteme-stocare-energie/": FinantareStocareEnergie,
};

export default async function Page({ params }: Props) {
  const entry = findEntry(toPath((await params).path));
  if (!entry) notFound();

  if (entry.path === "/calculator-baterii/") return <BatteryCalculator />;

  const Body = ARTICLES[entry.path];
  if (Body) {
    return (
      <ArticleLayout entry={entry}>
        <Body />
      </ArticleLayout>
    );
  }

  // Placeholder until M3 builds the remaining templates.
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
