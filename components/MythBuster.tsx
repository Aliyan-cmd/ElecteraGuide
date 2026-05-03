"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { useUserProgress } from "./UserProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Info, Lightbulb } from "lucide-react";

interface Myth {
  id: string;
  myth: string;
  reality: string;
  source: string;
}

const MYTHS: Record<string, Myth[]> = {
  en: [
    {
      id: "m1",
      myth: "EVMs can be hacked via Bluetooth or Wi-Fi.",
      reality: "EVMs are standalone machines with no network connectivity, Bluetooth, or wireless components. They are physically secure and tamper-proof.",
      source: "Election Commission of India"
    },
    {
      id: "m2",
      myth: "I can vote twice if I have two Voter IDs from different cities.",
      reality: "Voting twice is a criminal offense under the Representation of the People Act. Modern systems use biometric de-duplication to identify multiple registrations.",
      source: "Election Commission of India"
    },
    {
      id: "m3",
      myth: "NOTA votes can lead to a re-election if they are the majority.",
      reality: "Currently in India, even if NOTA gets the most votes, the candidate with the second-highest votes is declared the winner.",
      source: "Supreme Court of India"
    },
    {
      id: "m4",
      myth: "The ink used on fingers can be easily removed with chemicals.",
      reality: "The Indelible Ink contains Silver Nitrate which reacts with the skin to form a permanent mark that only goes away as new skin grows.",
      source: "Mysore Paints & Varnish Ltd"
    }
  ],
  hi: [
    {
      id: "m1",
      myth: "EVM को ब्लूटूथ या वाई-फाई के जरिए हैक किया जा सकता है।",
      reality: "EVM स्टैंडअलोन मशीनें हैं जिनमें कोई नेटवर्क कनेक्टिविटी, ब्लूटूथ या वायरलेस घटक नहीं होते हैं। वे शारीरिक रूप से सुरक्षित और छेड़छाड़-मुक्त हैं।",
      source: "भारत निर्वाचन आयोग"
    },
    {
      id: "m2",
      myth: "अगर मेरे पास दो अलग-अलग शहरों के दो वोटर आईडी हैं तो मैं दो बार वोट दे सकता हूं।",
      reality: "दो बार मतदान करना लोक प्रतिनिधित्व अधिनियम के तहत एक आपराधिक अपराध है। आधुनिक प्रणालियां कई पंजीकरणों की पहचान करने के लिए बायोमेट्रिक डी-डुप्लीकेशन का उपयोग करती हैं।",
      source: "भारत निर्वाचन आयोग"
    }
  ]
};

export default function MythBuster() {
  const { t, lang } = useLanguage();
  const { addPoints, unlockBadge, badges } = useUserProgress();
  const [readMyths, setReadMyths] = useState<string[]>([]);
  
  const currentMyths = MYTHS[lang] || MYTHS.en;

  const handleRead = (id: string) => {
    if (!readMyths.includes(id)) {
      const newRead = [...readMyths, id];
      setReadMyths(newRead);
      addPoints(25);
      
      if (newRead.length === currentMyths.length) {
        unlockBadge({
          id: "myth-slayer",
          name: "Myth Slayer",
          icon: "🛡️",
          description: "Read all election myths and verified the reality."
        });
      }
    }
  };

  return (
    <div id="myths" className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 text-saffron font-bold text-sm mb-4">
          <ShieldCheck size={16} /> Myth vs Reality
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Election Myth Buster</h2>
        <p className="text-text-secondary text-lg">Don't be misled by rumors. Here are the facts behind common election misinformation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentMyths.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`card p-0 overflow-hidden flex flex-col h-full border-2 transition-all duration-300 ${
              readMyths.includes(item.id) ? 'border-india-green/20 bg-india-green/5' : 'border-transparent hover:border-saffron/20'
            }`}
          >
            <div className="p-6 bg-red-50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 shrink-0">
                  <XCircle size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1 block">The Myth</span>
                  <p className="text-navy font-bold leading-tight">{item.myth}</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 bg-white dark:bg-navy-mid/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-india-green/10 dark:bg-india-green/20 flex items-center justify-center text-india-green shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-india-green mb-1 block">The Reality</span>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.reality}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-black/20 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted">
                <Info size={12} /> Source: {item.source}
              </div>
              {!readMyths.includes(item.id) ? (
                <button 
                  onClick={() => handleRead(item.id)}
                  className="btn btn-primary py-1.5 px-4 text-[10px] uppercase font-black"
                >
                  Verify Fact (+25 XP)
                </button>
              ) : (
                <div className="text-india-green flex items-center gap-1 text-[10px] font-black uppercase">
                  <CheckCircle2 size={12} /> Verified
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-r from-ashoka-blue to-navy rounded-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-gold shrink-0">
              <Lightbulb size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Think before you share!</h3>
              <p className="text-white/70 text-sm max-w-xl">Fake news travels faster than the truth. Always verify election related information from official ECI handles or the Voter Helpline App before forwarding.</p>
            </div>
          </div>
          <button className="btn bg-white text-navy hover:bg-gold hover:text-navy border-none px-8 font-bold whitespace-nowrap">
            Report Fake News
          </button>
        </div>
      </div>
    </div>
  );
}
