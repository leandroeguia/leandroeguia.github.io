import assert from "node:assert/strict";
import { launchBrowser } from "./browser.mjs";

const browser = await launchBrowser();
try {
  const page = await browser.newPage({
    locale: "es-AR",
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(process.env.BASE_URL || "http://localhost:4173");
  await page.waitForFunction(() =>
    document.querySelector(".hero-role").classList.contains("is-typing"),
  );
  await page.waitForFunction(() => {
    const n = document.querySelector(".typed-role").textContent.length;
    return n > 0 && n < 23;
  });
  const initial = await page.locator(".typed-role").textContent();
  assert("Ingeniero en Computación".startsWith(initial));
  const height = await page
    .locator(".hero-role")
    .evaluate((el) => el.getBoundingClientRect().height);
  await page.waitForFunction(
    () => !document.querySelector(".hero-role").classList.contains("is-typing"),
  );
  assert.equal(
    await page.locator(".role-text").textContent(),
    "Ingeniero en Computación",
  );
  assert.equal(
    await page
      .locator(".hero-role")
      .evaluate((el) => el.getBoundingClientRect().height),
    height,
    "Typing reserves the final text height",
  );
  await page.locator(".work-card").first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .some((a) => a.effect?.target?.classList.contains("work-card")),
  );
  await page.waitForFunction(
    () =>
      !document
        .getAnimations()
        .some((a) => a.effect?.target?.classList.contains("work-card")),
  );
  assert.equal(
    await page
      .locator(".work-card")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  await page.locator('[data-language="en"]').click();
  await page.waitForFunction(() =>
    document.querySelector(".typed-role").textContent.startsWith("Comp"),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.locator("html").getAttribute("data-motion"),
    "on",
    "Motion is enabled by default, independently of OS settings",
  );
  assert.equal(
    await page.locator(".role-text").textContent(),
    "Computer Engineer",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator('.main-nav a[href="#work"]').click();
  const destination = await page
    .locator("#work")
    .evaluate((el) => el.getBoundingClientRect().top + scrollY - 110);
  await page.waitForFunction(
    (end) => scrollY > 30 && scrollY < end - 30,
    destination,
  );
  await page.waitForFunction((end) => Math.abs(scrollY - end) < 2, destination);
  assert.equal(new URL(page.url()).hash, "#work");
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .some((animation) => animation.effect?.target?.closest("#work")),
  );
  await page.waitForFunction(() => {
    const opacity = Number(
      getComputedStyle(document.querySelector("#work .section-heading"))
        .opacity,
    );
    return opacity > 0.05 && opacity < 0.95;
  });
  await page.waitForFunction(
    () =>
      !document
        .getAnimations()
        .some((animation) => animation.effect?.target?.closest("#work")),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".menu-toggle").click();
  await page.locator('.main-nav a[href="#about"]').click();
  await page.waitForFunction(
    () =>
      Math.abs(
        document.querySelector("#about").getBoundingClientRect().top - 95,
      ) < 2,
  );
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  assert.deepEqual(errors, []);
  await page.close();
  const reducedContext = await browser.newContext({
    locale: "es-AR",
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
  });
  const reducedPage = await reducedContext.newPage();
  const runtimeErrors = [];
  reducedPage.on("pageerror", (error) => runtimeErrors.push(error.message));
  await reducedPage.goto(process.env.BASE_URL || "http://localhost:4173");
  await reducedPage.waitForFunction(
    () => document.documentElement.dataset.motion === "on",
  );
  await reducedPage.waitForFunction(() =>
    document.querySelector(".hero-role").classList.contains("is-typing"),
  );
  assert(
    await reducedPage.evaluate(() =>
      document
        .getAnimations()
        .some((a) => a.effect?.target?.classList.contains("portrait-wrap")),
    ),
    "Default motion works when the system requests reduced motion",
  );
  assert.equal(
    await reducedPage.locator(".motion-toggle").count(),
    0,
    "No animation pause control",
  );
  await reducedPage.locator(".theme-toggle").click();
  assert.equal(
    await reducedPage.locator("html").getAttribute("data-motion"),
    "on",
    "Theme changes keep motion enabled",
  );
  await reducedPage.goto(process.env.BASE_URL || "http://localhost:4173");
  await reducedPage.waitForFunction(
    () => document.documentElement.dataset.motion === "on",
  );
  assert.deepEqual(runtimeErrors, [], "Export hydrates without browser errors");
  await reducedContext.close();
  console.log(
    "Motion passed: progressive typing, reserved space, scroll reveal, language change, live reduced-motion preference, no browser errors.",
  );
} finally {
  await browser.close();
}
