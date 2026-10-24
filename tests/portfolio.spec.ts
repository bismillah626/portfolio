import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about", "/projects", "/skills", "/contact"];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("bk-boot-seen", "1"));
});

for (const width of [360, 768, 1440]) {
  for (const theme of ["dark", "light"]) {
    test(`${width}px ${theme}: routes, overflow, console and axe`, async ({ page }) => {
      test.setTimeout(100_000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript((value) => localStorage.setItem("portfolio-theme", value), theme);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      for (const route of routes) {
        await page.goto(route);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
        const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        expect(audit.violations, `${route}: ${JSON.stringify(audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }
}

test("background changes over time and stops when paused or reduced", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator("canvas");
  const pixels = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
  await expect(page.locator("html")).toHaveAttribute("data-motion", "running");
  const moving = await pixels();
  await expect.poll(pixels).not.toEqual(moving);
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  const still = await pixels();
  await page.waitForTimeout(300);
  expect(await pixels()).toEqual(still);
  await page.getByRole("button", { name: "Resume motion", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  const reduced = await pixels();
  await page.waitForTimeout(300);
  expect(await pixels()).toEqual(reduced);
  expect(await page.locator(".ticker-track").evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  await page.setViewportSize({ width: 320, height: 740 });
  expect(await page.locator(".ticker-copy").first().evaluate((copy) => {
    const bounds = copy.getBoundingClientRect();
    return [...copy.children].every((child) => child.getBoundingClientRect().right <= bounds.right);
  })).toBeTruthy();
  await page.goto("/skills");
  const cpp = page.getByRole("button", { name: "C++", exact: true });
  await cpp.click();
  await expect(cpp).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "No recorded project", exact: true })).toBeVisible();
});

test("keyboard menu, theme persistence, project filter and dialog", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await menu.focus();
  await page.keyboard.press("Enter");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav.getByRole("link", { name: /Home/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(nav.getByRole("link", { name: /Home/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("h1")).toContainText("engineer");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.goto("/projects");
  await page.getByRole("button", { name: "ML", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  const briefing = page.getByRole("button", { name: "Briefing" });
  await briefing.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close mission briefing" })).toBeFocused();
  for (let i = 0; i < 8; i++) await page.keyboard.press("Tab");
  expect(await page.getByRole("dialog").evaluate((el) => el.contains(document.activeElement))).toBeTruthy();
  const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(briefing).toBeFocused();
});

test("chat prompts and contact validation still work", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Transmit" }).click();
  expect(await page.locator("#name").evaluate((el: HTMLInputElement) => el.validity.valueMissing)).toBeTruthy();
  await page.getByRole("button", { name: "ASK LAZYGPT" }).click();
  await expect(page.getByRole("textbox", { name: "Ask LazyGPT a question" })).toBeFocused();
  await page.getByRole("button", { name: "Tell me about Friday AI" }).click();
  await expect(page.locator(".chat-message.bot")).toContainText("FAISS");
  await expect(page.locator(".chat-suggested button")).toHaveCount(5);
  await page.getByRole("button", { name: "Close LazyGPT" }).click();
  await expect(page.locator(".chat-panel")).toHaveCount(0);
});

test("boot is skippable and absent on repeat visits or reduced motion", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:3101/");
    const boot = page.getByRole("button", { name: "Skip boot sequence" });
    await expect(boot).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(boot).toHaveCount(0);
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    await expect(boot).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    await expect(boot).toHaveCount(0);
  } finally { await context.close(); }
});

test("artwork ratios and floating controls stay within the viewport", async ({ page }) => {
  for (const [width, height] of [[360, 640], [768, 900], [1024, 768], [1440, 900], [1920, 1080], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.getByRole("button", { name: "Pause motion", exact: true }).click();
    const cover = await page.locator(".project-cover").first().boundingBox();
    expect(cover).not.toBeNull();
    expect(cover!.width / cover!.height).toBeCloseTo(4 / 3, 1);
    const main = await page.locator("main").boundingBox();
    expect(main!.x).toBeGreaterThanOrEqual(20);
    expect(main!.width).toBeLessThanOrEqual(1264);
    await page.getByRole("button", { name: "ASK LAZYGPT" }).click();
    for (const selector of [".chat-panel", ".chat-launcher", ".chat-form"]) {
      const box = await page.locator(selector).boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.y).toBeGreaterThanOrEqual(72);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    }
    const pause = await page.getByRole("button", { name: "Resume motion", exact: true }).boundingBox();
    const launch = await page.locator(".chat-launcher").boundingBox();
    expect(pause!.x + pause!.width).toBeLessThan(launch!.x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
});
