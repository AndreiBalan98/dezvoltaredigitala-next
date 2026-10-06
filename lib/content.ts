// Reads the WordPress export in content/ at build time.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type Entry = {
  id: number;
  type: "post" | "page";
  slug: string;
  path: string;
  title: string;
  date: string;
  featuredImage?: { src: string; alt: string } | null;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function readDir(dir: string): Entry[] {
  return readdirSync(path.join(CONTENT_DIR, dir))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(path.join(CONTENT_DIR, dir, f), "utf8")) as Entry);
}

export function allEntries(): Entry[] {
  return [...readDir("pages"), ...readDir("posts")];
}

export function findEntry(urlPath: string): Entry | undefined {
  return allEntries().find((e) => e.path === urlPath);
}

/** "/servicii/creare-website/" -> ["servicii", "creare-website"]; "/" -> []. */
export function toSegments(urlPath: string): string[] {
  return urlPath.split("/").filter(Boolean);
}

export function toPath(segments: string[]): string {
  return segments.length ? `/${segments.join("/")}/` : "/";
}
