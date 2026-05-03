"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Trophy, 
  Menu, 
  X, 
  Globe,
  Award,
  Sparkles
} from "lucide-react";
import { useUserProgress } from "../UserProgressContext";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { points } = useUserProgress();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "How to Vote", href: "/how-to-vote" },
    { name: "Constituency", href: "/constituency" },
    { name: "Simulator", href: "/simulator" },
    { name: "AI Chat", href: "/chat" },
    { name: "Myths", href: "/myths" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xl"
          : "bg-slate-900/40 backdrop-blur-md border-b border-white/10"
      }`}
    >
      {/* Tricolor Accent */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="container h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-lg">EG</span>
            </div>
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
          <div>
            <div className={`font-black text-2xl tracking-tighter leading-none ${scrolled ? "text-[#0F172A]" : "text-white"}`}>
              Electra<span className="text-[#FF9933]">Guide</span>
            </div>
            <div className={`text-[10px] uppercase font-black tracking-[0.2em] mt-1 ${scrolled ? "text-slate-400" : "text-slate-300"}`}>
              {lang === "hi" ? "भारत का चुनाव गाइड" : "India's Election Assistant"}
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                pathname === link.href
                  ? "bg-[#0F172A] text-white"
                  : scrolled
                  ? "text-slate-600 hover:bg-slate-100"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Points */}
          <div className={`hidden md:flex items-center gap-3 px-5 h-12 rounded-2xl border transition-all ${
            scrolled ? "bg-slate-50 border-slate-200" : "bg-white/10 border-white/20 backdrop-blur-md"
          }`}>
            <Trophy size={14} className="text-[#FF9933]" />
            <span className={`text-xs font-black tracking-widest ${scrolled ? "text-[#0F172A]" : "text-white"}`}>
              {points} <span className="opacity-40">XP</span>
            </span>
          </div>

          {/* Lang Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className={`h-12 px-4 rounded-2xl flex flex-row items-center gap-2 font-black transition-all border ${
              scrolled
                ? "bg-white border-slate-200 text-[#0F172A] hover:bg-slate-50 shadow-sm"
                : "bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white/20"
            }`}
          >
            <Globe size={14} className="opacity-40" />
            <span className="text-[10px] uppercase">{lang === "en" ? "EN" : "HI"}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              scrolled ? "bg-slate-100 text-[#0F172A]" : "bg-white/10 text-white"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 shadow-2xl animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`p-4 rounded-2xl text-sm font-black uppercase tracking-widest ${
                  pathname === link.href ? "bg-[#0F172A] text-white" : "bg-slate-50 text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
