// After `next build`: every exported WordPress URL must have a prerendered HTML page.
// Usage: npm run check:routes   (exits 1 and names each missing URL)

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BUILT = path.join(ROOT, ".next", "server", "app");

if (!existsSync(BUILT)) {
  console.error("No build output in .next/server/app — run `npm run build` first.");
  process.exit(1);
}

const paths = ["pages", "posts"].flatMap((dir) =>
  readdirSync(path.join(ROOT, "content", dir))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(path.join(ROOT, "content", dir, f), "utf8")).path),
);

const htmlFile = (urlPath) => (urlPath === "/" ? "index.html" : `${urlPath.slice(1, -1)}.html`);
const missing = paths.filter((p) => !existsSync(path.join(BUILT, htmlFile(p))));
if (!existsSync(path.join(BUILT, "_not-found.html"))) missing.push("(404 page)");

console.log(`check:routes — ${paths.length - missing.length} of ${paths.length} exported URLs built.`);
if (missing.length) {
  console.error("Missing:\n  " + missing.join("\n  "));
  process.exit(1);
}
