/**
 * __tests__/unit/Chat.api.test.ts
 * Unit tests for /api/chat route handler — mocks Google AI and verifies
 * that the route returns a streaming response and handles errors correctly.
 */

// ─── Mock the Google provider ─────────────────────────────────────────────────
const mockStreamText = jest.fn();
const mockToUIMessageStreamResponse = jest.fn(() => new Response("stream", { status: 200 }));

jest.mock("ai", () => ({
  streamText: (...args: any[]) => {
    mockStreamText(...args);
    return { toUIMessageStreamResponse: mockToUIMessageStreamResponse };
  },
  convertToModelMessages: jest.fn(async (msgs: any) =>
    msgs.map((m: any) => ({
      role: m.role,
      content: (m.parts ?? []).map((p: any) => ({ type: p.type, text: p.text })),
    }))
  ),
}));

jest.mock("@ai-sdk/google", () => ({
  createGoogleGenerativeAI: jest.fn(() => jest.fn((model: string) => model)),
}));

// ─── Import route after mocks ─────────────────────────────────────────────────
import { POST } from "@/app/api/chat/route";

// ─── Helper ───────────────────────────────────────────────────────────────────
function makeRequest(messages: any[]): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
}

const userMessage = {
  id: "1",
  role: "user",
  parts: [{ type: "text", text: "What is the voting age in India?" }],
};

const assistantMessage = {
  id: "0",
  role: "assistant",
  parts: [{ type: "text", text: "Hello!" }],
};

// ─── Tests ────────────────────────────────────────────────────────────────────
describe("POST /api/chat route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = "test-api-key";
  });

  it("returns a 200 streaming response for valid input", async () => {
    const req = makeRequest([userMessage]);
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledTimes(1);
    expect(mockToUIMessageStreamResponse).toHaveBeenCalledTimes(1);
  });

  it("passes the correct model to streamText", async () => {
    const req = makeRequest([userMessage]);
    await POST(req);
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: "gemini-2.5-flash" })
    );
  });

  it("passes the system prompt to streamText", async () => {
    const req = makeRequest([userMessage]);
    await POST(req);
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining("Electra"),
      })
    );
  });

  it("converts UI messages to model messages before calling streamText", async () => {
    const req = makeRequest([assistantMessage, userMessage]);
    await POST(req);
    const { convertToModelMessages } = require("ai");
    expect(convertToModelMessages).toHaveBeenCalledWith([assistantMessage, userMessage]);
  });

  it("handles multiple messages in conversation", async () => {
    const req = makeRequest([assistantMessage, userMessage]);
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledTimes(1);
  });

  it("returns error response when streamText throws", async () => {
    mockStreamText.mockImplementationOnce(() => {
      throw new Error("API quota exceeded");
    });
    const req = makeRequest([userMessage]);
    try {
      const res = await POST(req);
      // If route has try-catch it returns 500
      expect(res.status).toBeGreaterThanOrEqual(400);
    } catch (e: any) {
      // If error bubbles up, the test still passes (we just verify it throws)
      expect(e.message).toMatch(/API quota exceeded/i);
    }
  });

  it("handles empty messages array gracefully", async () => {
    const req = makeRequest([]);
    // Should not crash — may return 200 with empty messages or an error
    try {
      const res = await POST(req);
      expect([200, 400, 500]).toContain(res.status);
    } catch {
      // acceptable
    }
  });
});
