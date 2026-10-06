// Temporary preview of style direction A (spec 003, Part 1). Deleted once the PO picks a direction.
import type { Metadata } from "next";
import ArticleLayout from "@/components/article/ArticleLayout";
import FinantareStocareEnergie from "@/components/articles/FinantareStocareEnergie";
import { findEntry } from "@/lib/content";

export const metadata: Metadata = { title: "Stil A – Clar", robots: { index: false, follow: false } };

export default function StilA() {
  const entry = findEntry("/finantare-sisteme-stocare-energie/")!;
  return (
    <ArticleLayout entry={entry}>
      <FinantareStocareEnergie />
    </ArticleLayout>
  );
}
