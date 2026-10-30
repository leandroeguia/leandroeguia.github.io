import { chromium } from "playwright";
import { existsSync } from "node:fs";

export function launchBrowser() {
  const executablePath =
    process.env.BROWSER_PATH ||
    [
      "C:/Program Files/Google/Chrome/Application/chrome.exe",
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
    ].find((path) => existsSync(path));
  return chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
}
