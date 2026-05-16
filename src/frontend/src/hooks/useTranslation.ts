import translations from "@/i18n/translations";
import type { Language } from "@/types";
import { useCallback, useEffect, useState } from "react";

const LANG_KEY = "shramik_lang";

function getStoredLang(): Language {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "hi" || stored === "mr") return stored;
  } catch {
    // ignore
  }
  return "en";
}

export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(getStoredLang);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const langMap = translations[language];
      if (langMap && key in langMap) return langMap[key];
      // fallback to English
      const enMap = translations.en;
      if (enMap && key in enMap) return enMap[key];
      return fallback ?? key;
    },
    [language],
  );

  return { language, setLanguage, t };
}

// Singleton language state for cross-component access without context
let _langListeners: Array<(lang: Language) => void> = [];
let _currentLang: Language = getStoredLang();

export function setGlobalLanguage(lang: Language) {
  _currentLang = lang;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // ignore
  }
  for (const fn of _langListeners) fn(lang);
}

export function useGlobalTranslation() {
  const [language, setLang] = useState<Language>(_currentLang);

  useEffect(() => {
    const handler = (lang: Language) => setLang(lang);
    _langListeners.push(handler);
    return () => {
      _langListeners = _langListeners.filter((fn) => fn !== handler);
    };
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const langMap = translations[language];
      if (langMap && key in langMap) return langMap[key];
      const enMap = translations.en;
      if (enMap && key in enMap) return enMap[key];
      return fallback ?? key;
    },
    [language],
  );

  const setLanguage = (lang: Language) => {
    setGlobalLanguage(lang);
  };

  return { language, setLanguage, t };
}
