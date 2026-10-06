import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

// Design "Editorial" (spec 003) — the default for every visitor without a design cookie (spec 007).
export default function EditorialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>
      <SiteHeader />
      <main id="continut">{children}</main>
      <SiteFooter />
    </>
  );
}
