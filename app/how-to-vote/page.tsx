"use client";

import Timeline from "@/components/Timeline";
import { useLanguage } from "@/components/LanguageContext";
import { ListChecks, Clock, UserPlus } from "lucide-react";

export default function HowToVotePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-up">
          <span className="badge-glow mb-4 block w-fit mx-auto">Voter Journey</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            The Road to <span className="text-saffron">Empowerment</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Follow the essential timeline from registration to the final ink mark. Every step is crucial for a successful democratic contribution.
          </p>
        </div>

        {/* Timeline Component */}
        <div className="animate-fade-in-up delay-200 mb-32">
          <Timeline />
        </div>

        {/* Key Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-400">
          <div className="premium-card bg-orange-50/30 border-orange-100">
            <UserPlus className="text-saffron mb-6" size={40} />
            <h3 className="text-2xl mb-4">Registration</h3>
            <p className="text-sm">Ensure your name is in the voter list. Check your status on the ECI portal today.</p>
          </div>
          <div className="premium-card bg-blue-50/30 border-blue-100">
            <ListChecks className="text-ashoka-blue mb-6" size={40} />
            <h3 className="text-2xl mb-4">Identification</h3>
            <p className="text-sm">Keep your Voter ID (EPIC) ready. Alternately, use any of the 12 approved documents.</p>
          </div>
          <div className="premium-card bg-green-50/30 border-green-100">
            <Clock className="text-india-green mb-6" size={40} />
            <h3 className="text-2xl mb-4">Polling Hours</h3>
            <p className="text-sm">Usually 7:00 AM to 6:00 PM. Arrive early to avoid queues and beat the heat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
