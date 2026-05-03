"use client";

import { useLanguage } from "@/components/LanguageContext";
import { Globe, Bot, Shield } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Tricolor Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-india-green" />
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-saffron/5 blur-[120px] -z-0" />

      <div className="container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-saffron flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">EG</span>
              </div>
              <div>
                <div className="text-xl font-black tracking-tight leading-none">
                  Electra<span className="text-saffron">Guide</span>
                </div>
                <div className="text-[0.6rem] tracking-widest uppercase font-bold mt-1 text-white/50">
                  India's Election Assistant
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Globe size={18} />, label: "Web" },
                { icon: <Bot size={18} />, label: "AI" },
                { icon: <Shield size={18} />, label: "Security" },
              ].map((s, i) => (
                <div key={i} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-saffron mb-8">
              {t.footer.links.title}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t.footer.links.voterPortal, href: "https://voters.eci.gov.in" },
                { label: t.footer.links.eciWebsite, href: "https://eci.gov.in" },
                { label: t.footer.links.voterHelpline, href: "tel:1950" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${link.label} (opens in a new tab)`}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-india-green opacity-0 group-hover:opacity-100 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-saffron mb-8">
              {t.footer.elections.title}
            </h4>
            <ul className="space-y-4">
              {[
                t.footer.elections.lokSabha,
                t.footer.elections.stateAssembly,
                t.footer.elections.rajyaSabha,
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    aria-label={`Read more about ${item}`}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ashoka-blue opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-saffron mb-8">Official Disclaimer</h4>
            <p className="text-[0.7rem] text-white/40 leading-relaxed italic">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="text-xs text-white/40 font-medium tracking-wide">
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60 font-bold bg-white/5 px-6 py-3 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-india-green animate-pulse" />
            {t.footer.madeWith}
          </div>
        </div>
      </div>
    </footer>
  );
}
