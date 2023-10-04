import { expect, test } from "@playwright/test";

test("page test", async ({ page }) => {
    // Define page endpoint URL
    const url = "https://play.google.com";

    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
});
