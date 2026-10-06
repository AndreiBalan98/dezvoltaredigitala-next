import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// Direction B fonts (spec 003). Downloaded at build time and served from this site.
const serifB = Source_Serif_4({ subsets: ["latin", "latin-ext"], weight: ["600"], variable: "--font-serif-b" });
const sansB = Source_Sans_3({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-sans-b" });

export const metadata: Metadata = {
  title: {
    default: "Dezvoltare digitală",
    template: "%s – Dezvoltare digitală",
  },
  description: "Consultanță pentru fonduri nerambursabile și digitalizare pentru firmele din Regiunea Nord-Est.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${serifB.variable} ${sansB.variable}`}>
      <body>
        <a className="skip-link" href="#continut">
          Sari la conținut
        </a>
        <SiteHeader />
        <main id="continut">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
