// Temporary preview of style direction B (spec 003, Part 1). Deleted once the PO picks a direction.
import type { Metadata } from "next";
import ArticleLayout from "@/components/article/ArticleLayout";
import FinantareStocareEnergie from "@/components/articles/FinantareStocareEnergie";
import { findEntry } from "@/lib/content";

export const metadata: Metadata = { title: "Stil B – Editorial", robots: { index: false, follow: false } };

export default function StilB() {
  const entry = findEntry("/finantare-sisteme-stocare-energie/")!;
  return (
    <>
      {/* Marker: globals.css switches the whole page (header and footer too) to direction B. */}
      <div className="dir-b" hidden />
      <ArticleLayout entry={entry}>
        <FinantareStocareEnergie />
      </ArticleLayout>
    </>
  );
}
