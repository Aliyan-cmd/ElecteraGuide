/**
 * __tests__/helpers/setup.tsx
 * Shared test utilities: providers, mocks, render helpers.
 */
import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";

// Polyfill scrollIntoView for jsdom
if (typeof window !== "undefined") {
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  }
  if (!window.Element.prototype.scrollIntoView) {
    window.Element.prototype.scrollIntoView = jest.fn();
  }
}

// ─── Shared translations ──────────────────────────────────────────────────────
// These are used for mocking the LanguageContext
const enTranslations = {
  nav: { home: "Home", chat: "Chat", simulator: "Simulator", constituency: "Constituency" },
  chat: {
    greeting: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?",
    placeholder: "Ask anything about elections...",
    disclaimer: "Information is sourced from ECI.",
    suggestedQuestions: [
      "How do I register to vote?",
      "What is the voting age?",
      "Where is my polling booth?",
    ],
    send: "Send",
    thinking: "Thinking..."
  },
  constituency: {
    title: "My Constituency",
    subtitle: "Find details about your local constituency.",
    searchPlaceholder: "Enter PIN code or constituency name...",
    searchBtn: "Search",
    notFound: "No records found.",
    representative: "Representative",
    pastResults: "Past Results",
    keyCandidates: "Key Candidates"
  },
  simulator: {
    title: "Voting Simulator",
    step1Title: "Check Eligibility",
    step2Title: "Register",
    step3Title: "Find Booth",
    step4Title: "Cast Vote",
    step5Title: "After Voting",
  }
};

// ─── Module-level mocks ───────────────────────────────────────────────────────

export const LanguageContextValue = {
  t: {
    nav: { home: "Home", chat: "Chat", simulator: "Simulator", constituency: "Constituency" },
    chat: {
      greeting: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?",
      placeholder: "Ask anything about elections...",
      disclaimer: "Information is sourced from ECI.",
      suggestedQuestions: [
        "How do I register to vote?",
        "What is the voting age?",
        "Where is my polling booth?",
      ],
      send: "Send",
      thinking: "Thinking..."
    },
    constituency: {
      title: "My Constituency",
      subtitle: "Find details about your local constituency.",
      searchPlaceholder: "Enter PIN code or constituency name...",
      searchBtn: "Search",
      notFound: "No records found.",
      representative: "Representative",
      pastResults: "Past Results",
      keyCandidates: "Key Candidates"
    },
    simulator: {
      title: "Voting Simulator",
      step1Title: "Check Eligibility",
      step2Title: "Register",
      step3Title: "Find Booth",
      step4Title: "Cast Vote",
      step5Title: "After Voting",
    },
    process: {
      stages: [
        { title: "Election Announcement", description: "MCC comes into force." },
        { title: "Nomination", description: "Candidates file papers." },
        { title: "Scrutiny", description: "Papers are checked." },
        { title: "Campaigning", description: "Parties rally." },
        { title: "Voting Day", description: "Go out and vote." },
        { title: "Counting", description: "Votes are tallied." },
        { title: "Results", description: "Winner declared." },
      ]
    }
  },
  lang: "en",
  setLang: jest.fn(),
};

jest.mock("@/components/LanguageContext", () => {
  const React = require("react");
  return {
    useLanguage: jest.fn(() => require("./setup").LanguageContextValue),
    LanguageProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

export const UserProgressContextValue = {
  points: 0,
  badges: [],
  addPoints: jest.fn(),
  unlockBadge: jest.fn(),
  completedSteps: [],
  markStepComplete: jest.fn(),
};

jest.mock("@/components/UserProgressContext", () => {
  const React = require("react");
  return {
    useUserProgress: jest.fn(() => require("./setup").UserProgressContextValue),
    UserProgressProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

jest.mock("@ai-sdk/react", () => ({
  useChat: jest.fn(() => ({
    messages: [
      {
        id: "welcome-msg",
        role: "assistant",
        parts: [{ type: "text", text: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?" }],
        content: "Namaste! 🙏 I'm ElectraGuide AI. How can I help you today?",
      },
    ],
    sendMessage: jest.fn(),
    status: "ready",
    error: undefined,
  })),
}));

jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_: any, tag: string) =>
          ({ children, ...props }: any) =>
            React.createElement(tag, props, children),
      }
    ),
    AnimatePresence: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
    useAnimation: () => ({ start: jest.fn() }),
    useInView: () => true,
  };
});

jest.mock("canvas-confetti", () => jest.fn());

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

jest.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children, href, ...props }: any) =>
      React.createElement("a", { href, ...props }, children),
  };
});

// ─── Custom render with providers ─────────────────────────────────────────────
const AllProviders = ({ children }: { children: ReactNode }) =>
  React.createElement(React.Fragment, null, children);

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// ─── Re-export everything from RTL plus our custom render ─────────────────────
export { customRender as render };
export * from "@testing-library/react";
