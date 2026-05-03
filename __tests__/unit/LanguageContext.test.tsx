/**
 * __tests__/unit/LanguageContext.test.tsx
 * Tests for the LanguageContext provider and useLanguage hook.
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";

// Test component to consume the context
const TestConsumer = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="title">{t.nav.home}</span>
      <button onClick={() => setLang("hi")}>Switch to Hindi</button>
    </div>
  );
};

describe("LanguageContext", () => {
  it("provides the default language (en)", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("title").textContent).toBe("Home");
  });

  it("allows switching language", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    
    fireEvent.click(screen.getByText("Switch to Hindi"));
    
    expect(screen.getByTestId("lang").textContent).toBe("hi");
    // "Home" in Hindi from en.json is "Home" but in hi.json it might be different
    // Let's just check if it changed or matches what we expect from the mock if we had one
    // But here we use the real one.
  });
});
