import { expect, test } from "@playwright/test";
import { profile } from "../src/data/portfolio";

test("About keeps education without GPA and the portrait responds to keyboard", async ({ page }) => {
  await page.goto("/about");
  const main = page.locator("main");
  await expect(main).not.toContainText(/C?GPA/i);
  expect(profile).not.toHaveProperty("cgpa");
  await expect(main).toContainText("IIIT Bhubaneswar");
  await expect(main).toContainText("2023–2027");
  const wink = page.getByRole("button", { name: "Wink", exact: true });
  await wink.focus();
  await page.keyboard.press("Enter");
  await expect(wink).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("img", { name: "Geometric avatar winking" })).toBeVisible();
  await page.keyboard.press("Space");
  await expect(wink).toHaveAttribute("aria-pressed", "false");
});

test("portrait gaze resets on pause, offscreen and live reduced motion", async ({ page }) => {
  await page.goto("/about");
  const portrait = page.locator("[data-expression]");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-active", "true");
  const box = await portrait.boundingBox();
  const move = () => page.mouse.move(box!.x + box!.width * .8, box!.y + box!.height * .5);
  const gaze = () => portrait.evaluate((el: HTMLElement) => el.style.getPropertyValue("--gaze-x"));
  await move();
  await expect.poll(gaze).not.toBe("");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(portrait).toHaveAttribute("data-active", "false");
  await move();
  expect(await gaze()).toBe("");
  await page.getByRole("button", { name: "Resume motion", exact: true }).click();
  await expect(portrait).toHaveAttribute("data-active", "true");
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-active", "false");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveAttribute("data-active", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait).toHaveAttribute("data-active", "false");
  expect(await gaze()).toBe("");
});

test("portrait still switches expression on touch-sized reduced-motion screens", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  const wink = page.getByRole("button", { name: "Wink", exact: true });
  await wink.click();
  await expect(wink).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("img", { name: "Geometric avatar winking" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
