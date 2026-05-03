"use client";

import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, MapPin, Search, Stamp, ThumbsUp, CheckCircle2, User, Award, Download, Share2 } from 'lucide-react';
import { useUserProgress } from './UserProgressContext';
import confetti from 'canvas-confetti';

export default function Simulator() {
  const { t } = useLanguage();
  const { addPoints, unlockBadge } = useUserProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const steps = [
    { id: 'eligibility', title: t.simulator.step1Title, icon: Search },
    { id: 'registration', title: t.simulator.step2Title, icon: CheckCircle2 },
    { id: 'booth', title: t.simulator.step3Title, icon: MapPin },
    { id: 'voting', title: t.simulator.step4Title, icon: Stamp },
    { id: 'after', title: t.simulator.step5Title, icon: ThumbsUp }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      addPoints(20);
    } else {
      triggerConfetti();
      setShowCertificate(true);
      addPoints(100);
      unlockBadge({
        id: "election-ready",
        name: "Election Ready",
        icon: "🎓",
        description: "Completed the interactive voting simulator."
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: Math.random() - 0.2, y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: Math.random() + 0.2, y: Math.random() - 0.2 } });
    }, 250);
  };

  const calculateProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden glass shadow-2xl border border-gray-200 bg-white">
      {/* Header and Progress Bar */}
      <div className="bg-navy p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.simulator.title}</h2>
              <p className="text-white/80 mt-1">{t.simulator.subtitle}</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="relative w-full h-2 bg-white/20 rounded-full mt-8 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-saffron rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Step Indicators */}
          <div className="hidden md:flex justify-between mt-4">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                  idx <= currentStep ? 'text-white' : 'text-white/40'
                }`}
                onClick={() => setCurrentStep(idx)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  idx < currentStep 
                    ? 'bg-india-green border-india-green text-white' 
                    : idx === currentStep 
                      ? 'bg-saffron border-saffron text-white shadow-[0_0_15px_rgba(255,153,51,0.5)]'
                      : 'border-white/40 bg-transparent text-white/40'
                }`}>
                  {idx < currentStep ? <Check size={16} /> : idx + 1}
                </div>
                <span className="text-xs font-medium tracking-wide">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-10 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="max-w-3xl mx-auto">
              
              {/* Step Content Headers */}
              <div className="mb-8 text-center md:text-left flex items-center justify-center md:justify-start gap-4">
                <div className="w-14 h-14 bg-blue-50 text-ashoka-blue rounded-2xl flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = steps[currentStep].icon;
                    return <Icon size={28} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy">{steps[currentStep].title}</h3>
                </div>
              </div>

              {/* Dynamic Content based on Step */}
              <div className="space-y-6">
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="card border border-gray-100 shadow-sm p-6 bg-gradient-to-br from-white to-orange-50/30">
                        <h4 className="font-bold text-lg mb-2 text-navy flex items-center gap-2">
                           <span className="text-saffron">1.</span> Age Requirement
                        </h4>
                        <p className="text-text-secondary leading-relaxed">You must be 18 years or older on January 1st of the election year to be eligible to vote.</p>
                     </div>
                     <div className="card border border-gray-100 shadow-sm p-6 bg-gradient-to-br from-white to-green-50/30">
                        <h4 className="font-bold text-lg mb-2 text-navy flex items-center gap-2">
                           <span className="text-india-green">2.</span> Citizenship
                        </h4>
                        <p className="text-text-secondary leading-relaxed">You must be a citizen of India. Non-Resident Indians (NRIs) can also register and vote in their home constituencies.</p>
                     </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <p className="text-text-secondary mb-6 text-lg">If you are eligible, the next step is to get your name on the electoral roll.</p>
                    
                    <div className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white shadow-sm items-start hover:border-saffron transition-colors">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0 font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">Fill Form 6 Online</h4>
                        <p className="text-text-secondary text-sm">Visit the official voters.eci.gov.in portal or download the Voter Helpline App.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white shadow-sm items-start hover:border-saffron transition-colors">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0 font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">Upload Documents</h4>
                        <p className="text-text-secondary text-sm">You will need a passport size photo, age proof (like Aadhaar or PAN), and address proof.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-white shadow-sm items-start hover:border-saffron transition-colors">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0 font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">Get Your EPIC</h4>
                        <p className="text-text-secondary text-sm">Once verified by your Booth Level Officer (BLO), your Electoral Photo Identity Card (EPIC) will be mailed to you.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                       <div className="w-full md:w-1/2 space-y-4">
                          <h4 className="font-bold text-xl text-navy">Locate your booth before election day.</h4>
                          <p className="text-text-secondary">Your polling booth is usually a school or community center near your registered address. You can find it by:</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                              <CheckCircle2 size={16} className="text-india-green" /> Checking your Voter Information Slip
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                              <CheckCircle2 size={16} className="text-india-green" /> Using the Voter Helpline App
                            </li>
                            <li className="flex items-center gap-2 text-sm text-text-secondary">
                              <CheckCircle2 size={16} className="text-india-green" /> Calling the 1950 Helpline
                            </li>
                          </ul>
                       </div>
                       <div className="w-full md:w-1/2">
                         <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative">
                           <div className="absolute top-2 right-2 flex gap-1">
                             <div className="w-2 h-2 rounded-full bg-red-500"></div>
                             <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                             <div className="w-2 h-2 rounded-full bg-green-500"></div>
                           </div>
                           <div className="mt-4 flex items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                              <MapPin className="text-ashoka-blue animate-bounce" size={40} />
                           </div>
                           <div className="mt-4 h-4 bg-gray-100 rounded w-3/4"></div>
                           <div className="mt-2 h-4 bg-gray-100 rounded w-1/2"></div>
                         </div>
                       </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                   <div className="space-y-8">
                     <p className="text-lg text-text-secondary text-center">Experience the voting process at the polling station.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="flex flex-col items-center text-center group">
                         <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-ashoka-blue transition-colors group-hover:scale-110 duration-300">
                           <User size={32} className="text-ashoka-blue" />
                         </div>
                         <h5 className="font-bold text-navy">1. Identity Check</h5>
                         <p className="text-xs text-text-secondary mt-2">Polling officer checks your name in the voter list and your ID document.</p>
                       </div>
                       
                       <div className="flex flex-col items-center text-center group">
                         <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-saffron transition-colors group-hover:scale-110 duration-300">
                           <Stamp size={32} className="text-saffron" />
                         </div>
                         <h5 className="font-bold text-navy">2. Ink & Sign</h5>
                         <p className="text-xs text-text-secondary mt-2">Indelible ink is marked on your left index finger, you sign the register and get a slip.</p>
                       </div>

                       <div className="flex flex-col items-center text-center group">
                         <div className="w-20 h-20 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-india-green transition-colors group-hover:scale-110 duration-300">
                           <CheckCircle2 size={32} className="text-india-green" />
                         </div>
                         <h5 className="font-bold text-navy">3. Cast Vote on EVM</h5>
                         <p className="text-xs text-text-secondary mt-2">Press the blue button next to your candidate. Hear the beep. Check the VVPAT slip.</p>
                       </div>
                     </div>
                   </div>
                )}

                {currentStep === 4 && (
                  <div className="text-center py-8">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-24 h-24 bg-gradient-india rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    >
                      <ThumbsUp size={40} className="text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-extrabold text-navy mb-4">Congratulations!</h3>
                    <p className="text-lg text-text-secondary max-w-lg mx-auto">
                      You are now ready to participate in the world's largest democracy. Remember, every single vote shapes the future of the nation.
                    </p>
                    <div className="mt-8 inline-block bg-blue-50 text-ashoka-blue px-6 py-3 rounded-xl font-medium border border-blue-100">
                      Show off your inked finger proudly on election day! ☝️
                    </div>

                    {showCertificate && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 p-8 border-8 border-double border-navy-mid/10 bg-[#FCFBF4] relative text-navy"
                        id="certificate"
                      >
                        <div className="absolute top-4 right-4 opacity-10">
                          <Award size={100} />
                        </div>
                        <div className="border-2 border-navy-mid/20 p-8">
                          <div className="text-center">
                            <span className="text-saffron font-bold tracking-widest uppercase text-xs">ElectraGuide Certification</span>
                            <h4 className="text-3xl font-black mt-2 mb-6">CERTIFICATE OF READINESS</h4>
                            <p className="text-lg italic">This is to certify that you are now</p>
                            <div className="my-6">
                              <span className="text-4xl font-black text-ashoka-blue underline decoration-saffron decoration-4 underline-offset-8">ELECTION READY</span>
                            </div>
                            <p className="max-w-md mx-auto text-sm text-text-secondary">
                              Has successfully completed the interactive voter simulation and demonstrated comprehensive understanding of the Indian democratic process.
                            </p>
                            <div className="mt-10 flex justify-between items-end border-t border-navy/10 pt-6">
                              <div className="text-left">
                                <div className="text-xs font-bold text-navy/40">DATE</div>
                                <div className="text-sm font-bold">{new Date().toLocaleDateString()}</div>
                              </div>
                              <div className="w-24 h-24 bg-ashoka-blue/5 rounded-full flex items-center justify-center border border-ashoka-blue/10">
                                <img src="/logo-placeholder.png" alt="" className="w-12 h-12 opacity-20" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-center gap-4 no-print">
                           <button 
                             onClick={() => window.print()}
                             className="btn btn-primary flex items-center gap-2 px-6"
                           >
                             <Download size={18} /> Download
                           </button>
                           <button 
                             onClick={() => alert("Share feature coming soon! Take a screenshot to share your achievement.")}
                             className="btn bg-navy text-white flex items-center gap-2 px-6"
                           >
                             <Share2 size={18} /> Share
                           </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Controls */}
        <div className="mt-auto pt-8 flex justify-between items-center border-t border-gray-100">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`btn px-6 py-3 flex items-center gap-2 ${
              currentStep === 0 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                : 'bg-white border border-gray-200 text-navy hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          <button
            onClick={handleNext}
            className={`btn px-8 py-3 flex items-center gap-2 shadow-md ${
              currentStep === steps.length - 1
                ? 'bg-gradient-india text-white hover:shadow-lg transform hover:-translate-y-1 transition-all'
                : 'bg-navy text-white hover:bg-ashoka-blue'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Finish Tutorial' : 'Next Step'} 
            {currentStep !== steps.length - 1 && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
