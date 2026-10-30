import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { spanish } from "../lib/translations.js";

const root = new URL("../out/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert(html.includes("Leandro") && html.includes("Computer Engineer"));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
assert.equal(new Set(ids).size, ids.length);
for (const [, href] of html.matchAll(/\bhref="#([^"]+)"/g))
  assert(ids.includes(href), `Missing section ${href}`);
for (const [, key] of html.matchAll(/\bdata-i18n(?:-aria|-alt)?="([^"]+)"/g))
  assert(typeof spanish[key] === "string", `Missing Spanish key ${key}`);
for (const [, path] of html.matchAll(
  /(?:src|href)="(\/(?:assets|_next)\/[^"#?]+)(?:[?#][^"]*)?"/g,
))
  await access(new URL(path.slice(1), root));
for (const path of [
  "404.html",
  "CNAME",
  ".nojekyll",
  "assets/img/portrait.webp",
  "assets/img/social-preview.png",
  "google3dba36e45271caa9.html",
])
  await access(new URL(path, root));
assert.equal(
  (await readFile(new URL("CNAME", root), "utf8")).trim(),
  "leandroeguia.com.ar",
);
assert(!html.includes("assets/vendor"));
console.log(
  "Static Next.js export passed: pre-rendered content, translations, anchors, assets, 404, domain and Google verification.",
);
