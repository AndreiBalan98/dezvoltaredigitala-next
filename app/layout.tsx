import type { Metadata } from "next";
import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import RouteHistory from "@/components/RouteHistory";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// Fonts (direction "Editorial", spec 003). Downloaded at build time and served from this site.
const serif = Source_Serif_4({ subsets: ["latin", "latin-ext"], weight: ["600"], variable: "--font-serif" });
const sans = Source_Sans_3({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-sans" });
// Font of the two candidate styles "Luminos" and "Nocturn" (spec 006). Not preloaded: the browser only
// downloads it when one of those styles is active, so the default style stays as fast as before.
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", preload: false });

// Sets the style before the first paint (no flash): `?stil=` in the URL wins, is remembered and is removed
// from the address (so a reload keeps a later switcher choice), otherwise the remembered choice,
// otherwise Editorial (no attribute). Kept in sync with StyleSwitcher.
const STYLE_SCRIPT = `try{var v=["editorial","luminos","nocturn"],r=document.documentElement,q=new URLSearchParams(location.search).get("stil");if(v.indexOf(q)>-1){r.setAttribute("data-stil",q);history.replaceState(history.state,"",location.pathname+location.hash);localStorage.setItem("stil",q)}else{var s=localStorage.getItem("stil");if(v.indexOf(s)>-1)r.setAttribute("data-stil",s)}}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: "Dezvoltare digitală",
    template: "%s – Dezvoltare digitală",
  },
  description: "Consultanță pentru fonduri nerambursabile și digitalizare pentru firmele din Regiunea Nord-Est.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${serif.variable} ${sans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: STYLE_SCRIPT }} />
      </head>
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
