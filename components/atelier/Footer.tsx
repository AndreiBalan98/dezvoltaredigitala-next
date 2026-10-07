import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/components/SiteFooter";
import FooterContent from "@/components/focus/FooterContent";
import s from "./atelier.module.css";

// Navy contact band, then a light footer with hairline columns (spec 008, "Atelier").
export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.band}>
        <div className={s.wrap}>
          <p className={s.bandTitle}>Ai nevoie de ajutor?</p>
          <p className={s.bandLinks}>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </div>
      <div className={s.wrap}>
        <FooterContent className={s.footerGrid} idPrefix="af" />
        <p className={s.footerBottom}>© {new Date().getFullYear()} C&amp;A Connect S.R.L. · dezvoltaredigitala.ro</p>
      </div>
    </footer>
  );
}
