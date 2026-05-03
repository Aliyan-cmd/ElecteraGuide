"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { Bot, Send, User, RotateCcw, AlertCircle, Mic, MicOff } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatAssistant() {
  const { t, lang } = useLanguage();
  // Removed isOpen state as component is now embedded
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: "/api/chat",
    initialInput: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleInputChange({ target: { value: transcript } } as any);
    };

    recognition.start();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Focus once on mount

  // If no messages, set initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-msg",
          role: "assistant",
          content: t.chat.greeting,
        } as any,
      ]);
    }
  }, [messages.length, setMessages, t.chat.greeting]);

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any);
    // Note: AI SDK's handleSubmit requires an event, so we construct a synthetic one
    setTimeout(() => {
      const form = document.getElementById('chat-form') as HTMLFormElement;
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex flex-col lg:flex-row h-full">
        
        {/* Left Sidebar - Suggested Questions (Hidden on small screens in page layout) */}
        <div className="hidden lg:flex flex-col w-72 border-r border-slate-50 p-6 bg-slate-50/30">
          <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">Suggested Questions</h4>
          <div className="space-y-3 overflow-y-auto pr-2 hide-scrollbar">
            {t.chat.suggestedQuestions?.map((q: string, i: number) => (
              <button
                key={i}
                onClick={() => handleSuggestedQuestion(q)}
                className="text-left w-full p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-ashoka-blue/30 hover:bg-ashoka-blue/5 transition-all text-xs font-bold text-slate-600 hover:text-ashoka-blue group flex items-start justify-between gap-3"
              >
                <span>{q}</span>
                <Send size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-ashoka-blue shrink-0 mt-0.5" />
              </button>
            ))}
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
              <AlertCircle size={14} className="text-ashoka-blue shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">
                {t.chat.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-col flex-1 relative min-h-[600px]">
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {messages.map((msg) => {
              const m = msg as any;
              return (
              <div 
                key={m.id} 
                className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role !== 'user' && (
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-ashoka-blue mt-1">
                    <Bot size={20} />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] rounded-[1.5rem] px-6 py-4 shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#0F172A] text-white rounded-tr-none' 
                      : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <div className="prose prose-sm prose-slate prose-p:leading-relaxed prose-strong:font-black prose-headings:font-black max-w-none">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-ashoka-blue/10 flex items-center justify-center text-ashoka-blue mt-1">
                    <User size={20} />
                  </div>
                )}
              </div>
              );
            })}
            
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-ashoka-blue mt-1">
                  <Bot size={20} />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] rounded-tl-none px-6 py-4 shadow-sm flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-ashoka-blue animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-india-green animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-50">
            <form id="chat-form" onSubmit={handleSubmit} className="relative flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-2 focus:ring-ashoka-blue/20 focus:border-ashoka-blue outline-none block p-5 pr-24 transition-all shadow-inner"
                  value={input}
                  placeholder={t.chat.placeholder}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={isListening ? () => {} : startListening}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      isListening ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !(input ?? "").trim()}
                    className="w-10 h-10 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 transition-all shadow-lg shadow-slate-200"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </form>
            
            {isListening && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-2xl flex items-center gap-3 animate-fade-in-up">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-red-500 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Listening...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
