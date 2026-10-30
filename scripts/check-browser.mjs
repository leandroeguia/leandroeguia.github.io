import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { AxeBuilder } from "@axe-core/playwright";
import { launchBrowser } from "./browser.mjs";

const base = process.env.BASE_URL || "http://localhost:4173";
const output = new URL("../test-results/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await launchBrowser();
const report = [];
try {
  for (const { language, theme } of ["en", "es"].flatMap((language) =>
    ["dark", "light"].map((theme) => ({ language, theme })),
  )) {
    const context = await browser.newContext({
      locale: language === "es" ? "es-AR" : "en-US",
      reducedMotion: "reduce",
      colorScheme: theme,
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await context.newPage();
    const errors = [];
    const externalRequests = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    page.on("request", (request) => {
      if (!request.url().startsWith(base)) externalRequests.push(request.url());
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    assert.equal((await page.goto(base)).status(), 200);
    await page.waitForFunction(() =>
      document.documentElement.classList.contains("js"),
    );
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("html").getAttribute("lang"), language);
    assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
    assert.equal(await page.locator(".motion-toggle").count(), 0);
    // Freeze only this test's snapshots; visitors always get motion.
    await page.addStyleTag({
      content:
        '*,*::before,*::after{animation:none!important;transition:none!important}[data-entry="pending"]{opacity:1!important;transform:none!important}',
    });
    assert(
      (await page.locator("h1").innerText()).includes("Leandro"),
      "Personal name leads the page",
    );

    for (const width of [320, 375, 390, 580, 768, 800, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      const overflow = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        offenders: [...document.querySelectorAll("main *, header *, footer *")]
          .filter((element) => {
            const r = element.getBoundingClientRect();
            return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
          })
          .map((element) => element.className?.baseVal ?? element.className),
      }));
      assert(
        overflow.scroll <= width + 1,
        `${language}, ${width}px horizontal overflow: ${JSON.stringify(overflow)}`,
      );
      if ([390, 1440].includes(width)) {
        await page.screenshot({
          path: fileURLToPath(
            new URL(`${language}-${theme}-${width}.png`, output),
          ),
          fullPage: true,
        });
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        report.push({ language, theme, width, violations: results.violations });
        assert.deepEqual(
          results.violations.map((v) => ({
            id: v.id,
            targets: v.nodes.map((n) => n.target),
          })),
          [],
          `${language}, ${width}px accessibility issues`,
        );
      }
    }

    const spacingStyle = await page.addStyleTag({
      content:
        "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }",
    });
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${language}: text-spacing overflow at ${width}px`,
      );
    }
    await spacingStyle.evaluate((element) => element.remove());
    await page.setViewportSize({ width: 390, height: 844 });
    const careers = page.locator(".career-row");
    const firstCareer = careers.first();
    assert.equal(await careers.count(), 4);
    assert.equal(await firstCareer.locator("summary .role-dates").count(), 0);
    assert.equal(
      await firstCareer.locator("summary .experience-type").count(),
      0,
    );
    assert.equal(
      await firstCareer.locator(".experience-content").isVisible(),
      false,
    );
    const closedHeight = await firstCareer.evaluate(
      (el) => el.getBoundingClientRect().height,
    );
    await firstCareer.locator("summary").focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction((closed) => {
      const el = document.querySelector(".career-row");
      const opacity = Number(
        getComputedStyle(el.querySelector(".experience-content")).opacity,
      );
      return (
        el.getBoundingClientRect().height > closed + 1 &&
        opacity > 0 &&
        opacity < 1
      );
    }, closedHeight);
    await page.waitForFunction(() => {
      const el = document.querySelector(".career-row");
      return el.open && !el.dataset.expanded;
    });
    assert(
      await page.locator(".experience-type").first().isVisible(),
      "Employment details become visible after opening on mobile",
    );
    await page.keyboard.press("Space");
    await page.waitForFunction(
      () => !document.querySelector(".career-row").open,
    );
    assert.equal(
      await firstCareer.locator(".experience-content").isVisible(),
      false,
    );
    // Rapid input reverses the animation without leaving a fixed or clipped height.
    await firstCareer.locator("summary").evaluate((el) => {
      el.click();
      el.click();
      el.click();
    });
    await page.waitForFunction(() => {
      const el = document.querySelector(".career-row");
      return el.open && !el.dataset.expanded && !el.style.height;
    });
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await careers.evaluateAll((nodes) =>
        nodes.forEach((el) => {
          el.open = true;
        }),
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `Expanded career details fit ${language}/${theme}/${width}`,
      );
    }
    const expandedAxe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.deepEqual(
      expandedAxe.violations.map((v) => v.id),
      [],
      "Expanded career content passes axe",
    );
    await careers.evaluateAll((nodes) =>
      nodes.forEach((el) => {
        el.open = false;
      }),
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const toggle = page.locator(".menu-toggle");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.equal(
      await toggle.evaluate((el) => document.activeElement === el),
      true,
    );
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    assert(
      await page
        .locator('.main-nav a[href="#about"]')
        .evaluate((el) => document.activeElement === el),
      "Tab after opening reaches the first menu link",
    );
    await page.keyboard.press("Tab");
    assert(
      await page
        .locator('.main-nav a[href="#work"]')
        .evaluate((el) => document.activeElement === el),
      "Tab follows menu order",
    );
    await page.keyboard.press("Shift+Tab");
    assert(
      await page
        .locator('.main-nav a[href="#about"]')
        .evaluate((el) => document.activeElement === el),
    );
    await page.keyboard.press("Escape");
    await toggle.click();
    await page.locator('.main-nav a[href="#work"]').click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.equal(new URL(page.url()).hash, "#work");
    assert(
      (await page.locator("#work").boundingBox()).y >= 70,
      "Anchor should clear sticky header",
    );

    await page.locator(".training-details summary").click();
    assert.equal(
      await page.locator(".training-details").getAttribute("open"),
      "",
    );
    assert.equal(await page.locator(".training-details li").count(), 4);
    await page.locator(".copy-email").click();
    await page.waitForFunction(
      () => document.querySelector(".copy-status").textContent.length > 0,
    );
    assert.equal(
      await page.evaluate(() => navigator.clipboard.readText()),
      "leandroeguia@gmail.com",
    );

    const next = language === "en" ? "es" : "en";
    await page.locator(`[data-language="${next}"]`).click();
    assert.equal(await page.locator("html").getAttribute("lang"), next);
    await page.reload();
    await page.waitForFunction(() =>
      document.documentElement.classList.contains("js"),
    );
    assert.equal(
      await page.locator("html").getAttribute("lang"),
      next,
      "Language persists across reloads",
    );
    const nextTheme = theme === "dark" ? "light" : "dark";
    await page.locator(".theme-toggle").click();
    await page.waitForFunction(
      (value) => document.documentElement.dataset.theme === value,
      nextTheme,
    );
    assert.equal(await page.locator("html").getAttribute("lang"), next);
    assert.equal(await page.locator("html").getAttribute("data-motion"), "on");
    await page.reload();
    await page.waitForFunction(
      (value) => document.documentElement.dataset.theme === value,
      nextTheme,
    );
    await page.goto(`${base}/#portfolio`);
    await page.waitForURL("**/#work");
    assert.deepEqual(errors, [], "No failed resources or browser exceptions");
    assert.deepEqual(externalRequests, [], "No runtime third-party requests");
    await context.close();
    console.log(
      `${language}/${theme}: 9 widths, axe, text spacing, keyboard, anchors, clipboard, theme/language persistence passed.`,
    );
  }

  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(base);
  assert.equal(await page.locator("h1").isVisible(), true);
  assert.equal(await page.locator(".main-nav").isVisible(), true);
  assert.equal(await page.locator(".language-switch").isVisible(), false);
  await page.locator('.main-nav a[href="#work"]').click();
  assert.equal(new URL(page.url()).hash, "#work");
  await page.locator(".career-row summary").first().click();
  assert.equal(
    await page.locator(".career-row .experience-content").first().isVisible(),
    true,
    "Career details open without JavaScript",
  );
  await context.close();
  console.log("No-JavaScript content and mobile navigation passed.");
} finally {
  await writeFile(
    new URL("accessibility.json", output),
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
