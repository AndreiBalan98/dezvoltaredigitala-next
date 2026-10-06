// No leftovers from the old site in any built page (spec 004), and no page is an empty placeholder.
// Reads the build output, so it runs after `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { REMOVED_IMAGES } from "./text-changes.mjs";

const root = (p) => new URL(`../${p}`, import.meta.url);
const builtFile = (urlPath) => `.next/server/app/${urlPath === "/" ? "index" : urlPath.slice(1, -1)}.html`;

const paths = ["pages", "posts"].flatMap((dir) =>
  readdirSync(root(`content/${dir}`))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(root(`content/${dir}/${f}`), "utf8")).path),
);

const CHECKS = [
  ["page-builder classes", /class="[^"]*\b(?:eb-|stk-|uagb|wp-block-|wpb-)/],
  ["Facebook images", /fbcdn\.net/],
  ["old phone number", /0?770[ .]?102[ .]?495/],
  ["links to the old site", /(?:href|src)="https?:\/\/(?:www\.)?dezvoltaredigitala\.ro/],
  // © and ® are allowed (footer); real emoji are not.
  ["emoji", /(?![©®™])\p{Extended_Pictographic}/u],
  ["fancy Unicode letters", /[\u{1D400}-\u{1D7FF}]/u],
];

/** Words inside <main>, without scripts. */
function mainWords(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
  return main
    .replace(/<(style|script)[\s\S]*?<\/\1>/g, "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter((w) => /\p{L}/u.test(w)).length;
}

for (const p of paths) {
  test(`${p} has no old-site leftovers and real content`, () => {
    const file = builtFile(p);
    assert.ok(existsSync(root(file)), `${file} missing — run \`npm run build\` first`);
    const html = readFileSync(root(file), "utf8");
    const found = CHECKS.filter(([, re]) => re.test(html)).map(([name, re]) => `${name}: ${html.match(re)[0]}`);
    const stillShown = REMOVED_IMAGES.filter((r) => r.page === p && html.includes(r.file)).map((r) => r.file);
    assert.deepEqual([...found, ...stillShown], []);
    // A title-only placeholder has ~5 words; the shortest real page (contact) has ~40.
    assert.ok(mainWords(html) >= 25, `only ${mainWords(html)} words of content — still a placeholder?`);
  });
}

test("every image on the removed list was on that old page", () => {
  const oldHtml = Object.fromEntries(
    ["pages", "posts"].flatMap((dir) =>
      readdirSync(root(`content/${dir}`))
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(readFileSync(root(`content/${dir}/${f}`), "utf8")))
        .map((e) => [e.path, e.html]),
    ),
  );
  const unknown = REMOVED_IMAGES.filter((r) => !oldHtml[r.page]?.includes(r.file)).map((r) => `${r.page} ${r.file}`);
  assert.deepEqual(unknown, []);
});
