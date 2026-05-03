export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyLogo: string;
  education: string;
  assets: string;
  criminalCases: number;
  image: string;
}

export interface Constituency {
  id: string;
  name: string;
  state: string;
  type: 'Lok Sabha' | 'Vidhan Sabha';
  currentMP: string;
  lastWinnerParty: string;
  turnout2019: string;
  history: {
    year: string;
    winner: string;
    party: string;
    margin: string;
  }[];
  candidates: Candidate[];
  keyDates: {
    label: string;
    date: string;
  }[];
}

export const MOCK_CONSTITUENCIES: Record<string, Constituency> = {
  "110001": {
    id: "nd-1",
    name: "New Delhi",
    state: "Delhi",
    type: "Lok Sabha",
    currentMP: "Meenakshi Lekhi",
    lastWinnerParty: "BJP",
    turnout2019: "60.6%",
    history: [
      { year: "2019", winner: "Meenakshi Lekhi", party: "BJP", margin: "2.5L+" },
      { year: "2014", winner: "Meenakshi Lekhi", party: "BJP", margin: "1.6L+" },
      { year: "2009", winner: "Ajay Maken", party: "INC", margin: "1.8L+" },
    ],
    keyDates: [
      { label: "Nomination Deadline", date: "April 29, 2024" },
      { label: "Voting Day", date: "May 25, 2024" },
      { label: "Counting Day", date: "June 4, 2024" },
    ],
    candidates: [
      {
        id: "c1",
        name: "Bansuri Swaraj",
        party: "BJP",
        partyLogo: "🪷",
        education: "LL.M (University of Oxford)",
        assets: "₹11.3 Cr",
        criminalCases: 0,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=bansuri",
      },
      {
        id: "c2",
        name: "Somnath Bharti",
        party: "AAP",
        partyLogo: "🧹",
        education: "M.Sc, LL.B (IIT Delhi/DU)",
        assets: "₹1.2 Cr",
        criminalCases: 2,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=somnath",
      },
    ],
  },
  "400001": {
    id: "mc-1",
    name: "Mumbai South",
    state: "Maharashtra",
    type: "Lok Sabha",
    currentMP: "Arvind Sawant",
    lastWinnerParty: "Shiv Sena",
    turnout2019: "51.6%",
    history: [
      { year: "2019", winner: "Arvind Sawant", party: "SHS", margin: "1.0L+" },
      { year: "2014", winner: "Arvind Sawant", party: "SHS", margin: "1.2L+" },
      { year: "2009", winner: "Milind Deora", party: "INC", margin: "1.1L+" },
    ],
    keyDates: [
      { label: "Nomination Deadline", date: "April 26, 2024" },
      { label: "Voting Day", date: "May 20, 2024" },
      { label: "Counting Day", date: "June 4, 2024" },
    ],
    candidates: [
      {
        id: "c3",
        name: "Arvind Sawant",
        party: "SS (UBT)",
        partyLogo: "🏹",
        education: "Graduate",
        assets: "₹3.5 Cr",
        criminalCases: 1,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=arvind",
      },
      {
        id: "c4",
        name: "Yamini Jadhav",
        party: "SS (Eknath Shinde)",
        partyLogo: "🏹",
        education: "Graduate",
        assets: "₹2.8 Cr",
        criminalCases: 0,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=yamini",
      },
    ],
  },
};
