import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

const root = new URL("../public/", import.meta.url);
const font = (
  await readFile(new URL("assets/fonts/space-grotesk-latin.woff2", root))
).toString("base64");
const browser = await launchBrowser();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><title>Leandro Eguia</title><style>
    @font-face{font-family:Space;src:url(data:font/woff2;base64,${font})}
    *{box-sizing:border-box}body{margin:0;background:#171916;color:#f0f0e9;font-family:Space,sans-serif;padding:66px 76px;height:630px;position:relative}
    .top{font-size:19px;color:#a8ada3;letter-spacing:2px}h1{font-size:140px;font-weight:500;letter-spacing:-7px;line-height:1;margin:48px 0 36px}h1 span{color:#c2f578}.bottom{border-top:1px solid #48513f;padding-top:25px;font-size:23px;display:flex;justify-content:space-between}.bottom span{color:#a8ada3}.mark{position:absolute;right:80px;top:58px;font-size:49px;letter-spacing:-4px}.mark span{color:#c2f578}
  </style><body><div class="top">SOFTWARE ENGINEER · BACKEND DEVELOPER</div><div class="mark">le<span>.</span></div><h1>Leandro<br>Eguia<span>.</span></h1><div class="bottom">Backend / Architecture / Data<span>La Plata, Argentina</span></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: fileURLToPath(new URL("assets/img/social-preview.png", root)),
  });
  console.log("Generated assets/img/social-preview.png (1200 × 630)");
} finally {
  await browser.close();
}
