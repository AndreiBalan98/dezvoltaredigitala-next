// Every sentence of the old page's text must be on the rebuilt page (spec 003: text kept word for word).
// Reads the build output, so it runs after `npm run build` (the DoD order guarantees that).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const PAGES = [
  { json: "content/posts/finantare-sisteme-stocare-energie.json", built: ".next/server/app/finantare-sisteme-stocare-energie.html" },
  { json: "content/pages/calculator-baterii.json", built: ".next/server/app/calculator-baterii.html" },
];

const decode = (s) =>
  s
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** Visible text of an HTML document, one block per line. */
function text(html) {
  return decode(
    html
      .replace(/<(style|script)[\s\S]*?<\/\1>/g, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, "\n"),
  );
}

const flat = (s) => s.replace(/\s+/g, " ");

function sentences(html) {
  return text(html)
    .split("\n")
    .flatMap((line) => flat(line).trim().split(/(?<=[.?!:;])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

for (const page of PAGES) {
  test(`${page.built} keeps every sentence of ${page.json}`, () => {
    const url = (p) => new URL(`../${p}`, import.meta.url);
    assert.ok(existsSync(url(page.built)), `${page.built} missing — run \`npm run build\` first`);
    const old = sentences(JSON.parse(readFileSync(url(page.json), "utf8")).html);
    const now = flat(text(readFileSync(url(page.built), "utf8")));
    const missing = old.filter((s) => !now.includes(s));
    assert.ok(old.length > 10, "found too little text in the old page");
    assert.deepEqual(missing, [], "sentences missing from the rebuilt page");
  });
}
