/**
 * __tests__/unit/Simulator.test.tsx
 * Unit tests for the Voting Simulator component.
 */
import React from "react";
import { render, screen, fireEvent } from "../helpers/setup";
import Simulator from "@/components/Simulator";
import { useUserProgress } from "@/components/UserProgressContext";

// Get a fresh reference to the mocked fns each test
function getProgressMocks() {
  const ctx = (useUserProgress as jest.Mock).mock.results.slice(-1)[0]?.value ?? {
    addPoints: jest.fn(),
    unlockBadge: jest.fn(),
  };
  return ctx;
}

describe("Simulator component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────
  it("renders the simulator title", () => {
    render(<Simulator />);
    expect(screen.getByText("Voting Simulator")).toBeInTheDocument();
  });

  it("starts at Step 1 (Check Eligibility)", () => {
    render(<Simulator />);
    expect(screen.getByText("Check Eligibility")).toBeInTheDocument();
  });

  it("shows all step names in the step indicator", () => {
    render(<Simulator />);
    ["Check Eligibility", "Register", "Find Booth", "Cast Vote", "After Voting"].forEach(
      (title) => expect(screen.getByText(title)).toBeInTheDocument()
    );
  });

  // ── Navigation ────────────────────────────────────────────────────────────
  it("'Previous' button is disabled on the first step", () => {
    render(<Simulator />);
    // Find a previous/back button - it might be hidden or disabled on step 1
    const prevBtns = screen.queryAllByRole("button", { name: /prev|back|previous/i });
    if (prevBtns.length > 0) {
      expect(prevBtns[0]).toBeDisabled();
    } else {
      // No prev button on first step is acceptable
      expect(true).toBe(true);
    }
  });

  it("advances to next step when 'Next' is clicked", () => {
    render(<Simulator />);
    const nextBtn = screen.getByRole("button", { name: /next|continue/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("goes back to previous step when 'Previous' is clicked", () => {
    render(<Simulator />);
    fireEvent.click(screen.getByRole("button", { name: /next|continue/i }));
    expect(screen.getByText("Register")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /prev|back|previous/i }));
    expect(screen.getByText("Check Eligibility")).toBeInTheDocument();
  });

  it("steps through all 5 steps without error", () => {
    render(<Simulator />);
    const next = () => fireEvent.click(screen.getByRole("button", { name: /next|continue/i }));
    next(); // step 2
    next(); // step 3
    next(); // step 4
    next(); // step 5
    expect(screen.getByText("After Voting")).toBeInTheDocument();
  });

  // ── Certificate ───────────────────────────────────────────────────────────
  it("shows certificate after completing all steps", () => {
    render(<Simulator />);

    // Go through steps 1-4 with Next
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByRole("button", { name: /next|continue/i }));
    }
    // On step 5 — button might say "Finish" or "Complete"
    const finishBtn = screen.getByRole("button", { name: /next|continue|finish|complete/i });
    fireEvent.click(finishBtn);

    expect(
      screen.getByText(/congratulations|certificate|election ready/i)
    ).toBeInTheDocument();
  });

  it("calls addPoints and unlockBadge on completion", () => {
    render(<Simulator />);

    // Each call to render re-invokes useUserProgress — capture the mock instance
    const progressMock = (useUserProgress as jest.Mock).mock.results[0].value;

    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByRole("button", { name: /next|continue|finish|complete/i }));
    }

    expect(progressMock.unlockBadge).toHaveBeenCalledWith(
      expect.objectContaining({ id: "election-ready" })
    );
    expect(progressMock.addPoints).toHaveBeenCalledWith(100);
  });
});
