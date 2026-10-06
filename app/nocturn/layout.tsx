import type { Metadata } from "next";
import Footer from "@/components/nocturn/Footer";
import Sidebar from "@/components/nocturn/Sidebar";
import s from "@/components/nocturn/nocturn.module.css";

// Design "Nocturn" (spec 007, Linear-inspired): a left sidebar instead of a top header. Served at the
// normal URLs by proxy.ts when chosen; its own /nocturn/… addresses are not for search engines.
export const metadata: Metadata = { robots: { index: false } };

export default function NocturnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-stil="nocturn" className={s.site}>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <Sidebar />
      <div className={s.content}>
        <main id="continut">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
