/**
 * __tests__/unit/ConstituencyDashboard.test.tsx
 * Unit tests for ConstituencyDashboard (constituency search) component.
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "../helpers/setup";
import userEvent from "@testing-library/user-event";
import ConstituencyDashboard from "@/components/ConstituencyDashboard";

describe("ConstituencyDashboard component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the section title", () => {
    render(<ConstituencyDashboard />);
    expect(screen.getByText("My Constituency")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<ConstituencyDashboard />);
    expect(
      screen.getByPlaceholderText(/Enter PIN code or constituency name/i)
    ).toBeInTheDocument();
  });

  it("shows constituency data for a known PIN code (110001)", async () => {
    render(<ConstituencyDashboard />);
    const input = screen.getByPlaceholderText(/Enter PIN code or constituency name/i);
    await userEvent.type(input, "110001");
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => expect(screen.getByText("New Delhi")).toBeInTheDocument(), {
      timeout: 3000,
    });
  });

  it("shows candidate names after successful search", async () => {
    render(<ConstituencyDashboard />);
    const input = screen.getByPlaceholderText(/Enter PIN code or constituency name/i);
    await userEvent.type(input, "110001");
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => expect(screen.getByText(/Bansuri Swaraj/i)).toBeInTheDocument(), {
      timeout: 3000,
    });
  });

  it("shows error message for unknown constituency", async () => {
    render(<ConstituencyDashboard />);
    const input = screen.getByPlaceholderText(/Enter PIN code or constituency name/i);
    await userEvent.type(input, "UNKNOWN_XYZ");
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      // Look for the "No records found" text from our setup.tsx mock
      expect(screen.getByText(/No records found/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("shows loading indicator while searching", async () => {
    render(<ConstituencyDashboard />);
    const input = screen.getByPlaceholderText(/Enter PIN code or constituency name/i);
    await userEvent.type(input, "110001");
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByRole("button", { name: /search|find/i })).toBeDisabled();

    await waitFor(() => expect(screen.getByText("New Delhi")).toBeInTheDocument());
  });
});
