"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileText, Search, Megaphone, CheckSquare, BarChart, Landmark, ChevronRight } from "lucide-react";

export default function Timeline() {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const icons = [
    Calendar,
    FileText,
    Search,
    Megaphone,
    CheckSquare,
    BarChart,
    Landmark,
  ];

  const stages = t.process?.stages || [];

  if (stages.length === 0) return null;

  return (
    <div className="py-12 w-full max-w-5xl mx-auto relative">
      <div className="text-center mb-16">
        <span className="text-saffron font-bold tracking-wider uppercase text-sm mb-2 block">{t.process.sectionLabel}</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.process.title}</h2>
        <p className="text-text-secondary text-lg">{t.process.subtitle}</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-saffron via-white to-india-green transform md:-translate-x-1/2 rounded-full hidden sm:block"></div>

        <div className="space-y-8 md:space-y-12">
          {stages.map((stage: any, index: number) => {
            const Icon = icons[index % icons.length];
            const isEven = index % 2 === 0;
            const isActive = activeStage === index;

            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center md:justify-between w-full">
                
                {/* Left Content (for even index on desktop) */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:order-3 md:pl-12'} mb-4 md:mb-0 pl-16 sm:pl-20 md:pl-0 relative z-10`}>
                  <motion.div 
                    layout
                    onClick={() => setActiveStage(isActive ? null : index)}
                    className={`p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${
                      isActive 
                        ? 'bg-white shadow-xl border-saffron/30 scale-[1.02]' 
                        : 'bg-white/60 hover:bg-white shadow-sm border-white/50 hover:border-saffron/20 hover:shadow-md'
                    }`}
                  >
                    <div className={`flex items-center gap-3 mb-2 justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <h3 className="text-lg md:text-xl font-bold text-navy">{stage.title}</h3>
                      <div className="text-saffron md:hidden">
                        <ChevronRight size={20} className={`transform transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    <p className="text-text-secondary text-sm leading-relaxed mb-1">
                      {stage.description}
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className={`mt-4 pt-4 border-t border-gray-100 text-sm font-medium text-ashoka-blue ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                            {stage.details}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Center Node Desktop */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 hidden sm:flex">
                  <button 
                    onClick={() => setActiveStage(isActive ? null : index)}
                    className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isActive ? 'bg-saffron text-white scale-110' : 'bg-navy text-white hover:bg-ashoka-blue hover:scale-105'
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                </div>

                {/* Mobile line (when desktop line is hidden or on very small screens, though handled mostly by flex) */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-saffron via-white to-india-green transform -translate-x-1/2 rounded-full sm:hidden"></div>
                
                {/* Mobile Node */}
                <div className="absolute left-6 top-6 transform -translate-x-1/2 flex items-center justify-center z-20 sm:hidden">
                  <button 
                    onClick={() => setActiveStage(isActive ? null : index)}
                    className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-md ${
                      isActive ? 'bg-saffron text-white' : 'bg-navy text-white'
                    }`}
                  >
                    <Icon size={16} />
                  </button>
                </div>

                {/* Right Space placeholder (for odd index) */}
                <div className={`hidden md:block w-5/12 ${isEven ? 'md:order-3' : 'md:order-1'}`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
