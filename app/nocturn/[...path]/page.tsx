import Article from "@/components/nocturn/Article";
import List from "@/components/nocturn/List";
import { designMetadata, designStaticParams, renderDesignPage, type DesignProps } from "@/lib/design-routes";

export const dynamicParams = false;
export const generateStaticParams = designStaticParams;
export const generateMetadata = designMetadata;

export default function Page(props: DesignProps) {
  return renderDesignPage(props, { List, Article });
}
