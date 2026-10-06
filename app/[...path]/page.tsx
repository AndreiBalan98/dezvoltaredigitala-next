import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/article/ArticleLayout";
import { ARTICLES } from "@/components/articles";
import BatteryCalculator from "@/components/BatteryCalculator";
import ConsultantaFonduri from "@/components/pages/ConsultantaFonduri";
import ConsultantaIt from "@/components/pages/ConsultantaIt";
import Contact from "@/components/pages/Contact";
import CreareWebsite from "@/components/pages/CreareWebsite";
import DigitalizareAutomatizare from "@/components/pages/DigitalizareAutomatizare";
import FundingList from "@/components/pages/FundingList";
import Legal from "@/components/pages/Legal";
import ServicesIndex from "@/components/pages/ServicesIndex";
import { allEntries, findEntry, toPath, toSegments, type Entry } from "@/lib/content";

// Only the exported WordPress URLs exist; anything else is a 404.
export const dynamicParams = false;

type Props = { params: Promise<{ path: string[] }> };

// Every page that is not an article. Each old URL must be here or in ARTICLES (tests/leftovers.test.mjs
// fails on a page without content).
const PAGES: Record<string, (props: { entry: Entry }) => React.ReactNode> = {
  "/calculator-baterii/": BatteryCalculator,
  "/finantari-nerambursabile/": FundingList,
  "/servicii/": ServicesIndex,
  "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/": ConsultantaFonduri,
  "/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/": ConsultantaIt,
  "/servicii/digitalizare-si-automatizare/": DigitalizareAutomatizare,
  "/servicii/creare-website/": CreareWebsite,
  "/contact/": Contact,
  "/politica-de-confidentialitate/": Legal,
  "/termeni-si-conditii/": Legal,
};

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
