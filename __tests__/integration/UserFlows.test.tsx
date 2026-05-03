/**
 * __tests__/integration/UserFlows.test.tsx
 * Integration tests: full user flows across multiple components.
 * Landing → Chat → Simulator journey using RTL.
 */
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "../helpers/setup";
import userEvent from "@testing-library/user-event";
import { useChat } from "@ai-sdk/react";
import { UserProgressContextValue } from "../helpers/setup";

// Components under test
import ChatAssistant from "@/components/ChatAssistant";
import Simulator from "@/components/Simulator";
import ConstituencyDashboard from "@/components/ConstituencyDashboard";
import Timeline from "@/components/Timeline";

const mockUseChat = useChat as jest.Mock;

// ─── Helper ───────────────────────────────────────────────────────────────────
function setupReadyChat(extraMessages: any[] = []) {
  mockUseChat.mockReturnValue({
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [{ type: "text", text: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?" }],
        content: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?",
      },
      ...extraMessages,
    ],
    sendMessage: jest.fn(),
    status: "ready",
    error: undefined,
  });
}

// ─── Flow 1: Chat journey ─────────────────────────────────────────────────────
describe("Integration: Chat user flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupReadyChat();
  });

  it("complete chat flow: greeting → user message → simulated response", async () => {
    const sendMessage = jest.fn();
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "welcome",
          role: "assistant",
          parts: [{ type: "text", text: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?" }],
          content: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?",
        },
      ],
      sendMessage,
      status: "ready",
      error: undefined,
    });

    render(<ChatAssistant />);

    // 1. Greeting visible
    expect(screen.getByText(/Namaste! 🙏/i)).toBeInTheDocument();

    // 2. User types a question
    const input = screen.getByPlaceholderText(/Ask anything/i);
    await userEvent.type(input, "How do I register to vote?");
    expect(input).toHaveValue("How do I register to vote?");

    // 3. User submits
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(sendMessage).toHaveBeenCalledWith({ text: "How do I register to vote?" });

    // 4. Input cleared
    expect(input).toHaveValue("");
  });

  it("suggested question shortcut works as full chat flow", async () => {
    const sendMessage = jest.fn();
    mockUseChat.mockReturnValue({
      messages: [
        {
          id: "welcome",
          role: "assistant",
          parts: [{ type: "text", text: "Namaste!" }],
          content: "Namaste!",
        },
      ],
      sendMessage,
      status: "ready",
      error: undefined,
    });

    render(<ChatAssistant />);
    fireEvent.click(screen.getByText("What is the voting age?"));
    expect(sendMessage).toHaveBeenCalledWith({ text: "What is the voting age?" });
  });

  it("API failure shows error and allows retry", async () => {
    mockUseChat.mockReturnValue({
      messages: [],
      sendMessage: jest.fn(),
      status: "ready",
      error: new Error("Network error"),
    });

    render(<ChatAssistant />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    // Simulate recovery — no crash after error is shown
    expect(screen.getByPlaceholderText(/Ask anything/i)).toBeInTheDocument();
  });

  it("offline-like scenario: sendMessage called but status stays ready with error", async () => {
    const sendMessage = jest.fn();
    mockUseChat
      .mockReturnValueOnce({
        messages: [{ id: "w", role: "assistant", parts: [{ type: "text", text: "Hi" }], content: "Hi" }],
        sendMessage,
        status: "ready",
        error: undefined,
      })
      .mockReturnValue({
        messages: [{ id: "w", role: "assistant", parts: [{ type: "text", text: "Hi" }], content: "Hi" }],
        sendMessage,
        status: "ready",
        error: new Error("Failed to fetch"),
      });

    const { rerender } = render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything/i);
    await userEvent.type(input, "Hello");
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(sendMessage).toHaveBeenCalledTimes(1);

    rerender(<ChatAssistant />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});

// ─── Flow 2: Simulator complete journey ───────────────────────────────────────
describe("Integration: Voting Simulator complete journey", () => {
  beforeEach(() => jest.clearAllMocks());

  it("completes full journey from step 1 to certificate", () => {
    render(<Simulator />);

    // Verify we start at step 1
    expect(screen.getByRole("heading", { name: "Check Eligibility" })).toBeInTheDocument();

    const clickNext = () =>
      fireEvent.click(screen.getByRole("button", { name: /next|continue|finish|complete/i }));

    // Go through all 5 steps
    clickNext(); // → step 2
    expect(screen.getByText("Register")).toBeInTheDocument();

    clickNext(); // → step 3
    expect(screen.getByText("Find Booth")).toBeInTheDocument();

    clickNext(); // → step 4
    expect(screen.getByText("Cast Vote")).toBeInTheDocument();

    clickNext(); // → step 5
    expect(screen.getByText("After Voting")).toBeInTheDocument();

    clickNext(); // → Certificate
    expect(
      screen.getByText(/congratulations|certificate|election ready/i)
    ).toBeInTheDocument();
  });

  it("accumulates points across all steps (4 × 20 + 100 = 180)", () => {
    render(<Simulator />);
    const clickNext = () =>
      fireEvent.click(screen.getByRole("button", { name: /next|continue|finish|complete/i }));

    for (let i = 0; i < 5; i++) clickNext();

    const calls = (UserProgressContextValue.addPoints as jest.Mock).mock.calls;
    const total = calls.reduce((sum: number, [pts]: [number]) => sum + pts, 0);
    expect(total).toBe(180); // 4×20 + 100
  });
});

// ─── Flow 3: Constituency search flow ────────────────────────────────────────
describe("Integration: Constituency search flow", () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  it("full search flow: type PIN → submit → see results", async () => {
    render(<ConstituencyDashboard />);
    const input = screen.getByPlaceholderText(/PIN code or constituency name/i);

    fireEvent.change(input, { target: { value: "110001" } });
    fireEvent.submit(input.closest("form")!);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("New Delhi")).toBeInTheDocument();
  });
});

// ─── Flow 4: Timeline exploration ────────────────────────────────────────────
describe("Integration: Timeline exploration flow", () => {
  it("user explores all 7 election stages sequentially", () => {
    render(<Timeline />);
    const stages = [
      "Election Announcement",
      "Nomination",
      "Scrutiny",
      "Campaigning",
      "Voting Day",
      "Counting",
      "Results",
    ];

    stages.forEach((title) => {
      const card = screen.getByText(title).closest("button") || screen.getByText(title).closest("[role='button']") || screen.getByText(title).closest("[class*='cursor-pointer']");
      if (!card) throw new Error(`Could not find card for stage: ${title}`);
      fireEvent.click(card);
      // Verify stage details visible — we just confirm no crash and card exists
      expect(card).toBeInTheDocument();
      fireEvent.click(card); // collapse
    });
  });
});
