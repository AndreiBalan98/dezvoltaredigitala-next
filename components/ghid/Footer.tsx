import FooterContent from "@/components/focus/FooterContent";
import s from "./ghid.module.css";

// Light grey footer under a blue rule, link columns (spec 008, "Ghid").
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <FooterContent className={s.footerGrid} idPrefix="gf" />
        <p className={s.footerBottom}>© {new Date().getFullYear()} C&amp;A Connect S.R.L. · dezvoltaredigitala.ro</p>
      </div>
    </footer>
  );
}
