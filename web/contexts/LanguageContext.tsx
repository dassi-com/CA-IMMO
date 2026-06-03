'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';

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
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem('language');
    const lang = stored && (stored === 'fr' || stored === 'en') ? stored : 'fr';
    setLanguage(lang);
    i18nInstance.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = () => {
    const next = language === 'fr' ? 'en' : 'fr';
    setLanguage(next);
    i18nInstance.changeLanguage(next);
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
