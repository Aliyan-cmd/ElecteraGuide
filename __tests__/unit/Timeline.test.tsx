/**
 * __tests__/unit/Timeline.test.tsx
 * Unit tests for the Timeline component.
 */
import React from "react";
import { render, screen, fireEvent } from "../helpers/setup";
import Timeline from "@/components/Timeline";

describe("Timeline component", () => {
  it("renders the section label and title", () => {
    render(<Timeline />);
    expect(screen.getByText("The Process")).toBeInTheDocument();
    expect(screen.getByText("How Elections Work")).toBeInTheDocument();
  });

  it("renders all 7 election stages", () => {
    render(<Timeline />);
    expect(screen.getByText("Election Announcement")).toBeInTheDocument();
    expect(screen.getByText("Nomination")).toBeInTheDocument();
    expect(screen.getByText("Scrutiny")).toBeInTheDocument();
    expect(screen.getByText("Campaigning")).toBeInTheDocument();
    expect(screen.getByText("Voting Day")).toBeInTheDocument();
    expect(screen.getByText("Counting")).toBeInTheDocument();
    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  it("shows stage description on click (expand)", () => {
    render(<Timeline />);
    const electionAnnouncement = screen.getByText("Election Announcement");
    fireEvent.click(electionAnnouncement.closest("[class*='cursor-pointer']")!);
    expect(screen.getByText("MCC comes into force.")).toBeInTheDocument();
  });

  it("collapses stage description on second click", () => {
    render(<Timeline />);
    const card = screen.getByText("Election Announcement").closest("[class*='cursor-pointer']")!;
    fireEvent.click(card);
    // description visible
    expect(screen.getByText("MCC comes into force.")).toBeInTheDocument();
    // click again to collapse
    fireEvent.click(card);
    expect(screen.queryByText("MCC comes into force.")).not.toBeInTheDocument();
  });

  it("only one stage is expanded at a time", () => {
    render(<Timeline />);
    const announcementCard = screen.getByText("Election Announcement").closest("[class*='cursor-pointer']")!;
    const nominationCard = screen.getByText("Nomination").closest("[class*='cursor-pointer']")!;

    fireEvent.click(announcementCard);
    expect(screen.getByText("MCC comes into force.")).toBeInTheDocument();

    // Click another card – first should collapse
    fireEvent.click(nominationCard);
    expect(screen.queryByText("MCC comes into force.")).not.toBeInTheDocument();
    expect(screen.getByText("Candidates file their nominations.")).toBeInTheDocument();
  });

  it("returns null when stages array is empty", () => {
    // Override the mock to return empty stages
    const { useLanguage } = require("@/components/LanguageContext");
    useLanguage.mockReturnValueOnce({
      t: {
        ...require("../helpers/setup").mockTranslations,
        process: {
          sectionLabel: "The Process",
          title: "How Elections Work",
          subtitle: "subtitle",
          stages: [],
        },
      },
      lang: "en",
      setLang: jest.fn(),
    });
    const { container } = render(<Timeline />);
    expect(container.firstChild).toBeNull();
  });
});
