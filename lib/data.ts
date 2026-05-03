// Election timeline data for 2024 Lok Sabha
export const ELECTION_PHASES = [
  {
    phase: 1,
    date: "April 19, 2024",
    dateHi: "19 अप्रैल 2024",
    states: "Tamil Nadu, Rajasthan (partial), UP (partial), Bihar (partial)",
    seats: 102,
    color: "#FF6B00",
  },
  {
    phase: 2,
    date: "April 26, 2024",
    dateHi: "26 अप्रैल 2024",
    states: "Kerala, Karnataka, Rajasthan (partial), UP (partial)",
    seats: 89,
    color: "#FF8C42",
  },
  {
    phase: 3,
    date: "May 7, 2024",
    dateHi: "7 मई 2024",
    states: "Goa, Gujarat, Maharashtra (partial), Karnataka (partial)",
    seats: 94,
    color: "#FFB347",
  },
  {
    phase: 4,
    date: "May 13, 2024",
    dateHi: "13 मई 2024",
    states: "Andhra Pradesh, Telangana, Jharkhand (partial), Bihar (partial)",
    seats: 96,
    color: "#138808",
  },
  {
    phase: 5,
    date: "May 20, 2024",
    dateHi: "20 मई 2024",
    states: "UP (partial), Bihar (partial), Jharkhand (partial), Maharashtra (partial)",
    seats: 49,
    color: "#1CA30B",
  },
  {
    phase: 6,
    date: "May 25, 2024",
    dateHi: "25 मई 2024",
    states: "Delhi, Haryana, West Bengal (partial), Bihar (partial)",
    seats: 58,
    color: "#0066CC",
  },
  {
    phase: 7,
    date: "June 1, 2024",
    dateHi: "1 जून 2024",
    states: "Punjab, West Bengal (partial), Bihar (partial), Chandigarh",
    seats: 57,
    color: "#1A7DE6",
  },
];

// Voting steps data
export const VOTING_STEPS = [
  {
    icon: "🪪",
    titleKey: "step1Title" as const,
    descKey: "step1Desc" as const,
    color: "#FF6B00",
  },
  {
    icon: "📍",
    titleKey: "step2Title" as const,
    descKey: "step2Desc" as const,
    color: "#138808",
  },
  {
    icon: "🧑‍🤝‍🧑",
    titleKey: "step3Title" as const,
    descKey: "step3Desc" as const,
    color: "#0066CC",
  },
  {
    icon: "✅",
    titleKey: "step4Title" as const,
    descKey: "step4Desc" as const,
    color: "#FF6B00",
  },
  {
    icon: "🖊️",
    titleKey: "step5Title" as const,
    descKey: "step5Desc" as const,
    color: "#138808",
  },
  {
    icon: "🗳️",
    titleKey: "step6Title" as const,
    descKey: "step6Desc" as const,
    color: "#0066CC",
  },
];

// Feature cards
export const FEATURES = [
  {
    icon: "🗳️",
    titleKey: "card1Title" as const,
    descKey: "card1Desc" as const,
    color: "#FF6B00",
    bg: "rgba(255,107,0,0.08)",
  },
  {
    icon: "🤖",
    titleKey: "card2Title" as const,
    descKey: "card2Desc" as const,
    color: "#0066CC",
    bg: "rgba(0,102,204,0.08)",
  },
  {
    icon: "📅",
    titleKey: "card3Title" as const,
    descKey: "card3Desc" as const,
    color: "#138808",
    bg: "rgba(19,136,8,0.08)",
  },
  {
    icon: "✔️",
    titleKey: "card4Title" as const,
    descKey: "card4Desc" as const,
    color: "#FF6B00",
    bg: "rgba(255,107,0,0.08)",
  },
  {
    icon: "🌐",
    titleKey: "card5Title" as const,
    descKey: "card5Desc" as const,
    color: "#0066CC",
    bg: "rgba(0,102,204,0.08)",
  },
  {
    icon: "📱",
    titleKey: "card6Title" as const,
    descKey: "card6Desc" as const,
    color: "#138808",
    bg: "rgba(19,136,8,0.08)",
  },
];

// Eligibility criteria
export const ELIGIBILITY_CRITERIA = [
  {
    icon: "🎂",
    titleKey: "crit1Title" as const,
    descKey: "crit1Desc" as const,
    color: "#FF6B00",
  },
  {
    icon: "🇮🇳",
    titleKey: "crit2Title" as const,
    descKey: "crit2Desc" as const,
    color: "#138808",
  },
  {
    icon: "🏠",
    titleKey: "crit3Title" as const,
    descKey: "crit3Desc" as const,
    color: "#0066CC",
  },
];

// Quick stats
export const STATS = [
  { value: "96.8 Cr+", label: "Registered Voters", labelHi: "पंजीकृत मतदाता" },
  { value: "543", label: "Constituencies", labelHi: "निर्वाचन क्षेत्र" },
  { value: "10.5 Lac+", label: "Polling Stations", labelHi: "मतदान केंद्र" },
  { value: "36", label: "States & UTs", labelHi: "राज्य और केंद्र शासित प्रदेश" },
];
