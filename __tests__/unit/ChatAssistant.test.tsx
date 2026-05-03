/**
 * __tests__/unit/ChatAssistant.test.tsx
 * Unit tests for ChatAssistant component.
 * All API calls are mocked via the @ai-sdk/react mock in setup.tsx.
 */
import React from "react";
import { render, screen, fireEvent } from "../helpers/setup";
import userEvent from "@testing-library/user-event";
import ChatAssistant from "@/components/ChatAssistant";
import { useChat } from "@ai-sdk/react";

const mockUseChat = useChat as jest.Mock;
const mockSendMessage = jest.fn();

function setupChatMock(overrides: Record<string, any> = {}) {
  mockUseChat.mockReturnValue({
    messages: [
      {
        id: "welcome-msg",
        role: "assistant",
        parts: [{ type: "text", text: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?" }],
        content: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?",
      },
    ],
    sendMessage: mockSendMessage,
    status: "ready",
    error: undefined,
    ...overrides,
  });
}

describe("ChatAssistant component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupChatMock();
  });

  // ── Rendering ────────────────────────────────────────────────────────────
  it("renders the initial greeting message", () => {
    render(<ChatAssistant />);
    expect(
      screen.getByText(/Namaste! 🙏 I'm ElectraGuide AI/i)
    ).toBeInTheDocument();
  });

  it("renders the input field with correct placeholder", () => {
    render(<ChatAssistant />);
    expect(
      screen.getByPlaceholderText(/Ask anything about elections/i)
    ).toBeInTheDocument();
  });

  it("renders suggested questions in sidebar", () => {
    render(<ChatAssistant />);
    expect(screen.getByText("How do I register to vote?")).toBeInTheDocument();
    expect(screen.getByText("What is the voting age?")).toBeInTheDocument();
  });

  // ── Input handling ────────────────────────────────────────────────────────
  it("updates input value as user types", async () => {
    render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about elections/i);
    await userEvent.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("send button is disabled when input is empty", () => {
    render(<ChatAssistant />);
    const sendBtn = screen.getByRole("button", { name: /send/i });
    expect(sendBtn).toBeDisabled();
  });

  it("send button is enabled when input has text", async () => {
    render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about elections/i);
    await userEvent.type(input, "Who can vote?");
    expect(screen.getByRole("button", { name: /send/i })).not.toBeDisabled();
  });

  // ── Message sending ───────────────────────────────────────────────────────
  it("calls sendMessage when form is submitted", async () => {
    render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about elections/i);
    await userEvent.type(input, "What is EVM?");
    fireEvent.submit(document.querySelector("#chat-form")!);
    expect(mockSendMessage).toHaveBeenCalledWith({ text: "What is EVM?" });
  });

  it("clears input after message is sent", async () => {
    render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about elections/i);
    await userEvent.type(input, "Test message");
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(input).toHaveValue("");
  });

  it("does NOT call sendMessage when input is only whitespace", async () => {
    render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about elections/i);
    await userEvent.type(input, "   ");
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  // ── Loading state ─────────────────────────────────────────────────────────
  it("shows typing indicator while streaming", () => {
    setupChatMock({ status: "streaming" });
    render(<ChatAssistant />);
    expect(document.querySelector(".animate-bounce")).toBeInTheDocument();
  });

  it("disables input while loading", () => {
    setupChatMock({ status: "submitted" });
    render(<ChatAssistant />);
    expect(
      screen.getByPlaceholderText(/Ask anything about elections/i)
    ).toBeDisabled();
  });

  it("does NOT call sendMessage when already loading", async () => {
    setupChatMock({ status: "streaming" });
    render(<ChatAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about elections/i);
    // Input is disabled so userEvent.type won't work, use fireEvent directly
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  // ── Error state ───────────────────────────────────────────────────────────
  it("shows error message when API call fails", () => {
    setupChatMock({ error: new Error("API Error") });
    render(<ChatAssistant />);
    expect(
      screen.getByText(/Something went wrong. Please try again./i)
    ).toBeInTheDocument();
  });

  // ── Suggested questions ───────────────────────────────────────────────────
  it("calls sendMessage when a suggested question is clicked", () => {
    render(<ChatAssistant />);
    fireEvent.click(screen.getByText("How do I register to vote?"));
    expect(mockSendMessage).toHaveBeenCalledWith({
      text: "How do I register to vote?",
    });
  });

  // ── Multiple messages ─────────────────────────────────────────────────────
  it("renders multiple messages (user + assistant)", () => {
    setupChatMock({
      messages: [
        { id: "1", role: "assistant", parts: [{ type: "text", text: "Hello!" }], content: "Hello!" },
        { id: "2", role: "user", parts: [{ type: "text", text: "What is EVM?" }], content: "What is EVM?" },
        {
          id: "3",
          role: "assistant",
          parts: [{ type: "text", text: "EVM stands for Electronic Voting Machine." }],
          content: "EVM stands for Electronic Voting Machine.",
        },
      ],
    });
    render(<ChatAssistant />);
    expect(screen.getByText("Hello!")).toBeInTheDocument();
    expect(screen.getByText("What is EVM?")).toBeInTheDocument();
    expect(screen.getByText("EVM stands for Electronic Voting Machine.")).toBeInTheDocument();
  });

  // ── Edge case: empty message history ─────────────────────────────────────
  it("renders nothing in message list when messages array is empty", () => {
    setupChatMock({ messages: [] });
    render(<ChatAssistant />);
    expect(screen.queryByText(/Namaste/i)).not.toBeInTheDocument();
  });
});
