"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface UserProgressContextType {
  points: number;
  badges: Badge[];
  completedSteps: string[];
  addPoints: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
  markStepComplete: (stepId: string) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPoints = localStorage.getItem("userPoints");
      const savedBadges = localStorage.getItem("userBadges");
      const savedSteps = localStorage.getItem("completedSteps");
      if (savedPoints) setPoints(parseInt(savedPoints));
      if (savedBadges) setBadges(JSON.parse(savedBadges));
      if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));
    }
  }, []);

  const addPoints = (amount: number) => {
    setPoints((prev) => {
      const next = prev + amount;
      localStorage.setItem("userPoints", next.toString());
      return next;
    });
  };

  const unlockBadge = (badge: Badge) => {
    setBadges((prev) => {
      if (!prev.find((b) => b.id === badge.id)) {
        const next = [...prev, badge];
        localStorage.setItem("userBadges", JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  const markStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => {
      if (!prev.includes(stepId)) {
        const next = [...prev, stepId];
        localStorage.setItem("completedSteps", JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  return (
    <UserProgressContext.Provider 
      value={{ points, badges, completedSteps, addPoints, unlockBadge, markStepComplete }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error("useUserProgress must be used within a UserProgressProvider");
  }
  return context;
}
