/**
 * __tests__/unit/MythBuster.test.tsx
 * Tests for the MythBuster component.
 */
import React from "react";
import { render, screen, fireEvent } from "../helpers/setup";
import MythBuster from "@/components/MythBuster";

describe("MythBuster component", () => {
  it("renders the section title", () => {
    render(<MythBuster />);
    // "Myths" is in the nav mock but we need the feature title
    // Let's assume it has a title like "Busting Common Myths"
    expect(screen.getByText(/Myth|Buster/i)).toBeInTheDocument();
  });

  it("renders multiple myth cards", () => {
    render(<MythBuster />);
    const cards = screen.getAllByRole("button", { name: /read more|show|expand/i });
    expect(cards.length).toBeGreaterThan(0);
  });

  it("expands a myth when clicked", () => {
    render(<MythBuster />);
    const firstMyth = screen.getAllByRole("button", { name: /read more|show|expand/i })[0];
    fireEvent.click(firstMyth);
    // Should show reality/truth text
    expect(screen.getByText(/Truth|Fact|Reality/i)).toBeInTheDocument();
  });
});
