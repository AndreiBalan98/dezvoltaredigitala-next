import type { Metadata } from "next";
import Footer from "@/components/ghid/Footer";
import Header from "@/components/ghid/Header";
import s from "@/components/ghid/ghid.module.css";

// Design "Ghid" (spec 008, built around the article page). Served at the normal URLs by proxy.ts when
// chosen; its own /ghid/… addresses are not for search engines.
export const metadata: Metadata = { robots: { index: false } };

export default function GhidLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-stil="ghid" className={s.site}>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <Header />
      <main id="continut">{children}</main>
      <Footer />
    </div>
  );
}
