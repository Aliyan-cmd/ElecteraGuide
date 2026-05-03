/**
 * __tests__/unit/lib.test.ts
 * Unit tests for lib/utils.ts and lib/mock-data.ts
 */
import { cn, formatDate, delay } from "@/lib/utils";
import { MOCK_CONSTITUENCIES } from "@/lib/mock-data";

// ─── cn() ─────────────────────────────────────────────────────────────────────
describe("cn() utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates tailwind classes", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("handles falsy values", () => {
    expect(cn("foo", undefined, false, null as any, "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const active = true;
    expect(cn("base", active && "active", !active && "inactive")).toBe("base active");
  });
});

// ─── formatDate() ─────────────────────────────────────────────────────────────
describe("formatDate() utility", () => {
  it("formats a valid ISO date string", () => {
    const result = formatDate("2024-05-25", "en-IN");
    expect(result).toMatch(/May/i);
    expect(result).toMatch(/2024/);
  });

  it("formats with default locale", () => {
    const result = formatDate("2024-06-04");
    expect(result).toMatch(/June|Jun/i);
  });

  it("handles year boundary dates", () => {
    const result = formatDate("2024-01-01");
    expect(result).toMatch(/2024/);
    expect(result).toMatch(/January|Jan/i);
  });
});

// ─── delay() ─────────────────────────────────────────────────────────────────
describe("delay() utility", () => {
  it("resolves after given milliseconds", async () => {
    jest.useFakeTimers();
    const promise = delay(500);
    jest.advanceTimersByTime(500);
    await expect(promise).resolves.toBeUndefined();
    jest.useRealTimers();
  });
});

// ─── MOCK_CONSTITUENCIES ──────────────────────────────────────────────────────
describe("MOCK_CONSTITUENCIES data", () => {
  it("has New Delhi entry under pin 110001", () => {
    expect(MOCK_CONSTITUENCIES["110001"]).toBeDefined();
    expect(MOCK_CONSTITUENCIES["110001"].name).toBe("New Delhi");
  });

  it("constituency has required fields", () => {
    const c = MOCK_CONSTITUENCIES["110001"];
    expect(c).toHaveProperty("id");
    expect(c).toHaveProperty("state");
    expect(c).toHaveProperty("type");
    expect(c).toHaveProperty("candidates");
    expect(c).toHaveProperty("history");
    expect(c).toHaveProperty("keyDates");
  });

  it("candidates have required fields", () => {
    const candidate = MOCK_CONSTITUENCIES["110001"].candidates[0];
    expect(candidate).toHaveProperty("id");
    expect(candidate).toHaveProperty("name");
    expect(candidate).toHaveProperty("party");
    expect(candidate).toHaveProperty("education");
    expect(candidate).toHaveProperty("criminalCases");
  });

  it("history entries are ordered with newest first", () => {
    const history = MOCK_CONSTITUENCIES["110001"].history;
    expect(Number(history[0].year)).toBeGreaterThan(Number(history[1].year));
  });
});
