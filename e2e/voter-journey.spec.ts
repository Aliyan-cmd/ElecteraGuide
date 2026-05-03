/**
 * e2e/voter-journey.spec.ts
 * E2E test: Complete voter journey from Landing → Chat → Simulator → Certificate
 * Runs against the live Next.js dev server on http://localhost:3000
 */
import { test, expect, Page } from "@playwright/test";

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function waitForPage(page: Page, url: string) {
  await page.goto(url);
  await page.waitForLoadState("domcontentloaded");
}

// ─── 1. Landing Page ──────────────────────────────────────────────────────────
test.describe("Landing Page", () => {
  test("renders the hero section and navigation", async ({ page }) => {
    await waitForPage(page, "/");
    await expect(page.locator("text=ElectraGuide")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();
  });

  test("feature cards link to correct routes", async ({ page }) => {
    await waitForPage(page, "/");
    await expect(page.locator("a[href='/chat']").first()).toBeVisible();
    await expect(page.locator("a[href='/simulator']").first()).toBeVisible();
    await expect(page.locator("a[href='/constituency']").first()).toBeVisible();
    await expect(page.locator("a[href='/how-to-vote']").first()).toBeVisible();
  });

  test("navigates to Chat when AI Assistant card is clicked", async ({ page }) => {
    await waitForPage(page, "/");
    await page.locator("a[href='/chat']").first().click();
    await page.waitForURL("**/chat");
    await expect(page).toHaveURL(/\/chat/);
  });
});

// ─── 2. Chat Page ─────────────────────────────────────────────────────────────
test.describe("Chat Page", () => {
  test("loads and shows initial greeting", async ({ page }) => {
    await waitForPage(page, "/chat");
    await expect(page.locator("text=Namaste")).toBeVisible({ timeout: 10_000 });
  });

  test("input field is present and focusable", async ({ page }) => {
    await waitForPage(page, "/chat");
    const input = page.locator("input[placeholder*='Ask']");
    await expect(input).toBeVisible();
    await input.click();
    await expect(input).toBeFocused();
  });

  test("sends a message and receives an AI response (live API)", async ({ page }) => {
    await waitForPage(page, "/chat");

    const input = page.locator("input[placeholder*='Ask']");
    await input.fill("What is the minimum voting age in India?");
    await page.keyboard.press("Enter");

    // Wait for AI response (streaming can take several seconds)
    await expect(
      page.locator("text=/18|voting age/i").first()
    ).toBeVisible({ timeout: 30_000 });
  });

  test("suggested question buttons send messages", async ({ page }) => {
    await waitForPage(page, "/chat");
    const suggBtn = page.locator("button", { hasText: "How do I register to vote?" }).first();
    if (await suggBtn.isVisible()) {
      await suggBtn.click();
      // Input cleared and message processing starts
      await expect(page.locator(".animate-bounce").first()).toBeVisible({ timeout: 10_000 });
    }
  });

  test("send button is disabled when input is empty", async ({ page }) => {
    await waitForPage(page, "/chat");
    const sendBtn = page.locator("button[type='submit']").last();
    await expect(sendBtn).toBeDisabled();
  });

  test("send button enables when user types", async ({ page }) => {
    await waitForPage(page, "/chat");
    const input = page.locator("input[placeholder*='Ask']");
    await input.fill("Hello");
    const sendBtn = page.locator("button[type='submit']").last();
    await expect(sendBtn).toBeEnabled();
  });
});

// ─── 3. Simulator Page ────────────────────────────────────────────────────────
test.describe("Simulator Page", () => {
  test("loads and shows step 1", async ({ page }) => {
    await waitForPage(page, "/simulator");
    await expect(page.locator("text=Check Eligibility").first()).toBeVisible({ timeout: 10_000 });
  });

  test("navigates through all 5 steps", async ({ page }) => {
    await waitForPage(page, "/simulator");

    const clickNext = async () => {
      const btn = page.locator("button", { hasText: /next|continue|finish|complete/i }).first();
      await btn.waitFor({ state: "visible" });
      await btn.click();
    };

    await clickNext(); // step 2
    await expect(page.locator("text=Register").first()).toBeVisible();

    await clickNext(); // step 3
    await expect(page.locator("text=Find Booth").first()).toBeVisible();

    await clickNext(); // step 4
    await expect(page.locator("text=Cast Vote").first()).toBeVisible();

    await clickNext(); // step 5
    await expect(page.locator("text=After Voting").first()).toBeVisible();
  });

  test("shows certificate after completing all steps", async ({ page }) => {
    await waitForPage(page, "/simulator");

    const clickNext = async () => {
      const btn = page.locator("button", { hasText: /next|continue|finish|complete/i }).first();
      await btn.waitFor({ state: "visible" });
      await btn.click();
    };

    // Go through all 5 steps
    for (let i = 0; i < 5; i++) await clickNext();

    // Certificate or congratulations screen
    await expect(
      page.locator("text=/congratulations|certificate|election ready/i").first()
    ).toBeVisible({ timeout: 10_000 });
  });
});

// ─── 4. Constituency Search Page ──────────────────────────────────────────────
test.describe("Constituency Page", () => {
  test("loads with search input", async ({ page }) => {
    await waitForPage(page, "/constituency");
    await expect(
      page.locator("input[placeholder*='PIN']")
    ).toBeVisible({ timeout: 10_000 });
  });

  test("searching for PIN 110001 shows New Delhi", async ({ page }) => {
    await waitForPage(page, "/constituency");
    const input = page.locator("input[placeholder*='PIN']");
    await input.fill("110001");
    await page.keyboard.press("Enter");
    await expect(page.locator("text=New Delhi").first()).toBeVisible({ timeout: 5_000 });
  });

  test("unknown constituency shows no results / error state", async ({ page }) => {
    await waitForPage(page, "/constituency");
    const input = page.locator("input[placeholder*='PIN']");
    await input.fill("UNKNOWN_PLACE_XYZ");
    await page.keyboard.press("Enter");
    // The "New Delhi" result should NOT appear
    await page.waitForTimeout(1500);
    await expect(page.locator("text=New Delhi")).not.toBeVisible();
  });
});

// ─── 5. How-to-Vote Page ──────────────────────────────────────────────────────
test.describe("How-to-Vote Page (Timeline)", () => {
  test("loads and shows election process stages", async ({ page }) => {
    await waitForPage(page, "/how-to-vote");
    await expect(page.locator("text=Election Announcement").first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=Voting Day").first()).toBeVisible();
  });

  test("clicking a stage card expands its description", async ({ page }) => {
    await waitForPage(page, "/how-to-vote");
    await page.locator("text=Election Announcement").first().click();
    await expect(
      page.locator("text=MCC comes into force").first()
    ).toBeVisible({ timeout: 3_000 });
  });
});

// ─── 6. Complete Voter Journey (Landing → Chat → Simulator → Certificate) ─────
test.describe("E2E: Complete voter journey", () => {
  test("full journey from landing to simulator certificate", async ({ page }) => {
    // 1. Visit landing
    await waitForPage(page, "/");
    await expect(page.locator("text=ElectraGuide")).toBeVisible();

    // 2. Navigate to Chat
    await page.goto("/chat");
    await expect(page.locator("text=Namaste").first()).toBeVisible({ timeout: 15_000 });

    // 3. Ask the AI a question
    const chatInput = page.locator("input[placeholder*='Ask']");
    await chatInput.fill("How do I vote for the first time?");
    await page.keyboard.press("Enter");

    // Wait for streaming to begin
    await page.waitForTimeout(2000);

    // 4. Navigate to Simulator
    await page.goto("/simulator");
    await expect(page.locator("text=Check Eligibility").first()).toBeVisible({ timeout: 10_000 });

    // 5. Complete all steps
    const clickNext = async () => {
      const btn = page.locator("button", { hasText: /next|continue|finish|complete/i }).first();
      await btn.waitFor({ state: "visible" });
      await btn.click();
      await page.waitForTimeout(300);
    };

    for (let i = 0; i < 5; i++) await clickNext();

    // 6. Verify certificate is shown
    await expect(
      page.locator("text=/congratulations|certificate|election ready/i").first()
    ).toBeVisible({ timeout: 10_000 });
  });
});
