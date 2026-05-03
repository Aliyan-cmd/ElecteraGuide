"use client";

import ChatAssistant from "@/components/ChatAssistant";
import { useLanguage } from "@/components/LanguageContext";
import { Bot, MessageSquare, ShieldCheck } from "lucide-react";

export default function ChatPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar / Info */}
          <div className="lg:w-1/3 space-y-8 animate-fade-in-up">
            <div>
              <span className="badge-glow mb-4 block w-fit">AI Assistant</span>
              <h1 className="text-4xl md:text-5xl font-black mb-6">
                Your Personal <span className="text-ashoka-blue">Election Guide</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Have specific questions? Ask our AI in English or Hindi. Get instant answers based on official Election Commission guidelines.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { icon: <MessageSquare className="text-ashoka-blue" />, title: "Instant Answers", desc: "No more searching through long PDFs." },
                { icon: <ShieldCheck className="text-india-green" />, title: "Official Data", desc: "Sourced from ECI official handbooks." },
                { icon: <Bot className="text-saffron" />, title: "Multilingual", desc: "Supports Hindi and English seamlessly." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Container */}
          <div className="lg:w-2/3 w-full animate-fade-in-up delay-200">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ashoka-blue flex items-center justify-center text-white">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Electra AI</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Online</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <ChatAssistant />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
