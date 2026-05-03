"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Language, getTranslations, Translations, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export { SUPPORTED_LANGUAGES };

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: getTranslations("en"),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = useCallback((l: Language) => {
    setLangState(l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getTranslations(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
