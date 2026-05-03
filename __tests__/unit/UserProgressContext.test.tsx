/**
 * __tests__/unit/UserProgressContext.test.tsx
 * Tests for the UserProgressContext provider.
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProgressProvider, useUserProgress } from "@/components/UserProgressContext";

const TestProgressConsumer = () => {
  const { points, badges, addPoints, unlockBadge, completedSteps, markStepComplete } = useUserProgress();
  return (
    <div>
      <span data-testid="points">{points}</span>
      <span data-testid="badges">{badges.length}</span>
      <span data-testid="steps">{completedSteps.length}</span>
      <button onClick={() => addPoints(10)}>Add Points</button>
      <button onClick={() => unlockBadge({ id: "1", title: "Pro", icon: "🏆", description: "Nice" })}>Unlock</button>
      <button onClick={() => markStepComplete("step1")}>Complete Step</button>
    </div>
  );
};

describe("UserProgressContext", () => {
  it("initializes with zero points and empty lists", () => {
    render(
      <UserProgressProvider>
        <TestProgressConsumer />
      </UserProgressProvider>
    );
    expect(screen.getByTestId("points").textContent).toBe("0");
    expect(screen.getByTestId("badges").textContent).toBe("0");
    expect(screen.getByTestId("steps").textContent).toBe("0");
  });

  it("adds points correctly", () => {
    render(
      <UserProgressProvider>
        <TestProgressConsumer />
      </UserProgressProvider>
    );
    fireEvent.click(screen.getByText("Add Points"));
    expect(screen.getByTestId("points").textContent).toBe("10");
  });

  it("unlocks badges correctly", () => {
    render(
      <UserProgressProvider>
        <TestProgressConsumer />
      </UserProgressProvider>
    );
    fireEvent.click(screen.getByText("Unlock"));
    expect(screen.getByTestId("badges").textContent).toBe("1");
  });

  it("marks steps complete correctly", () => {
    render(
      <UserProgressProvider>
        <TestProgressConsumer />
      </UserProgressProvider>
    );
    fireEvent.click(screen.getByText("Complete Step"));
    expect(screen.getByTestId("steps").textContent).toBe("1");
  });
});
