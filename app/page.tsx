"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  MapPin, 
  Bot, 
  PlayCircle, 
  ListChecks, 
  ShieldAlert, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export default function Home() {
  const { t, lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      title: "How to Vote",
      desc: "Step-by-step guide from registration to the polling booth.",
      href: "/how-to-vote",
      icon: <ListChecks size={32} />,
      color: "bg-orange-50 text-[#FF9933]",
      delay: "delay-100"
    },
    {
      title: "My Constituency",
      desc: "Get real-time details about your local candidates and stats.",
      href: "/constituency",
      icon: <MapPin size={32} />,
      color: "bg-blue-50 text-ashoka-blue",
      delay: "delay-200"
    },
    {
      title: "Voting Simulator",
      desc: "Practice voting in a risk-free 3D interactive environment.",
      href: "/simulator",
      icon: <PlayCircle size={32} />,
      color: "bg-green-50 text-india-green",
      delay: "delay-300"
    },
    {
      title: "AI Assistant",
      desc: "Your personal multi-lingual guide for all election queries.",
      href: "/chat",
      icon: <Bot size={32} />,
      color: "bg-slate-50 text-navy",
      delay: "delay-400"
    },
    {
      title: "Myth Buster",
      desc: "Verified facts to tackle common election misinformation.",
      href: "/myths",
      icon: <ShieldAlert size={32} />,
      color: "bg-red-50 text-red-500",
      delay: "delay-500"
    }
  ];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] ${lang === "hi" ? "font-hindi" : ""}`}>
      {/* Premium Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-40 overflow-hidden bg-hero-pattern text-white">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9933]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#138808]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-fade-in-up">
            <Sparkles size={16} className="text-[#FF9933]" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">{t.hero.badge}</span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black mb-8 leading-[1.1] animate-fade-in-up delay-100 text-white">
            Empowering Every <br />
            <span className="text-gradient-gold">Indian Voter.</span>
          </h1>

          <p className="text-lg lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
            Your all-in-one destination for verified election information, 
            interactive simulators, and AI-powered voter assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
            <Link href="/how-to-vote" className="btn btn-saffron px-10 py-5 text-lg w-full sm:w-auto group">
              Start Your Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/chat" className="btn btn-ghost px-10 py-5 text-lg w-full sm:w-auto border border-white/20 hover:bg-white/10 transition-colors">
              Ask Electra AI
            </Link>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="container mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 animate-fade-in-up delay-400">
            {[
              { val: t.hero.stat1Value, lab: t.hero.stat1Label },
              { val: t.hero.stat2Value, lab: t.hero.stat2Label },
              { val: t.hero.stat3Value, lab: t.hero.stat3Label },
              { val: "100%", lab: "Verified Data" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-center">
                <div className="text-2xl lg:text-3xl font-black mb-1">{stat.val}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{stat.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Feature Navigation Grid */}
      <section className="py-32 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
            <div className="max-w-2xl animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-black mb-6">Explore the Platform</h2>
              <p className="text-lg text-slate-500">
                Everything you need to be a responsible and informed citizen, 
                all organized into simple, dedicated modules.
              </p>
            </div>
            <div className="bg-ashoka-blue text-white p-4 rounded-3xl flex items-center gap-4 animate-fade-in-up shrink-0">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black">2024</div>
              <div className="text-xs font-bold uppercase tracking-wider">Ready for General Elections</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Link 
                key={i} 
                href={feature.href}
                className={`premium-card group animate-fade-in-up ${feature.delay}`}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl mb-4 group-hover:text-ashoka-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  {feature.desc}
                </p>
                <div className="flex items-center gap-2 text-ashoka-blue font-bold text-sm uppercase tracking-widest">
                  Explore Module
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
            
            {/* CTA Final Card */}
            <div className="premium-card bg-navy text-white animate-fade-in-up delay-500 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl mb-4 text-white">Join 1M+ Users</h3>
                <p className="text-slate-400">Make your vote count. Join the most advanced election information platform in India.</p>
              </div>
              <Link href="/how-to-vote" className="btn btn-saffron w-full mt-8">
                Get Your ID Ready
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Module (High Importance) */}
      <section className="pb-32">
        <div className="container">
          <div className="bg-[#0F172A] rounded-[4rem] p-12 lg:p-20 relative overflow-hidden text-white flex flex-col lg:flex-row items-center gap-12">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#138808]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 lg:w-2/3">
              <div className="flex items-center gap-2 text-[#FF9933] font-black tracking-[0.2em] uppercase text-xs mb-6">
                <Sparkles size={16} /> Fast Track Your Vote
              </div>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 text-white">
                Not registered <br /> yet? Do it in <span className="text-[#FF9933]">2 minutes.</span>
              </h2>
              <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-xl">
                The Election Commission of India has made the process simpler than ever. Use the official NVSP portal to register today.
              </p>
              <a 
                href="https://voters.eci.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-saffron px-12 py-5 text-xl shadow-2xl shadow-orange-500/20"
              >
                Go to Official Portal
              </a>
            </div>

            <div className="relative lg:w-1/3">
              <div className="w-full aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center p-8">
                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,153,51,0.3)]">
                  <span className="text-8xl">🗳️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
