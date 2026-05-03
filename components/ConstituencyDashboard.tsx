"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Search, MapPin, Calendar, History, User, GraduationCap, Scale, Briefcase, TrendingUp } from "lucide-react";
import { MOCK_CONSTITUENCIES, Constituency, Candidate } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function ConstituencyDashboard() {
  const { t, lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeData, setActiveData] = useState<Constituency | null>(null);
  const [error, setError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError(false);
    
    // Simulate API delay
    setTimeout(() => {
      const result = MOCK_CONSTITUENCIES[searchTerm] || Object.values(MOCK_CONSTITUENCIES).find(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (result) {
        setActiveData(result);
        setError(false);
      } else {
        setError(true);
        setActiveData(null);
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <div id="my-constituency" className="w-full">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.constituency.title}</h2>
        <p className="text-text-secondary text-lg mb-8">{t.constituency.subtitle}</p>
        
        <form onSubmit={handleSearch} className="relative group" aria-label="Constituency search form">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-ashoka-blue transition-colors">
            <Search size={20} aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder={t.constituency.searchPlaceholder}
            aria-label="Search by constituency name"
            className="input-field pl-14 pr-32 py-5 shadow-lg text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isSearching}
            aria-label={isSearching ? "Searching..." : t.constituency.searchBtn}
            className="absolute right-2 top-2 bottom-2 btn btn-primary px-6 text-base flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  <Search size={18} />
                </motion.div>
                <span>Searching...</span>
              </>
            ) : t.constituency.searchBtn}
          </button>
        </form>
        {error && <p role="alert" className="text-red-500 mt-4 text-sm font-medium animate-shake">{t.constituency.notFound}</p>}
      </div>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="card h-[300px] lg:col-span-2 bg-gray-100 animate-pulse"></div>
              <div className="card h-[300px] bg-gray-100 animate-pulse"></div>
            </motion.div>
          ) : activeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Card */}
                <article className="card p-8 bg-gradient-to-br from-navy to-navy-mid text-white border-none col-span-1 lg:col-span-2">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <div className="badge badge-gold mb-4">{t.constituency.liveUpdates}</div>
                      <h3 className="text-4xl font-black mb-2">{activeData.name}</h3>
                      <p className="text-white/70 text-lg flex items-center gap-2">
                        <MapPin size={18} aria-hidden="true" /> {activeData.state} • {activeData.type}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-md border border-white/10">
                      <div className="text-sm text-white/60 uppercase tracking-widest font-bold mb-1">{t.constituency.representative}</div>
                      <div className="text-xl font-bold flex items-center gap-2">
                        <User size={20} className="text-saffron-light" aria-hidden="true" />
                        {activeData.currentMP}
                      </div>
                      <div className="text-sm font-medium text-india-green-light mt-1">
                        {activeData.lastWinnerParty} Party
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-white/40 text-xs uppercase font-bold mb-1">{t.constituency.turnout}</div>
                      <div className="text-2xl font-black text-gold">{activeData.turnout2019}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <div className="text-white/40 text-xs uppercase font-bold mb-1">{t.constituency.electorate}</div>
                      <div className="text-2xl font-black text-saffron-light">~1.4M</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 col-span-2 md:col-span-1">
                      <div className="text-white/40 text-xs uppercase font-bold mb-1">{t.constituency.margin}</div>
                      <div className="text-2xl font-black text-india-green">High</div>
                    </div>
                  </div>
                </article>

                {/* Key Dates Card */}
                <section className="card p-8 bg-white overflow-hidden relative" aria-labelledby="important-dates-title">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ashoka-blue/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <h4 id="important-dates-title" className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Calendar size={20} className="text-ashoka-blue" aria-hidden="true" />
                    {t.constituency.importantDates}
                  </h4>
                  <div className="space-y-6">
                    {activeData.keyDates.map((date, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-ashoka-blue group-hover:bg-ashoka-blue group-hover:text-white transition-colors">
                          <TrendingUp size={18} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-navy">{date.label}</div>
                          <div className="text-sm text-text-secondary">{date.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Content Tabs-like Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Election History */}
                <section className="space-y-6" aria-labelledby="history-title">
                  <div className="flex items-center gap-2 mb-2">
                    <History size={24} className="text-saffron" aria-hidden="true" />
                    <h3 id="history-title" className="text-2xl font-bold">{t.constituency.pastResults}</h3>
                  </div>
                  <div className="card overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-black text-navy uppercase tracking-wider">{t.constituency.year}</th>
                          <th className="px-6 py-4 text-xs font-black text-navy uppercase tracking-wider">{t.constituency.winner}</th>
                          <th className="px-6 py-4 text-xs font-black text-navy uppercase tracking-wider">{t.constituency.party}</th>
                          <th className="px-6 py-4 text-xs font-black text-navy uppercase tracking-wider">{t.constituency.marginLabel}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {activeData.history.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-navy">{row.year}</td>
                            <td className="px-6 py-4 text-sm text-text-secondary">{row.winner}</td>
                            <td className="px-6 py-4">
                              <span className={`badge ${row.party === 'BJP' ? 'badge-saffron' : row.party === 'INC' ? 'badge-blue' : 'badge-navy'}`}>
                                {row.party}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-india-green">{row.margin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Candidate Information */}
                <section className="space-y-6" aria-labelledby="candidates-title">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={24} className="text-india-green" aria-hidden="true" />
                    <h3 id="candidates-title" className="text-2xl font-bold">{t.constituency.keyCandidates}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeData.candidates.map((candidate) => (
                      <article key={candidate.id} className="card p-6 hover:shadow-xl group">
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={candidate.image} 
                            alt={`Portrait of candidate ${candidate.name}`}
                            className="w-16 h-16 rounded-2xl bg-gray-100 object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-navy leading-tight">{candidate.name}</h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-lg" aria-hidden="true">{candidate.partyLogo}</span>
                              <span className="text-xs font-black uppercase text-text-secondary">{candidate.party}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mt-6">
                          <div className="flex items-center gap-3 text-xs">
                            <GraduationCap size={14} className="text-ashoka-blue" aria-hidden="true" />
                            <span className="text-text-secondary truncate">{candidate.education}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <Briefcase size={14} className="text-saffron" aria-hidden="true" />
                            <span className="text-navy font-bold">{candidate.assets} Assets</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <Scale size={14} className={`${candidate.criminalCases > 0 ? 'text-red-500' : 'text-india-green'}`} aria-hidden="true" />
                            <span className={`${candidate.criminalCases > 0 ? 'text-red-600 font-bold' : 'text-text-secondary'}`}>
                              {candidate.criminalCases} Criminal Cases
                            </span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => alert("Redirecting to official ECI affidavit portal...")}
                          aria-label={`View affidavit for ${candidate.name}`}
                          className="w-full mt-6 py-2.5 rounded-xl border border-gray-100 group-hover:bg-ashoka-blue group-hover:text-white group-hover:border-ashoka-blue transition-all text-xs font-bold text-navy"
                        >
                          {t.constituency.viewAffidavit}
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!activeData && !error && (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
            <MapPin size={40} />
          </div>
          <h3 className="text-xl font-bold text-navy mb-2">{t.constituency.selectToBegin}</h3>
          <p className="text-text-secondary max-w-md mx-auto">{t.constituency.selectDesc}</p>
        </div>
      )}
    </div>
  );
}
