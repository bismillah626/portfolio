import { expect, test, type Locator } from "@playwright/test";

const studyName = "Connected ideas ribbon study";
const studyDescription = "Curiosity is the spark. I connect models, data, and interfaces until an idea becomes a working system.";

const bandTransforms = (art: Locator) => art.locator("[data-band]").evaluateAll((parts) => parts.map((part) => ({
  band: part.getAttribute("data-band"),
  transform: getComputedStyle(part).transform,
  origin: getComputedStyle(part).transformOrigin,
})));

const ambientPlayback = (art: Locator) => art.evaluate((svg) => svg.getAnimations({ subtree: true })
  .filter((animation) => animation instanceof CSSAnimation)
  .map((animation) => animation.playState));

const transitioning = (art: Locator) => art.evaluate((svg) => svg.getAnimations({ subtree: true })
  .some((animation) => animation instanceof CSSTransition && animation.playState === "running"));

async function expectInstantViewChanges(art: Locator) {
  expect(await art.locator("[data-band]").evaluateAll((parts) => parts.every((part) =>
    getComputedStyle(part).transitionDuration.split(",").every((duration) => parseFloat(duration) === 0),
  ))).toBeTruthy();
  expect(await transitioning(art)).toBeFalsy();
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("bk-boot-seen", "1"));
});

test("artwork palette keeps light mode cream and dark mode black-red", async ({ page }) => {
  await page.goto("/");
  const readPalette = () => page.locator(".hero-art-panel").evaluate((panel) => {
    const face = panel.querySelector<SVGElement>('[data-band="oblique"] path:nth-of-type(5)');
    const panelStyle = getComputedStyle(panel);
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      surface: panelStyle.backgroundColor,
      artSurface: panelStyle.getPropertyValue("--art-surface").trim(),
      face: face ? getComputedStyle(face).fill : "",
      accent: panelStyle.getPropertyValue("--art-accent").trim(),
      backgroundBase: rootStyle.getPropertyValue("--background-base").trim(),
      backgroundRed: rootStyle.getPropertyValue("--background-red").trim(),
    };
  });

  await page.evaluate(() => localStorage.setItem("portfolio-theme", "light"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect.poll(readPalette).toEqual({
    surface: "rgb(238, 230, 214)",
    artSurface: "#eee6d6",
    face: "rgb(238, 230, 214)",
    accent: "#9e302f",
    backgroundBase: "#eee6d6",
    backgroundRed: "#a8342f",
  });

  await page.evaluate(() => localStorage.setItem("portfolio-theme", "dark"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(readPalette).toEqual({
    surface: "rgb(18, 18, 18)",
    artSurface: "#121212",
    face: "rgb(168, 52, 47)",
    accent: "#ff7166",
    backgroundBase: "#090909",
    backgroundRed: "#9e302f",
  });
});

test("keyboard view controls explain the original fold and move complete ribbon bands", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const study = page.getByRole("figure", { name: studyName });
  const art = study.locator("svg");
  const controls = study.getByRole("group", { name: "Ribbon view" });
  const assembled = controls.getByRole("button", { name: "Assembled", exact: true });
  const exploded = controls.getByRole("button", { name: "Exploded", exact: true });

  await art.scrollIntoViewIfNeeded();
  await expect.poll(() => ambientPlayback(art)).toEqual(["running"]);
  await expect(controls).toHaveAccessibleDescription(studyDescription);
  await expect(study.getByText(studyDescription)).toBeVisible();
  await expect(assembled).toHaveAttribute("aria-pressed", "true");
  await expect(exploded).toHaveAttribute("aria-pressed", "false");
  const original = await bandTransforms(art);
  expect(original.length).toBeGreaterThan(3);

  await assembled.focus();
  await page.keyboard.press("Tab");
  await expect(exploded).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(exploded).toHaveAttribute("aria-pressed", "true");
  await expect(assembled).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => transitioning(art)).toBeFalsy();
  const separated = await bandTransforms(art);
  expect(new Set(separated.map((part) => part.transform)).size).toBe(3);
  for (const [index, part] of separated.entries()) {
    expect(part.transform).not.toBe(original[index].transform);
    // Rear faces, front returns, and engraved seams must remain attached.
    expect(separated.filter((other) => other.band === part.band)
      .every((other) => other.transform === part.transform && other.origin === part.origin)).toBeTruthy();
  }
  await expect(exploded).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(assembled).toBeFocused();
  await page.keyboard.press("Space");
  await expect(assembled).toHaveAttribute("aria-pressed", "true");
  await expect(exploded).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => bandTransforms(art)).toEqual(original);
});

test("pause, live reduced motion, and offscreen suspension preserve explicit view selection", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const study = page.getByRole("figure", { name: studyName });
  const art = study.locator("svg");
  const assembled = study.getByRole("button", { name: "Assembled", exact: true });
  const exploded = study.getByRole("button", { name: "Exploded", exact: true });
  await art.scrollIntoViewIfNeeded();
  await expect.poll(() => ambientPlayback(art)).toEqual(["running"]);
  const original = await bandTransforms(art);

  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await expect.poll(() => ambientPlayback(art)).toEqual(["paused"]);
  await exploded.click();
  await expect(exploded).toHaveAttribute("aria-pressed", "true");
  await expectInstantViewChanges(art);
  const separated = await bandTransforms(art);
  expect(separated).not.toEqual(original);
  await assembled.click();
  await expect(assembled).toHaveAttribute("aria-pressed", "true");
  await expectInstantViewChanges(art);
  expect(await bandTransforms(art)).toEqual(original);

  await page.getByRole("button", { name: "Resume motion", exact: true }).click();
  await expect.poll(() => ambientPlayback(art)).toEqual(["running"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await expect.poll(() => ambientPlayback(art)).toEqual([]);
  await exploded.click();
  await expect(exploded).toHaveAttribute("aria-pressed", "true");
  await expectInstantViewChanges(art);
  expect(await bandTransforms(art)).toEqual(separated);
  await assembled.click();
  await expect(assembled).toHaveAttribute("aria-pressed", "true");
  await expectInstantViewChanges(art);
  expect(await bandTransforms(art)).toEqual(original);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "running");
  await expect.poll(() => ambientPlayback(art)).toEqual(["running"]);
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
  await expect.poll(() => ambientPlayback(art)).toEqual(["paused"]);
  await art.scrollIntoViewIfNeeded();
  await expect.poll(() => ambientPlayback(art)).toEqual(["running"]);
  await expect(assembled).toHaveAttribute("aria-pressed", "true");
});

test.describe("touch views and stable artwork bounds", () => {
  test.use({ hasTouch: true, reducedMotion: "reduce" });

  for (const [width, height, theme] of [
    [320, 740, "dark"],
    [360, 800, "light"],
    [768, 900, "dark"],
    [1440, 1000, "light"],
    [844, 390, "dark"],
  ] as const) {
    test(`${width}x${height} ${theme}: touch, ratio, stamp clearance, and no layout shift or overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.addInitScript((value) => localStorage.setItem("portfolio-theme", value), theme);
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      const study = page.getByRole("figure", { name: studyName });
      const art = study.locator("svg");
      const assembled = study.getByRole("button", { name: "Assembled", exact: true });
      const exploded = study.getByRole("button", { name: "Exploded", exact: true });
      await study.scrollIntoViewIfNeeded();
      const layout = () => study.evaluate((figure) => [figure, ...figure.querySelectorAll("svg, figcaption, button")].map((element) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height };
      }));
      const initialLayout = await layout();
      const original = await bandTransforms(art);
      const ratio = await art.evaluate((svg) => {
        const style = getComputedStyle(svg);
        return parseFloat(style.width) / parseFloat(style.height);
      });
      expect(ratio).toBeCloseTo(25 / 28, 3);

      for (const button of [exploded, assembled]) {
        await button.tap();
        await expect(button).toHaveAttribute("aria-pressed", "true");
        await expectInstantViewChanges(art);
        if (button === exploded) expect(await bandTransforms(art)).not.toEqual(original);
        else expect(await bandTransforms(art)).toEqual(original);

        const currentLayout = await layout();
        for (const [index, rect] of currentLayout.entries()) {
          for (const key of ["x", "y", "width", "height"] as const) {
            expect(rect[key]).toBeCloseTo(initialLayout[index][key], 1);
          }
          expect(rect.x).toBeGreaterThanOrEqual(0);
          expect(rect.x + rect.width).toBeLessThanOrEqual(width);
        }
        expect(await art.evaluate((svg) => {
          const bounds = svg.getBoundingClientRect();
          return [...svg.querySelectorAll("[data-band]")].every((part) => {
            const rect = part.getBoundingClientRect();
            return rect.left >= bounds.left && rect.right <= bounds.right && rect.top >= bounds.top && rect.bottom <= bounds.bottom;
          });
        })).toBeTruthy();
        expect(await study.locator("button").evaluateAll((buttons) => buttons.every((control) => parseFloat(getComputedStyle(control).height) >= 44))).toBeTruthy();

        const stamp = await page.locator(".art-stamp").boundingBox();
        expect(stamp).not.toBeNull();
        for (const element of await study.locator("figcaption p, button").all()) {
          const box = (await element.boundingBox())!;
          expect(box.x + box.width <= stamp!.x || box.x >= stamp!.x + stamp!.width
            || box.y + box.height <= stamp!.y || box.y >= stamp!.y + stamp!.height).toBeTruthy();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      }
    });
  }
});
