import { expect, test, type Page } from "@playwright/test";
import { skillGroups } from "../src/data/portfolio";

const explorer = (page: Page) => page.getByRole("region", { name: "Skill-to-project explorer" });
const groups = (page: Page) => explorer(page).getByRole("group", { name: "Skill groups", exact: true });
const detail = (page: Page) => page.locator("#skill-projects");
const projectLinks = (page: Page) => detail(page).getByRole("link");
const flow = (page: Page) => page.getByTestId("skill-connections").locator('[data-flow="active"]');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("bk-boot-seen", "1"));
});

test("keyboard selection stays explicit and leads to the recorded project", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/skills");
  const genai = groups(page).getByRole("button", { name: "GenAI / Agents", exact: true });
  await genai.focus();
  await page.keyboard.press("Enter");
  await expect(genai).toHaveAttribute("aria-pressed", "true");
  await expect(explorer(page).getByRole("button", { name: "LLMs", exact: true })).toHaveAttribute("aria-pressed", "true");

  // Native tab order: last group, then the first and second skill buttons.
  await page.keyboard.press("Tab");
  await expect(groups(page).getByRole("button", { name: "Deployment / Tools", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const langchain = explorer(page).getByRole("button", { name: "LangChain", exact: true });
  await expect(langchain).toBeFocused();
  await expect(langchain).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Space");
  await expect(langchain).toHaveAttribute("aria-pressed", "true");
  await expect(langchain).toBeFocused();
  await expect(explorer(page).getByRole("status")).toHaveText("LangChain: 1 recorded project.");
  await expect(detail(page).getByRole("heading", { level: 2 })).toHaveText("LangChain");
  await expect(projectLinks(page)).toHaveCount(1);
  await expect(projectLinks(page)).toHaveAttribute("href", "/projects#friday");

  // Hover does not replace an intentional keyboard/touch selection.
  await explorer(page).getByRole("button", { name: "LangGraph", exact: true }).hover();
  await expect(langchain).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  const langgraph = explorer(page).getByRole("button", { name: "LangGraph", exact: true });
  await expect(langgraph).toBeFocused();
  await expect(langgraph).toHaveAttribute("aria-pressed", "true");
  await expect(projectLinks(page)).toHaveCount(1);
  const guardian = detail(page).getByRole("link", { name: "View Git Guardian AI project" });
  await guardian.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects#git-guardian$/);
  await expect(page.locator("#git-guardian")).toBeInViewport();
});

test("all skills remain available with specific, evidence-backed project links", async ({ page }) => {
  // This is an independent content contract, including deliberately unlisted
  // tools. In particular: MySQL != PostgreSQL, RAG != memory, Git != GitHub.
  const recorded: Record<string, string[]> = {
    Python: ["git-guardian", "churn", "friday", "spam-classifier"],
    "C++": [],
    "SQL (MySQL)": [],
    NumPy: [],
    Pandas: [],
    "Scikit-learn": ["churn", "spam-classifier"],
    PyTorch: [],
    MLflow: ["churn"],
    "Time Series Forecasting": [],
    LLMs: ["git-guardian", "friday"],
    LangChain: ["friday"],
    LangGraph: ["git-guardian"],
    "Hugging Face Transformers": [],
    FAISS: ["friday"],
    SentenceTransformers: ["friday"],
    RAG: [],
    "Agentic AI": ["git-guardian"],
    FastAPI: ["git-guardian"],
    Flask: ["churn", "spam-classifier"],
    Docker: ["git-guardian"],
    Git: [],
  };
  await page.goto("/skills");
  for (const group of skillGroups) {
    await groups(page).getByRole("button", { name: group.name, exact: true }).click();
    const tools = explorer(page).getByRole("group", { name: `${group.name} skills`, exact: true });
    await expect(tools.getByRole("button")).toHaveCount(group.skills.length);
    for (const skill of group.skills) {
      const button = tools.getByRole("button", { name: skill, exact: true });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(tools.getByRole("button", { pressed: true })).toHaveCount(1);
      const expected = recorded[skill];
      expect(expected, `Missing evidence contract for ${skill}`).toBeDefined();
      await expect(projectLinks(page)).toHaveCount(expected.length);
      expect(await projectLinks(page).evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
        .toEqual(expected.map((id) => `/projects#${id}`));
      await expect(flow(page)).toHaveCount(expected.length);
      if (expected.length === 0) {
        await expect(detail(page).getByRole("heading", { name: "No recorded project" })).toBeVisible();
        await expect(detail(page)).toContainText(`${skill} is listed in ${group.name}`);
        await expect(detail(page)).toContainText("an evidence gap, not a proficiency rating");
      }
    }
  }

  await groups(page).getByRole("button", { name: "GenAI / Agents", exact: true }).click();
  await explorer(page).getByRole("button", { name: "SentenceTransformers", exact: true }).click();
  await expect(detail(page).getByRole("listitem")).toContainText("Architecture");
  await expect(detail(page).getByRole("listitem")).toContainText("FAISS + SentenceTransformers memory");
  await explorer(page).getByRole("button", { name: "Agentic AI", exact: true }).click();
  await expect(detail(page).getByRole("listitem")).toContainText("A multi-agent DevSecOps review platform");
});

test("unsupported selection clears stale results without moving the controls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/skills");
  await expect(projectLinks(page)).toHaveCount(4);
  await page.evaluate(() => document.fonts.ready);
  const python = explorer(page).getByRole("button", { name: "Python", exact: true });
  const before = await python.boundingBox();
  const beforeHeight = await explorer(page).evaluate((element) => element.getBoundingClientRect().height);
  await explorer(page).getByRole("button", { name: "C++", exact: true }).click();
  await expect(projectLinks(page)).toHaveCount(0);
  await expect(explorer(page).getByRole("status")).toHaveText("C++: 0 recorded projects.");
  await expect(detail(page).getByRole("heading", { name: "No recorded project" })).toBeVisible();
  await expect(flow(page)).toHaveCount(0);
  expect((await python.boundingBox())?.x).toBe(before?.x);
  expect(await explorer(page).evaluate((element) => element.getBoundingClientRect().height)).toBe(beforeHeight);
  await python.click();
  await expect(projectLinks(page)).toHaveCount(4);
});

test.describe("touch-width explorer", () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true });

  test("tap selection, visible feedback and 44px targets lead to the real project", async ({ page }) => {
    await page.goto("/skills");
    await groups(page).getByRole("button", { name: "GenAI / Agents", exact: true }).tap();
    const faiss = explorer(page).getByRole("button", { name: "FAISS", exact: true });
    await faiss.tap();
    await expect(faiss).toHaveAttribute("aria-pressed", "true");
    await expect(faiss).toBeInViewport();
    await expect(explorer(page).getByRole("status")).toHaveText("FAISS: 1 recorded project.");
    for (const button of await explorer(page).getByRole("button").all()) {
      const box = await button.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
    }
    const jump = explorer(page).getByRole("link", { name: "View 1 project", exact: true });
    expect((await jump.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await jump.tap();
    await expect(detail(page).getByRole("heading", { level: 2, name: "FAISS" })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    const friday = detail(page).getByRole("link", { name: "View Friday AI project" });
    await friday.tap();
    await expect(page).toHaveURL(/\/projects#friday$/);
    await expect(page.locator("#friday")).toBeInViewport();
  });

  test("reduced-motion visitors keep working controls and evidence navigation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/skills");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    await expect(page.getByRole("button", { name: "Resume motion (disabled by reduced-motion preference)" })).toBeDisabled();
    const cpp = explorer(page).getByRole("button", { name: "C++", exact: true });
    await expect(cpp).toBeEnabled();
    await cpp.tap();
    await expect(cpp).toHaveAttribute("aria-pressed", "true");
    await expect(projectLinks(page)).toHaveCount(0);
    await groups(page).getByRole("button", { name: "Deployment / Tools", exact: true }).tap();
    await explorer(page).getByRole("button", { name: "Flask", exact: true }).tap();
    await expect(projectLinks(page)).toHaveCount(2);
    for (const path of await flow(page).all()) {
      expect(await path.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
    }
    await explorer(page).getByRole("link", { name: "View 2 projects", exact: true }).tap();
    await detail(page).getByRole("link", { name: "View Spam Email Classifier project" }).tap();
    await expect(page).toHaveURL(/\/projects#spam-classifier$/);
    await expect(page.locator("#spam-classifier")).toBeInViewport();
  });
});

test("root pause and live reduced-motion changes stop decoration, not selection", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/skills");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "running");
  await groups(page).getByRole("button", { name: "GenAI / Agents", exact: true }).click();
  expect(await flow(page).first().evaluate((element) => getComputedStyle(element).animationName)).not.toBe("none");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  const langgraph = explorer(page).getByRole("button", { name: "LangGraph", exact: true });
  await langgraph.click();
  await expect(projectLinks(page)).toHaveAttribute("href", "/projects#git-guardian");
  expect(await flow(page).first().evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  expect(await langgraph.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");

  await page.getByRole("button", { name: "Resume motion", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "running");
  await explorer(page).getByRole("button", { name: "LangChain", exact: true }).click();
  expect(await flow(page).first().evaluate((element) => getComputedStyle(element).animationName)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  expect(await flow(page).first().evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await langgraph.focus();
  await page.keyboard.press("Space");
  await expect(langgraph).toHaveAttribute("aria-pressed", "true");
  await expect(projectLinks(page)).toHaveAttribute("href", "/projects#git-guardian");
  await expect(explorer(page).getByRole("status")).toHaveText("LangGraph: 1 recorded project.");
});
