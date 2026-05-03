"use client";

import MythBuster from "@/components/MythBuster";
import { useLanguage } from "@/components/LanguageContext";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

export default function MythsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20 animate-fade-in-up">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 text-red-500 font-black tracking-tighter mb-4">
              <ShieldAlert size={24} /> STOP THE MISINFORMATION
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Election <span className="text-ashoka-blue">Myth Buster</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Don't be fooled by rumors. We clarify common misconceptions about the voting process, EVMs, and voter eligibility with verified facts.
            </p>
          </div>
          <div className="md:w-1/2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl">
            <div className="space-y-4">
              <div className="flex gap-4 items-center p-4 bg-green-50 rounded-2xl border border-green-100">
                <CheckCircle2 className="text-green-500 shrink-0" />
                <span className="text-sm font-bold text-green-800">Verified by Official ECI Data</span>
              </div>
              <div className="flex gap-4 items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <CheckCircle2 className="text-blue-500 shrink-0" />
                <span className="text-sm font-bold text-blue-800">Real-time Information Updates</span>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up delay-300">
          <MythBuster />
        </div>
      </div>
    </div>
  );
}
