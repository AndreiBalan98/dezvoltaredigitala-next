import { test } from "node:test";
import assert from "node:assert/strict";
import { allEntries, posts, toPath, toSegments } from "../lib/content.ts";

test("every old URL from PRODUCT.md is in the export", () => {
  const paths = allEntries().map((e) => e.path);
  for (const p of [
    "/",
    "/finantari-nerambursabile/",
    "/finantare-sisteme-stocare-energie/",
    "/calculator-baterii/",
    "/servicii/",
    "/servicii/creare-website/",
    "/servicii/digitalizare-si-automatizare/",
    "/servicii/consultanta-solutii-it-si-studii-de-fezabilitate/",
    "/servicii/consultanta-pentru-accesarea-fondurilor-nerambursabile/",
    "/contact/",
    "/politica-de-confidentialitate/",
    "/termeni-si-conditii/",
    "/877-2/",
    "/test-3/",
  ]) {
    assert.ok(paths.includes(p), `missing ${p}`);
  }
});

test("export has 12 posts and 11 pages, no duplicate URLs", () => {
  const entries = allEntries();
  assert.equal(entries.filter((e) => e.type === "post").length, 12);
  assert.equal(entries.filter((e) => e.type === "page").length, 11);
  assert.equal(new Set(entries.map((e) => e.path)).size, entries.length);
});

test("path <-> segments round-trip", () => {
  assert.deepEqual(toSegments("/servicii/creare-website/"), ["servicii", "creare-website"]);
  assert.deepEqual(toSegments("/"), []);
  assert.equal(toPath(["servicii", "creare-website"]), "/servicii/creare-website/");
  assert.equal(toPath([]), "/");
});

test("funding list: 12 posts, newest first", () => {
  const list = posts();
  assert.equal(list.length, 12);
  assert.equal(list[0].path, "/finantare-sisteme-stocare-energie/");
  for (let i = 1; i < list.length; i++) assert.ok(list[i - 1].date >= list[i].date, `${list[i].path} is out of order`);
});
