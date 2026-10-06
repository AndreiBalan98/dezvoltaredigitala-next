// Every sentence of an old page's text must be on its rebuilt page, unless tests/text-changes.mjs
// lists the change (spec 003 + 004). Reads the build output, so it runs after `npm run build`
// (the DoD order guarantees that).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { TEXT_CHANGES } from "./text-changes.mjs";

const root = (p) => new URL(`../${p}`, import.meta.url);

const decode = (s) =>
  s
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
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

const OLD_PHONE = /\+?(?:40)?0?770[ .]?102[ .]?495/g;

/**
 * Comparable form of a text: old phone replaced, fancy letters → normal (NFKD), diacritics, emoji and
 * decorative symbols dropped, lower case, punctuation other than sentence ends dropped.
 */
export function fold(s) {
  return s
    .replace(OLD_PHONE, "+40 749 589 848")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}.?!\n]+/gu, " ")
    .replace(/[ \t]+/g, " ");
}

function sentences(folded) {
  return folded
    .split("\n")
    .flatMap((line) => line.trim().split(/(?<=[.?!])\s+/))
    .map((s) => s.replace(/^[.?!\s]+/, "").trim())
    // A "sentence" without letters is a list number ("2.") or a lone figure — not text to keep.
    .filter((s) => /\p{L}/u.test(s));
}

const builtFile = (urlPath) => `.next/server/app/${urlPath === "/" ? "index" : urlPath.slice(1, -1)}.html`;

const entries = ["pages", "posts"].flatMap((dir) =>
  readdirSync(root(`content/${dir}`))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(root(`content/${dir}/${f}`), "utf8"))),
);

for (const entry of entries) {
  test(`${entry.path} keeps every sentence of the old page (or lists the change)`, () => {
    const built = builtFile(entry.path);
    assert.ok(existsSync(root(built)), `${built} missing — run \`npm run build\` first`);

    // The old posts carry a copy of the blog sidebar at the end; it is not part of the article.
    let old = "\n" + fold(text(entry.html).split(/Categorii\s+populare/i)[0]) + "\n";
    const stale = [];
    for (const c of TEXT_CHANGES.filter((c) => c.page === entry.path)) {
      const from = fold(c.old).trim();
      if (!old.includes(from)) stale.push(c.old);
      old = old.split(from).join(c.new === null ? "\n" : fold(c.new).trim());
    }
    assert.deepEqual(stale, [], "entries in tests/text-changes.mjs that no longer match the old text");

    const now = fold(text(readFileSync(root(built), "utf8"))).replace(/\s+/g, " ");
    const missing = sentences(old).filter((s) => !now.includes(s));
    assert.deepEqual(missing, [], "old sentences missing from the rebuilt page (add them, or list the change)");
  });
}
