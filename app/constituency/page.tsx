"use client";

import ConstituencyDashboard from "@/components/ConstituencyDashboard";
import { useLanguage } from "@/components/LanguageContext";
import { MapPin, Search } from "lucide-react";

export default function ConstituencyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-ashoka-blue/5 text-ashoka-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-ashoka-blue/10">
            <MapPin size={14} /> My Constituency
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Know Your <span className="text-ashoka-blue">Representatives</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Enter your PIN code or Constituency name to get detailed information about your candidates, polling stations, and local issues.
          </p>
        </div>

        <div className="animate-fade-in-up delay-200">
          <div className="bg-white rounded-[3rem] p-4 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <ConstituencyDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
