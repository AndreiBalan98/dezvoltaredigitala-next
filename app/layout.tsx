import type { Metadata } from "next";
import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import RouteHistory from "@/components/RouteHistory";
import "./globals.css";

// Fonts (direction "Editorial", spec 003). Downloaded at build time and served from this site.
const serif = Source_Serif_4({ subsets: ["latin", "latin-ext"], weight: ["600"], variable: "--font-serif" });
const sans = Source_Sans_3({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-sans" });
// Font of the two candidate designs "Luminos" and "Nocturn" (spec 007). Not preloaded: the browser only
// downloads it on their pages, so Editorial stays as fast as before.
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", preload: false });

export const metadata: Metadata = {
  title: {
    default: "Dezvoltare digitală",
    template: "%s – Dezvoltare digitală",
  },
  description: "Consultanță pentru fonduri nerambursabile și digitalizare pentru firmele din Regiunea Nord-Est.",
};

// Each design (app/(editorial), app/luminos, app/nocturn) brings its own header, footer and skip link.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${serif.variable} ${sans.variable} ${inter.variable}`}>
      <body>
        <RouteHistory />
        {children}
      </body>
    </html>
  );
}
