import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import RouteHistory from "@/components/RouteHistory";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// Fonts (direction "Editorial", spec 003). Downloaded at build time and served from this site.
const serif = Source_Serif_4({ subsets: ["latin", "latin-ext"], weight: ["600"], variable: "--font-serif" });
const sans = Source_Sans_3({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Dezvoltare digitală",
    template: "%s – Dezvoltare digitală",
  },
  description: "Consultanță pentru fonduri nerambursabile și digitalizare pentru firmele din Regiunea Nord-Est.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#continut">
          Sari la conținut
        </a>
        <RouteHistory />
        <SiteHeader />
        <main id="continut">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
