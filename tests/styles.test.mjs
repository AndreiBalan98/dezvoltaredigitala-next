// Three designs: Editorial (default), Luminos and Nocturn, each with its own structure (spec 007).
// Reads the build output, so it runs after `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { decide } from "../lib/design.ts";

const root = (p) => new URL(`../${p}`, import.meta.url);
const built = (urlPath) => `.next/server/app/${urlPath === "/" ? "index" : urlPath.slice(1, -1)}.html`;
const read = (urlPath) => readFileSync(root(built(urlPath)), "utf8");

const paths = ["pages", "posts"].flatMap((dir) =>
  readdirSync(root(`content/${dir}`))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(root(`content/${dir}/${f}`), "utf8")).path),
);

// --- proxy.ts: which page tree serves a request ---
test("no cookie: Editorial, untouched", () => {
  assert.deepEqual(decide("/contact/", "", undefined), { kind: "next" });
});

test("design cookie: the same URL is served from that design's pages", () => {
  assert.deepEqual(decide("/contact/", "", "nocturn"), { kind: "rewrite", path: "/nocturn/contact/" });
  assert.deepEqual(decide("/", "", "luminos"), { kind: "rewrite", path: "/luminos/" });
});

test("unknown or Editorial cookie: Editorial", () => {
  assert.deepEqual(decide("/contact/", "", "xyz"), { kind: "next" });
  assert.deepEqual(decide("/contact/", "", "editorial"), { kind: "next" });
});

test("?stil= stores the design and redirects to the clean URL, keeping other parameters", () => {
  assert.deepEqual(decide("/", "?stil=luminos", undefined), { kind: "redirect", url: "/", design: "luminos" });
  assert.deepEqual(decide("/contact/", "?a=1&stil=editorial", "nocturn"), {
    kind: "redirect",
    url: "/contact/?a=1",
    design: "editorial",
  });
  assert.deepEqual(decide("/", "?stil=xyz", undefined), { kind: "next" });
});

test("the designs' own addresses are not rewritten twice", () => {
  assert.deepEqual(decide("/luminos/contact/", "", "nocturn"), { kind: "next" });
});

// --- Every page exists in every design ---
for (const design of ["luminos", "nocturn"]) {
  test(`${design}: all ${paths.length} pages are built in the design, with real content`, () => {
    for (const p of paths) {
      const file = built(`/${design}${p}`);
      assert.ok(existsSync(root(file)), `${file} missing — run \`npm run build\` first`);
      const html = readFileSync(root(file), "utf8");
      assert.match(html, new RegExp(`data-stil="${design}"`), `${p} is not in the ${design} frame`);
      assert.match(html, /<h1[^>]*>/, `${p} has no h1`);
      assert.match(html, /noindex/, `${p} can be indexed`);
    }
  });
}

test("Editorial pages carry no candidate design", () => {
  for (const p of paths) assert.doesNotMatch(read(p), /data-stil=/, p);
});

// --- The switcher: tiny links on each design's home page only ---
// Visible markup only: the page's data scripts also carry the switcher for client-side navigation.
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "");
const switcher = (html) =>
  [...visible(html).matchAll(/<a[^>]*href="\/\?stil=(\w+)"[^>]*>/g)].map((m) => [m[1], m[0].includes('aria-current="true"')]);

for (const [design, home] of [
  ["editorial", "/"],
  ["luminos", "/luminos/"],
  ["nocturn", "/nocturn/"],
]) {
  test(`${design} home has the switcher with ${design} marked`, () => {
    assert.deepEqual(switcher(read(home)), [
      ["editorial", design === "editorial"],
      ["luminos", design === "luminos"],
      ["nocturn", design === "nocturn"],
    ]);
  });
}

test("the switcher is not on other pages (PO decision)", () => {
  for (const p of ["/contact/", "/luminos/contact/", "/nocturn/contact/"]) {
    assert.doesNotMatch(visible(read(p)), /\?stil=/, p);
  }
});

// --- Colour contrast of every style (WCAG AA: 4.5:1 for text) ---
const css = readFileSync(root("app/globals.css"), "utf8");

function tokens(selector) {
  const block = css.match(new RegExp(`^${selector.replace(/[[\]"]/g, "\\$&")} \\{([\\s\\S]*?)^\\}`, "m"))?.[1];
  assert.ok(block, `no token block for ${selector}`);
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

const editorial = tokens(":root");
const STYLES = {
  editorial,
  luminos: { ...editorial, ...tokens('[data-stil="luminos"]') },
  nocturn: { ...editorial, ...tokens('[data-stil="nocturn"]') },
};

function hex(t, name) {
  let v = t[name];
  while (v.startsWith("var(")) v = t[v.slice(6, -1)];
  if (/^#[0-9a-f]{3}$/i.test(v)) v = "#" + [...v.slice(1)].map((c) => c + c).join("");
  assert.match(v, /^#[0-9a-f]{6}$/i, `--${name} is not a plain colour: ${v}`);
  return v;
}

function luminance(h) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const PAIRS = [
  ["text", "bg"],
  ["text", "tint"],
  ["muted", "bg"],
  ["muted", "tint"],
  ["accent", "bg"],
  ["accent", "tint"],
  ["button-text", "button-bg"],
  ["button-text", "button-hover"],
];

for (const [name, t] of Object.entries(STYLES)) {
  for (const [fg, bg] of PAIRS) {
    test(`${name}: --${fg} on --${bg} has contrast ≥ 4.5`, () => {
      const ratio = contrast(hex(t, fg), hex(t, bg));
      assert.ok(ratio >= 4.5, `${ratio.toFixed(2)}:1`);
    });
  }
}
