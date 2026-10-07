import type { Metadata } from "next";
import Footer from "@/components/atelier/Footer";
import Header from "@/components/atelier/Header";
import s from "@/components/atelier/atelier.module.css";

// Design "Atelier" (spec 008, built around the services page). Served at the normal URLs by proxy.ts
// when chosen; its own /atelier/… addresses are not for search engines.
export const metadata: Metadata = { robots: { index: false } };

export default function AtelierLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-stil="atelier" className={s.site}>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <Header />
      <main id="continut">{children}</main>
      <Footer />
    </div>
  );
}
