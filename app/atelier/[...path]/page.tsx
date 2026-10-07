import Article from "@/components/atelier/Article";
import List from "@/components/atelier/List";
import Services from "@/components/atelier/Services";
import s from "@/components/atelier/atelier.module.css";
import Placeholder from "@/components/focus/Placeholder";
import type { Entry } from "@/lib/content";
import { designMetadata, designStaticParams, renderFocusPage, type DesignProps } from "@/lib/design-routes";

export const dynamicParams = false;
export const generateStaticParams = designStaticParams;
export const generateMetadata = designMetadata;

function AtelierPlaceholder(props: { entry: Entry; label: string }) {
  return (
    <div className={s.wrap}>
      <Placeholder {...props} className={s.placeholder} />
    </div>
  );
}

export default function Page(props: DesignProps) {
  return renderFocusPage(props, { List, Article, Services, Placeholder: AtelierPlaceholder });
}
