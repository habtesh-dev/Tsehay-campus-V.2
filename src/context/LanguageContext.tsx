"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries } from "../translations/dictionaries";

type Language = "en" | "am";
type Dictionaries = typeof dictionaries;
type DictPath<T> = T extends string
  ? []
  : {
      [K in keyof T]: [K, ...DictPath<T[K]>];
    }[keyof T];

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("am");

  // On mount, check if there's a saved language preference
  useEffect(() => {
    const saved = localStorage.getItem("tsehay_language");
    if (saved === "en" || saved === "am") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tsehay_language", lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === "am" ? "en" : "am");
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = dictionaries[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
      current = current[key];
    }
    
    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
