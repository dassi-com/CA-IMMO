'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('fr');
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem('language');
    const lang = stored && (stored === 'fr' || stored === 'en') ? stored : 'fr';
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = () => {
    const next = language === 'fr' ? 'en' : 'fr';
    setLanguage(next);
    i18n.changeLanguage(next);
    localStorage.setItem('language', next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
