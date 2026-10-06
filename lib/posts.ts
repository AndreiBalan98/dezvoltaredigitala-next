// Posts as the candidate designs show them in lists (spec 007): newest first, with the corrected title,
// summary and label from the article registry.
import { ARTICLES } from "@/components/articles";
import { posts } from "@/lib/content";

export const FUNDING = "Finanțări nerambursabile";

const dateFormat = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "long", year: "numeric" });
const shortDateFormat = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", year: "numeric" });

export type PostCard = {
  path: string;
  title: string;
  summary: string;
  label: string;
  date: string;
  dateText: string;
  shortDate: string;
  image: { src: string; alt: string } | null;
};

export function postCards(limit?: number): PostCard[] {
  return posts()
    .slice(0, limit)
    .map((post) => {
      const article = ARTICLES[post.path];
      return {
        path: post.path,
        title: article?.title ?? post.title,
        summary: article?.summary ?? "",
        label: article?.label ?? FUNDING,
        date: post.date,
        dateText: dateFormat.format(new Date(post.date)),
        shortDate: shortDateFormat.format(new Date(post.date)),
        image: post.featuredImage ?? null,
      };
    });
}

export function formatDate(date: string): string {
  return dateFormat.format(new Date(date));
}

/** The article that links the battery calculator gets a "Calculează" action in the candidate designs. */
export const CALCULATOR_ARTICLE = "/finantare-sisteme-stocare-energie/";
