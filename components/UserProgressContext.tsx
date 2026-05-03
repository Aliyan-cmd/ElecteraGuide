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
  addPoints: (amount: number) => void;
  unlockBadge: (badge: Badge) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const savedPoints = localStorage.getItem("userPoints");
    const savedBadges = localStorage.getItem("userBadges");
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    localStorage.setItem("userPoints", newPoints.toString());
  };

  const unlockBadge = (badge: Badge) => {
    if (!badges.find(b => b.id === badge.id)) {
      const newBadges = [...badges, badge];
      setBadges(newBadges);
      localStorage.setItem("userBadges", JSON.stringify(newBadges));
    }
  };

  return (
    <UserProgressContext.Provider value={{ points, badges, addPoints, unlockBadge }}>
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
