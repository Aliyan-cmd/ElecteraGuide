"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight, X, Sparkles } from "lucide-react";

const TOUR_STEPS = [
  {
    id: "learn-process",
    title: "Learn the Process",
    description: "Start your journey by understanding how elections work in India.",
    target: "#learn-process"
  },
  {
    id: "my-constituency",
    title: "Your Constituency",
    description: "Get personalized data about your local candidates and history.",
    target: "#my-constituency"
  },
  {
    id: "myths",
    title: "Bust the Myths",
    description: "Verify facts and earn XP by debunking common election rumors.",
    target: "#myths"
  },
  {
    id: "how-to-vote",
    title: "How to Vote",
    description: "Follow the 6 simple steps to cast your vote correctly on election day.",
    target: "#how-to-vote"
  },
  {
    id: "eligibility",
    title: "Check Eligibility",
    description: "Find out if you are eligible to vote and how to register yourself.",
    target: "#eligibility"
  },
  {
    id: "chat",
    title: "AI Assistant",
    description: "Ask anything about elections using voice or text in your language.",
    target: "#chat"
  },
  {
    id: "simulator",
    title: "Voting Simulator",
    description: "Experience the voting day and earn your official readiness certificate.",
    target: "#simulator"
  }
];

export default function Tour() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(true);

  const startTour = () => {
    setActiveStep(0);
    scrollToTarget(TOUR_STEPS[0].target);
  };

  const nextStep = () => {
    if (activeStep !== null && activeStep < TOUR_STEPS.length - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      scrollToTarget(TOUR_STEPS[next].target);
    } else {
      setActiveStep(null);
    }
  };

  const scrollToTarget = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      // Add a brief highlight effect
      element.classList.add("ring-4", "ring-saffron", "ring-opacity-50", "transition-all", "duration-1000");
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-saffron", "ring-opacity-50");
      }, 2000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showButton && activeStep === null && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTour}
            className="fixed bottom-8 left-8 z-[60] bg-navy text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 group"
          >
            <div className="w-8 h-8 bg-gradient-saffron rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Play size={16} fill="white" />
            </div>
            <span className="font-bold tracking-tight">Watch Demo Flow</span>
            <div className="absolute -top-2 -right-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron"></span>
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeStep !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
          >
            <div className="bg-white dark:bg-navy border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 relative">
              <button 
                onClick={() => setActiveStep(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-navy dark:hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-saffron font-bold text-xs uppercase tracking-widest mb-2">
                <Sparkles size={14} /> Step {activeStep + 1} of {TOUR_STEPS.length}
              </div>
              
              <h4 className="text-xl font-black text-navy dark:text-white mb-2">
                {TOUR_STEPS[activeStep].title}
              </h4>
              
              <p className="text-text-secondary dark:text-white/70 text-sm mb-6">
                {TOUR_STEPS[activeStep].description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {TOUR_STEPS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeStep ? 'w-6 bg-saffron' : 'w-2 bg-gray-200 dark:bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextStep}
                  className="btn btn-primary px-6 py-2.5 flex items-center gap-2 text-sm"
                >
                  {activeStep === TOUR_STEPS.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
