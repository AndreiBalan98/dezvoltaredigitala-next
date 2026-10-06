import type { Metadata } from "next";
import Footer from "@/components/luminos/Footer";
import Nav from "@/components/luminos/Nav";
import s from "@/components/luminos/luminos.module.css";

// Design "Luminos" (spec 007, Apple-inspired). Served at the normal URLs by proxy.ts when chosen;
// its own /luminos/… addresses are not for search engines.
export const metadata: Metadata = { robots: { index: false } };

export default function LuminosLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-stil="luminos" className={s.site}>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <Nav />
      <main id="continut">{children}</main>
      <Footer />
    </div>
  );
}
