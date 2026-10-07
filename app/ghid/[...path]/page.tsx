import Placeholder from "@/components/focus/Placeholder";
import Article from "@/components/ghid/Article";
import List from "@/components/ghid/List";
import Services from "@/components/ghid/Services";
import s from "@/components/ghid/ghid.module.css";
import type { Entry } from "@/lib/content";
import { designMetadata, designStaticParams, renderFocusPage, type DesignProps } from "@/lib/design-routes";

export const dynamicParams = false;
export const generateStaticParams = designStaticParams;
export const generateMetadata = designMetadata;

function GhidPlaceholder(props: { entry: Entry; label: string }) {
  return (
    <div className={s.wrap}>
      <Placeholder {...props} className={s.placeholder} />
    </div>
  );
}

export default function Page(props: DesignProps) {
  return renderFocusPage(props, { List, Article, Services, Placeholder: GhidPlaceholder });
}
