// Every rebuilt article: URL → body, one-sentence summary (funding list, home), kicker label and,
// where the old title lacked diacritics or had a typo, the corrected title.
import type { ComponentType } from "react";
import BizzClub, * as bizzClub from "./BizzClub";
import BizzClubBotosani, * as bizzClubBotosani from "./BizzClubBotosani";
import EconomiaCirculara, * as economiaCirculara from "./EconomiaCirculara";
import EduWebLab, * as eduWebLab from "./EduWebLab";
import FinantareStocareEnergie, * as stocare from "./FinantareStocareEnergie";
import GhidulIncepatorului, * as ghidul from "./GhidulIncepatorului";
import MicrointreprindereNordEst, * as microNordEst from "./MicrointreprindereNordEst";
import ModernizareMicrointreprinderi, * as modernizare from "./ModernizareMicrointreprinderi";
import ProvocareProfesionala, * as provocare from "./ProvocareProfesionala";
import RegiuneDigitalizata, * as regiune from "./RegiuneDigitalizata";
import StartUpNation2025, * as startUp from "./StartUpNation2025";
import VInnovate2025, * as vinnovate from "./VInnovate2025";

export type Article = {
  Body: ComponentType;
  summary: string;
  label?: string;
  title?: string;
};

const NEWS = "Noutăți";

export const ARTICLES: Record<string, Article> = {
  "/finantare-sisteme-stocare-energie/": { Body: FinantareStocareEnergie, summary: stocare.summary },
  "/ghidul-incepatorului-in-accesarea-fondurilor-europene-ce-trebuie-sa-stii-inainte-sa-aplici/": {
    Body: GhidulIncepatorului,
    summary: ghidul.summary,
  },
  "/o-regiune-mai-digitalizata/": { Body: RegiuneDigitalizata, summary: regiune.summary },
  "/ai-o-microintreprindere-in-regiunea-nord-est-si-te-gandesti-sa-o-modernizezi/": {
    Body: MicrointreprindereNordEst,
    summary: microNordEst.summary,
  },
  "/apelul-regional-vinnovate-2025/": { Body: VInnovate2025, summary: vinnovate.summary },
  "/start-up-nation-2025/": { Body: StartUpNation2025, summary: startUp.summary, title: "Start-Up Nation 2025" },
  "/economia-circulara/": { Body: EconomiaCirculara, summary: economiaCirculara.summary, title: "Economia circulară" },
  "/investitii-pentru-modernizarea-microintreprinderilor/": {
    Body: ModernizareMicrointreprinderi,
    summary: modernizare.summary,
  },
  "/877-2/": { Body: EduWebLab, summary: eduWebLab.summary, label: NEWS },
  "/test-2/": { Body: ProvocareProfesionala, summary: provocare.summary, label: NEWS },
  "/test-3/": { Body: BizzClub, summary: bizzClub.summary, label: NEWS },
  "/bizz-club-botosani/": { Body: BizzClubBotosani, summary: bizzClubBotosani.summary, label: NEWS },
};
