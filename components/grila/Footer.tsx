import FooterContent from "@/components/focus/FooterContent";
import s from "./grila.module.css";

// Black footer on the same grid, white text, vermilion links on hover (spec 008, "Grilă").
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <FooterContent className={s.footerGrid} idPrefix="xf" />
        <p className={s.footerBottom}>© {new Date().getFullYear()} C&amp;A Connect S.R.L. · dezvoltaredigitala.ro</p>
      </div>
    </footer>
  );
}
