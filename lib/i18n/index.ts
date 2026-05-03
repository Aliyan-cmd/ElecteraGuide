import enTranslations from "./en.json";
import hiTranslations from "./hi.json";

export type Language = "en" | "hi";

export type Translations = typeof enTranslations;

const translations: Record<Language, Translations> = {
  en: enTranslations,
  hi: hiTranslations,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] ?? translations.en;
}

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
];

export type { Translations as T };
