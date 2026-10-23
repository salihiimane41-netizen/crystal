import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, readFile } from "node:fs/promises";

const routes = ["/", "/menu", "/aux", "/artists", "/backstage", "/visit"];
const deploymentRoute = (route: string) =>
  `${process.env.TEST_BASE_PATH || ""}${route}`;

test("all six pages load their local assets without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  if (process.env.TEST_BASE_PATH) {
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (
        url.origin === process.env.PLAYWRIGHT_BASE_URL &&
        !url.pathname.startsWith(`${process.env.TEST_BASE_PATH}/`)
      ) {
        errors.push(`Request escaped repository path: ${url.pathname}`);
      }
    });
  }
  for (const route of routes) {
    const response = await page.goto(deploymentRoute(route));
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/CHAWARMA L7ILWIN/);
    await page.evaluate(() =>
      Array.from(document.images).forEach((image) => (image.loading = "eager")),
    );
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      Array.from(document.images).every(
        (i) => i.complete && i.naturalWidth > 0,
      ),
    );
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .locator('a[aria-current="page"]'),
    ).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test("menu filters, search, dish details, Escape and focus restoration", async ({
  page,
}) => {
  await page.goto(deploymentRoute("/menu"));
  await page.getByRole("button", { name: /Sweet Remixes/ }).click();
  await expect(page.locator(".menu-grid .menu-card")).toHaveCount(2);
  await page.getByRole("button", { name: /Pistachio Kunafa/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Pistachio Kunafa" }),
  ).toBeVisible();
  await expect(dialog).toContainText("Pistachios");
  await expect(dialog).toContainText("unverified");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: /Pistachio Kunafa/ }),
  ).toBeFocused();
  await page.getByRole("button", { name: /All the hits/ }).click();
  await page
    .getByRole("textbox", { name: "Search the menu" })
    .fill("pomegranate");
  await expect(page.locator(".menu-grid .menu-card")).toHaveCount(2);
  await page
    .getByRole("textbox", { name: "Search the menu" })
    .fill("no-such-track");
  await expect(
    page.getByRole("heading", { name: "NO TRACKS FOUND." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "RESET THE TRACKLIST" }).click();
  await expect(page.locator(".menu-grid .menu-card")).toHaveCount(19);
});

test("dish deep links and mood matching connect to actual menu entries", async ({
  page,
}) => {
  await page.goto(deploymentRoute("/menu?dish=chicken"));
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: /MAIN CHARACTER ENERGY/ }).click();
  await expect(page).toHaveURL(/aux\/?\?mood=main/);
  const choices = [
    [
      "Heartbroken but Hungry",
      "TOUM & TENDER FEELINGS",
      "The Midnight Nour",
      "pink",
    ],
    ["Chaotic Bestie", "NO SKIPS. JUST CHAOS.", "Double Trouble", "red"],
    ["Chill Mode", "SLOW SUNDAY SELECTS", "Sami’s B-Side", "green"],
    ["Main Character Energy", "MAIN CHARACTER MIX", "The Bro Combo", "yellow"],
  ];
  for (const [name, title, meal, color] of choices) {
    await page.getByRole("button", { name: new RegExp(name) }).click();
    await expect(page.locator(".mood-result")).toHaveClass(
      new RegExp(`bg-${color}`),
    );
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(
      page.locator(".food-match").getByRole("link", { name: meal }),
    ).toHaveAttribute("href", /menu\/?\?dish=/);
    await expect(page.locator(".mood-result")).toContainText(
      "PLAYLIST NOT CONNECTED",
    );
  }
  await page.getByRole("button", { name: /TRY ANOTHER MOOD/ }).click();
  await expect(
    page.getByRole("heading", { name: "TOUM & TENDER FEELINGS", exact: true }),
  ).toBeVisible();
  expect(await page.locator("audio,iframe").count()).toBe(0);
});

test("imagined celebrity visits disclose their context and link to meals", async ({
  page,
}) => {
  await page.goto(deploymentRoute("/artists"));
  await expect(page.locator(".artist-card")).toHaveCount(5);
  for (const name of [
    "Justin Bieber",
    "Nancy Ajram",
    "Maher Zain",
    "ElGrande Toto",
    "Charles Leclerc",
  ]) {
    await page.getByRole("button", { name: new RegExp(name) }).click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await expect(dialog).toContainText("FICTIONAL BRAND CONCEPT");
    await expect(dialog.getByRole("link").first()).toHaveAttribute(
      "href",
      /menu\/?\?dish=/,
    );
    await page.keyboard.press("Escape");
  }
});

test("demo pass generator validates a nickname and downloads a real PNG", async ({
  page,
}) => {
  await page.goto(deploymentRoute("/backstage"));
  await page.getByLabel("YOUR BACKSTAGE NICKNAME").fill("   ");
  await page.getByRole("button", { name: "MAKE MY DEMO PASS" }).click();
  await expect(page.locator("#nickname-error")).toBeVisible();
  await page.getByLabel("YOUR BACKSTAGE NICKNAME").fill("DJ Extra Toum");
  await page.getByRole("button", { name: "MAKE MY DEMO PASS" }).click();
  await expect(page.locator(".pass-name")).toHaveText("DJ Extra Toum");
  // The maximum-length, wide-letter nickname must also export without hanging.
  await page.getByLabel("YOUR BACKSTAGE NICKNAME").fill("W".repeat(22));
  await page.getByRole("button", { name: "REMIX MY PASS" }).click();
  await expect(page.locator(".pass-name")).toHaveText("W".repeat(22));
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /DOWNLOAD YOUR PASS/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("l7ilwin-backstage-pass.png");
  const buffer = await readFile((await download.path())!);
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(buffer.length).toBeGreaterThan(10_000);
  await expect(page.locator(".pass-status")).toContainText(
    "souvenir demo pass only",
  );
});

test("concept events open details and lead to the pass generator", async ({
  page,
}) => {
  await page.goto(deploymentRoute("/backstage"));
  await page.getByRole("button", { name: /PASS THE MIC/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("13 NOVEMBER 2026");
  await expect(dialog).toContainText("No real event");
  await dialog
    .getByRole("button", { name: /MAKE A DEMO BACKSTAGE PASS/ })
    .click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByLabel("YOUR BACKSTAGE NICKNAME")).toBeInViewport();
});

test("visit form simulates a visit without submitting a network request", async ({
  page,
}) => {
  const writes: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET" && r.method() !== "HEAD") writes.push(r.url());
  });
  await page.goto(deploymentRoute("/visit"));
  await page.getByLabel("Your nickname").fill("Imane");
  await page.getByLabel("Your crew").selectOption("4");
  const date = new Date();
  date.setDate(date.getDate() + 7);
  await page
    .getByLabel("Your imaginary date")
    .fill(date.toISOString().slice(0, 10));
  await page.getByRole("button", { name: /SIMULATE MY VISIT/ }).click();
  await expect(page.getByRole("status")).toContainText(
    "Imane, your imaginary table for 4",
  );
  await expect(page.getByRole("status")).toContainText(
    "Nothing was booked or sent",
  );
  expect(writes).toEqual([]);
  await page.getByRole("button", { name: /TRY ANOTHER DEMO VISIT/ }).click();
  await expect(page.getByLabel("Your nickname")).toBeVisible();
});

test("keyboard navigation, native dialog focus trap, and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(deploymentRoute("/"));
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.goto(deploymentRoute("/menu?dish=chicken"));
  await expect(page.getByRole("dialog")).toBeVisible();
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("mobile navigation works by touch and Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(deploymentRoute("/"));
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /The Aux/ })
    .click();
  await expect(page).toHaveURL(/aux/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeVisible();
  await page.getByRole("button", { name: /Chill Mode/ }).click();
  await expect(
    page.getByRole("heading", { name: "SLOW SUNDAY SELECTS", exact: true }),
  ).toBeVisible();
});

for (const width of [320, 375, 768, 1440]) {
  test(`every page fits the ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(deploymentRoute(route));
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(
        overflow,
        `${route} has horizontal overflow at ${width}px`,
      ).toBeLessThanOrEqual(1);
    }
  });
}

test("all pages pass automated WCAG A/AA accessibility checks", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(deploymentRoute(route));
    await page.locator("footer").scrollIntoViewIfNeeded();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
});

test("capture desktop and mobile designs", async ({ page }) => {
  await mkdir("artifacts", { recursive: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(deploymentRoute("/"));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.goto(deploymentRoute("/aux"));
  await page.screenshot({ path: "artifacts/aux-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(deploymentRoute("/"));
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
});
