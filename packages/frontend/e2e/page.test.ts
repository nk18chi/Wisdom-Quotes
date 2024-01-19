import { test, expect } from "@playwright/test";

test("Visual comparisons", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot();
});

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Hello World!!!!!!!!!!!", level: 1 })).toBeVisible();
});

test("get started link", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "CLICK NOW" }).click();
});
