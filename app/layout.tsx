import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dezvoltare digitală",
    template: "%s – Dezvoltare digitală",
  },
  description: "Consultanță pentru fonduri nerambursabile și digitalizare pentru firmele din Regiunea Nord-Est.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
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
