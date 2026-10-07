import type { Metadata } from "next";
import Footer from "@/components/grila/Footer";
import Header from "@/components/grila/Header";
import s from "@/components/grila/grila.module.css";

// Design "Grilă" (spec 008, built around the home page). Served at the normal URLs by proxy.ts when
// chosen; its own /grila/… addresses are not for search engines.
export const metadata: Metadata = { robots: { index: false } };

export default function GrilaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-stil="grila" className={s.site}>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <Header />
      <main id="continut">{children}</main>
      <Footer />
    </div>
  );
}
