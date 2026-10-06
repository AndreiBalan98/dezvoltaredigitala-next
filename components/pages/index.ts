// Every page that is not an article, shared by all designs. Each old URL must be here or in ARTICLES
// (tests/leftovers.test.mjs fails on a page without content).
import type { ComponentType } from "react";
import BatteryCalculator from "@/components/BatteryCalculator";
import type { Entry } from "@/lib/content";
import ConsultantaFonduri from "./ConsultantaFonduri";
import ConsultantaIt from "./ConsultantaIt";
import Contact from "./Contact";
import CreareWebsite from "./CreareWebsite";
import DigitalizareAutomatizare from "./DigitalizareAutomatizare";
import FundingList from "./FundingList";
import Legal from "./Legal";
import ServicesIndex from "./ServicesIndex";

export const PAGES: Record<string, ComponentType<{ entry: Entry }>> = {
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
