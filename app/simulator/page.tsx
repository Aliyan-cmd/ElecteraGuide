"use client";

import Simulator from "@/components/Simulator";
import { useLanguage } from "@/components/LanguageContext";
import { PlayCircle, GraduationCap } from "lucide-react";

export default function SimulatorPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 animate-fade-in-up">
          <div className="md:w-1/2">
            <span className="badge-glow mb-4 block w-fit">Interactive Training</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Master the <span className="text-india-green">Voting Process</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              New to voting? Don't worry. Our 3D interactive simulator walks you through the exact steps you'll face at the polling station.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-saffron flex items-center justify-center mx-auto mb-4">
                <PlayCircle size={24} />
              </div>
              <h4 className="font-bold">Step-by-Step</h4>
              <p className="text-xs text-slate-400">Interactive guidance</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-india-green flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={24} />
              </div>
              <h4 className="font-bold">Be Ready</h4>
              <p className="text-xs text-slate-400">Zero errors on d-day</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-300">
          <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100">
            <Simulator />
          </div>
        </div>
      </div>
    </div>
  );
}
