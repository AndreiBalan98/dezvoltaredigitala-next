// Three candidate styles with a switcher (spec 006). Reads the build output, so it runs after `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = (p) => new URL(`../${p}`, import.meta.url);
const home = readFileSync(root(".next/server/app/index.html"), "utf8");
const article = readFileSync(root(".next/server/app/finantare-sisteme-stocare-energie.html"), "utf8");

test("the home page has the switcher with three buttons, Editorial pressed by default", () => {
  const buttons = [...home.matchAll(/<button[^>]*aria-pressed="(true|false)"[^>]*>([^<]+)<\/button>/g)];
  assert.deepEqual(
    buttons.map((b) => [b[2], b[1]]),
    [
      ["Editorial", "true"],
      ["Luminos", "false"],
      ["Nocturn", "false"],
    ],
  );
});

test("the switcher is on the home page only (PO decision)", () => {
  assert.doesNotMatch(article, /aria-label="Stilul site-ului"/);
});

// --- The script in <head> that applies the style before the first paint ---
const script = article.match(/<script>(try\{var v=\["editorial"[\s\S]*?)<\/script>/)?.[1];

function runScript({ search = "", stored = null, storageBlocked = false } = {}) {
  const attrs = {};
  const store = { stil: stored };
  const localStorage = {
    getItem: (k) => {
      if (storageBlocked) throw new Error("blocked");
      return store[k] ?? null;
    },
    setItem: (k, v) => {
      if (storageBlocked) throw new Error("blocked");
      store[k] = v;
    },
  };
  const document = { documentElement: { setAttribute: (k, v) => (attrs[k] = v) } };
  const location = { search, pathname: "/", hash: "" };
  const history = { state: null, replaceState: (_s, _t, url) => (location.search = url.includes("?") ? url : "") };
  new Function("document", "localStorage", "location", "history", "URLSearchParams", script)(
    document,
    localStorage,
    location,
    history,
    URLSearchParams,
  );
  return { style: attrs["data-stil"], stored: store.stil, search: location.search };
}

test("every page carries the style script", () => {
  assert.ok(script, "style script missing from the article page");
  assert.ok(home.includes(script), "style script missing from the home page");
});

test("?stil= in the URL applies the style, remembers it and leaves the address", () => {
  assert.deepEqual(runScript({ search: "?stil=nocturn" }), { style: "nocturn", stored: "nocturn", search: "" });
});

test("the remembered style applies when the URL has none", () => {
  assert.deepEqual(runScript({ stored: "luminos" }), { style: "luminos", stored: "luminos", search: "" });
});

test("an unknown style is ignored (Editorial)", () => {
  assert.equal(runScript({ search: "?stil=xyz" }).style, undefined);
  assert.equal(runScript({ stored: "xyz" }).style, undefined);
});

test("blocked storage (private window) does not break the page; the URL still works", () => {
  assert.equal(runScript({ storageBlocked: true }).style, undefined);
  assert.equal(runScript({ search: "?stil=luminos", storageBlocked: true }).style, "luminos");
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
