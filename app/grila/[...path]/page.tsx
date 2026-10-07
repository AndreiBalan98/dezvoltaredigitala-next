import Placeholder from "@/components/focus/Placeholder";
import Article from "@/components/grila/Article";
import List from "@/components/grila/List";
import Services from "@/components/grila/Services";
import s from "@/components/grila/grila.module.css";
import type { Entry } from "@/lib/content";
import { designMetadata, designStaticParams, renderFocusPage, type DesignProps } from "@/lib/design-routes";

export const dynamicParams = false;
export const generateStaticParams = designStaticParams;
export const generateMetadata = designMetadata;

function GrilaPlaceholder(props: { entry: Entry; label: string }) {
  return (
    <div className={s.wrap}>
      <Placeholder {...props} className={s.placeholder} />
    </div>
  );
}

export default function Page(props: DesignProps) {
  return renderFocusPage(props, { List, Article, Services, Placeholder: GrilaPlaceholder });
}
