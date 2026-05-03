"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useEffect, useState } from "react";
import { Info, HelpCircle, FileText, Bot } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch for simple context

  return (
    <div className={`flex min-h-screen flex-col ${lang === "hi" ? "font-hindi" : ""}`}>
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 w-full glass shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-saffron flex items-center justify-center text-white font-bold shadow-sm">E</div>
            <span className="font-bold text-xl text-navy">ElectraGuide</span>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#" className="nav-link font-semibold text-text-secondary hover:text-ashoka-blue">{t.nav.home}</a>
            <a href="#features" className="nav-link font-semibold text-text-secondary hover:text-ashoka-blue">{t.nav.howToVote}</a>
            <a href="#faq" className="nav-link font-semibold text-text-secondary hover:text-ashoka-blue">{t.nav.faq}</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as "en" | "hi")}
              className="px-3 py-1.5 rounded-full border border-border bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ashoka-blue cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
            <button className="btn btn-primary hidden sm:flex">
              <Bot size={18} /> {t.nav.askAI}
            </button>
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-[#FF6B00] via-[#FFFFFF] to-[#138808]"></div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-bg py-24 md:py-32 relative text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex mb-6 badge badge-gold animate-fade-up">
              <span className="mr-1">🇮🇳</span> {t.hero.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-up delay-100">
              {t.hero.title} <span className="text-gradient-hero">{t.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up delay-300">
              <button className="btn btn-primary text-lg px-8 py-4">
                {t.hero.cta}
              </button>
              <button className="btn btn-ghost text-lg px-8 py-4">
                <Bot size={20} /> {t.hero.ctaSecondary}
              </button>
            </div>
          </div>
          
          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-background relative -mt-8 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="card card-gradient p-6 text-center animate-fade-up delay-100">
                <div className="text-4xl font-black text-ashoka-blue mb-2">{t.hero.stat1Value}</div>
                <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{t.hero.stat1Label}</div>
              </div>
              <div className="card card-gradient p-6 text-center animate-fade-up delay-200">
                <div className="text-4xl font-black text-saffron mb-2">{t.hero.stat2Value}</div>
                <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{t.hero.stat2Label}</div>
              </div>
              <div className="card card-gradient p-6 text-center animate-fade-up delay-300">
                <div className="text-4xl font-black text-india-green mb-2">{t.hero.stat3Value}</div>
                <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider">{t.hero.stat3Label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-saffron font-bold tracking-wider uppercase text-sm mb-2 block">{t.features.sectionLabel}</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.features.title}</h2>
              <p className="text-text-secondary text-lg">{t.features.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Cards */}
              <div className="card p-8 group">
                <div className="w-12 h-12 bg-blue-50 text-ashoka-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.features.card1Title}</h3>
                <p className="text-text-secondary leading-relaxed">{t.features.card1Desc}</p>
              </div>
              
              <div className="card p-8 group border-t-4 border-t-saffron">
                <div className="w-12 h-12 bg-orange-50 text-saffron rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bot size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.features.card2Title}</h3>
                <p className="text-text-secondary leading-relaxed">{t.features.card2Desc}</p>
              </div>
              
              <div className="card p-8 group">
                <div className="w-12 h-12 bg-green-50 text-india-green rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.features.card4Title}</h3>
                <p className="text-text-secondary leading-relaxed">{t.features.card4Desc}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Simple Call to Action */}
        <section className="py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to exercise your democratic right?</h2>
            <button className="btn btn-primary text-lg px-10 py-4 shadow-glow">
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white py-12 border-t-4 border-t-saffron">
        <div className="container mx-auto px-4 text-center opacity-80">
          <p className="mb-4">{t.footer.tagline}</p>
          <div className="h-1px bg-white/20 w-1/2 mx-auto my-6"></div>
          <p className="text-sm text-white/60">{t.footer.copyright}</p>
          <p className="text-sm font-medium mt-2 text-saffron-light">{t.footer.madeWith}</p>
        </div>
      </footer>
    </div>
  );
}
